import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Volume2, Award, HeartHandshake, Mic } from 'lucide-react';

/**
 * Beloved Chacha Chaudhary Mascot Avatar with Synchronized Listening & Speaking
 * Features:
 * - Reactive multi-ring audio pulse in LISTENING state with attentive head tilt
 * - Open/close mouth with teeth & tongue + mustache speech bob in SPEAKING state
 * - Strict real-time state badge updates
 */
export const ChachaAvatar = ({
  state = 'idle',
  size = 'lg',
  interactive = true,
  speechText = null,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  const stateBadges = {
    idle: {
      text: 'Ganga Mitra (Chacha Chaudhary)',
      color: 'bg-ganga-100 text-ganga-800 border-ganga-200',
      icon: Sparkles,
    },
    listening: {
      text: 'Chacha is listening to you...',
      color: 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-400/50 shadow-md shadow-rose-100 animate-pulse',
      icon: Mic,
    },
    thinking: {
      text: 'Thinking faster than a computer...',
      color: 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300/40 shadow-sm animate-pulse',
      icon: Brain,
    },
    speaking: {
      text: 'Chacha is speaking...',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-300/50 shadow-md shadow-emerald-100',
      icon: Volume2,
    },
    happy: {
      text: 'Namami Gange!',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: HeartHandshake,
    },
    celebrating: {
      text: 'Shabash! Great job!',
      color: 'bg-sacred-saffron/20 text-amber-900 border-sacred-saffron/40',
      icon: Award,
    },
  };

  const currentBadge = stateBadges[state] || stateBadges.idle;
  const BadgeIcon = currentBadge.icon;

  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${className}`}>
      {/* Dynamic Speech Bubble if text provided */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 max-w-xs bg-white text-slate-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl rounded-bl-none shadow-lg border border-slate-200/80 relative z-20"
        >
          <p className="leading-relaxed">{speechText}</p>
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-slate-200/80 transform rotate-45" />
        </motion.div>
      )}

      {/* Mascot Avatar Graphic Container */}
      <motion.div
        animate={
          state === 'listening'
            ? { scale: [1, 1.04, 1], y: [0, -4, 0], rotate: [0, 1.5, 0, -1.5, 0] }
            : state === 'thinking'
            ? { y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }
            : state === 'speaking'
            ? { scale: [1, 1.03, 1], y: [0, -3, 0] }
            : state === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration:
            state === 'listening'
              ? 1.4
              : state === 'thinking'
              ? 1.8
              : state === 'speaking'
              ? 1.2
              : 3.5,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        className={`relative ${sizeMap[size] || sizeMap.lg} cursor-pointer group flex items-center justify-center`}
      >
        {/* Glow halo behind mascot */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
            state === 'listening'
              ? 'bg-rose-400 opacity-70 scale-125 animate-pulse'
              : state === 'thinking'
              ? 'bg-amber-300 opacity-60 scale-110'
              : state === 'speaking'
              ? 'bg-emerald-400 opacity-60 scale-115'
              : state === 'celebrating'
              ? 'bg-sacred-saffron opacity-60 scale-110'
              : 'bg-ganga-300 opacity-40 scale-100'
          }`}
        />

        {/* Listening Concentric Ripples */}
        {state === 'listening' && (
          <>
            <motion.div
              animate={{ scale: [0.95, 1.35, 0.95], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-rose-500 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [0.95, 1.55, 0.95], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-rose-400 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [0.95, 1.75, 0.95], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.7, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-rose-300 pointer-events-none"
            />
          </>
        )}

        {/* Speaking Energetic Waves */}
        {state === 'speaking' && (
          <>
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.0, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
            />
          </>
        )}

        {/* Chacha Chaudhary Mascot SVG Character Illustration */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-2xl z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Badge Background */}
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="#F0F7FF"
            stroke={
              state === 'listening'
                ? '#F43F5E'
                : state === 'speaking'
                ? '#10B981'
                : state === 'thinking'
                ? '#F59E0B'
                : '#0284C7'
            }
            strokeWidth={state === 'listening' || state === 'speaking' ? '4.5' : '4'}
            className="transition-colors duration-300"
          />
          <circle cx="100" cy="100" r="86" fill="#FFFFFF" />

          {/* Water wave decoration inside badge */}
          <path
            d="M20 145 C 50 135, 80 155, 110 145 C 140 135, 170 155, 190 145 L 190 190 L 10 190 Z"
            fill="#BAE0FD"
            opacity="0.5"
          />
          <path
            d="M10 160 C 45 150, 85 170, 125 158 C 155 150, 175 162, 190 160 L 190 190 L 10 190 Z"
            fill="#0284C7"
            opacity="0.8"
          />

          {/* Torso / Traditional Waistcoat */}
          <path d="M60 160 L140 160 L145 200 L55 200 Z" fill="#DC2626" />
          <path d="M75 160 L125 160 L120 200 L80 200 Z" fill="#FACC15" />
          <line x1="100" y1="160" x2="100" y2="200" stroke="#78350F" strokeWidth="2" />

          {/* Neck */}
          <rect x="88" y="130" width="24" height="25" rx="4" fill="#FBD5B5" />

          {/* Head & Ears */}
          <circle cx="68" cy="105" r="10" fill="#FBD5B5" />
          <circle cx="132" cy="105" r="10" fill="#FBD5B5" />
          <ellipse cx="100" cy="105" rx="34" ry="38" fill="#FFE2C6" />

          {/* Iconic Chacha Chaudhary Red Turban */}
          <path
            d="M58 85 C 55 50, 85 30, 100 30 C 120 30, 148 48, 142 85 C 145 92, 130 96, 100 96 C 70 96, 55 92, 58 85 Z"
            fill="#DC2626"
          />
          {/* Turban folds */}
          <path d="M68 62 C 85 45, 125 45, 135 68" stroke="#B91C1C" strokeWidth="3" fill="none" />
          <path d="M62 76 C 85 60, 125 60, 140 78" stroke="#991B1B" strokeWidth="3" fill="none" />
          {/* Turban Brooch / Namami Gange symbol */}
          <circle cx="100" cy="48" r="6" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="100" cy="48" r="2.5" fill="#0284C7" />

          {/* Eyebrows (Attentive in listening, thoughtful in thinking) */}
          <path
            d={
              state === 'listening'
                ? 'M76 84 Q 86 78 94 84'
                : state === 'thinking'
                ? 'M78 86 Q 86 80 94 87'
                : 'M78 88 Q 86 83 94 88'
            }
            stroke="#4B5563"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={
              state === 'listening'
                ? 'M106 84 Q 114 78 124 84'
                : state === 'thinking'
                ? 'M106 87 Q 114 80 122 86'
                : 'M106 88 Q 114 83 122 88'
            }
            stroke="#4B5563"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Eyes with wise twinkling catchlights */}
          <circle
            cx="86"
            cy={state === 'listening' ? '96' : '98'}
            r={state === 'listening' ? '5.5' : '5'}
            fill="#1F2937"
          />
          <circle cx="88" cy={state === 'listening' ? '94' : '96'} r="1.8" fill="#FFFFFF" />
          <circle
            cx="114"
            cy={state === 'listening' ? '96' : '98'}
            r={state === 'listening' ? '5.5' : '5'}
            fill="#1F2937"
          />
          <circle cx="116" cy={state === 'listening' ? '94' : '96'} r="1.8" fill="#FFFFFF" />

          {/* Nose */}
          <ellipse cx="100" cy="108" rx="4.5" ry="6" fill="#F6AD55" />

          {/* ============================================================== */}
          {/* VIVID LIP-SYNC MOUTH (Layered under mustache with teeth & tongue) */}
          {/* ============================================================== */}
          {state === 'speaking' ? (
            <g>
              {/* Dynamic open/close mouth cavity */}
              <motion.ellipse
                cx="100"
                cy="128"
                animate={{
                  rx: [4, 6.5, 4.5, 7.5, 4.5, 6, 4],
                  ry: [2, 6.5, 2.8, 7.8, 2.5, 5.5, 2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                fill="#7F1D1D"
                stroke="#991B1B"
                strokeWidth="1"
              />
              {/* Upper Teeth */}
              <motion.rect
                x="96.5"
                y="122.5"
                width="7"
                height="2.5"
                rx="1"
                fill="#FFFFFF"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              {/* Animated pink tongue */}
              <motion.ellipse
                cx="100"
                cy="131"
                animate={{
                  rx: [2.5, 4.2, 3, 5, 2.8, 4, 2.5],
                  ry: [1, 2.8, 1.5, 3.5, 1.4, 2.5, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                fill="#FB7185"
              />
            </g>
          ) : state === 'listening' ? (
            <ellipse cx="100" cy="126" rx="4" ry="2.5" fill="#991B1B" />
          ) : (
            <path
              d={
                state === 'celebrating' || state === 'happy'
                  ? 'M90 125 Q 100 138 110 125'
                  : 'M93 125 Q 100 132 107 125'
              }
              stroke="#991B1B"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* ============================================================== */}
          {/* ICONIC WHITE MUSTACHE (Framing the Mouth with Speech Bob)       */}
          {/* ============================================================== */}
          <motion.path
            d="M100 114 C 92 110, 72 112, 68 126 C 78 126, 92 122, 100 117 C 108 122, 122 126, 132 126 C 128 112, 108 110, 100 114 Z"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="1.5"
            animate={
              state === 'speaking'
                ? { y: [0, -1, 0, -1.2, 0] }
                : { y: 0 }
            }
            transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
          />

          {/* LISTENING INDICATOR OVERLAY (Microphone on ear) */}
          {state === 'listening' && (
            <g transform="translate(140, 70)">
              <circle cx="12" cy="12" r="14" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2" />
              <rect x="9.5" y="6" width="5" height="8" rx="2.5" fill="#E11D48" />
              <path d="M7 10 C 7 14, 17 14, 17 10" stroke="#E11D48" strokeWidth="1.5" fill="none" />
              <line x1="12" y1="14" x2="12" y2="17" stroke="#E11D48" strokeWidth="1.5" />
            </g>
          )}

          {/* THINKING BRAIN INDICATOR OVERLAY */}
          {state === 'thinking' && (
            <g transform="translate(140, 30)">
              <circle cx="12" cy="12" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
              <path
                d="M7 12 Q 12 6 17 12 Q 12 18 7 12"
                stroke="#854D0E"
                strokeWidth="2"
                fill="none"
              />
            </g>
          )}

          {/* SPEAKING AUDIO WAVES OVERLAY */}
          {state === 'speaking' && (
            <g transform="translate(145, 95)">
              <circle cx="10" cy="10" r="12" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
              <path d="M7 6 Q 11 10 7 14" stroke="#047857" strokeWidth="2" fill="none" />
              <path d="M11 4 Q 16 10 11 16" stroke="#047857" strokeWidth="2" fill="none" />
            </g>
          )}
        </svg>

        {/* Mascot Mode Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white/95 border border-slate-200 text-[10px] font-semibold text-slate-600 px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 z-20">
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-rose-500 animate-ping'
                : state === 'speaking'
                ? 'bg-emerald-500 animate-pulse'
                : state === 'thinking'
                ? 'bg-amber-500 animate-pulse'
                : 'bg-ganga-500'
            }`}
          />
          <span>
            {state === 'listening'
              ? 'Listening 🎤'
              : state === 'speaking'
              ? 'Speaking 🔊'
              : state === 'thinking'
              ? 'Thinking 🤔'
              : 'AI Mascot'}
          </span>
        </div>
      </motion.div>

      {/* State Status Tag */}
      <div
        className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${currentBadge.color} transition-all duration-300`}
      >
        <BadgeIcon className="w-4 h-4 shrink-0" />
        <span>{currentBadge.text}</span>
      </div>

      {/* Visual Audio Waveform Equalizer when Listening */}
      {state === 'listening' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2.5 flex items-center justify-center gap-1 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full"
        >
          <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1 h-5 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-2.5 bg-rose-500 rounded-full animate-bounce" />
          <span className="w-1 h-4 bg-rose-600 rounded-full animate-bounce [animation-delay:-0.25s]" />
          <span className="w-1 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
          <span className="text-[10px] font-bold text-rose-700 ml-1">Live Audio Wave</span>
        </motion.div>
      )}

      {/* Visual Audio Waveform Equalizer when Speaking */}
      {state === 'speaking' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2.5 flex items-center justify-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full"
        >
          <span className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce" />
          <span className="w-1 h-4 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.2s]" />
          <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.4s]" />
          <span className="w-1 h-5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.1s]" />
          <span className="w-1 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="text-[10px] font-bold text-emerald-700 ml-1">Voice Lip-Sync Active</span>
        </motion.div>
      )}
    </div>
  );
};

export const Mascot = ChachaAvatar;
export default ChachaAvatar;
