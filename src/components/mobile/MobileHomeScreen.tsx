import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  Camera,
  FileText,
  Upload,
  Mic,
  FolderKanban,
  HardDrive,
  Bot,
  MapPin,
  Clock,
  PhoneCall,
  Sparkles,
  Plus
} from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const MobileHomeScreen: React.FC<Props> = ({ onOpenNewCase }) => {
  const {
    currentCase,
    evidence,
    openCamera,
    setActiveTab,
    openEmergencyModal,
    t
  } = useInvestigation();

  return (
    <div className="space-y-5 pb-16 lg:hidden">
      {/* India 112 Emergency Quick Assistance Bar */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-900/60 rounded-2xl p-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">INDIA EMERGENCY ASSISTANCE</h4>
            <p className="text-[10px] text-red-300 font-mono">Dial 112 Nationwide Response</p>
          </div>
        </div>

        <button
          onClick={openEmergencyModal}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-md shadow-red-900/40"
        >
          {t('call112')}
        </button>
      </div>

      {/* Quick Action Grid */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
          QUICK ACTIONS
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={openCamera}
            className="p-4 bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-600/50 hover:border-blue-500 rounded-2xl text-left flex flex-col justify-between h-28 shadow-xl group active:scale-95 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white group-hover:text-blue-300">{t('captureEvidence')}</h4>
              <p className="text-[10px] text-blue-300 font-mono">Instant Camera</p>
            </div>
          </button>

          <button
            onClick={openCamera}
            className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left flex flex-col justify-between h-28 shadow-xl group active:scale-95 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">{t('scanDocument')}</h4>
              <p className="text-[10px] text-slate-400 font-mono">OCR Edge Detection</p>
            </div>
          </button>

          <button
            onClick={openCamera}
            className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left flex flex-col justify-between h-28 shadow-xl group active:scale-95 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">{t('uploadEvidence')}</h4>
              <p className="text-[10px] text-slate-400 font-mono">Gallery Import</p>
            </div>
          </button>

          <button
            onClick={openCamera}
            className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left flex flex-col justify-between h-28 shadow-xl group active:scale-95 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">{t('recordAudio')}</h4>
              <p className="text-[10px] text-slate-400 font-mono">Dispatch Audio</p>
            </div>
          </button>
        </div>
      </div>

      {/* Active Case Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            ACTIVE CASE
          </span>
          <button onClick={() => setActiveTab('cases')} className="text-xs font-semibold text-blue-400">
            View All
          </button>
        </div>

        {currentCase ? (
          <div
            onClick={() => setActiveTab('evidence')}
            className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 space-y-3 cursor-pointer transition shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2.5 py-0.5 rounded-md">
                {currentCase.caseNumber}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800">
                {currentCase.priority}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">{currentCase.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {currentCase.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate max-w-[140px]">{currentCase.location}</span>
              </span>
              <span className="text-emerald-400 font-semibold font-mono text-[11px]">
                {evidence.length} Evidence
              </span>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2">
            <p className="text-xs text-slate-400">No active case in workspace.</p>
            <button
              onClick={onOpenNewCase}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              + CREATE FIRST CASE
            </button>
          </div>
        )}
      </div>

      {/* Recent Evidence Horizontal Swipe Cards */}
      {evidence.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              RECENT EVIDENCE
            </span>
            <button onClick={() => setActiveTab('evidence')} className="text-xs font-semibold text-blue-400">
              Vault
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {evidence.map(e => (
              <div
                key={e.id}
                onClick={() => setActiveTab('evidence')}
                className="w-44 shrink-0 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition shadow-lg space-y-2 p-2.5"
              >
                <div className="h-24 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center relative">
                  <img src={e.fileUrl} alt={e.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 text-[9px] font-mono bg-slate-950/80 px-1.5 py-0.5 rounded text-blue-400">
                    {e.evidenceId}
                  </span>
                </div>
                <h4 className="text-[11px] font-bold text-white truncate">{e.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono block">{e.capturedAt.substring(0, 10)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Case Status Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" /> HARI AI CASE STATUS
          </span>
          <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950 border border-purple-800 px-2 py-0.5 rounded">
            CASE AWARE
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {evidence.length > 0
            ? `Analyzed ${evidence.length} evidence items. Tap Hari AI Analyst for structured reasoning.`
            : 'Workspace currently empty. Ingest evidence items to generate automated AI observations.'}
        </p>
      </div>
    </div>
  );
};
