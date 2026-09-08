import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { PhoneCall, ShieldAlert, X, AlertCircle, ExternalLink } from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, closeEmergencyModal, t } = useInvestigation();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeEmergencyModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">{t('emergencyAssistance')}</h3>
            <p className="text-xs text-slate-400">Official National Emergency Directory</p>
          </div>
        </div>

        {/* 112 Nationwide Call Action Card */}
        <div className="bg-gradient-to-r from-red-950/60 to-slate-900 border border-red-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-red-400">UNIFIED EMERGENCY NUMBER</span>
              <h4 className="text-2xl font-black text-white">112</h4>
            </div>
            <a
              href="tel:112"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-900/50 active:scale-95 transition"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>{t('call112')}</span>
            </a>
          </div>
          <p className="text-[11px] text-red-200/90 leading-relaxed">
            {t('emergencyDesc')}
          </p>
        </div>

        {/* Individual Emergency Numbers Breakdown */}
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-semibold">{t('police')}</span>
            <a href="tel:100" className="text-blue-400 font-mono font-bold hover:underline">100</a>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-semibold">{t('ambulance')}</span>
            <a href="tel:108" className="text-emerald-400 font-mono font-bold hover:underline">108</a>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-slate-300 font-semibold">{t('fire')}</span>
            <a href="tel:101" className="text-amber-400 font-mono font-bold hover:underline">101</a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-start gap-2 text-[11px] text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t('emergencyDisclaimer')}</p>
        </div>
      </div>
    </div>
  );
};
