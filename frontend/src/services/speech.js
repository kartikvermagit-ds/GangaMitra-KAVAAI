/**
 * Speech Recognition and Text-to-Speech Service for GangaMitra
 * Optimized for mobile Android WebView and Web browsers with reliable audio playback.
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
const loadVoices = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const list = window.speechSynthesis.getVoices();
    if (list && list.length > 0) {
      cachedVoices = list;
    }
  }
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

// Module-level reference to prevent Chromium/Android garbage collection
let activeUtterance = null;
let keepAliveTimer = null;

const clearKeepAlive = () => {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
};

/**
 * Creates and starts a SpeechRecognition instance with strict lifecycle callbacks
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
        "Voice input isn't supported in this browser. You can type your question instead.",
        'unsupported'
      );
    return null;
  }

  // Pre-unlock speech synthesis when mic is clicked
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
      loadVoices();
    } catch (e) {}
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  let accumulatedFinal = '';
  let lastInterim = '';
  let hasDispatchedResult = false;
  let isAborted = false;

  recognition.continuous = false;
  recognition.interimResults = true;
  // Match language explicitly: Hindi ('hi-IN') or Indian English ('en-IN')
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    accumulatedFinal = '';
    lastInterim = '';
    hasDispatchedResult = false;
    isAborted = false;
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

    const liveText = (accumulatedFinal ? `${accumulatedFinal} ${currentInterim}` : currentInterim).trim();
    if (liveText && onInterimResult) {
      onInterimResult(liveText);
    }
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') {
      isAborted = true;
      onEnd && onEnd(false);
      return;
    }

    let errorMsg = 'Error during voice recognition';
    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
      errorMsg = 'Microphone permission denied. Please allow microphone access in your browser/app settings.';
    } else if (event.error === 'no-speech') {
      errorMsg = 'No voice detected. Please speak closer to your microphone.';
    } else if (event.error === 'audio-capture') {
      errorMsg = 'No microphone found. Please check your audio device.';
    } else if (event.error === 'network') {
      errorMsg = 'Speech Recognition network error. Please check your internet connection.';
    }

    onError && onError(errorMsg, event.error);
  };

  recognition.onend = () => {
    if (isAborted) {
      onEnd && onEnd(false);
      return;
    }

    const fullTranscript = (accumulatedFinal || lastInterim || '').trim();

    if (!hasDispatchedResult && fullTranscript.length > 0) {
      hasDispatchedResult = true;
      onResult && onResult(fullTranscript);
      onEnd && onEnd(true);
    } else {
      onEnd && onEnd(hasDispatchedResult);
    }
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
 * Finds best voice for authentic Indian avatar
 */
const findBestVoice = (isHindi) => {
  if (cachedVoices.length === 0) {
    loadVoices();
  }
  const voices = cachedVoices;
  if (!voices || voices.length === 0) return null;

  if (isHindi) {
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
 * Clean text for natural speech
 */
const sanitizeSpeechText = (raw) => {
  return raw
    .replace(/[#*_`~[\]()]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[-–—]/g, ' ')
    .replace(/[^\w\s\u0900-\u097F.,!?।]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Speaks text using window.speechSynthesis with Android & Chrome compatibility
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
    stopSpeaking();

    const cleanText = sanitizeSpeechText(text);
    if (!cleanText) {
      onEnd && onEnd();
      return null;
    }

    const containsDevanagari = /[\u0900-\u097F]/.test(cleanText);
    const isHindi = language === 'hi' || containsDevanagari;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voice = findBestVoice(isHindi);
    if (voice) {
      utterance.voice = voice;
    }

    let hasEnded = false;
    const handleEnd = () => {
      if (hasEnded) return;
      hasEnded = true;
      clearKeepAlive();
      activeUtterance = null;
      onEnd && onEnd();
    };

    utterance.onstart = () => {
      onStart && onStart();
      clearKeepAlive();
      keepAliveTimer = setInterval(() => {
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        } else {
          clearKeepAlive();
        }
      }, 5000);
    };

    utterance.onend = () => {
      handleEnd();
    };

    utterance.onerror = (err) => {
      if (err.error !== 'interrupted' && err.error !== 'canceled') {
        onError && onError(err);
      }
      handleEnd();
    };

    activeUtterance = utterance;

    // Critical for Android WebView: Resume before and after speak
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.resume();

    return utterance;
  } catch (e) {
    console.warn('TTS error:', e);
    clearKeepAlive();
    activeUtterance = null;
    onEnd && onEnd();
    return null;
  }
};

/**
 * Stops any ongoing SpeechSynthesis playback
 */
export const stopSpeaking = () => {
  clearKeepAlive();
  activeUtterance = null;
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

export const isSpeaking = () => {
  return isSpeechSynthesisSupported() && window.speechSynthesis.speaking;
};
