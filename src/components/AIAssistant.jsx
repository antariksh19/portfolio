import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, AlertCircle } from 'lucide-react';
import {
  buildAntarikshSystemPrompt,
  SUGGESTED_QUESTIONS,
} from '../lib/portfolioAssistant';
import { isGeminiConfigured, streamTextWithSystem } from '../lib/geminiClient';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]';

const WELCOME_MESSAGE =
  "I'm Antariksh AI. Ask me about projects, architecture decisions, cloud infrastructure, AI systems, technical skills, experience, or career goals. I answer using verified portfolio data only.";
  
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3" role="status" aria-label="Assistant is thinking">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-cyan-400/80"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const formatMessage = (text) =>
  text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={i > 0 ? 'mt-2' : ''}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={j} className="text-cyan-300 font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith('• ')) {
            return (
              <span key={j} className="block pl-1 text-slate-300">
                {part}
              </span>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </p>
    );
  });

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const geminiReady = isGeminiConfigured();

  const systemPrompt = useMemo(() => buildAntarikshSystemPrompt(), []);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [open, messages, loading, scrollToBottom]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    [],
  );

  const updateAssistantMessage = useCallback((id, patch) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      if (!geminiReady) {
        setMessages((prev) => [
          ...prev,
          { id: `u-${Date.now()}`, role: 'user', text: trimmed },
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: 'Gemini is not configured. Add VITE_GEMINI_API_KEY to your .env.local file and restart the dev server.',
            isError: true,
          },
        ]);
        setInput('');
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const userId = `u-${Date.now()}`;
      const assistantId = `a-${Date.now()}`;

      setMessages((prev) => [
        ...prev,
        { id: userId, role: 'user', text: trimmed },
        { id: assistantId, role: 'assistant', text: '', streaming: true },
      ]);
      setInput('');
      setLoading(true);
      scrollToBottom();

      let hasStreamed = false;

      const result = await streamTextWithSystem(systemPrompt, trimmed, {
        signal: controller.signal,
        onChunk: (chunk) => {
          if (!hasStreamed) {
            hasStreamed = true;
            setLoading(false);
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, text: `${m.text}${chunk}`, streaming: true } : m,
            ),
          );
          scrollToBottom();
        },
      });

      if (controller.signal.aborted) {
        setLoading(false);
        return;
      }

      setLoading(false);

      if (result.ok) {
        updateAssistantMessage(assistantId, {
          text: result.text,
          streaming: false,
          isError: false,
        });
      } else if (result.code === 'ABORTED') {
        updateAssistantMessage(assistantId, {
          text: hasStreamed ? 'Response stopped.' : '',
          streaming: false,
        });
        if (!hasStreamed) {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        }
      } else {
        updateAssistantMessage(assistantId, {
          text: result.error,
          streaming: false,
          isError: true,
        });
      }

      scrollToBottom();
    },
    [loading, geminiReady, systemPrompt, scrollToBottom, updateAssistantMessage],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showTypingIndicator = loading;

  return (
    <>
      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className={`fixed bottom-6 right-6 z-[70] flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-black font-bold shadow-lg shadow-cyan-500/25 hover:scale-105 transition-transform ${FOCUS_RING}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Open Antariksh AI assistant"
          aria-expanded={open}
          aria-controls="portfolio-ai-panel"
        >
          <Sparkles size={18} aria-hidden />
          <span className="hidden sm:inline">Ask AI</span>
          <Bot size={20} aria-hidden className="sm:hidden" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            id="portfolio-ai-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-assistant-title"
            className="fixed inset-0 z-[75] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            />

            <motion.div
              className="relative w-full max-w-lg h-[min(92vh,680px)] sm:h-[min(85vh,640px)] flex flex-col rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            >
              <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.02] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Bot className="text-cyan-400" size={22} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h2 id="ai-assistant-title" className="text-sm font-bold text-white truncate">
                      Antariksh AI
                    </h2>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 truncate">
                      {geminiReady ? 'Gemini 2.5 Flash · Portfolio context' : 'API key not configured'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 shrink-0 ${FOCUS_RING}`}
                  aria-label="Close assistant panel"
                >
                  <X size={20} aria-hidden />
                </button>
              </header>

              {!geminiReady && (
                <div
                  className="flex items-start gap-2 px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-200/90 text-xs leading-relaxed shrink-0"
                  role="status"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden />
                  <p>
                    Set <code className="font-mono text-amber-100">VITE_GEMINI_API_KEY</code> in{' '}
                    <code className="font-mono text-amber-100">.env.local</code> and restart the dev
                    server to enable live answers.
                  </p>
                </div>
              )}

              <div
                ref={listRef}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 sm:px-4 py-4 space-y-4"
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                aria-label="Chat messages"
              >
                {messages.map((msg) => {
                  if (msg.role === 'assistant' && msg.streaming && !msg.text) {
                    return null;
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={[
                          'max-w-[min(92%,100%)] rounded-2xl px-3.5 sm:px-4 py-3 text-sm leading-relaxed break-words',
                          msg.role === 'user'
                            ? 'bg-cyan-500/20 border border-cyan-500/30 text-slate-100'
                            : msg.isError
                              ? 'bg-red-500/10 border border-red-500/30 text-red-200'
                              : 'bg-white/[0.04] border border-white/10 text-slate-300',
                        ].join(' ')}
                      >
                        {msg.isError ? (
                          <p>{msg.text}</p>
                        ) : (
                          <>
                            {formatMessage(msg.text)}
                            {msg.streaming && (
                              <span
                                className="inline-block w-2 h-4 ml-0.5 align-middle bg-cyan-400/80 animate-pulse rounded-sm"
                                aria-hidden
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}

                {showTypingIndicator && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-white/[0.04] border border-white/10">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-3 sm:px-4 pb-2 border-t border-white/5 shrink-0">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 py-2">
                  Suggested
                </p>
                <div className="flex flex-wrap gap-2 pb-3 max-h-20 sm:max-h-24 overflow-y-auto overscroll-contain">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      disabled={loading}
                      className={`text-left text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors disabled:opacity-50 ${FOCUS_RING}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-3 sm:p-4 border-t border-white/10 bg-black/40 flex gap-2 shrink-0"
                aria-label="Send a message to Antariksh AI"
              >
                <label htmlFor="ai-assistant-input" className="sr-only">
                  Your message
                </label>
                <input
                  id="ai-assistant-input"
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, cloud, experience…"
                  disabled={loading}
                  autoComplete="off"
                  className={`flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-3 sm:px-4 py-3 text-sm text-white placeholder:text-slate-600 disabled:opacity-60 ${FOCUS_RING}`}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`shrink-0 p-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ${FOCUS_RING}`}
                  aria-label="Send message"
                >
                  <Send size={18} aria-hidden />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
