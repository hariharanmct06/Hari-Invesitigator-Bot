import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  LayoutDashboard,
  FolderKanban,
  Camera,
  HardDrive,
  Bot,
  Menu,
  X,
  GitFork,
  Clock,
  MessageSquareQuote,
  Compass,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Info
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, openCamera, setIsAboutOpen } = useInvestigation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const moreItems = [
    { id: 'graph', label: 'Connection Graph', icon: GitFork, desc: 'Interactive entity node relationship map' },
    { id: 'timeline', label: 'Investigation Timeline', icon: Clock, desc: 'Chronological event evidence sequence' },
    { id: 'statements', label: 'Statement Intelligence', icon: MessageSquareQuote, desc: 'Cross-evidence discrepancy comparative tool' },
    { id: 'leads', label: 'Investigation Leads', icon: Compass, desc: 'Prioritized investigation action tasks' },
    { id: 'gaps', label: 'Evidence Gap Intelligence', icon: AlertTriangle, desc: 'Known vs unknown evidence context' },
    { id: 'reports', label: 'Report Studio', icon: FileCheck, desc: 'Generate printable executive report PDF' },
    { id: 'security', label: 'Security & Audit Trail', icon: ShieldCheck, desc: 'Immutable action log history' }
  ];

  return (
    <>
      {/* Full Screen Navigation Sheet for "More" Menu */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-5 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-100">INVESTIGATION WORKSPACE</h2>
              <p className="text-xs text-slate-400">All forensic intelligence modules</p>
            </div>
            <button
              onClick={() => setIsMoreMenuOpen(false)}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5 my-4 flex-1">
            {moreItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMoreMenuOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3.5 transition ${
                    isActive
                      ? 'bg-blue-950/60 border-blue-600 text-white'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.label}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Created by Hari Bot & Business Solutions</span>
            <button
              onClick={() => {
                setIsMoreMenuOpen(false);
                setIsAboutOpen(true);
              }}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" /> About
            </button>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 py-1.5 px-3 flex items-center justify-around lg:hidden shadow-2xl">
        <button
          onClick={() => setActiveTab('command')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
            activeTab === 'command' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">HOME</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
            activeTab === 'cases' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <FolderKanban className="w-5 h-5" />
          <span className="text-[10px]">CASES</span>
        </button>

        {/* Prominent Center Capture Button */}
        <button
          onClick={openCamera}
          className="flex flex-col items-center justify-center -mt-5"
        >
          <div className="w-14 h-14 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center text-white shadow-xl shadow-blue-900/60 active:scale-95 transition">
            <Camera className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-blue-400 mt-0.5">CAPTURE</span>
        </button>

        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
            activeTab === 'evidence' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <HardDrive className="w-5 h-5" />
          <span className="text-[10px]">EVIDENCE</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition ${
            activeTab === 'ai' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px]">AI</span>
        </button>

        <button
          onClick={() => setIsMoreMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-slate-400"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">MORE</span>
        </button>
      </nav>
    </>
  );
};
