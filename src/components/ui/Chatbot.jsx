import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, ArrowUpRight } from 'lucide-react';
import { generateAssistantReply } from '../../utils/chatAssistant';

const suggestions = [
  'What services do you offer?',
  'Can you build a custom website?',
  'Do you build AI solutions?',
  'How can I start a project?',
];

const welcomeMessage = 'Hi 👋 Welcome to GALVIX SOLUTIONS. I can help you explore our services, understand how we work, and identify the right digital solution for your project.';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date(),
      isWelcome: true,
    },
  ]);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const buildConversationMessages = (conversation) =>
    conversation
      .filter((message) => !message.isWelcome)
      .map((message) => ({
        role: message.sender === 'user' ? 'user' : 'assistant',
        content: String(message.text || '').trim(),
      }))
      .filter((message) => message.content.length > 0);

  const sendMessage = async (messageText) => {
    const trimmed = (messageText || input).trim();
    if (!trimmed || isSending) return;

    const nextUserMessage = {
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    const safeMessages = buildConversationMessages(messages);
    const payloadMessages = [...safeMessages, { role: 'user', content: trimmed }];

    setMessages((prev) => [...prev, nextUserMessage]);
    setInput('');
    setIsSending(true);

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      let replyText = '';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ messages: payloadMessages }),
          signal: controller.signal,
        });

        if (response.ok) {
          const data = await response.json().catch(() => null);
          if (data && data.reply) {
            replyText = data.reply;
          }
        }
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') return;
        console.warn('Network chat API call skipped or failed, using assistant fallback:', fetchError);
      }

      // If network response was unavailable or empty, use built-in intelligent assistant
      if (!replyText) {
        const fallback = generateAssistantReply(payloadMessages);
        replyText = fallback.reply;
      }

      const botReply = {
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }

      console.error('Chat error:', error);
      const fallback = generateAssistantReply(payloadMessages);

      setMessages((prev) => [
        ...prev,
        {
          text: fallback.reply,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      if (abortControllerRef.current?.signal === controller.signal) {
        abortControllerRef.current = null;
      }
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-slate-950/90 text-white shadow-[0_18px_50px_rgba(59,130,246,0.35)] backdrop-blur-md"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 20, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-40 flex w-[min(92vw,420px)] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-[0_30px_120px_rgba(2,6,23,0.8)] backdrop-blur-xl sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/40 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.14em] text-white/90">GALVIX SOLUTIONS</p>
                  <p className="text-[11px] text-blue-200/80">AI Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </div>
            </div>

            <div className="border-b border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              Ask us about services, solutions, technology, or starting a project.
            </div>

            <div className="flex max-h-[480px] flex-col gap-3 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),transparent_45%)] p-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.sender}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                        : 'border border-white/10 bg-white/6 text-slate-100'
                    } ${msg.error ? 'border border-red-500/30 bg-red-500/10 text-red-100' : ''}`}
                  >
                    <p>{msg.text}</p>
                    {msg.error && (
                      <button
                        type="button"
                        onClick={() => sendMessage(msg.originalMessage)}
                        className="mt-3 inline-flex items-center gap-1 rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-red-100"
                      >
                        Retry <ArrowUpRight size={12} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-200">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.1s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300" />
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="space-y-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-slate-200 transition hover:border-blue-500/30 hover:bg-blue-500/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 bg-slate-950/90 p-3.5">
              <div className="flex items-end gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-blue-400/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={isSending || !input.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
