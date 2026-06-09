export interface EntityItem {
  id: string;
  name: string;
  definition: string;
  howItWorks: string;
  useCases: string[];
  comparisons: string;
  faq: { q: string; a: string }[];
  schemaType: string;
}

export const entitiesData: EntityItem[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    definition: "ChatGPT is a state-of-the-art conversational language model developed by OpenAI. It is built on the Generative Pre-trained Transformer (GPT) architecture and is optimized to generate human-like text responses based on user prompts.",
    howItWorks: "ChatGPT uses deep neural networks to predict the next word (or token) in a sequence. By training on a massive dataset of web text, it learns grammar, facts, reasoning patterns, and contextual relationships, which it leverages to write cohesive essays, code, and copy.",
    useCases: [
      "Drafting articles, reports, and social media posts.",
      "Writing and debugging software code across languages.",
      "Summarizing long papers and translating content."
    ],
    comparisons: "Compared to Claude, ChatGPT is often faster and has broader integration plugins, though Claude is generally considered to write with a more natural cadence.",
    faq: [
      {
        q: "Can ChatGPT be detected by AI scanners?",
        a: "Yes, raw ChatGPT outputs leave statistical signatures (low perplexity) that engines like Turnitin and GPTZero easily detect."
      },
      {
        q: "Is ChatGPT free to use?",
        a: "Yes, OpenAI offers free access to its base model, with paid upgrades for faster speeds and advanced reasoning limits."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "claude",
    name: "Claude",
    definition: "Claude is a suite of large language models developed by Anthropic. Focused on helpfulness, harmlessness, and honesty, Claude models feature huge context windows and write with advanced stylistic nuances.",
    howItWorks: "Claude relies on Anthropic's Constitutional AI framework. It processes prompts through deep transformer weights while adhering to safety rules, yielding structured, logical, and highly accurate technical and literary output.",
    useCases: [
      "Long-form document analysis and summarization.",
      "Writing natural, human-sounding marketing copy.",
      "Reviewing and editing academic research papers."
    ],
    comparisons: "Claude writes with higher sentence variation (burstiness) than ChatGPT, though modern classifiers like Copyleaks still catch its underlying statistical signatures.",
    faq: [
      {
        q: "Is Claude better than GPT-4?",
        a: "Claude is often preferred for long context documents and analytical tasks, while GPT-4 is highly rated for code generation."
      },
      {
        q: "How can I make Claude text undetectable?",
        a: "Using an AI Humanizer like REDAI to modify Clause sentence patterns makes the output look completely organic."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "gemini",
    name: "Gemini",
    definition: "Gemini is Google's multimodal AI model, natively built to process and synthesize text, code, images, audio, and video directly into a unified ecosystem.",
    howItWorks: "Gemini leverages Google's advanced TPU infrastructure, integrating with Google Search and the Knowledge Graph to retrieve real-time facts and compile answers dynamically.",
    useCases: [
      "Real-time research and search-linked article generation.",
      "Multimodal analysis (e.g. explaining video files or diagram charts).",
      "Drafting copy for Google Docs and Google Slides."
    ],
    comparisons: "Gemini excels in factual retrieval because of its Google Search integration, but its syntax matches Google's own AI detector signatures perfectly.",
    faq: [
      {
        q: "Does Google index Gemini-generated blogs?",
        a: "Yes, but they must provide genuine user value. Low-quality, repetitive Gemini content is filtered out by Google's Helpful Content updates."
      },
      {
        q: "How do I bypass Gemini AI detection?",
        a: "Run your Gemini drafts through REDAI Humanizer to randomize token patterns and sentence lengths."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    definition: "Perplexity is a conversational answer engine that searches the web in real-time to provide direct, cited answers to user queries.",
    howItWorks: "Perplexity translates user prompts into search queries, scrapes top-ranking web pages, compiles the findings using an LLM, and embeds clickable citations corresponding to the sources.",
    useCases: [
      "Conducting rapid, source-verified research.",
      "Bypassing traditional search pages to get direct answers.",
      "Tracking breaking news with automated citations."
    ],
    comparisons: "Perplexity acts as a research assistant, while ChatGPT serves more as a general-purpose creator and reasoning model.",
    faq: [
      {
        q: "How do I rank in Perplexity?",
        a: "Write factual, data-rich content, include schema tags, and place direct answers at the top of your pages."
      },
      {
        q: "Is Perplexity's traffic valuable?",
        a: "Highly. Users clicking Perplexity citations are looking to buy, verify, or read deeper, yielding excellent conversion rates."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "gptzero",
    name: "GPTZero",
    definition: "GPTZero is a leading AI detector built to identify if text was written by language models like ChatGPT, GPT-4, Claude, or LLaMA.",
    howItWorks: "GPTZero evaluates text based on Perplexity (predictability of word pairings) and Burstiness (sentence length variation). Synthetic text scores high on predictability and low on variance, triggering the AI flag.",
    useCases: [
      "Teachers scanning student submissions for AI plagiarism.",
      "Web publishers vetting freelance writer submissions.",
      "Search editors verifying content originality."
    ],
    comparisons: "GPTZero focuses on sentence-level stats, making it faster but more prone to false positives than deep database crawlers like Turnitin.",
    faq: [
      {
        q: "Can GPTZero detect human writing as AI?",
        a: "Yes. Highly structured human writing (especially by non-native English speakers) is occasionally misclassified."
      },
      {
        q: "How do I beat GPTZero?",
        a: "By introducing high sentence length variance and idiomatic vocabulary, which is what REDAI does automatically."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "copyleaks",
    name: "Copyleaks",
    definition: "Copyleaks is an enterprise-level plagiarism checker and AI detector designed to protect intellectual property and academic integrity.",
    howItWorks: "Copyleaks uses advanced machine learning models trained on millions of human and AI documents to spot syntax structure, translation matches, and paraphrasing footprints.",
    useCases: [
      "Enterprise publishing audits for synthetic text.",
      "Detecting code generation in software teams.",
      "Traditional plagiarism matching in research databases."
    ],
    comparisons: "Copyleaks has a much lower false-positive rate than GPTZero and is highly trusted by corporate compliance teams.",
    faq: [
      {
        q: "Does Copyleaks catch translated text?",
        a: "Yes, it can detect AI translation patterns and multi-language plagiarism."
      },
      {
        q: "How can I check if my text passes Copyleaks?",
        a: "REDAI's built-in detector scans your text against simulated Copyleaks patterns before final export."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "originality-ai",
    name: "Originality.ai",
    definition: "Originality.ai is an AI content detector and plagiarism scanner built specifically for web publishers, affiliate marketers, and SEO agencies.",
    howItWorks: "Originality parses content using custom NLP algorithms tuned to spot the predictable cadences of modern models (like GPT-4o and Claude 3.5). It gives a probability score from 0% to 100%.",
    useCases: [
      "Vetting content purchases during website acquisitions.",
      "Auditing programmatic SEO blogs for Google safety.",
      "Detecting direct plagiarism and AI rewriting."
    ],
    comparisons: "Originality is extremely sensitive, resulting in higher AI flags on normal human text than competitor scanners.",
    faq: [
      {
        q: "What is a good Originality.ai score?",
        a: "Most publishers aim for a score showing over 90% human, though normal human text sometimes registers lower."
      },
      {
        q: "Does REDAI bypass Originality.ai 3.0?",
        a: "Yes, REDAI's advanced bypass parameter is specifically optimized to beat Originality 3.0 algorithms."
      }
    ],
    schemaType: "SoftwareApplication"
  },
  {
    id: "turnitin",
    name: "Turnitin",
    definition: "Turnitin is the global leader in academic integrity verification, providing plagiarism checking and AI writing detection to schools and universities.",
    howItWorks: "Turnitin compiles a student paper, scans it against its massive historical database, and applies deep learning algorithms to predict if segments were written by generative AI.",
    useCases: [
      "High schools checking assignments for ChatGPT use.",
      "Universities verifying thesis submissions.",
      "Academic publishers vetting journal submissions."
    ],
    comparisons: "Unlike web-based tools, Turnitin runs comparison scans against proprietary student databases, making it the most comprehensive academic scanner.",
    faq: [
      {
        q: "Can Turnitin see if I used an AI paraphraser?",
        a: "Standard paraphrasers just swap synonyms, which Turnitin easily spots. Deep structural restructuring, however, passes."
      },
      {
        q: "Does Turnitin report AI scores to students?",
        a: "Only if the instructor enables similarity report visibility in their submission portal."
      }
    ],
    schemaType: "SoftwareApplication"
  }
];
