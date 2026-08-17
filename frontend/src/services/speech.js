/**
 * Speech Recognition and Text-to-Speech Service for GangaMitra
 * Refined for authentic, warm Chacha Chaudhary voice tone and accurate phoneme lip-sync.
 */

// Check browser support
export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

export const isSpeechSynthesisSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Preload and cache voices
let cachedVoices = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Creates and starts a SpeechRecognition instance with lifecycle callbacks
 */
export const startVoiceRecognition = ({
  language = 'en',
  onStart,
  onInterimResult,
  onResult,
  onError,
  onEnd,
}) => {
  if (!isSpeechRecognitionSupported()) {
    onError &&
      onError(
        'Voice input is not supported in this browser. Please use Chrome, Edge, or Brave, or type your question instead.',
        'unsupported'
      );
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  let accumulatedFinal = '';
  let lastInterim = '';
  let hasDispatchedResult = false;

  recognition.continuous = false;
  recognition.interimResults = true;
  // Match language explicitly: Hindi ('hi-IN') or Indian English ('en-IN')
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    accumulatedFinal = '';
    lastInterim = '';
    hasDispatchedResult = false;
    onStart && onStart();
  };

  recognition.onresult = (event) => {
    let currentInterim = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0]?.transcript || '';
      if (event.results[i].isFinal) {
        accumulatedFinal += (accumulatedFinal ? ' ' : '') + transcript.trim();
      } else {
        currentInterim += (currentInterim ? ' ' : '') + transcript;
      }
    }

    lastInterim = currentInterim;

    if (currentInterim && onInterimResult) {
      onInterimResult(accumulatedFinal ? `${accumulatedFinal} ${currentInterim}` : currentInterim);
    }

    if (accumulatedFinal) {
      hasDispatchedResult = true;
      onResult && onResult(accumulatedFinal.trim());
    }
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') {
      onEnd && onEnd(hasDispatchedResult);
      return;
    }

    let errorMsg = 'Error during voice recognition';
    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
      errorMsg = 'Microphone permission denied. Please allow microphone access in your browser.';
    } else if (event.error === 'no-speech') {
      errorMsg = 'No voice detected. Please try speaking closer to your microphone.';
    } else if (event.error === 'audio-capture') {
      errorMsg = 'No microphone found. Please check your audio input device.';
    } else if (event.error === 'network') {
      errorMsg = 'Speech Recognition network error: Your college/hostel firewall may be blocking Google Speech servers. Try using Google DNS (8.8.8.8 / 1.1.1.1) or type your query.';
    }

    onError && onError(errorMsg, event.error);
  };

  recognition.onend = () => {
    // If recognition ended before a final event, but we have captured interim speech, send it!
    if (!hasDispatchedResult && lastInterim && lastInterim.trim()) {
      hasDispatchedResult = true;
      onResult && onResult(lastInterim.trim());
    }
    onEnd && onEnd(hasDispatchedResult);
  };

  try {
    recognition.start();
    return recognition;
  } catch (err) {
    if (err.name === 'InvalidStateError') {
      try {
        recognition.stop();
      } catch (e) {}
    } else {
      onError && onError('Could not start voice recognition: ' + err.message, 'start-failed');
    }
    return null;
  }
};

/**
 * Finds the most authentic, mature, warm voice for Chacha Chaudhary
 */
const findBestVoice = (isHindi) => {
  const voices =
    cachedVoices.length > 0
      ? cachedVoices
      : typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis.getVoices()
      : [];

  if (voices.length === 0) return null;

  if (isHindi) {
    // 1. Prefer male / natural Hindi voices for authentic Chacha Chaudhary character
    return (
      voices.find(
        (v) =>
          (v.lang.toLowerCase().replace('_', '-').startsWith('hi') || v.name.toLowerCase().includes('hindi')) &&
          (v.name.toLowerCase().includes('hemant') ||
            v.name.toLowerCase().includes('madhur') ||
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('natural'))
      ) ||
      voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.includes('हिन्दी')
      ) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      null
    );
  }

  // 2. Prefer warm Indian English voices
  return (
    voices.find(
      (v) =>
        v.lang.toLowerCase().replace('_', '-').startsWith('en-in') &&
        (v.name.toLowerCase().includes('ravi') ||
          v.name.toLowerCase().includes('prabhat') ||
          v.name.toLowerCase().includes('male'))
    ) ||
    voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith('en-in')) ||
    voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('en') &&
        (v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('google'))
    ) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
    null
  );
};

/**
 * Clean text for natural, conversational speech (removes formatting & weird symbols)
 */
const sanitizeSpeechText = (raw) => {
  return raw
    .replace(/[#*_`~[\]()]/g, '') // remove markdown symbols
    .replace(/https?:\/\/\S+/g, '') // remove URLs
    .replace(/[-–—]/g, ' ') // replace hyphens/dashes with pauses
    .replace(/[^\w\s\u0900-\u097F.,!?।]/g, ' ') // keep letters, numbers, devanagari & basic punctuation
    .replace(/\s+/g, ' ') // normalize whitespace
    .trim();
};

/**
 * Speaks text using window.speechSynthesis with custom Chacha tone tuning
 */
export const speakText = ({
  text,
  language = 'en',
  onStart,
  onEnd,
  onError,
}) => {
  if (!isSpeechSynthesisSupported() || !text) {
    onEnd && onEnd();
    return null;
  }

  try {
    // Cancel any ongoing speech to prevent overlap
    window.speechSynthesis.cancel();

    const cleanText = sanitizeSpeechText(text);
    if (!cleanText) {
      onEnd && onEnd();
      return null;
    }

    // Auto-detect Hindi script (Devanagari \u0900-\u097F)
    const containsDevanagari = /[\u0900-\u097F]/.test(cleanText);
    const isHindi = language === 'hi' || containsDevanagari;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    
    // Tone settings for a wise, warm, grandfatherly Indian mascot
    utterance.rate = isHindi ? 0.90 : 0.95; // Slightly relaxed, clear pacing
    utterance.pitch = 0.96; // Grounded, warm, mature voice tone (not high or robotic)

    const voice = findBestVoice(isHindi);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      onStart && onStart();
    };

    utterance.onend = () => {
      onEnd && onEnd();
    };

    utterance.onerror = (err) => {
      if (err.error !== 'interrupted' && err.error !== 'canceled') {
        onError && onError(err);
      }
      onEnd && onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return utterance;
  } catch (e) {
    console.warn('TTS error:', e);
    onEnd && onEnd();
    return null;
  }
};

/**
 * Stops any ongoing SpeechSynthesis playback
 */
export const stopSpeaking = () => {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};
