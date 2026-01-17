import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    source: v.optional(v.string()), // e.g., "pricing", "homepage"
    createdAt: v.number(), // timestamp
  })
    .index("by_email", ["email"])
    .index("by_created", ["createdAt"]),
});
