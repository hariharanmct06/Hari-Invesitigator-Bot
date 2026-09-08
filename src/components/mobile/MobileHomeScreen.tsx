import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  Camera,
  FolderKanban,
  HardDrive,
  Bot,
  Plus,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Search,
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const MobileHomeScreen: React.FC<Props> = ({ onOpenNewCase }) => {
  const {
    currentCase,
    cases,
    evidence,
    openCamera,
    setActiveTab,
    openEmergencyModal,
    enterDemoMode,
    isDemoMode,
    t
  } = useInvestigation();

  return (
    <div className="space-y-4 pb-20 lg:hidden px-3">
      {/* 112 Nationwide Emergency Quick Assistance Banner */}
      <div className="bg-gradient-to-r from-red-950/90 via-slate-900 to-slate-950 border border-red-800/80 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30 shrink-0">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">INDIA EMERGENCY ASSISTANCE</h4>
            <p className="text-[10px] text-red-300 font-mono">Dial 112 Nationwide Response</p>
          </div>
        </div>

        <button
          onClick={openEmergencyModal}
          className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition min-h-[40px]"
        >
          {t('call112')}
        </button>
      </div>

      {/* QUICK ACTIONS GRID (44px Minimum Touch Targets) */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-wider block px-1">
          QUICK ACTIONS
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenNewCase}
            className="p-3.5 metallic-card rounded-2xl text-left flex items-center gap-3 transition tactile-btn min-h-[56px]"
          >
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Plus className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">New Case</h4>
              <p className="text-[10px] text-slate-400">Launch Case File</p>
            </div>
          </button>

          <button
            onClick={openCamera}
            className="p-3.5 metallic-card rounded-2xl text-left flex items-center gap-3 transition tactile-btn min-h-[56px]"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Camera className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Capture</h4>
              <p className="text-[10px] text-slate-400">Media / Scanner</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className="p-3.5 metallic-card rounded-2xl text-left flex items-center gap-3 transition tactile-btn min-h-[56px]"
          >
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">AI Intelligence</h4>
              <p className="text-[10px] text-slate-400">Hari AI Analyst</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className="p-3.5 metallic-card rounded-2xl text-left flex items-center gap-3 transition tactile-btn min-h-[56px]"
          >
            <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
              <HardDrive className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Evidence Vault</h4>
              <p className="text-[10px] text-slate-400">Browse Items</p>
            </div>
          </button>
        </div>
      </div>

      {/* DASHBOARD CARD 1: ACTIVE CASE DASHBOARD */}
      <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">CASE FILES</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-md">
            TOTAL: {cases.length}
          </span>
        </div>

        {currentCase ? (
          <div
            onClick={() => setActiveTab('cases')}
            className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 space-y-2 cursor-pointer active:scale-98 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-blue-400">{currentCase.caseNumber}</span>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 border border-amber-800 px-1.5 py-0.5 rounded">
                {currentCase.priority}
              </span>
            </div>
            <h4 className="text-xs font-extrabold text-white truncate">{currentCase.title}</h4>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-900">
              <span>{currentCase.incidentDate}</span>
              <span className="text-blue-400 flex items-center gap-1 font-bold">
                VIEW DESK <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-2">
            <p className="text-xs text-slate-400">No active cases in workspace.</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={onOpenNewCase}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow min-h-[38px]"
              >
                + CREATE CASE
              </button>
              {!isDemoMode && (
                <button
                  onClick={enterDemoMode}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-amber-400 rounded-xl text-xs font-bold min-h-[38px]"
                >
                  EXPLORE DEMO
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DASHBOARD CARD 2: EVIDENCE VAULT SUMMARY */}
      <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">EVIDENCE VAULT</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2 py-0.5 rounded-md">
            ITEMS: {evidence.length}
          </span>
        </div>

        {evidence.length > 0 ? (
          <div className="space-y-2">
            {evidence.slice(0, 2).map(e => (
              <div key={e.id} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-2">
                  <span className="text-[9px] font-mono text-blue-400 font-bold block">{e.evidenceId}</span>
                  <h5 className="font-bold text-slate-200 truncate">{e.title}</h5>
                </div>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-2">
            No evidence records ingested. Tap <strong className="text-amber-400">CAPTURE</strong> below to record items.
          </p>
        )}
      </div>

      {/* DASHBOARD CARD 3: AI FORENSIC STATUS */}
      <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">HARI AI INTELLIGENCE</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Grounded case-aware intelligence distinguishes observed evidence facts from inferences with zero fabrication.
        </p>

        <button
          onClick={() => setActiveTab('ai')}
          className="w-full py-2.5 bg-gradient-to-r from-blue-950 to-slate-900 border border-blue-600/50 hover:border-blue-500 rounded-xl font-extrabold text-xs text-blue-300 flex items-center justify-center gap-2 transition tactile-btn min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> LAUNCH HARI AI ANALYST
        </button>
      </div>
    </div>
  );
};
