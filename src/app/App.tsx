import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Cpu, Zap, Layers, Shield, Terminal, Code2, 
  TrendingUp, Users, DollarSign, Share2, Tag, 
  ChevronRight, Link, BarChart, PenTool, LayoutTemplate, 
  Store, Network, MessageSquare, ArrowRight, Activity, Sliders, CheckCircle, Star, Plus, Minus, X, AlertTriangle
} from "lucide-react";

type TabState = "home" | "blog" | "ads" | "marketplace" | "referral" | "career";

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
  const [activeTab, setActiveTab] = useState<TabState>("home");
  const [activeTool, setActiveTool] = useState<string>("Text Humanizer");
  const [credits] = useState(5);

  return (
    <div className="relative min-h-screen pb-32 bg-[var(--theme-bg)] selection:bg-[var(--theme-accent)] selection:text-white">
      
      {/* High-Contrast Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-[4px] border-black text-white h-20">
        <div className="max-w-full mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab("home"); window.scrollTo(0, 0); }}>
              <div className="w-10 h-10 flex items-center justify-center bg-white border-2 border-white">
                <Cpu size={24} className="text-black" />
              </div>
              <span className="text-3xl font-orbitron italic font-bold tracking-tighter text-white uppercase">
                RED<span className="text-[var(--theme-accent)]">AI</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <NavButton active={activeTab === "home"} onClick={() => { setActiveTab("home"); window.scrollTo(0, 0); }}>DASHBOARD</NavButton>
              <NavButton active={activeTab === "blog"} onClick={() => { setActiveTab("blog"); window.scrollTo(0, 0); }}>BLOG</NavButton>
              <NavButton active={activeTab === "ads"} onClick={() => { setActiveTab("ads"); window.scrollTo(0, 0); }}>MARKETING DEALS</NavButton>
              <NavButton active={activeTab === "marketplace"} onClick={() => { setActiveTab("marketplace"); window.scrollTo(0, 0); }}>MARKETPLACE</NavButton>
              <NavButton active={activeTab === "referral"} onClick={() => { setActiveTab("referral"); window.scrollTo(0, 0); }}>REFERRAL</NavButton>
              <NavButton active={activeTab === "career"} onClick={() => { setActiveTab("career"); window.scrollTo(0, 0); }}>CAREER</NavButton>
              <div className="w-8"></div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black border-2 border-white">
              <Zap size={16} className="text-[var(--theme-cyan)]" />
              <span className="text-sm font-orbitron italic font-bold text-white">{credits} UNITS</span>
            </div>
            <button className="brutal-button bg-[var(--theme-accent)] hover:bg-[var(--theme-cyan)] border-white text-white hover:text-black">
              SIGN IN
            </button>
          </div>
        </div>
      </nav>

      {/* FIXED LEFT SIDEBAR (Only visible on Dashboard) */}
      {activeTab === "home" && (
        <aside className="fixed top-20 left-0 bottom-32 w-[240px] bg-white border-r-4 border-black z-40 flex flex-col shadow-[4px_0_0_#000]">
          <div className="bg-black text-white p-3 border-b-4 border-black text-center">
             <h3 className="font-orbitron font-bold italic text-sm tracking-wider">AI PROTOCOLS</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 brutal-scrollbar">
             {TOOLS_LIST.map((tool) => (
               <button
                 key={tool}
                 onClick={() => setActiveTool(tool)}
                 className={`w-full text-left px-3 py-2 font-jakarta text-[13px] font-bold uppercase transition-all border-2 ${
                   activeTool === tool 
                   ? "bg-[var(--theme-accent)] text-white border-black shadow-[2px_2px_0_#000] translate-x-1" 
                   : "bg-transparent text-black border-transparent hover:border-black hover:translate-x-1"
                 }`}
               >
                 {tool}
               </button>
             ))}
          </div>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={`relative z-10 pt-20 min-h-[80vh] ${activeTab === "home" ? "lg:pl-[240px]" : ""}`}>
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-0">
              
              {/* --- SMART WORKSPACE --- */}
              <section className="max-w-[1600px] mx-auto px-6 md:px-8 py-8">
                
                <div className="mb-6 flex justify-between items-end">
                   <div>
                      <div className="inline-block px-3 py-1 bg-black text-white font-orbitron italic text-xs mb-2">AETERNUM PROTOCOL V4.2</div>
                      <h2 className="text-4xl font-orbitron italic font-bold uppercase leading-none">Architecting The Truth</h2>
                   </div>
                </div>

                {/* Two-Pane Workspace */}
                <WorkspaceProcessor activeTool={activeTool} />

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

              {/* How it Works / Proof (Updated Text & Darker Font) */}
              <section className="bg-[var(--theme-accent)] border-b-4 border-black py-24 px-6">
                <div className="max-w-[1400px] mx-auto">
                   <div className="text-center mb-20">
                      <h2 className="text-5xl md:text-6xl text-black font-orbitron italic font-bold uppercase tracking-tighter mb-4 shadow-none">How to Detect AI With RED<span className="text-[var(--theme-cyan)]">AI</span></h2>
                      <p className="text-2xl text-black font-jakarta font-bold">Check any text for AI-generated content in three simple steps</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="brutal-container bg-white border-4 border-black p-8 relative group">
                         <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--theme-cyan)] border-4 border-black flex items-center justify-center font-orbitron font-bold text-xl">1</div>
                         <h3 className="text-2xl font-orbitron italic font-bold uppercase mb-4 mt-2">Paste or upload your text</h3>
                         <p className="font-jakarta font-bold text-black">Paste your text directly or upload a PDF, Word, or TXT file. Check up to 15,000 words in one scan.</p>
                      </div>
                      <div className="brutal-container bg-black text-white border-4 border-white p-8 relative group">
                         <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--theme-accent)] border-4 border-white flex items-center justify-center font-orbitron font-bold text-xl">2</div>
                         <h3 className="text-2xl font-orbitron italic font-bold uppercase mb-4 mt-2 text-[var(--theme-cyan)]">Run the scan</h3>
                         <p className="font-jakarta font-bold text-gray-300">Click Detect AI and get your results in seconds. REDAI checks your text against output patterns from ChatGPT, GPT-5, Claude, Gemini, DeepSeek, and more.</p>
                      </div>
                      <div className="brutal-container bg-white border-4 border-black p-8 relative group">
                         <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--theme-cyan)] border-4 border-black flex items-center justify-center font-orbitron font-bold text-xl">3</div>
                         <h3 className="text-2xl font-orbitron italic font-bold uppercase mb-4 mt-2">See the report and fix what was flagged</h3>
                         <p className="font-jakarta font-bold text-black">Review sentence-level results to see what triggered detection. Rewrite flagged parts with the AI Humanizer, then rescan to confirm everything looks right.</p>
                      </div>
                   </div>
                </div>
              </section>

              {/* Testimonials (Smaller containers, more users) */}
              <section className="bg-white border-b-4 border-black py-24 px-6">
                <div className="max-w-[1600px] mx-auto">
                   <h2 className="text-5xl md:text-7xl text-black font-orbitron italic font-bold uppercase text-center mb-20 tracking-tighter">Verified Operations</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <TestimonialCard name="Sarah J." role="College Student" text="Bypassed Turnitin instantly. Saved my academic career. 10/10 protocol." />
                      <TestimonialCard name="Mark T." role="SEO Agency" text="We use the API to mass-humanize our programmatic SEO blogs. AdSense approved." />
                      <TestimonialCard name="Elena R." role="Freelance Writer" text="Clients think I spend hours writing these articles. Matches my voice perfectly." />
                      <TestimonialCard name="David C." role="Content Manager" text="Tested 5 different tools. REDAI is the only one that actually passes Originality 3.0." />
                      <TestimonialCard name="Priya M." role="Professor" text="The detection is incredibly accurate. I use it to filter out low-effort synthetic submissions." />
                      <TestimonialCard name="James L." role="Affiliate Marketer" text="My product review sites are flourishing. The rewording tool handles bulk jobs like a dream." />
                      <TestimonialCard name="Chris W." role="Editor" text="Uncanny cadence matching. The grammar check alone saves my team hours every week." />
                      <TestimonialCard name="Anna B." role="Student" text="The essay writer provides an amazing starting point without raising any AI flags." />
                   </div>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === "blog" && <PageWrapper key="blog"><BlogTab /></PageWrapper>}
          {activeTab === "ads" && <PageWrapper key="ads"><MarketingDealsTab /></PageWrapper>}
          {activeTab === "marketplace" && <PageWrapper key="marketplace"><MarketplaceTab /></PageWrapper>}
          {activeTab === "referral" && <PageWrapper key="referral"><ReferralTab /></PageWrapper>}
          {activeTab === "career" && <PageWrapper key="career"><CareerTab /></PageWrapper>}
        </AnimatePresence>
      </main>

      <div className={activeTab === "home" ? "lg:pl-[240px]" : ""}>
        <Footer />
      </div>
      
      {/* FULL-LENGTH BOTTOM AD CONTAINER */}
      <BottomAdBar />
      
    </div>
  );
}

// --- WORKSPACE COMPONENTS ---

function WorkspaceProcessor({ activeTool }: { activeTool: string }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "processing" | "complete">("idle");
  const [activeParam, setActiveParam] = useState("Standard");

  // Force reset when tool changes
  useState(() => {
    setStatus("idle");
    setInput("");
    setOutput("");
  });

  const handleProcess = () => {
    if (!input.trim() || status !== "idle") return;
    setStatus("scanning");

    setTimeout(() => {
      setStatus("complete");
      setOutput(`[${activeTool.toUpperCase()} REPORT]\n\nAnalysis complete against ChatGPT, Claude, and Gemini models.\n\nResult:\nHuman cadence verified. The neural structures in this text successfully bypass predictive detection layers. AdSense compatibility is extremely high.`);
    }, 1500);
  };

  return (
    <div className="brutal-container bg-white border-4 border-black flex flex-col">
      
      {/* Top Parameter Nav */}
      <div className="bg-black p-3 border-b-4 border-black flex flex-wrap gap-2">
         {["Free", "Standard", "Academic", "Simple", "Flowing", "Informal", "Formal", "Expand", "Shorten", "Custom"].map(param => (
            <button 
               key={param}
               onClick={() => setActiveParam(param)}
               className={`px-4 py-2 font-orbitron font-bold text-sm uppercase transition-colors ${
                  activeParam === param ? "bg-[var(--theme-cyan)] text-black border-2 border-[var(--theme-cyan)]" : "bg-transparent text-white border-2 border-transparent hover:border-white"
               }`}
            >
               {param}
            </button>
         ))}
      </div>

      {/* Split Input / Output Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px] divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-black">
         
         {/* Left Pane: Input */}
         <div className="flex flex-col bg-gray-50 relative p-4 group">
            <div className="flex justify-between items-center mb-2">
               <span className="font-bold text-xs text-black uppercase">Paste your text here — English</span>
               <span className="font-bold text-xs bg-[var(--theme-accent)] text-white px-2 py-1">{input.split(/\s+/).filter(Boolean).length} WORDS</span>
            </div>
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)} disabled={status !== "idle" && status !== "complete"}
              placeholder="Start typing or paste your document..."
              className="flex-1 w-full bg-transparent resize-none outline-none font-jakarta text-lg leading-relaxed text-black"
            />
            
            <div className="absolute bottom-6 right-6 flex gap-4">
               {input.length === 0 && (
                  <button onClick={() => setInput("The rapid advancement of artificial intelligence has created new paradigms in digital communication. Many organizations are now exploring generative models to automate their content pipelines.")} className="bg-white border-2 border-black px-4 py-2 font-bold text-sm hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_#000] text-black">
                     Try a sample ✦
                  </button>
               )}
               <button 
                 onClick={handleProcess} disabled={status === "scanning" || status === "processing" || !input.trim()}
                 className={`brutal-button px-6 py-3 text-lg transition-all ${status === "idle" || status === "complete" ? "bg-[var(--theme-cyan)] hover:bg-[var(--theme-accent)]" : "bg-gray-300 cursor-not-allowed"}`}
               >
                 {status === "scanning" || status === "processing" ? "SCANNING..." : `EXECUTE ${activeTool.toUpperCase()}`}
               </button>
            </div>
         </div>

         {/* Right Pane: Output */}
         <div className={`flex flex-col bg-white p-4 transition-colors ${status === "complete" ? "bg-[var(--theme-cyan)]/10" : ""}`}>
            <div className="flex justify-between items-center mb-2">
               <span className="font-bold text-xs text-black uppercase">Output will appear here</span>
               {status === "complete" && <span className="font-bold text-xs bg-black text-[var(--theme-cyan)] px-2 py-1">ANALYSIS READY</span>}
            </div>
            {status === "idle" && (
               <div className="flex-1 flex items-center justify-center text-gray-400 font-bold uppercase text-center p-8">
                  Awaiting Input Stream...
               </div>
            )}
            {(status === "scanning" || status === "processing") && (
               <div className="flex-1 flex flex-col items-center justify-center text-black">
                  <Activity size={48} className="animate-pulse mb-4 text-[var(--theme-accent)]" />
                  <p className="font-orbitron font-bold italic uppercase animate-pulse">Running Neural Check...</p>
               </div>
            )}
            {status === "complete" && (
               <textarea
                 value={output}
                 readOnly
                 className="flex-1 w-full bg-transparent resize-none outline-none font-jakarta text-lg leading-relaxed text-black font-medium"
               />
            )}
         </div>

      </div>

    </div>
  );
}

// --- LANDING PAGE COMPONENTS ---

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
  return (
    <div className="brutal-container bg-white border-4 border-black p-6 relative">
       <div className="flex text-[var(--theme-accent)] mb-3">
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
       </div>
       <p className="font-jakarta text-base font-bold mb-4 leading-tight text-black">"{text}"</p>
       <div className="border-t-4 border-black pt-3 mt-auto">
          <p className="font-orbitron font-bold italic uppercase text-sm text-black">{name}</p>
          <p className="text-xs text-gray-600 font-bold uppercase">{role}</p>
       </div>
    </div>
  );
}

function BottomAdBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 bg-black border-t-4 border-white z-50 flex items-center overflow-hidden">
      <div className="w-12 h-full bg-[var(--theme-accent)] border-r-4 border-white flex flex-col items-center justify-center flex-shrink-0">
         <span className="text-white font-orbitron italic font-bold tracking-widest text-[10px] uppercase rotate-[-90deg] whitespace-nowrap">SPONSORED</span>
      </div>
      <div className="flex-1 h-full grid grid-cols-4 divide-x-4 divide-white">
         {[1, 2, 3, 4].map((slot) => (
            <div key={slot} className="relative h-full bg-gray-900 group">
               <div className="absolute inset-0 flex items-center justify-center opacity-50 font-orbitron font-bold text-white text-xs z-0 uppercase tracking-widest">
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
                 <span className="bg-black text-white text-[9px] font-bold px-1 uppercase border border-white">AD</span>
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

function NavButton({ active, children, onClick }: any) {
  return (
    <button onClick={onClick} className={`text-sm font-orbitron uppercase tracking-widest italic transition-colors ${active ? 'text-[var(--theme-cyan)] font-bold' : 'text-white hover:text-[var(--theme-cyan)]'}`}>
      {children}
    </button>
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

function BlogDetailView({ blog, onBack }: { blog: any, onBack: () => void }) {
  return (
    <div className="bg-white border-4 border-black p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 font-orbitron font-bold uppercase text-sm hover:text-[var(--theme-accent)] transition-colors">
        <ArrowRight size={20} className="rotate-180" /> Back to Blogs
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">{blog.category}</span>
          <span className="text-gray-500 font-bold uppercase text-xs">{blog.date || "MAY 16, 2026"}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-orbitron italic font-bold uppercase leading-none mb-4">{blog.title}</h1>
        <p className="text-2xl font-jakarta font-bold text-gray-700 mb-12">{blog.subtitle}</p>

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

          <div className="prose prose-xl max-w-none font-jakarta text-black">
            <h2 className="text-3xl font-orbitron italic font-bold uppercase mb-4 border-l-8 border-black pl-4">Introduction</h2>
            <p className="leading-relaxed mb-8">{blog.intro}</p>
            
            <div className="my-12 aspect-[21/9] border-4 border-black overflow-hidden shadow-[8px_8px_0_var(--theme-cyan)]">
               <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Detail Image 1" />
            </div>

            <h2 className="text-3xl font-orbitron italic font-bold uppercase mb-4 border-l-8 border-[var(--theme-accent)] pl-4">Deep Dive Discussion</h2>
            <p className="leading-relaxed mb-8">{blog.discussion}</p>

            <div className="my-12 aspect-[21/9] border-4 border-black overflow-hidden shadow-[8px_8px_0_var(--theme-accent)]">
               <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?w=1200&auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Detail Image 2" />
            </div>

            <div className="bg-gray-50 border-4 border-black p-8 mb-12">
               <h2 className="text-2xl font-orbitron italic font-bold uppercase mb-4">Summary</h2>
               <p className="italic text-gray-700">The neural structures in this text successfully bypass predictive detection layers. AI writing is a powerful tool, maintaining human authenticity is critical for SEO and academic integrity. Always verify your content with a robust detection protocol.</p>
            </div>

            <h2 className="text-3xl font-orbitron italic font-bold uppercase mb-4 border-l-8 border-[var(--theme-cyan)] pl-4">Conclusion</h2>
            <p className="leading-relaxed mb-12">{blog.conclusion}</p>
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
        <div className="mt-24 pt-12 border-t-4 border-black">
           <div className="brutal-container bg-black text-white p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-accent)] opacity-20 blur-[100px] -mr-32 -mt-32 transition-all group-hover:opacity-40 group-hover:scale-150"></div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div>
                    <span className="inline-block px-3 py-1 bg-[var(--theme-accent)] text-white text-[10px] font-bold uppercase tracking-widest mb-4">SPONSORED PROTOCOL</span>
                    <h3 className="text-4xl font-orbitron italic font-bold uppercase mb-6 leading-none">Upgrade Your Neural Network</h3>
                    <p className="font-jakarta text-gray-400 mb-8 font-bold">Secure the most advanced AI humanization layers today. REDAI Premium is now available with 50% discount for early adopters.</p>
                    <button className="brutal-button bg-white text-black border-white hover:bg-[var(--theme-cyan)] hover:text-white px-8 py-4 text-xl">
                       ENROLL NOW
                    </button>
                 </div>
                 <div className="aspect-square border-4 border-white overflow-hidden relative">
                    <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog, onClick }: { blog: any, onClick: () => void }) {
  return (
    <div onClick={onClick} className="brutal-container bg-white border-4 border-black p-4 flex flex-col hover:shadow-[8px_8px_0_#000] transition-all cursor-pointer group h-[400px]">
       <div className="aspect-video border-2 border-black mb-4 overflow-hidden shrink-0">
          <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
       </div>
       <div className="flex-1 flex flex-col">
         <div className="flex justify-between items-start mb-2">
           <span className="inline-block bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{blog.category}</span>
           <span className="text-[10px] font-bold uppercase text-gray-400">{blog.date || "MAY 16, 2026"}</span>
         </div>
         <h3 className="text-xl font-orbitron italic font-bold mb-2 uppercase leading-tight group-hover:text-[var(--theme-accent)] transition-colors text-black">{blog.title}</h3>
         <p className="font-jakarta font-bold text-xs text-gray-600 line-clamp-3 mb-4">{blog.subtitle}</p>
         
         <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between">
           <span className="text-[10px] font-orbitron font-bold uppercase italic text-black">{blog.author}</span>
           <ArrowRight size={18} className="text-black group-hover:translate-x-2 transition-transform" />
         </div>
       </div>
    </div>
  );
}

function BlogTab() {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const blogs = Array.from({ length: 12 }).map((_, i) => ({
    title: `The Future of AI Detection ${i + 1}`,
    category: i % 2 === 0 ? "SEO & Content" : "Technology",
    subtitle: "Understanding how neural networks distinguish synthetic text from human writing.",
    author: ["Jane Doe", "Alex Smith", "Sarah Connor"][i % 3],
    date: i % 2 === 0 ? "MAY 15, 2026" : "MAY 16, 2026",
    intro: "As generative models become more advanced, the line between human and machine-generated content continues to blur. In this article, we explore the foundations of AI detection and how neural structures successfully bypass predictive detection layers. AI writing is a powerful tool, maintaining human authenticity is critical for SEO and academic integrity.",
    discussion: "The core discussion revolves around predictive patterns. LLMs tend to choose highly probable next words, creating a 'bland' cadence. Human writers inject burstiness and perplexity. By analyzing these traits, tools like REDAI can accurately score text. We analyze the neural structures that define human-like writing and how our protocol validates these patterns.",
    conclusion: "In conclusion, while AI writing is a powerful tool, maintaining human authenticity is critical for SEO and academic integrity. Always verify your content with a robust detection protocol. The REDAI system remains the benchmark for neural verification in the Aeternum Protocol age.",
    image: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop`
  }));

  if (selectedBlog) {
    return <BlogDetailView blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  return (
    <TabContainer title="BLOG & SEO CONTENT" gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs.map((b, i) => <BlogCard key={i} blog={b} onClick={() => setSelectedBlog(b)} />)}
    </TabContainer>
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

function ReferralTab() {
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
      <section className="brutal-container bg-[var(--theme-cyan)] border-4 border-black p-8">
        <h2 className="text-4xl font-orbitron italic font-bold uppercase mb-6 text-black border-b-4 border-black pb-4 inline-block">How The Referral Program Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_#000] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--theme-accent)] -mr-12 -mt-12 rotate-45 group-hover:scale-150 transition-transform"></div>
            <h3 className="text-2xl font-orbitron font-bold uppercase mb-6 text-black border-b-4 border-black pb-2 flex items-center gap-3">
              <DollarSign size={24} className="text-[var(--theme-accent)]" /> The Reward
            </h3>
            <p className="font-jakarta font-bold text-black leading-relaxed text-lg mb-6">
              If you refer and the other party did install or purchase a product, you will earn a commission. 
            </p>
            <div className="bg-black text-[var(--theme-accent)] p-6 text-center border-2 border-black shadow-[4px_4px_0_var(--theme-accent)]">
               <p className="font-orbitron italic font-bold text-3xl">50.00 + 100.00</p>
               <p className="font-orbitron font-bold uppercase text-xs tracking-widest mt-1 text-white">Bonus Per Referral</p>
            </div>
          </div>
          
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_black]">
            <h3 className="text-2xl font-orbitron font-bold uppercase mb-6 text-black border-b-4 border-black pb-2 flex items-center gap-3">
              <Zap size={24} className="text-[var(--theme-cyan)]" /> The Process
            </h3>
            <ol className="font-jakarta font-bold text-black space-y-4">
              <li className="flex gap-4 items-start">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-sm">01</span>
                <span>Fill up the Referral Claim Form below.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-sm">02</span>
                <span>Indicate how many referrals you have successfully made.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-sm">03</span>
                <span>Provide proof of successful referral with purchase (Screenshots).</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 font-orbitron text-sm">04</span>
                <span>Receive your money from REDAI via your chosen brand account.</span>
              </li>
            </ol>
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
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); alert('Claim submitted! We will email you instead.'); }}>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">Full Name</label>
              <input type="text" required placeholder="Enter your full name" className="w-full border-4 border-black p-4 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white focus:ring-4 ring-[var(--theme-accent)]/20 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black">Brand Referred</label>
              <select className="w-full border-4 border-black p-4 font-jakarta font-bold outline-none bg-gray-50 focus:bg-white appearance-none cursor-pointer">
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
            <button type="submit" className="w-full bg-[var(--theme-accent)] text-white font-orbitron font-bold py-6 text-xl border-4 border-black hover:bg-black hover:border-white transition-all uppercase shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95">
              Submit Claim For Review
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

function CareerTab() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <TabContainer title="CAREERS" subtitle="Join the REDAI Protocol team." gridClass="grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
       <BrutalCard onClick={() => setSelectedRole("Senior AI Engineer")} title="Senior AI Engineer" desc="Lead the development of AETERNUM PROTOCOL V5. Remote, competitive equity." icon={<Cpu size={28} className="text-white" />} badge="ENGINEERING" />
       <BrutalCard onClick={() => setSelectedRole("Frontend Architect")} title="Frontend Architect" desc="Build high-density React/Tailwind interfaces. React, Framer Motion, Neumorphism." icon={<Code2 size={28} className="text-white" />} badge="DESIGN" />
       <BrutalCard onClick={() => setSelectedRole("Growth Hacker")} title="Growth Hacker" desc="Scale our affiliate programs and manage B2B ad partnerships." icon={<TrendingUp size={28} className="text-white" />} badge="MARKETING" />
       <BrutalCard onClick={() => setSelectedRole("Cybersecurity Analyst")} title="Cybersecurity Analyst" desc="Ensure protocol integrity and user data protection against synthetic attacks." icon={<Shield size={28} className="text-white" />} badge="SECURITY" />
       <BrutalCard onClick={() => setSelectedRole("Community Manager")} title="Community Manager" desc="Moderate our creator networks and facilitate marketplace connections." icon={<Users size={28} className="text-white" />} badge="COMMUNITY" />
       <BrutalCard onClick={() => setSelectedRole("Sales Director (B2B)")} title="Sales Director (B2B)" desc="Onboard enterprise clients, SEO agencies, and universities." icon={<DollarSign size={28} className="text-white" />} badge="SALES" />

       <AnimatePresence>
         {selectedRole && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="brutal-container bg-white border-4 border-black p-8 max-w-md w-full relative">
               <button onClick={() => setSelectedRole(null)} className="absolute top-4 right-4 text-black hover:text-[var(--theme-accent)] transition-colors">
                 <X size={24} />
               </button>
               <h3 className="text-2xl font-orbitron italic font-bold mb-4 uppercase leading-tight text-black">Apply: {selectedRole}</h3>
               
               <div className="bg-black text-white p-5 mb-6 border-2 border-black shadow-[4px_4px_0_var(--theme-accent)] relative">
                 <p className="font-jakarta text-xs font-bold leading-relaxed relative z-10 text-white">
                   However, this career is currently vacant, but the team will let you know about the movement of REDAI. For now, your information will be collected and for future reference we can reach out to you. Don't wait for the email, we will email you instead.
                 </p>
               </div>

               <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSelectedRole(null); }}>
                 <div>
                   <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Full Name</label>
                   <input type="text" required placeholder="John Doe" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)]" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email Address</label>
                   <input type="email" required placeholder="john@example.com" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)]" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">LinkedIn / Portfolio</label>
                   <input type="url" placeholder="https://linkedin.com/in/johndoe" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-black text-white focus:border-[var(--theme-accent)]" />
                 </div>
                 <button type="submit" className="w-full bg-[var(--theme-accent)] text-white font-orbitron font-bold py-4 border-2 border-black hover:bg-black hover:border-white hover:shadow-[4px_4px_0_var(--theme-cyan)] transition-all uppercase mt-4">
                   Submit Application
                 </button>
               </form>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
    </TabContainer>
  );
}

function MarketingDealsTab() {
  const [viewMode, setViewMode] = useState<"cards" | "agreement" | "form">("cards");
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

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
    }
  };

  return (
    <div className="space-y-16">
      
      {/* 1. CARDS VIEW */}
      {viewMode === "cards" && (
        <>
          <TabContainer title="MARKETING DEALS & CONSIGMENTS" gridClass="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <BrutalCard 
              badge="PARTNERSHIP" 
              title="BE PARTNERS WITH US" 
              desc="We will promote your product in our blogs, carousel, and ad spaces. Dealership commission structure available." 
              icon={<Shield size={28} className="text-white" />} 
              onClick={() => handleSelectDeal("Partnership")}
            />
            <BrutalCard 
              badge="AFFILIATE" 
              title="BE REDAI'S AFFILIATE" 
              desc="Market and earn consignment on every deal and product purchased. Receive 20% commission per sale." 
              icon={<TrendingUp size={28} className="text-white" />} 
              onClick={() => handleSelectDeal("Affiliate")}
            />
            <BrutalCard 
              badge="INFLUENCER" 
              title="SOCIAL MEDIA INFLUENCER" 
              desc="Post TikTok or Facebook content with positive reviews to earn 100.00 per platform. Get free credits, clothing, and bags. Scripts and assets provided." 
              icon={<Users size={28} className="text-white" />} 
              onClick={() => handleSelectDeal("Influencer")}
            />
            <BrutalCard 
              badge="CREATOR" 
              title="SUBMIT ART & BLOGS" 
              desc="Showcase your work (cartoons, abstract art) with our logo. Earn 5% commission on sales. We buy cartoon designs for PHP 100.00 to support local artists." 
              icon={<PenTool size={28} className="text-white" />} 
              onClick={() => handleSelectDeal("Creator")}
            />
          </TabContainer>

          {/* History Table */}
          <section className="brutal-container bg-white border-4 border-black p-8 max-w-5xl mx-auto shadow-[12px_12px_0_#000]">
             <h3 className="text-3xl font-orbitron italic font-bold uppercase mb-6 text-black border-b-4 border-black pb-2">Affiliate Earnings History</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left font-jakarta text-sm font-bold text-black border-collapse">
                   <thead>
                      <tr className="bg-black text-white border-2 border-black">
                         <th className="p-4 uppercase tracking-wider">Affiliate Name</th>
                         <th className="p-4 uppercase tracking-wider">Recent Purchase</th>
                         <th className="p-4 uppercase tracking-wider">Commission Earned</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr className="border-b-2 border-black">
                         <td className="p-4">Alex Mercer</td>
                         <td className="p-4">RedAI Premium API</td>
                         <td className="p-4 text-[var(--theme-accent)]">PHP 1,250.00</td>
                      </tr>
                      <tr className="border-b-2 border-black bg-gray-50">
                         <td className="p-4">Jane Doe</td>
                         <td className="p-4">Goofy Mood Hoodie</td>
                         <td className="p-4 text-[var(--theme-accent)]">PHP 450.00</td>
                      </tr>
                      <tr className="border-b-2 border-black">
                         <td className="p-4">Local Artist Co.</td>
                         <td className="p-4">Cartoon Design Buyout</td>
                         <td className="p-4 text-[var(--theme-accent)]">PHP 100.00</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </section>
        </>
      )}

      {/* 2. AGREEMENT VIEW */}
      {viewMode === "agreement" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brutal-container bg-white border-4 border-black p-6 md:p-8 w-full max-w-6xl mx-auto shadow-[12px_12px_0_var(--theme-accent)]">
           <button onClick={handleBack} className="mb-4 font-orbitron font-bold uppercase text-black hover:text-[var(--theme-accent)] transition-colors flex items-center gap-2 text-sm">
              &larr; Go Back
           </button>
           
           <h2 className="text-3xl md:text-4xl font-orbitron italic font-bold uppercase text-black mb-4 border-b-4 border-black pb-2">
              Protocol Rules & Conditions
           </h2>
           
           <div className="font-jakarta text-base text-gray-800 space-y-4 mb-6">
              <p>Before proceeding with your application for the <strong>{selectedDeal}</strong> program, you must read and agree to the following terms and conditions enforced by the REDAI Protocol.</p>
              
              <ul className="list-disc pl-8 space-y-2 font-bold">
                 <li>All submissions and applications are subject to a strict manual review process.</li>
                 <li>Any fraudulent claims, fake traffic sources, or bot-generated followers will result in an immediate and permanent ban from the network.</li>
                 <li>Commission payouts are processed strictly according to the schedule. No early withdrawals are permitted.</li>
                 <li>All provided marketing materials and assets remain the intellectual property of REDAI Protocol and must not be altered without permission.</li>
              </ul>
              
              <div className="bg-black text-white p-4 border-2 border-[var(--theme-accent)] mt-4">
                 <p className="font-orbitron font-bold uppercase tracking-widest text-xs text-center">Failure to comply with these rules will result in immediate termination of the agreement.</p>
              </div>
           </div>

           <form onSubmit={(e) => { e.preventDefault(); handleAgree(); }}>
               <div className="mb-6 flex flex-col md:flex-row gap-4 items-end">
                   <div className="flex-1 w-full">
                       <label className="block text-xs font-orbitron font-bold uppercase mb-2 text-black tracking-widest">Signatory Name (I agree to these terms)</label>
                       <input type="text" required placeholder="Type your full name..." className="w-full border-4 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                   </div>
                   <button type="submit" className="w-full md:w-auto px-12 bg-[var(--theme-accent)] text-white font-orbitron font-bold py-3 border-4 border-black hover:bg-black hover:border-white transition-all uppercase text-lg tracking-widest whitespace-nowrap shadow-[4px_4px_0_var(--theme-cyan)]">
                      I Agree & Proceed
                   </button>
               </div>
           </form>
        </motion.div>
      )}

      {/* 3. FORM VIEW */}
      {viewMode === "form" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="brutal-container bg-white border-4 border-black p-6 md:p-8 w-full max-w-6xl mx-auto shadow-[12px_12px_0_#000]">
           <button onClick={handleBack} className="mb-4 font-orbitron font-bold uppercase text-black hover:text-[var(--theme-accent)] transition-colors flex items-center gap-2 text-sm">
              &larr; Go Back
           </button>

           <h2 className="text-3xl font-orbitron italic font-bold uppercase text-black mb-2">
              {selectedDeal} Application
           </h2>
           <p className="font-jakarta font-bold text-[var(--theme-accent)] text-lg mb-6 border-b-4 border-black pb-2">Please fill out all required fields.</p>

           <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully. We will reach out via email shortly.'); handleBack(); handleBack(); }}>
                
                {/* PARTNERSHIP FORM */}
                {selectedDeal === "Partnership" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Brand/Company Name</label>
                      <input type="text" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Contact Email</label>
                      <input type="email" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Product Link / Website</label>
                      <input type="url" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div className="col-span-1 md:col-span-3">
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Proposed Commission Structure</label>
                      <textarea required placeholder="Outline your dealership/commission proposal..." className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)] resize-none" rows={3}></textarea>
                    </div>
                  </div>
                )}

                {/* AFFILIATE FORM */}
                {selectedDeal === "Affiliate" && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Full Name</label>
                      <input type="text" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email Address</label>
                      <input type="email" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Primary Traffic Source</label>
                      <input type="text" required placeholder="URL or Handle" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Preferred Payout</label>
                      <select required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]">
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
                      <input type="text" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email</label>
                      <input type="email" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Platform</label>
                      <select required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]">
                        <option value="tiktok">TikTok</option>
                        <option value="facebook">Facebook</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Followers</label>
                      <input type="number" required min="0" placeholder="e.g. 10000" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div className="col-span-1 md:col-span-4">
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Profile Link</label>
                      <input type="url" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
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
                      <input type="text" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Email Address</label>
                      <input type="email" required className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Portfolio / Social Link</label>
                      <input type="url" className="w-full border-2 border-black p-3 font-jakarta font-bold outline-none bg-gray-50 text-black focus:border-[var(--theme-accent)]" />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-[10px] font-orbitron font-bold uppercase mb-1 text-black tracking-widest">Upload Art File (PNG/JPG)</label>
                      <input type="file" required accept="image/png, image/jpeg" className="w-full border-2 border-black p-2 font-jakarta font-bold outline-none bg-gray-50 text-black text-sm file:bg-black file:text-white file:border-0 file:px-3 file:py-1 file:font-orbitron file:uppercase file:cursor-pointer hover:file:bg-[var(--theme-accent)] transition-all cursor-pointer" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <button type="submit" className="px-12 bg-[var(--theme-accent)] text-white font-orbitron font-bold py-3 border-4 border-black hover:bg-black hover:border-white transition-all uppercase text-lg tracking-widest shadow-[4px_4px_0_var(--theme-cyan)]">
                    Submit Application
                  </button>
                </div>

           </form>
        </motion.div>
      )}

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

  const products = [
    { id: 1, name: "REDAI Protocol Hoodie", category: "Cool Hoodies", price: 1500, priceStr: "PHP 1,500.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", desc: "Premium heavy-weight cotton hoodie featuring the exclusive Aeternum matrix print. Perfect for late-night coding sessions." },
    { id: 2, name: "The Goofy Mood Perfume", category: "Perfumes", price: 800, priceStr: "PHP 800.00", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80", desc: "A chaotic blend of citrus and synthetic musk. Smells like success and syntax errors." },
    { id: 3, name: "Aeternum Matrix T-Shirt", category: "T-Shirts", price: 600, priceStr: "PHP 600.00", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80", desc: "Breathable, high-contrast t-shirt. The official uniform of the neural network elite." },
    { id: 4, name: "Neural Verify Mug", category: "Mugs", price: 350, priceStr: "PHP 350.00", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80", desc: "Holds 16oz of pure caffeine. Engineered to keep your coffee hot during endless deploys." },
    { id: 5, name: "Goofy Mood Oversized Tee", category: "T-Shirts", price: 750, priceStr: "PHP 750.00", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", desc: "Comfortable oversized fit for ultimate relaxation. Graphic design is our passion." },
    { id: 6, name: "Syntax Error Coffee Mug", category: "Mugs", price: 300, priceStr: "PHP 300.00", image: "https://images.unsplash.com/photo-1481833759220-4183c509b5dc?w=400&q=80", desc: "For those days when nothing compiles. A classic ceramic mug with a painful message." },
    { id: 7, name: "Cyberpunk Zip-Up Hoodie", category: "Cool Hoodies", price: 1800, priceStr: "PHP 1,800.00", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", desc: "High-collar zip-up with reflective accents. Stay stealthy in the neon glow." },
    { id: 8, name: "Abstract Neural Print", category: "Art", price: 1200, priceStr: "PHP 1,200.00", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80", desc: "High-quality poster print of an AI's dream state. Perfect for brutalist office spaces." }
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
    <div className="space-y-12 relative">
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

      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl text-black font-orbitron italic mb-4">MARKETPLACE</h2>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {filters.map(f => (
          <button 
            key={f} 
            onClick={() => setActiveFilter(f)}
            className={`px-6 py-2 font-orbitron font-bold uppercase border-2 transition-all ${activeFilter === f ? 'bg-black text-white border-black shadow-[4px_4px_0_var(--theme-accent)] translate-y-[-2px]' : 'bg-white text-black border-black hover:bg-gray-100'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {filteredProducts.map((p, i) => (
          <div key={i} onClick={() => setViewingProduct(p)} className="group cursor-pointer flex flex-col">
            <div className="aspect-[4/5] bg-gray-50 mb-3 overflow-hidden relative border border-gray-200">
               <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={p.name} />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-black font-orbitron font-bold px-3 py-2 uppercase tracking-widest text-[8px] transition-opacity duration-300">Quick View</span>
               </div>
            </div>
            <div className="flex flex-col items-start">
               <h3 className="text-sm font-orbitron font-bold uppercase leading-tight text-black mb-1">{p.name}</h3>
               <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-1">{p.category}</span>
               <p className="font-jakarta font-bold text-sm text-black">{p.priceStr}</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {/* PREMIUM PRODUCT DETAIL MODAL */}
        {viewingProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-2">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full max-h-[85vh] max-w-4xl flex flex-col md:flex-row relative bg-white shadow-[6px_6px_0_rgba(0,0,0,1)] border-4 border-black overflow-hidden">
              
              {/* Close Button */}
              <button onClick={() => setViewingProduct(null)} className="absolute top-0 right-0 z-50 p-4 text-black hover:text-[var(--theme-accent)] transition-colors">
                <X size={32} strokeWidth={1} />
              </button>
              
              {/* Large Image Side */}
              <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-black min-h-[250px]">
                 <img src={viewingProduct.image} className="w-full h-full object-contain p-4" alt={viewingProduct.name} />
              </div>

              {/* Details Side */}
              <div className="w-full md:w-1/2 bg-white p-6 overflow-y-auto flex flex-col justify-center brutal-scrollbar">
                 <div className="w-full">
                    <span className="text-gray-400 font-orbitron font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">{viewingProduct.category}</span>
                    <h2 className="text-2xl lg:text-3xl font-orbitron font-bold uppercase leading-tight text-black mb-2">{viewingProduct.name}</h2>
                    <p className="font-jakarta font-bold text-xl text-[var(--theme-accent)] mb-4">{viewingProduct.priceStr}</p>
                    
                    <div className="mb-4">
                       <p className="font-jakarta text-sm text-gray-600 leading-relaxed font-light">{viewingProduct.desc}</p>
                    </div>

                    <ul className="space-y-2 mb-6 font-jakarta text-xs text-gray-500 uppercase tracking-widest border-t border-gray-200 pt-4">
                       <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Premium Quality Materials</li>
                       <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Exclusive Protocol Branding</li>
                       <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-black rounded-full"></span> Limited Batch Release</li>
                    </ul>

                    <div className="flex flex-row gap-3">
                       <button onClick={() => addToCart(viewingProduct)} className="flex-1 bg-white text-black font-orbitron font-bold py-3 border-2 border-black hover:bg-gray-50 transition-colors uppercase text-xs tracking-[0.1em] shadow-[3px_3px_0_#000]">
                         Add to Bag
                       </button>
                       <button onClick={() => buyNow(viewingProduct)} className="flex-1 bg-black text-white font-orbitron font-bold py-3 border-2 border-black hover:bg-gray-900 transition-colors uppercase text-xs tracking-[0.1em] shadow-[3px_3px_0_var(--theme-cyan)]">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-2">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full max-h-[85vh] max-w-4xl flex flex-col md:flex-row relative bg-white shadow-[6px_6px_0_rgba(0,0,0,1)] border-4 border-black overflow-hidden">
              
              <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-2 right-2 z-50 p-2 text-black hover:text-gray-500 transition-colors">
                <X size={24} strokeWidth={2} />
              </button>
              
              {/* Order Summary Side */}
              <div className="w-full md:w-5/12 bg-gray-50 p-4 overflow-y-auto border-b-4 md:border-b-0 md:border-r-4 border-black brutal-scrollbar">
                 <h3 className="text-sm font-orbitron font-bold mb-3 uppercase tracking-widest text-black border-b-4 border-black pb-1">Order Summary</h3>
                 
                 <div className="space-y-2 mb-3">
                    {checkoutItems.map((item, idx) => (
                       <div key={idx} className="flex items-center gap-2">
                          <img src={item.image} className="w-10 h-12 object-cover bg-gray-200 border border-black" alt={item.name} />
                          <div>
                             <p className="font-orbitron font-bold text-[10px] uppercase mb-1">{item.name}</p>
                             <p className="font-jakarta text-sm text-[var(--theme-accent)] font-bold">{item.priceStr}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="border-t-4 border-black pt-2 space-y-1">
                    <div className="flex justify-between items-center text-[8px] font-orbitron font-bold text-gray-600 uppercase tracking-widest">
                       <span>Subtotal</span>
                       <span>PHP {totalCheckoutPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-orbitron font-bold text-gray-600 uppercase tracking-widest">
                       <span>Shipping</span>
                       <span>Via Email</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-xs font-orbitron font-bold uppercase tracking-widest text-black">
                       <span>Total</span>
                       <span className="text-[var(--theme-accent)]">PHP {totalCheckoutPrice.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

              {/* Checkout Form Side */}
              <div className="w-full md:w-7/12 p-4 overflow-y-auto brutal-scrollbar">
                 <div className="w-full">
                   <h3 className="text-sm font-orbitron font-bold mb-3 uppercase tracking-widest text-black border-b-4 border-black pb-1">Secure Checkout</h3>

                   <div className="bg-black text-[var(--theme-cyan)] p-1.5 mb-3 border-2 border-black">
                     <p className="font-orbitron text-[8px] font-bold uppercase tracking-widest mb-0.5">
                       <AlertTriangle size={8} className="inline mr-1 -mt-1" /> Philippines Only
                     </p>
                     <p className="font-jakarta text-[8px] text-gray-300 leading-tight">
                       Orders are manually verified. Confirmation emailed.
                     </p>
                   </div>

                   <form className="space-y-2" onSubmit={(e) => { 
                     e.preventDefault(); 
                     alert('Purchase submitted! Confirmation details will be emailed to you.'); 
                     setIsCheckoutOpen(false); 
                     setCart([]); 
                   }}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                       <div>
                         <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Full Name</label>
                         <input type="text" required className="w-full border-2 border-black p-1 font-jakarta bg-gray-50 text-black focus:border-[var(--theme-accent)] outline-none transition-colors text-[10px]" />
                       </div>
                       <div>
                         <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Email</label>
                         <input type="email" required className="w-full border-2 border-black p-1 font-jakarta bg-gray-50 text-black focus:border-[var(--theme-accent)] outline-none transition-colors text-[10px]" />
                       </div>
                     </div>
                     
                     <div>
                       <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Shipping Address</label>
                       <input type="text" required placeholder="Street, City, Province, Zip" className="w-full border-2 border-black p-1 font-jakarta bg-gray-50 text-black focus:border-[var(--theme-accent)] outline-none transition-colors text-[10px]" />
                     </div>

                     {/* Payment Toggle */}
                     <div>
                        <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Payment Method</label>
                        <div className="flex gap-1.5">
                           <button type="button" onClick={() => setPaymentMethod("GCash")} className={`flex-1 py-1.5 border-2 font-orbitron font-bold text-[8px] uppercase tracking-widest transition-all ${paymentMethod === "GCash" ? "bg-black text-[var(--theme-cyan)] border-black shadow-[2px_2px_0_var(--theme-accent)]" : "bg-white text-black border-black hover:bg-gray-100"}`}>GCash</button>
                           <button type="button" onClick={() => setPaymentMethod("Bank")} className={`flex-1 py-1.5 border-2 font-orbitron font-bold text-[8px] uppercase tracking-widest transition-all ${paymentMethod === "Bank" ? "bg-black text-[var(--theme-cyan)] border-black shadow-[2px_2px_0_var(--theme-accent)]" : "bg-white text-black border-black hover:bg-gray-100"}`}>Bank Transfer</button>
                        </div>
                     </div>

                     <div className="bg-gray-100 p-2 border-2 border-dashed border-black">
                       <p className="text-[8px] font-orbitron font-bold uppercase text-black mb-0.5 tracking-widest">Transfer Details</p>
                       {paymentMethod === "GCash" ? (
                          <div className="font-jakarta text-[9px] text-gray-800 space-y-0.5">
                             <p>Number: <span className="font-bold text-black tracking-widest ml-1">0917-123-4567</span></p>
                             <p>Name: <span className="font-bold text-black ml-1">REDAI Protocol</span></p>
                          </div>
                       ) : (
                          <div className="font-jakarta text-[9px] text-gray-800 space-y-0.5">
                             <p>Bank: <span className="font-bold text-black ml-1">REDAI GLOBAL BANK</span></p>
                             <p>Name: <span className="font-bold text-black ml-1">REDAI Protocol</span></p>
                             <p>Acct: <span className="font-bold text-black tracking-widest ml-1">1234-5678-9012</span></p>
                          </div>
                       )}
                     </div>

                     <div>
                       <label className="block text-[8px] font-orbitron font-bold uppercase mb-0.5 text-black tracking-widest">Upload Receipt</label>
                       <input type="file" required className="w-full border-2 border-black p-0.5 font-jakarta text-[9px] bg-gray-50 text-black file:bg-black file:text-white file:border-0 file:px-2 file:py-0.5 file:font-orbitron file:uppercase file:text-[8px] file:tracking-widest file:cursor-pointer hover:file:bg-[var(--theme-accent)] transition-all cursor-pointer" />
                     </div>
                     
                     <button type="submit" className="w-full bg-[var(--theme-accent)] text-white font-orbitron font-bold py-2 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase mt-3 text-[10px] tracking-widest shadow-[3px_3px_0_var(--theme-cyan)]">
                       Complete Order
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

// --- SHARED COMPONENTS ---

function TabContainer({ title, subtitle, children, gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" }: { title: string, subtitle?: string, children: React.ReactNode, gridClass?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl text-black font-orbitron italic mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-black font-jakarta max-w-3xl mx-auto">{subtitle}</p>}
      </div>
      <div className={`grid gap-8 ${gridClass}`}>
        {children}
      </div>
    </motion.div>
  );
}

function BrutalCard({ title, desc, icon, badge, descClass, onClick }: { title: string, desc: string, icon: React.ReactNode, badge?: string, descClass?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="brutal-container p-8 bg-white flex flex-col justify-between group cursor-pointer hover:bg-black hover:text-white transition-colors min-h-[300px]">
      <div>
        <div className="flex justify-between items-start mb-6">
           <div className="w-14 h-14 bg-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-[var(--theme-accent)] group-hover:border-white transition-colors">
             {icon}
           </div>
           {badge && <span className="brutal-badge group-hover:border-white group-hover:text-black">{badge}</span>}
        </div>
        <h3 className="text-2xl font-orbitron italic font-bold mb-4 leading-tight uppercase group-hover:text-white">{title}</h3>
        <p className={`font-jakarta group-hover:text-white/80 ${descClass ? descClass : 'text-gray-700'}`}>{desc}</p>
      </div>
      <div className="mt-8 pt-4 border-t-2 border-black group-hover:border-white flex justify-end">
        <ArrowRight size={24} className="text-black group-hover:text-[var(--theme-accent)]" />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t-8 border-black bg-white py-20 text-black px-6 mt-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-black border-2 border-black">
                <Cpu size={24} className="text-white" />
              </div>
              <span className="text-3xl font-orbitron italic font-bold tracking-tighter text-black uppercase">
                RED<span className="text-[var(--theme-accent)]">AI</span>
              </span>
            </div>
            <p className="font-jakarta text-black text-sm font-bold leading-relaxed">
              The world's most advanced AI detection and humanization protocol. Engineered for the Aeternum age. High-performance neural verification for creators and developers.
            </p>
          </div>
          
          <div>
            <h4 className="font-orbitron font-bold uppercase text-[var(--theme-accent)] mb-6 text-sm tracking-widest border-b-2 border-black pb-2 inline-block">Protocols</h4>
            <ul className="space-y-3 font-jakarta text-sm font-bold uppercase text-black">
              <li className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">Text Humanizer</li>
              <li className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">AI Detector</li>
              <li className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">Plagiarism Matrix</li>
              <li className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">Neural Rewriter</li>
              <li className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">API Access</li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold uppercase text-[var(--theme-cyan)] mb-6 text-sm tracking-widest border-b-2 border-black pb-2 inline-block">Network</h4>
            <ul className="space-y-3 font-jakarta text-sm font-bold uppercase text-black">
              <li className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Marketplace</li>
              <li className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Affiliate Hub</li>
              <li className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Referral Link</li>
              <li className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Career Portal</li>
              <li className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Ad Partners</li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold uppercase text-black mb-6 text-sm tracking-widest border-b-2 border-black pb-2 inline-block">Connect</h4>
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center group cursor-pointer hover:bg-[var(--theme-accent)] transition-colors shadow-[4px_4px_0_#000]">
                  <Terminal size={24} className="text-white group-hover:text-black" />
               </div>
               <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center group cursor-pointer hover:bg-[var(--theme-cyan)] transition-colors shadow-[4px_4px_0_#000]">
                  <MessageSquare size={24} className="text-white group-hover:text-black" />
               </div>
               <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center group cursor-pointer hover:bg-[var(--theme-accent)] transition-colors shadow-[4px_4px_0_#000]">
                  <Layers size={24} className="text-white group-hover:text-black" />
               </div>
            </div>
            <p className="mt-8 text-[11px] font-orbitron text-black uppercase font-bold italic">© 2026 REDAI PROTOCOL. ALL RIGHTS RESERVED.</p>
          </div>
        </div>

        <div className="pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[11px] font-orbitron uppercase tracking-widest italic text-black font-bold">
            <span className="hover:text-[var(--theme-accent)] cursor-pointer transition-colors">Protocol Rules</span>
            <span className="hover:text-[var(--theme-cyan)] cursor-pointer transition-colors">Privacy Matrix</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Security Audit</span>
          </div>
          <div className="text-[11px] font-orbitron text-black uppercase font-bold italic px-4 py-1 border-2 border-black bg-gray-100">
             V4.2.0-STABLE // BUILD 05162026
          </div>
        </div>
      </div>
    </footer>
  );
}
