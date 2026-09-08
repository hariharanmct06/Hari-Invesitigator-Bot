import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { StructuredAIAnswer } from '../../types/investigation';
import { sendQueryToAIChat } from '../../services/aiService';
import { Bot, Sparkles, Send, ShieldAlert, FileText, CheckCircle, Info } from 'lucide-react';

export const HariAIAnalyst: React.FC = () => {
  const { currentCase, evidence } = useInvestigation();
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text?: string; structured?: StructuredAIAnswer }>>([
    {
      sender: 'AI',
      text: currentCase
        ? `HARI AI ANALYST INITIALIZED\n\nCase File: **${currentCase.caseNumber} - ${currentCase.title}**\n\n${
            evidence.length > 0
              ? `Loaded ${evidence.length} evidence records. Select a prompt or ask any question to run structured analysis.`
              : 'No evidence records captured in this case yet. Ingestion of media or documents is required for automated inference.'
          }`
        : 'HARI AI ANALYST INITIALIZED\n\nNo active case selected. Create a case file to begin analysis.'
    }
  ]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    'SUMMARIZE CASE',
    'FIND INCONSISTENCIES',
    'BUILD TIMELINE',
    'IDENTIFY EVIDENCE GAPS',
    'FIND CONNECTIONS',
    'SUGGEST VERIFICATION STEPS'
  ];

  const handleRunPrompt = async (pText: string) => {
    if (!pText.trim()) return;
    setMessages(prev => [...prev, { sender: 'USER', text: pText }]);
    setQuery('');
    setIsTyping(true);

    const response = await sendQueryToAIChat(pText, currentCase, evidence);
    setIsTyping(false);

    if (response.success && response.data) {
      if (response.data.summaryText && (!response.data.observed || response.data.observed.length === 0)) {
        setMessages(prev => [...prev, { sender: 'AI', text: response.data?.summaryText }]);
      } else {
        const structuredRes: StructuredAIAnswer = {
          observed: response.data.observed || [],
          inference: response.data.inference || [],
          unknown: response.data.unknown || [],
          supportingEvidenceIds: response.data.supportingEvidenceIds || [],
          confidence: response.data.confidence || 'MEDIUM',
          verificationRequired: response.data.verificationRequired ?? true
        };
        setMessages(prev => [
          ...prev,
          {
            sender: 'AI',
            text: response.data?.summaryText,
            structured: structuredRes
          }
        ]);
      }
    } else {
      setMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: response.error || 'An error occurred while calling the secure AI proxy.'
        }
      ]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
          <Bot className="w-4 h-4" /> HARI AI ANALYST WORKSPACE
        </div>
        <h2 className="text-lg font-extrabold text-white">Structured Case-Aware Forensic Intelligence</h2>
        <p className="text-xs text-slate-400">
          All responses distinguish Observed Facts, Inferences, and Unknowns. Zero fabrications.
        </p>
      </div>

      {/* Suggested Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {prompts.map(p => (
          <button
            key={p}
            onClick={() => handleRunPrompt(p)}
            className="p-3.5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl text-left transition group"
          >
            <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> PROMPT
            </span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300 transition">
              {p}
            </span>
          </button>
        ))}
      </div>

      {/* Main Interactive Chat Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 min-h-[400px] flex flex-col justify-between space-y-4 shadow-xl">
        <div className="space-y-4 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}>
              {m.text && (
                <div className={`max-w-2xl p-4 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'USER' ? 'bg-blue-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}>
                  {m.text}
                </div>
              )}

              {/* Structured AI Response Block */}
              {m.structured && (
                <div className="max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs shadow-xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono font-bold text-blue-400">STRUCTURED AI ANALYSIS</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                      CONFIDENCE: {m.structured.confidence}
                    </span>
                  </div>

                  {/* Observed */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">1. OBSERVED FACTS</span>
                    <ul className="space-y-0.5 text-slate-200">
                      {m.structured.observed.map((o, i) => (
                        <li key={i} className="flex items-start gap-1"><span>•</span> <span>{o}</span></li>
                      ))}
                    </ul>
                  </div>

                  {/* Inference */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase block">2. AI INFERENCES (LEVEL 3)</span>
                    <ul className="space-y-0.5 text-slate-300">
                      {m.structured.inference.map((inf, i) => (
                        <li key={i} className="flex items-start gap-1"><span>•</span> <span>{inf}</span></li>
                      ))}
                    </ul>
                  </div>

                  {/* Unknown */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">3. UNKNOWN INFORMATION</span>
                    <ul className="space-y-0.5 text-slate-400">
                      {m.structured.unknown.map((u, i) => (
                        <li key={i} className="flex items-start gap-1"><span>•</span> <span>{u}</span></li>
                      ))}
                    </ul>
                  </div>

                  {/* Supporting Evidence IDs & Verification */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Evidence: {m.structured.supportingEvidenceIds.join(', ')}</span>
                    <span className="text-amber-400 font-bold">
                      {m.structured.verificationRequired ? 'REQUIRES HUMAN VERIFICATION' : 'VERIFIED'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400 animate-spin" /> Hari AI Analyst is processing evidence...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 pt-3 border-t border-slate-800">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask Hari AI Analyst a custom investigation query..."
            onKeyDown={e => { if (e.key === 'Enter') handleRunPrompt(query); }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleRunPrompt(query)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-900/40"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
