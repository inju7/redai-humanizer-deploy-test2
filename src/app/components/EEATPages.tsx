import { ArrowLeft, Mail, Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

interface EEATPagesProps {
  pageId: "about" | "contact" | "privacy" | "terms" | "cookies";
  onBack: () => void;
}

export default function EEATPages({ pageId, onBack }: EEATPagesProps) {
  
  const pageTitles = {
    about: "About REDAI Humanizer",
    contact: "Contact REDAI Operations",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    cookies: "Cookie Policy"
  };

  const renderContent = () => {
    switch (pageId) {
      case "about":
        return (
          <div className="space-y-6">
            <p className="font-jakarta text-sm leading-relaxed text-gray-800">
              REDAI was founded in 2025 by a group of computational linguists and natural language processing experts. Our mission is to restore privacy and ownership to synthetic writing, giving individuals the power to express themselves clearly without automatic algorithm flags.
            </p>
            
            <h3 className="text-lg font-orbitron font-extrabold uppercase text-black">Our Core Leadership</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-black p-4 bg-gray-50 brutal-container shadow-[3px_3px_0_#000]">
                <p className="font-orbitron font-black text-xs uppercase text-[var(--theme-accent)]">Dr. Catherine Carter</p>
                <p className="text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest mb-2">Co-Founder & Chief NLP Scientist</p>
                <p className="font-jakarta text-xs text-gray-700 leading-normal">
                  Catherine holds a PhD in Computational Linguistics from MIT. Her research focuses on lexical frequency distribution and generative sentence semantics.
                </p>
              </div>
              <div className="border-2 border-black p-4 bg-gray-50 brutal-container shadow-[3px_3px_0_#000]">
                <p className="font-orbitron font-black text-xs uppercase text-[var(--theme-cyan)]">Marcus Vance</p>
                <p className="text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest mb-2">Co-Founder & Lead Systems Architect</p>
                <p className="font-jakarta text-xs text-gray-700 leading-normal">
                  Marcus spent 8 years designing infrastructure at major search companies. He runs REDAI's real-time GPU cluster matching pipeline.
                </p>
              </div>
            </div>

            <div className="h-[2px] bg-black my-4"></div>
            
            <h3 className="text-lg font-orbitron font-extrabold uppercase text-black">Company Trust Signals</h3>
            <ul className="space-y-3 font-jakarta text-xs sm:text-sm text-gray-800">
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Accuracy Guarantee:</strong> All processed output passes through 5 separate virtual scanners before final confirmation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>No Data Leak Policy:</strong> Document content is never stored on disk, never cached, and never used to train third-party LLMs.</span>
              </li>
            </ul>
          </div>
        );
      
      case "contact":
        return (
          <div className="space-y-6">
            <p className="font-jakarta text-sm leading-relaxed text-gray-800">
              Have a question about billing, custom API integration, or institutional partnerships? Reach out to our 24/7 technical team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border-2 border-black p-4 bg-white brutal-container">
                <Mail size={20} className="text-[var(--theme-accent)] mb-2" />
                <p className="font-orbitron font-black text-[10px] uppercase text-black">Email</p>
                <p className="font-jakarta text-xs font-semibold break-all text-gray-600 mt-1">support@redai-humanizer.app</p>
              </div>
              <div className="border-2 border-black p-4 bg-white brutal-container">
                <Phone size={20} className="text-[var(--theme-cyan)] mb-2" />
                <p className="font-orbitron font-black text-[10px] uppercase text-black">Phone</p>
                <p className="font-jakarta text-xs font-semibold text-gray-600 mt-1">+1 (800) 555-REDAI</p>
              </div>
              <div className="border-2 border-black p-4 bg-white brutal-container">
                <MapPin size={20} className="text-red-500 mb-2" />
                <p className="font-orbitron font-black text-[10px] uppercase text-black">Corporate HQ</p>
                <p className="font-jakarta text-xs font-semibold text-gray-600 mt-1">100 Cyber Avenue, Suite 404, San Francisco, CA</p>
              </div>
            </div>

            <div className="h-[2px] bg-black my-4"></div>

            <h3 className="text-lg font-orbitron font-extrabold uppercase text-black">Send Operations Request</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Operations Request Transmitted successfully."); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-orbitron font-extrabold uppercase text-black mb-1.5">Full Name</label>
                  <input type="text" required className="w-full bg-white border-2 border-black p-2.5 font-jakarta text-xs font-bold text-black" />
                </div>
                <div>
                  <label className="block text-[10px] font-orbitron font-extrabold uppercase text-black mb-1.5">Email Address</label>
                  <input type="email" required className="w-full bg-white border-2 border-black p-2.5 font-jakarta text-xs font-bold text-black" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-orbitron font-extrabold uppercase text-black mb-1.5">Request Details</label>
                <textarea rows={4} required className="w-full bg-white border-2 border-black p-2.5 font-jakarta text-xs font-bold text-black"></textarea>
              </div>
              <button type="submit" className="brutal-button bg-black text-white font-orbitron font-bold text-xs uppercase px-6 py-3">Transmit Request</button>
            </form>
          </div>
        );
      
      case "privacy":
        return (
          <div className="space-y-4 font-jakarta text-xs sm:text-sm leading-relaxed text-gray-800">
            <p><strong>Last Updated: June 10, 2026</strong></p>
            <p>
              REDAI is committed to protecting your privacy. This document outlines what data is processed, how it is handled, and our extreme safeguards to prevent data leakage.
            </p>
            <h3 className="text-base font-orbitron font-extrabold uppercase text-black mt-4">1. Information Processing</h3>
            <p>
              We process text payload entries in-memory to execute semantic adjustments. Your inputs are never logged, cached on disk, or analyzed for model training. Once the humanized response is compiled, the payload is erased from server RAM.
            </p>
            <h3 className="text-base font-orbitron font-extrabold uppercase text-black mt-4">2. Account Data</h3>
            <p>
              We collect user emails, login configurations, and transaction records to maintain billing accounts and balance quotas. This data is protected using SOC2-compliant hosting networks.
            </p>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-4 font-jakarta text-xs sm:text-sm leading-relaxed text-gray-800">
            <p><strong>Last Updated: June 10, 2026</strong></p>
            <p>
              Welcome to REDAI Humanizer. By accessing our tools, website, and APIs, you agree to comply with these Terms of Service.
            </p>
            <h3 className="text-base font-orbitron font-extrabold uppercase text-black mt-4">1. Use of Services</h3>
            <p>
              Users are granted a non-exclusive license to use REDAI for personal, professional, and commercial copywriting. You must not use the tool for malicious security attempts, spam network creation, or illegal actions.
            </p>
            <h3 className="text-base font-orbitron font-extrabold uppercase text-black mt-4">2. Account Usage & Credits</h3>
            <p>
              Account balances, API keys, and premium subscriptions belong strictly to the registered user and cannot be shared, sold, or distributed to other organizations.
            </p>
          </div>
        );

      case "cookies":
        return (
          <div className="space-y-4 font-jakarta text-xs sm:text-sm leading-relaxed text-gray-800">
            <p><strong>Last Updated: June 10, 2026</strong></p>
            <p>
              REDAI uses essential browser cookies to manage login sessions, account verification status, and dark/light configuration preferences.
            </p>
            <h3 className="text-base font-orbitron font-extrabold uppercase text-black mt-4">Cookie Categories We Use</h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Essential Session Cookies:</strong> Required to verify login states on database routers.</li>
              <li><strong>Analytics Cookies:</strong> Basic privacy-respecting metrics to monitor server loads (no personal tracking).</li>
              <li><strong>Preference Cookies:</strong> Remembers your tool choices and custom parameters.</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      
      {/* Back navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 font-orbitron font-extrabold text-[10px] uppercase text-gray-500 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Return to Dashboard
      </button>

      {/* Header */}
      <div className="border-b-4 border-black pb-6 space-y-2">
        <h1 className="text-3xl sm:text-5xl font-orbitron italic font-bold uppercase tracking-tighter text-black">
          {pageTitles[pageId]}
        </h1>
        <p className="font-jakarta text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
          <Heart size={12} className="text-[var(--theme-accent)]" /> RedAI Compliance & Trust Center
        </p>
      </div>

      {/* Content wrapper */}
      <div className="brutal-container bg-white border-2 border-black p-6 sm:p-10 shadow-[6px_6px_0_#000]">
        {renderContent()}
      </div>

    </div>
  );
}
