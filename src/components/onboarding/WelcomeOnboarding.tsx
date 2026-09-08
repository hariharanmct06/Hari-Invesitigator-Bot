import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Shield, Plus, Compass, Lock, CheckCircle, Eye, GitFork } from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const WelcomeOnboarding: React.FC<Props> = ({ onOpenNewCase }) => {
  const { enterDemoMode, t } = useInvestigation();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Welcome Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl overflow-hidden border border-blue-500/40 shadow-2xl shadow-blue-900/60 mx-auto bg-slate-950 p-1">
          <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover rounded-2xl" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            DIGITAL INVESTIGATION DESK
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            WELCOME TO HARI INVESTIGATOR AI
          </h1>
          <p className="text-sm font-semibold text-blue-300">
            Your investigation workspace starts here.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create a case, document evidence, organize information, connect entities and use AI-assisted analysis while keeping human investigators in control.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenNewCase}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-900/50 transition active:scale-95"
          >
            <Plus className="w-5 h-5" /> CREATE YOUR FIRST CASE
          </button>

          <button
            onClick={enterDemoMode}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <Compass className="w-4 h-4 text-blue-400" /> EXPLORE DEMO
          </button>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <Eye className="w-5 h-5 text-blue-400" />
          <h4 className="text-xs font-bold text-white uppercase">1. OBSERVE & INGEST</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Record evidence photos, document scans, and dispatch audio with cryptographic SHA-256 hashes.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <GitFork className="w-5 h-5 text-purple-400" />
          <h4 className="text-xs font-bold text-white uppercase">2. CONNECT ENTITIES</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Map relationships across persons, vehicles, events, and statements on a neutral connection graph.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold text-white uppercase">3. VERIFY & REPORT</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI infers patterns, but human investigators retain final verification authority before exporting dossiers.
          </p>
        </div>
      </div>
    </div>
  );
};
