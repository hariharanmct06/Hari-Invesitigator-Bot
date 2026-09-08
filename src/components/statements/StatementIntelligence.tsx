import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Statement } from '../../types/investigation';
import { MessageSquareQuote, FileText, CheckCircle, AlertTriangle, HelpCircle, User, Sparkles } from 'lucide-react';

export const StatementIntelligence: React.FC = () => {
  const { statements, currentCase } = useInvestigation();
  const [selectedStatement, setSelectedStatement] = useState<Statement>(statements[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-blue-400" /> STATEMENT INTELLIGENCE & CROSS-EVIDENCE COMPARISON
        </h2>
        <p className="text-xs text-slate-400">
          Extract claims and entities from witness statements. Compare claims against physical evidence to isolate discrepancies.
        </p>
      </div>

      {/* Statement Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {statements.map(stmt => (
          <button
            key={stmt.id}
            onClick={() => setSelectedStatement(stmt)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border flex items-center gap-2 ${
              selectedStatement.id === stmt.id
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{stmt.personName}</span>
          </button>
        ))}
      </div>

      {/* Main Split Comparison View */}
      {selectedStatement && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Original Raw Statement (Cols 1-5) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedStatement.personName}</h3>
                <span className="text-[10px] font-mono text-slate-400">Statement Date: {selectedStatement.date}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-950 text-blue-400 font-mono text-xs border border-slate-800">
                RAW TESTIMONY
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-200 leading-relaxed font-sans italic">
              "{selectedStatement.rawText}"
            </div>

            {/* Extracted Entity Badges */}
            <div className="space-y-2 pt-2 text-xs">
              <h4 className="font-mono text-[10px] font-bold text-slate-400 uppercase">EXTRACTED ENTITIES</h4>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block">CLAIMS:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {selectedStatement.extractedEntities.claims.map((c, i) => (
                      <span key={i} className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                        • {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Cross-Evidence Comparison (Cols 6-12) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> CROSS-EVIDENCE VERIFICATION & DISCREPANCIES
              </h3>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-950 border border-purple-800 px-2.5 py-0.5 rounded">
                AI FORENSIC MATRIX
              </span>
            </div>

            <div className="space-y-3">
              {selectedStatement.comparisons.map(comp => (
                <div
                  key={comp.id}
                  className={`p-4 rounded-xl border space-y-2 ${
                    comp.status === 'DISCREPANCY'
                      ? 'bg-red-950/30 border-red-800/80 text-red-200'
                      : comp.status === 'SUPPORTED'
                      ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                      : 'bg-amber-950/30 border-amber-800/80 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-400" /> {comp.evidenceTitle}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      comp.status === 'DISCREPANCY'
                        ? 'bg-red-600 text-white'
                        : comp.status === 'SUPPORTED'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {comp.status === 'DISCREPANCY' && <AlertTriangle className="w-3 h-3" />}
                      {comp.status === 'SUPPORTED' && <CheckCircle className="w-3 h-3" />}
                      {comp.status === 'CANNOT_VERIFY' && <HelpCircle className="w-3 h-3" />}
                      {comp.status}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed">{comp.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
