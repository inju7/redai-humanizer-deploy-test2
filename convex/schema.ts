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

  blogs: defineTable({
    title: v.string(),
    category: v.string(),
    subtitle: v.string(),
    author: v.string(),
    dateStr: v.string(),
    content: v.string(), // Markdown content
    image: v.string(),
    createdAt: v.number(),
  }),

  careerApplications: defineTable({
    fullName: v.string(),
    emailAddress: v.string(),
    portfolioLink: v.optional(v.string()),
    appliedRole: v.string(),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    appliedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email_and_role", ["emailAddress", "appliedRole"]),

  jobRoles: defineTable({
    title: v.string(),
    badge: v.string(),
    color: v.string(),
    salary: v.string(),
    type: v.string(),
    desc: v.string(),
    requirements: v.array(v.string()),
    isActive: v.boolean(),
  }),

  marketplaceOrders: defineTable({
    item: v.string(),
    subtotal: v.number(),
    vat: v.number(),
    total: v.number(),
    timestamp: v.number(),
    userId: v.optional(v.id("users")),
  }),

  referralClaims: defineTable({
    userId: v.optional(v.id("users")),
    fullName: v.string(),
    brandReferred: v.string(),
    referralLinks: v.optional(v.string()), // we might not need this if the UI doesn't have it, wait UI doesn't have links right now? 
    walletAddress: v.optional(v.string()), // let's check UI again
    timestamp: v.number(),
  }),
});
