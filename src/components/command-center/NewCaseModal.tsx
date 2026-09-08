import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Case, CasePriority } from '../../types/investigation';
import { X, Check, FolderPlus, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCaseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addCase } = useInvestigation();

  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [caseNumber, setCaseNumber] = useState(`CASE #${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [priority, setPriority] = useState<CasePriority>('HIGH');
  const [leadInvestigator, setLeadInvestigator] = useState('Inspector M. Vance');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().substring(0, 10));
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [initialTag, setInitialTag] = useState('');
  const [tags, setTags] = useState<string[]>(['Field Investigation', 'High Priority']);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !title.trim()) return;
    if (step === 2 && (!location.trim() || !description.trim())) return;
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newC: Case = {
      id: `case-${Date.now()}`,
      caseNumber,
      title,
      description,
      incidentDate,
      location,
      priority,
      status: 'ACTIVE',
      leadInvestigator,
      tags,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    addCase(newC);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative flex flex-col justify-between max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header & Step Indicator */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
            <FolderPlus className="w-4 h-4" /> NEW INVESTIGATION INTAKE WIZARD
          </div>
          <h2 className="text-lg font-extrabold text-white">
            {step === 1 && 'STEP 01 — CASE INFORMATION'}
            {step === 2 && 'STEP 02 — INCIDENT CONTEXT'}
            {step === 3 && 'STEP 03 — INITIAL EVIDENCE & TAGS'}
            {step === 4 && 'STEP 04 — REVIEW & LAUNCH WORKSPACE'}
          </h2>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s <= step ? 'bg-blue-600' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Forms */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CASE NUMBER</label>
                <input
                  type="text"
                  value={caseNumber}
                  onChange={e => setCaseNumber(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CASE TITLE</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Sector 4 Warehouse Incident"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PRIORITY</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as CasePriority)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LEAD INVESTIGATOR</label>
                  <input
                    type="text"
                    value={leadInvestigator}
                    onChange={e => setLeadInvestigator(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">INCIDENT DATE</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={e => setIncidentDate(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LOCATION / VENUE</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Loading Dock B, Building 4"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">INCIDENT SUMMARY</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Thorough description of incident background, suspected breach, or reporting facts..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center space-y-2">
                <ShieldAlert className="w-8 h-8 text-blue-400 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-200">Initial Evidence Workspace Ready</h4>
                <p className="text-[11px] text-slate-400">
                  You can capture evidence using the camera tool immediately after launching the workspace.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">INITIAL CLASSIFICATION TAGS</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={initialTag}
                    onChange={e => setInitialTag(e.target.value)}
                    placeholder="Add tag..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (initialTag.trim()) {
                        setTags([...tags, initialTag.trim()]);
                        setInitialTag('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map(t => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md bg-blue-950/60 border border-blue-800 text-blue-300 text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs animate-in fade-in duration-200">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Case Number:</span>
                <span className="font-mono text-blue-400 font-bold">{caseNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Title:</span>
                <span className="font-bold text-white">{title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Priority:</span>
                <span className="font-bold text-amber-400">{priority}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-200">{location}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Summary:</span>
                <p className="text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">{description}</p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800 mt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-900/40"
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/40"
              >
                <Check className="w-4 h-4" /> LAUNCH INVESTIGATION WORKSPACE
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
