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
  Eye,
  ArrowRight
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
    <div className="space-y-5 pb-16">
      {/* Case Header Desk Banner */}
      <div className="metallic-card rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-extrabold text-blue-400 bg-blue-950/80 border border-blue-600/50 px-2.5 py-0.5 rounded-md shadow-sm">
                {currentCase.caseNumber}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-950/90 text-amber-400 border border-amber-800">
                PRIORITY: {currentCase.priority}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                {currentCase.caseType || 'General Investigation'}
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">{currentCase.title}</h1>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={openCamera}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/50 tactile-btn min-h-[44px]"
            >
              <Camera className="w-4 h-4 text-amber-300" /> CAPTURE
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1 border border-slate-700 tactile-btn min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-blue-400" /> EVIDENCE
            </button>
          </div>
        </div>

        {/* Case Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 pt-1">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 font-mono text-[9px] block font-bold">LOCATION</span>
            <span className="text-slate-200 font-semibold truncate block mt-0.5">{currentCase.location}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 font-mono text-[9px] block font-bold">LEAD INVESTIGATOR</span>
            <span className="text-slate-200 font-semibold truncate block mt-0.5">{currentCase.leadInvestigator}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 font-mono text-[9px] block font-bold">DATE OPENED</span>
            <span className="text-slate-200 font-semibold truncate block mt-0.5">{currentCase.incidentDate}</span>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 font-mono text-[9px] block font-bold">CASE STATUS</span>
            <span className="text-emerald-400 font-mono font-bold truncate block mt-0.5">{currentCase.status}</span>
          </div>
        </div>
      </div>

      {/* INVESTIGATION PROGRESS TRACKER (7 Stages) */}
      <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <h3 className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> INVESTIGATION PROGRESS TRACKER
          </h3>
          <span className="text-[10px] font-mono text-slate-400">STAGE 2 / 7</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
          {stages.map((st, idx) => (
            <div
              key={st.name}
              className={`p-2 rounded-xl border text-center space-y-1 transition ${
                st.status === 'COMPLETED'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400'
                  : st.status === 'IN_PROGRESS'
                  ? 'bg-blue-950/40 border-blue-600 text-blue-300'
                  : st.status === 'NEEDS_REVIEW'
                  ? 'bg-amber-950/40 border-amber-800 text-amber-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <span className="text-[9px] font-mono font-bold block">{idx + 1}. {st.name}</span>
              <span className="text-[8px] font-mono font-extrabold block uppercase tracking-wider">{st.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* THREE CORE PANELS: KNOWN FACTS / UNKNOWNS / VERIFICATION NEEDED */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Panel 1: What Do We Know? */}
        <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-extrabold text-white">WHAT DO WE KNOW?</h4>
          </div>
          {evidence.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{evidence.length} evidence record(s) recorded with SHA-256 integrity.</span>
              </li>
              {evidence.slice(0, 2).map(e => (
                <li key={e.id} className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span className="truncate">{e.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No verified facts recorded yet. Ingest evidence items to establish ground truth.</p>
          )}
        </div>

        {/* Panel 2: What Do We Not Know? */}
        <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-extrabold text-white">WHAT DO WE NOT KNOW?</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Identity of individuals involved near incident location.</span>
            </li>
            <li className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Secondary CCTV camera footage feeds for adjacent street.</span>
            </li>
          </ul>
        </div>

        {/* Panel 3: What Needs Verification? */}
        <div className="metallic-card rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-extrabold text-white">WHAT NEEDS VERIFICATION?</h4>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>Cross-reference witness statement timestamps with CCTV logs.</span>
            </li>
            <li className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>Physical forensic audit of mechanical latch marks.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* QUICK ACTION TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('evidence')}
          className="p-3.5 metallic-card rounded-2xl text-left flex items-center justify-between transition tactile-btn min-h-[52px]"
        >
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold block">VAULT</span>
            <span className="text-xs font-extrabold text-white">{evidence.length} Evidence</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className="p-3.5 metallic-card rounded-2xl text-left flex items-center justify-between transition tactile-btn min-h-[52px]"
        >
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold block">ENTITIES</span>
            <span className="text-xs font-extrabold text-white">{people.length} People</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className="p-3.5 metallic-card rounded-2xl text-left flex items-center justify-between transition tactile-btn min-h-[52px]"
        >
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold block">LEADS</span>
            <span className="text-xs font-extrabold text-white">{leads.length} Active Leads</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className="p-3.5 metallic-card rounded-2xl text-left flex items-center justify-between transition tactile-btn min-h-[52px]"
        >
          <div>
            <span className="text-[10px] font-mono text-purple-400 font-bold block">DOSSIER</span>
            <span className="text-xs font-extrabold text-white">Generate Report</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
