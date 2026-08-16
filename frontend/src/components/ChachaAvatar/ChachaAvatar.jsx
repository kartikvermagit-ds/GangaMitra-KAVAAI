import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Volume2, Award, HeartHandshake, Mic, AlertCircle } from 'lucide-react';
import chachaAvatarImg from '../../assets/chacha-avatar.jpg';

/**
 * Official Chacha Chaudhary Avatar Component for GangaMitra-KAVAAI (SIH1290)
 * Uses the exact official high-resolution reference artwork as the base visual
 * with lightweight interactive animation overlays for:
 * - IDLE: subtle breathing float & status glow
 * - LISTENING: concentric pulsing audio radar rings, listening microphone badge
 * - THINKING: brain thinking overlay & thoughtful animation
 * - SPEAKING: synchronized dynamic lip-sync mouth overlay & speaking soundwaves
 * - HAPPY / CELEBRATING: celebratory bounce & badge
 * - ERROR: friendly error state badge
 */
export const ChachaAvatar = ({
  state = 'idle',
  size = 'lg',
  speechText = null,
  interactive = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-28 h-28',
    md: 'w-48 h-48',
    lg: 'w-72 h-72',
    xl: 'w-88 h-88',
  };

  const stateBadges = {
    idle: {
      text: 'Chacha Chaudhary (Ganga Mitra)',
      color: 'bg-ganga-100 text-ganga-900 border-ganga-300',
      icon: Sparkles,
    },
    listening: {
      text: 'Chacha is listening to you...',
      color: 'bg-rose-100 text-rose-950 border-rose-300 ring-2 ring-rose-400/40 animate-pulse',
      icon: Mic,
    },
    thinking: {
      text: 'Thinking faster than a computer...',
      color: 'bg-amber-100 text-amber-950 border-amber-300 animate-pulse',
      icon: Brain,
    },
    speaking: {
      text: 'Chacha is speaking...',
      color: 'bg-emerald-100 text-emerald-950 border-emerald-300 shadow-sm',
      icon: Volume2,
    },
    happy: {
      text: 'Namami Gange!',
      color: 'bg-blue-100 text-blue-900 border-blue-200',
      icon: HeartHandshake,
    },
    celebrating: {
      text: 'Shabash! Great job!',
      color: 'bg-sacred-saffron/20 text-amber-950 border-sacred-saffron/40',
      icon: Award,
    },
    error: {
      text: 'Chacha is taking a short break...',
      color: 'bg-red-100 text-red-950 border-red-300',
      icon: AlertCircle,
    },
  };

  const currentBadge = stateBadges[state] || stateBadges.idle;
  const BadgeIcon = currentBadge.icon;

  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${className}`}>
      {/* Speech Bubble Greeting */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 max-w-xs bg-white text-slate-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-3xl rounded-bl-none shadow-xl border-2 border-ganga-100 relative z-30"
        >
          <div className="flex items-center gap-1.5 text-ganga-700 font-extrabold text-sm mb-0.5">
            <span>नमस्ते!</span>
            <span className="text-sacred-saffron">✨</span>
          </div>
          <p className="leading-snug text-slate-700">{speechText}</p>
          <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-ganga-100 transform rotate-45" />
        </motion.div>
      )}

      {/* Main Avatar Container */}
      <motion.div
        animate={
          state === 'listening'
            ? { scale: [1, 1.03, 1], y: [0, -3, 0] }
            : state === 'thinking'
            ? { y: [0, -6, 0], rotate: [-1.2, 1.2, -1.2] }
            : state === 'speaking'
            ? { scale: [1, 1.025, 1], y: [0, -2, 0] }
            : state === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : state === 'error'
            ? { y: [0, 2, 0], rotate: [0, -1, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration:
            state === 'listening'
              ? 1.5
              : state === 'thinking'
              ? 1.8
              : state === 'speaking'
              ? 0.8
              : 3.5,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        className={`relative ${sizeMap[size] || sizeMap.lg} cursor-pointer group flex items-center justify-center`}
      >
        {/* Glow halo behind avatar */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-60 transition-all duration-500 ${
            state === 'listening'
              ? 'bg-rose-400 scale-110'
              : state === 'thinking'
              ? 'bg-amber-300'
              : state === 'speaking'
              ? 'bg-emerald-300 scale-105'
              : state === 'celebrating'
              ? 'bg-sacred-saffron'
              : state === 'error'
              ? 'bg-red-300'
              : 'bg-ganga-400'
          }`}
        />

        {/* Listening Concentric Waves Ring */}
        {state === 'listening' && (
          <>
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-4 border-rose-400 pointer-events-none z-10"
            />
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-rose-300 pointer-events-none z-10"
            />
          </>
        )}

        {/* Outer Circular Glowing Frame */}
        <div
          className={`relative w-full h-full rounded-full overflow-hidden border-4 sm:border-8 shadow-2xl bg-white transition-colors duration-300 ${
            state === 'listening'
              ? 'border-rose-400 shadow-rose-200'
              : state === 'speaking'
              ? 'border-emerald-400 shadow-emerald-200'
              : state === 'thinking'
              ? 'border-amber-400 shadow-amber-200'
              : state === 'error'
              ? 'border-red-400 shadow-red-200'
              : 'border-sky-400 shadow-sky-100'
          }`}
        >
          {/* Exact Official Reference Image Asset */}
          <img
            src={chachaAvatarImg}
            alt="Chacha Chaudhary Ganga Mitra AI Mascot"
            className="w-full h-full object-cover object-center transform scale-105"
          />

          {/* ========================================================= */}
          {/* INTERACTIVE ANIMATION OVERLAYS                            */}
          {/* ========================================================= */}

          {/* Lip-Sync Mouth Animation Overlay during speaking state */}
          {state === 'speaking' && (
            <motion.div
              animate={{
                scaleY: [0.4, 1.4, 0.6, 1.6, 0.4],
                scaleX: [0.9, 1.2, 0.95, 1.3, 0.9],
              }}
              transition={{ repeat: Infinity, duration: 0.28, ease: 'easeInOut' }}
              className="absolute w-5 h-4 bg-rose-900 rounded-full border border-rose-700/80 shadow-inner z-20 pointer-events-none"
              style={{
                top: '47.5%',
                left: '50.5%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Animated pink tongue accent */}
              <motion.div
                animate={{ scaleY: [0.5, 1.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.28 }}
                className="w-3 h-2 bg-rose-400 rounded-full mx-auto mt-1.5"
              />
            </motion.div>
          )}

          {/* Listening Pulsing Microphone Indicator on Avatar */}
          {state === 'listening' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg border-2 border-white z-20"
            >
              <Mic className="w-4 h-4 animate-bounce" />
            </motion.div>
          )}

          {/* Thinking Brain Indicator on Avatar */}
          {state === 'thinking' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-amber-400 text-amber-950 p-2 rounded-full shadow-lg border-2 border-white z-20"
            >
              <Brain className="w-4 h-4 animate-pulse" />
            </motion.div>
          )}

          {/* Speaking Audio Waves Indicator on Avatar */}
          {state === 'speaking' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white z-20"
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Mascot Mode Tag Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white/95 border border-slate-200 text-[11px] font-bold text-slate-800 px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1.5 z-20">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              state === 'listening'
                ? 'bg-rose-500 animate-ping'
                : state === 'speaking'
                ? 'bg-emerald-500 animate-pulse'
                : state === 'error'
                ? 'bg-red-500'
                : 'bg-emerald-500'
            }`}
          />
          <span>
            {state === 'listening'
              ? 'Listening'
              : state === 'speaking'
              ? 'Speaking'
              : state === 'thinking'
              ? 'Thinking'
              : 'AI Mascot'}
          </span>
        </div>
      </motion.div>

      {/* State Status Pill */}
      <div
        className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border shadow-xs ${currentBadge.color} transition-all duration-300`}
      >
        <BadgeIcon className="w-4 h-4 text-sacred-saffron" />
        <span>{currentBadge.text}</span>
      </div>
    </div>
  );
};

export default ChachaAvatar;
