import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { InvestigationEvent } from '../../types/investigation';
import { Clock, MapPin, Plus, Sparkles, CheckCircle } from 'lucide-react';

export const InvestigationTimeline: React.FC = () => {
  const { events, addEvent, currentCase } = useInvestigation();
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState(new Date().toLocaleDateString() + ' • IST');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCase) return;
    const newEvt: InvestigationEvent = {
      id: `evt-${Date.now()}`,
      caseId: currentCase.id,
      timestamp,
      title,
      description,
      locationName,
      supportingEvidenceIds: [],
      confidence: 100,
      verified: true
    };
    addEvent(newEvt);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> INVESTIGATION TIMELINE
          </h2>
          <p className="text-xs text-slate-400">
            Chronological evidence sequence for {currentCase ? currentCase.caseNumber : 'Workspace'}. AI-suggested events flagged for review.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-900/40"
        >
          <Plus className="w-4 h-4" /> ADD EVENT
        </button>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-400" /> ADD TIMELINE EVENT
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">EVENT TITLE</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">TIMESTAMP (IST)</label>
                <input
                  type="text"
                  value={timestamp}
                  onChange={e => setTimestamp(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">LOCATION NAME</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={e => setLocationName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">DESCRIPTION</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Add Timeline Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <Clock className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">NO TIMELINE EVENTS RECORDED YET</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add timeline events to build a chronological sequence of evidence.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            + ADD FIRST EVENT
          </button>
        </div>
      )}

      {/* Horizontal Desktop Timeline */}
      {events.length > 0 && (
        <div className="hidden lg:block bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto no-scrollbar shadow-2xl">
          <div className="flex items-center gap-8 min-w-[900px] py-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2" />

            {events.map(evt => (
              <div key={evt.id} className="relative z-10 w-72 bg-slate-950 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 space-y-2 shrink-0 transition">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950 border border-blue-800 px-2 py-0.5 rounded">
                    {evt.timestamp}
                  </span>
                  {evt.isAiSuggested ? (
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> AI SUGGESTED — REQUIRES REVIEW
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" /> VERIFIED
                    </span>
                  )}
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{evt.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{evt.description}</p>

                {evt.locationName && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <MapPin className="w-3 h-3 text-slate-400" /> {evt.locationName}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Mobile Timeline */}
      {events.length > 0 && (
        <div className="lg:hidden bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
          <div className="relative pl-6 space-y-6 border-l-2 border-slate-800">
            {events.map(evt => (
              <div key={evt.id} className="relative space-y-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-slate-900" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-400">{evt.timestamp}</span>
                  {evt.isAiSuggested && (
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full">
                      AI SUGGESTED
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
