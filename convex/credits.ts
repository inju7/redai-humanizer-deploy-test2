import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const deduct = mutation({
  args: { amount: v.number(), description: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    // Admins bypass credit deduction
    if (user.role === "admin") {
      return true;
    }

    if ((user.credits ?? 0) < args.amount) {
      throw new Error("Insufficient credits");
    }

    // Deduct credits
    await ctx.db.patch(userId, {
      credits: (user.credits ?? 0) - args.amount,
    });

    // Log transaction
    await ctx.db.insert("transactions", {
      userId: userId,
      type: "usage",
      amount: -args.amount,
      description: args.description,
      timestamp: Date.now(),
    });

    return true;
  },
});

export const refund = mutation({
  args: { amount: v.number(), description: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user) throw new Error("User not found");

    // Admins bypass credit system
    if (user.role === "admin") {
      return true;
    }

    // Refund credits
    await ctx.db.patch(userId, {
      credits: (user.credits ?? 0) + args.amount,
    });

    // Log transaction
    await ctx.db.insert("transactions", {
      userId: userId,
      type: "bonus", // or usage refund
      amount: args.amount,
      description: args.description,
      timestamp: Date.now(),
    });

    return true;
  },
});
