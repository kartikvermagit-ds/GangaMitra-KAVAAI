import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';
import { QuizCard } from '../components/QuizCard';
import { Mascot } from '../components/Mascot';
import { LoadingStateView, ErrorStateView } from '../components/StateViews';
import { fetchQuizzes, fetchQuizById, submitQuizAnswers } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export const Quiz = () => {
  const { t, language } = useLanguage();
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fallback demo quiz for immediate offline evaluation
  const fallbackQuiz = {
    id: 'demo-quiz-1',
    title: 'Ganga Ecology & Namami Gange Quiz',
    description: 'Test your knowledge about the holy River Ganga and conservation initiatives under Namami Gange.',
    category: 'Awareness',
    questions: [
      {
        id: 'q1',
        question: 'Which animal found in River Ganga is the National Aquatic Animal of India?',
        options: ['Ganges River Dolphin', 'Gharial', 'Golden Mahseer', 'Indian Star Tortoise'],
      },
      {
        id: 'q2',
        question: 'In which year was the Namami Gange Flagship Programme launched?',
        options: ['2010', '2014', '2018', '2020'],
      },
      {
        id: 'q3',
        question: 'Which comic character mascot is officially associated with the Namami Gange public awareness campaign?',
        options: ['Chacha Chaudhary', 'Shaktimaan', 'Tenali Raman', 'Vikram Betal'],
      },
    ],
  };

  const loadQuizzes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchQuizzes();
      if (res && res.quizzes && res.quizzes.length > 0) {
        setQuizzes(res.quizzes);
      } else {
        setQuizzes([fallbackQuiz]);
      }
    } catch (err) {
      console.warn('Quizzes fetch warning:', err.message);
      setQuizzes([fallbackQuiz]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleStartQuiz = async (quizId) => {
    setIsLoading(true);
    setError(null);
    try {
      if (quizId === 'demo-quiz-1') {
        setActiveQuiz(fallbackQuiz);
      } else {
        const res = await fetchQuizById(quizId);
        setActiveQuiz(res.quiz || fallbackQuiz);
      }
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});
      setQuizResult(null);
    } catch (err) {
      console.warn('Quiz details fetch warning:', err.message);
      setActiveQuiz(fallbackQuiz);
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});
      setQuizResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (questionId, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    setIsSubmitting(true);

    try {
      if (activeQuiz.id === 'demo-quiz-1') {
        // Evaluate demo quiz locally
        const mockAnswersKey = {
          q1: 'Ganges River Dolphin',
          q2: '2014',
          q3: 'Chacha Chaudhary',
        };
        const mockExplanations = {
          q1: 'The Ganges River Dolphin was declared the National Aquatic Animal of India in 2009.',
          q2: 'Namami Gange was approved as a flagship programme by the Government of India in June 2014.',
          q3: 'Chacha Chaudhary is the official mascot declared by NMCG to educate children and citizens.',
        };

        let score = 0;
        const totalQuestions = activeQuiz.questions.length;
        const breakdown = activeQuiz.questions.map((q) => {
          const userAns = selectedAnswers[q.id];
          const correctAns = mockAnswersKey[q.id];
          const isCorrect = userAns === correctAns;
          if (isCorrect) score += 1;
          return {
            questionId: q.id,
            question: q.question,
            userAnswer: userAns,
            correctAnswer: correctAns,
            isCorrect,
            explanation: mockExplanations[q.id],
          };
        });

        const percentage = Math.round((score / totalQuestions) * 100);
        setQuizResult({
          quizTitle: activeQuiz.title,
          score,
          totalQuestions,
          percentage,
          passed: percentage >= 60,
          breakdown,
        });
      } else {
        const res = await submitQuizAnswers(activeQuiz.id, selectedAnswers);
        setQuizResult(res);
      }
    } catch (err) {
      console.error('Quiz submission error:', err);
      setError('Could not evaluate quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = activeQuiz?.questions?.[currentQuestionIdx];
  const totalQuestions = activeQuiz?.questions?.length || 0;
  const progressPercent = totalQuestions > 0 ? ((currentQuestionIdx + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="flex-1 bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-sacred-saffron" />
            <span>Interactive River Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            {t('quiz.heading')}
          </h1>
          <p className="text-sm text-slate-600">{t('quiz.subtitle')}</p>
        </div>

        {/* View 1: Quiz List */}
        {!activeQuiz && !quizResult && (
          <div>
            {isLoading ? (
              <LoadingStateView text="Loading interactive quizzes..." />
            ) : error ? (
              <ErrorStateView message={error} onRetry={loadQuizzes} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onStart={handleStartQuiz} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* View 2: Active Quiz Question Stepper */}
        {activeQuiz && !quizResult && currentQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6"
          >
            {/* Progress Bar & Counter */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>
                  Question {currentQuestionIdx + 1} of {totalQuestions}
                </span>
                <span className="text-ganga-600">{Math.round(progressPercent)}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ganga-500 to-ganga-700 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="py-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, option)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-ganga-50 border-ganga-500 text-ganga-900 shadow-sm ring-1 ring-ganga-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-ganga-600 bg-ganga-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIdx === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('quiz.prevBtn')}</span>
              </button>

              {currentQuestionIdx < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                  disabled={!selectedAnswers[currentQuestion.id]}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-ganga-600 hover:bg-ganga-700 disabled:opacity-40 text-white text-xs font-semibold transition shadow-sm"
                >
                  <span>{t('quiz.nextBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting || !selectedAnswers[currentQuestion.id]}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-sacred-saffron to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-white text-sm font-bold transition shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Evaluating...' : t('quiz.submitBtn')}</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* View 3: Score & Detailed Feedback Report */}
        {quizResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-8"
          >
            {/* Mascot Celebrating / Cheering */}
            <div className="flex flex-col items-center text-center">
              <Mascot
                state={quizResult.passed ? 'celebrating' : 'happy'}
                size="md"
                speechText={
                  quizResult.passed
                    ? 'शाबाश! आपने बहुत अच्छा प्रदर्शन किया। आप गंगा मित्र हैं!'
                    : 'बहुत अच्छा प्रयास! थोड़ा और सीखें और फिर से खेलें।'
                }
              />

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 mb-1">
                {quizResult.passed ? t('quiz.passedMsg') : t('quiz.tryAgainMsg')}
              </h2>
              <p className="text-sm text-slate-500">{quizResult.quizTitle}</p>

              {/* Score Metric Pill */}
              <div className="mt-6 inline-flex items-center gap-6 px-8 py-4 bg-ganga-50 rounded-3xl border border-ganga-200">
                <div className="text-center">
                  <div className="text-3xl font-black text-ganga-800">
                    {quizResult.score} / {quizResult.totalQuestions}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Correct Answers</div>
                </div>
                <div className="w-px h-10 bg-ganga-200" />
                <div className="text-center">
                  <div className="text-3xl font-black text-sacred-saffron">
                    {quizResult.percentage}%
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Score</div>
                </div>
              </div>
            </div>

            {/* Answer Breakdown & Explanations */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Detailed Question Review:</h3>

              {quizResult.breakdown?.map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                    item.isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-red-50/70 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-slate-900">{item.question}</div>
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium">Your answer: </span>
                      <span className={item.isCorrect ? 'text-emerald-800 font-bold' : 'text-red-700 font-bold'}>
                        {item.userAnswer || 'Not answered'}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div>
                        <span className="text-slate-500 font-medium">Correct answer: </span>
                        <span className="text-emerald-800 font-bold">{item.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  {item.explanation && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-700 bg-white/80 p-2.5 rounded-xl">
                      <span className="font-bold text-ganga-800">Why? </span>
                      {item.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Retake Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  setActiveQuiz(null);
                  setQuizResult(null);
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-ganga-600 hover:bg-ganga-700 text-white font-bold text-sm shadow-md transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('quiz.retakeBtn')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
