import { entitiesData, EntityItem } from "../data/entitiesData";
import { ArrowLeft, Cpu, Sliders, CheckCircle } from "lucide-react";

interface EntityPageProps {
  entityId: string;
  onBack: () => void;
}

export default function EntityPage({ entityId, onBack }: EntityPageProps) {
  const entity = entitiesData.find(e => e.id === entityId);

  if (!entity) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-6">
        <h2 className="text-3xl font-orbitron font-black text-red-600">ENTITY DETECT FAIL</h2>
        <p className="font-jakarta text-sm">Requested Generative Entity is not registered in our Knowledge Graph.</p>
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

      {/* Hero Header */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <div className="inline-block px-2.5 py-0.5 bg-black text-white font-orbitron italic text-[10px] uppercase tracking-widest">
          GEO ENTITY PROFILE: {entity.name.toUpperCase()}
        </div>
        <h1 className="text-3xl sm:text-5xl font-orbitron italic font-bold uppercase tracking-tighter text-black">
          Optimizing Content for {entity.name}
        </h1>
        <p className="font-jakarta text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500">
          Generative Optimization, Schema Alignment & Detection Bypass
        </p>
      </div>

      {/* Grid: Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Description & How It Works */}
        <div className="md:col-span-2 space-y-6">
          <div className="brutal-container bg-white border-2 border-black p-6 space-y-3">
            <h2 className="text-lg font-orbitron font-black uppercase text-black flex items-center gap-2">
              <Cpu size={16} className="text-[var(--theme-accent)]" /> Entity Definition
            </h2>
            <p className="font-jakarta text-xs sm:text-sm text-gray-800 leading-relaxed">
              {entity.definition}
            </p>
          </div>

          <div className="brutal-container bg-white border-2 border-black p-6 space-y-3">
            <h2 className="text-lg font-orbitron font-black uppercase text-black flex items-center gap-2">
              <Sliders size={16} className="text-[var(--theme-cyan)]" /> Under the Hood: How it Operates
            </h2>
            <p className="font-jakarta text-xs sm:text-sm text-gray-800 leading-relaxed">
              {entity.howItWorks}
            </p>
          </div>
        </div>

        {/* Right Column: Key Use Cases */}
        <div className="brutal-container bg-[var(--theme-accent)] text-white border-2 border-black p-6 space-y-4 shadow-[4px_4px_0_#000]">
          <h2 className="text-lg font-orbitron italic font-bold uppercase text-black leading-none">
            Use Cases
          </h2>
          <div className="h-[2px] bg-black my-2"></div>
          <ul className="space-y-3">
            {entity.useCases.map((uc, idx) => (
              <li key={idx} className="flex gap-2 text-black text-xs font-bold leading-normal">
                <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Comparisons */}
      <div className="brutal-container bg-gray-50 border-2 border-black p-6 space-y-3">
        <h2 className="text-lg font-orbitron font-black uppercase text-black">
          Market Dynamics & Alternative Comparisons
        </h2>
        <p className="font-jakarta text-xs sm:text-sm text-gray-800 leading-relaxed">
          {entity.comparisons}
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="border-4 border-black p-6 bg-black text-white space-y-6 shadow-[6px_6px_0_#000]">
        <div>
          <h2 className="text-xl sm:text-2xl font-orbitron italic font-bold uppercase">Entity Questions & Answers</h2>
          <p className="text-[10px] text-gray-400 font-orbitron font-bold uppercase">Answers calibrated for LLM query retrieval</p>
        </div>

        <div className="space-y-4">
          {entity.faq.map((fq, idx) => (
            <div key={idx} className="border border-white/30 bg-neutral-900 p-4 space-y-2">
              <p className="font-orbitron font-bold text-xs uppercase tracking-wide text-[var(--theme-cyan)]">Q: {fq.q}</p>
              <p className="font-jakarta text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-2">A: {fq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
