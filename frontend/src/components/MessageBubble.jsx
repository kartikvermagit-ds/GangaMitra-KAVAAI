import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, BookOpen, Copy, Check, Volume2, Sparkles, VolumeX } from 'lucide-react';
import { speakText, stopSpeaking } from '../services/speech';

export const MessageBubble = ({ message, isLast = false }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      speakText({
        text: message.content,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-start gap-3 my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Icon */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
          isUser
            ? 'bg-ganga-100 text-ganga-700 border-ganga-200'
            : 'bg-red-50 text-red-600 border-red-200'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Bubble Container */}
      <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Author Label & Time */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-[11px] font-semibold text-slate-500">
            {isUser ? 'You' : 'Chacha Chaudhary'}
          </span>
          {message.timestamp && (
            <span className="text-[10px] text-slate-400">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Message Content Box */}
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-ganga-600 text-white rounded-tr-none'
              : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>

          {/* Sources Section if attached by RAG */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1 text-xs font-semibold text-ganga-700 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-ganga-500" />
                <span>Namami Gange Verified Sources:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((src, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-ganga-50 text-ganga-800 border border-ganga-200/60 rounded-lg text-[11px] font-medium"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-sacred-saffron" />
                    {src.title || src}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons for assistant messages */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 text-slate-400">
              <button
                onClick={handleCopy}
                title="Copy message"
                className="p-1 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors text-xs flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleSpeak}
                title={isPlaying ? 'Stop listening' : 'Read aloud'}
                className={`p-1 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors text-xs flex items-center gap-1 ${
                  isPlaying ? 'text-ganga-600 font-semibold' : ''
                }`}
              >
                {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{isPlaying ? 'Stop' : 'Listen'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
