import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, RotateCcw, Sparkles, MessageSquare, AlertCircle, Volume2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './LoadingAnimation';
import { useLanguage } from '../context/LanguageContext';

export const ChatBox = ({
  messages = [],
  isLoading = false,
  onSendMessage,
  onResetChat,
  onMicToggle,
  isListening = false,
  interimText = '',
  error = null,
}) => {
  const { language, t } = useLanguage();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions =
    language === 'hi'
      ? [
          'गंगा नदी क्यों महत्वपूर्ण है?',
          'नमामि गंगे कार्यक्रम क्या है?',
          'गंगा डॉल्फिन के बारे में बताएं',
          'हम नदी प्रदूषण कैसे कम कर सकते हैं?',
          'सीवेज ट्रीटमेंट प्लांट (STP) क्या काम करते हैं?',
        ]
      : [
          'Why is the Ganga important?',
          'What is the Namami Gange mission?',
          'Tell me about the Ganges River Dolphin',
          'How can we reduce river pollution?',
          'What are Sewage Treatment Plants (STPs)?',
        ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isListening, interimText]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    onSendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleSuggestionClick = (question) => {
    if (isLoading || isListening) return;
    onSendMessage(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-[600px] sm:h-[680px] bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-ganga-700 to-ganga-900 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isListening
                ? 'bg-rose-400 animate-ping'
                : isLoading
                ? 'bg-amber-400 animate-pulse'
                : 'bg-emerald-400 animate-pulse'
            }`}
          />
          <div>
            <h2 className="font-bold text-sm sm:text-base leading-tight">
              {t('chat.title')}
            </h2>
            <p className="text-xs text-ganga-200">{t('chat.subtitle')}</p>
          </div>
        </div>

        <button
          onClick={onResetChat}
          title={t('chat.clearChat')}
          className="flex items-center gap-1.5 text-xs text-ganga-100 hover:text-white px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t('chat.clearChat')}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-slate-50/50 space-y-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
            <div className="w-16 h-16 rounded-2xl bg-ganga-50 text-ganga-600 flex items-center justify-center mb-3 shadow-inner">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">
              {language === 'hi' ? 'चाचा चौधरी से बात शुरू करें!' : 'Start your conversation with Chacha!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6">
              {language === 'hi'
                ? 'गंगा नदी के इतिहास, जैव विविधता और नमामि गंगे संरक्षण के बारे में कोई भी प्रश्न पूछें या माइक दबाकर बोलें।'
                : 'Ask anything about Ganga history, river ecology, dolphins, pollution control, or click the mic to speak!'}
            </p>

            {/* Suggested quick chips */}
            <div className="w-full max-w-md">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                {t('chat.suggestedHeading')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(q)}
                    className="text-xs text-ganga-800 bg-white hover:bg-ganga-50 border border-slate-200 hover:border-ganga-300 rounded-xl px-3 py-2 text-left transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sacred-saffron shrink-0" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                isLast={index === messages.length - 1}
              />
            ))}

            {isLoading && (
              <div className="my-2">
                <TypingIndicator />
              </div>
            )}
          </>
        )}

        {/* Listening Active Wave Indicator in Chat Feed */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold shadow-xs"
          >
            <div className="w-6 h-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center animate-pulse">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <span>
                {interimText
                  ? `"${interimText}..."`
                  : language === 'hi'
                  ? 'चाचा सुन रहे हैं... कृपया बोलें'
                  : 'Chacha is listening to you... speak now'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-3 bg-rose-500 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips Bar (when in active conversation) */}
      {messages.length > 0 && (
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto flex items-center gap-2 text-xs scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase shrink-0">
            {language === 'hi' ? 'सुझाव:' : 'Suggestions:'}
          </span>
          {suggestedQuestions.slice(0, 3).map((q, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(q)}
              disabled={isLoading || isListening}
              className="shrink-0 bg-white hover:bg-ganga-50 text-slate-700 hover:text-ganga-800 border border-slate-200 px-2.5 py-1 rounded-lg text-xs transition truncate max-w-[200px]"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        {/* Real Web Speech Microphone Button */}
        <button
          type="button"
          onClick={onMicToggle}
          disabled={isLoading}
          title={
            isListening
              ? 'Click to stop listening'
              : 'Click to speak to Chacha (Speech Recognition)'
          }
          className={`p-3 rounded-2xl transition shadow-xs flex items-center justify-center shrink-0 ${
            isListening
              ? 'bg-rose-500 text-white ring-4 ring-rose-200 animate-pulse'
              : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-transparent'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={isListening && interimText ? interimText : inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || isListening}
            placeholder={
              isListening
                ? language === 'hi'
                  ? '🎤 चाचा सुन रहे हैं... अपना प्रश्न बोलें'
                  : '🎤 Chacha is listening to you... speak now'
                : t('chat.inputPlaceholder')
            }
            className={`w-full pl-4 pr-3 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-ganga-500 transition ${
              isListening
                ? 'bg-rose-50/60 border-rose-300 text-rose-900 placeholder-rose-400 ring-2 ring-rose-200'
                : 'bg-slate-100/80 border border-slate-200 focus:bg-white'
            }`}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading || isListening}
          className="p-3 rounded-2xl bg-ganga-600 hover:bg-ganga-700 disabled:opacity-40 disabled:hover:bg-ganga-600 text-white transition shadow-sm flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
