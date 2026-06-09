export interface ComparisonItem {
  id: string;
  title: string;
  subtitle: string;
  optionAName: string;
  optionBName: string;
  summary: string;
  table: { metric: string; valA: string; valB: string }[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  faq: { q: string; a: string }[];
}

export const comparisonsData: ComparisonItem[] = [
  {
    id: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude: Which AI Model Writes More Like a Human?",
    subtitle: "A side-by-side comparison of OpenAI and Anthropic's flagship models.",
    optionAName: "ChatGPT (OpenAI)",
    optionBName: "Claude (Anthropic)",
    summary: "ChatGPT is highly versatile and integrated, whereas Claude produces more natural, flow-like prose. However, both generate clear mathematical patterns that require humanization to bypass detectors.",
    table: [
      { metric: "Sentence Variety", valA: "Moderate (tends to keep length uniform)", valB: "High (better flow and burstiness)" },
      { metric: "Vocabulary Traps", valA: "'Delve', 'Furthermore', 'Testament'", valB: "'It is important to note', 'Let's look'" },
      { metric: "AI Detection Rate", valA: "100% (on raw, unedited drafts)", valB: "98% (on raw, unedited drafts)" },
      { metric: "Ideal Use Case", valA: "Coding, short copy, structuring", valB: "Long essays, analysis, detailed prose" }
    ],
    prosA: [
      "Extremely fast response times.",
      "Vast ecosystem of custom GPTs and web integrations.",
      "Excellent coding capabilities."
    ],
    consA: [
      "Often sounds repetitive and robotic without heavy prompting.",
      "Vocabulary choices are easily flagged by basic detectors."
    ],
    prosB: [
      "Writes with a more authentic literary style.",
      "Supports massive document context windows.",
      "Adheres strictly to style instructions."
    ],
    consB: [
      "Fewer direct app integrations.",
      "Still leaves structural markers that scanners easily catch."
    ],
    faq: [
      {
        q: "Why is ChatGPT easier to detect than Claude?",
        a: "ChatGPT's token distribution is slightly more predictable and uniform, meaning basic detectors flag it with high confidence."
      },
      {
        q: "How can I make both models write like a human?",
        a: "By using REDAI Humanizer, which restructures the underlying syntax tree of both models' outputs."
      }
    ]
  },
  {
    id: "chatgpt-vs-gemini",
    title: "ChatGPT vs Google Gemini: AI Comparison and Detection",
    subtitle: "A detailed look at OpenAI and Google's conversational AI models.",
    optionAName: "ChatGPT",
    optionBName: "Google Gemini",
    summary: "ChatGPT is a productivity powerhouse, while Google Gemini is excellent for real-time web research and Google Workspace integration. Both require humanization before public publishing.",
    table: [
      { metric: "Fact Retrieval", valA: "Good (Bing integration)", valB: "Excellent (Google Search native)" },
      { metric: "Writing Tone", valA: "Highly structured, analytical", valB: "Conversational, friendly" },
      { metric: "Detector Vulnerability", valA: "High (highly predictable patterns)", valB: "High (perfect match for Google filters)" },
      { metric: "Multimodal Support", valA: "Strong (GPT-4o)", valB: "Native (Gemini Pro/Ultra)" }
    ],
    prosA: [
      "Highly logical structure.",
      "Excellent formatting options.",
      "Wide custom GPT catalog."
    ],
    consA: [
      "Can feel cold and formulaic.",
      "Readily flagged by standard AI detectors."
    ],
    prosB: [
      "Extremely conversational and easy to read.",
      "Integrates directly with Google Docs.",
      "Real-time web verification."
    ],
    consB: [
      "Prone to occasional logical hallucinations.",
      "Google's own detectors scan and identify its writing footprint immediately."
    ],
    faq: [
      {
        q: "Can Google identify Gemini text on blogs?",
        a: "Google has the signature weights of Gemini outputs. While they don't ban AI text, they penalize unoriginal, repetitive content."
      },
      {
        q: "Which tool is better for SEO content creation?",
        a: "A combination of either model for drafts, followed by REDAI Humanizer to ensure original, helpful-scoring copy."
      }
    ]
  },
  {
    id: "gptzero-vs-copyleaks",
    title: "GPTZero vs Copyleaks: Which AI Detector is More Accurate?",
    subtitle: "Comparing two of the most popular AI content scanners.",
    optionAName: "GPTZero",
    optionBName: "Copyleaks",
    summary: "GPTZero is fast and popular in education, but can produce false positives. Copyleaks is slower but highly accurate for corporate and multi-language audits.",
    table: [
      { metric: "Primary Tech", valA: "Perplexity & Burstiness classifier", valB: "Advanced machine learning patterns", },
      { metric: "False Positives", valA: "Moderate (flags non-native speakers)", valB: "Low (more consistent verification)" },
      { metric: "Processing Speed", valA: "Very Fast (sub-3 seconds)", valB: "Slow (thorough document audits)" },
      { metric: "Plagiarism Scanning", valA: "Basic matching", valB: "Deep historical comparisons" }
    ],
    prosA: [
      "Instant scan feedback.",
      "Clean user interface with highlighted sentences.",
      "Free tiers available."
    ],
    consA: [
      "Highly sensitive, occasionally flagging normal human text.",
      "Struggles with heavily paraphrased AI content."
    ],
    prosB: [
      "Extremely robust enterprise security features.",
      "Vastly lower false-positive rate.",
      "Detects translation and code plagiarisms."
    ],
    consB: [
      "No direct free scans without account creation.",
      "Detailed audits can take time to process."
    ],
    faq: [
      {
        q: "Which detector is harder to bypass?",
        a: "Copyleaks, as it checks for deeper syntax trees rather than simple word predictably."
      },
      {
        q: "How does REDAI bypass both?",
        a: "REDAI restructures both the mathematical predictability (beating GPTZero) and syntax paths (beating Copyleaks)."
      }
    ]
  },
  {
    id: "copyleaks-vs-turnitin",
    title: "Copyleaks vs Turnitin: Enterprise and Academic Detection compared",
    subtitle: "A detailed audit of the two leading enterprise AI detectors.",
    optionAName: "Copyleaks",
    optionBName: "Turnitin",
    summary: "Copyleaks is the top choice for companies, while Turnitin is the absolute ruler of the academic environment. Both check for plagiarism and synthetic text.",
    table: [
      { metric: "Main Target", valA: "Agencies, businesses, SEO networks", valB: "Universities, schools, journals" },
      { metric: "Database Size", valA: "Large (open web scraping)", valB: "Massive (proprietary student paper archive)" },
      { metric: "Accessibility", valA: "Open API and browser portal", valB: "Restricted to educational institutions" },
      { metric: "Detection Scoring", valA: "Binary flag (Human/AI)", valB: "Detailed similarity percentages" }
    ],
    prosA: [
      "Easy integration for businesses.",
      "Scans coding directories for plagiarism.",
      "Multi-language support."
    ],
    consA: [
      "Lacks access to private student databases.",
      "Interface is complex for basic operations."
    ],
    prosB: [
      "Unmatched database of school submissions.",
      "Integrated directly into classroom software.",
      "Highly trusted by professors."
    ],
    consB: [
      "Only accessible through institutional accounts.",
      "Prone to flagging standard quotes and lists."
    ],
    faq: [
      {
        q: "Can Turnitin detect text that passes Copyleaks?",
        a: "Occasionally, yes. Turnitin has historical archives of papers that are not indexed on the open web, giving it an advantage on student essays."
      },
      {
        q: "How can students safely bypass Turnitin?",
        a: "By using REDAI's Academic bypass, which handles structural writing variance while maintaining essay formatting."
      }
    ]
  },
  {
    id: "seo-vs-geo",
    title: "SEO vs GEO: Generative Engine Optimization is Changing Search",
    subtitle: "Traditional SEO meets the new generation of LLM citation optimization.",
    optionAName: "SEO (Search Engine Optimization)",
    optionBName: "GEO (Generative Engine Optimization)",
    summary: "Traditional SEO aims to rank in standard search links, while GEO aims to secure conversational citations and footnotes in AI search engines.",
    table: [
      { metric: "Primary Channel", valA: "Google, Bing search links", valB: "Perplexity, ChatGPT, Gemini chatbots" },
      { metric: "Ranking Factor", valA: "Keywords, Backlinks, Domain Authority", valB: "Factual accuracy, Entity matching, Schema" },
      { metric: "Content Style", valA: "Comprehensive guides, optimized headings", valB: "Q&A, lists, citation-backed answers" },
      { metric: "Main Metric", valA: "Clicks, Impressions, SERP Position", valB: "Footnote citations, Conversational recommendation" }
    ],
    prosA: [
      "Established channel with highly predictable traffic.",
      "Supports various media layouts (images, maps).",
      "Vast tools (Ahrefs, Semrush) exist for measurement."
    ],
    consA: [
      "Highly competitive, taking months to rank new sites.",
      "Constantly disrupted by Google algorithm changes."
    ],
    prosB: [
      "Rapid indexation and citation turnaround.",
      "Drives users with highly specific buying intent.",
      "Closer match to voice searches."
    ],
    consB: [
      "Traffic reporting tools are still in infancy.",
      "Users may read the answer without ever visiting the site."
    ],
    faq: [
      {
        q: "Should I abandon SEO for GEO?",
        a: "No. The best strategy is hybrid: optimize for SEO basics (speed, links) and GEO requirements (definitions, citations, schema)."
      },
      {
        q: "How does REDAI help with GEO?",
        a: "REDAI structures text to make terms and definitions explicit, helping AI engines extract answers easily."
      }
    ]
  },
  {
    id: "geo-vs-aeo",
    title: "GEO vs AEO: Generative Engine Optimization vs Answer Engine Optimization",
    subtitle: "Distinguishing between chatbot citations and voice search snippet optimization.",
    optionAName: "GEO",
    optionBName: "AEO",
    summary: "GEO targets complex LLM reasoning engines like Perplexity, whereas AEO targets quick direct responses like voice assistants and featured snippets.",
    table: [
      { metric: "Target Interfaces", valA: "ChatGPT Search, Gemini, Perplexity", valB: "Alexa, Siri, Featured Snippets" },
      { metric: "Complexity", valA: "High (requires citations, datasets, charts)", valB: "Low (requires simple 40-word summaries)" },
      { metric: "Schema Markup", valA: "Organization, Dataset, Article", valB: "FAQPage, Speakable, HowTo" },
      { metric: "Query Types", valA: "Conversational, research-oriented", valB: "Direct, short factual lookups" }
    ],
    prosA: [
      "Secures citations in detailed user research reports.",
      "Provides multiple links in footnotes.",
      "Positions brand as the ultimate authority."
    ],
    consA: [
      "Requires high factual density and unique data.",
      "Changes as LLM model updates occur."
    ],
    prosB: [
      "Captures Google's Position Zero (Featured Snippet).",
      "Perfect for local query lookups (restaurants, services).",
      "Consistent voice assistant citation."
    ],
    consB: [
      "Single-answer focus: if you aren't first, you get zero traffic.",
      "Answers are often read aloud, yielding fewer site visits."
    ],
    faq: [
      {
        q: "How do I optimize a post for both GEO and AEO?",
        a: "Provide a quick, simple summary (AEO) at the start of your article, followed by in-depth details and schema (GEO) below."
      },
      {
        q: "Is schema markup mandatory for AEO?",
        a: "While not strictly mandatory, FAQ and Speakable schemas dramatically increase your chances of being selected."
      }
    ]
  }
];
