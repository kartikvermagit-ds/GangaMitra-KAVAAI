import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Volume2, Award, HeartHandshake, Mic, AlertCircle } from 'lucide-react';

/**
 * Interactive Animated Vector Avatar of Chacha Chaudhary (GangaMitra)
 * Features:
 * - Pure scalable vector character with authentic Chacha Chaudhary design
 * - Iconic red turban with fan-crest (turra) & trailing scarf
 * - White forehead lock, large expressive cartoon eyes, round button nose
 * - Long, thick, sweeping pure white moustache
 * - Yellow shirt, black vest, red necktie, signature thumbs-up 👍 & wooden cane 🦯
 * - Scenic Ganga river, bridge & ancient temple ghats backdrop
 * - Dynamic mouth lip-sync that opens & closes in real-time during speech
 * - State animations: IDLE, LISTENING, THINKING, SPEAKING, HAPPY, CELEBRATING, ERROR
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

        {/* ============================================================== */}
        {/* PURE ANIMATED VECTOR ARTWORK: CHACHA CHAUDHARY & GANGA SCENE   */}
        {/* ============================================================== */}
        <svg
          viewBox="0 0 280 280"
          className="w-full h-full drop-shadow-2xl z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Clip path for circular scenic portal */}
            <clipPath id="vectorPortalClip">
              <circle cx="140" cy="140" r="120" />
            </clipPath>

            {/* Gradients */}
            <linearGradient id="vSkyGrad" x1="140" y1="20" x2="140" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="60%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id="vRiverGrad" x1="140" y1="150" x2="140" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            <linearGradient id="vTurbanGrad" x1="100" y1="40" x2="180" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            <linearGradient id="vTurraGrad" x1="90" y1="30" x2="130" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            <linearGradient id="vSkinGrad" x1="140" y1="100" x2="140" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>
          </defs>

          {/* Outer Glowing Border Ring */}
          <circle
            cx="140"
            cy="140"
            r="128"
            fill="none"
            stroke={state === 'listening' ? '#F43F5E' : state === 'speaking' ? '#10B981' : state === 'error' ? '#EF4444' : '#38BDF8'}
            strokeWidth="8"
            className="transition-colors duration-300"
          />
          <circle cx="140" cy="140" r="122" fill="#FFFFFF" />

          {/* Circular Scenic Portal Background */}
          <g clipPath="url(#vectorPortalClip)">
            {/* Sky Background */}
            <rect x="0" y="0" width="280" height="280" fill="url(#vSkyGrad)" />

            {/* Clouds */}
            <circle cx="60" cy="70" r="22" fill="#FFFFFF" opacity="0.6" />
            <circle cx="80" cy="65" r="26" fill="#FFFFFF" opacity="0.6" />
            <circle cx="100" cy="72" r="20" fill="#FFFFFF" opacity="0.6" />
            <circle cx="210" cy="80" r="24" fill="#FFFFFF" opacity="0.5" />
            <circle cx="235" cy="75" r="28" fill="#FFFFFF" opacity="0.5" />

            {/* Birds */}
            <path d="M70 100 Q 75 96 80 100 Q 85 96 90 100" stroke="#0369A1" strokeWidth="1.5" fill="none" />
            <path d="M190 90 Q 194 87 198 90 Q 202 87 206 90" stroke="#0369A1" strokeWidth="1.5" fill="none" />

            {/* River Bridge */}
            <rect x="40" y="140" width="120" height="8" fill="#E2E8F0" />
            <path d="M45 148 Q 57 140 70 148 Q 82 140 95 148 Q 107 140 120 148 Q 132 140 145 148" stroke="#94A3B8" strokeWidth="3" fill="#BAE6FD" />

            {/* Ancient Temple Ghats & Spires */}
            <path d="M205 150 L205 110 L212 90 L219 110 L219 150 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
            <path d="M188 150 L188 120 L195 105 L202 120 L202 150 Z" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
            <path d="M222 150 L222 125 L228 112 L234 125 L234 150 Z" fill="#FEF08A" stroke="#D97706" strokeWidth="1" />
            <circle cx="212" cy="88" r="3" fill="#D97706" />
            <circle cx="195" cy="103" r="2.5" fill="#D97706" />
            <rect x="180" y="145" width="60" height="15" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
            <line x1="175" y1="154" x2="245" y2="154" stroke="#B45309" strokeWidth="1.5" />
            <line x1="175" y1="158" x2="245" y2="158" stroke="#B45309" strokeWidth="1.5" />

            {/* Flowing River Ganga */}
            <path d="M0 152 C 80 145, 180 160, 280 150 L 280 280 L 0 280 Z" fill="url(#vRiverGrad)" />
            <path d="M20 170 C 90 165, 170 175, 260 168" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <path d="M40 190 C 110 185, 190 195, 270 188" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* ============================================================== */}
          {/* 1. CLOTHING (Yellow Kurta + Black Vest + Red Tie + Cane & Thumb) */}
          {/* ============================================================== */}

          {/* Yellow Kurta Body */}
          <path
            d="M75 220 C 75 190, 105 185, 140 185 C 175 185, 205 190, 205 220 L 215 280 L 65 280 Z"
            fill="#FACC15"
          />

          {/* Black Waistcoat / Vest */}
          <path
            d="M92 188 L122 188 L126 280 L72 280 Z"
            fill="#1E293B"
          />
          <path
            d="M188 188 L158 188 L154 280 L208 280 Z"
            fill="#1E293B"
          />
          {/* Vest center buttons */}
          <circle cx="140" cy="225" r="3" fill="#64748B" />
          <circle cx="140" cy="245" r="3" fill="#64748B" />
          <circle cx="140" cy="265" r="3" fill="#64748B" />

          {/* Red Tie */}
          <path d="M132 185 L148 185 L145 235 L140 242 L135 235 Z" fill="#DC2626" />
          <path d="M130 185 L140 196 L150 185 Z" fill="#B91C1C" />

          {/* Left Hand with Walking Cane */}
          <g>
            <path
              d="M78 200 C 78 188, 88 185, 96 185 C 98 185, 100 187, 100 190 C 100 193, 98 195, 96 195 C 90 195, 86 197, 86 204 L 86 280 L 78 280 Z"
              fill="#78350F"
            />
            <circle cx="94" cy="204" r="10" fill="#FED7AA" stroke="#D97706" strokeWidth="1" />
            <path d="M88 200 C 94 198, 98 198, 102 203" stroke="#D97706" strokeWidth="1.5" fill="none" />
          </g>

          {/* Right Hand giving Signature Thumbs Up (👍) */}
          <g>
            <path d="M192 195 C 205 198, 220 208, 218 226 L 196 238 Z" fill="#FACC15" />
            <circle cx="218" cy="214" r="11" fill="#FED7AA" stroke="#D97706" strokeWidth="1.5" />
            <path
              d="M214 212 C 214 200, 217 182, 223 182 C 228 182, 230 192, 228 206 C 228 214, 222 216, 214 212 Z"
              fill="#FED7AA"
              stroke="#D97706"
              strokeWidth="1.5"
            />
            <path d="M218 206 C 222 206, 225 208, 226 214" stroke="#D97706" strokeWidth="1.2" fill="none" />
          </g>

          {/* ============================================================== */}
          {/* 2. NECK, EARS & ROUND CARTOON FACE */}
          {/* ============================================================== */}
          
          <rect x="122" y="152" width="36" height="34" rx="8" fill="url(#vSkinGrad)" />

          {/* Large Friendly Ears */}
          <circle cx="90" cy="138" r="14" fill="#FED7AA" stroke="#D97706" strokeWidth="1.5" />
          <path d="M90 131 C 86 135, 86 142, 90 145" stroke="#D97706" strokeWidth="2" fill="none" />

          <circle cx="190" cy="138" r="14" fill="#FED7AA" stroke="#D97706" strokeWidth="1.5" />
          <path d="M190 131 C 194 135, 194 142, 190 145" stroke="#D97706" strokeWidth="2" fill="none" />

          {/* Round Cartoon Face */}
          <ellipse cx="140" cy="138" rx="46" ry="44" fill="url(#vSkinGrad)" stroke="#D97706" strokeWidth="1" />

          {/* White Hair Tuft on Forehead */}
          <path
            d="M125 106 C 130 94, 142 94, 148 106 C 140 102, 132 102, 125 106 Z"
            fill="#FFFFFF"
          />

          {/* ============================================================== */}
          {/* 3. ICONIC RED TURBAN WITH FAN-CREST (TURRA) & SCARF */}
          {/* ============================================================== */}

          {/* Trailing Red Turban Scarf */}
          <path
            d="M95 180 C 65 190, 50 205, 52 230 C 75 220, 100 205, 118 190 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="1.5"
          />
          <path
            d="M52 230 C 75 210, 100 200, 122 188"
            stroke="#B91C1C"
            strokeWidth="2"
            fill="none"
          />

          {/* Pleated Fan-Crest (Turra / कलंगी) */}
          <path
            d="M92 90 C 82 50, 80 30, 94 24 C 104 20, 112 36, 120 28 C 128 22, 138 28, 140 38 C 142 50, 134 76, 128 92 Z"
            fill="url(#vTurraGrad)"
            stroke="#7F1D1D"
            strokeWidth="2"
          />
          <path d="M108 90 L96 26" stroke="#991B1B" strokeWidth="2" />
          <path d="M114 90 L118 30" stroke="#991B1B" strokeWidth="2" />
          <path d="M120 90 L136 34" stroke="#991B1B" strokeWidth="2" />
          <path d="M102 92 C 100 84, 124 84, 126 92" stroke="#FACC15" strokeWidth="3" fill="none" />

          {/* Main Arched Red Turban */}
          <path
            d="M72 110 C 66 56, 104 28, 142 28 C 182 28, 214 56, 208 110 C 212 122, 185 128, 140 128 C 95 128, 68 122, 72 110 Z"
            fill="url(#vTurbanGrad)"
            stroke="#991B1B"
            strokeWidth="2"
          />

          {/* Turban Folds */}
          <path
            d="M72 106 C 105 85, 175 82, 208 106"
            stroke="#7F1D1D"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M78 94 C 110 72, 170 70, 202 94"
            stroke="#991B1B"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M88 78 C 118 58, 162 58, 192 78"
            stroke="#7F1D1D"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M102 60 C 126 48, 154 48, 178 60"
            stroke="#991B1B"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* ============================================================== */}
          {/* 4. FACIAL EXPRESSIONS: EYEBROWS, BIG SHINY EYES, BUTTON NOSE */}
          {/* ============================================================== */}

          <path
            d={
              state === 'listening'
                ? 'M108 116 Q 120 108 130 115'
                : 'M108 118 Q 120 112 130 118'
            }
            stroke="#1F2937"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={
              state === 'listening'
                ? 'M150 115 Q 160 108 172 116'
                : 'M150 118 Q 160 112 172 118'
            }
            stroke="#1F2937"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Big Shiny Cartoon Eyes */}
          <ellipse cx="120" cy="128" rx="8.5" ry="9.5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
          <circle cx="121" cy="128" r={state === 'listening' ? '5.5' : '5'} fill="#1F2937" />
          <circle cx="123" cy="126" r="2.2" fill="#FFFFFF" />

          <ellipse cx="160" cy="128" rx="8.5" ry="9.5" fill="#FFFFFF" stroke="#1F2937" strokeWidth="2" />
          <circle cx="159" cy="128" r={state === 'listening' ? '5.5' : '5'} fill="#1F2937" />
          <circle cx="161" cy="126" r="2.2" fill="#FFFFFF" />

          {/* Round Button Nose */}
          <ellipse cx="140" cy="138" rx="7.5" ry="9" fill="#FB923C" stroke="#EA580C" strokeWidth="1.5" />

          {/* ============================================================== */}
          {/* 5. ANIMATED OPEN MOUTH (REAL-TIME LIP-SYNC UNDERNEATH MOUSTACHE) */}
          {/* ============================================================== */}
          {state === 'speaking' ? (
            <g>
              {/* Dynamic Lip-Sync Mouth Cavity */}
              <motion.ellipse
                cx="140"
                cy="164"
                animate={{
                  rx: [5, 11, 6, 13, 5],
                  ry: [3, 11, 4, 13, 3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.28,
                  ease: 'easeInOut',
                }}
                fill="#881337"
                stroke="#9F1239"
                strokeWidth="1.5"
              />
              {/* Animated Tongue */}
              <motion.ellipse
                cx="140"
                cy="169"
                animate={{
                  rx: [3, 7, 4, 8, 3],
                  ry: [1.5, 4.5, 2, 5, 1.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.28,
                  ease: 'easeInOut',
                }}
                fill="#FB7185"
              />
            </g>
          ) : state === 'listening' ? (
            <ellipse cx="140" cy="162" rx="5" ry="3.5" fill="#991B1B" />
          ) : (
            /* Cheerful open smile with tongue */
            <g>
              <path
                d="M125 158 Q 140 178 155 158 Z"
                fill="#991B1B"
                stroke="#7F1D1D"
                strokeWidth="1.5"
              />
              <path
                d="M130 166 Q 140 176 150 166 Z"
                fill="#FB7185"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* 6. MAGNIFICENT SWEEPING WHITE MOUSTACHE (UPWARD-CURVED WINGS) */}
          {/* ============================================================== */}
          <motion.g
            animate={
              state === 'speaking'
                ? { y: [0, -2.5, 0, -1.5, 0] }
                : { y: 0 }
            }
            transition={{ repeat: Infinity, duration: 0.28, ease: 'easeInOut' }}
          >
            {/* Shadow under Moustache */}
            <path
              d="M140 144 C 126 138, 86 138, 70 162 C 90 162, 122 156, 140 149 C 158 156, 190 162, 210 162 C 194 138, 154 138, 140 144 Z"
              fill="#CBD5E1"
            />
            {/* Main Pure-White Sweeping Moustache with Upward-Curved Wing Tips */}
            <path
              d="M140 142 C 124 136, 84 136, 68 160 C 88 160, 124 152, 140 146 C 156 152, 192 160, 212 160 C 196 136, 156 136, 140 142 Z"
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1="140" y1="142" x2="140" y2="146" stroke="#64748B" strokeWidth="1.5" />
            <path d="M96 150 C 114 146, 130 144, 140 144 C 150 144, 166 146, 184 150" stroke="#F1F5F9" strokeWidth="1.8" fill="none" />
          </motion.g>

          {/* Chin definition */}
          <path d="M130 176 Q 140 182 150 176" stroke="#EA580C" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* ============================================================== */}
          {/* 7. STATE OVERLAYS (LISTENING / THINKING / SPEAKING) */}
          {/* ============================================================== */}

          {/* LISTENING INDICATOR OVERLAY */}
          {state === 'listening' && (
            <g transform="translate(195, 95)">
              <circle cx="14" cy="14" r="16" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="3" />
              <rect x="11.5" y="7.5" width="5" height="9" rx="2.5" fill="#E11D48" />
              <path d="M8.5 12 C 8.5 17, 19.5 17, 19.5 12" stroke="#E11D48" strokeWidth="2" fill="none" />
              <line x1="14" y1="17" x2="14" y2="21" stroke="#E11D48" strokeWidth="2" />
            </g>
          )}

          {/* THINKING BRAIN INDICATOR OVERLAY */}
          {state === 'thinking' && (
            <g transform="translate(195, 45)">
              <circle cx="14" cy="14" r="16" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
              <path
                d="M8.5 14 Q 14 7.5 19.5 14 Q 14 20.5 8.5 14"
                stroke="#854D0E"
                strokeWidth="2.5"
                fill="none"
              />
            </g>
          )}

          {/* SPEAKING AUDIO WAVES OVERLAY */}
          {state === 'speaking' && (
            <g transform="translate(200, 130)">
              <circle cx="13" cy="13" r="15" fill="#D1FAE5" stroke="#059669" strokeWidth="2.5" />
              <path d="M8.5 7.5 Q 14 13 8.5 18.5" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M13 5 Q 19.5 13 13 21" stroke="#047857" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          )}
        </svg>

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
