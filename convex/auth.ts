import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, args) {
      // Default new users to 10 credits (5 base + 5 registered bonus) and 'user' role
      if (args.type === "oauth" || args.type === "password" || args.type === "credentials") {
        const user = await ctx.db.get(args.userId);
        if (user && user.credits === undefined) {
          await ctx.db.patch(args.userId, {
            credits: 10,
            role: "user"
          });
          
          // Log the registration bonus
          await ctx.db.insert("transactions", {
            userId: args.userId,
            type: "bonus",
            amount: 10,
            description: "Registration Bonus",
            timestamp: Date.now()
          });
        }
      }
    },
  }
});
