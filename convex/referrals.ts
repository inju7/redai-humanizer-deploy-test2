import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ─── Public: Submit a referral claim ────────────────────────────────────────
export const submitClaim = mutation({
  args: {
    fullName: v.string(),
    brandReferred: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    const id = await ctx.db.insert("referralClaims", {
      fullName: args.fullName,
      brandReferred: args.brandReferred,
      timestamp: Date.now(),
      userId: userId || undefined,
    });

    // If the user is authenticated, we add +20 credits natively to their balance
    if (userId) {
      const user = await ctx.db.get(userId);
      if (user) {
        // Log the bonus transaction
        await ctx.db.insert("transactions", {
          userId,
          type: "bonus",
          amount: 20,
          description: `Referral Claim Approved: ${args.brandReferred}`,
          timestamp: Date.now(),
        });
        
        // Update user credits
        await ctx.db.patch(userId, {
          credits: (user.credits || 0) + 20,
        });
      }
    }

    return id;
  },
});
