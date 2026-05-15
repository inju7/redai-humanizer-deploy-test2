import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Sparkles, FileText, Shield, CheckCircle, Mail, Menu, X,
  Zap, Crown, ChevronRight, TrendingUp, Users, Award, ArrowRight
} from "lucide-react";

type Tab = "dashboard" | "pricing" | "about";
type Tool = "essay" | "detection" | "grammar" | "email";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [activeTool, setActiveTool] = useState<Tool>("essay");
  const [credits, setCredits] = useState(5);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [essayInput, setEssayInput] = useState("");
  const [essayOutput, setEssayOutput] = useState("");
  const [detectionInput, setDetectionInput] = useState("");
  const [detectionScore, setDetectionScore] = useState<number | null>(null);
  const [grammarInput, setGrammarInput] = useState("");
  const [grammarOutput, setGrammarOutput] = useState("");
  const [emailType, setEmailType] = useState("job-application");
  const [emailOutput, setEmailOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const useCredit = () => {
    if (credits > 0) {
      setCredits(credits - 1);
      if (credits - 1 === 0) {
        setTimeout(() => setShowUpgradeModal(true), 1000);
      }
      return true;
    } else {
      setShowUpgradeModal(true);
      return false;
    }
  };

  const handleEssayHumanize = () => {
    if (!essayInput.trim() || !useCredit()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setEssayOutput(
        essayInput
          .replace(/Moreover/g, "Also")
          .replace(/Furthermore/g, "Plus")
          .replace(/In conclusion/g, "So")
          .replace(/Therefore/g, "That's why")
          .replace(/Consequently/g, "As a result")
      );
      setIsProcessing(false);
    }, 2000);
  };

  const handleDetectionScan = () => {
    if (!detectionInput.trim() || !useCredit()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 25) + 10;
      setDetectionScore(score);
      setIsProcessing(false);
    }, 2500);
  };

  const handleGrammarCheck = () => {
    if (!grammarInput.trim() || !useCredit()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setGrammarOutput(
        grammarInput
          .replace(/\bi\b/g, "I")
          .replace(/  +/g, " ")
          .replace(/\s,/g, ",")
          .trim()
      );
      setIsProcessing(false);
    }, 1800);
  };

  const handleEmailGenerate = () => {
    if (!useCredit()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const templates: Record<string, string> = {
        "job-application":
          "Dear Hiring Manager,\n\nI am writing to express my strong interest in the position at your company. With my background and skills, I believe I would be a valuable addition to your team.\n\nI would welcome the opportunity to discuss how my experience aligns with your needs.\n\nBest regards,\n[Your Name]",
        "follow-up":
          "Hi [Name],\n\nI wanted to follow up on my previous email regarding our discussion. I'm very interested in moving forward and would love to hear your thoughts.\n\nLooking forward to your response.\n\nBest,\n[Your Name]",
        "business-proposal":
          "Dear [Name],\n\nI am reaching out to discuss a potential partnership opportunity that I believe would be mutually beneficial for both our organizations.\n\nI would appreciate the chance to present this proposal in more detail at your convenience.\n\nWarm regards,\n[Your Name]",
        "customer-support":
          "Hello,\n\nThank you for contacting us. I understand your concern and I'm here to help resolve this issue for you.\n\nCould you please provide more details so I can assist you better?\n\nBest regards,\n[Support Team]",
      };
      setEmailOutput(templates[emailType] || "");
      setIsProcessing(false);
    }, 1500);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
  ] as const;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Soft Gradient Orbs */}
      <motion.div
        className="fixed top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #EC5840 0%, transparent 70%)" }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-[-15%] left-[-10%] w-[450px] h-[450px] rounded-full opacity-25 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #61587D 0%, transparent 70%)" }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Navbar - Neumorphic */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "#F9F7F2",
          boxShadow: "8px 8px 16px #E0DCD0, -8px -8px 16px #FFFFFF",
          borderBottom: "1px solid rgba(45, 30, 47, 0.05)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab("dashboard")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-7 h-7 text-[#EC5840]" />
              </motion.div>
              <span className="text-xl font-['Bodoni_Moda'] font-bold text-[#2D1E2F]">
                Red's AI Humanizer
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-7 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id ? "text-[#F9F7F2]" : "text-[#2D1E2F]"
                  }`}
                  style={
                    activeTab === tab.id
                      ? {
                          background: "linear-gradient(135deg, #EC5840, #D84A36)",
                          boxShadow: "4px 4px 12px #E0DCD0, -2px -2px 8px #FFFFFF",
                        }
                      : {
                          background: "#F9F7F2",
                          boxShadow: "inset 3px 3px 8px #E0DCD0, inset -3px -3px 8px #FFFFFF",
                        }
                  }
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.label}
                </motion.button>
              ))}

              {/* Credits Display - Neumorphic */}
              <motion.div
                className="ml-4 px-6 py-3 rounded-full flex items-center gap-2"
                style={{
                  background: "#F9F7F2",
                  boxShadow: "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
                }}
                animate={{
                  boxShadow: [
                    "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
                    "inset 5px 5px 12px #E0DCD0, inset -5px -5px 12px #FFFFFF",
                    "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-4 h-4 text-[#EC5840]" />
                <span className="text-[#2D1E2F] font-bold">{credits}</span>
                <span className="text-[#61587D] text-sm">credits</span>
              </motion.div>

              <motion.button
                onClick={() => setShowUpgradeModal(true)}
                className="ml-2 px-7 py-3 rounded-full font-semibold flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #E5D3B3, #D4C4A3)",
                  color: "#2D1E2F",
                  boxShadow: "4px 4px 12px #E0DCD0, -2px -2px 8px #FFFFFF",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "6px 6px 16px #E0DCD0, -3px -3px 10px #FFFFFF",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Crown className="w-4 h-4" />
                Upgrade Pro
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#2D1E2F]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden px-6 py-4 space-y-3"
              style={{ background: "#F9F7F2" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-2xl ${
                    activeTab === tab.id
                      ? "bg-[#EC5840] text-[#F9F7F2]"
                      : "text-[#2D1E2F]"
                  }`}
                  style={
                    activeTab !== tab.id
                      ? { boxShadow: "inset 2px 2px 6px #E0DCD0, inset -2px -2px 6px #FFFFFF" }
                      : {}
                  }
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 relative z-10">
        {activeTab === "dashboard" && (
          <DashboardSection
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            essayInput={essayInput}
            setEssayInput={setEssayInput}
            essayOutput={essayOutput}
            handleEssayHumanize={handleEssayHumanize}
            detectionInput={detectionInput}
            setDetectionInput={setDetectionInput}
            detectionScore={detectionScore}
            handleDetectionScan={handleDetectionScan}
            grammarInput={grammarInput}
            setGrammarInput={setGrammarInput}
            grammarOutput={grammarOutput}
            handleGrammarCheck={handleGrammarCheck}
            emailType={emailType}
            setEmailType={setEmailType}
            emailOutput={emailOutput}
            handleEmailGenerate={handleEmailGenerate}
            credits={credits}
            isProcessing={isProcessing}
          />
        )}
        {activeTab === "pricing" && <PricingSection setShowUpgradeModal={setShowUpgradeModal} />}
        {activeTab === "about" && <AboutSection />}
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function DashboardSection({
  activeTool,
  setActiveTool,
  essayInput,
  setEssayInput,
  essayOutput,
  handleEssayHumanize,
  detectionInput,
  setDetectionInput,
  detectionScore,
  handleDetectionScan,
  grammarInput,
  setGrammarInput,
  grammarOutput,
  handleGrammarCheck,
  emailType,
  setEmailType,
  emailOutput,
  handleEmailGenerate,
  credits,
  isProcessing,
}: any) {
  const tools = [
    {
      id: "essay",
      icon: <FileText className="w-6 h-6" />,
      name: "Essay Humanizer",
      description: "Transform AI essays into natural writing",
      color: "#EC5840",
    },
    {
      id: "detection",
      icon: <Shield className="w-6 h-6" />,
      name: "AI Detection",
      description: "Check AI probability score",
      color: "#61587D",
    },
    {
      id: "grammar",
      icon: <CheckCircle className="w-6 h-6" />,
      name: "Grammar Check",
      description: "Fix grammar & spelling errors",
      color: "#E5D3B3",
    },
    {
      id: "email",
      icon: <Mail className="w-6 h-6" />,
      name: "Email Generator",
      description: "Create professional emails",
      color: "#2D1E2F",
    },
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block px-6 py-2 rounded-full mb-6"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 3px 3px 8px #E0DCD0, inset -3px -3px 8px #FFFFFF",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-semibold" style={{ color: "#EC5840" }}>
              ✨ Trusted by 50,000+ Creators
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-['Bodoni_Moda'] font-bold mb-6 leading-tight"
            style={{ color: "#2D1E2F" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Transform AI Into
            <br />
            <span
              className="bg-gradient-to-r from-[#EC5840] via-[#D84A36] to-[#61587D] bg-clip-text text-transparent"
            >
              Authentic Human Writing
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl opacity-70 max-w-3xl mx-auto mb-8"
            style={{ color: "#2D1E2F" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            Make your AI-generated content sound natural, bypass detectors, and maintain perfect grammar
          </motion.p>
        </motion.div>

        {/* Tool Selector Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {tools.map((tool, index) => (
            <motion.button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-6 rounded-3xl text-left transition-all ${
                activeTool === tool.id ? "ring-2" : ""
              }`}
              style={
                activeTool === tool.id
                  ? {
                      background: "#F9F7F2",
                      boxShadow: "8px 8px 20px #E0DCD0, -8px -8px 20px #FFFFFF",
                      ringColor: tool.color,
                    }
                  : {
                      background: "#F9F7F2",
                      boxShadow: "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
                    }
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{
                y: -4,
                boxShadow: "10px 10px 24px #E0DCD0, -10px -10px 24px #FFFFFF",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="inline-block p-3 rounded-2xl mb-4"
                style={{
                  background: `${tool.color}20`,
                  color: tool.color,
                }}
              >
                {tool.icon}
              </div>
              <h3 className="text-lg font-['Bodoni_Moda'] font-semibold mb-1" style={{ color: "#2D1E2F" }}>
                {tool.name}
              </h3>
              <p className="text-sm opacity-60" style={{ color: "#2D1E2F" }}>
                {tool.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Tool Interface */}
        <AnimatePresence mode="wait">
          {activeTool === "essay" && (
            <EssayTool
              key="essay"
              essayInput={essayInput}
              setEssayInput={setEssayInput}
              essayOutput={essayOutput}
              handleEssayHumanize={handleEssayHumanize}
              credits={credits}
              isProcessing={isProcessing}
            />
          )}
          {activeTool === "detection" && (
            <DetectionTool
              key="detection"
              detectionInput={detectionInput}
              setDetectionInput={setDetectionInput}
              detectionScore={detectionScore}
              handleDetectionScan={handleDetectionScan}
              credits={credits}
              isProcessing={isProcessing}
            />
          )}
          {activeTool === "grammar" && (
            <GrammarTool
              key="grammar"
              grammarInput={grammarInput}
              setGrammarInput={setGrammarInput}
              grammarOutput={grammarOutput}
              handleGrammarCheck={handleGrammarCheck}
              credits={credits}
              isProcessing={isProcessing}
            />
          )}
          {activeTool === "email" && (
            <EmailTool
              key="email"
              emailType={emailType}
              setEmailType={setEmailType}
              emailOutput={emailOutput}
              handleEmailGenerate={handleEmailGenerate}
              credits={credits}
              isProcessing={isProcessing}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function EssayTool({ essayInput, setEssayInput, essayOutput, handleEssayHumanize, credits, isProcessing }: any) {
  return (
    <motion.div
      className="p-8 rounded-[40px]"
      style={{
        background: "#F9F7F2",
        boxShadow: "12px 12px 24px #E0DCD0, -12px -12px 24px #FFFFFF",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-['Bodoni_Moda'] font-bold mb-8" style={{ color: "#2D1E2F" }}>
        AI Essay Humanizer
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
            AI-Generated Text
          </label>
          <textarea
            value={essayInput}
            onChange={(e) => setEssayInput(e.target.value)}
            placeholder="Paste your AI-generated essay here..."
            className="w-full h-80 p-6 rounded-3xl resize-none"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
              border: "none",
              color: "#2D1E2F",
            }}
          />
        </div>
        <div>
          <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
            Humanized Output
          </label>
          <div
            className="w-full h-80 p-6 rounded-3xl overflow-y-auto"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
              color: "#2D1E2F",
            }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-[#EC5840]" />
                </motion.div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{essayOutput || "Humanized text will appear here..."}</p>
            )}
          </div>
        </div>
      </div>
      <motion.button
        onClick={handleEssayHumanize}
        disabled={credits === 0 || !essayInput.trim() || isProcessing}
        className="px-10 py-4 rounded-full font-semibold flex items-center gap-3 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #EC5840, #D84A36)",
          color: "#F9F7F2",
          boxShadow: "6px 6px 16px #E0DCD0, -4px -4px 12px #FFFFFF",
        }}
        whileHover={{ scale: 1.03, boxShadow: "8px 8px 20px #E0DCD0, -6px -6px 16px #FFFFFF" }}
        whileTap={{ scale: 0.98 }}
      >
        <Zap className="w-5 h-5" />
        Humanize Text ({credits} credits)
      </motion.button>
    </motion.div>
  );
}

function DetectionTool({ detectionInput, setDetectionInput, detectionScore, handleDetectionScan, credits, isProcessing }: any) {
  return (
    <motion.div
      className="p-8 rounded-[40px]"
      style={{
        background: "#F9F7F2",
        boxShadow: "12px 12px 24px #E0DCD0, -12px -12px 24px #FFFFFF",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <h2 className="text-3xl font-['Bodoni_Moda'] font-bold mb-8" style={{ color: "#2D1E2F" }}>
        AI Detection Scanner
      </h2>
      <textarea
        value={detectionInput}
        onChange={(e) => setDetectionInput(e.target.value)}
        placeholder="Paste text to scan for AI detection..."
        className="w-full h-64 p-6 rounded-3xl resize-none mb-6"
        style={{
          background: "#F9F7F2",
          boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
          border: "none",
          color: "#2D1E2F",
        }}
      />

      {detectionScore !== null && !isProcessing && (
        <motion.div
          className="mb-6 p-8 rounded-3xl text-center"
          style={{
            background: "#F9F7F2",
            boxShadow: "8px 8px 20px #E0DCD0, -8px -8px 20px #FFFFFF",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-sm font-semibold mb-3 opacity-60" style={{ color: "#2D1E2F" }}>
            AI Detection Score
          </p>
          <motion.div
            className="text-7xl font-['Bodoni_Moda'] font-bold mb-3"
            style={{ color: detectionScore < 30 ? "#10B981" : "#EC5840" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {detectionScore}%
          </motion.div>
          <p style={{ color: "#61587D" }}>
            {detectionScore < 30 ? "✓ Likely Human-Written" : "⚠ May Appear AI-Generated"}
          </p>
        </motion.div>
      )}

      {isProcessing && (
        <div className="mb-6 p-8 rounded-3xl flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-10 h-10 text-[#61587D]" />
          </motion.div>
        </div>
      )}

      <motion.button
        onClick={handleDetectionScan}
        disabled={credits === 0 || !detectionInput.trim() || isProcessing}
        className="px-10 py-4 rounded-full font-semibold flex items-center gap-3 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #61587D, #4F4868)",
          color: "#F9F7F2",
          boxShadow: "6px 6px 16px #E0DCD0, -4px -4px 12px #FFFFFF",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Shield className="w-5 h-5" />
        Scan for AI ({credits} credits)
      </motion.button>
    </motion.div>
  );
}

function GrammarTool({ grammarInput, setGrammarInput, grammarOutput, handleGrammarCheck, credits, isProcessing }: any) {
  return (
    <motion.div
      className="p-8 rounded-[40px]"
      style={{
        background: "#F9F7F2",
        boxShadow: "12px 12px 24px #E0DCD0, -12px -12px 24px #FFFFFF",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <h2 className="text-3xl font-['Bodoni_Moda'] font-bold mb-8" style={{ color: "#2D1E2F" }}>
        Grammar & Spelling Assistant
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
            Original Text
          </label>
          <textarea
            value={grammarInput}
            onChange={(e) => setGrammarInput(e.target.value)}
            placeholder="Paste your text here to check grammar..."
            className="w-full h-80 p-6 rounded-3xl resize-none"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
              border: "none",
              color: "#2D1E2F",
            }}
          />
        </div>
        <div>
          <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
            Corrected Text
          </label>
          <div
            className="w-full h-80 p-6 rounded-3xl overflow-y-auto"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
              color: "#2D1E2F",
            }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle className="w-8 h-8 text-[#E5D3B3]" />
                </motion.div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{grammarOutput || "Corrected text will appear here..."}</p>
            )}
          </div>
        </div>
      </div>
      <motion.button
        onClick={handleGrammarCheck}
        disabled={credits === 0 || !grammarInput.trim() || isProcessing}
        className="px-10 py-4 rounded-full font-semibold flex items-center gap-3 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #E5D3B3, #D4C4A3)",
          color: "#2D1E2F",
          boxShadow: "6px 6px 16px #E0DCD0, -4px -4px 12px #FFFFFF",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <CheckCircle className="w-5 h-5" />
        Check Grammar ({credits} credits)
      </motion.button>
    </motion.div>
  );
}

function EmailTool({ emailType, setEmailType, emailOutput, handleEmailGenerate, credits, isProcessing }: any) {
  return (
    <motion.div
      className="p-8 rounded-[40px]"
      style={{
        background: "#F9F7F2",
        boxShadow: "12px 12px 24px #E0DCD0, -12px -12px 24px #FFFFFF",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <h2 className="text-3xl font-['Bodoni_Moda'] font-bold mb-8" style={{ color: "#2D1E2F" }}>
        Email Generator & Script Builder
      </h2>
      <div className="mb-6">
        <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
          Email Type
        </label>
        <select
          value={emailType}
          onChange={(e) => setEmailType(e.target.value)}
          className="w-full p-4 rounded-3xl"
          style={{
            background: "#F9F7F2",
            boxShadow: "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
            border: "none",
            color: "#2D1E2F",
          }}
        >
          <option value="job-application">Job Application</option>
          <option value="follow-up">Follow-up Email</option>
          <option value="business-proposal">Business Proposal</option>
          <option value="customer-support">Customer Support</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-3 font-semibold" style={{ color: "#2D1E2F" }}>
          Generated Email
        </label>
        <div
          className="w-full h-80 p-6 rounded-3xl overflow-y-auto"
          style={{
            background: "#F9F7F2",
            boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
            color: "#2D1E2F",
          }}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Mail className="w-8 h-8 text-[#2D1E2F]" />
              </motion.div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{emailOutput || "Click generate to create your email..."}</p>
          )}
        </div>
      </div>
      <motion.button
        onClick={handleEmailGenerate}
        disabled={credits === 0 || isProcessing}
        className="px-10 py-4 rounded-full font-semibold flex items-center gap-3 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #2D1E2F, #1F1520)",
          color: "#F9F7F2",
          boxShadow: "6px 6px 16px #E0DCD0, -4px -4px 12px #FFFFFF",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Mail className="w-5 h-5" />
        Generate Email ({credits} credits)
      </motion.button>
    </motion.div>
  );
}

function PricingSection({ setShowUpgradeModal }: { setShowUpgradeModal: (show: boolean) => void }) {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      credits: "5 credits",
      features: ["5 free credits", "All 4 tools", "Basic support", "Community access"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      credits: "500 credits/month",
      features: [
        "500 credits monthly",
        "All premium tools",
        "Priority support",
        "No watermarks",
        "API access",
        "Advanced features",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Unlimited",
      price: "$49",
      period: "per month",
      credits: "Unlimited",
      features: [
        "Unlimited credits",
        "All features unlocked",
        "24/7 support",
        "White-label option",
        "Custom integrations",
        "Team collaboration",
      ],
      cta: "Go Unlimited",
      popular: false,
    },
  ];

  return (
    <section className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-['Bodoni_Moda'] font-bold mb-4" style={{ color: "#2D1E2F" }}>
            Simple Pricing
          </h1>
          <p className="text-xl opacity-70" style={{ color: "#2D1E2F" }}>
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-[40px] relative ${plan.popular ? "ring-4 ring-[#EC5840]" : ""}`}
              style={{
                background: "#F9F7F2",
                boxShadow: plan.popular
                  ? "12px 12px 28px #E0DCD0, -12px -12px 28px #FFFFFF"
                  : "8px 8px 20px #E0DCD0, -8px -8px 20px #FFFFFF",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "14px 14px 32px #E0DCD0, -14px -14px 32px #FFFFFF" }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #EC5840, #D84A36)",
                    color: "#F9F7F2",
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-['Bodoni_Moda'] font-semibold mb-2" style={{ color: "#2D1E2F" }}>
                {plan.name}
              </h3>
              <div className="mb-2">
                <span className="text-sm font-semibold" style={{ color: "#EC5840" }}>
                  {plan.credits}
                </span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold" style={{ color: "#2D1E2F" }}>
                  {plan.price}
                </span>
                <span className="opacity-60 ml-2" style={{ color: "#2D1E2F" }}>
                  /{plan.period}
                </span>
              </div>
              <motion.button
                onClick={() => setShowUpgradeModal(true)}
                className={`w-full py-4 rounded-full font-semibold mb-8 ${
                  plan.popular ? "text-[#F9F7F2]" : "text-[#2D1E2F]"
                }`}
                style={
                  plan.popular
                    ? {
                        background: "linear-gradient(135deg, #EC5840, #D84A36)",
                        boxShadow: "4px 4px 12px #E0DCD0, -2px -2px 8px #FFFFFF",
                      }
                    : {
                        background: "#F9F7F2",
                        boxShadow: "inset 3px 3px 8px #E0DCD0, inset -3px -3px 8px #FFFFFF",
                      }
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.button>
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#EC5840" }} />
                    <span style={{ color: "#2D1E2F" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-['Bodoni_Moda'] font-bold mb-6" style={{ color: "#2D1E2F" }}>
            About Red's AI Humanizer
          </h1>
          <p className="text-2xl opacity-70 leading-relaxed" style={{ color: "#2D1E2F" }}>
            Transform AI content into authentic human writing
          </p>
        </motion.div>

        <motion.div
          className="p-12 rounded-[40px] mb-12"
          style={{
            background: "#F9F7F2",
            boxShadow: "12px 12px 24px #E0DCD0, -12px -12px 24px #FFFFFF",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-['Bodoni_Moda'] font-bold mb-6" style={{ color: "#2D1E2F" }}>
            Our Story
          </h2>
          <div className="space-y-4 text-lg opacity-80 leading-relaxed" style={{ color: "#2D1E2F" }}>
            <p>
              Red's AI Humanizer was created to solve a critical problem: making AI-generated content sound genuinely
              human while maintaining quality and meaning.
            </p>
            <p>
              We built 4 powerful tools that work together to transform robotic AI text into natural, engaging content
              that resonates with real people and bypasses AI detectors.
            </p>
            <p>
              Trusted by over 50,000 creators, students, marketers, and professionals who need their AI content to
              sound authentic and pass as human-written.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Active Users", value: "50K+", icon: <Users className="w-8 h-8" /> },
            { label: "Success Rate", value: "98%", icon: <TrendingUp className="w-8 h-8" /> },
            { label: "Premium Tools", value: "4", icon: <Award className="w-8 h-8" /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-8 rounded-[40px] text-center"
              style={{
                background: "#F9F7F2",
                boxShadow: "8px 8px 20px #E0DCD0, -8px -8px 20px #FFFFFF",
              }}
            >
              <div className="inline-block mb-4" style={{ color: "#EC5840" }}>
                {stat.icon}
              </div>
              <div className="text-4xl font-['Bodoni_Moda'] font-bold mb-2" style={{ color: "#EC5840" }}>
                {stat.value}
              </div>
              <div className="opacity-70" style={{ color: "#2D1E2F" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: "rgba(45, 30, 47, 0.8)",
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="max-w-2xl w-full p-12 rounded-[40px] relative"
        style={{
          background: "#F9F7F2",
          boxShadow: "16px 16px 32px #E0DCD0, -16px -16px 32px #FFFFFF",
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 transition-colors"
          style={{ color: "#2D1E2F" }}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <motion.div
            className="inline-block p-8 rounded-full mb-6"
            style={{
              background: "#F9F7F2",
              boxShadow: "8px 8px 20px #E0DCD0, -8px -8px 20px #FFFFFF",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-16 h-16 text-[#E5D3B3]" />
          </motion.div>
          <h2 className="text-4xl font-['Bodoni_Moda'] font-bold mb-4" style={{ color: "#2D1E2F" }}>
            Unlock Premium Power
          </h2>
          <p className="text-lg opacity-70" style={{ color: "#2D1E2F" }}>
            You've used all your free credits! Upgrade to continue humanizing AI content.
          </p>
        </div>

        <div
          className="p-8 rounded-3xl mb-8"
          style={{
            background: "#F9F7F2",
            boxShadow: "inset 6px 6px 12px #E0DCD0, inset -6px -6px 12px #FFFFFF",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-['Bodoni_Moda'] font-bold mb-1" style={{ color: "#2D1E2F" }}>
                Pro Plan
              </h3>
              <p style={{ color: "#EC5840" }}>500 credits/month</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold" style={{ color: "#2D1E2F" }}>
                $19
              </div>
              <div className="opacity-60" style={{ color: "#2D1E2F" }}>
                /month
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {["500 credits per month", "All 4 premium tools", "Priority support", "No watermarks", "API access"].map(
              (feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: "#EC5840" }} />
                  <span style={{ color: "#2D1E2F" }}>{feature}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            className="flex-1 py-4 rounded-full font-semibold"
            style={{
              background: "linear-gradient(135deg, #EC5840, #D84A36)",
              color: "#F9F7F2",
              boxShadow: "6px 6px 16px #E0DCD0, -4px -4px 12px #FFFFFF",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Upgrade to Pro
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-10 py-4 rounded-full font-semibold"
            style={{
              background: "#F9F7F2",
              boxShadow: "inset 4px 4px 10px #E0DCD0, inset -4px -4px 10px #FFFFFF",
              color: "#2D1E2F",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Maybe Later
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 relative z-10">
      <div className="h-[1px] max-w-6xl mx-auto mb-12" style={{ background: "rgba(45, 30, 47, 0.1)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: "#EC5840" }} />
              <span className="text-xl font-['Bodoni_Moda'] font-bold" style={{ color: "#2D1E2F" }}>
                Red's AI Humanizer
              </span>
            </div>
            <p className="opacity-60 leading-relaxed" style={{ color: "#2D1E2F" }}>
              Transform AI content into authentic human writing
            </p>
          </div>
          <div>
            <h4 className="font-['Bodoni_Moda'] font-semibold mb-4" style={{ color: "#2D1E2F" }}>
              Product
            </h4>
            <ul className="space-y-2 opacity-60" style={{ color: "#2D1E2F" }}>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Tools
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-['Bodoni_Moda'] font-semibold mb-4" style={{ color: "#2D1E2F" }}>
              Resources
            </h4>
            <ul className="space-y-2 opacity-60" style={{ color: "#2D1E2F" }}>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-['Bodoni_Moda'] font-semibold mb-4" style={{ color: "#2D1E2F" }}>
              Company
            </h4>
            <ul className="space-y-2 opacity-60" style={{ color: "#2D1E2F" }}>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center opacity-60" style={{ color: "#2D1E2F" }}>
          <p>© 2026 Red's AI Humanizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
