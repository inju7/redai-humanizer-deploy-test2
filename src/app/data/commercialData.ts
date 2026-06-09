export interface CommercialItem {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  contentMarkdown: string;
}

export const commercialData: Record<string, CommercialItem> = {
  pricing: {
    id: "pricing",
    title: "Flexible and Transparent Pricing Plans",
    subtitle: "Select the perfect parameter tier to bypass AI detectors and scale your content.",
    ctaText: "Choose Plan",
    contentMarkdown: `### Pricing Tiers

We offer flexible usage models depending on your output volumes and integration requirements.

| Plan | Credits | Price | Key Features |
| :--- | :--- | :--- | :--- |
| **Free Tier** | 5 credits / month | $0 | Standard humanization, 5 tools, web access |
| **Starter Plan** | 1,000 credits / month | $9 / mo | Deep neural bypass, Academic mode, no ads |
| **Pro Plan** | 5,000 credits / month | $29 / mo | All parameters, faster speeds, priority bypass |
| **Enterprise Plan** | Custom API credits | Custom | Dedicated support, custom integrations, API keys |

### What is a Credit?
One credit allows you to process 100 words of synthetic text. Credits carry over month-to-month on all active premium subscriptions.

### Frequently Asked Questions
* **Q: Can I cancel my plan at any time?**
  Yes, we offer monthly cancelation options on all Starter, Pro, and Agency tiers.
* **Q: Do you offer bulk discounts?**
  Yes, our Agency and Enterprise tiers offer massive discount curves on bulk queries.`
  },
  features: {
    id: "features",
    title: "REDAI Feature Matrix: Enterprise Bypass Protocols",
    subtitle: "Discover the advanced tools inside the REDAI humanization dashboard.",
    ctaText: "Try Features Now",
    contentMarkdown: `### The Full Feature Suite

Our dashboard contains 16+ specialized optimization and humanization tools, making it the most versatile platform on the market.

#### 1. Text Humanizer
The core engine. It restructures LLM token weights and shuffles sentence structures to completely erase the AI signatures of ChatGPT, Claude, and Gemini text.

#### 2. Advanced AI Detector
Scans your drafts against 5 virtual detection models in real-time, giving you warning highlights for sentences likely to trigger AI alerts.

#### 3. Plagiarism Checker
Verifies your output is completely original and does not overlap with existing indexed pages.

#### 4. Custom Tone Adjuster
Fine-tune the output using parameters like:
* **Academic:** Uses sophisticated vocabulary and structured clauses.
* **Flowing:** Optimizes for high readability and engaging cadence.
* **Shorten:** Condenses long paragraphs while maintaining semantic details.
* **Custom:** Add your own custom prompt directions.

#### 5. Additional Tools
Includes citation builders, grammar checking, sentence rewriters, paragraph parsers, and email humanization.`
  },
  api: {
    id: "api",
    title: "Enterprise REST API Integration",
    subtitle: "Integrate REDAI humanization into your CMS, editor, or publishing pipeline.",
    ctaText: "Get API Access",
    contentMarkdown: `### Developer API Documentation

Our API allows you to automate AI detection checks and humanization workflows programmatically.

#### Endpoint URL
\`\`\`bash
POST https://api.redai-humanizer.app/v1/humanize
\`\`\`

#### Headers
| Header | Value | Description |
| :--- | :--- | :--- |
| \`Content-Type\` | \`application/json\` | Required format |
| \`Authorization\` | \`Bearer YOUR_API_KEY\` | Your account credential key |

#### Request Payload Example
\`\`\`json
{
  "text": "Furthermore, it is a testament to the team's effort that the project was finished.",
  "parameter": "flowing",
  "webhooks": {
    "completed": "https://yoursite.com/webhook/redai"
  }
}
\`\`\`

#### Response Payload Example
\`\`\`json
{
  "success": true,
  "original_word_count": 13,
  "humanized_text": "We finished the project on time, which shows how hard the team worked.",
  "bypass_probability": 0.998,
  "credits_used": 1
}
\`\`\`

#### Sample Client Code (NodeJS)
\`\`\`javascript
const response = await fetch('https://api.redai-humanizer.app/v1/humanize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    text: "Your raw AI text goes here...",
    parameter: "academic"
  })
});
const data = await response.json();
console.log(data.humanized_text);
\`\`\`

### FAQ
* **Q: Is there a rate limit?**
  Yes, standard Pro keys have a rate limit of 60 requests per minute, which is customizable for enterprise contracts.`
  },
  integrations: {
    id: "integrations",
    title: "Native App Integrations and Plugins",
    subtitle: "Connect REDAI to your favorite writing tools, editors, and CMS platforms.",
    ctaText: "View Plugins",
    contentMarkdown: `### Ecosystem Integrations

Bypassing AI shouldn't require you to copy-paste between 5 browser tabs. That's why we have built native integrations for:

* **Google Docs Plugin:** Highlight and humanize text directly inside your document sidebar.
* **WordPress CMS Extension:** Auto-scan and humanize blog drafts prior to publishing.
* **Chrome Extension:** Highlight any text field online and select 'REDAI Humanize' from the context menu.
* **Microsoft Word Add-in:** Access our full range of academic bypass parameters inside Word.

### Custom Connectors
Using our webhook support and REST API, you can easily integrate REDAI with Zapier, Make, or custom software scripts.

### FAQ
* **Q: Are integrations included in standard plans?**
  Yes, our browser extensions and workspace plugins are accessible to all Pro and Starter subscribers.`
  },
  agencies: {
    id: "agencies",
    title: "REDAI for Agencies and Content Networks",
    subtitle: "Scale your programmatic SEO and content marketing campaigns safely.",
    ctaText: "Setup Agency Portal",
    contentMarkdown: `### Enterprise Content Auditing

Agencies publishing thousands of articles monthly face a massive challenge: maintaining content quality while using AI resources efficiently. REDAI provides the solution.

#### Key Benefits for Content Agencies
* **Prevent Penalties:** Protect your client sites from sudden traffic drops caused by Google spam updates.
* **Team Accounts:** Setup team folders, monitor credit allocations, and audit drafts in one place.
* **Bulk Uploads:** Upload CSV matrices containing thousands of articles and humanize them in batch.
* **White-Label API:** Build your own custom client-facing rewrite portals using our backend.

### Case Study
A leading affiliate SEO agency humanized 800 programmatic blog posts using REDAI API.
* **Pre-Bypass Indexation:** 42%
* **Post-Bypass Indexation:** 98%
* **Organic Traffic Increase:** +180% within 4 weeks.`
  },
  enterprise: {
    id: "enterprise",
    title: "Enterprise-Grade Document Humanization",
    subtitle: "High-security bypass protocols, custom SLA, and dedicated infrastructure.",
    ctaText: "Contact Sales",
    contentMarkdown: `### Enterprise Security and Compliance

For major institutions, data privacy and server security are paramount. REDAI offers a dedicated enterprise suite designed to meet strict IT standards.

#### Key Infrastructure Capabilities
* **Dedicated GPU Clusters:** Guaranteed zero latency, even during peak loads.
* **Strict Data Privacy:** All inputs are processed in-memory and never logged, cached, or used for model training.
* **SOC2 Compliance:** Our servers undergo standard independent security audits.
* **Custom Models:** We can train and host custom bypass parameters tuned specifically to your brand's unique style guide.

### Contact Our Sales Team
Reach out to set up a demonstration sandbox and discuss custom contract agreements.
* **Email:** enterprise@redai-humanizer.app
* **Phone Support:** Priority line for enterprise subscribers.`
  },
  education: {
    id: "education",
    title: "REDAI for Academic and Educational Use",
    subtitle: "Helping students and researchers protect their voice and write with integrity.",
    category: "Academic",
    ctaText: "Get Student Discount",
    contentMarkdown: `### Academic Integrity and Formatting

AI tools are fantastic for brainstorming and correcting structures, but academic institutions use detectors that flag normal student drafts. REDAI helps you maintain your unique voice.

#### Safeguarding Student Research
* **Preserve Arguments:** Unlike basic spinners, REDAI does not alter your arguments, citations, or data points. It only restructures the grammatical framework.
* **Academic Parameter:** Specifically designed to use appropriate collegiate vocabulary, ensuring your essays sound professional.
* **Plagiarism Matching:** Checks your work against millions of online sources to prevent accidental copying.

### The Student Absolution deal
We support students with:
* 50% discount on all Starter subscriptions.
* Access to citation compilers.
* Standard free daily credits.`
  }
};
