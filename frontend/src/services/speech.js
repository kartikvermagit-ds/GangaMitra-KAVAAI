import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

/**
 * Speech Recognition and Text-to-Speech Service for GangaMitra
 * Dual-Engine:
 * 1. Native Android TTS via @capacitor-community/text-to-speech on mobile devices
 * 2. Web Speech API (SpeechSynthesis) on desktop browsers
 */

// Check browser/platform support
export const isSpeechRecognitionSupported = () => {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

export const isSpeechSynthesisSupported = () => {
  if (Capacitor.isNativePlatform()) return true;
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Preload and cache web voices
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

let activeUtterance = null;
let keepAliveTimer = null;
let isNativeSpeaking = false;

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

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  let accumulatedFinal = '';
  let lastInterim = '';
  let hasDispatchedResult = false;
  let isAborted = false;

  recognition.continuous = false;
  recognition.interimResults = true;
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
      errorMsg = 'Microphone permission denied. Please allow microphone access in your app/browser settings.';
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
 * Finds best voice for authentic Indian avatar on Web
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
 * Speaks text using Native Android TTS on Mobile or Web SpeechSynthesis on Web
 */
export const speakText = async ({
  text,
  language = 'en',
  onStart,
  onEnd,
  onError,
}) => {
  if (!text) {
    onEnd && onEnd();
    return null;
  }

  const cleanText = sanitizeSpeechText(text);
  if (!cleanText) {
    onEnd && onEnd();
    return null;
  }

  const containsDevanagari = /[\u0900-\u097F]/.test(cleanText);
  const isHindi = language === 'hi' || containsDevanagari;
  const langCode = isHindi ? 'hi-IN' : 'en-IN';

  // 1. Native Mobile Platform (Android / iOS): Use Native TextToSpeech Engine
  if (Capacitor.isNativePlatform()) {
    try {
      stopSpeaking();
      isNativeSpeaking = true;
      onStart && onStart();

      await TextToSpeech.speak({
        text: cleanText,
        lang: langCode,
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });

      isNativeSpeaking = false;
      onEnd && onEnd();
      return true;
    } catch (nativeErr) {
      console.warn('Native TTS error, attempting fallback:', nativeErr);
      isNativeSpeaking = false;
      // Fallback to web synthesis if native fails
    }
  }

  // 2. Web Browser Fallback (Chrome, Edge, Safari)
  if (!isSpeechSynthesisSupported()) {
    onEnd && onEnd();
    return null;
  }

  try {
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode;
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

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.speak(utterance);
    window.speechSynthesis.resume();

    return utterance;
  } catch (e) {
    console.warn('Web TTS error:', e);
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

  if (Capacitor.isNativePlatform()) {
    try {
      TextToSpeech.stop();
      isNativeSpeaking = false;
    } catch (e) {}
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
};

export const isSpeaking = () => {
  if (Capacitor.isNativePlatform()) return isNativeSpeaking;
  return typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking;
};
