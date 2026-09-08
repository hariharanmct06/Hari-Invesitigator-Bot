import React from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { FolderPlus, Upload, Compass, FolderKanban } from 'lucide-react';

interface Props {
  onOpenNewCase: () => void;
}

export const EmptyWorkspace: React.FC<Props> = ({ onOpenNewCase }) => {
  const { enterDemoMode } = useInvestigation();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-blue-500/40 shadow-xl shadow-blue-900/50 mx-auto bg-slate-950 p-0.5">
        <img src="/logo.jpg" alt="Hari Investigator AI Logo" className="w-full h-full object-cover rounded-xl" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-extrabold text-white">YOUR INVESTIGATION WORKSPACE</h2>
        <p className="text-xs font-semibold text-slate-400">No cases have been created yet.</p>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Start your first investigation by creating a case file or exploring the demo environment.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onOpenNewCase}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 transition active:scale-95"
        >
          <FolderPlus className="w-4 h-4" /> + CREATE NEW CASE
        </button>

        <button
          onClick={onOpenNewCase}
          className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition"
        >
          <Upload className="w-4 h-4 text-slate-400" /> IMPORT CASE DATA
        </button>

        <button
          onClick={enterDemoMode}
          className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition"
        >
          <Compass className="w-4 h-4 text-blue-400" /> EXPLORE DEMO
        </button>
      </div>
    </div>
  );
};
