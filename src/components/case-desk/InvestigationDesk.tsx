import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Case } from '../../types/investigation';
import {
  FolderKanban,
  HardDrive,
  User,
  Clock,
  MapPin,
  Compass,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Plus,
  Camera,
  CheckCircle,
  HelpCircle,
  Eye
} from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const InvestigationDesk: React.FC<Props> = ({ onOpenNewCase }) => {
  const {
    currentCase,
    evidence,
    people,
    locations,
    events,
    statements,
    leads,
    gaps,
    openCamera,
    setActiveTab,
    t
  } = useInvestigation();

  if (!currentCase) return null;

  const stages = [
    { name: 'CASE SETUP', status: 'COMPLETED' },
    { name: 'EVIDENCE COLLECTION', status: evidence.length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED' },
    { name: 'EVIDENCE REVIEW', status: evidence.some(e => e.status === 'HUMAN_VERIFIED') ? 'IN_PROGRESS' : 'NOT_STARTED' },
    { name: 'TIMELINE CONSTRUCTION', status: events.length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED' },
    { name: 'CONNECTION ANALYSIS', status: people.length > 0 ? 'IN_PROGRESS' : 'NOT_STARTED' },
    { name: 'VERIFICATION', status: evidence.some(e => e.status === 'HUMAN_VERIFIED') ? 'COMPLETED' : 'NEEDS_REVIEW' },
    { name: 'REPORTING', status: 'NOT_STARTED' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Case Header Desk Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2.5 py-0.5 rounded-md">
                {currentCase.caseNumber}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800">
                {currentCase.priority}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {currentCase.caseType || 'General Investigation'}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white">{currentCase.title}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={openCamera}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-900/40"
            >
              <Camera className="w-3.5 h-3.5" /> CAPTURE EVIDENCE
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5" /> ADD EVIDENCE
            </button>
          </div>
        </div>

        {/* Case Metadata Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-400 pt-1">
          <div>
            <span className="text-slate-500 font-mono text-[10px] block">LOCATION</span>
            <span className="text-slate-200 font-medium truncate block">{currentCase.location}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono text-[10px] block">LEAD INVESTIGATOR</span>
            <span className="text-slate-200 font-medium">{currentCase.leadInvestigator}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono text-[10px] block">DATE OPENED</span>
            <span className="text-slate-200 font-mono">{currentCase.createdAt}</span>
          </div>
          <div>
            <span className="text-slate-500 font-mono text-[10px] block">EVIDENCE TOTAL</span>
            <span className="text-blue-400 font-mono font-bold">{evidence.length} Items</span>
          </div>
        </div>
      </div>

      {/* Case Brief & Counts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left - Case Brief Overview (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-blue-400" /> CASE BRIEF & SUMMARY
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2.5 py-0.5 rounded">
                STATUS: {currentCase.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              {currentCase.description}
            </p>

            {/* Known vs Unknown Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 uppercase">
                  <CheckCircle className="w-3.5 h-3.5" /> KNOWN INFORMATION
                </span>
                {currentCase.knownInformation && currentCase.knownInformation.length > 0 ? (
                  <ul className="space-y-1 text-slate-300">
                    {currentCase.knownInformation.map((info, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>•</span> <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">No verified facts recorded yet.</p>
                )}
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1 uppercase">
                  <HelpCircle className="w-3.5 h-3.5" /> UNKNOWN INFORMATION
                </span>
                {currentCase.unknownInformation && currentCase.unknownInformation.length > 0 ? (
                  <ul className="space-y-1 text-slate-300">
                    {currentCase.unknownInformation.map((info, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span>•</span> <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">No open unknown items logged.</p>
                )}
              </div>
            </div>
          </div>

          {/* Investigation Progress Stages */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              INVESTIGATION PROGRESS STAGES
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {stages.map(st => (
                <div key={st.name} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 block truncate">{st.name}</span>
                  <span className={`text-[10px] font-bold block ${
                    st.status === 'COMPLETED' ? 'text-emerald-400' : st.status === 'IN_PROGRESS' ? 'text-blue-400' : 'text-slate-600'
                  }`}>
                    {st.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Case Item Counts & Quick Navigation (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              FILE RECORDS & COUNTS
            </h3>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setActiveTab('evidence')}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <HardDrive className="w-4 h-4 text-emerald-400" /> Evidence Items
                </span>
                <span className="font-mono font-bold text-white">{evidence.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <User className="w-4 h-4 text-purple-400" /> Connected Entities
                </span>
                <span className="font-mono font-bold text-white">{people.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-blue-400" /> Timeline Events
                </span>
                <span className="font-mono font-bold text-white">{events.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2 text-slate-300">
                  <Compass className="w-4 h-4 text-amber-400" /> Investigation Leads
                </span>
                <span className="font-mono font-bold text-white">{leads.length}</span>
              </button>
            </div>
          </div>

          {/* AI Case Brief Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> HARI AI BRIEF
              </span>
              <span className="text-[10px] font-mono text-purple-400">CASE AWARE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {evidence.length > 0
                ? `Analyzed ${evidence.length} evidence items. Primary findings available in AI Analyst tab.`
                : 'No evidence captured yet. Capture your first evidence item to generate automated case insights.'}
            </p>
            <button
              onClick={() => setActiveTab('ai')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
            >
              OPEN HARI AI ANALYST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
