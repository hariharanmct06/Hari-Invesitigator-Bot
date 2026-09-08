import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { sendQueryToAIChat } from '../../services/aiService';
import { Bot, Send, Sparkles, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPanelDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentCase, evidence, leads } = useInvestigation();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; confidence?: number; evidenceRef?: string }>>([
    {
      sender: 'AI',
      text: currentCase
        ? `Hello Inspector. I am **Hari AI Analyst**, initialized with context for **${currentCase.caseNumber}: ${currentCase.title}**.\n\nI have evaluated ${evidence.length} evidence items and identified ${leads.length} active investigation leads. How can I assist your investigation?`
        : 'Hello Inspector. I am **Hari AI Analyst**. Create or select a case to begin case-aware evidence analysis.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'SUMMARIZE CASE',
    'FIND INCONSISTENCIES',
    'BUILD TIMELINE',
    'IDENTIFY EVIDENCE GAPS',
    'FIND CONNECTIONS',
    'SUGGEST NEXT VERIFICATION STEPS'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'USER', text: query }]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    const response = await sendQueryToAIChat(query, currentCase, evidence);
    setIsTyping(false);

    if (response.success && response.data) {
      let displayText = response.data.summaryText || '';

      if (!displayText) {
        if (response.data.observed && response.data.observed.length > 0) {
          displayText = `### Observed Facts:\n` + response.data.observed.map(o => `- ${o}`).join('\n');
        }
        if (response.data.inference && response.data.inference.length > 0) {
          displayText += `\n\n### Inferences:\n` + response.data.inference.map(i => `- ${i}`).join('\n');
        }
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: displayText || 'Analysis complete.',
          confidence: response.data?.confidence === 'HIGH' ? 95 : 82,
          evidenceRef: response.data?.supportingEvidenceIds?.[0]
        }
      ]);
    } else {
      setMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: response.error || 'Unable to connect to secure AI proxy service.'
        }
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
              HARI AI ANALYST
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">Case-aware investigation intelligence</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Case Context Pill */}
      <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="truncate">Context: {currentCase ? currentCase.caseNumber : 'None'}</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live
        </span>
      </div>

      {/* Suggested Prompts horizontal bar */}
      <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2">
        {suggestedPrompts.map(p => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-800/80 text-[10px] font-semibold text-blue-300 whitespace-nowrap hover:bg-blue-900 transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> {p}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-xs space-y-2 ${
                m.sender === 'USER'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-lg'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

              {m.confidence && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-blue-400">Confidence: {m.confidence}%</span>
                  {m.evidenceRef && (
                    <span className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      Ref: {m.evidenceRef}
                    </span>
                  )}
                </div>
              )}
            </div>

            {m.sender === 'AI' && (
              <span className="text-[9px] text-slate-500 mt-1 pl-1">
                AI Inference level 3 — Requires human verification
              </span>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-2xl border border-slate-800 w-fit">
            <Bot className="w-4 h-4 text-blue-400 animate-spin" />
            <span>Hari AI is analyzing case evidence...</span>
          </div>
        )}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Ask anything about this case..."
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => handleSend()}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition shadow-lg shadow-blue-900/40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
