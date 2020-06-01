import { GraphQLSchema, GraphQLOutputType, GraphQLResolveInfo, OperationTypeNode, GraphQLObjectType } from 'graphql';

import { Request, ExecutionResult } from '@graphql-tools/utils';

import {
  SubschemaConfig,
  StitchingInfo,
  isSubschemaConfig,
  Transform,
  Transformation,
  DelegationContext,
} from './types';

import ExpandAbstractTypes from './transforms/ExpandAbstractTypes';
import WrapConcreteTypes from './transforms/WrapConcreteTypes';
import FilterToSchema from './transforms/FilterToSchema';
import AddFragmentsByField from './transforms/AddFragmentsByField';
import AddSelectionSetsByField from './transforms/AddSelectionSetsByField';
import AddSelectionSetsByType from './transforms/AddSelectionSetsByType';
import AddTypenameToAbstract from './transforms/AddTypenameToAbstract';
import CheckResultAndHandleErrors from './transforms/CheckResultAndHandleErrors';
import AddArgumentsAsVariables from './transforms/AddArgumentsAsVariables';

function getDelegationReturnType(
  info: GraphQLResolveInfo,
  targetSchema: GraphQLSchema,
  operation: OperationTypeNode,
  fieldName: string
): GraphQLOutputType {
  if (info != null) {
    return info.returnType;
  }

  let rootType: GraphQLObjectType<any, any>;
  if (operation === 'query') {
    rootType = targetSchema.getQueryType();
  } else if (operation === 'mutation') {
    rootType = targetSchema.getMutationType();
  } else {
    rootType = targetSchema.getSubscriptionType();
  }

  return rootType.getFields()[fieldName].type;
}

export class Transformer {
  private transformations: Array<Transformation> = [];
  private delegationContext: DelegationContext;

  constructor(options: {
    subschema: GraphQLSchema | SubschemaConfig;
    targetSchema: GraphQLSchema;
    operation: OperationTypeNode;
    fieldName: string;
    args: Record<string, any>;
    context: Record<string, any>;
    info: GraphQLResolveInfo;
    returnType: GraphQLOutputType;
    transforms: Array<Transform>;
    transformedSchema: GraphQLSchema;
    transformedSchemas: Array<GraphQLSchema>;
    skipTypeMerging: boolean;
  }) {
    const {
      subschema: schemaOrSubschemaConfig,
      targetSchema,
      operation,
      fieldName,
      args,
      context,
      info,
      returnType,
      transforms = [],
      transformedSchema,
      transformedSchemas = [],
      skipTypeMerging,
    } = options;

    let subschemaTransforms: Array<Transform> = [];

    if (isSubschemaConfig(schemaOrSubschemaConfig)) {
      subschemaTransforms =
        schemaOrSubschemaConfig.transforms != null ? schemaOrSubschemaConfig.transforms.concat(transforms) : transforms;
    } else {
      subschemaTransforms = transforms;
    }

    const stitchingInfo: StitchingInfo = info?.schema.extensions?.stitchingInfo;

    const transformedTargetSchema =
      stitchingInfo == null
        ? transformedSchemas.length
          ? transformedSchemas[0]
          : transformedSchema ?? targetSchema
        : stitchingInfo.transformedSchemas.get(schemaOrSubschemaConfig) ??
          (transformedSchemas.length ? transformedSchemas[0] : transformedSchema ?? targetSchema);

    const delegationReturnType = returnType ?? getDelegationReturnType(info, targetSchema, operation, fieldName);

    this.delegationContext = {
      ...options,
      stitchingInfo,
      transformedSchema: transformedTargetSchema,
      returnType: delegationReturnType,
    };

    this.addTransform(
      new CheckResultAndHandleErrors(
        info,
        fieldName,
        schemaOrSubschemaConfig,
        context,
        delegationReturnType,
        skipTypeMerging
      )
    );

    if (stitchingInfo != null) {
      this.addTransform(new AddSelectionSetsByField(info.schema, stitchingInfo.selectionSetsByField));
      this.addTransform(new AddSelectionSetsByType(info.schema, stitchingInfo.selectionSetsByType));
    }

    this.addTransform(new WrapConcreteTypes(delegationReturnType, transformedTargetSchema));

    if (info != null) {
      this.addTransform(new ExpandAbstractTypes(info.schema, transformedTargetSchema));
    }

    for (let i = subschemaTransforms.length, j = 0; i > -1; i--, j++) {
      const transform = subschemaTransforms[i];
      const transformedSchema = transformedSchemas[j];
      const targetSchema = transformedSchemas[j + 1];
      this.addTransform(transform, {
        transformedSchema,
        targetSchema,
      });
    }

    if (stitchingInfo != null) {
      this.addTransform(new AddFragmentsByField(targetSchema, stitchingInfo.fragmentsByField));
    }

    if (args != null) {
      this.addTransform(new AddArgumentsAsVariables(targetSchema, args));
    }

    this.addTransform(new FilterToSchema(targetSchema));
    this.addTransform(new AddTypenameToAbstract(targetSchema));
  }

  private addTransform(transform: Transform, context = {}) {
    this.transformations.push({ transform, context });
  }

  public transformRequest(originalRequest: Request) {
    return this.transformations.reduce(
      (request: Request, transformation: Transformation) =>
        transformation.transform.transformRequest != null
          ? transformation.transform.transformRequest(request, transformation.context, this.delegationContext)
          : request,
      originalRequest
    );
  }

  public transformResult(originalResult: ExecutionResult) {
    return this.transformations.reduceRight(
      (result: ExecutionResult, transformation: Transformation) =>
        transformation.transform.transformResult != null
          ? transformation.transform.transformResult(result, transformation.context, this.delegationContext)
          : result,
      originalResult
    );
  }
}
