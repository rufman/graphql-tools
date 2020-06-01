import { GraphQLSchema } from 'graphql';
import { Transform, cloneSchema } from '@graphql-tools/utils';

export { default as CheckResultAndHandleErrors } from './CheckResultAndHandleErrors';
export { checkResultAndHandleErrors } from './CheckResultAndHandleErrors';
export { default as ExpandAbstractTypes } from './ExpandAbstractTypes';
export { default as AddSelectionSetsByField } from './AddSelectionSetsByField';
export { default as AddMergedTypeSelectionSets } from './AddSelectionSetsByType';
export { default as AddArgumentsAsVariables } from './AddArgumentsAsVariables';
export { default as FilterToSchema } from './FilterToSchema';
export { default as AddTypenameToAbstract } from './AddTypenameToAbstract';

// superseded by AddFragmentsByField
export { default as ReplaceFieldWithFragment } from './ReplaceFieldWithFragment';
// superseded by AddSelectionSetsByField
export { default as AddFragmentsByField } from './AddFragmentsByField';

export function getTransformedSchemas(
  originalSchema: GraphQLSchema,
  transforms: Array<Transform>
): Array<GraphQLSchema> {
  const transformedSchemas: Array<GraphQLSchema> = [originalSchema];
  let latestSchema = originalSchema;
  transforms.forEach((transform: Transform) => {
    latestSchema =
      transform.transformSchema != null ? transform.transformSchema(cloneSchema(latestSchema)) : latestSchema;
    transformedSchemas.unshift(latestSchema);
  });
  return transformedSchemas;
}

export function applySchemaTransforms(originalSchema: GraphQLSchema, transforms: Array<Transform>): GraphQLSchema {
  return transforms.reduce(
    (schema: GraphQLSchema, transform: Transform) =>
      transform.transformSchema != null ? transform.transformSchema(cloneSchema(schema)) : schema,
    originalSchema
  );
}
