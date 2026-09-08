import React, { useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { Bot, Sparkles, Send, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

export const HariAIAnalyst: React.FC = () => {
  const { currentCase, evidence, leads, aiAnalyses } = useInvestigation();
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; confidence?: number }>>([
    {
      sender: 'AI',
      text: `### HARI AI ANALYST INITIALIZED\n\nCase Context: **${currentCase.caseNumber} - ${currentCase.title}**\n\nI have evaluated ${evidence.length} evidence items and compiled 3 high-confidence forensic findings. Click any prompt below to run automated case analysis.`,
      confidence: 94
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
    'SUGGEST NEXT VERIFICATION STEPS'
  ];

  const handleRunPrompt = (pText: string) => {
    setMessages(prev => [...prev, { sender: 'USER', text: pText }]);
    setIsTyping(true);

    setTimeout(() => {
      let resp = '';
      let conf = 90;

      if (pText === 'SUMMARIZE CASE') {
        resp = `### Case Summary: ${currentCase.caseNumber}\n\n- **Primary Breach Event**: Forced opening of Dock B Door at 22:18:42 UTC.\n- **Primary Vehicle**: Dark Blue SUV plate **7XYZ994** recorded at Gate 2.\n- **Verification Status**: 2 Level 1 facts verified by human investigator.`;
        conf = 96;
      } else if (pText === 'FIND INCONSISTENCIES') {
        resp = `### Detected Discrepancy:\n\n- **Arthur Pendelton's Statement** recorded alarm at **22:25**.\n- **CCTV Frame (EVD-2026-001-001)** proves door alarm triggered at **22:18:42**.\n\n*Action Item*: Re-interview manager regarding 6-minute gap.`;
        conf = 92;
      } else if (pText === 'IDENTIFY EVIDENCE GAPS') {
        resp = `### Evidence Gap Analysis:\n\n1. **Driver Identity**: High tint on SUV windows obscured face.\n2. **Internal Staging Bay**: CAM-05 offline for maintenance.\n\n*Recommendation*: Query Route 9 highway license reader cameras.`;
        conf = 88;
      } else {
        resp = `AI Analysis completed for prompt "${pText}". Evaluated ${evidence.length} evidence records and mapped 12 graph entity relationships.`;
        conf = 85;
      }

      setMessages(prev => [...prev, { sender: 'AI', text: resp, confidence: conf }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-1">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold">
          <Bot className="w-4 h-4" /> HARI AI ANALYST WORKSPACE
        </div>
        <h2 className="text-lg font-extrabold text-white">Case-Aware Investigation Intelligence</h2>
        <p className="text-xs text-slate-400">
          Automated reasoning engine. All inferences require human verification.
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 min-h-[400px] flex flex-col justify-between space-y-4">
        <div className="space-y-4 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-2xl p-4 rounded-2xl text-xs space-y-2 ${
                m.sender === 'USER' ? 'bg-blue-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
                {m.confidence && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-blue-400">Model Confidence: {m.confidence}%</span>
                    <span>Level 3 AI Inference</span>
                  </div>
                )}
              </div>
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
