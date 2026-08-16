import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, HelpCircle } from 'lucide-react';

export const QuizCard = ({ quiz, onStart }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-sacred-saffron/10 text-sacred-saffron flex items-center justify-center mb-4">
          <Award className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-ganga-50 text-ganga-700 border border-ganga-200">
            {quiz.category || 'Awareness'}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">
          {quiz.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          {quiz.description || 'Test your knowledge on River Ganga and river conservation initiatives.'}
        </p>
      </div>

      <button
        onClick={() => onStart(quiz.id)}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-ganga-600 hover:bg-ganga-700 text-white text-sm font-semibold transition shadow-sm"
      >
        <span>Start Quiz</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
