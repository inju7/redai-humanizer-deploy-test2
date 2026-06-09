import { comparisonsData, ComparisonItem } from "../data/comparisonsData";
import { ArrowLeft, PlusCircle, MinusCircle, CheckCircle } from "lucide-react";

interface ComparisonPageProps {
  comparisonId: string;
  onBack: () => void;
}

export default function ComparisonPage({ comparisonId, onBack }: ComparisonPageProps) {
  const comp = comparisonsData.find(c => c.id === comparisonId);

  if (!comp) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-6">
        <h2 className="text-3xl font-orbitron font-black text-red-600">COMPARISON NOT FOUND</h2>
        <p className="font-jakarta text-sm">The requested comparison slug is unregistered.</p>
        <button onClick={onBack} className="brutal-button bg-black text-white px-6 py-2">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      
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
          COMPARATIVE AUDIT REPORT
        </div>
        <h1 className="text-3xl sm:text-5xl font-orbitron italic font-bold uppercase tracking-tighter text-black">
          {comp.title}
        </h1>
        <p className="font-jakarta text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500">
          Comparing {comp.optionAName} vs {comp.optionBName}
        </p>
      </div>

      {/* Summary write-up */}
      <div className="brutal-container bg-white border-2 border-black p-6 space-y-2">
        <h2 className="font-orbitron font-black text-xs uppercase text-gray-500">Summary Synthesis</h2>
        <p className="font-jakarta text-xs sm:text-sm text-gray-800 leading-relaxed font-semibold">
          {comp.summary}
        </p>
      </div>

      {/* Side-by-side Table Matrix */}
      <div className="space-y-4">
        <h2 className="text-lg font-orbitron font-black uppercase text-black">Technical Comparison Matrix</h2>
        <div className="overflow-x-auto border-4 border-black">
          <table className="w-full text-left font-jakarta text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-black text-white font-orbitron font-black uppercase text-[10px] sm:text-xs">
                <th className="p-3 sm:p-4 border-r-2 border-white">Metric Parameter</th>
                <th className="p-3 sm:p-4 border-r-2 border-white">{comp.optionAName}</th>
                <th className="p-3 sm:p-4">{comp.optionBName}</th>
              </tr>
            </thead>
            <tbody>
              {comp.table.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-3 sm:p-4 border-r-2 border-black font-extrabold uppercase text-[10px]">{row.metric}</td>
                  <td className="p-3 sm:p-4 border-r-2 border-black font-medium">{row.valA}</td>
                  <td className="p-3 sm:p-4 font-medium">{row.valB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pros & Cons Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pros & Cons A */}
        <div className="brutal-container bg-white border-2 border-black p-6 space-y-4">
          <h3 className="font-orbitron font-black text-sm uppercase text-black border-b-2 border-black pb-2">
            Evaluating {comp.optionAName}
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-orbitron font-black text-green-600 uppercase tracking-widest">Pros</span>
              <ul className="mt-1.5 space-y-2">
                {comp.prosA.map((p, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-medium text-gray-800">
                    <PlusCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-orbitron font-black text-red-600 uppercase tracking-widest">Cons</span>
              <ul className="mt-1.5 space-y-2">
                {comp.consA.map((c, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-medium text-gray-800">
                    <MinusCircle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pros & Cons B */}
        <div className="brutal-container bg-white border-2 border-black p-6 space-y-4">
          <h3 className="font-orbitron font-black text-sm uppercase text-black border-b-2 border-black pb-2">
            Evaluating {comp.optionBName}
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-orbitron font-black text-green-600 uppercase tracking-widest">Pros</span>
              <ul className="mt-1.5 space-y-2">
                {comp.prosB.map((p, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-medium text-gray-800">
                    <PlusCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-orbitron font-black text-red-600 uppercase tracking-widest">Cons</span>
              <ul className="mt-1.5 space-y-2">
                {comp.consB.map((c, idx) => (
                  <li key={idx} className="flex gap-2 text-xs font-medium text-gray-800">
                    <MinusCircle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Comparison FAQ */}
      <div className="border-4 border-black p-6 sm:p-8 bg-black text-white space-y-6 shadow-[6px_6px_0_#000]">
        <div>
          <h3 className="text-xl sm:text-2xl font-orbitron italic font-bold uppercase">Comparison FAQ</h3>
          <p className="text-[10px] text-gray-400 font-orbitron font-bold uppercase">Synthesized answers for Generative and traditional optimization</p>
        </div>

        <div className="space-y-4">
          {comp.faq.map((f, idx) => (
            <div key={idx} className="border border-white/20 bg-neutral-900 p-4 space-y-2">
              <p className="font-orbitron font-bold text-xs uppercase tracking-wide text-[var(--theme-cyan)]">Q: {f.q}</p>
              <p className="font-jakarta text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-2">A: {f.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
