import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Language } from '../../data/localization';
import {
  Shield,
  Camera,
  Sun,
  Moon,
  Info,
  FolderKanban,
  ChevronDown,
  Plus,
  Globe,
  Database,
  PhoneCall,
  Compass,
  LogOut
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
    dataSaver,
    toggleDataSaver,
    isDemoMode,
    enterDemoMode,
    exitDemoMode,
    openCamera,
    openEmergencyModal,
    setIsAboutOpen,
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
      {/* Sticky Demo Mode Banner when active */}
      {isDemoMode && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 flex items-center justify-between text-xs text-amber-300 font-semibold z-40">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>DEMO MODE — FICTIONAL INVESTIGATION DATA</span>
          </div>
          <button
            onClick={exitDemoMode}
            className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-bold rounded-md flex items-center gap-1 hover:bg-amber-400 transition"
          >
            <LogOut className="w-3 h-3" /> EXIT DEMO
          </button>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 md:px-4 py-2.5 flex items-center justify-between">
        {/* Brand & Active Case Selector */}
        <div className="flex items-center gap-3 md:gap-4">
          <div
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border border-blue-500/40 shadow-lg shadow-blue-900/50 group-hover:scale-105 transition bg-slate-900 shrink-0">
              <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xs md:text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                HARI INVESTIGATOR <span className="text-blue-400 font-mono text-[10px] md:text-xs">AI</span>
              </h1>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium truncate max-w-[120px] md:max-w-none">
                Hari Bot & Business Solutions
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-800" />

          {/* Case Switcher Dropdown */}
          <div className="relative hidden sm:block">
            {currentCase ? (
              <button
                onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-200 transition"
              >
                <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-semibold">{currentCase.caseNumber}:</span>
                <span className="truncate max-w-[140px]">{currentCase.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={onOpenNewCase}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow"
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
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{c.priority}</span>
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

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Prominent Capture Evidence Button */}
          <button
            onClick={openCamera}
            className="px-3 py-1.5 md:px-3.5 md:py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition shadow-lg shadow-blue-900/40 active:scale-95"
          >
            <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" />
            <span className="hidden sm:inline">{t('captureEvidence')}</span>
            <span className="sm:hidden">{t('capture')}</span>
          </button>

          {/* India 112 Emergency Quick Trigger */}
          <button
            onClick={openEmergencyModal}
            className="px-2.5 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded-xl font-mono text-xs font-extrabold flex items-center gap-1 transition"
            title="India Emergency 112"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">112</span>
          </button>

          {/* Demo Mode Button when not active */}
          {!isDemoMode && (
            <button
              onClick={enterDemoMode}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono font-semibold text-blue-400 transition"
              title="Explore Fictional Demo Case"
            >
              <Compass className="w-3.5 h-3.5" /> DEMO
            </button>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono font-semibold text-slate-200 transition"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
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
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-800 flex items-center justify-between ${
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

          {/* Data Saver Mode Toggle */}
          <button
            onClick={toggleDataSaver}
            className={`p-2 rounded-xl border text-xs transition ${
              dataSaver ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title={dataSaver ? t('dataSaverOn') : t('dataSaverOff')}
          >
            <Database className="w-3.5 h-3.5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
          </button>

          {/* About Button */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className="hidden sm:block p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-300 hover:text-white transition"
            title="About HARI INVESTIGATOR AI"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </header>
    </>
  );
};
