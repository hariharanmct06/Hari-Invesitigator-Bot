import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { ShieldCheck, Lock, HardDrive, RotateCcw } from 'lucide-react';

export const AuditLogView: React.FC = () => {
  const { auditLogs, resetDemoData, currentCase } = useInvestigation();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> SECURITY & AUDIT TRAIL
          </h2>
          <p className="text-xs text-slate-400">
            Immutable append-only cryptographic event log for {currentCase.caseNumber}.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> RESET DEMO DATA
        </button>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">USER / ACTOR</th>
                <th className="py-3 px-4">ACTION TYPE</th>
                <th className="py-3 px-4">TARGET OBJECT</th>
                <th className="py-3 px-4">DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans text-slate-300">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-850 transition">
                  <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-mono text-[10px] border border-blue-800 font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400 whitespace-nowrap text-[11px]">
                    {log.object}
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
