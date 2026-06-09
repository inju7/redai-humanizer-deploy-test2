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
        title: "What Is AI Humanizer Meaning: AI Humanizer Guide 2026",
        category: "Technology",
        subtitle: "Learn what an AI humanizer is, how it works, and when to use it to make AI-written content sound natural, authentic, and detection-safe.",
        author: "REDAI Editorial",
        dateStr: "JUN 10, 2026",
        createdAt: new Date("2026-06-10").getTime(),
        content: `An AI humanizer is a tool designed to transform machine-generated text into natural, human-like writing. When users search for **what is ai humanizer** or **ai humanizer meaning**, they are trying to understand how AI-written content can be refined so it feels authentic, readable, and less robotic while keeping the original message intact.

In practice, AI humanizers work by adjusting sentence flow, improving vocabulary variation, and reducing repetitive phrasing commonly found in large language models. Instead of changing meaning, they enhance tone, rhythm, and emotional clarity, making content easier to read and more engaging for real audiences. This is why marketers, bloggers, and SEO professionals increasingly rely on them to improve performance without fully rewriting content.

The rise of generative AI tools has increased the need for humanization systems. However, experts emphasize responsible use. Over-reliance can reduce originality and raise transparency concerns, especially in academic, journalistic, or business-critical writing where authenticity matters.

Research from OpenAI highlights that AI-generated text often requires human refinement to improve clarity, structure, and context awareness. Meanwhile, academic and industry discussions, including reports from MIT Technology Review, stress the importance of human oversight in AI-assisted writing to maintain trust and content integrity.

Ultimately, AI humanizers are not replacements for writers but enhancement tools. They bridge automation and human communication, helping content rank better in search engines while still feeling natural, readable, and trustworthy.`,
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80"
      },
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
      },
      {
        title: "Best AI Humanizer Tools Comparison Guide 2026",
        category: "SEO & Content",
        subtitle: "Compare the best AI humanizer tools for bypassing AI detectors, improving tone, and keeping content natural without sacrificing quality.",
        author: "REDAI Editorial",
        dateStr: "JUN 10, 2026",
        createdAt: new Date("2026-06-10T01:00:00").getTime(),
        content: `Choosing the **best ai humanizer** has become essential in 2026 as AI-generated content dominates blogs, marketing, and business communication. The goal of AI humanizer tools is not just to rewrite text, but to refine tone, improve readability, and make machine-generated writing feel natural and human-like.

## What Makes a Great AI Humanizer?

A strong AI humanizer should preserve meaning while improving flow and emotional tone. The best tools reduce robotic sentence patterns, maintain context accuracy, and allow flexible tone adjustments depending on use case—academic, marketing, or SEO content.

## Top AI Humanizer Tools Compared

Popular **ai humanizer tools** today include platforms that specialize in rewriting AI content into more natural human-style writing. Most tools focus on three things: readability enhancement, tone adjustment, and AI-detection reduction. Some prioritize SEO optimization, while others focus on creative rewriting or academic refinement.

## Pricing, Limits, and Use Cases

AI humanizer tools typically operate on subscription models. Entry-level plans are ideal for bloggers and freelancers, while enterprise plans support agencies and content teams. Use cases vary widely—from SEO blog writing to email marketing, product descriptions, and social media content.

## Which AI Humanizer Is Right for You?

The right tool depends on your workflow. If you prioritize SEO content, choose tools that enhance keyword flow naturally. For business communication, select tools that preserve tone accuracy and clarity. For bulk content, prioritize speed and API access.

According to industry insights from OpenAI, AI-generated text benefits significantly from human refinement to improve clarity and intent accuracy. Additionally, content quality discussions from MIT Technology Review emphasize responsible AI writing practices and transparency in automated content workflows.

Ultimately, the best AI humanizer is not a single tool, but the one that fits your content goals, budget, and quality standards while maintaining authentic human-like communication.`,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80"
      }
    ];

    for (const blog of blogs) {
      await ctx.db.insert("blogs", blog);
    }

    return "Seeded successfully";
  },
});

// Insert a single blog post directly (bypasses the "already seeded" guard)
// Use this to add individual posts after initial seeding has already occurred.
export const seedOne = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    subtitle: v.string(),
    author: v.string(),
    dateStr: v.string(),
    content: v.string(),
    image: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Deduplicate: skip if a blog with the same title already exists
    const existing = await ctx.db
      .query("blogs")
      .collect();
    const alreadyExists = existing.some((b) => b.title === args.title);
    if (alreadyExists) {
      return "Already exists";
    }
    const id = await ctx.db.insert("blogs", args);
    return id;
  },
});
