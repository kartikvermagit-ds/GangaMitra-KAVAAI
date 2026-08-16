/**
 * Speech Recognition and Text-to-Speech Service for GangaMitra
 * Wraps browser Web Speech APIs with full lifecycle event hooks,
 * native Hindi/English voice selection, and robust error handling.
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

  let hasResult = false;

  recognition.continuous = false;
  recognition.interimResults = true; // Stream words in real-time
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    hasResult = false;
    onStart && onStart();
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (interimTranscript && onInterimResult) {
      onInterimResult(interimTranscript);
    }

    if (finalTranscript) {
      hasResult = true;
      onResult && onResult(finalTranscript.trim());
    }
  };

  recognition.onerror = (event) => {
    // 'aborted' is a normal user-initiated cancellation (e.g. mic button toggled off)
    if (event.error === 'aborted') {
      onEnd && onEnd();
      return;
    }

    let errorMsg = 'Error during voice recognition';
    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
      errorMsg = 'Microphone permission was denied. Please click the lock icon in your browser address bar and allow Microphone access.';
    } else if (event.error === 'no-speech') {
      errorMsg = 'No voice detected. Please try speaking again into your microphone.';
    } else if (event.error === 'audio-capture') {
      errorMsg = 'No microphone was found. Please ensure your microphone is plugged in and working.';
    } else if (event.error === 'network') {
      errorMsg = 'Network error: Web Speech API requires an internet connection.';
    } else if (event.error === 'service-not-allowed') {
      errorMsg = 'Speech recognition service is not allowed by the browser/system.';
    }

    onError && onError(errorMsg, event.error);
  };

  recognition.onend = () => {
    onEnd && onEnd(hasResult);
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
 * Finds the most natural voice for Hindi or English
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
    // Priority for Hindi voices
    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase().replace('_', '-').startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.includes('हिन्दी') ||
          v.name.toLowerCase().includes('swara') ||
          v.name.toLowerCase().includes('madhur') ||
          v.name.toLowerCase().includes('hemant') ||
          v.name.toLowerCase().includes('kalpana')
      ) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) ||
      null
    );
  }

  // Priority for Indian English or natural English voices
  return (
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
 * Speaks text using window.speechSynthesis in Hindi or English
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
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean markdown or unwanted tokens for natural speech
    const cleanText = text
      .replace(/[#*_`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      onEnd && onEnd();
      return null;
    }

    // Auto-detect Hindi script (Devanagari \u0900-\u097F)
    const containsDevanagari = /[\u0900-\u097F]/.test(cleanText);
    const isHindi = language === 'hi' || containsDevanagari;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    utterance.rate = isHindi ? 0.95 : 1.0; // Slightly more paced for clear Hindi mascot articulation
    utterance.pitch = 1.05; // Cheerful, warm tone for Chacha Chaudhary

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
      // Interrupted speech is expected when user cancels or clicks another button
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
