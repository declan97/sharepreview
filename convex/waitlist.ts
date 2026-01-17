import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add email to waitlist
export const addEmail = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase().trim();

    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      // Already subscribed, return success without duplicate
      return { success: true, alreadySubscribed: true };
    }

    // Add new email
    await ctx.db.insert("waitlist", {
      email: normalizedEmail,
      source: args.source,
      createdAt: Date.now(),
    });

    return { success: true, alreadySubscribed: false };
  },
});

// Get waitlist count (for admin dashboard)
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    return { count: entries.length };
  },
});

// Get all waitlist emails (for admin export)
export const getAllEmails = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db
      .query("waitlist")
      .withIndex("by_created")
      .order("desc")
      .collect();

    return entries.map((e) => ({
      email: e.email,
      source: e.source,
      createdAt: e.createdAt,
    }));
  },
});
