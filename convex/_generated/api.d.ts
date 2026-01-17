/* eslint-disable */
/**
 * Generated API types - run `npx convex dev` to regenerate
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

// Stub types until Convex is configured
declare const fullApi: ApiFromModules<{
  waitlist: typeof import("../waitlist");
}>;

export type Mounts = Record<string, never>;

export declare const api: FilterApi<typeof fullApi, FunctionReference<any, "public">>;
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">>;
