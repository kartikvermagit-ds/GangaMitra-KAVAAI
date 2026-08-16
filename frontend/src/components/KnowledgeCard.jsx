import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Tag, ExternalLink, Sparkles, X } from 'lucide-react';

export const KnowledgeCard = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryColor = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('biodiversity')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (c.includes('pollution')) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (c.includes('namami') || c.includes('initiative')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (c.includes('water') || c.includes('conservation')) return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    return 'bg-purple-50 text-purple-700 border-purple-200';
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          {/* Header with Category & Language */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(
                article.category
              )}`}
            >
              {article.category}
            </span>
            {article.language && (
              <span className="text-[11px] font-medium text-slate-400 uppercase">
                {article.language === 'hi' ? 'हिंदी' : 'English'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug">
            {article.title}
          </h3>

          {/* Content Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {article.content}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
          {article.source ? (
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]" title={article.source}>
              Source: {article.source}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">Namami Gange</span>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ganga-600 hover:text-ganga-800 transition"
          >
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </motion.div>

      {/* Reader Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(
                  article.category
                )}`}
              >
                {article.category}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
              {article.title}
            </h2>

            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {article.content}
            </div>

            {article.source && (
              <div className="p-3 bg-ganga-50 rounded-xl border border-ganga-100 flex items-center justify-between text-xs text-ganga-800">
                <span className="font-semibold">Official Source Reference:</span>
                <span>{article.source}</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};
