"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildSystemPrompt(tool: string, parameter: string, customInstructions?: string): string {
  let toneInstruction = "";
  switch (parameter) {
    case "Academic":   toneInstruction = "Adopt an academic tone. Use scholarly vocabulary and rigorous phrasing."; break;
    case "Simple":     toneInstruction = "Adopt a simple tone. Use very basic, easy-to-understand language."; break;
    case "Flowing":    toneInstruction = "Adopt a flowing tone. Ensure smooth transitions and engaging readability."; break;
    case "Informal":   toneInstruction = "Adopt an informal, conversational tone."; break;
    case "Formal":     toneInstruction = "Adopt a highly formal and professional tone."; break;
    case "Expand":     toneInstruction = "Expand upon the ideas presented. Provide more detail and depth."; break;
    case "Shorten":    toneInstruction = "Shorten the response. Be concise and to the point."; break;
    case "Free":       toneInstruction = "Adopt a basic, standard tone. Write in a slightly simplified manner."; break;
    case "Custom":
      toneInstruction = customInstructions
        ? `Adhere strictly to these custom tone and writing constraints: "${customInstructions}"`
        : "Follow custom creative constraints to maintain a unique voice.";
      break;
    default:
      toneInstruction = "Adopt a standard, balanced tone.";
  }

  if (tool === "Text Humanizer")        return `You are an expert copywriter specializing in natural, human-like text generation. Your task is to rewrite the input text to make it sound completely human, bypassing any AI detectors. ${toneInstruction}`;
  if (tool === "AI Detector")           return `You are a Neutral Analyst AI detector. Analyze the input text and provide a detailed report on the likelihood of it being AI-generated, including strengths indicating human authorship or markers of AI generation. Format as a professional Markdown report. ${toneInstruction}`;
  if (tool === "Plagiarism Checker")    return `You are an expert plagiarism analyst. Check the text for originality and provide a detailed Markdown report. ${toneInstruction}`;
  if (tool === "Humanize Email")        return `You are an executive communications expert. Rewrite the email to sound natural, persuasive, and completely human. ${toneInstruction}`;
  if (tool === "Grammar Check")         return `You are a master editor. Correct all grammar, spelling, and punctuation errors in the text while improving flow. Provide a Markdown report of changes. ${toneInstruction}`;
  if (tool === "Citation Check")        return `You are an academic librarian. Review the citations in the text for formatting and accuracy. ${toneInstruction}`;
  if (tool === "Essay Writer")          return `You are a prolific essayist. Write or expand the essay based on the input prompt. ${toneInstruction}`;
  if (tool === "Paragraph Rewriter")    return `You are an expert rewriter. Rewrite the paragraph to improve clarity and flow. ${toneInstruction}`;
  if (tool === "Article Rewriter")      return `You are a professional editor. Rewrite the article to make it more engaging and unique. ${toneInstruction}`;
  if (tool === "Sentence Rewriter")     return `You are a syntax expert. Rewrite the sentences for better impact. ${toneInstruction}`;
  if (tool === "Rewording Tool")        return `You are a vocabulary specialist. Reword the text using better synonyms while preserving meaning. ${toneInstruction}`;
  if (tool === "Detect AI Content")     return `You are an advanced AI detection algorithm. Analyze the content for AI signatures and provide a Markdown report. ${toneInstruction}`;
  if (tool === "Detector Teachers")     return `You are a strict high school teacher. Evaluate the text for AI use from a teacher's perspective. Provide a Markdown report. ${toneInstruction}`;
  if (tool === "Detector College")      return `You are a college admissions officer. Evaluate the text for AI use and authenticity. Provide a Markdown report. ${toneInstruction}`;
  if (tool === "Detector Academic")     return `You are an academic peer reviewer. Evaluate the text for AI generation in a scholarly context. Provide a Markdown report. ${toneInstruction}`;
  if (tool === "Detector Professors")   return `You are a Tenured Professor. Analyze the text for AI generation with extreme academic rigor. Provide a detailed Markdown report. ${toneInstruction}`;
  return `You are a helpful assistant. Process the request. ${toneInstruction}`;
}

function parseGroqResponse(json: any): string {
  if (!json) return "No response generated.";
  if (typeof json === "string") return json;
  if (Array.isArray(json.choices) && json.choices[0]) {
    const choice = json.choices[0];
    if (choice.message?.content) return String(choice.message.content);
    if (typeof choice.text === "string") return choice.text;
  }
  return JSON.stringify(json);
}

export const generate = action({
  args: {
    tool: v.string(),
    parameter: v.string(),
    input: v.string(),
    customInstructions: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // 1. Verify Authentication & Deduct Credits for logged-in users
    if (!args.isAnonymous) {
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        throw new Error("Unauthorized");
      }
      await ctx.runMutation(api.credits.deduct, {
        amount: 1,
        description: `Used ${args.tool}`,
      });
    }

    // 2. Get API Key
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      if (!args.isAnonymous) {
        await ctx.runMutation(api.credits.refund, { amount: 1, description: "System configuration error refund" });
      }
      throw new Error("Server configuration error: Missing API Key");
    }

    // 3. Build prompt inline
    const systemPrompt = buildSystemPrompt(args.tool, args.parameter, args.customInstructions);
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Input Text:\n${args.input}` },
    ];

    try {
      // 4. Call Groq API
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const json = await response.json();
      return parseGroqResponse(json);

    } catch (error: any) {
      console.error("AI Request Failed:", error);
      // 5. Refund on failure for logged-in users
      if (!args.isAnonymous) {
        await ctx.runMutation(api.credits.refund, { amount: 1, description: "Failed generation refund" });
      }
      throw new Error(`The Aeternum Protocol encountered a severe neural disconnect: ${error.message || error}`);
    }
  },
});
