import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import {
  Shield,
  Camera,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Info,
  FolderKanban,
  ChevronDown,
  Plus
} from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const Header: React.FC<Props> = ({ onOpenNewCase }) => {
  const {
    currentCase,
    cases,
    setCurrentCase,
    theme,
    toggleTheme,
    openCamera,
    isOnline,
    offlineQueue,
    setIsAboutOpen
  } = useInvestigation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      {/* Brand & Active Case Selector */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsAboutOpen(true)}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 group-hover:scale-105 transition">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
              HARI INVESTIGATOR <span className="text-blue-400 font-mono text-xs">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Hari Bot & Business Solutions</p>
          </div>
        </div>

        <div className="hidden sm:block h-6 w-px bg-slate-800" />

        {/* Case Switcher Dropdown */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-200 transition"
          >
            <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">{currentCase.caseNumber}:</span>
            <span className="truncate max-w-[150px]">{currentCase.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Select Case Workspace
              </div>
              {cases.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCurrentCase(c);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                    c.id === currentCase.id ? 'bg-blue-950/40 text-blue-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <span className="truncate">{c.caseNumber} - {c.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{c.priority}</span>
                </button>
              ))}
              <div className="border-t border-slate-800 mt-2 pt-2 px-2">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenNewCase();
                  }}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> + NEW CASE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5">
        {/* Prominent Capture Evidence Button */}
        <button
          onClick={openCamera}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-blue-900/40 active:scale-95"
        >
          <Camera className="w-4 h-4 animate-pulse" />
          <span>CAPTURE EVIDENCE</span>
        </button>

        {/* Connection Status */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-xl text-[11px]">
          {isOnline ? (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Wifi className="w-3.5 h-3.5" /> Online
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-400">
              <WifiOff className="w-3.5 h-3.5" /> Offline ({offlineQueue.length} queued)
            </span>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
        </button>

        {/* About Button */}
        <button
          onClick={() => setIsAboutOpen(true)}
          className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
          title="About HARI INVESTIGATOR AI"
        >
          <Info className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
