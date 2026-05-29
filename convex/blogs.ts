import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Admin only mutation
export const add = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    subtitle: v.string(),
    author: v.string(),
    dateStr: v.string(),
    content: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Forbidden: Admins only");

    const newBlogId = await ctx.db.insert("blogs", {
      ...args,
      createdAt: Date.now(),
    });

    return newBlogId;
  },
});

export const update = mutation({
  args: {
    id: v.id("blogs"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    author: v.optional(v.string()),
    dateStr: v.optional(v.string()),
    content: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Forbidden: Admins only");

    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    const user = await ctx.db.get(userId);
    if (user?.role !== "admin") throw new Error("Forbidden: Admins only");

    await ctx.db.delete(args.id);
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("blogs").collect();
    if (existing.length > 0) {
      return "Already seeded";
    }

    const blogs = [
      {
        title: "Bypassing Turnitin in 2026",
        category: "Technology",
        subtitle: "How to safely humanize academic submissions without triggering secondary patterns.",
        author: "Sarah Connor",
        dateStr: "MAY 17, 2026",
        createdAt: new Date("2026-05-17").getTime(),
        content: `Academic integrity guidelines are evolving quickly. This article discusses modern Turnitin algorithms.\n\n### The Challenge\nThe algorithms now parse syntactic diversity in addition to word frequencies. Bypassing Turnitin requires styling structure variance.\n\n### Conclusion\nA human-guided rewrite pipeline remains the most secure method for digital work validation.`,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
      },
      {
        title: "SEO Optimization Tactics",
        category: "SEO & Content",
        subtitle: "Why search engines penalize dry, repetitive AI content and how to bypass them.",
        author: "Alex Smith",
        dateStr: "MAY 16, 2026",
        createdAt: new Date("2026-05-16").getTime(),
        content: `Google Search's helpful content update targets synthetic blog spam with high severity.\n\n### Traffic Drop Issues\nTo maintain search traffic, programmatic writers must inject perplexity and voice cadence variance. Pure AI generators fail this basic test.\n\n### Moving Forward\nInvesting in content humanization guarantees high visibility on modern search results.`,
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&q=80"
      },
      {
        title: "Generative Cadence Secrets",
        category: "Technology",
        subtitle: "Deep-diving into LLM frequency matching and perplexity variations.",
        author: "Jane Doe",
        dateStr: "MAY 15, 2026",
        createdAt: new Date("2026-05-15").getTime(),
        content: `LLMs operate on standard mathematical token prediction, leaving systemic fingerprints.\n\n### The Mechanics\nAnalyzing token choices allows security scanners to easily flags plain generations. A humanized model breaks standard distributions.\n\n### Final Thoughts\nBreaking predictions using organic humanized layers is the absolute protocol.`,
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&q=80"
      },
      {
        title: "Google AdSense Approval Loop",
        category: "SEO & Content",
        subtitle: "Bypassing the low-value content flag for programmatic SEO websites.",
        author: "Alex Smith",
        dateStr: "MAY 14, 2026",
        createdAt: new Date("2026-05-14").getTime(),
        content: `Getting AdSense approval for programmatic sites is notoriously difficult in 2026.\n\n### Common Pitfalls\nAdSense checkers verify the structural integrity of your blogs before allowing banner spots. Repetitive DOM trees flag manual review.\n\n### Verification Strategy\nHigh variance in word selection forces automated approvals.`,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
      }
    ];

    for (const blog of blogs) {
      await ctx.db.insert("blogs", blog);
    }

    return "Seeded successfully";
  },
});
