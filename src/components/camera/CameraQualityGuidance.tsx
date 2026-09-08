import React from 'react';
import { QualityMetrics } from '../../types/investigation';
import { Sun, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  metrics: QualityMetrics;
  mode: string;
}

export const CameraQualityGuidance: React.FC<Props> = ({ metrics, mode }) => {
  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-full px-4 py-1.5 flex items-center gap-3 text-xs shadow-2xl text-slate-200 pointer-events-none transition-all">
      <div className="flex items-center gap-1.5">
        <Sun className={`w-3.5 h-3.5 ${metrics.lighting === 'EXCELLENT' || metrics.lighting === 'GOOD' ? 'text-emerald-400' : 'text-amber-400'}`} />
        <span>Lighting: <strong className="text-white">{metrics.lighting}</strong></span>
      </div>

      <div className="w-px h-3 bg-slate-700" />

      <div className="flex items-center gap-1.5">
        {metrics.focusStable ? (
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
        )}
        <span>Focus: <strong className="text-white">{metrics.focusStable ? 'Stable' : 'Adjusting'}</strong></span>
      </div>

      {Math.abs(metrics.tiltAngle) > 3 && (
        <>
          <div className="w-px h-3 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Tilt: <strong>{metrics.tiltAngle.toFixed(1)}°</strong></span>
          </div>
        </>
      )}

      {mode === 'DOCUMENT' && (
        <>
          <div className="w-px h-3 bg-slate-700" />
          <div className="flex items-center gap-1.5 text-blue-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Edge Auto-detect</span>
          </div>
        </>
      )}
    </div>
  );
};
