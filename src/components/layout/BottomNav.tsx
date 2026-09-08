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
  Info,
  PhoneCall,
  Sun,
  Moon,
  Database
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openCamera,
    setIsAboutOpen,
    openEmergencyModal,
    t,
    theme,
    toggleTheme,
    dataSaver,
    toggleDataSaver
  } = useInvestigation();

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
      {/* Full-Screen Glassmorphic "More" Menu Sheet */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#05070b]/95 backdrop-blur-2xl flex flex-col justify-between p-5 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                HARI INVESTIGATOR <span className="text-amber-400 font-mono text-xs">AI</span>
              </h2>
              <p className="text-xs text-slate-400">All Forensic Intelligence Modules</p>
            </div>
            <button
              onClick={() => setIsMoreMenuOpen(false)}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 active:scale-95 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Emergency 112 Banner inside Menu */}
          <div className="my-3 p-3.5 bg-gradient-to-r from-red-950/90 to-slate-900 border border-red-800/80 rounded-2xl flex items-center justify-between text-xs shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-white block">INDIA EMERGENCY 112</span>
                <p className="text-[10px] text-red-300 font-mono">Nationwide Emergency Dispatch</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsMoreMenuOpen(false);
                openEmergencyModal();
              }}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition min-h-[40px]"
            >
              CALL 112
            </button>
          </div>

          {/* Quick Settings Bar in Menu */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={toggleDataSaver}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-2 transition ${
                dataSaver ? 'bg-emerald-950 border-emerald-800 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{dataSaver ? 'DATA SAVER: ON' : 'DATA SAVER: OFF'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="py-2 px-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
              <span>{theme.toUpperCase()}</span>
            </button>
          </div>

          {/* Module List Grid */}
          <div className="grid grid-cols-1 gap-2.5 my-2 flex-1">
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
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3.5 transition tactile-btn min-h-[56px] ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-950/80 to-slate-900 border-blue-500/60 text-white shadow-md'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-800 text-amber-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                      {item.label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">Created by Hari Bot & Business Solutions</span>
            <button
              onClick={() => {
                setIsMoreMenuOpen(false);
                setIsAboutOpen(true);
              }}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center gap-1.5 min-h-[44px]"
            >
              <Info className="w-4 h-4 text-amber-400" /> About Platform
            </button>
          </div>
        </div>
      )}

      {/* Slim 3D Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#05070b]/95 backdrop-blur-xl border-t border-slate-800/90 py-1.5 px-3 flex items-center justify-around lg:hidden shadow-2xl safe-area-bottom">
        {/* HOME TAB */}
        <button
          onClick={() => setActiveTab('command')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition min-h-[48px] min-w-[48px] ${
            activeTab === 'command' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 transition ${activeTab === 'command' ? 'scale-110 text-blue-400' : ''}`} />
          <span className="text-[10px] font-mono font-extrabold mt-0.5">{t('home')}</span>
        </button>

        {/* CASES TAB */}
        <button
          onClick={() => setActiveTab('cases')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition min-h-[48px] min-w-[48px] ${
            activeTab === 'cases' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderKanban className={`w-5 h-5 transition ${activeTab === 'cases' ? 'scale-110 text-blue-400' : ''}`} />
          <span className="text-[10px] font-mono font-extrabold mt-0.5">{t('cases')}</span>
        </button>

        {/* CENTRAL FLOATING 3D CAPTURE BUTTON */}
        <button
          onClick={openCamera}
          className="flex flex-col items-center justify-center -mt-6 group"
          title="Capture Evidence Instantly"
        >
          <div className="relative p-1 rounded-full bg-slate-950 border-2 border-slate-800/80 shadow-2xl">
            {/* Metallic Ring + Gold/Blue Glow Container */}
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 border-2 border-slate-300/30 flex items-center justify-center text-white shadow-xl shadow-blue-900/70 group-active:scale-90 transition duration-150 relative overflow-hidden">
              {/* Subtle Gold Pulse Lens Accent */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 to-transparent opacity-40" />
              <Camera className="w-6 h-6 animate-pulse text-white relative z-10" />
            </div>
          </div>
          <span className="text-[10px] font-mono font-black text-amber-400 mt-0.5 tracking-wider">{t('capture')}</span>
        </button>

        {/* EVIDENCE TAB */}
        <button
          onClick={() => setActiveTab('evidence')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition min-h-[48px] min-w-[48px] ${
            activeTab === 'evidence' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className={`w-5 h-5 transition ${activeTab === 'evidence' ? 'scale-110 text-blue-400' : ''}`} />
          <span className="text-[10px] font-mono font-extrabold mt-0.5">{t('evidence')}</span>
        </button>

        {/* AI TAB */}
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition min-h-[48px] min-w-[48px] ${
            activeTab === 'ai' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className={`w-5 h-5 transition ${activeTab === 'ai' ? 'scale-110 text-blue-400' : ''}`} />
          <span className="text-[10px] font-mono font-extrabold mt-0.5">{t('ai')}</span>
        </button>

        {/* MORE MENU TAB */}
        <button
          onClick={() => setIsMoreMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200 min-h-[48px] min-w-[48px]"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-mono font-extrabold mt-0.5">{t('more')}</span>
        </button>
      </nav>
    </>
  );
};
