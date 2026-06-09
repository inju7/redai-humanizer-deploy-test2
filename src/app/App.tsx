import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Cpu, Zap, Layers, Shield, Terminal, Code2,
  TrendingUp, Users, DollarSign, Share2, Tag,
  ChevronRight, Link, BarChart, PenTool, LayoutTemplate,
  Store, Network, MessageSquare, ArrowRight, Activity, Sliders, CheckCircle, Star, Plus, Minus, X, AlertTriangle, Award, Menu, Lock, ShieldAlert, Eye, EyeOff,
  Bold, Italic, Underline, Strikethrough, Heading, List, ListOrdered, Quote,
  Copy, Check
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useQuery, useAction, useMutation, useConvex } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { blogsData } from "./data/blogsData";
import { entitiesData } from "./data/entitiesData";
import { comparisonsData } from "./data/comparisonsData";
import { commercialData } from "./data/commercialData";

import SEOContent from "./components/SEOContent";
import EntityPage from "./components/EntityPage";
import ComparisonPage from "./components/ComparisonPage";
import CommercialPage from "./components/CommercialPage";
import EEATPages from "./components/EEATPages";

type TabState =
  | "home" | "blog" | "ads" | "marketplace" | "referral" | "career"
  | "about" | "contact" | "privacy" | "terms" | "cookies"
  | "pricing" | "features" | "api" | "integrations" | "agencies" | "enterprise" | "education"
  | "entity" | "comparison";

const TOOLS_LIST = [
  "Text Humanizer",
  "AI Detector",
  "Plagiarism Checker",
  "Humanize Email",
  "Grammar Check",
  "Citation Check",
  "Essay Writer",
  "Paragraph Rewriter",
  "Article Rewriter",
  "Sentence Rewriter",
  "Rewording Tool",
  "Detect AI Content",
  "Detector Teachers",
  "Detector College",
  "Detector Academic",
  "Detector Professors"
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabState | "admin">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/\/$/, "");
      if (path === "/blog") return "blog";
      if (path === "/ads") return "ads";
      if (path === "/marketplace") return "marketplace";
      if (path === "/referral") return "referral";
      if (path === "/career" || path === "/careers") return "career";
      if (path === "/admin") return "admin";
      if (path === "/about") return "about";
      if (path === "/contact") return "contact";
      if (path === "/privacy") return "privacy";
      if (path === "/terms") return "terms";
      if (path === "/cookies") return "cookies";
      if (path === "/pricing") return "pricing";
      if (path === "/features") return "features";
      if (path === "/api") return "api";
      if (path === "/integrations") return "integrations";
      if (path === "/agencies") return "agencies";
      if (path === "/enterprise") return "enterprise";
      if (path === "/education") return "education";
      if (path.startsWith("/entity/")) return "entity";
      if ([
        "/chatgpt-vs-claude",
        "/chatgpt-vs-gemini",
        "/gptzero-vs-copyleaks",
        "/copyleaks-vs-turnitin",
        "/seo-vs-geo",
        "/geo-vs-aeo"
      ].includes(path)) return "comparison";
    }
    return "home";
  });
  const [entityId, setEntityId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/\/$/, "");
      if (path.startsWith("/entity/")) {
        return path.replace("/entity/", "");
      }
    }
    return null;
  });
  const [comparisonId, setComparisonId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/\/$/, "");
      const comps = [
        "chatgpt-vs-claude",
        "chatgpt-vs-gemini",
        "gptzero-vs-copyleaks",
        "copyleaks-vs-turnitin",
        "seo-vs-geo",
        "geo-vs-aeo"
      ];
      const found = comps.find(c => `/${c}` === path);
      return found || null;
    }
    return null;
  });

  const [activeTool, setActiveTool] = useState<string>("Text Humanizer");
  const [guestCredits, setGuestCredits] = useState<number>(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [conscienceCleansed, setConscienceCleansed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showInsufficientAlert, setShowInsufficientAlert] = useState(false);

  // Custom SPA router helper
  const handleTabChange = (tab: TabState | "admin", subId?: string) => {
    setActiveTab(tab);
    if (tab === "entity" && subId) {
      setEntityId(subId);
    } else if (tab === "comparison" && subId) {
      setComparisonId(subId);
    }
    if (typeof window !== "undefined") {
      let path = "/";
      if (tab === "home") path = "/";
      else if (tab === "career") path = "/careers";
      else if (tab === "entity" && subId) path = `/entity/${subId}`;
      else if (tab === "comparison" && subId) path = `/${subId}`;
      else path = `/${tab}`;

      if (window.location.pathname !== path) {
        window.history.pushState(null, "", path);
      }
    }
  };

  // Dynamically update <link rel="canonical">, <title>, meta description and JSON-LD schemas
  useEffect(() => {
    const BASE = "https://redai-humanizer.vercel.app";
    
    // Resolve dynamic active route details
    let path = `/${activeTab}`;
    let title = "REDAI Humanizer: Humanize AI Text, Detect AI Content & Optimize for GEO SEO AEO";
    let desc = "Humanize AI text, bypass AI detection, check plagiarism, rewrite content, and optimize for GEO, SEO, and AEO. Free AI Humanizer platform.";

    if (activeTab === "home") {
      path = "/";
      title = "REDAI Humanizer & AI Detector | Humanize AI Text, Plagiarism Checker, GEO SEO AEO Platform";
      desc = "Humanize AI text, bypass AI detection, check plagiarism, rewrite content, and optimize for GEO, SEO, and AEO. Free AI Humanizer platform.";
    } else if (activeTab === "blog") {
      title = "Blog & SEO Content | REDAI Humanizer";
      desc = "Read the latest articles on AI detectors, SEO strategies, Generative Engine Optimization (GEO), and content humanization techniques.";
    } else if (activeTab === "ads") {
      title = "Marketing Deals & Consignments | REDAI Humanizer";
      desc = "Scale your marketing campaigns with REDAI's exclusive business solutions and programmatic copy humanizers.";
    } else if (activeTab === "marketplace") {
      title = "Marketplace | REDAI Humanizer";
      desc = "Purchase credits, license models, and explore content optimization plugins in the REDAI Marketplace.";
    } else if (activeTab === "referral") {
      title = "Referral Program | REDAI Humanizer";
      desc = "Join the REDAI referral network, share your link, and earn credits or commission for every user who registers.";
    } else if (activeTab === "career") {
      path = "/careers";
      title = "Careers at REDAI | Join the NLP Revolution";
      desc = "Explore job openings, salary bands, and join our team in building the next generation of AI content humanizers.";
    } else if (activeTab === "admin") {
      title = "Admin Panel | REDAI Humanizer";
      desc = "Operations monitoring dashboard for REDAI systems administrators.";
    } else if (activeTab === "about") {
      title = "About REDAI Humanizer | Trust & Mission";
      desc = "Dr. Catherine Carter and Marcus Vance explain the mission behind REDAI Humanizer: protecting user voice and writing privacy.";
    } else if (activeTab === "contact") {
      title = "Contact REDAI Operations | 24/7 Technical Support";
      desc = "Contact REDAI support for custom API keys, bulk pricing, or enterprise GPU cluster integrations.";
    } else if (activeTab === "privacy") {
      title = "Privacy Policy | REDAI Humanizer";
      desc = "Learn about REDAI's strict data privacy practices. We process text in-memory and never cache inputs.";
    } else if (activeTab === "terms") {
      title = "Terms & Conditions | REDAI Humanizer";
      desc = "Read our terms of service and license agreement for using REDAI and its API keys.";
    } else if (activeTab === "cookies") {
      title = "Cookie Policy | REDAI Humanizer";
      desc = "Learn how REDAI uses essential browser session cookies to maintain login states.";
    } else if (activeTab === "pricing") {
      title = "Flexible Pricing Plans | REDAI Humanizer";
      desc = "Select the perfect credit tier to bypass AI scanners. Pro, Starter, and free options available.";
    } else if (activeTab === "features") {
      title = "REDAI Feature Matrix | 16+ Advanced Writing Tools";
      desc = "Explore all REDAI features including Text Humanizer, AI Detector, Plagiarism Scanner, and Citation compilers.";
    } else if (activeTab === "api") {
      title = "Enterprise Developer API | REDAI Humanizer";
      desc = "Integrate REDAI humanization and AI detection directly into your publishing app or CMS.";
    } else if (activeTab === "integrations") {
      title = "Native App Integrations & Plugins | REDAI Humanizer";
      desc = "Connect REDAI to Google Docs, WordPress, Chrome extensions, and Microsoft Word.";
    } else if (activeTab === "agencies") {
      title = "REDAI for Content Agencies & Networks";
      desc = "Scale your content marketing and programmatic SEO safely with bulk uploads and team accounts.";
    } else if (activeTab === "enterprise") {
      title = "Enterprise Bypass Solutions & Security";
      desc = "High-speed dedicated GPU clusters, SOC2 security compliance, and custom SLA contracts.";
    } else if (activeTab === "education") {
      title = "REDAI for Academic & Educational Integrity";
      desc = "Get student discounts and utilize specialized academic parameters to bypass Turnitin.";
    } else if (activeTab === "entity" && entityId) {
      path = `/entity/${entityId}`;
      const ent = entitiesData.find(e => e.id === entityId);
      if (ent) {
        title = `${ent.name} GEO Optimization Guide | REDAI Humanizer`;
        desc = `How to optimize content for ${ent.name}, understand its parameters, use cases, and how to bypass its checks.`;
      }
    } else if (activeTab === "comparison" && comparisonId) {
      path = `/${comparisonId}`;
      const comp = comparisonsData.find(c => c.id === comparisonId);
      if (comp) {
        title = `${comp.title} | REDAI Humanizer`;
        desc = `${comp.subtitle} side-by-side matrices, pros & cons, and FAQs.`;
      }
    }

    // Update canonical
    let canonicalEl = document.getElementById("canonical-url") as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      canonicalEl.id = "canonical-url";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = `${BASE}${path}`;

    // Update page title
    document.title = title;

    // Update meta description
    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descEl) {
      descEl = document.createElement("meta");
      descEl.name = "description";
      document.head.appendChild(descEl);
    }
    descEl.content = desc;

    // --- DYNAMIC SCHEMA INJECTION ---
    const existingScript = document.getElementById("redai-jsonld-schema");
    if (existingScript) {
      existingScript.remove();
    }

    // Standard schemas
    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        "name": "REDAI Humanizer",
        "url": BASE,
        "logo": `${BASE}/logo.png`,
        "sameAs": [
          "https://twitter.com/redaihumanizer",
          "https://github.com/redai-humanizer"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-555-7332",
          "contactType": "customer service",
          "email": "support@redai-humanizer.app"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        "url": BASE,
        "name": "REDAI Humanizer",
        "publisher": {
          "@id": `${BASE}/#organization`
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "REDAI Humanizer",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      }
    ];

    // Page-specific schemas
    if (activeTab === "home") {
      // 20 FAQs Page Schema
      const faqsData = [
        {
          q: "What is an AI Humanizer?",
          a: "An AI Humanizer is an advanced software platform designed to rewrite and polish text generated by artificial intelligence models (such as ChatGPT, Claude, and Gemini). It analyzes word pairing probability (perplexity) and sentence length distribution (burstiness) to match the natural flow and rhythm of human writing."
        },
        {
          q: "How does AI content detection work?",
          a: "AI content detectors evaluate text by measuring statistical predictability. Since large language models (LLMs) output tokens based on high mathematical probability, their prose exhibits low perplexity (predictable word choices) and low burstiness (uniform sentence structures). Scanners flag text when these markers stay above a threshold."
        },
        {
          q: "Can GPTZero detect ChatGPT-4o writing?",
          a: "Yes. GPTZero's classification models are constantly trained on GPT-4o, Claude 3.5, and Gemini outputs. They easily spot the signature vocabulary and sentence symmetry of raw drafts unless the text is humanized."
        },
        {
          q: "Can Turnitin detect AI-generated writing?",
          a: "Yes, Turnitin has a highly advanced, proprietary AI classifier integrated directly into its plagiarism checking software. It breaks down student papers into segments and calculates a synthetic likelihood score, flagging copied phrases or AI structural patterns."
        },
        {
          q: "What is GEO (Generative Engine Optimization)?",
          a: "GEO is the process of structuring and writing website content so that AI search engines (like ChatGPT Search, Gemini, Perplexity, and Claude) cite, footnote, and recommend your site in their conversational answers."
        },
        {
          q: "What is AEO (Answer Engine Optimization)?",
          a: "AEO focuses on tailoring content to provide direct, concise answers for quick featured snippets and vocal smart assistants (like Siri, Google Assistant, and Alexa). It relies heavily on structured FAQs, checklists, and summary definitions."
        },
        {
          q: "How do AI search engines crawl websites?",
          a: "AI search engines use specialized user-agents (like OAI-SearchBot or PerplexityBot) to index the web. They extract structured data, schemas, direct answers, and reputable outbound link references to construct conversational responses."
        },
        {
          q: "How does REDAI Humanizer bypass AI detectors?",
          a: "REDAI restructures synthetic text by shuffling syntax trees, varying sentence lengths (increasing burstiness), replacing predictable AI transition markers, and using context-aware vocabulary to drop AI scores to 0%."
        },
        {
          q: "Does Google search penalize AI content?",
          a: "Google's search guidelines state they reward high-quality, original content that demonstrates E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness), regardless of how it was produced. However, they actively penalize thin, repetitive synthetic spam."
        },
        {
          q: "Is using an AI humanizer safe for academic submissions?",
          a: "Yes, when used responsibly to check, refine, and improve the clarity of your own arguments. REDAI's Academic bypass preserves citations and data integrity while randomizing statistical patterns."
        },
        {
          q: "What is the difference between GEO and traditional SEO?",
          a: "Traditional SEO focuses on keyword density, backlinks, and domain authority to rank in Google's blue links. GEO focuses on entity relevance, factual density, and schema markup to win footnotes and citation chips in AI chatbot responses."
        },
        {
          q: "How does AEO differ from GEO?",
          a: "AEO focuses on short, direct voice-search answers and featured snippets. GEO optimized for multi-layered LLM reasoning queries that combine multiple entities and require comprehensive citation-backed research pages."
        },
        {
          q: "How do I secure citations in Perplexity?",
          a: "Provide high-factual-density content, place a clear answer summary at the top of your page, maintain fast page loads, and format data using structured tables or bullets."
        },
        {
          q: "Does REDAI offer API support?",
          a: "Yes. REDAI offers a developer API that integrates easily into your CMS, article generators, or agency dashboards, automating AI scans and humanizations in bulk."
        },
        {
          q: "Does REDAI check for plagiarism?",
          a: "Yes, we integrate an advanced plagiarism scanner that matches your output against indexed pages to guarantee your content is completely original before exporting."
        },
        {
          q: "What are REDAI's rewrite parameters?",
          a: "We offer specialized modes: Academic (formal collegiate tone), Flowing (engaging blog style), Shorten (condensed copy), Formal (corporate prose), and Custom (prompt-driven directions)."
        },
        {
          q: "What is a false positive in AI detection?",
          a: "A false positive occurs when a human-written document is misclassified as AI. This happens frequently on highly structured technical papers, essays by non-native English speakers, or formulaic reviews."
        },
        {
          q: "Can Copyleaks detect paraphrased AI text?",
          a: "Standard paraphrasers that only swap synonyms are quickly flagged by Copyleaks. REDAI bypasses Copyleaks by applying deep structural alterations to sentence structures."
        },
        {
          q: "Why is an indexable sitemap important?",
          a: "Sitemaps list all active URLs, allowing traditional search spiders and AI search agents to locate and index your articles, entity pages, and tools without missing deep directories."
        },
        {
          q: "How do E-E-A-T pages benefit my website?",
          a: "Pages like About, Contact, and Policies show Google and AI assistants that your website is owned and run by real, trustworthy entities, increasing your domain authority and recommendation scores."
        }
      ];
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqsData.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      });
    } else if (activeTab === "entity" && entityId) {
      const ent = entitiesData.find(e => e.id === entityId);
      if (ent) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ent.faq.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        });
        schemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
            { "@type": "ListItem", "position": 2, "name": "Entities", "item": `${BASE}/entity` },
            { "@type": "ListItem", "position": 3, "name": ent.name, "item": `${BASE}/entity/${entityId}` }
          ]
        });
      }
    } else if (activeTab === "comparison" && comparisonId) {
      const comp = comparisonsData.find(c => c.id === comparisonId);
      if (comp) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": comp.faq.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        });
        schemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE },
            { "@type": "ListItem", "position": 2, "name": comp.title, "item": `${BASE}/${comparisonId}` }
          ]
        });
      }
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "redai-jsonld-schema";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);
  }, [activeTab, entityId, comparisonId]);

  // Listen to browser back/forward navigation popstate events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, "");
      if (path === "/blog") setActiveTab("blog");
      else if (path === "/ads") setActiveTab("ads");
      else if (path === "/marketplace") setActiveTab("marketplace");
      else if (path === "/referral") setActiveTab("referral");
      else if (path === "/career" || path === "/careers") setActiveTab("career");
      else if (path === "/admin") setActiveTab("admin");
      else if (path === "/about") setActiveTab("about");
      else if (path === "/contact") setActiveTab("contact");
      else if (path === "/privacy") setActiveTab("privacy");
      else if (path === "/terms") setActiveTab("terms");
      else if (path === "/cookies") setActiveTab("cookies");
      else if (path === "/pricing") setActiveTab("pricing");
      else if (path === "/features") setActiveTab("features");
      else if (path === "/api") setActiveTab("api");
      else if (path === "/integrations") setActiveTab("integrations");
      else if (path === "/agencies") setActiveTab("agencies");
      else if (path === "/enterprise") setActiveTab("enterprise");
      else if (path === "/education") setActiveTab("education");
      else if (path.startsWith("/entity/")) {
        setActiveTab("entity");
        setEntityId(path.replace("/entity/", ""));
      } else {
        const comps = [
          "chatgpt-vs-claude",
          "chatgpt-vs-gemini",
          "gptzero-vs-copyleaks",
          "copyleaks-vs-turnitin",
          "seo-vs-geo",
          "geo-vs-aeo"
        ];
        const found = comps.find(c => `/${c}` === path);
        if (found) {
          setActiveTab("comparison");
          setComparisonId(found);
        } else {
          setActiveTab("home");
        }
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Authentication via Convex Auth
  const user = useQuery(api.users.current);
  const rawIdentity = useQuery(api.users.checkAuth);
  const { signIn, signOut } = useAuthActions();
  const convex = useConvex();

  // Log auth state to browser console for debugging
  useEffect(() => {
    console.log("REDAI Auth Debug:", { user, rawIdentity, convexUrl: import.meta.env.VITE_CONVEX_URL });
  }, [user, rawIdentity]);

  // Credits: admin = unlimited, logged-in user = from DB, guest = local state
  const isAdmin = user?.role === "admin";
  const credits: number | "Unlimited" = isAdmin ? "Unlimited" : (user?.credits ?? guestCredits);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpName, setSignUpName] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Auto-redirect admin users to admin panel when they sign in
  // Also close the auth modal when user becomes authenticated (handles Google OAuth redirect)
  useEffect(() => {
    if (user) {
      setIsSignInModalOpen(false);
      setIsSignUpMode(false);
      if (user.role === "admin" && activeTab !== "admin") {
        handleTabChange("admin");
      }
    }
  }, [user]);

  // Active Tab in Admin Dashboard
  const [adminActiveTab, setAdminActiveTab] = useState<"overview" | "careers" | "marketplace" | "marketing" | "referrals">("overview");

  return (
    <div className="relative min-h-screen pb-12 sm:pb-32 bg-[var(--theme-bg)] selection:bg-[var(--theme-accent)] selection:text-white">

      {/* High-Contrast Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-[4px] border-black text-white h-16 lg:h-20">
        <div className="w-full max-w-full mx-auto h-full flex items-center justify-between px-3 sm:px-6">
          <div className="flex items-center gap-4 lg:gap-12">
            <div className="flex items-center gap-2 lg:gap-3 cursor-pointer" onClick={() => { handleTabChange("home"); window.scrollTo(0, 0); }}>
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white border-2 border-white">
                <Cpu className="text-black size-[18px] lg:size-[24px]" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-orbitron italic font-bold tracking-tighter text-white uppercase">
                RED<span className="text-[var(--theme-accent)]">AI</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <NavButton active={activeTab === "home"} href="/" onClick={() => { handleTabChange("home"); window.scrollTo(0, 0); }}>REDAI HUMANIZER</NavButton>
              <NavButton active={activeTab === "blog"} href="/blog" onClick={() => { handleTabChange("blog"); window.scrollTo(0, 0); }}>BLOG</NavButton>
              <NavButton active={activeTab === "ads"} href="/ads" onClick={() => { handleTabChange("ads"); window.scrollTo(0, 0); }}>MARKETING DEALS</NavButton>
              <NavButton active={activeTab === "marketplace"} href="/marketplace" onClick={() => { handleTabChange("marketplace"); window.scrollTo(0, 0); }}>MARKETPLACE</NavButton>
              <NavButton active={activeTab === "referral"} href="/referral" onClick={() => { handleTabChange("referral"); window.scrollTo(0, 0); }}>REFERRAL</NavButton>
              <NavButton active={activeTab === "career"} href="/careers" onClick={() => { handleTabChange("career"); window.scrollTo(0, 0); }}>CAREER</NavButton>
              <div className="w-8"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black border-2 border-white">
              <Zap size={16} className="text-[var(--theme-cyan)]" />
              <span className="text-sm font-orbitron italic font-bold text-white">{credits === "Unlimited" ? "UNLIMITED" : `${credits} UNITS`}</span>
            </div>
            {user === undefined ? (
              // Auth state still loading — show neutral placeholder to avoid flashing SIGN IN
              <div className="w-20 h-8 bg-white/10 border-2 border-white/20 animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="brutal-button bg-[var(--theme-cyan)] hover:bg-[var(--theme-accent)] border-white text-black hover:text-white !px-3 !py-1.5 lg:!px-4 lg:!py-2.5 !text-xs font-orbitron font-black uppercase flex items-center gap-2 cursor-pointer shadow-[2px_2px_0_#fff] active:translate-x-0.5 active:translate-y-0.5 select-none"
                >
                  <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-orbitron font-extrabold text-[9px] uppercase border border-white">
                    {(user.name ?? user.email ?? "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[70px] truncate">{(user.name ?? user.email ?? "User").split(" ")[0]}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border-4 border-black text-black font-jakarta p-4 z-[9999] shadow-[6px_6px_0_#000] text-xs font-bold leading-normal">
                    <p className="font-orbitron font-extrabold uppercase text-[8px] text-gray-500 tracking-widest leading-none mb-1">Logged In As</p>
                    <p className="text-black font-extrabold truncate text-sm leading-tight">{user.name ?? "User"}</p>
                    <p className="text-gray-500 truncate text-[10px] mb-3 leading-tight">{user.email ?? ""}</p>
                    <div className="h-[2px] bg-black my-3"></div>
                    <p className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 uppercase tracking-widest text-[8px] font-orbitron font-black">Role:</span>
                      <span className={`px-2 py-0.5 text-[9px] font-orbitron font-black uppercase text-white ${user.role === 'admin' ? 'bg-red-600' : 'bg-green-600'}`}>
                        {user.role ?? "user"}
                      </span>
                    </p>
                    <p className="flex justify-between items-center mb-3">
                      <span className="text-gray-500 uppercase tracking-widest text-[8px] font-orbitron font-black">Credits:</span>
                      <span className="text-[var(--theme-accent)] font-extrabold text-sm">{credits === "Unlimited" ? "UNLIMITED" : `${credits} Units`}</span>
                    </p>

                    {user.role === 'admin' && (
                      <>
                        <div className="h-[2px] bg-black my-3"></div>
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            if (activeTab === "admin") {
                              handleTabChange("home");
                            } else {
                              handleTabChange("admin");
                            }
                          }}
                          className="w-full text-center py-2 font-orbitron font-black uppercase bg-[var(--theme-accent)] text-white hover:bg-black hover:text-white border-2 border-black transition-all mb-2 cursor-pointer shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5"
                        >
                          {activeTab === "admin" ? "Exit Admin Panel" : "Admin Panel"}
                        </button>
                      </>
                    )}
                    <div className="h-[2px] bg-black my-3"></div>
                    <button
                      onClick={() => {
                        void signOut();
                        setIsProfileDropdownOpen(false);
                        if (activeTab === "admin") handleTabChange("home");
                      }}
                      className="w-full text-center py-2 font-orbitron font-black uppercase bg-black text-white hover:bg-[var(--theme-accent)] border-2 border-black transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="brutal-button bg-[var(--theme-accent)] hover:bg-[var(--theme-cyan)] border-white text-white hover:text-black !px-3 !py-1.5 lg:!px-6 lg:!py-3 !text-[11px] lg:!text-sm cursor-pointer"
              >
                SIGN IN
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-black border-2 border-white text-white hover:bg-[var(--theme-accent)] transition-colors active:translate-y-0.5"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 lg:top-20 left-0 right-0 bg-black border-b-4 border-black z-50 p-3 lg:hidden flex flex-col gap-1.5 shadow-[0_8px_0_#000]"
          >
            {[
              { id: "home", label: "REDAI HUMANIZER", href: "/" },
              { id: "blog", label: "BLOG", href: "/blog" },
              { id: "ads", label: "MARKETING DEALS", href: "/ads" },
              { id: "marketplace", label: "MARKETPLACE", href: "/marketplace" },
              { id: "referral", label: "REFERRAL", href: "/referral" },
              { id: "career", label: "CAREER", href: "/careers" }
            ].map(tab => (
              <a
                key={tab.id}
                href={tab.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(tab.id as TabState);
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`w-full text-left px-3 py-2.5 font-orbitron font-bold text-[10px] uppercase transition-all border-2 block ${activeTab === tab.id
                  ? "bg-[var(--theme-accent)] text-white border-white shadow-[2px_2px_0_#fff]"
                  : "bg-transparent text-gray-300 border-transparent hover:border-white hover:text-white"
                  }`}
              >
                {tab.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED LEFT SIDEBAR (Collapsible Drawer on Mobile, Docked on Desktop) */}
      {activeTab === "home" && (
        <>
          {/* Backdrop (closes sidebar on tap) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-30 lg:hidden animate-fade-in"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}



          <aside className={`fixed top-16 lg:top-20 left-0 bottom-0 sm:bottom-32 w-[240px] bg-white border-r-4 border-black z-40 flex flex-col shadow-[4px_0_0_#000] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="bg-black text-white p-3 border-b-4 border-black text-center flex items-center justify-between">
              <h3 className="font-orbitron font-bold italic text-sm tracking-wider mx-auto">AI PROTOCOLS</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white hover:text-[var(--theme-accent)] transition-colors pr-1">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 brutal-scrollbar">
              {TOOLS_LIST.map((tool) => (
                <button
                  key={tool}
                  onClick={() => {
                    setActiveTool(tool);
                    handleTabChange("home");
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 font-jakarta text-[13px] font-bold uppercase transition-all border-2 ${activeTool === tool
                    ? "bg-[var(--theme-accent)] text-white border-black shadow-[2px_2px_0_#000] translate-x-1"
                    : "bg-transparent text-black border-transparent hover:border-black hover:translate-x-1"
                    }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={`relative z-10 pt-16 lg:pt-20 min-h-[80vh] ${activeTab === "home" ? "lg:pl-[240px]" : ""}`}>
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-0">

              {/* --- SMART WORKSPACE --- */}
              <section className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 py-6 lg:py-8">

                {/* Embedded Active Protocol Bar for Mobile */}
                <div className="lg:hidden w-full mb-5">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="w-full bg-white border-[3px] border-black p-3.5 flex items-center justify-between shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-black flex items-center justify-center border border-black shadow-[1px_1px_0_var(--theme-accent)]">
                        <Sliders size={12} className="text-white group-hover:rotate-90 transition-transform" />
                      </div>
                      <div className="text-left">
                        <p className="font-orbitron font-black text-[8px] uppercase tracking-widest text-gray-500 leading-none mb-0.5">Active Protocol</p>
                        <p className="font-orbitron font-extrabold text-[11px] uppercase text-[var(--theme-accent)] leading-none">{activeTool}</p>
                      </div>
                    </div>
                    <span className="font-orbitron font-black text-[8px] bg-black text-white px-2 py-1 uppercase tracking-widest border border-black group-hover:bg-[var(--theme-accent)] transition-colors">Change</span>
                  </button>
                </div>

                <div className="mb-4 lg:mb-6 flex justify-between items-end">
                  <div>
                    <div className="inline-block px-2 py-0.5 bg-black text-white font-orbitron italic text-[8px] sm:text-xs mb-1.5 sm:mb-2">AETERNUM PROTOCOL V4.2</div>
                    <div>
                      <h1
                        style={{ WebkitTextStroke: '0px' }}
                        className="inline-block bg-[var(--theme-accent)] text-white border-2 border-black px-3 py-1 sm:px-4 sm:py-1.5 font-orbitron italic font-bold uppercase leading-none text-lg sm:text-2xl md:text-4xl shadow-[3px_3px_0_#000] mb-1 sm:mb-2"
                      >
                        Architecting The Truth
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Two-Pane Workspace */}
                <WorkspaceProcessor activeTool={activeTool} credits={credits} setGuestCredits={setGuestCredits} setShowInsufficientAlert={setShowInsufficientAlert} />

                {/* THE FREE RIDER'S ABSOLUTION PROTOCOL (Moral Conscience Arbitrage) */}
                <div className="mt-8 brutal-container bg-white border-4 border-black p-5 sm:p-8 relative overflow-hidden group shadow-[6px_6px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_var(--theme-accent)] transition-all">
                  <div className="absolute top-0 right-0 bg-black text-white border-b-2 border-l-2 border-black font-orbitron font-extrabold text-[7px] sm:text-[9px] px-3 py-1 uppercase tracking-widest z-10 animate-pulse">
                    STATUS: ACTIVE ARBITRAGE
                  </div>

                  <div className="relative z-10 max-w-4xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-black text-[var(--theme-cyan)] flex items-center justify-center border border-black shadow-[1px_1px_0_var(--theme-accent)]">
                        <Activity size={12} className="animate-spin" />
                      </div>
                      <h2 className="text-sm sm:text-base font-orbitron italic font-extrabold uppercase text-black tracking-tight leading-none mt-0.5">
                        Proprietary Moral Tax Protocol V1.2
                      </h2>
                    </div>

                    <p className="font-jakarta text-[11px] sm:text-xs font-bold text-black leading-relaxed mb-6">
                      We noticed you are bypassing enterprise-grade AI detectors for the low, low price of <span className="text-[var(--theme-accent)] font-extrabold">absolutely free</span>. Since server power isn't fueled by sheer good vibes alone, we present to you the <span className="underline decoration-[var(--theme-accent)] decoration-2">Free Rider's Absolution</span>. It costs exactly zero pesos, clears your conscience of riding our GPU clusters for free, and guarantees our developers get to eat lunch today.
                      <br />
                      <span className="italic text-gray-500 mt-2 block">Think of it as a mutual non-aggression pact: we give you 100% human-grade bypass scores, you make us famous with your friends. Deal?</span>
                    </p>

                    {/* Conscience Tracker / Progress Bar */}
                    <div className="bg-gray-100 border-2 border-black p-3.5 mb-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 text-[8px] sm:text-[9px] font-orbitron font-black uppercase">
                          <span className="text-black">Your Conscience Balance:</span>
                          <span className={conscienceCleansed ? "text-green-600 animate-bounce font-black" : "text-red-500 font-black animate-pulse"}>
                            {conscienceCleansed ? "100% CLEANSED" : "0% (GUILTY RIDER)"}
                          </span>
                        </div>
                        <div className="w-full h-4 bg-white border border-black p-0.5 relative overflow-hidden">
                          <div
                            className={`h-full border-r border-black transition-all duration-1000 ${conscienceCleansed ? 'w-full bg-green-500' : 'w-[10%] bg-red-500 animate-pulse'}`}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("https://redaihumanizer.com");
                            setCopiedShare(true);
                            setConscienceCleansed(true);
                            setTimeout(() => setCopiedShare(false), 3000);
                          }}
                          className={`px-4 py-2 font-orbitron font-black text-[9px] uppercase tracking-wider border-2 transition-all shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${conscienceCleansed ? 'bg-green-500 text-white border-black' : 'bg-black text-white border-black hover:bg-[var(--theme-accent)]'}`}
                        >
                          {copiedShare ? "Link Copied! Conscience +100" : "Copy Share Link"}
                        </button>

                        <a
                          href="https://twitter.com/intent/tweet?text=Bypassing%20AI%20detection%20instantly%20with%20REDAI%20Humanizer!%20Check%20it%20out:%20https://redaihumanizer.com"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setConscienceCleansed(true)}
                          className="px-3.5 py-2 bg-[var(--theme-cyan)] text-black border-2 border-black font-orbitron font-black text-[9px] uppercase tracking-wider hover:bg-black hover:text-white transition-colors active:translate-y-0.5 shadow-[2px_2px_0_#000] active:shadow-none"
                        >
                          Tweet It
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              {/* --- LANDING PAGE EXTENSIONS --- */}

              {/* Companies Carousel */}
              <div className="border-y-4 border-black bg-white overflow-hidden py-8">
                <div className="flex overflow-hidden">
                  <div className="animate-infinite-scroll flex gap-16 items-center px-6">
                    {Array(10).fill(["ACME CORP", "GLOBEX", "SOYLENT", "INITECH", "UMBRELLA", "STARK IND"]).flat().map((company, i) => (
                      <span key={i} className="text-3xl font-black uppercase text-gray-300 mx-8 tracking-widest">{company}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Involved & Partnership Carousel */}
              <div className="border-b-4 border-black bg-red-600 overflow-hidden py-6">
                <div className="flex overflow-hidden">
                  <div className="animate-infinite-scroll flex gap-16 items-center px-6">
                    {Array(10).fill(["PARTNER PROTOCOL", "GLOBAL TECH", "SYNERGY AI", "CORE SYSTEMS", "NEXUS LABS", "VENTURE RED"]).flat().map((item, i) => (
                      <div key={i} className="flex items-center gap-4 mx-8">
                        <div className="w-8 h-8 bg-white border-2 border-black rotate-45 flex items-center justify-center">
                          <Cpu size={14} className="text-black -rotate-45" />
                        </div>
                        <span className="text-2xl font-black uppercase text-white tracking-tighter italic">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Creative 'How to Use It' Guide */}
              <section className="bg-white border-b-4 border-black py-12 px-6 relative overflow-hidden">
                {/* Cybergrid background details */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="max-w-[1200px] mx-auto relative z-10">
                  <div className="text-center mb-10">
                    <span className="text-[var(--theme-accent)] font-orbitron font-bold uppercase tracking-[0.3em] text-[10px] mb-1.5 block">OPERATIONAL PROTOCOL</span>
                    <h2 className="inline-block bg-black text-white border-2 border-black px-4 py-1.5 font-orbitron italic font-bold uppercase tracking-tighter text-3xl md:text-4xl mb-3 shadow-[4px_4px_0_var(--theme-accent)]">How to Use RED<span className="text-[var(--theme-accent)]">AI</span> Humanizer</h2>
                    <p className="text-xs md:text-sm text-black font-jakarta font-bold max-w-xl mx-auto">Transform robotic AI text into 100% human-grade, undetectable copy in three rapid steps.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line on Desktop */}
                    <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-black z-0"></div>

                    {/* Step 1 */}
                    <div className="brutal-container bg-white border-2 border-black p-5 relative z-10 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--theme-cyan)] transition-all group">
                      <div className="w-10 h-10 bg-black text-[var(--theme-cyan)] border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm mb-3">
                        01
                      </div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 text-black">1. Load Your Content</h3>
                      <p className="font-jakarta text-[11px] text-black font-semibold leading-relaxed mb-3">
                        Paste raw generations from ChatGPT, Claude, or Gemini into the main editor, or upload your document formats.
                      </p>
                      {/* Mock UI Element */}
                      <div className="bg-gray-100 border border-black p-1.5 font-mono text-[8px] text-black font-bold rounded-sm">
                        <span className="text-[var(--theme-accent)]">&gt;</span> payload_load_successful: 100%
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="brutal-container bg-[var(--theme-accent)] border-2 border-black p-5 relative z-10 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#000] transition-all group text-black">
                      <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm mb-3">
                        02
                      </div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 text-black">2. Bypass Scan Check</h3>
                      <p className="font-jakarta text-[11px] text-black leading-relaxed mb-3 font-bold">
                        Run neural matching to verify sentence-level signatures and locate precise phrases flagged by detectors.
                      </p>
                      {/* Mock UI Element */}
                      <div className="bg-black text-[var(--theme-cyan)] border border-black p-1.5 font-mono text-[8px] rounded-sm flex justify-between items-center">
                        <span>Scan status:</span>
                        <span className="animate-pulse font-bold text-red-500">AI MATCH FOUND</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="brutal-container bg-white border-2 border-black p-5 relative z-10 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--theme-accent)] transition-all group text-black">
                      <div className="w-10 h-10 bg-black text-[var(--theme-cyan)] border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm mb-3">
                        03
                      </div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 text-black">3. Humanize & Deploy</h3>
                      <p className="font-jakarta text-[11px] text-black font-semibold leading-relaxed mb-3">
                        Click 'Humanize' to shuffle syntax, randomize vocabulary, and instantly output fully organic-grade text.
                      </p>
                      {/* Mock UI Element */}
                      <div className="bg-gray-100 border border-black p-1.5 font-mono text-[8px] text-[var(--theme-accent)] rounded-sm flex justify-between items-center font-bold">
                        <span>Human bypass score:</span>
                        <span className="font-bold text-green-600">100% HUMAN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How it Works / Proof (Updated Text & Darker Font) */}
              {/* Why REDAI Benefits You: Website About & Features */}
              <section className="bg-[var(--theme-accent)] border-b-4 border-black py-12 px-6">
                <div className="max-w-[1200px] mx-auto">
                  <div className="text-center mb-12">
                    <span className="text-black font-orbitron font-extrabold uppercase tracking-[0.2em] text-[9px] bg-white border border-black px-2 py-0.5 mb-2 inline-block">OUR MISSION PROTOCOL</span>
                    <h2 className="text-3xl md:text-4xl text-black font-orbitron italic font-bold uppercase tracking-tighter mb-2 shadow-none">Why RED<span className="text-[var(--theme-cyan)]">AI</span> Humanizer Benefits You</h2>
                    <p className="text-xs md:text-sm text-black font-jakarta font-bold max-w-2xl mx-auto">
                      REDAI is a state-of-the-art neural bypass workspace built to bridge the gap between AI generation and natural human flow. We empower students, marketers, and creators to bypass restrictive detectors completely.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Benefit 1 */}
                    <div className="brutal-container bg-white border-2 border-black p-5 relative group shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_#000] transition-all">
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--theme-cyan)] border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm">01</div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 mt-1 text-black">100% Undetectable AI Bypass</h3>
                      <p className="font-jakarta font-bold text-black text-xs leading-relaxed">
                        Bypass Turnitin, Originality.ai, GPTZero, and Copyleaks seamlessly. Our Aeternum engines re-engineer sentence signatures to achieve perfect organic marks every time.
                      </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="brutal-container bg-white border-2 border-black p-5 relative group shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_#000] transition-all text-black">
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--theme-accent)] border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm text-white">02</div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 mt-1 text-black">Context-Aware Re-writing</h3>
                      <p className="font-jakarta font-bold text-black text-xs leading-relaxed">
                        No broken grammar or clumsy synonyms. REDAI dynamically restructures phrases, shuffles syntactic patterns, and injects authentic cadence while leaving your original facts and arguments completely untouched.
                      </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="brutal-container bg-white border-2 border-black p-5 relative group shadow-[4px_4px_0_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0_#000] transition-all">
                      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--theme-cyan)] border-2 border-black flex items-center justify-center font-orbitron font-bold text-sm">03</div>
                      <h3 className="text-base font-orbitron italic font-bold uppercase mb-2 mt-1 text-black">16+ Specialized Tools</h3>
                      <p className="font-jakarta font-bold text-black text-xs leading-relaxed">
                        Switch instantly between dedicated modules: Plagiarism checkers, Grammar correctors, Article/Sentence rewriters, Essay builders, and citation engines inside one central dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Testimonials (Interactive Mobile Carousel + Rating Badge, Desktop High-Density Grid) */}
              <section className="bg-white border-b-4 border-black py-12 px-4 sm:px-6">
                <div className="max-w-[1600px] mx-auto">
                  <div className="text-center mb-10">
                    <span className="text-[var(--theme-accent)] font-orbitron font-bold uppercase tracking-[0.3em] text-[10px] mb-1.5 block">CUSTOMER VERIFICATION</span>
                    <h2 className="text-2xl sm:text-4xl text-black font-orbitron italic font-bold uppercase tracking-tighter mb-3 leading-none">Verified Operations</h2>

                    {/* Rating Stats Summary */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-black border-2 border-black text-white p-3 shadow-[4px_4px_0_var(--theme-accent)] mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg sm:text-xl font-orbitron font-black text-[var(--theme-cyan)]">4.9</span>
                        <div className="flex text-[var(--theme-accent)]">
                          <Star size={11} fill="currentColor" className="text-[var(--theme-accent)]" />
                          <Star size={11} fill="currentColor" className="text-[var(--theme-accent)]" />
                          <Star size={11} fill="currentColor" className="text-[var(--theme-accent)]" />
                          <Star size={11} fill="currentColor" className="text-[var(--theme-accent)]" />
                          <Star size={11} fill="currentColor" className="text-[var(--theme-accent)]" />
                        </div>
                      </div>
                      <div className="h-4 w-[1px] bg-white/30 hidden sm:block"></div>
                      <span className="font-orbitron font-bold text-[8px] sm:text-[9px] uppercase tracking-wider">15,000+ COMPLETED BYPASSES</span>
                      <div className="h-4 w-[1px] bg-white/30 hidden sm:block"></div>
                      <span className="font-jakarta text-[8px] sm:text-[9px] text-green-400 font-black">99.8% SUCCESS SCORE</span>
                    </div>
                  </div>

                  {/* Automatic Carousel: Infinite Auto-scrolling Verified Operations/Customers Feedback */}
                  <div className="space-y-4 overflow-hidden py-4 select-none relative w-full">
                    {/* Soft fade gradients on the sides of the carousel for desktop */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden md:block" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden md:block" />

                    {/* Row 1: Ticker moving left */}
                    <div className="flex overflow-hidden w-full">
                      <div className="animate-infinite-scroll flex gap-4 items-center px-4" style={{ animationDuration: '30s' }}>
                        {[
                          { name: "Sarah J.", role: "College Student", text: "Bypassed Turnitin instantly. Saved my academic career. 10/10 protocol." },
                          { name: "Mark T.", role: "SEO Agency", text: "We use the API to mass-humanize our programmatic SEO blogs. AdSense approved." },
                          { name: "Elena R.", role: "Freelance Writer", text: "Clients think I spend hours writing these articles. Matches my voice perfectly." },
                          { name: "David C.", role: "Content Manager", text: "Tested 5 different tools. REDAI is the only one that passes Originality 3.0." },
                          { name: "Priya M.", role: "Professor", text: "The detection is incredibly accurate. I use it to filter out low-effort submissions." },
                          { name: "James L.", role: "Affiliate Marketer", text: "My product review sites are flourishing. The rewording tool handles bulk jobs." },
                          { name: "Chris W.", role: "Editor", text: "Uncanny cadence matching. The grammar check alone saves my team hours." },
                          { name: "Anna B.", role: "Student", text: "The essay writer provides an amazing starting point without raising any AI flags." }
                        ].map((item, idx) => (
                          <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0">
                            <TestimonialCard name={item.name} role={item.role} text={item.text} isCompact={false} />
                          </div>
                        ))}
                        {/* Duplicate Row 1 for continuous infinite looping */}
                        {[
                          { name: "Sarah J.", role: "College Student", text: "Bypassed Turnitin instantly. Saved my academic career. 10/10 protocol." },
                          { name: "Mark T.", role: "SEO Agency", text: "We use the API to mass-humanize our programmatic SEO blogs. AdSense approved." },
                          { name: "Elena R.", role: "Freelance Writer", text: "Clients think I spend hours writing these articles. Matches my voice perfectly." },
                          { name: "David C.", role: "Content Manager", text: "Tested 5 different tools. REDAI is the only one that passes Originality 3.0." },
                          { name: "Priya M.", role: "Professor", text: "The detection is incredibly accurate. I use it to filter out low-effort submissions." },
                          { name: "James L.", role: "Affiliate Marketer", text: "My product review sites are flourishing. The rewording tool handles bulk jobs." },
                          { name: "Chris W.", role: "Editor", text: "Uncanny cadence matching. The grammar check alone saves my team hours." },
                          { name: "Anna B.", role: "Student", text: "The essay writer provides an amazing starting point without raising any AI flags." }
                        ].map((item, idx) => (
                          <div key={`dup-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
                            <TestimonialCard name={item.name} role={item.role} text={item.text} isCompact={false} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Row 2: Ticker moving left with different items and speed */}
                    <div className="flex overflow-hidden w-full">
                      <div className="animate-infinite-scroll flex gap-4 items-center px-4" style={{ animationDuration: '36s' }}>
                        {[
                          { name: "Luke D.", role: "Content Director", text: "Streamlined our publishing workflow. AI detection score is now consistently 0%." },
                          { name: "Sophia V.", role: "PhD Candidate", text: "Flawless academic phrasing. Preserves my original arguments perfectly." },
                          { name: "Marcus K.", role: "SEO Specialist", text: "Completely revolutionized our local search campaigns. Zero drops in traffic." },
                          { name: "Chloe P.", role: "Copywriter", text: "The humanizer adds the perfect natural cadence. Feels like a top-tier copywriter." },
                          { name: "Nate B.", role: "Digital Agency", text: "Passes Copyleaks and GPTZero with ease. Absolutely robust security protocol." },
                          { name: "Zoe T.", role: "Blog Owner", text: "My readers love the new tone. Natural, engaging, and highly informative." },
                          { name: "Ethan F.", role: "Tech Journalist", text: "The best paraphraser in the market. Retains context perfectly." }
                        ].map((item, idx) => (
                          <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0">
                            <TestimonialCard name={item.name} role={item.role} text={item.text} isCompact={false} />
                          </div>
                        ))}
                        {/* Duplicate Row 2 for continuous infinite looping */}
                        {[
                          { name: "Luke D.", role: "Content Director", text: "Streamlined our publishing workflow. AI detection score is now consistently 0%." },
                          { name: "Sophia V.", role: "PhD Candidate", text: "Flawless academic phrasing. Preserves my original arguments perfectly." },
                          { name: "Marcus K.", role: "SEO Specialist", text: "Completely revolutionized our local search campaigns. Zero drops in traffic." },
                          { name: "Chloe P.", role: "Copywriter", text: "The humanizer adds the perfect natural cadence. Feels like a top-tier copywriter." },
                          { name: "Nate B.", role: "Digital Agency", text: "Passes Copyleaks and GPTZero with ease. Absolutely robust security protocol." },
                          { name: "Zoe T.", role: "Blog Owner", text: "My readers love the new tone. Natural, engaging, and highly informative." },
                          { name: "Ethan F.", role: "Tech Journalist", text: "The best paraphraser in the market. Retains context perfectly." }
                        ].map((item, idx) => (
                          <div key={`dup-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
                            <TestimonialCard name={item.name} role={item.role} text={item.text} isCompact={false} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2500+ words SEO + GEO + AEO Expanded Content and FAQ Accordion */}
              <SEOContent handleTabChange={handleTabChange} />

            </motion.div>
          )}

          {activeTab === "blog" && <PageWrapper key="blog"><BlogTab /></PageWrapper>}
          {activeTab === "ads" && <PageWrapper key="ads"><MarketingDealsTab /></PageWrapper>}
          {activeTab === "marketplace" && <PageWrapper key="marketplace"><MarketplaceTab /></PageWrapper>}
          {activeTab === "referral" && <PageWrapper key="referral"><ReferralTab setCredits={setGuestCredits} /></PageWrapper>}
          {activeTab === "career" && (
            <PageWrapper key="career">
              <CareerTab user={user} />
            </PageWrapper>
          )}
          {activeTab === "admin" && <PageWrapper key="admin"><AdminDashboardTab user={user} setIsSignInModalOpen={setIsSignInModalOpen} /></PageWrapper>}

          {/* E-E-A-T informational pages */}
          {activeTab === "about" && <PageWrapper key="about"><EEATPages pageId="about" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "contact" && <PageWrapper key="contact"><EEATPages pageId="contact" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "privacy" && <PageWrapper key="privacy"><EEATPages pageId="privacy" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "terms" && <PageWrapper key="terms"><EEATPages pageId="terms" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "cookies" && <PageWrapper key="cookies"><EEATPages pageId="cookies" onBack={() => handleTabChange("home")} /></PageWrapper>}

          {/* Commercial Pages */}
          {activeTab === "pricing" && <PageWrapper key="pricing"><CommercialPage pageId="pricing" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "features" && <PageWrapper key="features"><CommercialPage pageId="features" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "api" && <PageWrapper key="api"><CommercialPage pageId="api" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "integrations" && <PageWrapper key="integrations"><CommercialPage pageId="integrations" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "agencies" && <PageWrapper key="agencies"><CommercialPage pageId="agencies" onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "enterprise" && <PageWrapper key="enterprise"><CommercialPage pageId="enterprise" onBack={() => handleTabChange("home")} onCtaClick={() => handleTabChange("contact")} /></PageWrapper>}
          {activeTab === "education" && <PageWrapper key="education"><CommercialPage pageId="education" onBack={() => handleTabChange("home")} /></PageWrapper>}

          {/* Dynamic Entity and Comparison target pages */}
          {activeTab === "entity" && entityId && <PageWrapper key="entity"><EntityPage entityId={entityId} onBack={() => handleTabChange("home")} /></PageWrapper>}
          {activeTab === "comparison" && comparisonId && <PageWrapper key="comparison"><ComparisonPage comparisonId={comparisonId} onBack={() => handleTabChange("home")} /></PageWrapper>}
        </AnimatePresence>
      </main>

      <div className={activeTab === "home" ? "lg:pl-[240px]" : ""}>
        <Footer />
      </div>

      {/* FULL-LENGTH BOTTOM AD CONTAINER */}
      <BottomAdBar />

      {/* INSUFFICIENT CREDITS MODAL (NEURAL BLOCKADE) */}
      <AnimatePresence>
        {showInsufficientAlert && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="brutal-container bg-white border-4 border-black p-6 sm:p-8 max-w-md w-full text-center relative"
            >
              <button onClick={() => setShowInsufficientAlert(false)} className="absolute top-3 right-3 text-black hover:text-[var(--theme-accent)] transition-colors">
                <X size={24} />
              </button>

              <div className="w-16 h-16 bg-[var(--theme-accent)] flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[4px_4px_0_#000]">
                <ShieldAlert size={32} className="text-white" />
              </div>

              <h2 className="font-orbitron font-black italic text-2xl uppercase text-black mb-2 leading-tight">Neural Blockade Active</h2>
              <p className="font-jakarta text-sm text-gray-700 font-bold mb-6">Your token reserves are completely depleted. Premium parameters require active credits to bypass algorithmic filters.</p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowInsufficientAlert(false);
                    handleTabChange("marketplace");
                    window.scrollTo(0, 0);
                  }}
                  className="w-full py-3 bg-[var(--theme-cyan)] text-black border-2 border-black font-orbitron font-bold uppercase shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all"
                >
                  Acquire Tokens
                </button>
                <button
                  onClick={() => setShowInsufficientAlert(false)}
                  className="w-full py-3 bg-white text-gray-500 border-2 border-gray-300 font-orbitron font-bold uppercase hover:bg-gray-100 transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign-In & Auth Modal */}
      <AnimatePresence>
        {isSignInModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="brutal-container bg-white border-4 border-black p-6 sm:p-8 max-w-md w-full relative shadow-[8px_8px_0_#000] text-black font-jakarta"
            >
              <button
                onClick={() => {
                  setIsSignInModalOpen(false);
                  setIsSignUpMode(false);
                }}
                className="absolute top-4 right-4 w-7 h-7 bg-white text-black border-2 border-black flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5"
              >
                <X size={14} />
              </button>

              <div className="text-center mb-6">
                <span className="text-[10px] font-orbitron font-black uppercase tracking-widest text-[var(--theme-accent)] bg-black px-2 py-0.5 border border-black text-white">
                  PROTOCOL GATEWAY
                </span>
                <h3 className="text-2xl font-orbitron italic font-bold uppercase mt-2 text-black">
                  {isSignUpMode ? "CREATE ACCOUNT" : "AUTHENTICATE"}
                </h3>
                <p className="text-gray-500 font-bold text-[10px] mt-1">
                  Access ordinary and admin dashboard operations.
                </p>
              </div>

              {/* Login/Signup Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => setIsSignUpMode(false)}
                  className={`py-2 text-center font-orbitron font-black uppercase text-xs border-2 border-black transition-all cursor-pointer ${!isSignUpMode ? 'bg-[var(--theme-cyan)] text-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUpMode(true)}
                  className={`py-2 text-center font-orbitron font-black uppercase text-xs border-2 border-black transition-all cursor-pointer ${isSignUpMode ? 'bg-[var(--theme-cyan)] text-black shadow-[2px_2px_0_#000]' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  Register
                </button>
              </div>

              {/* Auth Form */}
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAuthError(null);
                  if (isSignUpMode && signInPassword.length < 8) {
                    setAuthError("Password must be at least 8 characters long.");
                    return;
                  }
                  setAuthLoading(true);
                  try {
                    if (isSignUpMode) {
                      // Check if email already exists
                      const emailNormalized = signInEmail.toLowerCase().trim();
                      const exists = await convex.query(api.users.checkEmailExists, { email: emailNormalized });
                      if (exists) {
                        setAuthError("invalid email. please use another email");
                        setAuthLoading(false);
                        return;
                      }

                      await signIn("password", {
                        email: signInEmail,
                        password: signInPassword,
                        name: signUpName,
                        flow: "signUp",
                      });
                    } else {
                      await signIn("password", {
                        email: signInEmail,
                        password: signInPassword,
                        flow: "signIn",
                      });
                    }
                    setIsSignInModalOpen(false);
                    setIsSignUpMode(false);
                    setSignInEmail("");
                    setSignInPassword("");
                    setSignUpName("");
                  } catch (err: any) {
                    const msg = err.message ?? "";
                    if (msg.includes("InvalidAccountId")) {
                      setAuthError("Account not found. Click 'Register' above to create a new account!");
                    } else if (msg.includes("InvalidPassword") || msg.includes("password") || msg.includes("authorize")) {
                      setAuthError("Incorrect email or password. Please try again.");
                    } else {
                      setAuthError(err.message ?? "Authentication failed. Please check your credentials.");
                    }
                  } finally {
                    setAuthLoading(false);
                  }
                }}
              >
                {isSignUpMode && (
                  <div>
                    <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-gray-50 !text-white focus:border-[var(--theme-accent)] text-xs"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-gray-50 !text-white focus:border-[var(--theme-accent)] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-2 border-black p-2.5 pr-10 font-jakarta font-bold outline-none bg-gray-50 !text-white focus:border-[var(--theme-accent)] text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-black text-white font-orbitron font-bold py-3 border-2 border-black hover:bg-[var(--theme-accent)] hover:text-white transition-all uppercase text-xs tracking-widest shadow-[3px_3px_0_var(--theme-cyan)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-wait"
                >
                  {authLoading ? "PROCESSING..." : isSignUpMode ? "REGISTER ACCOUNT" : "SIGN IN TO PROTOCOL"}
                </button>
                {authError && (
                  <div className="border-4 border-red-600 bg-red-50 p-3.5 text-red-600 font-jakarta font-bold text-xs mt-2 relative shadow-[4px_4px_0_#dc2626]">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="size-4 shrink-0 mt-0.5 text-red-600" />
                      <div className="text-left">
                        <p className="font-orbitron font-extrabold uppercase text-[10px] tracking-wider leading-none mb-1 text-red-700">ALERT PROTOCOL</p>
                        <p className="leading-normal">{authError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {/* Social Login Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-[2px] bg-black"></div>
                <span className="px-3 font-orbitron font-black text-[9px] text-gray-500 tracking-wider">
                  OR AUTHENTICATE WITH
                </span>
                <div className="flex-1 h-[2px] bg-black"></div>
              </div>

              {/* Google OAuth Direct Sign-In */}
              <button
                type="button"
                disabled={authLoading}
                onClick={async () => {
                  setAuthError(null);
                  setAuthLoading(true);
                  try {
                    await signIn("google");
                  } catch (err: any) {
                    setAuthError(err.message ?? "Google Sign-In failed. Please try again.");
                  } finally {
                    setAuthLoading(false);
                  }
                }}
                className="w-full bg-white text-black font-orbitron font-bold py-3 border-2 border-black hover:bg-black hover:text-white transition-all uppercase text-xs tracking-widest shadow-[3px_3px_0_var(--theme-accent)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 0 1 8.05 12.58A5.972 5.972 0 0 1 14 6.64c1.61 0 3.09.64 4.18 1.69l3.15-3.15A10.22 10.22 0 0 0 14 1a10.25 10.25 0 0 0-10.25 10.25a10.25 10.25 0 0 0 10.25 10.25c5.68 0 10.25-4.57 10.25-10.25c0-.62-.05-1.22-.15-1.815z" />
                </svg>
                Sign In with Google
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- WORKSPACE COMPONENTS ---

function WorkspaceProcessor({
  activeTool,
  credits,
  setGuestCredits,
  setShowInsufficientAlert
}: {
  activeTool: string;
  credits: number | "Unlimited";
  setGuestCredits: React.Dispatch<React.SetStateAction<number>>;
  setShowInsufficientAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "processing" | "complete">("idle");
  const [activeParam, setActiveParam] = useState("Standard");
  const [customInstructions, setCustomInstructions] = useState("");
  const [copiedOutput, setCopiedOutput] = useState(false);
  const generateAi = useAction(api.ai.generate);

  // Reset output and status when tool or parameter changes so the user can execute again immediately
  useEffect(() => {
    setStatus("idle");
    setOutput("");
    setCopiedOutput(false);
  }, [activeTool, activeParam]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleProcess = async () => {
    if (!input.trim() || status === "processing" || status === "scanning") return;

    // Check if the user has enough credits for premium parameters
    const isPaid = activeParam !== "Free";
    const isAnonymous = typeof credits === "number" && credits <= 5 && !window.location.search.includes("loggedIn");
    if (isPaid && credits !== "Unlimited" && credits <= 0) {
      setShowInsufficientAlert(true);
      return;
    }

    setStatus("processing");

    try {
      // Optimistically deduct 1 guest credit for paid params if anonymous
      if (isPaid && credits !== "Unlimited" && isAnonymous) {
        setGuestCredits(prev => Math.max(0, prev - 1));
      }

      // Call the secure Convex backend action (which handles deduction for logged-in users)
      const aiResponse = await generateAi({
        tool: activeTool,
        parameter: activeParam,
        input: input,
        customInstructions: customInstructions,
        isAnonymous: isAnonymous,
      });

      setStatus("complete");
      setOutput(aiResponse as string);
    } catch (error: any) {
      console.error("Generation Failed:", error);
      // Refund optimistic guest credit deduction on error
      if (isPaid && credits !== "Unlimited" && isAnonymous) {
        setGuestCredits(prev => prev + 1);
      }
      setStatus("complete");
      setOutput("Error: The Aeternum Protocol encountered a severe neural disconnect. Please try again later.");
    }
  };

  return (
    <div className="brutal-container bg-white border-4 border-black flex flex-col">

      {/* Top Parameter Nav */}
      <div className="bg-black p-3 border-b-4 border-black flex flex-nowrap overflow-x-auto scrollbar-none lg:flex-wrap gap-2">
        {["Free", "Standard", "Academic", "Simple", "Flowing", "Informal", "Formal", "Expand", "Shorten", "Custom"].map(param => (
          <button
            key={param}
            onClick={() => setActiveParam(param)}
            className={`px-3 lg:px-4 py-1.5 lg:py-2 font-orbitron font-bold text-[10px] lg:text-sm uppercase transition-colors whitespace-nowrap ${activeParam === param ? "bg-[var(--theme-cyan)] text-black border-2 border-[var(--theme-cyan)]" : "bg-transparent text-white border-2 border-transparent hover:border-white"
              }`}
          >
            {param}
          </button>
        ))}
      </div>

      {/* Split Input / Output Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[520px] divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">

        {/* Left Pane: Input */}
        <div className="flex flex-col bg-gray-50 relative p-4 group h-[320px] lg:h-full">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-[10px] lg:text-xs text-black uppercase">Paste your text here — English</span>
            <span className="font-bold text-[10px] lg:text-xs bg-[var(--theme-accent)] text-white px-2 py-0.5">{input.split(/\s+/).filter(Boolean).length} WORDS</span>
          </div>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)} disabled={status !== "idle" && status !== "complete"}
            placeholder="Start typing or paste your document..."
            style={{ color: 'white' }}
            className="flex-1 w-full bg-transparent resize-none outline-none font-jakarta text-sm lg:text-lg leading-relaxed text-white placeholder-gray-400 pb-16"
          />

          {activeParam === "Custom" && (
            <div className="absolute bottom-16 left-4 right-4 bg-black border-2 border-black p-2.5 shadow-[2px_2px_0_#000] z-20 animate-fade-in">
              <label className="block text-[8px] sm:text-[9px] font-orbitron font-black uppercase mb-1 text-[var(--theme-cyan)] tracking-wider">Custom Prompts & Constraints</label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g. Write as a pirate, avoid the word 'the', use academic jargon"
                style={{ backgroundColor: 'white', color: 'black' }}
                className="w-full px-2 py-1.5 font-jakarta text-[11px] border border-black outline-none focus:ring-1 ring-[var(--theme-cyan)]"
              />
            </div>
          )}

          <div className="absolute bottom-4 right-4 flex gap-2">
            {input.length === 0 && (
              <button onClick={() => setInput("The rapid advancement of artificial intelligence has created new paradigms in digital communication. Many organizations are now exploring generative models to automate their content pipelines.")} className="bg-white border-2 border-black px-3 py-1.5 font-bold text-xs hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_#000] text-black">
                Try sample ✦
              </button>
            )}
            <button
              onClick={handleProcess} disabled={status === "scanning" || status === "processing" || !input.trim()}
              className={`brutal-button px-4 py-2 text-xs lg:text-base lg:px-6 lg:py-3 transition-all ${status === "idle" || status === "complete" ? "bg-[var(--theme-cyan)] hover:bg-[var(--theme-accent)]" : "bg-gray-300 cursor-not-allowed"}`}
            >
              {status === "scanning" || status === "processing" ? "SCANNING..." : `EXECUTE ${activeTool.toUpperCase()}`}
            </button>
          </div>
        </div>

        {/* Right Pane: Output */}
        <div className={`flex flex-col bg-white p-4 transition-colors h-[320px] lg:h-full relative overflow-hidden min-h-0 ${status === "complete" ? "bg-[var(--theme-cyan)]/10" : ""}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-[10px] lg:text-xs text-black uppercase">Output will appear here</span>
            {status === "complete" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-black border-2 border-black hover:bg-[var(--theme-accent)] hover:text-white transition-all text-white font-orbitron font-extrabold text-[9px] uppercase cursor-pointer shadow-[2px_2px_0_var(--theme-cyan)] active:translate-x-0.5 active:translate-y-0.5 select-none"
                  title="Copy output to clipboard"
                >
                  {copiedOutput ? (
                    <>
                      <Check size={10} className="text-[var(--theme-cyan)]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} className="text-white" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
                <span className="font-bold text-[10px] lg:text-xs bg-black text-[var(--theme-cyan)] px-2 py-0.5 border-2 border-black">ANALYSIS READY</span>
              </div>
            )}
          </div>
          {status === "idle" && (
            <div className="flex-1 flex items-center justify-center text-gray-400 font-bold uppercase text-center p-8 text-xs lg:text-sm">
              Awaiting Input Stream...
            </div>
          )}
          {(status === "scanning" || status === "processing") && (
            <div className="flex-1 flex flex-col items-center justify-center text-black">
              <Activity size={36} className="animate-pulse mb-3 text-[var(--theme-accent)]" />
              <p className="font-orbitron font-bold italic uppercase text-xs animate-pulse">Running Neural Check...</p>
            </div>
          )}
          {status === "complete" && (
            <div className="flex-1 w-full bg-transparent overflow-y-auto brutal-scrollbar pb-4 prose prose-sm md:prose-base max-w-none prose-headings:font-orbitron prose-headings:uppercase prose-headings:italic prose-headings:m-0 prose-h1:text-xl prose-h1:mb-3 prose-h2:text-lg prose-h2:mb-2 prose-h3:text-base prose-h3:mb-2 prose-p:font-jakarta prose-p:text-black prose-p:mb-2 prose-strong:text-black text-black">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{output}</ReactMarkdown>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

// --- LANDING PAGE COMPONENTS ---

function TestimonialCard({ name, role, text, isCompact = false }: { name: string, role: string, text: string, isCompact?: boolean }) {
  if (isCompact) {
    return (
      <div className="brutal-container bg-white border-2 border-black p-2.5 flex items-center justify-between gap-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_#000] transition-all cursor-pointer rounded-none w-full">
        <div className="flex-1 min-w-0">
          <p className="font-jakarta text-[9px] font-bold leading-snug text-black line-clamp-2">"{text}"</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-orbitron font-extrabold italic uppercase text-[8px] text-black leading-none">{name}</span>
            <span className="text-[6px] text-gray-500 font-bold uppercase leading-none border-l border-black pl-1.5">{role}</span>
          </div>
        </div>
        <div className="flex text-[var(--theme-accent)] flex-shrink-0 gap-0.5">
          <Star size={7} fill="currentColor" />
          <Star size={7} fill="currentColor" />
          <Star size={7} fill="currentColor" />
          <Star size={7} fill="currentColor" />
          <Star size={7} fill="currentColor" />
        </div>
      </div>
    );
  }

  return (
    <div className="brutal-container bg-white border-2 border-black p-2 relative flex flex-col justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_#000] transition-all cursor-pointer">
      <div>
        <div className="flex text-[var(--theme-accent)] mb-1">
          <Star size={8} fill="currentColor" />
          <Star size={8} fill="currentColor" />
          <Star size={8} fill="currentColor" />
          <Star size={8} fill="currentColor" />
          <Star size={8} fill="currentColor" />
        </div>
        <p className="font-jakarta text-[9px] font-bold mb-1 leading-snug text-black">"{text}"</p>
      </div>
      <div className="border-t border-black pt-1 mt-auto">
        <p className="font-orbitron font-bold italic uppercase text-[9px] text-black leading-tight">{name}</p>
        <p className="text-[7px] text-gray-600 font-bold uppercase leading-tight">{role}</p>
      </div>
    </div>
  );
}

function BottomAdBar() {
  return (
    <div className="hidden sm:flex fixed bottom-0 left-0 right-0 h-32 bg-black border-t-4 border-white z-50 items-center overflow-hidden">
      <div className="w-12 h-full bg-[var(--theme-accent)] border-r-4 border-white flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-white font-orbitron italic font-bold tracking-widest text-[10px] uppercase rotate-[-90deg] whitespace-nowrap">SPONSORED</span>
      </div>
      <div className="flex-1 h-full grid grid-cols-4 divide-x-4 divide-white">
        {[1, 2, 3, 4].map((slot) => (
          <div key={slot} className="relative h-full bg-gray-900 group">
            <div className="absolute inset-0 flex items-center justify-center opacity-40 font-orbitron font-bold text-white text-xs z-0 uppercase tracking-widest">
              Ad Slot {slot}
            </div>
            {/* Autoplaying, muted, looping ad placeholder video */}
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all z-10 relative pointer-events-none"
            />
            <div className="absolute bottom-1 right-2 z-20">
              <span className="bg-black text-white text-[9px] font-bold px-1 uppercase border border-white leading-none">AD</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SHARED WRAPPERS ---

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 pb-24">
      {children}
    </motion.div>
  );
}

function NavButton({ active, children, onClick, href = "#" }: any) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`text-sm font-orbitron uppercase tracking-widest italic transition-colors ${active ? 'text-[var(--theme-cyan)] font-bold' : 'text-white hover:text-[var(--theme-cyan)]'}`}
    >
      {children}
    </a>
  );
}

// --- TABS (REUSED FROM PREVIOUS) ---

function MiniAdContainer() {
  return (
    <div className="relative w-full h-24 mt-4 bg-black border-2 border-black overflow-hidden group shrink-0">
      <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-1 left-1 bg-[var(--theme-accent)] text-white text-[9px] font-bold px-1 uppercase z-10">SPONSORED</div>
    </div>
  );
}

function BlogDetailView({ blog, onBack, onDeleteLocal }: { blog: any, onBack: () => void, onDeleteLocal?: (id: string) => void }) {
  const user = useQuery(api.users.current);
  const isAdmin = user?.role === "admin";
  const removeBlog = useMutation(api.blogs.remove);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white border-4 border-black p-4 sm:p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden w-full">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <button onClick={onBack} className="flex items-center gap-2 font-orbitron font-bold uppercase text-xs sm:text-sm hover:text-[var(--theme-accent)] transition-colors">
          <ArrowRight size={20} className="rotate-180" /> Back to Blogs
        </button>
        {isAdmin && (
          <button
            onClick={async () => setShowConfirm(true)}
            className="px-3 py-1 bg-red-600 text-white font-orbitron font-bold text-[10px] uppercase tracking-wider cursor-pointer">
            DELETE
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="bg-black text-white px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{blog.category}</span>
          <span className="text-gray-500 font-bold uppercase text-[10px] sm:text-xs">{blog.date || "MAY 16, 2026"}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-6xl font-orbitron italic font-bold uppercase leading-tight mb-4 break-words">{blog.title}</h1>
        <p className="text-sm sm:text-xl font-jakarta font-normal sm:font-bold text-gray-700 mb-8 sm:mb-12 break-words">{blog.subtitle}</p>

        <div className="flex items-center gap-3 mb-12 border-y-4 border-black py-4">
          <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-orbitron font-bold">
            {blog.author[0]}
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-gray-500 leading-none mb-1">Written By</p>
            <p className="font-orbitron font-bold uppercase italic text-lg">{blog.author}</p>
          </div>
        </div>

        <div className="space-y-12">
          <div className="aspect-video border-4 border-black overflow-hidden bg-gray-100 shadow-[8px_8px_0_#000]">
            <img src={blog.image} className="w-full h-full object-cover" alt={blog.title} />
          </div>

          <div className="prose prose-xl max-w-none font-jakarta text-black w-full overflow-hidden break-words blog-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {blog.content || "No content"}
            </ReactMarkdown>
          </div>
        </div>

        {/* Row of 4 Ads */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t-4 border-black pt-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-video border-2 border-black relative overflow-hidden group">
              <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              <div className="absolute top-1 left-1 bg-black text-white text-[8px] px-1 font-bold">AD {i}</div>
            </div>
          ))}
        </div>

        {/* Aesthetic Ad Container */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t-4 border-black">
          <div className="brutal-container bg-black text-white p-4 sm:p-12 relative overflow-hidden group border-4 border-black">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)] opacity-20 blur-[100px] -mr-32 -mt-32 transition-all group-hover:opacity-40 group-hover:scale-150"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-[var(--theme-accent)] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-3 sm:mb-4">SPONSORED PROTOCOL</span>
                <h3 className="text-2xl sm:text-4xl font-orbitron italic font-bold uppercase mb-4 sm:mb-6 leading-tight break-words">Upgrade Your Neural Network</h3>
                <p className="font-jakarta text-gray-400 mb-6 sm:mb-8 font-bold text-xs sm:text-base leading-relaxed">Secure the most advanced AI humanization layers today. REDAI Premium is now available with 50% discount for early adopters.</p>
                <button className="px-5 py-2.5 bg-white text-black font-orbitron font-bold border-2 border-white hover:bg-[var(--theme-cyan)] hover:text-white active:translate-y-0.5 transition-all uppercase text-xs sm:text-sm tracking-wider">
                  ENROLL NOW
                </button>
              </div>
              <div className="aspect-square border-4 border-white overflow-hidden relative hidden md:block">
                <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CUSTOM CONFIRMATION DIALOG (NEO-BRUTALIST OVERLAY) */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="brutal-container bg-white border-4 border-black p-6 sm:p-8 max-w-sm w-full text-center relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-3 right-3 text-black hover:text-[var(--theme-accent)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Warning Sign icon */}
              <div className="w-16 h-16 bg-[var(--theme-accent)] flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[4px_4px_0_#000]">
                <AlertTriangle size={32} className="text-white" />
              </div>

              {/* Header & Body */}
              <h2 className="font-orbitron font-black italic text-xl uppercase text-black mb-2 leading-tight">Confirm Deletion</h2>
              <p className="font-jakarta text-xs text-gray-700 font-bold mb-6">Are you sure you want to delete this blog post? This action is irreversible.</p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-2 bg-white text-black border-2 border-black font-orbitron font-bold uppercase hover:bg-gray-100 active:translate-y-[1px] transition-all text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      // Use blog._id which is the real Convex document ID
                      const blogId = blog._id || blog.id;
                      if (blogId) {
                        await removeBlog({ id: blogId });
                      }
                    } catch (err) {
                      console.warn("Convex database removal failed", err);
                    }
                    // Navigate back — Convex reactivity will update the list
                    if (onDeleteLocal) {
                      onDeleteLocal(blog._id || blog.id);
                    } else {
                      onBack();
                    }
                    setShowConfirm(false);
                  }}
                  className="w-full py-2 bg-red-600 text-white border-2 border-black font-orbitron font-bold uppercase hover:bg-red-700 active:translate-y-[1px] transition-all text-xs cursor-pointer shadow-[2px_2px_0_#000]"
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function BlogCard({ blog, onClick }: { blog: any, onClick: () => void }) {
  return (
    <div onClick={onClick} className="brutal-container bg-white border-2 border-black p-2.5 flex flex-col hover:shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group h-[255px]">
      <div className="h-[95px] border border-black mb-2 overflow-hidden shrink-0 relative">
        <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} />
        <span className="absolute bottom-1 left-1 bg-black text-white text-[7px] font-orbitron font-bold px-1.5 py-0.5 uppercase tracking-wider">{blog.category}</span>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[7px] font-bold uppercase text-gray-400">{blog.dateStr}</span>
            <span className="text-[7px] font-bold uppercase italic text-gray-500">{blog.author}</span>
          </div>
          <h3 className="text-[11px] font-orbitron italic font-bold mb-1 uppercase leading-tight group-hover:text-[var(--theme-accent)] transition-colors text-black line-clamp-2">{blog.title}</h3>
          <p className="font-jakarta font-semibold text-[9px] text-gray-500 line-clamp-2 leading-relaxed">{blog.subtitle}</p>
        </div>

        <div className="pt-1.5 border-t border-black flex items-center justify-between mt-auto">
          <span className="text-[8px] font-orbitron font-black uppercase text-black group-hover:text-[var(--theme-accent)]">Read Article</span>
          <ArrowRight size={10} className="text-black group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function BlogTab() {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const user = useQuery(api.users.current);
  const isAdmin = user?.role === "admin";

  // Read exclusively from Convex — no static data merge so deletions persist on refresh
  const blogs = useQuery(api.blogs.list) || [];

  const categories = ["All", "SEO & Content", "Technology"];

  const filteredBlogs = [...blogs]
    .filter((b: any) => activeCategory === "All" || b.category === activeCategory)
    .sort((a: any, b: any) => sortBy === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);

  if (isEditingBlog) {
    return <BlogEditor blogToEdit={null} onCancel={() => setIsEditingBlog(false)} onComplete={() => setIsEditingBlog(false)} />;
  }

  if (selectedBlog) {
    return (
      <BlogDetailView
        blog={selectedBlog}
        onBack={() => setSelectedBlog(null)}
        onDeleteLocal={() => {
          // Convex real-time subscription will remove the deleted post from the list automatically
          setSelectedBlog(null);
        }}
      />
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Reduced Header Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-black pb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-black font-orbitron italic font-bold uppercase">BLOG & SEO CONTENT</h1>
          <p className="text-[10px] text-gray-500 font-jakarta font-bold uppercase tracking-wider">AETERNUM KNOWLEDGE REPOSITORY</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setIsEditingBlog(true)}
              className="px-3 py-1 bg-black text-white font-orbitron font-bold text-[8px] uppercase transition-all"
            >
              + ADD BLOG
            </button>
          )}
          {/* Categories */}
          <div className="flex bg-gray-100 p-1 border-2 border-black">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 font-orbitron font-bold text-[8px] uppercase transition-colors ${activeCategory === c ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Date Sorting Trigger */}
          <div className="flex border-2 border-black p-1 bg-white">
            <button
              onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
              className="px-3 py-1 bg-[var(--theme-accent)] text-white font-orbitron font-bold text-[8px] uppercase tracking-wider shadow-[2px_2px_0_#000] active:translate-y-0.5 active:shadow-none hover:bg-black transition-all"
            >
              Sort: {sortBy === "newest" ? "Latest First" : "Oldest First"}
            </button>
          </div>
        </div>
      </div>

      {/* High-density grid for compact bloghs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {filteredBlogs.map((b) => (
          <BlogCard key={b.id} blog={b} onClick={() => setSelectedBlog(b)} />
        ))}
      </div>
    </motion.div>
  );
}

function ReferralCard({ brand }: { brand: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(brand.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="brutal-container p-4 bg-white border-4 border-black flex flex-col group hover:bg-black hover:text-white transition-colors h-[380px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-white border-2 border-black overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
          <img src={brand.logo} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
        <h3 className="text-lg font-orbitron italic font-bold uppercase truncate">{brand.name}</h3>
      </div>

      <p className="font-jakarta text-[10px] font-bold mb-4 group-hover:text-gray-300 leading-relaxed text-black">
        If you refer using this link <span className="text-[var(--theme-accent)] uppercase">{brand.name}</span>, you will earn 50.00 plus a bonus 100.00 to your {brand.name} account. Show and send the proof of referral, successful installation, and real {brand.name} account.
      </p>

      <div className="mt-auto space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-orbitron font-bold uppercase text-gray-500 group-hover:text-gray-400">Your Unique Link</span>
          <div className="flex w-full border-2 border-black group-hover:border-white">
            <input type="text" readOnly value={brand.link} className="flex-1 bg-gray-100 group-hover:bg-gray-900 text-[10px] p-2 outline-none text-black group-hover:text-white truncate" />
            <button onClick={handleCopy} className={`px-3 font-orbitron font-bold text-[10px] uppercase transition-colors ${copied ? "bg-[var(--theme-cyan)] text-black" : "bg-[var(--theme-accent)] text-white hover:bg-white hover:text-black"}`}>
              {copied ? "COPIED" : "COPY"}
            </button>
          </div>
        </div>

        <div className="h-20 w-full border-2 border-black overflow-hidden relative group-hover:border-white">
          <video src={brand.adUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
          <span className="absolute top-0 right-0 bg-black text-white text-[8px] px-1 border-b border-l border-white">ADVERT</span>
        </div>
      </div>
    </div>
  );
}

function ReferralTab({ setCredits }: { setCredits: React.Dispatch<React.SetStateAction<number>> }) {
  const submitClaim = useMutation(api.referrals.submitClaim);
  const [claimStatus, setClaimStatus] = useState<"idle" | "loading" | "success">("idle");
  const brandsData = [
    { name: "Maya", domain: "maya.ph", adUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "SMDC", domain: "smdc.com", adUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Polywall", domain: "polywall.net", adUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    { name: "Dev Partners", domain: "devpartners.co", adUrl: "https://media.w3.org/2010/05/video/movie_300.mp4" },
    { name: "Outsourced PH", domain: "outsourced.ph", adUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "GCash", domain: "gcash.com", adUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "BPI", domain: "bpi.com.ph", adUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    { name: "UnionBank", domain: "unionbankph.com", adUrl: "https://media.w3.org/2010/05/video/movie_300.mp4" },
    { name: "Grab", domain: "grab.com", adUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "Foodpanda", domain: "foodpanda.ph", adUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Lalamove", domain: "lalamove.com", adUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" },
    { name: "Shopee", domain: "shopee.ph", adUrl: "https://media.w3.org/2010/05/video/movie_300.mp4" },
    { name: "Lazada", domain: "lazada.com.ph", adUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4" },
    { name: "Zalora", domain: "zalora.com.ph", adUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { name: "Angkas", domain: "angkas.com", adUrl: "https://media.w3.org/2010/05/bunny/trailer.mp4" }
  ].map(b => ({
    ...b,
    logo: `https://logo.clearbit.com/${b.domain}`,
    link: `https://${b.domain}/ref/REDAI${Math.floor(Math.random() * 10000)}`
  }));

  return (
    <div className="space-y-16 pb-20">
      {/* How it Works Section */}
      <section className="brutal-container bg-[var(--theme-cyan)] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_#000] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-accent)] -mr-16 -mt-16 rotate-45 opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white -ml-12 -mb-12 rotate-12 opacity-10 pointer-events-none"></div>

        <div className="border-b-4 border-black pb-4 mb-6">
          <h2 className="text-3xl md:text-4xl font-orbitron italic font-bold uppercase text-black tracking-tight flex items-center gap-3">
            <Zap size={32} className="text-black fill-black" />
            How The Referral Program Works
          </h2>
          <p className="font-jakarta font-bold text-[10px] uppercase tracking-wider text-black mt-1">REDAI VERIFIED DISTRIBUTION ENGINE v1.2</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {/* Left Column: The Reward */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_#000] flex flex-col justify-between group hover:shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 transition-all">
            <div>
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4 text-black border-b-2 border-black pb-2 flex items-center gap-2.5">
                <DollarSign size={20} className="text-[var(--theme-accent)]" /> The Reward Structure
              </h3>
              <p className="font-jakarta font-bold text-gray-800 leading-relaxed text-xs mb-6">
                Unlock robust passive revenue streams by promoting the REDAI ecosystem! When you introduce a developer, content creator, or digital agency to our humanization engine and they install our local tools or purchase any premium product, you instantly qualify for a direct, uncapped payout!
              </p>
            </div>

            <div className="bg-black text-[var(--theme-accent)] p-5 text-center border-2 border-black shadow-[4px_4px_0_var(--theme-accent)] mt-auto">
              <p className="font-orbitron italic font-bold text-2xl md:text-3xl tracking-wide text-white">PHP 50.00 + PHP 100.00</p>
              <p className="font-orbitron font-bold uppercase text-[9px] tracking-widest mt-1 text-white">Bonus Per Referral & Product Purchase</p>
            </div>
          </div>

          {/* Right Column: The Process */}
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_black] flex flex-col justify-between hover:shadow-[4px_4px_0_black] hover:translate-x-1 hover:translate-y-1 transition-all">
            <div>
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4 text-black border-b-2 border-black pb-2 flex items-center gap-2.5">
                <Award size={20} className="text-[var(--theme-cyan)]" /> The Verification Process
              </h3>

              <ol className="font-jakarta font-bold text-xs text-gray-800 space-y-4">
                <li className="flex gap-3.5 items-start">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-[10px] font-black border border-black shadow-[1px_1px_0_var(--theme-cyan)]">01</span>
                  <div>
                    <strong className="block text-black uppercase tracking-wider text-[9px] font-orbitron">Claim Initiation</strong>
                    <span className="text-[11px] text-gray-600 font-medium">Scroll down and populate the formal Referral Claim Form with your active credentials.</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-[10px] font-black border border-black shadow-[1px_1px_0_var(--theme-cyan)]">02</span>
                  <div>
                    <strong className="block text-black uppercase tracking-wider text-[9px] font-orbitron">Volume Disclosure</strong>
                    <span className="text-[11px] text-gray-600 font-medium">State the exact volume of successful installations and purchases generated through your custom link.</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-[10px] font-black border border-black shadow-[1px_1px_0_var(--theme-cyan)]">03</span>
                  <div>
                    <strong className="block text-black uppercase tracking-wider text-[9px] font-orbitron">Proof Verification</strong>
                    <span className="text-[11px] text-gray-600 font-medium">Attach clear screenshots as structural evidence of the referred lead's installation or active purchase.</span>
                  </div>
                </li>
                <li className="flex gap-3.5 items-start">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-[10px] font-black border border-black shadow-[1px_1px_0_var(--theme-cyan)]">04</span>
                  <div>
                    <strong className="block text-black uppercase tracking-wider text-[9px] font-orbitron">Liquidity Disbursement</strong>
                    <span className="text-[11px] text-gray-600 font-medium">Receive direct payouts from our finance treasury sent straight to your chosen partner brand account!</span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <TabContainer title="REFERRAL PARTNERS" subtitle="Use your unique link to promote these brands." gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {brandsData.map(brand => (
          <ReferralCard key={brand.name} brand={brand} />
        ))}
      </TabContainer>

      {/* Referral Claim Form */}
      <section className="brutal-container bg-white border-4 border-black p-8 max-w-4xl mx-auto shadow-[12px_12px_0_#000]">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-orbitron italic font-bold uppercase mb-2 text-black">Referral Claim Form</h2>
          <p className="font-jakarta font-bold text-gray-600 uppercase text-sm">Submit your proof of successful conversion here</p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={async (e) => { 
          e.preventDefault(); 
          setClaimStatus("loading");
          
          const formData = new FormData(e.currentTarget);
          const fullName = formData.get("fullName") as string;
          const brandReferred = formData.get("brandReferred") as string;

          try {
            await submitClaim({ fullName, brandReferred });
            // Optimistic update for guests (real users will get their credits synced via Convex query if we had one)
            setCredits(prev => prev + 20); 
            setClaimStatus("success");
            
            setTimeout(() => {
              setClaimStatus("idle");
              (e.target as HTMLFormElement).reset();
            }, 3000);
          } catch (error) {
            console.error("Failed to submit claim", error);
            setClaimStatus("idle");
          }
        }}>
          {claimStatus === "success" && (
            <div className="md:col-span-2">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border-4 border-green-600 p-4 shadow-[4px_4px_0_#16a34a] flex items-center justify-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <span className="font-orbitron font-black uppercase tracking-widest text-green-800">Claim Registered! +20 Neural Credits Added.</span>
              </motion.div>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">Full Name</label>
              <input type="text" name="fullName" required placeholder="Enter your full name" className="w-full border-4 border-black p-4 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white focus:ring-4 ring-[var(--theme-accent)]/20 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">Brand Referred</label>
              <select name="brandReferred" className="w-full border-4 border-black p-4 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer">
                {brandsData.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">How many referrals?</label>
              <input type="number" min="1" required placeholder="Total successful conversions" className="w-full border-4 border-black p-4 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white focus:ring-4 ring-[var(--theme-accent)]/20 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">Proof of Purchase (Upload Screenshots)</label>
              <input type="file" required className="w-full border-4 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-orbitron file:font-bold file:bg-black file:text-white hover:file:bg-[var(--theme-accent)] transition-all cursor-pointer" />
            </div>
          </div>
          <div className="md:col-span-2 pt-6">
            <button type="submit" disabled={claimStatus !== "idle"} className="w-full bg-[var(--theme-accent)] text-white font-orbitron font-bold py-6 text-xl border-4 border-black hover:bg-black hover:border-white transition-all uppercase shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {claimStatus === "loading" ? "Processing..." : claimStatus === "success" ? "Success!" : "Submit Claim For Review"}
            </button>
            <div className="bg-gray-100 border-2 border-black p-4 mt-8">
              <p className="text-center text-[10px] font-bold uppercase text-gray-700 leading-relaxed">
                <span className="text-[var(--theme-accent)]">Notice:</span> Your information will be collected and for future reference we can reach out to you. Don't wait for the email, we will email you instead.
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

// ── JOB ROLE METADATA ─────────────────────────────────────────────────────
const JOB_ROLES = [
  {
    id: "Senior AI Engineer",
    badge: "ENGINEERING",
    color: "var(--theme-accent)",
    salary: "PHP 80,000–120,000 / mo",
    type: "Remote · Full-Time",
    desc: "Lead development of AETERNUM PROTOCOL V5. Own the core bypass engine architecture.",
    requirements: ["3+ yrs ML/NLP experience", "Python & TypeScript", "LLM fine-tuning expertise", "AI detection model knowledge"],
  },
  {
    id: "Frontend Architect",
    badge: "DESIGN",
    color: "#7c3aed",
    salary: "PHP 60,000–95,000 / mo",
    type: "Remote · Full-Time",
    desc: "Build high-density neobrutalist React interfaces with Framer Motion and stellar performance.",
    requirements: ["React + TypeScript expert", "Framer Motion / animations", "CSS architecture (no frameworks)", "Pixel-perfect eye for design"],
  },
  {
    id: "Growth Hacker",
    badge: "MARKETING",
    color: "#16a34a",
    salary: "PHP 40,000–70,000 / mo + commission",
    type: "Hybrid · Full-Time",
    desc: "Scale affiliate programs and manage B2B ad partnerships. Own top-of-funnel growth.",
    requirements: ["Proven SaaS growth experience", "Google & Meta Ads expertise", "Affiliate network management", "Data-driven decision making"],
  },
  {
    id: "Cybersecurity Analyst",
    badge: "SECURITY",
    color: "#dc2626",
    salary: "PHP 70,000–110,000 / mo",
    type: "Remote · Full-Time",
    desc: "Ensure protocol integrity and user data protection against synthetic attacks and adversarial inputs.",
    requirements: ["OWASP Top 10 knowledge", "Penetration testing skills", "Serverless security focus", "Incident response experience"],
  },
  {
    id: "Community Manager",
    badge: "COMMUNITY",
    color: "#0891b2",
    salary: "PHP 30,000–50,000 / mo",
    type: "Remote · Part-Time OK",
    desc: "Moderate creator networks and facilitate marketplace connections. Be the face of REDAI.",
    requirements: ["Strong communication skills", "Social media proficiency", "Discord/Telegram moderation", "Content scheduling tools"],
  },
  {
    id: "Sales Director (B2B)",
    badge: "SALES",
    color: "#b45309",
    salary: "PHP 60,000 base + uncapped commission",
    type: "Hybrid · Full-Time",
    desc: "Onboard enterprise clients, SEO agencies, and universities onto REDAI subscription plans.",
    requirements: ["B2B SaaS sales experience", "CRM tools (HubSpot/Pipedrive)", "Proposal & contract negotiation", "Network in PH tech ecosystem"],
  },
];

function CareerTab({ user }: { user?: any }) {
  if (user && user.role === "admin") {
    return (
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-orbitron italic font-black uppercase text-black drop-shadow-[4px_4px_0_var(--theme-cyan)] mb-4">Admin Matrix</h2>
          <p className="text-gray-600 font-jakarta font-bold text-lg uppercase tracking-widest">Review applications natively</p>
        </div>
        <AdminCareersLedger />
      </div>
    );
  }

  const jobRoles = useQuery(api.jobs.list) ?? [];
  const [selectedRole, setSelectedRole] = useState<typeof jobRoles[0] | null>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const submitApplication = useMutation(api.careers.submit);

  const handleClose = () => {
    setSelectedRole(null);
    setFormState("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRole || formState === "loading") return;
    const fd = new FormData(e.currentTarget);
    setFormState("loading");
    try {
      await submitApplication({
        fullName: (fd.get("fullName") as string).trim(),
        emailAddress: (fd.get("emailAddress") as string).trim(),
        portfolioLink: (fd.get("portfolioLink") as string)?.trim() || undefined,
        appliedRole: selectedRole.title,
        message: (fd.get("message") as string)?.trim() || undefined,
      });
      setFormState("success");
      setTimeout(() => handleClose(), 3200);
    } catch (err: any) {
      if (err?.message?.includes("DUPLICATE_APPLICATION")) {
        setFormState("duplicate");
      } else {
        setFormState("error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="border-b-4 border-black pb-6">
        <span className="inline-block text-[9px] font-orbitron font-black bg-black text-white px-2 py-0.5 border border-black uppercase tracking-widest mb-2">
          AETERNUM RECRUITMENT PROTOCOL
        </span>
        <h1 className="text-3xl md:text-5xl font-orbitron italic font-bold uppercase text-black leading-none mb-2">
          JOIN THE REDAI TEAM
        </h1>
        <p className="font-jakarta font-bold text-sm text-gray-600 max-w-2xl">
          We're building the most powerful AI bypass infrastructure on the planet. All roles are currently in a{" "}
          <span className="text-[var(--theme-accent)] font-black">talent pipeline</span> — submit your application and we'll reach out when a position opens.
        </p>
      </div>

      {/* Job Cards Grid */}
      {jobRoles.length === 0 ? (
        <div className="col-span-3 text-center py-20 border-4 border-dashed border-gray-300">
          <p className="font-orbitron font-bold uppercase text-gray-400">No open positions at this time.</p>
          <p className="font-jakarta text-sm text-gray-400 mt-1">Check back soon — we're always growing.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobRoles.map((role) => (
            <motion.div
              key={role._id}
              whileHover={{ y: -4, x: -2 }}
              className="bg-white border-2 border-black p-5 shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] transition-shadow cursor-pointer group flex flex-col"
              onClick={() => { setSelectedRole(role); setFormState("idle"); }}
            >
              {/* Badge + Type */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[8px] font-orbitron font-black uppercase tracking-widest px-2 py-0.5 border border-black text-white"
                  style={{ backgroundColor: role.color }}
                >
                  {role.badge}
                </span>
                <span className="text-[8px] font-jakarta font-bold text-gray-500 uppercase tracking-wide">{role.type}</span>
              </div>
              {/* Title */}
              <h3 className="text-base font-orbitron italic font-bold uppercase text-black leading-tight mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
                {role.title}
              </h3>
              {/* Salary */}
              <div className="flex items-center gap-1.5 mb-3">
                <DollarSign size={11} className="text-green-600 flex-shrink-0" />
                <span className="font-jakarta font-black text-[11px] text-green-700">{role.salary}</span>
              </div>
              {/* Description */}
              <p className="font-jakarta font-bold text-xs text-gray-700 leading-relaxed mb-4 flex-1">{role.desc}</p>
              {/* Requirements */}
              <ul className="space-y-1 mb-4">
                {role.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-jakarta text-[10px] font-bold text-black">
                    <CheckCircle size={10} className="text-green-600 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
              {/* CTA */}
              <button className="w-full border-2 border-black bg-black text-white font-orbitron font-black uppercase text-[10px] tracking-wider py-2 hover:bg-[var(--theme-accent)] transition-colors shadow-[2px_2px_0_#555] group-hover:shadow-[2px_2px_0_var(--theme-accent)]">
                Apply to Pipeline →
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && handleClose()}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border-4 border-black p-5 sm:p-7 max-w-lg w-full relative max-h-[90vh] overflow-y-auto brutal-scrollbar shadow-[8px_8px_0_#000]"
            >
              <button onClick={handleClose} className="absolute top-3 right-3 text-black hover:text-[var(--theme-accent)] transition-colors">
                <X size={20} />
              </button>

              {/* Role Header */}
              <div className="mb-4">
                <span
                  className="text-[8px] font-orbitron font-black uppercase tracking-widest px-2 py-0.5 border border-black text-white mb-2 inline-block"
                  style={{ backgroundColor: selectedRole.color }}
                >
                  {selectedRole.badge}
                </span>
                <h3 className="text-xl font-orbitron italic font-bold uppercase text-black leading-tight pr-6">
                  {selectedRole.title}
                </h3>
                <p className="font-jakarta font-bold text-[11px] text-gray-500 mt-0.5">{selectedRole.type} · {selectedRole.salary}</p>
              </div>

              {/* Pipeline notice */}
              <div className="bg-black text-white p-3 mb-4 border-2 border-black shadow-[2px_2px_0_var(--theme-accent)]">
                <p className="font-jakarta text-[10px] sm:text-[11px] font-bold leading-relaxed">
                  This role is currently in our{" "}
                  <span className="text-[var(--theme-cyan)]">talent pipeline</span>. Submit your details now and we'll contact you directly when the position opens.{" "}
                  <span className="italic text-gray-300">We'll email you — don't wait.</span>
                </p>
              </div>

              {/* SUCCESS STATE */}
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-600 p-6 text-center space-y-3 shadow-[3px_3px_0_#16a34a]"
                >
                  <div className="w-14 h-14 bg-green-600 border-2 border-black flex items-center justify-center mx-auto">
                    <CheckCircle size={28} className="text-white" />
                  </div>
                  <h4 className="font-orbitron font-black uppercase text-green-800 text-base">Application Received!</h4>
                  <p className="font-jakarta font-bold text-xs text-green-700">
                    Your application for <span className="font-black">{selectedRole.title}</span> is now in our pipeline. We'll reach out via email when the role opens.
                  </p>
                  <p className="font-orbitron text-[9px] text-green-600 uppercase tracking-widest animate-pulse">Auto-closing…</p>
                </motion.div>
              )}

              {/* DUPLICATE / ERROR STATES */}
              {(formState === "duplicate" || formState === "error") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-2 p-3 mb-4 flex items-start gap-2 ${formState === "duplicate" ? "bg-orange-50 border-orange-500" : "bg-red-50 border-red-500"}`}
                >
                  <AlertTriangle size={14} className={`flex-shrink-0 mt-0.5 ${formState === "duplicate" ? "text-orange-600" : "text-red-600"}`} />
                  <div>
                    <p className="font-jakarta font-black text-xs text-black">
                      {formState === "duplicate"
                        ? "You've already applied for this role with that email address."
                        : "Something went wrong. Please try again in a moment."}
                    </p>
                    <button onClick={() => setFormState("idle")} className="mt-1.5 text-[9px] font-orbitron font-black uppercase tracking-wider text-gray-600 hover:text-black underline">
                      Try again
                    </button>
                  </div>
                </motion.div>
              )}

              {/* APPLICATION FORM */}
              {formState !== "success" && (
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-[9px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">
                      Full Name <span className="text-[var(--theme-accent)]">*</span>
                    </label>
                    <input type="text" name="fullName" required placeholder="John Doe"
                      className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)] text-xs placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">
                      Email Address <span className="text-[var(--theme-accent)]">*</span>
                    </label>
                    <input type="email" name="emailAddress" required placeholder="john@example.com"
                      className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)] text-xs placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">
                      LinkedIn / Portfolio / GitHub
                    </label>
                    <input type="text" name="portfolioLink" placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)] text-xs placeholder:text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">
                      Cover Message <span className="text-gray-400 normal-case font-jakarta font-semibold">(optional)</span>
                    </label>
                    <textarea name="message" rows={3} placeholder="Tell us why you're a great fit for this role…"
                      className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)] text-xs placeholder:text-gray-500 resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className={`w-full font-orbitron font-bold py-3 border-2 border-black uppercase mt-1 text-xs tracking-wider transition-all shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                      formState === "loading"
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-[var(--theme-accent)] text-white hover:bg-black hover:border-white hover:shadow-[3px_3px_0_var(--theme-cyan)]"
                    }`}
                  >
                    {formState === "loading" ? "Submitting…" : "Submit Application →"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



function MarketingDealsTab() {
  const [viewMode, setViewMode] = useState<"cards" | "agreement" | "form">("cards");
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [dealsMode, setDealsMode] = useState<"opportunities" | "history">("opportunities");
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submitMarketing = useMutation(api.marketing.submit);

  const handleSelectDeal = (deal: string) => {
    setSelectedDeal(deal);
    setViewMode("agreement");
  };

  const handleAgree = () => {
    setViewMode("form");
  };

  const handleBack = () => {
    if (viewMode === "form") setViewMode("agreement");
    else {
      setViewMode("cards");
      setSelectedDeal(null);
      setAgreedToRules(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">

      {/* 1. CARDS VIEW */}
      {viewMode === "cards" && (
        <>
          {/* Compact Header with Sub-tab Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-black pb-4 mb-4 gap-4">
            <div>
              <h1 className="text-lg sm:text-2xl md:text-3xl text-black font-orbitron italic font-bold uppercase tracking-tight leading-tight">MARKETING DEALS & CONSIGNMENTS</h1>
              <p className="text-[10px] text-gray-500 font-jakarta font-bold uppercase tracking-wider">AETERNUM COLLABORATION PROTOCOL</p>
            </div>

            <div className="flex bg-gray-100 p-1 border-2 border-black">
              <button
                onClick={() => setDealsMode("opportunities")}
                className={`px-3 py-1 font-orbitron font-bold text-[8px] uppercase transition-colors ${dealsMode === "opportunities" ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}`}
              >
                Active Programs
              </button>
              <button
                onClick={() => setDealsMode("history")}
                className={`px-3 py-1 font-orbitron font-bold text-[8px] uppercase transition-colors ${dealsMode === "history" ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}`}
              >
                Earnings History
              </button>
            </div>
          </div>

          {dealsMode === "opportunities" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <BrutalCard
                badge="PARTNERSHIP"
                title="BE PARTNERS WITH US"
                desc="We will promote your product in our blogs, carousel, and ad spaces. Dealership commission structure available."
                icon={<Shield size={18} className="text-white" />}
                onClick={() => handleSelectDeal("Partnership")}
                compact={true}
              />
              <BrutalCard
                badge="AFFILIATE"
                title="BE REDAI'S AFFILIATE"
                desc="Market and earn consignment on every deal and product purchased. Receive 20% commission per sale."
                icon={<TrendingUp size={18} className="text-white" />}
                onClick={() => handleSelectDeal("Affiliate")}
                compact={true}
              />
              <BrutalCard
                badge="INFLUENCER"
                title="SOCIAL MEDIA INFLUENCER"
                desc="Post TikTok or Facebook content with positive reviews to earn 100.00 per platform. Get free credits, clothing, and bags. Scripts and assets provided."
                icon={<Users size={18} className="text-white" />}
                onClick={() => handleSelectDeal("Influencer")}
                compact={true}
              />
              <BrutalCard
                badge="CREATOR"
                title="SUBMIT ART & BLOGS"
                desc="Showcase your work (cartoons, abstract art) with our logo. Earn 5% commission on sales. We buy cartoon designs for PHP 100.00 to support local artists."
                icon={<PenTool size={18} className="text-white" />}
                onClick={() => handleSelectDeal("Creator")}
                compact={true}
              />
            </div>
          ) : (
            /* Compact History Table */
            <div className="max-w-4xl mx-auto">
              <section className="brutal-container bg-white border-2 border-black p-4 shadow-[4px_4px_0_#000] relative">
                <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
                  <h3 className="text-base font-orbitron italic font-bold uppercase text-black">Affiliate Earnings History</h3>
                  <span className="text-[7px] font-orbitron font-bold uppercase tracking-wider bg-black text-white px-2 py-0.5">Verified Ledger</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-jakarta text-xs font-bold text-black border-collapse">
                    <thead>
                      <tr className="bg-black text-white border border-black">
                        <th className="p-2.5 uppercase tracking-wider text-[9px]">Affiliate Name</th>
                        <th className="p-2.5 uppercase tracking-wider text-[9px]">Recent Purchase</th>
                        <th className="p-2.5 uppercase tracking-wider text-[9px]">Commission Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-black hover:bg-gray-50 transition-colors">
                        <td className="p-2.5">Alex Mercer</td>
                        <td className="p-2.5">RedAI Premium API</td>
                        <td className="p-2.5 text-[var(--theme-accent)] font-extrabold">PHP 1,250.00</td>
                      </tr>
                      <tr className="border-b border-black bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <td className="p-2.5">Jane Doe</td>
                        <td className="p-2.5">Goofy Mood Hoodie</td>
                        <td className="p-2.5 text-[var(--theme-accent)] font-extrabold">PHP 450.00</td>
                      </tr>
                      <tr className="border-b border-black hover:bg-gray-50 transition-colors">
                        <td className="p-2.5">Local Artist Co.</td>
                        <td className="p-2.5">Cartoon Design Buyout</td>
                        <td className="p-2.5 text-[var(--theme-accent)] font-extrabold">PHP 100.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}
        </>
      )}

      {/* 2. AGREEMENT VIEW */}
      {viewMode === "agreement" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brutal-container bg-white border-4 border-black p-4 md:p-6 w-full max-w-3xl mx-auto shadow-[8px_8px_0_var(--theme-accent)]">
          <button onClick={handleBack} className="mb-3 font-orbitron font-bold uppercase text-black hover:text-[var(--theme-accent)] transition-colors flex items-center gap-1.5 text-xs">
            &larr; Go Back
          </button>

          <h2 className="text-2xl md:text-3xl font-orbitron italic font-bold uppercase text-black mb-3 border-b-2 border-black pb-1.5">
            Protocol Rules & Conditions
          </h2>

          <div className="font-jakarta text-xs text-gray-800 space-y-3 mb-4">
            <p>Before proceeding with your application for the <strong>{selectedDeal}</strong> program, you must read and agree to the following terms and conditions enforced by the REDAI Protocol.</p>

            <ul className="list-disc pl-6 space-y-1 font-bold">
              <li>All submissions and applications are subject to a strict manual review process.</li>
              <li>Any fraudulent claims, fake traffic sources, or bot-generated followers will result in an immediate and permanent ban from the network.</li>
              <li>Commission payouts are processed strictly according to the schedule. No early withdrawals are permitted.</li>
              <li>All provided marketing materials and assets remain the intellectual property of REDAI Protocol and must not be altered without permission.</li>
            </ul>

            <div className="bg-black text-white p-3 border border-[var(--theme-accent)] mt-3 flex items-center gap-3">
              <input
                type="checkbox"
                id="ruleCheckbox"
                required
                checked={agreedToRules}
                onChange={(e) => setAgreedToRules(e.target.checked)}
                className="w-4.5 h-4.5 border-2 border-white bg-transparent text-white accent-[var(--theme-accent)] cursor-pointer flex-shrink-0"
              />
              <label htmlFor="ruleCheckbox" className="font-orbitron font-bold uppercase tracking-wider text-[9px] cursor-pointer text-white leading-normal select-none">
                Failure to comply with these rules will result in immediate termination of the agreement.
              </label>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleAgree(); }}>
            <div className="mb-4 flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-orbitron font-bold uppercase mb-1.5 text-black tracking-widest">Signatory Name (I agree to these terms)</label>
                <input type="text" required placeholder="Type your full name..." className="w-full border-2 border-black p-2 font-jakarta font-bold outline-none bg-gray-50 text-black text-xs focus:border-[var(--theme-accent)]" />
              </div>
              <button type="submit" className="w-full md:w-auto px-8 bg-[var(--theme-accent)] text-white font-orbitron font-bold py-2 border-2 border-black hover:bg-black hover:border-white transition-all uppercase text-sm tracking-widest whitespace-nowrap shadow-[3px_3px_0_var(--theme-cyan)]">
                I Agree & Proceed
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* 3. FORM VIEW */}
      {viewMode === "form" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brutal-container bg-white border-4 border-black p-4 md:p-6 w-full max-w-3xl mx-auto shadow-[8px_8px_0_#000]">
          <button onClick={handleBack} className="mb-3 font-orbitron font-bold uppercase text-black hover:text-[var(--theme-accent)] transition-colors flex items-center gap-1.5 text-xs">
            &larr; Go Back
          </button>

          <h2 className="text-2xl font-orbitron italic font-bold uppercase text-black mb-1">
            {selectedDeal} Application
          </h2>
          <p className="font-jakarta font-bold text-[var(--theme-accent)] text-base mb-4 border-b-2 border-black pb-1.5">Please fill out all required fields.</p>

          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-4 border-green-600 p-8 text-center space-y-4 shadow-[4px_4px_0_#16a34a]"
            >
              <div className="w-16 h-16 bg-green-600 border-4 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0_#000]">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4 className="font-orbitron font-black uppercase text-green-800 text-lg">Application Registered!</h4>
              <p className="font-jakarta font-bold text-sm text-green-700 leading-relaxed">
                Your <span className="font-black">{selectedDeal}</span> proposal has been successfully persisted in the Aeternum database. REDAI Protocol manual review is queued.
              </p>
              <p className="font-orbitron text-[10px] text-green-600 uppercase tracking-widest animate-pulse">Auto-redirecting to programs list…</p>
            </motion.div>
          ) : formState === "error" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border-4 border-red-500 p-6 text-center space-y-4 shadow-[4px_4px_0_#ef4444]"
            >
              <div className="w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0_#000]">
                <AlertTriangle size={32} className="text-white" />
              </div>
              <h4 className="font-orbitron font-black uppercase text-red-800 text-lg">Submission Failed</h4>
              <p className="font-jakarta font-bold text-sm text-red-700 leading-relaxed">
                We encountered an error saving your submission. Please try again.
              </p>
              <button onClick={() => setFormState("idle")} className="px-6 py-2 bg-black text-white font-orbitron font-black uppercase text-xs tracking-wider border-2 border-black hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0_#000]">
                Try Again
              </button>
            </motion.div>
          ) : (
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = (formData.get("creatorName") || formData.get("fullName") || formData.get("companyName")) as string || "Anonymous";
              const email = (formData.get("emailAddress") || formData.get("contactEmail") || formData.get("email")) as string || "no-email@example.com";
              let detail1 = "";
              let detail2 = "";

              if (selectedDeal === "Partnership") {
                detail1 = formData.get("companyWebsite") as string || "";
                detail2 = formData.get("proposedCommission") as string || "";
              } else if (selectedDeal === "Affiliate") {
                detail1 = formData.get("trafficSource") as string || "";
                detail2 = `GCash Payout Method: ${(formData.get("payoutMethod") as string || "GCash").toUpperCase()}`;
              } else if (selectedDeal === "Influencer") {
                detail1 = `${(formData.get("platform") as string || "TikTok").toUpperCase()} (${formData.get("followers") || 0} followers)`;
                detail2 = formData.get("profileLink") as string || "";
              } else if (selectedDeal === "Creator") {
                detail1 = formData.get("socialLink") as string || "";
                detail2 = "Art Buyout Design Submission";
              }

              setFormState("loading");
              try {
                await submitMarketing({
                  type: selectedDeal as string,
                  name,
                  email,
                  detail1,
                  detail2,
                });
                setFormState("success");
                setTimeout(() => {
                  setFormState("idle");
                  setViewMode("cards");
                  setSelectedDeal(null);
                  setAgreedToRules(false);
                }, 3000);
              } catch (err) {
                console.error(err);
                setFormState("error");
              }
            }}>

              {/* PARTNERSHIP FORM */}
              {selectedDeal === "Partnership" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Brand/Company Name</label>
                    <input type="text" name="companyName" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Contact Email</label>
                    <input type="email" name="contactEmail" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Product Link / Website</label>
                    <input type="url" name="companyWebsite" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Proposed Commission Structure</label>
                    <textarea name="proposedCommission" required placeholder="Outline your dealership/commission proposal..." className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)] resize-none" rows={3}></textarea>
                  </div>
                </div>
              )}

              {/* AFFILIATE FORM */}
              {selectedDeal === "Affiliate" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Full Name</label>
                    <input type="text" name="fullName" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email Address</label>
                    <input type="email" name="emailAddress" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Primary Traffic Source</label>
                    <input type="text" name="trafficSource" required placeholder="URL or Handle" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Preferred Payout</label>
                    <select name="payoutMethod" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]">
                      <option value="">Select Method...</option>
                      <option value="gcash">GCash</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                </div>
              )}

              {/* INFLUENCER FORM */}
              {selectedDeal === "Influencer" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-1 md:col-span-4 bg-[var(--theme-accent)] text-white p-2 border-2 border-black text-center">
                    <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">Scripts and assets will be provided upon approval via email.</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Full Name</label>
                    <input type="text" name="fullName" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email</label>
                    <input type="email" name="email" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Platform</label>
                    <select name="platform" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]">
                      <option value="tiktok">TikTok</option>
                      <option value="facebook">Facebook</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Followers</label>
                    <input type="number" name="followers" required min="0" placeholder="e.g. 10000" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div className="col-span-1 md:col-span-4">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Profile Link</label>
                    <input type="url" name="profileLink" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                </div>
              )}

              {/* CREATOR FORM */}
              {selectedDeal === "Creator" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-1 md:col-span-4 bg-black text-[var(--theme-cyan)] p-2 border-2 border-black text-center">
                    <p className="font-jakarta text-[10px] font-bold uppercase tracking-widest">We buy cartoon designs for PHP 100.00. Upload your low-res watermarked design.</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Creator Name</label>
                    <input type="text" name="creatorName" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email Address</label>
                    <input type="email" name="emailAddress" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Portfolio / Social Link</label>
                    <input type="url" name="socialLink" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Upload Art File (PNG/JPG)</label>
                    <input type="file" required accept="image/png, image/jpeg" className="w-full border-2 border-black p-2 font-jakarta font-bold outline-none bg-gray-50 text-black text-sm file:bg-black file:text-white file:border-0 file:px-3 file:py-1 file:font-orbitron file:uppercase file:cursor-pointer hover:file:bg-[var(--theme-accent)] transition-all cursor-pointer" />
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button type="submit" disabled={formState === "loading"} className={`px-12 font-orbitron font-bold py-3 border-4 border-black transition-all uppercase text-lg tracking-widest shadow-[4px_4px_0_var(--theme-cyan)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${formState === "loading" ? "bg-gray-400 text-gray-200 cursor-not-allowed border-black shadow-none" : "bg-[var(--theme-accent)] text-white hover:bg-black hover:border-white"}`}>
                  {formState === "loading" ? "Submitting…" : "Submit Application"}
                </button>
              </div>

            </form>
          )}
        </motion.div>
      )}

    </div>
  );
}

// --- PRODUCT CARD COMPONENT WITH AUTO LOOP PREVIEWS & QUICK ACTIONS ---
function ProductCard({ product, onClick, onAddToCart, onBuyNow }: { product: any, onClick: () => void, onAddToCart: (p: any) => void, onBuyNow: (p: any) => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % product.images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [product.images.length]);

  return (
    <div
      onClick={onClick}
      className="brutal-container bg-white border-2 border-black p-1.5 cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_var(--theme-accent)] transition-all flex flex-col justify-between h-auto min-h-[235px] w-full mx-auto"
    >
      <div className="aspect-square w-full bg-gray-50 overflow-hidden relative border border-black flex-shrink-0 group">
        <img
          src={product.images[imgIndex]}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          alt={product.name}
        />
        {/* Limited Batch Overlay Tags */}
        <div className="absolute top-1 left-1 bg-black text-white border border-white text-[6px] sm:text-[7px] font-orbitron font-bold px-1.5 py-0.5 uppercase tracking-wider shadow-[1px_1px_0_#000] z-10">
          BATCH #{100 + product.id}
        </div>
        <div className="absolute top-1 right-1 bg-[var(--theme-accent)] text-white border border-black text-[5px] sm:text-[6px] font-orbitron font-extrabold px-1 py-0.5 uppercase tracking-tighter shadow-[1px_1px_0_#000] animate-pulse z-10">
          RUN: 100/100
        </div>

        <div className="absolute bottom-1 right-1 bg-black/80 text-[var(--theme-cyan)] px-1 py-0.5 font-mono text-[5px] sm:text-[6px] tracking-widest uppercase z-10">
          PREVIEW {imgIndex + 1}/{product.images.length}
        </div>
      </div>

      <div className="flex flex-col justify-between flex-grow mt-1.5">
        <div className="mb-1.5">
          <div className="flex items-center gap-0.5 text-[var(--theme-accent)] mb-0.5">
            <Star size={6} fill="currentColor" />
            <Star size={6} fill="currentColor" />
            <Star size={6} fill="currentColor" />
            <Star size={6} fill="currentColor" />
            <Star size={6} fill="currentColor" />
            <span className="text-[5px] sm:text-[6px] text-gray-500 font-bold ml-1 font-jakarta">({(12 + product.id * 3)})</span>
          </div>
          <h3 className="font-orbitron font-black uppercase text-[8px] sm:text-[10px] leading-tight text-black line-clamp-2 min-h-[22px] sm:min-h-[26px] mb-1 tracking-tight break-words">{product.name}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="font-jakarta text-[6px] sm:text-[7px] text-gray-500 font-extrabold uppercase tracking-wider">{product.category}</span>
            <span className="font-orbitron font-black text-[8px] sm:text-[10px] text-[var(--theme-accent)] leading-none">{product.priceStr}</span>
          </div>
        </div>

        {/* Quick Actions Inline */}
        <div className="flex gap-1 border-t border-black pt-1.5 mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1 bg-white hover:bg-gray-100 text-black border border-black py-1 font-orbitron font-black text-[6px] sm:text-[8px] uppercase tracking-wider text-center active:translate-y-0.5 transition-all"
          >
            + Bag
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product);
            }}
            className="flex-1 bg-black hover:bg-gray-900 text-white border border-black py-1 font-orbitron font-black text-[6px] sm:text-[8px] uppercase tracking-wider text-center active:translate-y-0.5 transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

function MarketplaceTab() {
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  
  // Convex integration
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const purchaseMutation = useMutation(api.marketplace.purchase);

  const products = [
    {
      id: 1,
      name: "REDAI Protocol Hoodie",
      category: "Cool Hoodies",
      price: 1500,
      priceStr: "PHP 1,500.00",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80"
      ],
      desc: "Premium heavy-weight cotton hoodie featuring the exclusive Aeternum matrix print. Perfect for late-night coding sessions."
    },
    {
      id: 2,
      name: "The Goofy Mood Perfume",
      category: "Perfumes",
      price: 800,
      priceStr: "PHP 800.00",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&q=80",
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80"
      ],
      desc: "A chaotic blend of citrus and synthetic musk. Smells like success and syntax errors."
    },
    {
      id: 3,
      name: "Aeternum Matrix T-Shirt",
      category: "T-Shirts",
      price: 600,
      priceStr: "PHP 600.00",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80"
      ],
      desc: "Breathable, high-contrast t-shirt. The official uniform of the neural network elite."
    },
    {
      id: 4,
      name: "Neural Verify Mug",
      category: "Mugs",
      price: 350,
      priceStr: "PHP 350.00",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
        "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80",
        "https://images.unsplash.com/photo-1539254722305-d6504e963b5b?w=400&q=80"
      ],
      desc: "Holds 16oz of pure caffeine. Engineered to keep your coffee hot during endless deploys."
    },
    {
      id: 5,
      name: "Goofy Mood Oversized Tee",
      category: "T-Shirts",
      price: 750,
      priceStr: "PHP 750.00",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80"
      ],
      desc: "Comfortable oversized fit for ultimate relaxation. Graphic design is our passion."
    },
    {
      id: 6,
      name: "Syntax Error Coffee Mug",
      category: "Mugs",
      price: 300,
      priceStr: "PHP 300.00",
      image: "https://images.unsplash.com/photo-1481833759220-4183c509b5dc?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1481833759220-4183c509b5dc?w=400&q=80",
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
        "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80"
      ],
      desc: "For those days when nothing compiles. A classic ceramic mug with a painful message."
    },
    {
      id: 7,
      name: "Cyberpunk Zip-Up Hoodie",
      category: "Cool Hoodies",
      price: 1800,
      priceStr: "PHP 1,800.00",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"
      ],
      desc: "High-collar zip-up with reflective accents. Stay stealthy in the neon glow."
    },
    {
      id: 8,
      name: "Abstract Neural Print",
      category: "Art",
      price: 1200,
      priceStr: "PHP 1,200.00",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
        "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=400&q=80"
      ],
      desc: "High-quality poster print of an AI's dream state. Perfect for brutalist office spaces."
    },
    {
      id: 9,
      name: "REDAI Hardware Key V1",
      category: "Hardware",
      price: 2200,
      priceStr: "PHP 2,200.00",
      image: "https://images.unsplash.com/photo-1597872200319-3813c95c8080?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1597872200319-3813c95c8080?w=400&q=80",
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&q=80"
      ],
      desc: "Physical authentication key featuring high-speed encryption layers. Secure your neural workspace physically."
    },
    {
      id: 10,
      name: "Aeternum Stealth Bomber Jacket",
      category: "Cool Hoodies",
      price: 3500,
      priceStr: "PHP 3,500.00",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80"
      ],
      desc: "Premium brutalist bomber jacket with matte-black zippers and custom insulated Aeternum lining."
    },
    {
      id: 11,
      name: "Syntax Mechanical Keyboard",
      category: "Hardware",
      price: 4500,
      priceStr: "PHP 4,500.00",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80"
      ],
      desc: "Compact mechanical keyboard featuring tactile custom silent red switches and bold brutalist keycaps."
    },
    {
      id: 12,
      name: "Neural State Desk Mat",
      category: "Art",
      price: 950,
      priceStr: "PHP 950.00",
      image: "https://images.unsplash.com/photo-1631009185129-e5837f64d84f?w=400&q=80",
      images: [
        "https://images.unsplash.com/photo-1631009185129-e5837f64d84f?w=400&q=80",
        "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&q=80"
      ],
      desc: "Stitched-edge water-resistant desk mat featuring the original neural network schematic print."
    }
  ];

  const filters = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = activeFilter === "All" ? products : products.filter(p => p.category === activeFilter);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setViewingProduct(null);
  };

  const buyNow = (product: any) => {
    setCheckoutItems([product]);
    setViewingProduct(null);
    setIsCheckoutOpen(true);
  };

  const checkoutCart = () => {
    setCheckoutItems(cart);
    setIsCheckoutOpen(true);
  };

  const totalCheckoutPrice = checkoutItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-8 relative max-w-6xl mx-auto px-4">
      {/* Cart Floating Button */}
      {cart.length > 0 && (
        <button
          onClick={checkoutCart}
          className="fixed bottom-24 right-8 z-50 bg-[var(--theme-accent)] text-white p-4 border-4 border-black shadow-[8px_8px_0_#000] hover:translate-y-1 hover:shadow-[4px_4px_0_#000] transition-all flex items-center gap-3 group"
        >
          <div className="bg-black text-white px-3 py-1 font-orbitron font-bold rounded-full group-hover:bg-white group-hover:text-black transition-colors">{cart.length}</div>
          <span className="font-orbitron font-bold uppercase tracking-widest">View Cart</span>
        </button>
      )}

      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-3xl md:text-5xl text-black font-orbitron italic font-bold uppercase tracking-tighter leading-tight mb-4">RED<span className="text-[var(--theme-accent)]">AI</span>'S <span className="text-[var(--theme-accent)]">MARKETPLACE</span></h1>
      </div>

      {/* Filter Bar */}
      <div className="flex overflow-x-auto md:flex-wrap gap-2 justify-start md:justify-center mb-8 pb-2 md:pb-0 scrollbar-none px-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 font-orbitron font-bold uppercase text-[9px] sm:text-[10px] border-2 transition-all flex-shrink-0 ${activeFilter === f ? 'bg-black text-white border-black shadow-[2px_2px_0_var(--theme-accent)] translate-y-[-1px]' : 'bg-white text-black border-black hover:bg-gray-100'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Premium Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => setViewingProduct(p)} onAddToCart={addToCart} onBuyNow={buyNow} />
        ))}
      </div>

      <AnimatePresence>
        {/* PREMIUM PRODUCT DETAIL MODAL */}
        {viewingProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full h-auto md:h-[340px] max-w-4xl flex flex-col md:flex-row relative bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] border-2 border-black overflow-hidden">

              {/* Close Button */}
              <button onClick={() => setViewingProduct(null)} className="absolute top-0 right-0 z-50 p-2 text-black hover:text-[var(--theme-accent)] transition-colors">
                <X size={20} strokeWidth={2} />
              </button>

              {/* Large Image Side */}
              <div className="w-full md:w-[35%] md:h-full bg-gray-50 flex items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-black min-h-[140px]">
                <img src={viewingProduct.image} className="w-full h-full object-contain p-2" alt={viewingProduct.name} />
              </div>

              {/* Details Side */}
              <div className="w-full md:w-[65%] md:h-full bg-white p-4 overflow-y-auto brutal-scrollbar">
                <div className="w-full">
                  <span className="text-gray-400 font-orbitron font-bold uppercase tracking-[0.2em] text-[8px] mb-0.5 block">{viewingProduct.category}</span>
                  <h2 className="text-lg lg:text-xl font-orbitron font-bold uppercase leading-tight text-black mb-0.5">{viewingProduct.name}</h2>
                  <p className="font-jakarta font-bold text-base text-[var(--theme-accent)] mb-1">{viewingProduct.priceStr}</p>

                  <div className="mb-2">
                    <p className="font-jakarta text-xs text-gray-600 leading-relaxed font-light">{viewingProduct.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 font-jakarta text-[9px] text-gray-500 uppercase tracking-widest border-t border-gray-200 pt-2">
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-black rounded-full"></span> Premium Quality</span>
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-black rounded-full"></span> Protocol Branding</span>
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-black rounded-full"></span> Limited Batch</span>
                  </div>

                  <div className="flex flex-row gap-2">
                    <button onClick={() => addToCart(viewingProduct)} className="flex-1 bg-white text-black font-orbitron font-bold py-2 border border-black hover:bg-gray-50 transition-colors uppercase text-[10px] tracking-[0.05em] shadow-[2px_2px_0_#000]">
                      Add to Bag
                    </button>
                    <button onClick={() => buyNow(viewingProduct)} className="flex-1 bg-black text-white font-orbitron font-bold py-2 border border-black hover:bg-gray-900 transition-colors uppercase text-[10px] tracking-[0.05em] shadow-[2px_2px_0_var(--theme-cyan)]">
                      Purchase Now
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
        {/* BATCH CHECKOUT MODAL */}
        {isCheckoutOpen && checkoutItems.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full h-auto max-h-[90vh] max-w-4xl flex flex-col relative bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] border-2 border-black overflow-y-auto brutal-scrollbar">

              <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-2.5 right-2.5 z-50 p-1 bg-black text-white hover:bg-[var(--theme-accent)] transition-all border-2 border-black hover:border-white shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center cursor-pointer">
                <X size={14} strokeWidth={3} />
              </button>

              {/* Order Summary Horizontal Strip */}
              <div className="w-full bg-gray-50 p-3 md:pr-14 border-b-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
                  <h3 className="text-[9px] sm:text-[10px] font-orbitron font-bold uppercase tracking-widest text-black border-b border-black sm:border-b-0 sm:border-r-2 border-black pb-1 sm:pb-0 pr-0 sm:pr-3 flex-shrink-0">Order Summary</h3>
                  <div className="flex items-center gap-2 overflow-x-auto brutal-scrollbar max-w-full md:max-w-[400px] py-1">
                    {checkoutItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 flex-shrink-0 bg-white border border-black p-1 pr-2">
                        {/* Sleek placeholder fallback if product image fails */}
                        <div className="w-8 h-10 bg-gray-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-black">
                          <img
                            src={item.image}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={item.name}
                            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                          />
                          <span className="font-orbitron font-black text-[9px] text-gray-400 select-none uppercase">REDI</span>
                        </div>
                        <div className="leading-tight flex flex-col justify-center">
                          <p className="font-orbitron font-bold text-[8px] sm:text-[9px] uppercase tracking-wide truncate max-w-[90px] sm:max-w-[120px] text-black">{item.name}</p>
                          <p className="font-jakarta text-[9px] text-[var(--theme-accent)] font-black mt-0.5">{item.priceStr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 font-orbitron font-bold uppercase tracking-widest text-[8px] text-gray-600 w-full md:w-auto flex-shrink-0">
                  <div>
                    <span>Subtotal: </span>
                    <span className="text-black ml-1 font-black">PHP {totalCheckoutPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span>Shipping: </span>
                    <span className="text-black ml-1 font-black">Via Email</span>
                  </div>
                  <div className="text-[10px] text-black border-l border-black pl-3 flex items-center gap-1.5">
                    <span>Total:</span>
                    <span className="text-[var(--theme-accent)] font-black text-[11px]">PHP {totalCheckoutPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form Side */}
              <div className="w-full flex-grow p-4 md:p-5 overflow-y-auto brutal-scrollbar flex flex-col justify-center bg-white">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-1.5 mb-3 gap-2">
                    <h3 className="text-[10px] sm:text-xs font-orbitron font-black uppercase tracking-widest text-black">Secure Checkout</h3>
                    <div className="bg-black text-[var(--theme-cyan)] px-2 py-0.5 border border-black flex items-center gap-1.5 self-start">
                      <span className="font-orbitron text-[8px] font-bold uppercase tracking-widest"><AlertTriangle size={8} className="inline" /> PH Only</span>
                      <span className="font-jakarta text-[8px] text-gray-300">Manual verification via email</span>
                    </div>
                  </div>

                  <form className="space-y-3" onSubmit={async (e) => {
                    e.preventDefault();
                    setIsCheckoutLoading(true);
                    
                    try {
                      // Log a combined order for all checkout items
                      const itemName = checkoutItems.length > 1 
                        ? `Multiple Items (${checkoutItems.length})` 
                        : checkoutItems[0].name;
                        
                      await purchaseMutation({
                        item: itemName,
                        subtotal: totalCheckoutPrice,
                        vat: Math.round(totalCheckoutPrice * 0.12),
                        total: totalCheckoutPrice + Math.round(totalCheckoutPrice * 0.12)
                      });
                      
                      setIsCheckoutSuccess(true);
                      setTimeout(() => {
                        setIsCheckoutOpen(false);
                        setIsCheckoutSuccess(false);
                        setCart([]);
                      }, 2500);
                    } catch (error) {
                      console.error("Purchase failed", error);
                    } finally {
                      setIsCheckoutLoading(false);
                    }
                  }}>
                    {isCheckoutSuccess && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-50 border-2 border-green-600 text-green-800 font-orbitron text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-[2px_2px_0_#16a34a]">
                        <CheckCircle size={16} /> Order Received! Confirmation queued.
                      </motion.div>
                    )}
                    {/* Row 1: Full Name, Email, Shipping Address (3 Columns!) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Full Name</label>
                        <input type="text" required className="w-full border-2 border-black p-2 font-jakarta bg-white text-black rounded-none focus:border-[var(--theme-accent)] outline-none transition-colors text-[9px] font-bold" />
                      </div>
                      <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Email</label>
                        <input type="email" required className="w-full border-2 border-black p-2 font-jakarta bg-white text-black rounded-none focus:border-[var(--theme-accent)] outline-none transition-colors text-[9px] font-bold" />
                      </div>
                      <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Shipping Address</label>
                        <input type="text" required placeholder="Street, City, Province, Zip" className="w-full border-2 border-black p-2 font-jakarta bg-white text-black rounded-none focus:border-[var(--theme-accent)] outline-none transition-colors text-[9px] font-bold placeholder-gray-400" />
                      </div>
                    </div>

                    {/* Row 2: Payment Method, Transfer Details, Upload Receipt (3 Columns!) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Payment Method</label>
                        <div className="flex gap-1.5">
                          <button type="button" onClick={() => setPaymentMethod("GCash")} className={`flex-grow py-2 border-2 font-orbitron font-black text-[8px] uppercase tracking-widest transition-all rounded-none ${paymentMethod === "GCash" ? "bg-black text-[var(--theme-cyan)] border-black shadow-[1.5px_1.5px_0_var(--theme-accent)]" : "bg-white text-black border-black hover:bg-gray-100"}`}>GCash</button>
                          <button type="button" onClick={() => setPaymentMethod("Bank")} className={`flex-grow py-2 border-2 font-orbitron font-black text-[8px] uppercase tracking-widest transition-all rounded-none ${paymentMethod === "Bank" ? "bg-black text-[var(--theme-cyan)] border-black shadow-[1.5px_1.5px_0_var(--theme-accent)]" : "bg-white text-black border-black hover:bg-gray-100"}`}>Bank</button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 border-2 border-dashed border-black min-h-[38px] flex flex-col justify-center rounded-none">
                        {!paymentMethod ? (
                          <span className="font-jakarta text-[8px] text-gray-500 font-bold uppercase tracking-wider text-center select-none block">Pick method first</span>
                        ) : paymentMethod === "GCash" ? (
                          <div className="font-jakarta text-[8px] text-gray-800 leading-none">
                            <p className="mb-0.5">Num: <span className="font-bold text-black tracking-wider">0917-123-4567</span></p>
                            <p className="mt-1">Name: <span className="font-bold text-black">REDAI Protocol</span></p>
                          </div>
                        ) : (
                          <div className="font-jakarta text-[7px] text-gray-800 leading-tight">
                            <p className="font-bold text-black leading-none">REDAI GLOBAL BANK</p>
                            <p className="mt-1">Acct: <span className="font-bold text-black tracking-wider">1234-5678-9012</span></p>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Upload Receipt</label>
                        <input type="file" required className="w-full border-2 border-black p-1 font-jakarta text-[8px] bg-white text-black rounded-none file:bg-black file:text-white file:border-0 file:px-2.5 file:py-1 file:font-orbitron file:uppercase file:text-[8px] file:tracking-widest file:cursor-pointer hover:file:bg-[var(--theme-accent)] file:rounded-none transition-all cursor-pointer" />
                      </div>
                    </div>

                    <button type="submit" disabled={isCheckoutLoading || isCheckoutSuccess} className="w-full bg-[var(--theme-accent)] text-white font-orbitron font-black py-2.5 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase mt-2 text-[9px] tracking-widest shadow-[2px_2px_0_var(--theme-cyan)] rounded-none disabled:opacity-50">
                      {isCheckoutLoading ? "Processing..." : "Complete Order"}
                    </button>
                  </form>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const styles = {
    pending: "bg-orange-500 text-white border-black",
    approved: "bg-green-600 text-white border-black",
    rejected: "bg-gray-600 text-white border-black",
  };
  return (
    <span className={`inline-block text-[8px] font-orbitron font-black uppercase tracking-widest px-2 py-0.5 border-2 ${styles[status]}`}>
      {status}
    </span>
  );
}

function AdminCareersLedger() {
  const [subTab, setSubTab] = useState<"applications" | "jobs">("applications");

  // Applications state
  const [careerFilter, setCareerFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const allApplications = useQuery(api.careers.list) ?? [];
  const updateAppStatus = useMutation(api.careers.updateStatus);
  const filteredApps = careerFilter === "all" ? allApplications : allApplications.filter(a => a.status === careerFilter);

  // Job postings state
  const allJobs = useQuery(api.jobs.listAll) ?? [];
  const addJob = useMutation(api.jobs.add);
  const removeJob = useMutation(api.jobs.remove);
  const toggleJobActive = useMutation(api.jobs.toggleActive);
  const [jobSuccess, setJobSuccess] = useState(false);
  const [jobDeleteConfirm, setJobDeleteConfirm] = useState<string | null>(null);

  return (
    <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000] animate-fadeIn space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-4 border-black pb-4 gap-4">
        <div>
          <span className="text-[9px] font-orbitron font-black bg-black text-white px-2 py-0.5 uppercase tracking-widest">ADMIN COMMAND</span>
          <h3 className="text-xl sm:text-3xl font-orbitron font-black uppercase text-black leading-none mt-1">CAREERS DASHBOARD</h3>
          <p className="font-jakarta font-bold text-[10px] text-gray-500 mt-0.5">Real-time · Backed by Convex DB</p>
        </div>
        {/* Sub-tab switcher */}
        <div className="flex gap-0 border-2 border-black flex-shrink-0">
          <button
            onClick={() => setSubTab("applications")}
            className={`px-4 py-2 font-orbitron font-black uppercase text-[9px] tracking-wider border-r-2 border-black transition-all ${subTab === "applications" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}
          >
            Applications
            <span className={`ml-1.5 text-[8px] px-1 py-0.5 border ${subTab === "applications" ? "border-white text-white" : "border-black text-black"}`}>
              {allApplications.filter(a => a.status === "pending").length}
            </span>
          </button>
          <button
            onClick={() => setSubTab("jobs")}
            className={`px-4 py-2 font-orbitron font-black uppercase text-[9px] tracking-wider transition-all ${subTab === "jobs" ? "bg-[var(--theme-accent)] text-white" : "bg-white text-black hover:bg-gray-100"}`}
          >
            Job Postings
            <span className={`ml-1.5 text-[8px] px-1 py-0.5 border ${subTab === "jobs" ? "border-white text-white" : "border-black text-black"}`}>
              {allJobs.filter(j => j.isActive).length}
            </span>
          </button>
        </div>
      </div>

      {/* ── APPLICATIONS PANEL ── */}
      {subTab === "applications" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Stats Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] bg-black text-white px-2.5 py-0.5 font-orbitron font-black uppercase tracking-widest">{allApplications.length} TOTAL</span>
            <span className="text-[10px] bg-green-600 text-white px-2.5 py-0.5 font-orbitron font-black uppercase tracking-widest">{allApplications.filter(a=>a.status==="approved").length} APPROVED</span>
            <span className="text-[10px] bg-orange-500 text-white px-2.5 py-0.5 font-orbitron font-black uppercase tracking-widest">{allApplications.filter(a=>a.status==="pending").length} PENDING</span>
            <span className="text-[10px] bg-gray-600 text-white px-2.5 py-0.5 font-orbitron font-black uppercase tracking-widest">{allApplications.filter(a=>a.status==="rejected").length} REJECTED</span>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "pending", "approved", "rejected"] as const).map(f => (
              <button key={f} onClick={() => setCareerFilter(f)} className={`px-3 py-1.5 font-orbitron font-black uppercase text-[9px] tracking-wider border-2 border-black transition-all ${careerFilter === f ? f === "approved" ? "bg-green-600 text-white shadow-none" : f === "rejected" ? "bg-gray-600 text-white shadow-none" : f === "pending" ? "bg-orange-500 text-white shadow-none" : "bg-[var(--theme-accent)] text-white shadow-none" : "bg-white text-black hover:bg-gray-50 shadow-[2px_2px_0_#000]"}`}>
                {f === "all" ? `All (${allApplications.length})` : `${f} (${allApplications.filter(a=>a.status===f).length})`}
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredApps.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 border-2 border-black">
              <p className="font-orbitron font-bold uppercase text-xs text-gray-500 mb-1">
                {careerFilter === "all" ? "No applications in the pipeline yet." : `No ${careerFilter} applications.`}
              </p>
              <p className="font-jakarta text-xs text-gray-400 font-bold">Submit an application from the Careers tab to see it appear here in real-time.</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards */}
              <div className="block md:hidden space-y-4">
                {filteredApps.map((app) => (
                  <div key={app._id} className={`border-2 border-black p-4 font-jakarta font-bold text-xs space-y-2.5 shadow-[4px_4px_0_#000] ${app.status === "rejected" ? "opacity-60 bg-gray-100" : "bg-gray-50"}`}>
                    <div className="flex justify-between items-start border-b-2 border-black pb-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-orbitron text-[8px] bg-black text-white px-2 py-0.5 uppercase font-black tracking-wider self-start">{new Date(app.appliedAt).toLocaleDateString()}</span>
                        <StatusBadge status={app.status} />
                      </div>
                      <span className="font-orbitron text-[8px] text-gray-500 font-bold text-right">{app.appliedRole}</span>
                    </div>
                    <div><span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Applicant</span><span className="uppercase text-xs text-black font-extrabold">{app.fullName}</span></div>
                    <div><span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Email</span><span className="lowercase text-gray-700 break-all text-xs font-semibold">{app.emailAddress}</span></div>
                    {app.portfolioLink && (<div><span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Portfolio</span><a href={app.portfolioLink} target="_blank" rel="noreferrer" className="text-[var(--theme-accent)] hover:underline break-all font-mono text-[10px] block">{app.portfolioLink}</a></div>)}
                    {app.message && (<div><span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Cover Message</span><p className="text-[11px] text-gray-700 italic font-semibold leading-relaxed">{app.message}</p></div>)}
                    {app.status === "pending" && (
                      <div className="flex gap-2 pt-2 border-t border-black/15">
                        <button onClick={() => void updateAppStatus({ id: app._id, status: "approved" })} className="flex-1 bg-green-600 hover:bg-black text-white font-orbitron font-black uppercase text-[9px] tracking-wider py-2 border-2 border-black transition-colors cursor-pointer shadow-[2px_2px_0_#000]">Approve</button>
                        <button onClick={() => void updateAppStatus({ id: app._id, status: "rejected" })} className="flex-1 bg-gray-600 hover:bg-black text-white font-orbitron font-black uppercase text-[9px] tracking-wider py-2 border-2 border-black transition-colors cursor-pointer shadow-[2px_2px_0_#000]">Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse border-2 border-black">
                  <thead>
                    <tr className="bg-black text-white font-orbitron font-bold uppercase text-[9px] tracking-widest">
                      <th className="p-3 border border-black">Date</th>
                      <th className="p-3 border border-black">Applicant</th>
                      <th className="p-3 border border-black">Role Applied</th>
                      <th className="p-3 border border-black">Email</th>
                      <th className="p-3 border border-black">Portfolio</th>
                      <th className="p-3 border border-black">Message</th>
                      <th className="p-3 border border-black">Status</th>
                      <th className="p-3 border border-black text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-jakarta font-bold text-xs bg-white text-black">
                    {filteredApps.map((app) => (
                      <tr key={app._id} className={`border-b-2 border-black transition-colors hover:bg-gray-50 ${app.status === "rejected" ? "opacity-50" : ""}`}>
                        <td className="p-3 border border-black font-orbitron text-[9px] whitespace-nowrap">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="p-3 border border-black font-black uppercase whitespace-nowrap">{app.fullName}</td>
                        <td className="p-3 border border-black"><span className="text-[9px] font-orbitron font-black uppercase tracking-wider text-[var(--theme-accent)]">{app.appliedRole}</span></td>
                        <td className="p-3 border border-black lowercase text-gray-600 text-[11px]">{app.emailAddress}</td>
                        <td className="p-3 border border-black max-w-[120px]">
                          {app.portfolioLink ? (<a href={app.portfolioLink} target="_blank" rel="noreferrer" className="text-[var(--theme-accent)] hover:underline break-all font-mono text-[9px]">{app.portfolioLink}</a>) : <span className="text-gray-400 italic text-[10px]">—</span>}
                        </td>
                        <td className="p-3 border border-black max-w-[150px]">
                          {app.message ? (
                            <div>
                              <p className={`text-[10px] text-gray-700 italic leading-snug ${expandedMsg === app._id ? "" : "line-clamp-2"}`}>{app.message}</p>
                              <button onClick={() => setExpandedMsg(expandedMsg === app._id ? null : app._id)} className="text-[8px] font-orbitron font-black uppercase tracking-wider text-[var(--theme-accent)] hover:underline mt-0.5">{expandedMsg === app._id ? "Less" : "More"}</button>
                            </div>
                          ) : <span className="text-gray-400 italic text-[10px]">—</span>}
                        </td>
                        <td className="p-3 border border-black"><StatusBadge status={app.status} /></td>
                        <td className="p-3 border border-black text-center">
                          {app.status === "pending" ? (
                            <div className="flex justify-center gap-1.5">
                              <button onClick={() => void updateAppStatus({ id: app._id, status: "approved" })} className="bg-green-600 hover:bg-black text-white font-orbitron font-black uppercase text-[8px] tracking-wider px-2.5 py-1.5 border border-black transition-colors cursor-pointer">Approve</button>
                              <button onClick={() => void updateAppStatus({ id: app._id, status: "rejected" })} className="bg-gray-600 hover:bg-black text-white font-orbitron font-black uppercase text-[8px] tracking-wider px-2.5 py-1.5 border border-black transition-colors cursor-pointer">Reject</button>
                            </div>
                          ) : <span className="font-orbitron text-[8px] uppercase text-gray-400 tracking-widest">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── JOB POSTINGS PANEL ── */}
      {subTab === "jobs" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Add New Job Form */}
          <div className="border-4 border-black p-5 bg-gray-50 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-black pb-3">
              <div className="w-8 h-8 bg-[var(--theme-accent)] border-2 border-black flex items-center justify-center flex-shrink-0">
                <Plus size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-orbitron font-black text-sm uppercase">Add New Career Post</h4>
                <p className="font-jakarta font-bold text-[10px] text-gray-500">New posts appear on the live Careers page instantly.</p>
              </div>
            </div>
            {jobSuccess && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border-2 border-green-600 p-3 mb-4 flex items-center gap-2 shadow-[2px_2px_0_#16a34a]">
                <CheckCircle size={14} className="text-green-600" />
                <span className="font-orbitron font-black text-[10px] uppercase tracking-widest text-green-800">Job post published successfully!</span>
              </motion.div>
            )}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                await addJob({
                  title: fd.get("title") as string,
                  badge: (fd.get("badge") as string).toUpperCase(),
                  color: fd.get("color") as string,
                  salary: fd.get("salary") as string,
                  type: fd.get("type") as string,
                  desc: fd.get("desc") as string,
                  requirements: (fd.get("requirements") as string).split(",").map(r => r.trim()).filter(Boolean),
                });
                (e.target as HTMLFormElement).reset();
                setJobSuccess(true);
                setTimeout(() => setJobSuccess(false), 3000);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Job Title <span className="text-[var(--theme-accent)]">*</span></label>
                <input name="title" required placeholder="e.g. Senior AI Engineer" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors" />
              </div>
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Department Badge <span className="text-[var(--theme-accent)]">*</span></label>
                <input name="badge" required placeholder="e.g. ENGINEERING" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors" />
              </div>
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Badge Color <span className="text-[var(--theme-accent)]">*</span></label>
                <div className="flex gap-2">
                  <input name="color" required type="color" defaultValue="#dc2626" className="w-10 h-10 border-2 border-black cursor-pointer bg-white p-0.5" />
                  <input name="colorText" placeholder="#7c3aed or CSS var" className="flex-1 border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors"
                    onChange={(e) => {
                      const colorInput = e.currentTarget.closest("div")?.querySelector("input[type=color]") as HTMLInputElement;
                      if (colorInput && e.target.value) colorInput.value = e.target.value;
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Salary Range <span className="text-[var(--theme-accent)]">*</span></label>
                <input name="salary" required placeholder="e.g. PHP 80,000–120,000 / mo" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors" />
              </div>
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Work Type <span className="text-[var(--theme-accent)]">*</span></label>
                <input name="type" required placeholder="e.g. Remote · Full-Time" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors" />
              </div>
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Requirements <span className="text-[var(--theme-accent)]">*</span> <span className="normal-case font-jakarta text-gray-400">(comma-separated)</span></label>
                <input name="requirements" required placeholder="React, TypeScript, 3+ yrs experience" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Job Description <span className="text-[var(--theme-accent)]">*</span></label>
                <textarea name="desc" required rows={2} placeholder="Brief description of the role and what you'll be building…" className="w-full border-2 border-black p-2.5 font-jakarta font-bold text-xs bg-white outline-none focus:border-[var(--theme-accent)] transition-colors resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="w-full bg-black text-white font-orbitron font-black uppercase text-xs tracking-widest py-3 border-2 border-black hover:bg-[var(--theme-accent)] transition-colors shadow-[3px_3px_0_#555] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  Publish Job Post →
                </button>
              </div>
            </form>
          </div>

          {/* Existing Job Postings List */}
          <div className="space-y-3">
            <h4 className="font-orbitron font-black text-sm uppercase border-b-2 border-black pb-2">
              Current Postings
              <span className="ml-2 text-[9px] font-normal text-gray-500">({allJobs.filter(j => j.isActive).length} active · {allJobs.filter(j => !j.isActive).length} archived)</span>
            </h4>
            {allJobs.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 border-2 border-black">
                <p className="font-orbitron font-bold text-xs text-gray-500 uppercase">No job posts yet. Add one above!</p>
              </div>
            ) : (
              allJobs.map(job => (
                <div key={job._id} className={`border-2 border-black p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-opacity ${!job.isActive ? "opacity-50 bg-gray-100" : "bg-white shadow-[2px_2px_0_#000]"}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[8px] font-orbitron font-black uppercase tracking-widest px-2 py-0.5 border border-black text-white" style={{ backgroundColor: job.color }}>{job.badge}</span>
                      {!job.isActive && <span className="text-[8px] font-orbitron font-black uppercase tracking-widest px-2 py-0.5 border-2 border-gray-400 text-gray-500">ARCHIVED</span>}
                    </div>
                    <h5 className="font-orbitron font-black text-sm uppercase">{job.title}</h5>
                    <p className="font-jakarta font-bold text-[10px] text-gray-500 mt-0.5">{job.type} · {job.salary}</p>
                    <p className="font-jakarta text-xs text-gray-600 mt-1 line-clamp-1">{job.desc}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => void toggleJobActive({ id: job._id, isActive: !job.isActive })}
                      className="px-3 py-1.5 border-2 border-black font-orbitron font-black uppercase text-[9px] tracking-wider hover:bg-gray-100 transition-colors"
                    >
                      {job.isActive ? "Archive" : "Activate"}
                    </button>
                    {jobDeleteConfirm === job._id ? (
                      <div className="flex gap-1">
                        <button onClick={() => { void removeJob({ id: job._id }); setJobDeleteConfirm(null); }} className="px-3 py-1.5 bg-red-600 text-white border-2 border-black font-orbitron font-black uppercase text-[9px] tracking-wider hover:bg-black transition-colors">Confirm</button>
                        <button onClick={() => setJobDeleteConfirm(null)} className="px-3 py-1.5 bg-white border-2 border-black font-orbitron font-black uppercase text-[9px] tracking-wider hover:bg-gray-100 transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setJobDeleteConfirm(job._id)} className="px-3 py-1.5 border-2 border-red-600 text-red-600 font-orbitron font-black uppercase text-[9px] tracking-wider hover:bg-red-600 hover:text-white transition-colors">Delete</button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function AdminDashboardTab({
  user,
  setIsSignInModalOpen,
}: {
  user: any;
  setIsSignInModalOpen: (open: boolean) => void;
}) {
  const [adminTab, setAdminTab] = useState<"overview" | "careers" | "marketplace" | "marketing">("overview");
  
  // Custom states for Overview filtering
  const allApplications = useQuery(api.careers.list) ?? [];
  // Live marketing submissions from Convex (admin-only query — returns [] if not admin yet)
  const marketingSubmissions = useQuery(api.marketing.list) ?? [];

  // Live states for Transaction ledger (Marketplace VAT calculator)
  const transactions = useQuery(api.marketplace.list) ?? [];
  const logOrder = useMutation(api.marketplace.logOrder);
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemSubtotal, setNewItemSubtotal] = useState<number>(0);
  const [txSuccess, setTxSuccess] = useState(false);

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || newItemSubtotal <= 0) return;
    const vat = Math.round(newItemSubtotal * 0.12);
    const total = newItemSubtotal + vat;
    
    await logOrder({
      item: newItemName,
      subtotal: newItemSubtotal,
      vat,
      total,
    });
    
    setNewItemName("");
    setNewItemSubtotal(0);
    setTxSuccess(true);
    setTimeout(() => setTxSuccess(false), 3000);
  };

  // Access Control check
  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="brutal-container bg-white border-4 border-black p-8 shadow-[8px_8px_0_#000] text-black font-jakarta">
          <div className="w-16 h-16 bg-red-600 text-white border-4 border-black flex items-center justify-center font-bold mx-auto mb-6 shadow-[3px_3px_0_#000]">
            <Lock size={32} />
          </div>
          <span className="text-[10px] font-orbitron font-black bg-red-600 text-white px-2 py-0.5 border border-black uppercase tracking-widest">
            ERROR: ACCESS_DENIED
          </span>
          <h3 className="text-2xl font-orbitron italic font-bold uppercase mt-4 mb-2">
            RESTRICTED ADMIN MATRIX
          </h3>
          <p className="text-gray-600 font-bold text-xs mb-6">
            You do not hold administrative clearance protocols. Log in as an administrator to unlock this command center interface.
          </p>
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="px-8 bg-black text-white font-orbitron font-black py-3 border-2 border-black hover:bg-[var(--theme-accent)] transition-all uppercase text-xs tracking-widest shadow-[3px_3px_0_var(--theme-cyan)] cursor-pointer"
          >
            Authenticate Admin Credentials
          </button>
        </div>
      </div>
    );
  }

  // Mock visits per article
  const blogVisits = [
    { title: "ChatGPT-5 Release & The Future of Writing", visits: 1420 },
    { title: "How to Bypass Claude 3.5 AI Detectors", visits: 980 },
    { title: "DeepSeek-V3 vs Gemini 1.5 Pro: Direct Compare", visits: 850 },
    { title: "Understanding AI Watermarking & RedAI Mitigation", visits: 520 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-6 lg:py-8 text-black">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-black pb-6 mb-8">
        <div>
          <span className="inline-block text-[9px] font-orbitron font-black bg-red-600 text-white px-2 py-0.5 border border-black uppercase tracking-widest mb-1.5">
            SECURED ROOT ADMINISTRATIVE SHELL
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-orbitron italic font-bold uppercase text-black leading-none">
            COMMAND CENTER
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-black font-orbitron text-[10px] sm:text-xs font-bold tracking-widest shadow-[3px_3px_0_var(--theme-cyan)]">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          SYS STATUS: ONLINE
        </div>
      </div>

      {/* Internal Subtabs */}
      <div className="flex overflow-x-auto md:flex-wrap gap-2 mb-8 border-b-2 border-black pb-4 scrollbar-none px-1">
        {[
          { id: "overview", label: "Overview & Clicks" },
          { id: "careers", label: `Careers (${allApplications.length})` },
          { id: "marketplace", label: "Marketplace & VAT Ledger" },
          { id: "marketing", label: `Marketing & Referrals (${marketingSubmissions.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 font-orbitron font-bold uppercase text-[10px] sm:text-xs border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 flex-shrink-0 ${adminTab === tab.id ? 'bg-[var(--theme-accent)] text-white shadow-none translate-x-0.5 translate-y-0.5' : 'bg-white text-black hover:bg-gray-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview/Clicks Panel */}
      {adminTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main metric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="brutal-container bg-white border-2 border-black p-4 shadow-[4px_4px_0_#000]">
              <span className="text-[9px] font-orbitron font-black text-gray-500 uppercase tracking-widest">TOTAL VISITORS</span>
              <p className="text-2xl sm:text-3xl font-orbitron font-black uppercase text-black mt-1">42,850</p>
              <div className="text-[9px] font-jakarta font-bold text-green-600 mt-1 flex items-center gap-1">
                <span>&uarr; 18.2%</span> <span className="text-gray-400">vs last week</span>
              </div>
            </div>
            <div className="brutal-container bg-white border-2 border-black p-4 shadow-[4px_4px_0_#000]">
              <span className="text-[9px] font-orbitron font-black text-gray-500 uppercase tracking-widest">ACTIVE SESSIONS</span>
              <p className="text-2xl sm:text-3xl font-orbitron font-black uppercase text-[var(--theme-accent)] mt-1">294</p>
              <div className="text-[9px] font-jakarta font-bold text-gray-400 mt-1">
                Real-time websockets active
              </div>
            </div>
            <div className="brutal-container bg-white border-2 border-black p-4 shadow-[4px_4px_0_#000]">
              <span className="text-[9px] font-orbitron font-black text-gray-500 uppercase tracking-widest">TOTAL DETECT CLICKS</span>
              <p className="text-2xl sm:text-3xl font-orbitron font-black uppercase text-black mt-1">104,220</p>
              <div className="text-[9px] font-jakarta font-bold text-green-600 mt-1 flex items-center gap-1">
                <span>&uarr; 8.4%</span> <span className="text-gray-400">conversion rate 68%</span>
              </div>
            </div>
            <div className="brutal-container bg-[var(--theme-cyan)] border-2 border-black p-4 shadow-[4px_4px_0_#000] text-black">
              <span className="text-[9px] font-orbitron font-black text-black/70 uppercase tracking-widest">ADSENSE REVENUE CPC</span>
              <p className="text-2xl sm:text-3xl font-orbitron font-black uppercase text-black mt-1">$1,480.50</p>
              <div className="text-[9px] font-jakarta font-bold text-black mt-1">
                VAT Exclusive // PHP 84,380 est.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* SVG Charts Column */}
            <div className="lg:col-span-2 brutal-container bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000]">
              <h3 className="text-sm sm:text-lg font-orbitron font-bold uppercase text-black mb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-black pb-2 gap-2">
                <span>SYS LOGS // WEEKLY DAU & REVENUE GRAPH</span>
                <span className="text-[8px] sm:text-[9px] bg-black text-white px-2 py-0.5 self-start sm:self-auto">SVG VECTOR RENDERING</span>
              </h3>

              <div className="w-full h-48 sm:h-64 bg-gray-50 border-2 border-black relative flex flex-col justify-end p-2 sm:p-4">
                {/* Custom SVG line & bar chart */}
                <svg className="absolute inset-0 w-full h-full p-4 sm:p-6" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#ddd" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#ddd" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#ddd" strokeWidth="0.5" strokeDasharray="2,2" />

                  {/* Revenue Area Graph */}
                  <path
                    d="M 0 90 L 10 70 L 25 80 L 40 45 L 60 55 L 80 20 L 100 10 L 100 90 Z"
                    fill="rgba(255, 61, 0, 0.15)"
                    stroke="none"
                  />
                  {/* Traffic Line Chart */}
                  <polyline
                    fill="none"
                    stroke="var(--theme-accent)"
                    strokeWidth="2"
                    points="0,85 10,75 25,60 40,40 60,45 80,15 100,5"
                  />
                  {/* AdSense Click Bars */}
                  <rect x="8" y="70" width="4" height="20" fill="#00ffff" stroke="#000" strokeWidth="0.5" />
                  <rect x="23" y="55" width="4" height="35" fill="#00ffff" stroke="#000" strokeWidth="0.5" />
                  <rect x="38" y="30" width="4" height="60" fill="#00ffff" stroke="#000" strokeWidth="0.5" />
                  <rect x="58" y="40" width="4" height="50" fill="#00ffff" stroke="#000" strokeWidth="0.5" />
                  <rect x="78" y="15" width="4" height="75" fill="#00ffff" stroke="#000" strokeWidth="0.5" />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[8px] font-orbitron font-bold uppercase text-black mt-auto pt-2 border-t border-black z-10">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-[8px] sm:text-[9px] font-bold">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-[var(--theme-accent)]"></span> TRAFFIC (DAU)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[var(--theme-cyan)] border border-black"></span> ADSENSE CLICKS</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-2 bg-[rgba(255,61,0,0.15)] border border-[var(--theme-accent)]"></span> REVENUE FLOW</span>
              </div>
            </div>

            {/* Blog visits table */}
            <div className="brutal-container bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000] text-black">
              <h3 className="text-sm sm:text-lg font-orbitron font-bold uppercase text-black mb-4 flex items-center justify-between border-b border-black pb-2">
                <span>BLOG VISIT MATRIX</span>
                <span className="text-[8px] sm:text-[9px] bg-[var(--theme-cyan)] text-black border border-black px-2 py-0.5 font-bold uppercase tracking-widest font-orbitron">REAL-TIME</span>
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {blogVisits.map((blog, idx) => (
                  <div key={idx} className="border-2 border-black p-3 hover:bg-black hover:text-white transition-all flex justify-between items-center bg-gray-50">
                    <div className="max-w-[70%]">
                      <p className="font-orbitron font-black text-[9px] sm:text-[10px] uppercase tracking-wider line-clamp-1">{blog.title}</p>
                      <span className="font-jakarta text-[8px] text-gray-500 block truncate">/blog/{blog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</span>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <p className="font-orbitron font-black text-xs">{blog.visits} hits</p>
                      <span className="text-[7px] text-green-500 font-bold uppercase tracking-widest font-orbitron animate-pulse block">Active Now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Career Applications Panel */}
      {adminTab === "careers" && (
        <AdminCareersLedger />
      )}

      {/* Marketplace & VAT ledger */}
      {adminTab === "marketplace" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 animate-fadeIn">
          {/* Add transaction form */}
          <div className="brutal-container bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000]">
            <h3 className="text-sm sm:text-lg font-orbitron font-bold uppercase text-black mb-4 border-b border-black pb-2">
              VAT-INCLUSIVE TRANSACTION LEDGER
            </h3>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Item / Service Name</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. REDAI Premium Monthly subscription"
                  className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)] text-xs"
                />
              </div>

              <div>
                <label className="block text-[9px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Subtotal Price (PHP)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newItemSubtotal || ""}
                  onChange={(e) => setNewItemSubtotal(Number(e.target.value))}
                  placeholder="e.g. 5000"
                  className="w-full border-2 border-black p-2.5 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)] text-xs"
                />
              </div>

              {/* Real-time VAT pricing breakdown */}
              <div className="bg-gray-50 border-2 border-black p-3.5 text-xs font-bold space-y-1">
                <p className="font-orbitron font-black text-[9px] uppercase tracking-wider text-gray-500 mb-2 border-b border-black pb-1">
                  💰 Real-Time VAT-Inclusive Calculator
                </p>
                <div className="flex justify-between">
                  <span>Subtotal Price:</span>
                  <span>PHP {newItemSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>VAT Component (12%):</span>
                  <span>+ PHP {(newItemSubtotal * 0.12).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-base font-orbitron font-black border-t-2 border-black pt-1.5 text-black mt-2 font-black">
                  <span>TOTAL COST:</span>
                  <span>PHP {(newItemSubtotal * 1.12).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {txSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-green-50 border-2 border-green-600 px-3 py-2 shadow-[2px_2px_0_#16a34a]"
                >
                  <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                  <span className="font-orbitron font-black uppercase text-[9px] tracking-wider text-green-800">Transaction logged successfully!</span>
                </motion.div>
              )}
              <button
                type="submit"
                className="w-full bg-black text-white font-orbitron font-bold py-2.5 border-2 border-black hover:bg-[var(--theme-accent)] hover:text-white transition-all uppercase text-xs tracking-widest shadow-[3px_3px_0_var(--theme-cyan)] cursor-pointer"
              >
                Log Transaction
              </button>
            </form>
          </div>

          {/* Sold inventory transactions */}
          <div className="lg:col-span-2 brutal-container bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000]">
            <h3 className="text-base sm:text-xl font-orbitron font-bold uppercase text-black mb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-2 gap-2">
              <span>SOLD INVENTORY LEDGER (VAT SECURED)</span>
              <span className="text-[9px] bg-[var(--theme-cyan)] text-black border border-black px-2 py-0.5 font-bold uppercase tracking-widest font-orbitron self-start sm:self-auto">
                12% VAT CODE ENFORCED
              </span>
            </h3>

            {/* Mobile Card Stack View (Visible on small screens) */}
            <div className="block md:hidden space-y-4">
              {transactions.map((txn) => (
                <div key={txn._id} className="border-2 border-black p-4 bg-gray-50 font-jakarta font-bold text-xs space-y-2 shadow-[4px_4px_0_#000]">
                  <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <span className="font-orbitron text-[9px] bg-black text-white px-2 py-0.5 border border-black uppercase font-black tracking-wider">TXN-{txn._id.slice(-6).toUpperCase()}</span>
                    <span className="font-orbitron text-[9px] text-gray-500 font-bold">{new Date(txn.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Item Purchased</span>
                    <span className="uppercase text-xs sm:text-sm text-black font-extrabold">{txn.item}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/15 text-center bg-white p-2 border border-black mt-2">
                    <div>
                      <span className="text-gray-400 uppercase tracking-widest text-[7px] font-orbitron block mb-0.5">Subtotal</span>
                      <span className="font-mono text-[9px] sm:text-xs font-bold text-black">PHP {txn.subtotal.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase tracking-widest text-[7px] font-orbitron block mb-0.5">12% VAT</span>
                      <span className="font-mono text-[9px] sm:text-xs font-bold text-red-600">+PHP {txn.vat.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 uppercase tracking-widest text-[7px] font-orbitron block mb-0.5">Total Cost</span>
                      <span className="font-mono text-[9px] sm:text-xs font-black text-green-600">PHP {txn.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Ledger View (Visible on medium screens and up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse border-2 border-black">
                <thead>
                  <tr className="bg-black text-white font-orbitron font-bold uppercase text-[9px] tracking-widest">
                    <th className="p-3 border border-black">TXN ID</th>
                    <th className="p-3 border border-black">Item Purchased</th>
                    <th className="p-3 border border-black text-right">Subtotal</th>
                    <th className="p-3 border border-black text-right">12% VAT</th>
                    <th className="p-3 border border-black text-right">Total Price</th>
                    <th className="p-3 border border-black">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="font-jakarta font-bold text-xs bg-white text-black divide-y-2 divide-black">
                  {transactions.map((txn) => (
                    <tr key={txn._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 border border-black font-orbitron text-[10px] bg-gray-50">TXN-{txn._id.slice(-6).toUpperCase()}</td>
                      <td className="p-3 border border-black uppercase">{txn.item}</td>
                      <td className="p-3 border border-black text-right font-mono text-[11px]">PHP {txn.subtotal.toLocaleString()}</td>
                      <td className="p-3 border border-black text-right font-mono text-[11px] text-red-600">+PHP {txn.vat.toLocaleString()}</td>
                      <td className="p-3 border border-black text-right font-mono text-xs font-black text-green-600">PHP {txn.total.toLocaleString()}</td>
                      <td className="p-3 border border-black font-orbitron text-[10px]">{new Date(txn.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Deals & Consignments */}
      {adminTab === "marketing" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Active programs header */}
          <div className="brutal-container bg-black text-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_var(--theme-accent)]">
            <h3 className="text-sm sm:text-lg font-orbitron italic font-bold uppercase text-[var(--theme-cyan)] mb-2">
              AETERNUM COLLABORATION PROTOCOL
            </h3>
            <p className="font-jakarta text-xs sm:text-sm leading-relaxed max-w-4xl text-gray-300 font-bold">
              Active Programs overview: Promoting brands inside blogs, carousels, and verified client networks. Affiliate consignments are tracked at a fixed <strong>20% commission</strong> payout per product purchase. GCash Influencer reviewers receive an instant PHP 100 bonus payout upon verified uploads.
            </p>
          </div>

          <div className="brutal-container bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000]">
            <h3 className="text-base sm:text-xl font-orbitron font-bold uppercase text-black mb-4 flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-2 gap-2">
              <span>MARKETING COLLABORATORS & DEALS REGISTRY</span>
              <span className="text-[10px] sm:text-xs bg-black text-white px-2.5 py-0.5 font-black uppercase tracking-widest self-start sm:self-auto">{marketingSubmissions.length} ACTIVE PARTNERS</span>
            </h3>

            {marketingSubmissions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 border-2 border-black text-black">
                <p className="font-orbitron font-bold uppercase text-xs text-gray-500 mb-2">No program submissions recorded yet.</p>
                <p className="font-jakarta text-xs text-gray-400 font-bold">Join a Deal in the Marketing Deals Tab to see real-time pipeline population!</p>
              </div>
            ) : (
              <>
                {/* Mobile Card Stack View (Visible on small screens) */}
                <div className="block md:hidden space-y-4">
                  {marketingSubmissions.map((sub) => (
                    <div key={sub._id} className="border-2 border-black p-4 bg-gray-50 font-jakarta font-bold text-xs space-y-2.5 shadow-[4px_4px_0_#000]">
                      <div className="flex justify-between items-center border-b-2 border-black pb-2">
                        <span className="font-orbitron text-[9px] bg-black text-white px-2 py-0.5 border border-black uppercase font-black tracking-wider">MKT-{sub._id.slice(-6).toUpperCase()}</span>
                        <span className="font-orbitron text-[9px] text-gray-500 font-bold">{new Date(sub.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron">Deal Program:</span>
                        <span className={`font-orbitron font-black text-[9px] px-2 py-0.5 border border-black uppercase text-white ${sub.type === "Partnership" ? "bg-red-600" :
                          sub.type === "Affiliate" ? "bg-cyan-600" :
                            sub.type === "Influencer" ? "bg-yellow-600 text-black" : "bg-purple-600"
                          }`}>
                          {sub.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Collaborator</span>
                        <span className="uppercase text-xs sm:text-sm text-black font-extrabold">{sub.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Email Address</span>
                        <span className="lowercase text-gray-700 break-all text-xs font-semibold">{sub.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Source / Details</span>
                        <span className="font-mono text-[10px] break-all text-black font-bold block">{sub.detail1}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 uppercase tracking-widest text-[8px] font-orbitron block mb-0.5">Commission/Method Details</span>
                        <span className="font-mono text-[10px] break-all text-black font-bold block">{sub.detail2 || "N/A"}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Ledger View (Visible on medium screens and up) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse border-2 border-black text-black">
                    <thead>
                      <tr className="bg-black text-white font-orbitron font-bold uppercase text-[9px] tracking-widest">
                        <th className="p-3 border border-black">Reg ID</th>
                        <th className="p-3 border border-black">Program Deal</th>
                        <th className="p-3 border border-black">Collaborator</th>
                        <th className="p-3 border border-black">Email</th>
                        <th className="p-3 border border-black">Source / Details</th>
                        <th className="p-3 border border-black">Commission/Method Details</th>
                        <th className="p-3 border border-black">Date</th>
                      </tr>
                    </thead>
                    <tbody className="font-jakarta font-bold text-xs bg-white text-black divide-y-2 divide-black">
                      {marketingSubmissions.map((sub) => (
                        <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 border border-black font-orbitron text-[10px] bg-gray-50">MKT-{sub._id.slice(-6).toUpperCase()}</td>
                          <td className="p-3 border border-black">
                            <span className={`font-orbitron font-black text-[9px] px-2 py-0.5 border border-black uppercase text-white ${sub.type === "Partnership" ? "bg-red-600" :
                              sub.type === "Affiliate" ? "bg-cyan-600" :
                                sub.type === "Influencer" ? "bg-yellow-600 text-black" : "bg-purple-600"
                              }`}>
                              {sub.type}
                            </span>
                          </td>
                          <td className="p-3 border border-black uppercase">{sub.name}</td>
                          <td className="p-3 border border-black lowercase text-gray-600">{sub.email}</td>
                          <td className="p-3 border border-black font-mono text-[9px] break-all">{sub.detail1}</td>
                          <td className="p-3 border border-black font-mono text-[9px] break-all">{sub.detail2 || "N/A"}</td>
                          <td className="p-3 border border-black font-orbitron text-[10px]">{new Date(sub.timestamp).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TabContainer({ title, subtitle, children, gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }: { title: string, subtitle?: string, children: React.ReactNode, gridClass?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-12">
      <div className="text-center mb-10 md:mb-16 px-4">
        <h1 className="text-2xl sm:text-4xl md:text-6xl text-black font-orbitron italic font-bold uppercase tracking-tighter leading-none mb-3 md:mb-4">{title}</h1>
        {subtitle && <p className="text-xs sm:text-base md:text-xl text-black font-jakarta max-w-3xl mx-auto font-bold">{subtitle}</p>}
      </div>
      <div className={`grid gap-8 ${gridClass}`}>
        {children}
      </div>
    </motion.div>
  );
}

function BrutalCard({ title, desc, icon, badge, descClass, onClick, compact = false }: { title: string, desc: string, icon: React.ReactNode, badge?: string, descClass?: string, onClick?: () => void, compact?: boolean }) {
  return (
    <div onClick={onClick} className={`brutal-container bg-white flex flex-col justify-between group cursor-pointer hover:bg-black hover:text-white transition-all border-2 border-black ${compact ? 'p-3 min-h-[140px]' : 'p-4 min-h-[180px]'}`}>
      <div>
        <div className={`flex justify-between items-start ${compact ? 'mb-2' : 'mb-3'}`}>
          <div className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} bg-black border border-black flex items-center justify-center shadow-[1px_1px_0_#000] group-hover:bg-[var(--theme-accent)] group-hover:border-white transition-colors`}>
            {icon}
          </div>
          {badge && <span className={`brutal-badge font-orbitron font-bold uppercase text-[7px] border border-black group-hover:border-white group-hover:text-black px-1 py-0.5 ${compact ? 'text-[6px]' : 'text-[8px]'}`}>{badge}</span>}
        </div>
        <h3 className={`font-orbitron italic font-bold leading-tight uppercase group-hover:text-white mb-1.5 text-black ${compact ? 'text-[10px]' : 'text-xs'}`}>{title}</h3>
        <p className={`font-jakarta text-gray-700 group-hover:text-white/80 leading-normal ${compact ? 'text-[8px]' : 'text-[10px]'} ${descClass ? descClass : ''}`}>{desc}</p>
      </div>
      <div className={`border-t border-black group-hover:border-white flex justify-end ${compact ? 'mt-2 pt-1' : 'mt-3 pt-1.5'}`}>
        <ArrowRight size={compact ? 10 : 12} className="text-black group-hover:text-[var(--theme-accent)]" />
      </div>
    </div>
  );
}

function Footer({ handleTabChange }: { handleTabChange: (tab: TabState | "admin", subId?: string) => void }) {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, tab: TabState | "admin", subId?: string) => {
    e.preventDefault();
    handleTabChange(tab, subId);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t-8 border-black bg-white py-16 text-black px-6 mt-16 font-jakarta">
      <div className="max-w-[1600px] mx-auto space-y-12">
        
        {/* Five Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Col 1: Branding & Intro */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-black border-2 border-black">
                <Cpu size={18} className="text-white" />
              </div>
              <span className="text-xl font-orbitron italic font-bold tracking-tighter text-black uppercase">
                RED<span className="text-[var(--theme-accent)]">AI</span>
              </span>
            </div>
            <p className="text-xs text-gray-700 font-bold leading-relaxed">
              Undetectable AI content humanization, AI checking, and generative visibility protocols. Re-engineering syntax for Google, Perplexity, ChatGPT, and Turnitin search algorithms.
            </p>
            <p className="text-[10px] font-orbitron text-black uppercase font-bold italic pt-4">
              © 2026 REDAI PROTOCOL.
            </p>
          </div>

          {/* Col 2: Optimization Tools */}
          <div>
            <h4 className="font-orbitron font-extrabold uppercase text-[var(--theme-accent)] mb-4 text-[11px] tracking-widest border-b border-black pb-1 inline-block">Bypass Tools</h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li><a href="/" onClick={(e) => handleLink(e, "home")} className="hover:text-[var(--theme-accent)] transition-colors">Text Humanizer</a></li>
              <li><a href="/" onClick={(e) => handleLink(e, "home")} className="hover:text-[var(--theme-accent)] transition-colors">AI Content Detector</a></li>
              <li><a href="/" onClick={(e) => handleLink(e, "home")} className="hover:text-[var(--theme-accent)] transition-colors">Plagiarism Scanner</a></li>
              <li><a href="/features" onClick={(e) => handleLink(e, "features")} className="hover:text-[var(--theme-accent)] transition-colors">Sentence Rewriter</a></li>
              <li><a href="/features" onClick={(e) => handleLink(e, "features")} className="hover:text-[var(--theme-accent)] transition-colors">Paragraph Rewriter</a></li>
              <li><a href="/features" onClick={(e) => handleLink(e, "features")} className="hover:text-[var(--theme-accent)] transition-colors">Grammar Checker</a></li>
            </ul>
          </div>

          {/* Col 3: GEO Entity Hub */}
          <div>
            <h4 className="font-orbitron font-extrabold uppercase text-[var(--theme-cyan)] mb-4 text-[11px] tracking-widest border-b border-black pb-1 inline-block">Entity Indexes</h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li><a href="/entity/chatgpt" onClick={(e) => handleLink(e, "entity", "chatgpt")} className="hover:text-[var(--theme-cyan)] transition-colors">ChatGPT</a></li>
              <li><a href="/entity/claude" onClick={(e) => handleLink(e, "entity", "claude")} className="hover:text-[var(--theme-cyan)] transition-colors">Claude AI</a></li>
              <li><a href="/entity/gemini" onClick={(e) => handleLink(e, "entity", "gemini")} className="hover:text-[var(--theme-cyan)] transition-colors">Google Gemini</a></li>
              <li><a href="/entity/perplexity" onClick={(e) => handleLink(e, "entity", "perplexity")} className="hover:text-[var(--theme-cyan)] transition-colors">Perplexity AI</a></li>
              <li><a href="/entity/gptzero" onClick={(e) => handleLink(e, "entity", "gptzero")} className="hover:text-[var(--theme-cyan)] transition-colors">GPTZero</a></li>
              <li><a href="/entity/copyleaks" onClick={(e) => handleLink(e, "entity", "copyleaks")} className="hover:text-[var(--theme-cyan)] transition-colors">Copyleaks</a></li>
              <li><a href="/entity/originality-ai" onClick={(e) => handleLink(e, "entity", "originality-ai")} className="hover:text-[var(--theme-cyan)] transition-colors">Originality.ai</a></li>
              <li><a href="/entity/turnitin" onClick={(e) => handleLink(e, "entity", "turnitin")} className="hover:text-[var(--theme-cyan)] transition-colors">Turnitin Scanner</a></li>
            </ul>
          </div>

          {/* Col 4: Comparison Matrix */}
          <div>
            <h4 className="font-orbitron font-extrabold uppercase text-black mb-4 text-[11px] tracking-widest border-b border-black pb-1 inline-block">Comparisons</h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li><a href="/chatgpt-vs-claude" onClick={(e) => handleLink(e, "comparison", "chatgpt-vs-claude")} className="hover:text-[var(--theme-accent)] transition-colors">ChatGPT vs Claude</a></li>
              <li><a href="/chatgpt-vs-gemini" onClick={(e) => handleLink(e, "comparison", "chatgpt-vs-gemini")} className="hover:text-[var(--theme-accent)] transition-colors">ChatGPT vs Gemini</a></li>
              <li><a href="/gptzero-vs-copyleaks" onClick={(e) => handleLink(e, "comparison", "gptzero-vs-copyleaks")} className="hover:text-[var(--theme-accent)] transition-colors">GPTZero vs Copyleaks</a></li>
              <li><a href="/copyleaks-vs-turnitin" onClick={(e) => handleLink(e, "comparison", "copyleaks-vs-turnitin")} className="hover:text-[var(--theme-accent)] transition-colors">Copyleaks vs Turnitin</a></li>
              <li><a href="/seo-vs-geo" onClick={(e) => handleLink(e, "comparison", "seo-vs-geo")} className="hover:text-[var(--theme-accent)] transition-colors">SEO vs GEO Search</a></li>
              <li><a href="/geo-vs-aeo" onClick={(e) => handleLink(e, "comparison", "geo-vs-aeo")} className="hover:text-[var(--theme-accent)] transition-colors">GEO vs AEO Strategy</a></li>
            </ul>
          </div>

          {/* Col 5: Commercial & Policies */}
          <div>
            <h4 className="font-orbitron font-extrabold uppercase text-black mb-4 text-[11px] tracking-widest border-b border-black pb-1 inline-block">Enterprise</h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              <li><a href="/pricing" onClick={(e) => handleLink(e, "pricing")} className="hover:text-gray-600 transition-colors">Pricing Options</a></li>
              <li><a href="/api" onClick={(e) => handleLink(e, "api")} className="hover:text-gray-600 transition-colors">Developer API</a></li>
              <li><a href="/integrations" onClick={(e) => handleLink(e, "integrations")} className="hover:text-gray-600 transition-colors">Integrations</a></li>
              <li><a href="/agencies" onClick={(e) => handleLink(e, "agencies")} className="hover:text-gray-600 transition-colors">Agencies Portal</a></li>
              <li><a href="/enterprise" onClick={(e) => handleLink(e, "enterprise")} className="hover:text-gray-600 transition-colors">Enterprise SLA</a></li>
              <li><a href="/education" onClick={(e) => handleLink(e, "education")} className="hover:text-gray-600 transition-colors">Academic Portal</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom EEAT compliance and system states */}
        <div className="pt-8 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-orbitron font-bold uppercase tracking-widest italic">
          <div className="flex flex-wrap justify-center gap-6 text-black">
            <a href="/about" onClick={(e) => handleLink(e, "about")} className="hover:text-[var(--theme-accent)] transition-colors">About Us</a>
            <a href="/contact" onClick={(e) => handleLinkClick || ((e: any) => handleLink(e, "contact"))} className="hover:text-[var(--theme-accent)] transition-colors">Contact Support</a>
            <a href="/privacy" onClick={(e) => handleLink(e, "privacy")} className="hover:text-[var(--theme-cyan)] transition-colors">Privacy Matrix</a>
            <a href="/terms" onClick={(e) => handleLink(e, "terms")} className="hover:text-[var(--theme-cyan)] transition-colors">Terms of Service</a>
            <a href="/cookies" onClick={(e) => handleLink(e, "cookies")} className="hover:text-[var(--theme-cyan)] transition-colors">Cookie Policy</a>
            <a href="/careers" onClick={(e) => handleLink(e, "career")} className="hover:text-gray-500 transition-colors">Careers Matrix</a>
            <a href="/sitemap.xml" target="_blank" className="hover:text-gray-500 transition-colors">Sitemap XML</a>
          </div>
          <div className="px-3 py-1 border-2 border-black bg-gray-50 text-black">
            REDAI BUILD STABLE // V4.2.6
          </div>
        </div>

      </div>
    </footer>
  );
}

function BlogEditor({ blogToEdit, onCancel, onComplete }: { blogToEdit?: any, onCancel: () => void, onComplete: () => void }) {
  const addBlog = useMutation(api.blogs.add);
  const updateBlog = useMutation(api.blogs.update);
  const [formData, setFormData] = useState({
    title: blogToEdit?.title || "",
    category: blogToEdit?.category || "Technology",
    subtitle: blogToEdit?.subtitle || "",
    author: blogToEdit?.author || "",
    dateStr: blogToEdit?.dateStr || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
    content: blogToEdit?.content || "",
    image: blogToEdit?.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (type: string, value?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const selectedText = text.substring(start, end);

    let replacement = "";
    let selectStartOffset = 0;
    let selectEndOffset = 0;

    if (selectedText) {
      // Trim leading/trailing whitespace from the selection and keep it outside the tags
      const matchLeading = selectedText.match(/^\s*/);
      const matchTrailing = selectedText.match(/\s*$/);
      const leadingWs = matchLeading ? matchLeading[0] : "";
      const trailingWs = matchTrailing ? matchTrailing[0] : "";
      const coreText = selectedText.substring(leadingWs.length, selectedText.length - trailingWs.length);

      let coreReplacement = "";

      switch (type) {
        case "bold":
          coreReplacement = `**${coreText}**`;
          break;
        case "italic":
          coreReplacement = `*${coreText}*`;
          break;
        case "underline":
          coreReplacement = `<u>${coreText}</u>`;
          break;
        case "strikethrough":
          coreReplacement = `~~${coreText}~~`;
          break;
        case "h1":
          coreReplacement = `\n# ${coreText}\n`;
          break;
        case "h2":
          coreReplacement = `\n## ${coreText}\n`;
          break;
        case "h3":
          coreReplacement = `\n### ${coreText}\n`;
          break;
        case "font-size":
          if (!value) return;
          coreReplacement = `<span style="font-size: ${value}">${coreText}</span>`;
          break;
        case "list":
          coreReplacement = `\n- ${coreText}\n`;
          break;
        case "numlist":
          coreReplacement = `\n1. ${coreText}\n`;
          break;
        case "quote":
          coreReplacement = `\n> ${coreText}\n`;
          break;
        case "link":
          coreReplacement = `[${coreText}](https://)`;
          break;
        default:
          return;
      }

      replacement = leadingWs + coreReplacement + trailingWs;

      if (type === "link") {
        // Position cursor in the URL parenthesis
        selectStartOffset = leadingWs.length + coreText.length + 3; // length of '[' + coreText + ']('
        selectEndOffset = replacement.length - trailingWs.length - 1; // exclude closing ')'
      } else if (type === "h1" || type === "h2" || type === "h3" || type === "list" || type === "numlist" || type === "quote") {
        // Exclude the leading and trailing newlines from cursor selection
        selectStartOffset = leadingWs.length + 1;
        selectEndOffset = replacement.length - trailingWs.length - 1;
      } else {
        selectStartOffset = leadingWs.length;
        selectEndOffset = replacement.length - trailingWs.length;
      }
    } else {
      // Insert placeholder text and select it
      const placeholder = {
        bold: "bold text",
        italic: "italic text",
        underline: "underlined text",
        strikethrough: "strikethrough text",
        h1: "Heading 1",
        h2: "Heading 2",
        h3: "Heading 3",
        list: "List item",
        numlist: "List item",
        quote: "Blockquote",
        link: "link text"
      }[type] || "text";

      switch (type) {
        case "bold":
          replacement = `**${placeholder}**`;
          selectStartOffset = 2;
          selectEndOffset = 2 + placeholder.length;
          break;
        case "italic":
          replacement = `*${placeholder}*`;
          selectStartOffset = 1;
          selectEndOffset = 1 + placeholder.length;
          break;
        case "underline":
          replacement = `<u>${placeholder}</u>`;
          selectStartOffset = 3;
          selectEndOffset = 3 + placeholder.length;
          break;
        case "strikethrough":
          replacement = `~~${placeholder}~~`;
          selectStartOffset = 2;
          selectEndOffset = 2 + placeholder.length;
          break;
        case "h1":
          replacement = `\n# ${placeholder}\n`;
          selectStartOffset = 3; // \n + # + space
          selectEndOffset = 3 + placeholder.length;
          break;
        case "h2":
          replacement = `\n## ${placeholder}\n`;
          selectStartOffset = 4; // \n + ## + space
          selectEndOffset = 4 + placeholder.length;
          break;
        case "h3":
          replacement = `\n### ${placeholder}\n`;
          selectStartOffset = 5; // \n + ### + space
          selectEndOffset = 5 + placeholder.length;
          break;
        case "font-size":
          if (!value) return;
          const fontPlaceholder = "large text";
          replacement = `<span style="font-size: ${value}">${fontPlaceholder}</span>`;
          selectStartOffset = 26 + value.length; // length of '<span style="font-size: ' (24) + value.length + '">' (2)
          selectEndOffset = selectStartOffset + fontPlaceholder.length;
          break;
        case "list":
          replacement = `\n- ${placeholder}\n`;
          selectStartOffset = 3; // \n + - + space
          selectEndOffset = 3 + placeholder.length;
          break;
        case "numlist":
          replacement = `\n1. ${placeholder}\n`;
          selectStartOffset = 4; // \n + 1. + space
          selectEndOffset = 4 + placeholder.length;
          break;
        case "quote":
          replacement = `\n> ${placeholder}\n`;
          selectStartOffset = 3; // \n + > + space
          selectEndOffset = 3 + placeholder.length;
          break;
        case "link":
          replacement = `[${placeholder}](https://example.com)`;
          selectStartOffset = 1;
          selectEndOffset = 1 + placeholder.length;
          break;
        default:
          return;
      }
    }

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData({ ...formData, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + selectStartOffset, start + selectEndOffset);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (blogToEdit?._id) {
        await updateBlog({ id: blogToEdit._id, ...formData });
      } else {
        await addBlog(formData);
      }
      onComplete();
    } catch (error) {
      console.error(error);
      alert("Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-4 border-black p-4 sm:p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-orbitron font-bold uppercase">{blogToEdit ? "Edit Blog" : "Create Blog"}</h2>
        <button type="button" onClick={onCancel} className="text-sm font-bold uppercase hover:text-[var(--theme-accent)]">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">Title</label>
            <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm text-white"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              style={{ color: 'white' }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">Category</label>
            <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              style={{ color: 'white' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">Author</label>
            <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm"
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              style={{ color: 'white' }} />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase mb-1">Date String</label>
            <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm"
              value={formData.dateStr}
              onChange={e => setFormData({ ...formData, dateStr: e.target.value })}
              style={{ color: 'white' }} />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase mb-1">Subtitle</label>
          <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm"
            value={formData.subtitle}
            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
            style={{ color: 'white' }} />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase mb-1">Image URL</label>
          <input required type="text" className="w-full border-2 border-black p-2 font-jakarta text-sm"
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            style={{ color: 'white' }} />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase mb-1 flex justify-between">
            <span>Blog Content</span>
            <span className="text-[var(--theme-accent)]">Format with toolbar below or Markdown syntax</span>
          </label>

          <div className="border-2 border-black flex flex-col">
            {/* Neo-Brutalist Formatting Toolbar */}
            <div className="bg-gray-50 border-b-2 border-black p-2 flex flex-wrap items-center gap-1.5 select-none">
              <button
                type="button"
                onClick={() => insertFormatting("bold")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Bold"
              >
                <Bold size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("italic")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Italic"
              >
                <Italic size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("underline")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Underline"
              >
                <Underline size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("strikethrough")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Strikethrough"
              >
                <Strikethrough size={14} />
              </button>

              <div className="w-[1px] h-4 bg-black mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("h1")}
                className="px-2 py-0.5 text-black font-orbitron font-black text-xs hover:bg-[var(--theme-cyan)] border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm cursor-pointer"
                title="Heading 1"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("h2")}
                className="px-2 py-0.5 text-black font-orbitron font-black text-xs hover:bg-[var(--theme-cyan)] border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm cursor-pointer"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("h3")}
                className="px-2 py-0.5 text-black font-orbitron font-black text-xs hover:bg-[var(--theme-cyan)] border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm cursor-pointer"
                title="Heading 3"
              >
                H3
              </button>

              <div className="w-[1px] h-4 bg-black mx-1" />

              {/* Font Size Dropdown */}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    insertFormatting("font-size", e.target.value);
                    e.target.value = ""; // Reset value so it can be re-selected
                  }
                }}
                value=""
                className="border border-black bg-white px-1.5 py-0.5 text-[10px] font-bold font-orbitron focus:outline-none hover:bg-gray-100 cursor-pointer h-[24px]"
              >
                <option value="" disabled>Size</option>
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
              </select>

              <div className="w-[1px] h-4 bg-black mx-1" />

              <button
                type="button"
                onClick={() => insertFormatting("list")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Bullet List"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("numlist")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("quote")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Quote"
              >
                <Quote size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("link")}
                className="p-1.5 text-black hover:bg-[var(--theme-cyan)] hover:text-black border border-transparent hover:border-black active:translate-y-[1px] transition-all rounded-sm flex items-center justify-center cursor-pointer"
                title="Link"
              >
                <Link size={14} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              required
              className="w-full p-3 font-jakarta text-sm min-h-[350px] focus:outline-none resize-y"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder="Start writing... Use the formatting bar above to help style your content."
              style={{ color: 'white' }}
            />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--theme-cyan)] border-2 border-black p-3 font-orbitron font-bold uppercase text-black hover:bg-black hover:text-white transition-colors mt-4 cursor-pointer">
          {isSubmitting ? "Saving..." : "Save Blog Post"}
        </button>
      </form>
    </div>
  );
}




