import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Public: Submit a new career application ───────────────────────────────
export const submit = mutation({
  args: {
    fullName: v.string(),
    emailAddress: v.string(),
    portfolioLink: v.optional(v.string()),
    appliedRole: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Deduplication: block re-submission of the same email+role combo
    const existing = await ctx.db
      .query("careerApplications")
      .withIndex("by_email_and_role", (q) =>
        q.eq("emailAddress", args.emailAddress).eq("appliedRole", args.appliedRole)
      )
      .unique();

    if (existing !== null) {
      throw new Error("DUPLICATE_APPLICATION");
    }

    const id = await ctx.db.insert("careerApplications", {
      fullName: args.fullName.trim(),
      emailAddress: args.emailAddress.trim().toLowerCase(),
      portfolioLink: args.portfolioLink?.trim() || undefined,
      appliedRole: args.appliedRole,
      message: args.message?.trim() || undefined,
      status: "pending",
      appliedAt: Date.now(),
    });

    return id;
  },
});

// ─── Public: List all applications (admin panel) ───────────────────────────
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("careerApplications")
      .order("desc")
      .take(200);
  },
});

// ─── Public: Update application status (admin only) ───────────────────────
export const updateStatus = mutation({
  args: {
    id: v.id("careerApplications"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
  },
  handler: async (ctx, args) => {
    // Verify the caller is an authenticated admin
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("UNAUTHORIZED");
    }

    const user = await ctx.db.get(userId);
    if (!user || user.role !== "admin") {
      throw new Error("FORBIDDEN");
    }

    const application = await ctx.db.get(args.id);
    if (application === null) {
      throw new Error("NOT_FOUND");
    }

    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});
