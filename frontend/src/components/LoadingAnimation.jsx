import React from 'react';
import { Sparkles, Waves } from 'lucide-react';

export const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <div className="relative">
        <div className={`rounded-full border-ganga-200 border-t-ganga-600 animate-spin ${sizeClasses[size] || sizeClasses.md}`} />
        <Waves className="w-4 h-4 text-ganga-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
};

export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 bg-white/90 border border-slate-100 rounded-2xl rounded-tl-sm w-fit shadow-sm">
      <span className="text-xs font-semibold text-ganga-700 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-sacred-saffron animate-spin" />
        Chacha Chaudhary is thinking
      </span>
      <div className="flex space-x-1 pl-1">
        <span className="w-2 h-2 bg-ganga-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-ganga-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-ganga-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};
