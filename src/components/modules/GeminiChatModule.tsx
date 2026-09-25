import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  Paperclip,
  Mic,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Layers,
  Check,
} from 'lucide-react';

export const GeminiChatModule: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    applyActionProposal,
    rejectActionProposal,
    clearChat,
    readiness,
    profile,
  } = useApp();

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (textToSend?: string) => {
    const msg = textToSend || input;
    if (!msg.trim() || isSending) return;
    setIsSending(true);
    setInput('');
    try {
      await sendChatMessage(msg);
    } finally {
      setIsSending(false);
    }
  };

  const samplePrompts = [
    'What should I study today in my 2-hour evening block?',
    'Why is my placement readiness 72%?',
    'Create a 7-day preparation plan for JPMC.',
    'Test my DBMS normalization and indexing knowledge.',
    'Review my resume for ATS keywords.',
    'Ask me 3 technical questions about my Laptop Support Assistant project.',
    'How do I explain my AI-SHIELD federated learning capstone?',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto p-4 md:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#15121A] border border-[#30283A] mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#663399] to-[#2E1A47] flex items-center justify-center text-lg border border-[#A3779D]/40 shadow-md">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-[#F5F1F5]">Gemini Placement Coach</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs text-[#B9B0BD]">
              Grounded in Nayana&apos;s real data (CGPA 9.17, 4 target companies, 2h evening schedule).
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 rounded-xl text-[#82778A] hover:text-rose-400 hover:bg-[#1D1824] transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#0D0B10]/80 border border-[#30283A] mb-4">
        {chatMessages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-[#663399] text-white'
                    : 'bg-[#2E1A47] border border-[#663399]/40 text-[#E6C7E6]'
                }`}
              >
                {isUser ? 'BN' : '✨'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xl p-4 rounded-2xl text-xs md:text-sm leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-[#663399] text-white rounded-tr-none'
                    : 'bg-[#15121A] text-[#F5F1F5] border border-[#30283A] rounded-tl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Structured Action Proposal Confirmation Card */}
                {msg.actionProposal && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#0D0B10] border border-[#663399]/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6C7E6]">
                      <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                      <span>Gemini Function Action Proposal</span>
                    </div>

                    <p className="text-xs text-[#B9B0BD]">{msg.actionProposal.description}</p>

                    {msg.actionProposal.status === 'pending' ? (
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => applyActionProposal(msg.actionProposal!)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#663399] text-white font-semibold text-xs hover:bg-[#663399]/90 flex items-center gap-1.5 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Save Tasks</span>
                        </button>
                        <button
                          onClick={() => rejectActionProposal(msg.actionProposal!.actionId)}
                          className="px-3 py-1.5 rounded-lg bg-[#1D1824] text-[#B9B0BD] font-medium text-xs hover:text-white"
                        >
                          Dismiss
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Action approved and added to your planner.</span>
                      </div>
                    )}
                  </div>
                )}

                <p
                  className={`text-[9px] ${
                    isUser ? 'text-purple-200/80 text-right' : 'text-[#82778A]'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto py-2 shrink-0 no-scrollbar">
        {samplePrompts.slice(0, 4).map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-[#15121A] hover:bg-[#2E1A47] text-[#E6C7E6] text-xs font-medium border border-[#30283A] whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="relative flex items-center bg-[#15121A] border border-[#30283A] rounded-2xl px-4 py-3 focus-within:border-[#663399] mt-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask your Gemini Placement Coach anything about your preparation..."
          className="w-full bg-transparent text-sm text-[#F5F1F5] placeholder-[#82778A] focus:outline-none pr-24"
        />

        <div className="absolute right-3 flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-lg text-[#82778A] hover:text-[#E6C7E6] transition-colors"
            title="Attach Notes or Resume"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg text-[#82778A] hover:text-[#E6C7E6] transition-colors"
            title="Speak Question"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={!input.trim() || isSending}
            onClick={() => handleSend()}
            className="p-2 rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 disabled:opacity-50 transition-colors shadow-md shadow-[#663399]/30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
