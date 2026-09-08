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
            className="p-3.5 metallic-card rounded-xl text-left transition tactile-btn min-h-[56px] group"
          >
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> PROMPT
            </span>
            <span className="text-xs font-extrabold text-slate-200 group-hover:text-amber-300 transition">
              {p}
            </span>
          </button>
        ))}
      </div>

      {/* Main Interactive Chat Log */}
      <div className="metallic-card rounded-2xl p-4 sm:p-5 min-h-[400px] flex flex-col justify-between space-y-4 shadow-2xl">
        <div className="space-y-4 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}>
              {m.text && (
                <div className={`max-w-2xl p-4 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'USER' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md' : 'bg-slate-950/90 border border-slate-800 text-slate-200'
                }`}>
                  {m.text}
                </div>
              )}

              {/* Structured AI Response Block */}
              {m.structured && (
                <div className="max-w-2xl bg-slate-950 border border-slate-800/90 rounded-2xl p-4 space-y-3 text-xs shadow-xl w-full">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400">STRUCTURED AI ANALYSIS</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 rounded">
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
                  <div className="space-y-1 pt-1 border-t border-slate-900">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase block">2. REASONABLE INFERENCES</span>
                    <ul className="space-y-0.5 text-slate-300">
                      {m.structured.inference.map((inf, i) => (
                        <li key={i} className="flex items-start gap-1"><span>•</span> <span>{inf}</span></li>
                      ))}
                    </ul>
                  </div>

                  {/* Unknown */}
                  <div className="space-y-1 pt-1 border-t border-slate-900">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">3. UNKNOWN CONTEXT</span>
                    <ul className="space-y-0.5 text-amber-200/90">
                      {m.structured.unknown.map((u, i) => (
                        <li key={i} className="flex items-start gap-1"><span>•</span> <span>{u}</span></li>
                      ))}
                    </ul>
                  </div>

                  {/* Supporting Evidence References */}
                  {m.structured.supportingEvidenceIds.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Supporting Evidence:</span>
                      <div className="flex flex-wrap gap-1 font-mono">
                        {m.structured.supportingEvidenceIds.map(eId => (
                          <span key={eId} className="bg-slate-900 border border-slate-800 text-blue-400 px-1.5 py-0.5 rounded font-bold">
                            {eId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <Bot className="w-4 h-4 text-amber-400 animate-spin" /> Hari AI Analyst is evaluating evidence...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 pt-3 border-t border-slate-800/80">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask Hari AI Analyst a custom investigation query..."
            onKeyDown={e => { if (e.key === 'Enter') handleRunPrompt(query); }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 min-h-[44px]"
          />
          <button
            onClick={() => handleRunPrompt(query)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-900/50 tactile-btn min-h-[44px]"
          >
            <Send className="w-4 h-4 text-amber-300" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
