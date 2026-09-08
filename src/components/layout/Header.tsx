import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Language } from '../../data/localization';
import {
  FolderKanban,
  Plus,
  Globe,
  Sun,
  Moon,
  Info,
  ChevronDown,
  Database,
  PhoneCall,
  Compass,
  LogOut,
  Sparkles,
  Bot
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
    language,
    setLanguage,
    setIsAboutOpen,
    dataSaver,
    toggleDataSaver,
    openEmergencyModal,
    isDemoMode,
    enterDemoMode,
    exitDemoMode,
    t
  } = useInvestigation();

  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const langNames: Record<Language, string> = {
    EN: 'English',
    TA: 'தமிழ்',
    HI: 'हिन्दी'
  };

  return (
    <>
      {/* Demo Mode Sticky Top Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-mono font-bold py-1 px-3 flex items-center justify-between shadow-md z-40">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>DEMO MODE — FICTIONAL INVESTIGATION DATA</span>
          </div>
          <button
            onClick={exitDemoMode}
            className="px-2.5 py-0.5 bg-slate-950 text-amber-400 font-bold rounded-md flex items-center gap-1 hover:bg-slate-900 transition min-h-[32px]"
          >
            <LogOut className="w-3 h-3" /> EXIT DEMO
          </button>
        </div>
      )}

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#05070b]/90 backdrop-blur-xl border-b border-slate-800/80 px-3 md:px-5 py-2 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-blue-500/40 shadow-lg shadow-blue-900/40 group-hover:scale-105 transition bg-slate-950 p-0.5 shrink-0">
              <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-xs md:text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                HARI INVESTIGATOR <span className="text-amber-400 font-mono text-[10px] md:text-xs">AI</span>
              </h1>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium truncate max-w-[110px] sm:max-w-none">
                Hari Bot & Business Solutions
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-800" />

          {/* Desktop Case Switcher Dropdown */}
          <div className="relative hidden sm:block">
            {currentCase ? (
              <button
                onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-200 transition min-h-[38px]"
              >
                <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold">{currentCase.caseNumber}:</span>
                <span className="truncate max-w-[140px]">{currentCase.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={onOpenNewCase}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-900/40 transition min-h-[38px]"
              >
                <Plus className="w-3.5 h-3.5" /> + CREATE NEW CASE
              </button>
            )}

            {isCaseDropdownOpen && currentCase && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Select Case Workspace
                </div>
                {cases.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentCase(c);
                      setIsCaseDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                      c.id === currentCase.id ? 'bg-blue-950/40 text-blue-400 font-semibold' : 'text-slate-300'
                    }`}
                  >
                    <span className="truncate">{c.caseNumber} - {c.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 font-mono font-bold">{c.priority}</span>
                  </button>
                ))}
                <div className="border-t border-slate-800 mt-2 pt-2 px-2">
                  <button
                    onClick={() => {
                      setIsCaseDropdownOpen(false);
                      onOpenNewCase();
                    }}
                    className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> {t('newCase')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Uncluttered Controls */}
        <div className="flex items-center gap-2">
          {/* AI Intelligence Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="hidden xs:inline">AI</span> ONLINE
          </div>

          {/* India 112 Emergency Quick Trigger (Desktop & Mobile Compact) */}
          <button
            onClick={openEmergencyModal}
            className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded-xl font-mono text-xs font-extrabold flex items-center gap-1 transition min-h-[38px]"
            title="India Emergency 112"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span>112</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono font-semibold text-slate-200 transition min-h-[38px]"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language}</span>
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50">
                {(['EN', 'TA', 'HI'] as Language[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
                      language === lang ? 'bg-blue-950 text-blue-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{langNames[lang]}</span>
                    <span className="font-mono text-[10px] text-slate-500">{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Only Extra Controls */}
          {!isDemoMode && (
            <button
              onClick={enterDemoMode}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono font-semibold text-amber-400 transition min-h-[38px]"
              title="Explore Fictional Demo Case"
            >
              <Compass className="w-3.5 h-3.5" /> DEMO
            </button>
          )}

          <button
            onClick={toggleDataSaver}
            className={`hidden md:flex p-2 rounded-xl border text-xs transition min-h-[38px] min-w-[38px] items-center justify-center ${
              dataSaver ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title={dataSaver ? t('dataSaverOn') : t('dataSaverOff')}
          >
            <Database className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleTheme}
            className="hidden md:flex p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition min-h-[38px] min-w-[38px] items-center justify-center"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
          </button>
        </div>
      </header>
    </>
  );
};
