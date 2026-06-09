import { commercialData } from "../data/commercialData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

interface CommercialPageProps {
  pageId: string;
  onBack: () => void;
  onCtaClick?: () => void;
}

export default function CommercialPage({ pageId, onBack, onCtaClick }: CommercialPageProps) {
  const page = commercialData[pageId];

  if (!page) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-6">
        <h2 className="text-3xl font-orbitron font-black text-red-600">PAGE DATA NOT FOUND</h2>
        <p className="font-jakarta text-sm">The requested commercial page is not configured.</p>
        <button onClick={onBack} className="brutal-button bg-black text-white px-6 py-2">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-orbitron font-extrabold text-[10px] uppercase text-gray-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Return to Dashboard
      </button>

      {/* Title block */}
      <div className="border-b-4 border-black pb-6 space-y-3 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-block px-2.5 py-0.5 bg-black text-white font-orbitron italic text-[10px] uppercase tracking-widest">
            COMMERCIAL SECURE SYSTEM
          </div>
          <h1 className="text-3xl sm:text-5xl font-orbitron italic font-bold uppercase tracking-tighter text-black">
            {page.title}
          </h1>
          <p className="font-jakarta text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500">
            {page.subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={onCtaClick || onBack}
            className="brutal-button w-full md:w-auto bg-[var(--theme-accent)] hover:bg-black text-white hover:text-white font-orbitron font-black text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0.5 active:translate-y-0.5 transition-all select-none border-2 border-black"
          >
            {page.ctaText}
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="brutal-container bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0_#000]">
        
        {/* Render markdown dynamically */}
        <div className="prose prose-lg max-w-none font-jakarta text-black w-full overflow-hidden break-words blog-markdown">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {page.contentMarkdown}
          </ReactMarkdown>
        </div>

      </div>

      {/* Trust Signals Footer Block */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-black pt-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-[var(--theme-cyan)] flex items-center justify-center border border-black shadow-[1px_1px_0_var(--theme-accent)]">
            <Check size={14} />
          </div>
          <span className="font-orbitron font-extrabold text-[10px] uppercase text-black">99.8% Bypass Guarantee</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-[var(--theme-cyan)] flex items-center justify-center border border-black shadow-[1px_1px_0_var(--theme-accent)]">
            <Sparkles size={14} className="animate-pulse" />
          </div>
          <span className="font-orbitron font-extrabold text-[10px] uppercase text-black">SOC2 Data Compliance</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black text-[var(--theme-cyan)] flex items-center justify-center border border-black shadow-[1px_1px_0_var(--theme-accent)]">
            <Check size={14} />
          </div>
          <span className="font-orbitron font-extrabold text-[10px] uppercase text-black">Real-time Scanner Sync</span>
        </div>
      </div>

    </div>
  );
}
