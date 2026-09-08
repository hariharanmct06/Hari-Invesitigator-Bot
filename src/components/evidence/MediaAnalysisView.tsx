import React, { useState } from 'react';
import { Evidence, AIAnalysis } from '../../types/investigation';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  ShieldCheck,
  AlertCircle,
  Eye,
  FileText,
  Sparkles,
  CheckCircle,
  Clock,
  HardDrive,
  Maximize2,
  ChevronUp,
  Tag,
  ShieldAlert,
  Info
} from 'lucide-react';

interface Props {
  evidence: Evidence;
  analysis?: AIAnalysis;
  onClose: () => void;
}

export const MediaAnalysisView: React.FC<Props> = ({ evidence, analysis, onClose }) => {
  const { verifyEvidence } = useInvestigation();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const getLevelBadge = (lvl: number) => {
    switch (lvl) {
      case 1: return { text: 'LEVEL 1: OBSERVED FACT', cls: 'bg-emerald-950 text-emerald-400 border-emerald-800' };
      case 2: return { text: 'LEVEL 2: EXTRACTED DATA', cls: 'bg-blue-950 text-blue-400 border-blue-800' };
      case 3: return { text: 'LEVEL 3: AI INFERENCE', cls: 'bg-purple-950 text-purple-400 border-purple-800' };
      case 4: return { text: 'LEVEL 4: UNVERIFIED', cls: 'bg-amber-950 text-amber-400 border-amber-800' };
      default: return { text: 'LEVEL 5: UNKNOWN', cls: 'bg-slate-800 text-slate-400 border-slate-700' };
    }
  };

  const levelInfo = getLevelBadge(evidence.level);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2.5 py-1 rounded-lg">
            {evidence.evidenceId}
          </span>
          <span className={`text-[10px] font-mono font-bold border px-2.5 py-1 rounded-lg ${levelInfo.cls}`}>
            {levelInfo.text}
          </span>
          <h3 className="text-sm font-bold text-slate-100 hidden sm:block truncate max-w-md">
            {evidence.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {evidence.status !== 'VERIFIED' ? (
            <button
              onClick={() => verifyEvidence(evidence.id)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/40"
            >
              <CheckCircle className="w-4 h-4" /> VERIFY EVIDENCE
            </button>
          ) : (
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> HUMAN VERIFIED
            </span>
          )}

          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main Split Layout: Desktop Left Media, Right AI Analysis */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden relative">
        {/* Left Column - Media View (Cols 1-7 on desktop) */}
        <div className="lg:col-span-7 bg-black/80 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {evidence.category === 'VIDEO' ? (
            <video src={evidence.fileUrl} controls className="max-h-[75vh] w-full object-contain rounded-xl shadow-2xl" />
          ) : evidence.category === 'AUDIO' ? (
            <div className="w-full max-w-xl p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4">
              <img src={evidence.fileUrl} alt="Audio Waveform" className="w-full h-32 object-contain rounded-xl" />
              <audio src={evidence.fileUrl} controls className="w-full mt-4" />
            </div>
          ) : (
            <img src={evidence.fileUrl} alt={evidence.title} className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl" />
          )}

          {/* Cryptographic Provenance Bar */}
          <div className="absolute bottom-3 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span className="truncate">SHA-256: <strong className="text-slate-200">{evidence.hash.substring(0, 16)}...</strong></span>
            <span>Captured: {evidence.capturedAt}</span>
            <span>Device Time: {evidence.deviceTime}</span>
          </div>

          {/* Mobile Bottom Sheet Drawer Trigger */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden absolute bottom-14 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5"
          >
            <ChevronUp className="w-4 h-4" /> OPEN AI ANALYSIS
          </button>
        </div>

        {/* Right Column - AI Forensic Analysis Panel (Cols 8-12 on desktop) */}
        <div className={`lg:col-span-5 bg-slate-900 border-l border-slate-800 flex flex-col justify-between overflow-y-auto p-5 space-y-5 ${
          isMobileDrawerOpen ? 'fixed inset-0 z-50 bg-slate-900 flex animate-in slide-in-from-bottom' : 'hidden lg:flex'
        }`}>
          {/* Drawer Header for Mobile */}
          <div className="lg:hidden flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" /> FORENSIC MEDIA ANALYSIS
            </h3>
            <button onClick={() => setIsMobileDrawerOpen(false)} className="text-slate-400">
              Close
            </button>
          </div>

          {/* AI Accuracy Disclaimer Box */}
          <div className="bg-blue-950/40 border border-blue-800/80 rounded-xl p-3 text-xs space-y-1.5 text-blue-200">
            <div className="flex items-center gap-1.5 font-bold text-blue-300">
              <Info className="w-4 h-4" /> AI CONFIDENCE & TRUTH DISCLAIMER
            </div>
            <p className="text-[11px] text-blue-300/80 leading-relaxed">
              "Confidence indicates model certainty in this interpretation; it does not establish factual truth."
            </p>
          </div>

          {/* Analysis Data Sections */}
          {analysis ? (
            <div className="space-y-4 text-xs">
              {/* Overall Confidence Score */}
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] block">AI CONFIDENCE INDEX</span>
                  <span className="text-xl font-black text-white">{analysis.confidenceScore}%</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] block">MODEL</span>
                  <span className="text-blue-400 font-mono font-semibold text-[11px]">{analysis.modelName}</span>
                </div>
              </div>

              {/* Observed Objects */}
              <div>
                <h4 className="font-mono font-bold text-slate-400 text-[10px] uppercase mb-1.5 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> OBSERVED OBJECTS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.observedObjects.map(obj => (
                    <span key={obj} className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-200 font-medium">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scene Details */}
              <div>
                <h4 className="font-mono font-bold text-slate-400 text-[10px] uppercase mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-blue-400" /> SCENE DETAILS
                </h4>
                <p className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-slate-300 leading-relaxed">
                  {analysis.sceneDetails}
                </p>
              </div>

              {/* Visible Text OCR */}
              {analysis.visibleText.length > 0 && (
                <div>
                  <h4 className="font-mono font-bold text-slate-400 text-[10px] uppercase mb-1">
                    EXTRACTED VISIBLE TEXT (OCR)
                  </h4>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-emerald-400 space-y-1">
                    {analysis.visibleText.map((t, idx) => (
                      <div key={idx}>• "{t}"</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Level 3 Inferences */}
              <div>
                <h4 className="font-mono font-bold text-slate-400 text-[10px] uppercase mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI REASONING INFERENCES (LEVEL 3)
                </h4>
                <div className="space-y-2">
                  {analysis.inferences.map(inf => (
                    <div key={inf.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
                        <span>{inf.text}</span>
                        <span className="text-purple-400 font-mono">{inf.confidence}%</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Basis: {inf.reasoningBasis}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requires Verification */}
              <div>
                <h4 className="font-mono font-bold text-amber-400 text-[10px] uppercase mb-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> REQUIRES HUMAN VERIFICATION
                </h4>
                <div className="bg-amber-950/30 border border-amber-800/60 p-3 rounded-xl space-y-1 text-amber-300">
                  {analysis.requiresVerification.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span>•</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600 animate-spin" />
              <p>AI Media Analysis ready for processing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
