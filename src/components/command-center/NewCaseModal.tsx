import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Case, CasePriority, CaseType, IndianAddress, PersonRole } from '../../types/investigation';
import { X, Check, FolderPlus, ArrowRight, ArrowLeft, ShieldAlert, Camera, Upload, User, Plus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewCaseModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addCase, openCamera, cases } = useInvestigation();

  const [step, setStep] = useState<number>(1);

  // Step 1 - Case Identity
  const nextCaseNum = String(cases.length + 1).padStart(4, '0');
  const [caseNumber, setCaseNumber] = useState(`CASE-IN-${new Date().getFullYear()}-${nextCaseNum}`);
  const [title, setTitle] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('General Investigation');
  const [priority, setPriority] = useState<CasePriority>('HIGH');
  const [leadInvestigator, setLeadInvestigator] = useState('Inspector K. Sundaram');
  const [investigatorPhone, setInvestigatorPhone] = useState('+91 98765 43210');

  // Address
  const [stateName, setStateName] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Coimbatore');
  const [city, setCity] = useState('Coimbatore');
  const [locality, setLocality] = useState('Saibaba Colony');
  const [pinCode, setPinCode] = useState('641011');

  // Step 2 - Incident Context
  const [incidentDate, setIncidentDate] = useState(new Date().toLocaleDateString() + ' • IST');
  const [description, setDescription] = useState('');
  const [knownInput, setKnownInput] = useState('');
  const [knownInfoList, setKnownInfoList] = useState<string[]>([]);
  const [unknownInput, setUnknownInput] = useState('');
  const [unknownInfoList, setUnknownInfoList] = useState<string[]>(['Driver identity not established']);

  // Step 3 & 4 Initial Inputs
  const [initialPersonName, setInitialPersonName] = useState('');
  const [initialPersonRole, setInitialPersonRole] = useState<PersonRole>('Witness');
  const [peopleList, setPeopleList] = useState<Array<{ name: string; role: PersonRole }>>([]);

  const [tags, setTags] = useState<string[]>(['India Investigation', 'Tamil Nadu']);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !title.trim()) return;
    if (step === 2 && !description.trim()) return;
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const handleAddKnown = () => {
    if (knownInput.trim()) {
      setKnownInfoList([...knownInfoList, knownInput.trim()]);
      setKnownInput('');
    }
  };

  const handleAddUnknown = () => {
    if (unknownInput.trim()) {
      setUnknownInfoList([...unknownInfoList, unknownInput.trim()]);
      setUnknownInput('');
    }
  };

  const handleAddPerson = () => {
    if (initialPersonName.trim()) {
      setPeopleList([...peopleList, { name: initialPersonName.trim(), role: initialPersonRole }]);
      setInitialPersonName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const addressObj: IndianAddress = {
      country: 'India',
      state: stateName,
      district,
      city,
      locality,
      pinCode
    };

    const locationStr = `${locality}, ${city}, ${stateName} (${pinCode})`;

    const newC: Case = {
      id: `case-${Date.now()}`,
      caseNumber,
      title,
      caseType,
      description,
      incidentDate,
      location: locationStr,
      address: addressObj,
      priority,
      status: 'ACTIVE',
      leadInvestigator,
      investigatorPhone,
      knownInformation: knownInfoList,
      unknownInformation: unknownInfoList,
      openQuestions: ['Corroborate CCTV timestamps against gate log entries.'],
      progressStages: [
        { name: 'CASE SETUP', status: 'COMPLETED' },
        { name: 'EVIDENCE COLLECTION', status: 'IN_PROGRESS' },
        { name: 'EVIDENCE REVIEW', status: 'NOT_STARTED' },
        { name: 'TIMELINE CONSTRUCTION', status: 'NOT_STARTED' },
        { name: 'CONNECTION ANALYSIS', status: 'NOT_STARTED' },
        { name: 'VERIFICATION', status: 'NOT_STARTED' },
        { name: 'REPORTING', status: 'NOT_STARTED' }
      ],
      tags,
      createdAt: new Date().toLocaleDateString() + ' • IST',
      updatedAt: new Date().toLocaleDateString() + ' • IST'
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
            <FolderPlus className="w-4 h-4" /> GUIDED CASE CREATION WIZARD
          </div>
          <h2 className="text-lg font-extrabold text-white">
            {step === 1 && 'STEP 01 — CASE IDENTITY'}
            {step === 2 && 'STEP 02 — INCIDENT CONTEXT & UNKNOWNS'}
            {step === 3 && 'STEP 03 — INITIAL EVIDENCE INGESTION'}
            {step === 4 && 'STEP 04 — INITIAL PEOPLE & ENTITIES'}
            {step === 5 && 'STEP 05 — REVIEW & LAUNCH WORKSPACE'}
          </h2>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(s => (
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">AUTO CASE ID</label>
                  <input
                    type="text"
                    value={caseNumber}
                    onChange={e => setCaseNumber(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-blue-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CASE TYPE</label>
                  <select
                    value={caseType}
                    onChange={e => setCaseType(e.target.value as CaseType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="General Investigation">General Investigation</option>
                    <option value="Missing Person">Missing Person</option>
                    <option value="Fraud / Financial">Fraud / Financial</option>
                    <option value="Cyber Incident">Cyber Incident</option>
                    <option value="Theft">Theft</option>
                    <option value="Property Incident">Property Incident</option>
                    <option value="Document Investigation">Document Investigation</option>
                    <option value="Corporate Investigation">Corporate Investigation</option>
                    <option value="Digital Evidence">Digital Evidence</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CASE TITLE</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Coimbatore Warehouse Incident"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Indian Geographic Address */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">STATE</label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={e => setStateName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">DISTRICT</label>
                  <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">CITY / LOCALITY</label>
                  <input
                    type="text"
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WHAT HAPPENED? (SUMMARY)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Summarize the core incident details..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Known Information List */}
              <div>
                <label className="block text-xs font-semibold text-emerald-400 mb-1">KNOWN FACTS</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={knownInput}
                    onChange={e => setKnownInput(e.target.value)}
                    placeholder="Add verified known fact..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddKnown(); } }}
                  />
                  <button type="button" onClick={handleAddKnown} className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-xl font-medium">Add</button>
                </div>
                <div className="space-y-1">
                  {knownInfoList.map((k, idx) => (
                    <div key={idx} className="text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                      <span>• {k}</span>
                      <button type="button" onClick={() => setKnownInfoList(knownInfoList.filter((_, i) => i !== idx))} className="text-red-400">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unknown Information List */}
              <div>
                <label className="block text-xs font-semibold text-amber-400 mb-1">UNKNOWN DETAILS</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={unknownInput}
                    onChange={e => setUnknownInput(e.target.value)}
                    placeholder="Add unknown detail..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddUnknown(); } }}
                  />
                  <button type="button" onClick={handleAddUnknown} className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs rounded-xl font-medium">Add</button>
                </div>
                <div className="space-y-1">
                  {unknownInfoList.map((u, idx) => (
                    <div key={idx} className="text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
                      <span>• {u}</span>
                      <button type="button" onClick={() => setUnknownInfoList(unknownInfoList.filter((_, i) => i !== idx))} className="text-red-400">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center space-y-3">
                <Camera className="w-8 h-8 text-blue-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-200">CAPTURE EVIDENCE WITH CAMERA</h4>
                <p className="text-[11px] text-slate-400">
                  You can capture evidence items immediately after creating the case file.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openCamera();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  OPEN CAMERA NOW
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">ADD INITIAL PERSON</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={initialPersonName}
                    onChange={e => setInitialPersonName(e.target.value)}
                    placeholder="Person full name..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <select
                    value={initialPersonRole}
                    onChange={e => setInitialPersonRole(e.target.value as PersonRole)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2"
                  >
                    <option value="Witness">Witness</option>
                    <option value="Reporting Party">Reporting Party</option>
                    <option value="Person of Interest">Person of Interest</option>
                    <option value="Investigator">Investigator</option>
                    <option value="Unknown Individual">Unknown Individual</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddPerson}
                    className="px-3 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {peopleList.map((p, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs flex justify-between text-slate-200">
                    <span className="font-bold">{p.name}</span>
                    <span className="text-blue-400 font-mono text-[10px]">{p.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs animate-in fade-in duration-200">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Case ID:</span>
                <span className="font-mono text-blue-400 font-bold">{caseNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Title:</span>
                <span className="font-bold text-white">{title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Type:</span>
                <span className="text-blue-300">{caseType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-200">{locality}, {city}, {stateName} ({pinCode})</span>
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
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition tactile-btn min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-blue-900/50 tactile-btn min-h-[44px]"
              >
                Next <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            ) : (
              <button
                type="submit"
                className="py-2.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/50 tactile-btn min-h-[44px]"
              >
                <Check className="w-4 h-4" /> CREATE CASE
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
