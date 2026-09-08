import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  LayoutDashboard,
  HardDrive,
  GitFork,
  Clock,
  MessageSquareQuote,
  Bot,
  Compass,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Info,
  FolderKanban
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, evidence, leads, gaps, setIsAboutOpen } = useInvestigation();

  const navItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard },
    { id: 'cases', label: 'Active Cases', icon: FolderKanban },
    { id: 'evidence', label: 'Evidence Vault', icon: HardDrive, badge: evidence.length },
    { id: 'graph', label: 'Connection Graph', icon: GitFork },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'statements', label: 'Statements', icon: MessageSquareQuote },
    { id: 'ai', label: 'Hari AI Analyst', icon: Bot, highlight: true },
    { id: 'leads', label: 'Investigation Leads', icon: Compass, badge: leads.length },
    { id: 'gaps', label: 'Evidence Gaps', icon: AlertTriangle, badge: gaps.length },
    { id: 'reports', label: 'Report Studio', icon: FileCheck },
    { id: 'security', label: 'Security & Audit', icon: ShieldCheck }
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-950/80 border-r border-slate-800/80 p-3 h-[calc(100vh-61px)] sticky top-[61px]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          WORKSPACE NAVIGATION
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : item.highlight ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-[11px]">HARI INVESTIGATOR AI</span>
          <button onClick={() => setIsAboutOpen(true)} className="text-slate-500 hover:text-blue-400">
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Created by Hari Bot & Business Solutions
        </p>
      </div>
    </aside>
  );
};
