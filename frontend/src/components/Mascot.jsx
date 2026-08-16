import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Volume2, Award, HeartHandshake, Mic } from 'lucide-react';

/**
 * Authentic Chacha Chaudhary Mascot Component for GangaMitra-KAVAAI (SIH1290)
 * Visuals:
 * - Iconic large traditional red/crimson turban with layered fabric wraps
 * - Trademark thick, sweeping long white curved moustache
 * - Yellow traditional kurta with black/dark waistcoat & red scarf accents
 * - Fully animated states: idle, listening, thinking, speaking, happy, celebrating
 */
export const Mascot = ({
  state = 'idle',
  size = 'lg',
  interactive = true,
  speechText = null,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-44 h-44',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  const stateBadges = {
    idle: {
      text: 'Chacha Chaudhary (Ganga Mitra)',
      color: 'bg-ganga-100 text-ganga-800 border-ganga-200',
      icon: Sparkles,
    },
    listening: {
      text: 'Chacha is listening to you...',
      color: 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-400/40 animate-pulse',
      icon: Mic,
    },
    thinking: {
      text: 'Thinking faster than a computer...',
      color: 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse',
      icon: Brain,
    },
    speaking: {
      text: 'Chacha is speaking...',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-sm',
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
          className="mb-3 max-w-xs bg-white text-slate-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl rounded-bl-none shadow-md border border-slate-100 relative z-20"
        >
          <p className="leading-relaxed">{speechText}</p>
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-slate-100 transform rotate-45" />
        </motion.div>
      )}

      {/* Mascot Avatar Graphic Container */}
      <motion.div
        animate={
          state === 'listening'
            ? { scale: [1, 1.03, 1], y: [0, -3, 0] }
            : state === 'thinking'
            ? { y: [0, -6, 0], rotate: [-1, 1, -1] }
            : state === 'speaking'
            ? { scale: [1, 1.025, 1], y: [0, -2, 0] }
            : state === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : { y: [0, -5, 0] }
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
        {/* Glow halo behind mascot */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-50 transition-all duration-500 ${
            state === 'listening'
              ? 'bg-rose-400 scale-110'
              : state === 'thinking'
              ? 'bg-amber-300'
              : state === 'speaking'
              ? 'bg-emerald-300 scale-105'
              : state === 'celebrating'
              ? 'bg-sacred-saffron'
              : 'bg-ganga-300'
          }`}
        />

        {/* Listening Concentric Waves Ring */}
        {state === 'listening' && (
          <>
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-rose-400 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-rose-300 pointer-events-none"
            />
          </>
        )}

        {/* Authentic Chacha Chaudhary Character SVG */}
        <svg
          viewBox="0 0 220 220"
          className="w-full h-full drop-shadow-xl z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Badge Background with River Wave motif */}
          <circle
            cx="110"
            cy="110"
            r="102"
            fill="#F8FAFC"
            stroke={state === 'listening' ? '#F43F5E' : state === 'speaking' ? '#10B981' : '#0284C7'}
            strokeWidth="4"
            className="transition-colors duration-300"
          />
          <circle cx="110" cy="110" r="96" fill="#FFFFFF" />

          {/* Gentle background river water accent */}
          <path
            d="M20 165 C 60 150, 100 175, 140 160 C 170 150, 195 165, 210 160 L 210 210 L 10 210 Z"
            fill="#E0F2FE"
            opacity="0.7"
          />
          <path
            d="M10 180 C 55 170, 95 190, 145 178 C 175 170, 195 182, 210 180 L 210 210 L 10 210 Z"
            fill="#0284C7"
            opacity="0.85"
          />

          {/* ============================================================== */}
          {/* 1. BODY & CLOTHING (Iconic Yellow Kurta + Dark Vest + Red Scarf) */}
          {/* ============================================================== */}
          
          {/* Yellow Kurta / Shirt Body */}
          <path
            d="M50 175 C 50 160, 80 155, 110 155 C 140 155, 170 160, 170 175 L 178 220 L 42 220 Z"
            fill="#FACC15"
          />
          {/* Kurta Collar detail */}
          <path d="M96 155 L110 172 L124 155 Z" fill="#EAB308" />

          {/* Dark Traditional Waistcoat / Vest */}
          <path
            d="M50 175 L82 175 L88 220 L42 220 Z"
            fill="#1E293B"
          />
          <path
            d="M170 175 L138 175 L132 220 L178 220 Z"
            fill="#1E293B"
          />

          {/* Red Scarf / Angavastram Accent */}
          <path
            d="M74 165 C 78 180, 84 205, 86 220 L 76 220 C 72 205, 68 180, 66 165 Z"
            fill="#DC2626"
          />
          
          {/* Buttons on Kurta */}
          <circle cx="110" cy="184" r="2.5" fill="#78350F" />
          <circle cx="110" cy="198" r="2.5" fill="#78350F" />
          <circle cx="110" cy="212" r="2.5" fill="#78350F" />

          {/* Neck */}
          <rect x="96" y="132" width="28" height="28" rx="6" fill="#FCD34D" />

          {/* ============================================================== */}
          {/* 2. HEAD, EARS & FACE STRUCTURE */}
          {/* ============================================================== */}
          
          {/* Large Friendly Ears */}
          <circle cx="68" cy="118" r="13" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          <path d="M68 112 C 64 116, 64 122, 68 124" stroke="#D97706" strokeWidth="1.5" fill="none" />

          <circle cx="152" cy="118" r="13" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          <path d="M152 112 C 156 116, 156 122, 152 124" stroke="#D97706" strokeWidth="1.5" fill="none" />

          {/* Cheerful Head / Face Oval */}
          <ellipse cx="110" cy="118" rx="42" ry="42" fill="#FDE68A" />

          {/* ============================================================== */}
          {/* 3. ICONIC LARGE TRADITIONAL RED/CRIMSON PAGRI (TURBAN) */}
          {/* ============================================================== */}
          
          {/* Main Turban Crown Silhouette (High arched traditional wrap) */}
          <path
            d="M48 95 C 44 48, 75 20, 110 20 C 145 20, 176 48, 172 95 C 175 105, 150 110, 110 110 C 70 110, 45 105, 48 95 Z"
            fill="#DC2626"
          />
          {/* Turban top crest layer (bulbous authentic pagri drape) */}
          <path
            d="M58 80 C 52 38, 80 18, 114 18 C 150 18, 170 38, 164 80 C 158 52, 120 30, 92 40 C 70 48, 60 65, 58 80 Z"
            fill="#B91C1C"
          />
          {/* Layered folds and pleated fabric wraps across forehead */}
          <path
            d="M48 92 C 72 75, 148 72, 172 92"
            stroke="#991B1B"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M52 82 C 78 62, 142 62, 168 82"
            stroke="#7F1D1D"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M62 68 C 85 50, 135 50, 158 68"
            stroke="#991B1B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M72 52 C 92 38, 128 38, 148 52"
            stroke="#7F1D1D"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Turban Golden Brooch / Central Namami Gange Badge */}
          <circle cx="110" cy="74" r="8" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
          <circle cx="110" cy="74" r="4" fill="#0284C7" />
          <circle cx="110" cy="74" r="1.5" fill="#FFFFFF" />

          {/* ============================================================== */}
          {/* 4. FACIAL FEATURES: EYEBROWS, EYES, NOSE, WRINKLES */}
          {/* ============================================================== */}
          
          {/* Expressive Thick White/Gray Eyebrows */}
          <path
            d={
              state === 'listening'
                ? 'M82 96 Q 94 88 102 95'
                : 'M82 98 Q 94 92 102 98'
            }
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d={
              state === 'listening'
                ? 'M118 95 Q 126 88 138 96'
                : 'M118 98 Q 126 92 138 98'
            }
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Big Expressive Cartoon Eyes */}
          <ellipse cx="92" cy="108" rx="7" ry="8" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="93" cy="108" r={state === 'listening' ? '4.5' : '4'} fill="#1F2937" />
          <circle cx="95" cy="106" r="1.8" fill="#FFFFFF" />

          <ellipse cx="128" cy="108" rx="7" ry="8" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="127" cy="108" r={state === 'listening' ? '4.5' : '4'} fill="#1F2937" />
          <circle cx="129" cy="106" r="1.8" fill="#FFFFFF" />

          {/* Round Friendly Nose */}
          <ellipse cx="110" cy="118" rx="6.5" ry="8" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />

          {/* ============================================================== */}
          {/* 5. ANIMATED MOUTH (LIP-SYNC UNDERNEATH MOUSTACHE) */}
          {/* ============================================================== */}
          
          {state === 'speaking' ? (
            <g>
              {/* Mouth Cavity with dynamic opening and closing */}
              <motion.ellipse
                cx="110"
                cy="142"
                animate={{
                  rx: [5, 9, 6, 10, 5],
                  ry: [3, 9, 4, 11, 3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                fill="#881337"
                stroke="#9F1239"
                strokeWidth="1.5"
              />
              {/* Tongue accent */}
              <motion.ellipse
                cx="110"
                cy="146"
                animate={{
                  rx: [3, 5, 4, 6, 3],
                  ry: [1.5, 3.5, 2, 4, 1.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                fill="#FB7185"
              />
            </g>
          ) : state === 'listening' ? (
            <ellipse cx="110" cy="140" rx="4.5" ry="3" fill="#991B1B" />
          ) : (
            /* Cheerful smiling mouth line */
            <path
              d={
                state === 'celebrating' || state === 'happy'
                  ? 'M98 138 Q 110 152 122 138'
                  : 'M100 138 Q 110 146 120 138'
              }
              stroke="#991B1B"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* ============================================================== */}
          {/* 6. ICONIC LONG CURVED WHITE MOUSTACHE (PROMINENT & SWEEPING) */}
          {/* ============================================================== */}
          
          <motion.g
            animate={
              state === 'speaking'
                ? { y: [0, -1.8, 0, -1.2, 0] }
                : { y: 0 }
            }
            transition={{ repeat: Infinity, duration: 0.28, ease: 'easeInOut' }}
          >
            {/* Moustache Base Shadow */}
            <path
              d="M110 124 C 98 120, 68 122, 54 140 C 70 140, 96 135, 110 129 C 124 135, 150 140, 166 140 C 152 122, 122 120, 110 124 Z"
              fill="#E2E8F0"
            />
            {/* Main Thick Sweeping White Moustache */}
            <path
              d="M110 122 C 96 117, 66 119, 52 138 C 70 138, 98 132, 110 126 C 122 132, 150 138, 168 138 C 154 119, 124 117, 110 122 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Moustache central parting line & texture */}
            <path
              d="M110 122 L110 126"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <path
              d="M74 130 C 88 128, 102 125, 110 124 C 118 125, 132 128, 146 130"
              stroke="#F1F5F9"
              strokeWidth="1.5"
              fill="none"
            />
          </motion.g>

          {/* Chin Definition */}
          <path
            d="M102 154 Q 110 158 118 154"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* 7. STATE OVERLAYS (LISTENING / THINKING / SPEAKING) */}
          {/* ============================================================== */}
          
          {/* LISTENING INDICATOR OVERLAY (Microphone badge on ear) */}
          {state === 'listening' && (
            <g transform="translate(156, 76)">
              <circle cx="13" cy="13" r="15" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2.5" />
              <rect x="10.5" y="7" width="5" height="8.5" rx="2.5" fill="#E11D48" />
              <path d="M8 11 C 8 15.5, 18 15.5, 18 11" stroke="#E11D48" strokeWidth="1.8" fill="none" />
              <line x1="13" y1="15.5" x2="13" y2="19" stroke="#E11D48" strokeWidth="1.8" />
            </g>
          )}

          {/* THINKING BRAIN INDICATOR OVERLAY */}
          {state === 'thinking' && (
            <g transform="translate(156, 30)">
              <circle cx="13" cy="13" r="15" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
              <path
                d="M8 13 Q 13 7 18 13 Q 13 19 8 13"
                stroke="#854D0E"
                strokeWidth="2.5"
                fill="none"
              />
            </g>
          )}

          {/* SPEAKING AUDIO WAVES OVERLAY */}
          {state === 'speaking' && (
            <g transform="translate(160, 105)">
              <circle cx="12" cy="12" r="14" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
              <path d="M8 7 Q 13 12 8 17" stroke="#047857" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M12 5 Q 18 12 12 19" stroke="#047857" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* Mascot Mode Tag Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white/95 border border-slate-200 text-[10px] font-bold text-slate-700 px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1.5 z-20">
          <span
            className={`w-2 h-2 rounded-full ${
              state === 'listening'
                ? 'bg-rose-500 animate-ping'
                : state === 'speaking'
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-sacred-saffron'
            }`}
          />
          <span>{state === 'listening' ? 'Listening' : state === 'speaking' ? 'Speaking' : 'Chacha Chaudhary'}</span>
        </div>
      </motion.div>

      {/* State Status Pill */}
      <div
        className={`mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border ${currentBadge.color} transition-all duration-300`}
      >
        <BadgeIcon className="w-3.5 h-3.5" />
        <span>{currentBadge.text}</span>
      </div>
    </div>
  );
};
