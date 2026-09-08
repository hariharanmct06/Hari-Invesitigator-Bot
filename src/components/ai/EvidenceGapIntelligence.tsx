import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { AlertTriangle, ShieldCheck, HelpCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export const EvidenceGapIntelligence: React.FC = () => {
  const { gaps, currentCase } = useInvestigation();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" /> EVIDENCE GAP INTELLIGENCE
        </h2>
        <p className="text-xs text-slate-400">
          Structured breakdown of Known Facts vs Unknown Context for {currentCase?.caseNumber || 'Current Investigation'}.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-blue-950/40 border border-blue-800/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-200">
        <ShieldAlert className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-blue-300">COMPLIANCE & LEGAL SAFETY GUARANTEE</h4>
          <p className="text-[11px] text-blue-300/80 mt-0.5 leading-relaxed">
            All AI-suggested verification steps strictly adhere to legal investigation protocols. Hari AI Investigator never recommends unlawful surveillance or unauthorized evidence collection.
          </p>
        </div>
      </div>

      {/* Gaps List */}
      <div className="space-y-4">
        {gaps.map(g => (
          <div key={g.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                g.type === 'UNKNOWN' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-purple-950 text-purple-400 border border-purple-800'
              }`}>
                CATEGORY: {g.type}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">PRIORITY: {g.priority}</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{g.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{g.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">RECOMMENDED VERIFICATION ACTION</span>
                <p className="text-slate-200">{g.recommendedAction}</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] font-mono text-blue-400 font-bold block">RATIONALE / REASON</span>
                <p className="text-slate-300">{g.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
