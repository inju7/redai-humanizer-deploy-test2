import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("jobRoles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("jobRoles").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    badge: v.string(),
    color: v.string(),
    salary: v.string(),
    type: v.string(),
    desc: v.string(),
    requirements: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("jobRoles", {
      ...args,
      isActive: true,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("jobRoles"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleActive = mutation({
  args: {
    id: v.id("jobRoles"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("jobRoles").collect();
    if (existing.length > 0) return;

    const JOB_ROLES = [
      {
        title: "Senior AI Engineer",
        badge: "ENGINEERING",
        color: "var(--theme-accent)",
        salary: "PHP 80,000–120,000 / mo",
        type: "Remote · Full-Time",
        desc: "Lead development of AETERNUM PROTOCOL V5. Own the core bypass engine architecture.",
        requirements: ["3+ yrs ML/NLP experience", "Python & TypeScript", "LLM fine-tuning expertise", "AI detection model knowledge"],
      },
      {
        title: "Frontend Architect",
        badge: "DESIGN",
        color: "#7c3aed",
        salary: "PHP 60,000–95,000 / mo",
        type: "Remote · Full-Time",
        desc: "Build high-density neobrutalist React interfaces with Framer Motion and stellar performance.",
        requirements: ["React + TypeScript expert", "Framer Motion / animations", "CSS architecture (no frameworks)", "Pixel-perfect eye for design"],
      },
      {
        title: "Growth Hacker",
        badge: "MARKETING",
        color: "#16a34a",
        salary: "PHP 40,000–70,000 / mo + commission",
        type: "Hybrid · Full-Time",
        desc: "Scale affiliate programs and manage B2B ad partnerships. Own top-of-funnel growth.",
        requirements: ["Proven SaaS growth experience", "Google & Meta Ads expertise", "Affiliate network management", "Data-driven decision making"],
      },
      {
        title: "Cybersecurity Analyst",
        badge: "SECURITY",
        color: "#dc2626",
        salary: "PHP 70,000–110,000 / mo",
        type: "Remote · Full-Time",
        desc: "Ensure protocol integrity and user data protection against synthetic attacks and adversarial inputs.",
        requirements: ["OWASP Top 10 knowledge", "Penetration testing skills", "Serverless security focus", "Incident response experience"],
      },
      {
        title: "Community Manager",
        badge: "COMMUNITY",
        color: "#0891b2",
        salary: "PHP 30,000–50,000 / mo",
        type: "Remote · Part-Time OK",
        desc: "Moderate creator networks and facilitate marketplace connections. Be the face of REDAI.",
        requirements: ["Strong communication skills", "Social media proficiency", "Discord/Telegram moderation", "Content scheduling tools"],
      },
      {
        title: "Sales Director (B2B)",
        badge: "SALES",
        color: "#b45309",
        salary: "PHP 60,000 base + uncapped commission",
        type: "Hybrid · Full-Time",
        desc: "Onboard enterprise clients, SEO agencies, and universities onto REDAI subscription plans.",
        requirements: ["B2B SaaS sales experience", "CRM tools (HubSpot/Pipedrive)", "Proposal & contract negotiation", "Network in PH tech ecosystem"],
      },
    ];

    for (const role of JOB_ROLES) {
      await ctx.db.insert("jobRoles", {
        ...role,
        isActive: true,
      });
    }
  },
});
