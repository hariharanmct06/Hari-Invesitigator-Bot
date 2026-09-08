import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Evidence } from '../../types/investigation';
import { MediaAnalysisView } from './MediaAnalysisView';
import {
  HardDrive,
  Grid,
  List,
  CheckCircle,
  Search,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const EvidenceVault: React.FC = () => {
  const { evidence, aiAnalyses, openCamera } = useInvestigation();

  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [selectedEvidenceForAnalysis, setSelectedEvidenceForAnalysis] = useState<Evidence | null>(null);

  const filteredEvidence = evidence.filter(e => {
    if (filter === 'IMAGES' && e.category !== 'IMAGE') return false;
    if (filter === 'VIDEOS' && e.category !== 'VIDEO') return false;
    if (filter === 'AUDIO' && e.category !== 'AUDIO') return false;
    if (filter === 'DOCUMENTS' && e.category !== 'DOCUMENT') return false;
    if (filter === 'VERIFIED' && e.status !== 'HUMAN_VERIFIED') return false;
    if (filter === 'NEEDS_REVIEW' && e.status !== 'NEEDS_REVIEW') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.evidenceId.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Media Analysis Modal */}
      {selectedEvidenceForAnalysis && (
        <MediaAnalysisView
          evidence={selectedEvidenceForAnalysis}
          analysis={aiAnalyses[selectedEvidenceForAnalysis.id]}
          onClose={() => setSelectedEvidenceForAnalysis(null)}
        />
      )}

      {/* Vault Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" /> FORENSIC EVIDENCE VAULT
          </h2>
          <p className="text-xs text-slate-400">
            Immutable cryptographic records, EXIF metadata, and automated AI visual analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Search Box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search evidence ID or title..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('GRID')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'GRID' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'LIST' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {['ALL', 'IMAGES', 'VIDEOS', 'AUDIO', 'DOCUMENTS', 'VERIFIED', 'NEEDS_REVIEW'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-extrabold whitespace-nowrap transition border tactile-btn min-h-[40px] ${
              filter === tab
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-400 text-white shadow-md shadow-blue-900/50'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvidence.length === 0 && (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <HardDrive className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">NO EVIDENCE RECORDED YET</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            This case file does not contain any evidence matching the selected filter.
          </p>
          <button
            onClick={openCamera}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
          >
            CAPTURE EVIDENCE
          </button>
        </div>
      )}

      {/* Evidence Cards Display */}
      {viewMode === 'GRID' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map(e => (
            <div
              key={e.id}
              onClick={() => setSelectedEvidenceForAnalysis(e)}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden cursor-pointer transition hover:shadow-xl hover:shadow-blue-950/20 group flex flex-col justify-between"
            >
              {/* Media Preview Box */}
              <div className="relative h-44 bg-slate-950 flex items-center justify-center overflow-hidden">
                {e.category === 'VIDEO' ? (
                  <video src={e.fileUrl} className="w-full h-full object-cover group-hover:scale-105 transition" />
                ) : e.category === 'AUDIO' ? (
                  <div className="p-4 flex flex-col items-center gap-2">
                    <img src={e.fileUrl} alt="Waveform" className="h-20 object-contain" />
                    <span className="text-xs font-mono text-blue-400">AUDIO DISPATCH RECORDING</span>
                  </div>
                ) : (
                  <img src={e.fileUrl} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-blue-400 border border-slate-800">
                    {e.evidenceId}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {e.status === 'HUMAN_VERIFIED' ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> REVIEW
                    </span>
                  )}
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition line-clamp-1">
                  {e.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {e.description}
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Captured: {e.capturedAt}</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Analysis Ready
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800">
          {filteredEvidence.map(e => (
            <div
              key={e.id}
              onClick={() => setSelectedEvidenceForAnalysis(e)}
              className="p-4 hover:bg-slate-850 cursor-pointer flex items-center justify-between gap-4 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src={e.fileUrl} alt={e.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{e.evidenceId}</span>
                    <span className="text-xs font-bold text-slate-200">{e.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{e.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="font-mono text-slate-500 hidden md:inline">{e.capturedAt}</span>
                {e.status === 'HUMAN_VERIFIED' ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                    VERIFIED
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 font-bold text-[10px]">
                    REVIEW
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
