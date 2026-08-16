import React from 'react';
import { AlertCircle, RefreshCw, Compass, HelpCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingAnimation';

export const ErrorStateView = ({
  title = 'Something went wrong',
  message = 'Chacha is taking a short break. Please try again in a moment.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-center max-w-md mx-auto my-6 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-amber-100/50 transition-colors shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
};

export const EmptyStateView = ({
  icon: Icon = Compass,
  title = 'No items found',
  message = 'Try adjusting your search query or category filters.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-dashed border-slate-200 rounded-2xl text-center max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-full bg-ganga-50 flex items-center justify-center text-ganga-600 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-ganga-600 text-white rounded-xl text-xs font-semibold hover:bg-ganga-700 transition shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const LoadingStateView = ({ text = 'Loading data from Namami Gange knowledge base...' }) => {
  return <LoadingSpinner size="lg" text={text} />;
};
