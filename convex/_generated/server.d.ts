/* eslint-disable */
/**
 * Generated server types - run `npx convex dev` to regenerate
 */

import type {
  GenericActionCtx,
  GenericMutationCtx,
  GenericQueryCtx,
  GenericDatabaseReader,
  GenericDatabaseWriter,
  MutationBuilder,
  QueryBuilder,
  ActionBuilder,
} from "convex/server";

import type { DataModel } from "./dataModel";

export type QueryCtx = GenericQueryCtx<DataModel>;
export type MutationCtx = GenericMutationCtx<DataModel>;
export type ActionCtx = GenericActionCtx<DataModel>;
export type DatabaseReader = GenericDatabaseReader<DataModel>;
export type DatabaseWriter = GenericDatabaseWriter<DataModel>;

export declare const query: QueryBuilder<DataModel, "public">;
export declare const mutation: MutationBuilder<DataModel, "public">;
export declare const action: ActionBuilder<DataModel, "public">;

export declare const internalQuery: QueryBuilder<DataModel, "internal">;
export declare const internalMutation: MutationBuilder<DataModel, "internal">;
export declare const internalAction: ActionBuilder<DataModel, "internal">;
