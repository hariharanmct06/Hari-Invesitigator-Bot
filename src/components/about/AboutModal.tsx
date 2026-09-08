import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Shield, Eye, Layers, GitFork, Bot, CheckCircle, X } from 'lucide-react';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useInvestigation();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-blue-500/40 shadow-xl shadow-blue-900/50 bg-slate-950 p-0.5 shrink-0">
            <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">HARI INVESTIGATOR AI</h2>
            <p className="text-xs font-semibold text-blue-400">AI-assisted investigation intelligence.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          HARI INVESTIGATOR AI is a professional enterprise-grade evidence-intelligence operating system engineered for forensic teams, investigators, and compliance officers to record, connect, and analyze evidence with absolute precision.
        </p>

        {/* 5 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <Eye className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">1. OBSERVE</h4>
              <p className="text-[11px] text-slate-400">Capture pristine evidence photos, scanner documents, & audio.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <Layers className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">2. ORGANIZE</h4>
              <p className="text-[11px] text-slate-400">Maintain SHA-256 cryptographic hashes & immutable provenance.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <GitFork className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">3. CONNECT</h4>
              <p className="text-[11px] text-slate-400">Map relationships across persons, vehicles, events & places.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <Bot className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">4. ANALYZE</h4>
              <p className="text-[11px] text-slate-400">Extract OCR, object details & statement discrepancies.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 sm:col-span-2">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">5. VERIFY</h4>
              <p className="text-[11px] text-slate-400">Human verification hierarchy. AI inference is never truth.</p>
            </div>
          </div>
        </div>

        {/* Mandatory Footer */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-xs font-mono font-semibold text-slate-400">
            Created by Hari Bot & Business Solutions
          </p>
        </div>
      </div>
    </div>
  );
};
