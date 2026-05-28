import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Custom fields for REDAI
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    credits: v.optional(v.number()),
  }).index("email", ["email"]),
  
  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("usage"), v.literal("purchase"), v.literal("bonus")),
    amount: v.number(), // Negative for usage, positive for gain
    description: v.string(),
    timestamp: v.number(),
  }).index("by_userId", ["userId"]),

  marketingSubmissions: defineTable({
    userId: v.optional(v.id("users")),
    type: v.string(),
    name: v.string(),
    email: v.string(),
    detail1: v.string(),
    detail2: v.optional(v.string()),
    timestamp: v.number(),
  }),
});
