import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const test = query({
  args: {},
  handler: async (ctx) => {
    return {
      siteUrl: process.env.CONVEX_SITE_URL,
      userId: await getAuthUserId(ctx),
    };
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const checkAuth = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.auth.getUserIdentity();
  },
});

export const checkEmailExists = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emailNormalized = args.email.toLowerCase().trim();
    if (!emailNormalized) return false;
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", emailNormalized))
      .unique();
    return user !== null;
  },
});
