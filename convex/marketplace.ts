import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Public: Purchase an item in the marketplace ────────────────────────────
export const purchase = mutation({
  args: {
    item: v.string(),
    subtotal: v.number(),
    vat: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const id = await ctx.db.insert("marketplaceOrders", {
      item: args.item,
      subtotal: args.subtotal,
      vat: args.vat,
      total: args.total,
      timestamp: Date.now(),
      userId: userId || undefined,
    });

    return id;
  },
});

// ─── Admin: Log an arbitrary manual transaction in VAT ledger ───────────────
export const logOrder = mutation({
  args: {
    item: v.string(),
    subtotal: v.number(),
    vat: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("UNAUTHORIZED");

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") throw new Error("FORBIDDEN");

    const id = await ctx.db.insert("marketplaceOrders", {
      item: args.item,
      subtotal: args.subtotal,
      vat: args.vat,
      total: args.total,
      timestamp: Date.now(),
      userId,
    });

    return id;
  },
});

// ─── Admin: List all marketplace orders for ledger ──────────────────────────
export const list = query({
  args: {},
  handler: async (ctx) => {
    // Only admins should query this
    const userId = await getAuthUserId(ctx);
    if (!userId) return []; // return empty for non-admins safely
    
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") return [];

    return await ctx.db
      .query("marketplaceOrders")
      .order("desc")
      .take(200);
  },
});
