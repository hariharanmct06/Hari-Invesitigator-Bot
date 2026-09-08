import React, { useState } from 'react';
import { QualityMetrics, EvidenceCategory } from '../../types/investigation';
import { Check, RefreshCw, Tag, FileText, Shield, Clock, HardDrive, Maximize2, AlertCircle } from 'lucide-react';

interface Props {
  capturedMediaUrl: string;
  category: EvidenceCategory;
  qualityMetrics: QualityMetrics;
  onRetake: () => void;
  onConfirm: (data: { title: string; description: string; notes: string; tags: string[] }) => void;
}

export const EvidenceReviewModal: React.FC<Props> = ({
  capturedMediaUrl,
  category,
  qualityMetrics,
  onRetake,
  onConfirm
}) => {
  const [title, setTitle] = useState<string>(`Evidence Capture - ${new Date().toLocaleTimeString()}`);
  const [description, setDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([category, 'Field Capture']);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tToRemove: string) => {
    setTags(tags.filter(t => t !== tToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm({ title, description, notes, tags });
    }, 300);
  };

  const now = new Date();
  const timestampStr = now.toISOString().replace('T', ' ').substring(0, 19);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 overflow-y-auto">
      {/* Header */}
      <div className="w-full max-w-3xl flex items-center justify-between py-3 px-5 bg-slate-900 border border-slate-800 rounded-xl mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            EVIDENCE CAPTURE REVIEW
          </h2>
          <p className="text-xs text-slate-400">Review quality, append notes, and set tags before committing to vault.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Pending Verification
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-4">
        {/* Left Column - Large Preview & Quality Badge */}
        <div className="flex flex-col gap-3">
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center min-h-[300px] shadow-2xl">
            {category === 'VIDEO' ? (
              <video src={capturedMediaUrl} controls className="max-h-[350px] w-full object-contain" />
            ) : category === 'AUDIO' ? (
              <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <FileText className="w-8 h-8" />
                </div>
                <audio src={capturedMediaUrl} controls className="w-full mt-4" />
              </div>
            ) : (
              <img src={capturedMediaUrl} alt="Captured Evidence" className="max-h-[380px] w-full object-contain" />
            )}
            <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-slate-300 border border-slate-700">
              {category} • 1080p EXIF
            </span>
          </div>

          {/* Quality Assessment Box */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-xs flex flex-col gap-2">
            <div className="flex items-center justify-between font-medium text-slate-200">
              <span>CAPTURE QUALITY SCORE</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                qualityMetrics.score >= 85 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {qualityMetrics.score} / 100
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Time: {timestampStr}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                <span>Size: ~2.4 MB</span>
              </div>
              <div>Lighting: <strong className="text-slate-200">{qualityMetrics.lighting}</strong></div>
              <div>Tilt: <strong className="text-slate-200">{qualityMetrics.tiltAngle.toFixed(1)}°</strong></div>
            </div>
          </div>
        </div>

        {/* Right Column - Context Form */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">EVIDENCE TITLE</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">DESCRIPTION / CONTEXT</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={2}
                placeholder="Where and why was this evidence captured?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">INITIAL INVESTIGATOR NOTE</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                placeholder="Observations, officer statement, or immediate notes..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">TAGS</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  placeholder="Add tag (e.g. Plate, CCTV)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 bg-blue-950/60 border border-blue-800/80 text-blue-300 text-xs px-2.5 py-0.5 rounded-md">
                    <Tag className="w-3 h-3" /> {t}
                    <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-400 ml-1">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800 mt-2">
            <button
              type="button"
              onClick={onRetake}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" /> RETAKE
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/30"
            >
              <Check className="w-4 h-4" /> USE THIS EVIDENCE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
