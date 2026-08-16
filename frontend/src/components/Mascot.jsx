import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Volume2, Award, HeartHandshake } from 'lucide-react';

/**
 * Reusable Mascot Component for Chacha Chaudhary (GangaMitra)
 * Props:
 * - state: 'idle' | 'thinking' | 'speaking' | 'happy' | 'celebrating'
 * - size: 'sm' | 'md' | 'lg' | 'xl'
 * - interactive: boolean
 * - speechText: optional string to show in animated bubble
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
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  const stateBadges = {
    idle: {
      text: 'Ganga Mitra',
      color: 'bg-ganga-100 text-ganga-800 border-ganga-200',
      icon: Sparkles,
    },
    thinking: {
      text: 'Thinking faster than a computer...',
      color: 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse',
      icon: Brain,
    },
    speaking: {
      text: 'Chacha is speaking...',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
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
          className="mb-3 max-w-xs bg-white text-slate-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl rounded-bl-none shadow-md border border-slate-100 relative"
        >
          <p className="leading-relaxed">{speechText}</p>
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b border-r border-slate-100 transform rotate-45" />
        </motion.div>
      )}

      {/* Mascot Avatar Graphic Container */}
      <motion.div
        animate={
          state === 'thinking'
            ? { y: [0, -6, 0], rotate: [-1, 1, -1] }
            : state === 'speaking'
            ? { scale: [1, 1.03, 1] }
            : state === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : { y: [0, -5, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: state === 'thinking' ? 1.8 : state === 'speaking' ? 1.2 : 3.5,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        className={`relative ${sizeMap[size] || sizeMap.lg} cursor-pointer group flex items-center justify-center`}
      >
        {/* Glow halo behind mascot */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-500 ${
            state === 'thinking'
              ? 'bg-amber-300'
              : state === 'speaking'
              ? 'bg-emerald-300'
              : state === 'celebrating'
              ? 'bg-sacred-saffron'
              : 'bg-ganga-300'
          }`}
        />

        {/* Chacha Chaudhary Mascot SVG Character Illustration */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Badge Background */}
          <circle cx="100" cy="100" r="92" fill="#F0F7FF" stroke="#0284C7" strokeWidth="4" />
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

          {/* Eyebrows */}
          <path d="M78 88 Q 86 83 94 88" stroke="#4B5563" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M106 88 Q 114 83 122 88" stroke="#4B5563" strokeWidth="3.5" strokeLinecap="round" />

          {/* Eyes with wise twinkling catchlights */}
          <circle cx="86" cy="98" r="5" fill="#1F2937" />
          <circle cx="88" cy="96" r="1.8" fill="#FFFFFF" />
          <circle cx="114" cy="98" r="5" fill="#1F2937" />
          <circle cx="116" cy="96" r="1.8" fill="#FFFFFF" />

          {/* Nose */}
          <ellipse cx="100" cy="108" rx="4.5" ry="6" fill="#F6AD55" />

          {/* Iconic White Mustache */}
          <path
            d="M100 114 C 92 110, 72 112, 68 126 C 78 126, 92 122, 100 117 C 108 122, 122 126, 132 126 C 128 112, 108 110, 100 114 Z"
            fill="#FFFFFF"
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />

          {/* Cheerful Smile Mouth */}
          <path
            d={
              state === 'speaking'
                ? 'M92 126 Q 100 136 108 126 Z'
                : state === 'celebrating' || state === 'happy'
                ? 'M90 125 Q 100 138 110 125'
                : 'M93 125 Q 100 132 107 125'
            }
            stroke="#991B1B"
            strokeWidth="2.5"
            fill={state === 'speaking' ? '#991B1B' : 'none'}
            strokeLinecap="round"
          />

          {/* Thinking Brain Indicator Overlay */}
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

          {/* Speaking Audio Waves Overlay */}
          {state === 'speaking' && (
            <g transform="translate(145, 100)">
              <circle cx="10" cy="10" r="12" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
              <path d="M7 6 Q 11 10 7 14" stroke="#047857" strokeWidth="2" fill="none" />
              <path d="M11 4 Q 16 10 11 16" stroke="#047857" strokeWidth="2" fill="none" />
            </g>
          )}
        </svg>

        {/* Future Robot Hardware / 3D Avatar Connection Slot Indicator (Subtle badge) */}
        <div className="absolute -bottom-1 -right-1 bg-white/95 border border-slate-200 text-[10px] font-semibold text-slate-600 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>AI Mascot</span>
        </div>
      </motion.div>

      {/* State Status Tag */}
      <div
        className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${currentBadge.color} transition-all duration-300`}
      >
        <BadgeIcon className="w-3.5 h-3.5" />
        <span>{currentBadge.text}</span>
      </div>
    </div>
  );
};
