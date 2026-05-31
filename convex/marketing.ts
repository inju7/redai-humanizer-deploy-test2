import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Public: Submit a new marketing/consignment deal ─────────────────────────
export const submit = mutation({
  args: {
    type: v.string(),
    name: v.string(),
    email: v.string(),
    detail1: v.string(),
    detail2: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const submissionId = await ctx.db.insert("marketingSubmissions", {
      userId: userId ?? undefined,
      type: args.type,
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      detail1: args.detail1.trim(),
      detail2: args.detail2?.trim() || undefined,
      timestamp: Date.now(),
    });

    return submissionId;
  },
});

// ─── Admin Only: List all marketing deals ─────────────────────────────────────
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("UNAUTHORIZED");
    }

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("FORBIDDEN");
    }

    return await ctx.db
      .query("marketingSubmissions")
      .order("desc")
      .take(100);
  },
});
