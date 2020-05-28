import {
  GraphQLSchema,
  GraphQLFieldResolver,
  BuildSchemaOptions,
  GraphQLInputFieldConfig,
  GraphQLFieldConfig,
  FieldNode,
  FragmentDefinitionNode,
  SelectionNode,
  ObjectFieldNode,
} from 'graphql';
import { Executor, Subscriber } from '@graphql-tools/delegate';

export interface IMakeRemoteExecutableSchemaOptions {
  schema: GraphQLSchema | string;
  executor?: Executor;
  subscriber?: Subscriber;
  createResolver?: (executor: Executor, subscriber: Subscriber) => GraphQLFieldResolver<any, any>;
  buildSchemaOptions?: BuildSchemaOptions;
}

export type InputFieldTransformer = (
  typeName: string,
  fieldName: string,
  inputFieldConfig: GraphQLInputFieldConfig
) => GraphQLInputFieldConfig | [string, GraphQLInputFieldConfig] | null | undefined;

export type InputFieldNodeTransformer = (
  typeName: string,
  fieldName: string,
  inputFieldNode: ObjectFieldNode,
  variables: Record<string, any>
) => ObjectFieldNode | Array<ObjectFieldNode>;

export type FieldTransformer = (
  typeName: string,
  fieldName: string,
  fieldConfig: GraphQLFieldConfig<any, any>
) => GraphQLFieldConfig<any, any> | [string, GraphQLFieldConfig<any, any>] | null | undefined;

export type RootFieldTransformer = (
  operation: 'Query' | 'Mutation' | 'Subscription',
  fieldName: string,
  fieldConfig: GraphQLFieldConfig<any, any>
) => GraphQLFieldConfig<any, any> | [string, GraphQLFieldConfig<any, any>] | null | undefined;

export type FieldNodeTransformer = (
  typeName: string,
  fieldName: string,
  fieldNode: FieldNode,
  fragments: Record<string, FragmentDefinitionNode>
) => SelectionNode | Array<SelectionNode>;
