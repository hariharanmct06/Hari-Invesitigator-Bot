import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { FileCheck, Printer, Download, Shield } from 'lucide-react';

export const ReportStudio: React.FC = () => {
  const { currentCase, evidence, events, leads } = useInvestigation();

  const [includeAI, setIncludeAI] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includeStatements, setIncludeStatements] = useState(true);
  const [includeAudit, setIncludeAudit] = useState(true);

  if (!currentCase) {
    return (
      <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
        <FileCheck className="w-10 h-10 text-slate-600 mx-auto" />
        <h3 className="text-sm font-bold text-slate-300">NO CASE SELECTED</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Create or select a case to build executive forensic reports.
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleExportText = () => {
    const textContent = `
HARI INVESTIGATOR AI — FORENSIC REPORT
=======================================
CASE: ${currentCase.caseNumber} - ${currentCase.title}
INCIDENT DATE: ${currentCase.incidentDate}
LOCATION: ${currentCase.location}
LEAD INVESTIGATOR: ${currentCase.leadInvestigator}

SUMMARY:
${currentCase.description}

EVIDENCE RECORDS (${evidence.length} ITEMS):
${evidence.map(e => `- [${e.evidenceId}] ${e.title} | Status: ${e.status} | Hash: ${e.hash}`).join('\n')}

INVESTIGATION LEADS (${leads.length}):
${leads.map(l => `- [${l.priority}] ${l.title} -> ${l.verificationAction}`).join('\n')}

Created by Hari Bot & Business Solutions
    `;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCase.caseNumber.replace(/\s+/g, '_')}_Report.txt`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-400" /> FORENSIC REPORT STUDIO
          </h2>
          <p className="text-xs text-slate-400">
            Generate executive report document for {currentCase.caseNumber}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportText}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4 text-blue-400" /> EXPORT DOC
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-900/40"
          >
            <Printer className="w-4 h-4" /> GENERATE PRINTABLE PDF
          </button>
        </div>
      </div>

      {/* Configuration Section Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="font-mono text-slate-400 uppercase font-bold">Include Sections:</span>
        <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
          <input type="checkbox" checked={includeAI} onChange={e => setIncludeAI(e.target.checked)} className="rounded" />
          AI Inferences & Disclaimers
        </label>
        <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
          <input type="checkbox" checked={includeTimeline} onChange={e => setIncludeTimeline(e.target.checked)} className="rounded" />
          Timeline Sequence
        </label>
        <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
          <input type="checkbox" checked={includeStatements} onChange={e => setIncludeStatements(e.target.checked)} className="rounded" />
          Statements Matrix
        </label>
        <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
          <input type="checkbox" checked={includeAudit} onChange={e => setIncludeAudit(e.target.checked)} className="rounded" />
          Cryptographic Audit Trail
        </label>
      </div>

      {/* Printable Report Canvas Document */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-4xl mx-auto space-y-8 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none shadow-2xl">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-blue-500/40 shrink-0" />
              <h1 className="text-xl font-black tracking-tight text-white print:text-black">
                HARI INVESTIGATOR AI
              </h1>
            </div>
            <p className="text-xs text-slate-400 print:text-gray-600 mt-1">OFFICIAL FORENSIC CASE DOSSIER</p>
          </div>
          <div className="text-right font-mono text-xs text-slate-400 print:text-gray-700">
            <span className="text-blue-400 font-bold block">{currentCase.caseNumber}</span>
            <span>Generated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Case Overview */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-blue-400 print:text-blue-700 uppercase tracking-wider">
            1. CASE OVERVIEW
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-900 print:bg-gray-100 p-4 rounded-xl border border-slate-800 print:border-gray-300">
            <div><strong>Title:</strong> {currentCase.title}</div>
            <div><strong>Incident Date:</strong> {currentCase.incidentDate}</div>
            <div><strong>Location:</strong> {currentCase.location}</div>
            <div><strong>Investigator:</strong> {currentCase.leadInvestigator}</div>
          </div>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed bg-slate-900/60 p-3 rounded-xl">
            {currentCase.description}
          </p>
        </div>

        {/* Evidence Records */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-blue-400 print:text-blue-700 uppercase tracking-wider">
            2. FORENSIC EVIDENCE VAULT ({evidence.length} ITEMS)
          </h3>
          <div className="space-y-2">
            {evidence.map(e => (
              <div key={e.id} className="p-3 bg-slate-900 print:bg-gray-50 border border-slate-800 print:border-gray-200 rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="text-blue-400 font-bold">[{e.evidenceId}] {e.title}</span>
                  <span className="text-emerald-400">{e.status}</span>
                </div>
                <p className="text-slate-400 print:text-gray-600">{e.description}</p>
                <div className="text-[10px] font-mono text-slate-500">Hash: {e.hash}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {includeTimeline && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-blue-400 print:text-blue-700 uppercase tracking-wider">
              3. CHRONOLOGICAL TIMELINE
            </h3>
            <div className="space-y-2 text-xs">
              {events.map(evt => (
                <div key={evt.id} className="flex gap-4 p-2.5 bg-slate-900 print:bg-gray-50 rounded-lg border border-slate-800">
                  <span className="font-mono text-blue-400 font-bold shrink-0">{evt.timestamp.substring(11, 19)}</span>
                  <div>
                    <strong className="text-slate-200 print:text-black">{evt.title}:</strong>
                    <span className="text-slate-400 print:text-gray-700 ml-1">{evt.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Attribution */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs font-mono text-slate-500 print:text-gray-600">
          Created by Hari Bot & Business Solutions
        </div>
      </div>
    </div>
  );
};
