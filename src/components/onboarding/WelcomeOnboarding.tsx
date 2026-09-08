import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Plus, Compass, Lock, CheckCircle, Eye, GitFork, Shield, Sparkles } from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const WelcomeOnboarding: React.FC<Props> = ({ onOpenNewCase }) => {
  const { enterDemoMode, t } = useInvestigation();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-200">
      {/* Compact Hero Card */}
      <div className="metallic-card rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl relative overflow-hidden">
        {/* Subtle Gold / Blue Parallax Background Orbs */}
        <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* 3D Investigation Emblem Badge */}
        <div className="relative inline-block">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl shadow-blue-900/60 mx-auto bg-slate-950 p-1 group">
            <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/50 text-[9px] font-mono font-bold text-amber-400 shadow-md">
            <Sparkles className="w-2.5 h-2.5" /> AI READY
          </span>
        </div>

        {/* Header Titles */}
        <div className="space-y-1.5 max-w-xl mx-auto">
          <span className="text-[10px] sm:text-xs font-mono font-extrabold text-amber-400 tracking-widest uppercase block">
            DIGITAL INVESTIGATION DESK
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            HARI INVESTIGATOR <span className="text-amber-400">AI</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-300">
            Enterprise-Grade Forensic Intelligence Workspace
          </p>
        </div>

        {/* Concise Bullet Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto pt-1 text-left">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
            <Eye className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate">Evidence Ingestion & SHA-256</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
            <GitFork className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Entity & Timeline Mapping</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Zero-Fabrication Guard</span>
          </div>
        </div>

        {/* 3D Interactive Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenNewCase}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/60 tactile-btn min-h-[48px]"
          >
            <Plus className="w-4 h-4 text-amber-300" /> + CREATE CASE
          </button>

          <button
            onClick={enterDemoMode}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700/80 shadow-md tactile-btn min-h-[48px]"
          >
            <Compass className="w-4 h-4 text-amber-400" /> EXPLORE DEMO
          </button>
        </div>
      </div>
    </div>
  );
};
