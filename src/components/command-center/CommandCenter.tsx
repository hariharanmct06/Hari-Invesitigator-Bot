import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  FolderKanban,
  HardDrive,
  Compass,
  Bot,
  Plus,
  Camera,
  ArrowRight,
  Shield,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const CommandCenter: React.FC<Props> = ({ onOpenNewCase }) => {
  const { cases, evidence, leads, aiAnalyses, setCurrentCase, setActiveTab, openCamera } = useInvestigation();

  const metrics = [
    { title: 'ACTIVE CASES', count: cases.length, icon: FolderKanban, color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/60' },
    { title: 'EVIDENCE ITEMS', count: evidence.length, icon: HardDrive, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60' },
    { title: 'OPEN LEADS', count: leads.length, icon: Compass, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60' },
    { title: 'AI ANALYSES', count: Object.keys(aiAnalyses).length, icon: Bot, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/60' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
            <Shield className="w-4 h-4" /> COMMAND CENTER • SYSTEM ONLINE
          </div>
          <h2 className="text-xl font-extrabold text-white">Investigation Intelligence Operating System</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time forensic evidence workspace, statement discrepancy extraction, entity relationship graphs, and AI-assisted case briefs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCamera}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-lg shadow-blue-900/40 active:scale-95"
          >
            <Camera className="w-4 h-4" /> CAPTURE EVIDENCE
          </button>
          <button
            onClick={onOpenNewCase}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> + NEW CASE
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div key={m.title} className={`p-4 rounded-2xl border ${m.bg} flex items-center justify-between`}>
              <div>
                <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">{m.title}</p>
                <h3 className="text-2xl font-black text-white mt-1">{m.count}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-slate-900/80 ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Investigations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white">ACTIVE INVESTIGATIONS</h3>
            <p className="text-xs text-slate-400">Select a case to inspect evidence, graph connections, and timeline</p>
          </div>
          <button
            onClick={onOpenNewCase}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> + NEW CASE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map(c => (
            <div
              key={c.id}
              onClick={() => {
                setCurrentCase(c);
                setActiveTab('evidence');
              }}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition hover:shadow-xl hover:shadow-blue-950/20 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-0.5 rounded-md">
                    {c.caseNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {c.priority}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition line-clamp-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[140px]">{c.location}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 font-semibold">
                    <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> {evidence.length} Evidence
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500">Lead: {c.leadInvestigator}</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Open Case <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
