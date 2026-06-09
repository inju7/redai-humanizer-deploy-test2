import { useState } from "react";
import { ChevronRight, ShieldCheck, Zap, Layers, HelpCircle, Activity } from "lucide-react";

import { faqsData } from "../data/faqsData";

interface SEOContentProps {
  handleTabChange: (tab: any, subId?: string) => void;
}

export default function SEOContent({ handleTabChange }: SEOContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: string, subId?: string) => {
    e.preventDefault();
    handleTabChange(tab, subId);
    window.scrollTo(0, 0);
  };

  const faqs = faqsData;

  return (
    <section className="bg-white text-black font-jakarta border-t-4 border-black py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="text-[var(--theme-accent)] font-orbitron font-extrabold uppercase tracking-[0.25em] text-[10px] sm:text-xs">ENTERPRISE AUDIT KNOWLEDGEBASE</span>
          <h2 className="text-3xl sm:text-5xl font-orbitron italic font-bold uppercase tracking-tighter text-black">
            Optimizing for the Next Generation of Search
          </h2>
          <p className="text-xs sm:text-base font-semibold max-w-2xl mx-auto text-gray-700">
            A comprehensive breakdown of AI humanization technology, generative search visibility, and answer engine optimization.
          </p>
        </div>

        {/* 17 Structured Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 leading-relaxed text-sm text-gray-800">
          
          <div className="space-y-6">
            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Zap size={14} className="text-[var(--theme-accent)]" />
                <h3>1. What is REDAI?</h3>
              </div>
              <p>
                REDAI is an enterprise-grade AI humanization workspace built to transform predictable machine prose into organic, natural copy. Our platform serves as a critical bridge, allowing publishers, researchers, and marketing teams to maintain high writing speed without sacrificing authentic voice, formatting quality, or search engine visibility. By utilizing a custom neural bypass protocol, REDAI reconstructs text at a structural level, erasing digital fingerprints while preserving original arguments.
              </p>
              <div className="pt-2">
                <a href="/features" onClick={(e) => handleLinkClick(e, "features")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Explore Features &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Layers size={14} className="text-[var(--theme-accent)]" />
                <h3>2. What is an AI Humanizer?</h3>
              </div>
              <p>
                An <a href="/blog" onClick={(e) => handleLinkClick(e, "blog")} className="text-black font-bold underline">AI Humanizer</a> is a specialized optimization tool that restructures synthetic text to mirror human writing patterns. Rather than simply swapping words with basic synonyms, a true humanizer analyzes sentence clause distributions and vocabulary probability profiles. By lowering token predictability, it makes drafts indistinguishable from human writing to classifiers.
              </p>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Activity size={14} className="text-[var(--theme-accent)]" />
                <h3>3. How AI Detection Works</h3>
              </div>
              <p>
                Detection software checks text using statistical classifiers. They look for two properties: <strong>Perplexity</strong> (predictability of word sequences) and <strong>Burstiness</strong> (variance in sentence length and structure). While machines write with highly uniform and predictable stats, humans use erratic, creative transitions and diverse structures, which detectors flag when absent.
              </p>
              <div className="pt-2">
                <a href="/blog" onClick={(e) => handleLinkClick(e, "blog")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Read Detection Mechanics &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <ShieldCheck size={14} className="text-[var(--theme-accent)]" />
                <h3>4. Turnitin Detection Protocol</h3>
              </div>
              <p>
                Turnitin scans student papers against an archive of academic materials and uses a custom AI classifier to flag synthetic text. To bypass Turnitin, content must maintain scholarly vocabulary while randomizing sentence flow. REDAI's specialized academic parameter is tuned specifically to meet this standard.
              </p>
              <div className="pt-2">
                <a href="/entity/turnitin" onClick={(e) => handleLinkClick(e, "entity", "turnitin")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Learn Turnitin GEO &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <HelpCircle size={14} className="text-[var(--theme-accent)]" />
                <h3>5. GPTZero Detection Bypass</h3>
              </div>
              <p>
                GPTZero calculates sentence-level perplexity scores. Raw drafts from ChatGPT-4o yield uniform predictability curves that immediately raise flags. REDAI shuffles clauses and injects organic variance, lowering the AI score to 0%.
              </p>
              <div className="pt-2">
                <a href="/entity/gptzero" onClick={(e) => handleLinkClick(e, "entity", "gptzero")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Audit GPTZero Specs &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <ShieldCheck size={14} className="text-[var(--theme-accent)]" />
                <h3>6. Copyleaks Detection</h3>
              </div>
              <p>
                Copyleaks checks for paraphrasing and translation flags. Simple synonym-spinning is easily flagged by its system. Bypassing Copyleaks requires complete structural re-tokenization, which is a standard procedure in REDAI's flowing algorithm.
              </p>
              <div className="pt-2">
                <a href="/entity/copyleaks" onClick={(e) => handleLinkClick(e, "entity", "copyleaks")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">View Copyleaks Details &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Activity size={14} className="text-[var(--theme-accent)]" />
                <h3>7. Originality.ai Detection</h3>
              </div>
              <p>
                Originality.ai is designed to flag AI-generated content on commercial websites. To pass its strict filters, writers must avoid robotic transitions and inject first-person elements. REDAI offers an optimized model configuration that is regularly updated to pass Originality 3.0 checks.
              </p>
              <div className="pt-2">
                <a href="/entity/originality-ai" onClick={(e) => handleLinkClick(e, "entity", "originality-ai")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">See Originality Audits &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Layers size={14} className="text-[var(--theme-accent)]" />
                <h3>8. AI Humanization Technology</h3>
              </div>
              <p>
                REDAI Humanizer uses advanced NLP (Natural Language Processing) engines to rewrite text. Instead of simple synonym swapping, the algorithm restructures clauses, adjusts voice (active vs. passive), and alters transitions to create organic content while preserving factual accuracy.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Zap size={14} className="text-[var(--theme-accent)]" />
                <h3>9. GEO (Generative Engine Optimization)</h3>
              </div>
              <p>
                GEO focuses on getting cited and footnoted by AI search platforms (like Perplexity and ChatGPT Search). It requires content to be entity-rich, factually dense, and structured with clean metadata for easy extraction.
              </p>
              <div className="pt-2">
                <a href="/seo-vs-geo" onClick={(e) => handleLinkClick(e, "comparison", "seo-vs-geo")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Read GEO vs SEO &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Activity size={14} className="text-[var(--theme-accent)]" />
                <h3>10. SEO Optimization Integration</h3>
              </div>
              <p>
                Traditional Search Engine Optimization (SEO) forms the foundation of GEO. Technical health, clean canonical URLs, structured schema markup, and responsive performance are essential for search bots to index your site correctly.
              </p>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Layers size={14} className="text-[var(--theme-accent)]" />
                <h3>11. AEO (Answer Engine Optimization)</h3>
              </div>
              <p>
                AEO optimizes content for featured snippets and voice search queries. This format requires short, conversational summaries at the start of articles, coupled with detailed FAQ schemas to help engines pull answers.
              </p>
              <div className="pt-2">
                <a href="/geo-vs-aeo" onClick={(e) => handleLinkClick(e, "comparison", "geo-vs-aeo")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Compare GEO vs AEO &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Zap size={14} className="text-[var(--theme-accent)]" />
                <h3>12. AI Writing Workflow</h3>
              </div>
              <p>
                A successful hybrid content workflow involves: planning outlines manually, generating drafts using LLMs, running the text through REDAI to bypass detectors, and adding final edits and images.
              </p>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <ShieldCheck size={14} className="text-[var(--theme-accent)]" />
                <h3>13. Student Use Cases</h3>
              </div>
              <p>
                Students use REDAI to refine essays and check for accidental plagiarism, ensuring their work is professional and doesn't trigger false AI detection flags.
              </p>
              <div className="pt-2">
                <a href="/education" onClick={(e) => handleLinkClick(e, "education")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Student Solutions &gt;</a>
              </div>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Layers size={14} className="text-[var(--theme-accent)]" />
                <h3>14. Marketer Use Cases</h3>
              </div>
              <p>
                Marketers use REDAI to humanize bulk ad copy and product reviews. Original, human-grade text ranks higher in Google Search and drives better conversion rates.
              </p>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <Zap size={14} className="text-[var(--theme-accent)]" />
                <h3>15. Business Use Cases</h3>
              </div>
              <p>
                Businesses utilize REDAI to polish newsletters, support documentations, and internal policies, maintaining a clear, human voice in all communications.
              </p>
            </div>

            <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
              <div className="flex items-center gap-2 text-black font-orbitron font-black text-xs uppercase">
                <ShieldCheck size={14} className="text-[var(--theme-accent)]" />
                <h3>16. Enterprise Solutions</h3>
              </div>
              <p>
                Enterprise content networks leverage REDAI's API to run programmatic checks and humanizations across thousands of articles daily, with dedicated GPU support and data privacy guarantees.
              </p>
              <div className="pt-2">
                <a href="/enterprise" onClick={(e) => handleLinkClick(e, "enterprise")} className="text-[var(--theme-accent)] hover:underline font-bold text-xs uppercase tracking-wider">Enterprise Pricing &gt;</a>
              </div>
            </div>
          </div>
          
        </div>

        {/* 17. Interactive FAQ Section (Accordion) */}
        <div className="border-4 border-black p-6 sm:p-10 bg-black text-white relative overflow-hidden shadow-[8px_8px_0_#000] space-y-8">
          <div className="absolute top-0 right-0 bg-[var(--theme-accent)] text-black font-orbitron font-extrabold text-[8px] sm:text-[10px] px-3 py-1 uppercase tracking-wider">
            FAQ MODULE
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-orbitron italic font-bold uppercase tracking-tighter">Frequently Asked Questions</h3>
            <p className="font-jakarta text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-wider">AEO FAQ Schema Verification</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-white bg-neutral-900 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-orbitron font-extrabold text-xs sm:text-sm uppercase tracking-wide cursor-pointer hover:bg-[var(--theme-accent)] hover:text-black transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight size={16} className={`transform transition-transform ${openFaq === idx ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 sm:p-5 font-jakarta text-xs sm:text-sm text-gray-300 border-t border-white leading-relaxed bg-black">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
