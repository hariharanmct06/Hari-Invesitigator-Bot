import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Lead, LeadPriority, LeadStatus } from '../../types/investigation';
import { Compass, Plus, CheckCircle, Clock, ShieldAlert, ArrowUpRight } from 'lucide-react';

export const LeadManager: React.FC = () => {
  const { leads, addLead, updateLeadStatus, currentCase } = useInvestigation();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [priority, setPriority] = useState<LeadPriority>('HIGH');
  const [action, setAction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newL: Lead = {
      id: `lead-${Date.now()}`,
      caseId: currentCase.id,
      title,
      reason,
      priority,
      status: 'NEW',
      supportingEvidenceIds: [],
      confidence: 85,
      verificationAction: action,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    addLead(newL);
    setShowModal(false);
    setTitle('');
    setReason('');
    setAction('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-400" /> INVESTIGATION LEADS MANAGEMENT
          </h2>
          <p className="text-xs text-slate-400">
            Actionable verification tasks generated from evidence discrepancies & AI inferences.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-900/40"
        >
          <Plus className="w-4 h-4" /> CREATE LEAD
        </button>
      </div>

      {/* Add Lead Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" /> CREATE INVESTIGATION LEAD
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">LEAD TITLE</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">PRIORITY</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as LeadPriority)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">REASONING BASIS</label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  rows={2}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">RECOMMENDED VERIFICATION ACTION</label>
                <textarea
                  value={action}
                  onChange={e => setAction(e.target.value)}
                  rows={2}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leads.map(l => (
          <div key={l.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  l.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {l.priority} PRIORITY
                </span>

                <select
                  value={l.status}
                  onChange={e => updateLeadStatus(l.id, e.target.value as LeadStatus)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 font-semibold"
                >
                  <option value="NEW">Status: NEW</option>
                  <option value="REVIEWING">Status: REVIEWING</option>
                  <option value="VERIFIED">Status: VERIFIED</option>
                  <option value="DISMISSED">Status: DISMISSED</option>
                  <option value="COMPLETED">Status: COMPLETED</option>
                </select>
              </div>

              <h4 className="text-sm font-bold text-white">{l.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{l.reason}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1 text-xs">
              <span className="text-[10px] font-mono text-blue-400 font-bold block">VERIFICATION ACTION:</span>
              <p className="text-slate-200">{l.verificationAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
