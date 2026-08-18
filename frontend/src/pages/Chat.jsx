import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mascot } from '../components/Mascot';
import { ChatBox } from '../components/ChatBox';
import { sendMessageToChacha } from '../services/api';
import {
  startVoiceRecognition,
  speakText,
  stopSpeaking,
  isSpeechRecognitionSupported,
} from '../services/speech';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Info, Mic, Volume2, Brain } from 'lucide-react';

export const Chat = () => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        language === 'hi'
          ? 'नमस्ते! मैं गंगा मित्र (चाचा चौधरी) हूँ। जैसा कि आप जानते हैं, "चाचा चौधरी का दिमाग कंप्यूटर से भी तेज़ चलता है!" गंगा नदी, नमामि गंगे या पर्यावरण से जुड़ा कोई भी सवाल पूछिए।'
          : 'Hello! I am GangaMitra (Chacha Chaudhary), your digital guide for Namami Gange! As they say, "Chacha Chaudhary\'s brain works faster than a computer!" Ask me anything about River Ganga, river ecology, or conservation.',
      timestamp: new Date().toISOString(),
      sources: [],
    },
  ]);

  const [mascotState, setMascotState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking' | 'happy' | 'celebrating'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [interimSpeech, setInterimSpeech] = useState('');
  const [sessionId, setSessionId] = useState(null);

  const recognitionRef = useRef(null);
  const isStartingRecognitionRef = useRef(false);

  // Stop any active speech or recognition when navigating away
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const handleSendMessage = useCallback(async (userText) => {
    if (!userText || !userText.trim() || isLoading) return;

    setError(null);
    setInterimSpeech('');

    // Stop any ongoing speech playback or microphone session
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);

    // 1. Append user message
    const cleanUserText = userText.trim();
    const userMsgObj = {
      role: 'user',
      content: cleanUserText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setIsLoading(true);
    setMascotState('thinking');

    try {
      // 2. Call backend API
      const response = await sendMessageToChacha({
        message: cleanUserText,
        language,
        sessionId,
      });

      if (response && response.sessionId) {
        setSessionId(response.sessionId);
      }

      const answer =
        response.answer ||
        (language === 'hi'
          ? 'माँ गंगा को निर्मल और अविरल रखना हम सबकी ज़िम्मेदारी है।'
          : 'Keeping Mother Ganga clean and perennial is the duty of every citizen.');

      const botMsgObj = {
        role: 'assistant',
        content: answer,
        sources: response.sources || [],
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsgObj]);

      // 3. Trigger Text-to-Speech directly bound to avatar lifecycle (no timeouts!)
      const utterance = speakText({
        text: answer,
        language,
        onStart: () => {
          setMascotState('speaking');
        },
        onEnd: () => {
          setMascotState('idle');
        },
        onError: () => {
          setMascotState('idle');
        },
      });

      // If TTS could not start (unsupported or empty), return to idle
      if (!utterance) {
        setMascotState('idle');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError(
        language === 'hi'
          ? 'चाचा चौधरी अभी कुछ सोच रहे हैं। कृपया कुछ क्षणों बाद पुनः प्रयास करें।'
          : 'Chacha is taking a short break. Please try again in a moment.'
      );
      setMascotState('idle');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language, sessionId]);

  const handleResetChat = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimSpeech('');

    setMessages([
      {
        role: 'assistant',
        content:
          language === 'hi'
            ? 'नमस्ते! नई बातचीत शुरू हो गई है। आप गंगा नदी या नमामि गंगे के बारे में क्या जानना चाहते हैं?'
            : 'Hello again! New chat started. What would you like to discover about River Ganga today?',
        timestamp: new Date().toISOString(),
        sources: [],
      },
    ]);
    setSessionId(null);
    setError(null);
    setMascotState('happy');
    setTimeout(() => setMascotState('idle'), 2000);
  };

  const handleMicToggle = () => {
    // 1. Prevent starting listening while waiting for AI backend
    if (isLoading) return;

    // 2. If Chacha is currently speaking, stop TTS audio immediately
    stopSpeaking();

    // 3. If already listening, user wants to manually stop
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
        recognitionRef.current = null;
      }
      setIsListening(false);
      setInterimSpeech('');
      setMascotState('idle');
      return;
    }

    // 4. Concurrency lock to prevent rapid multiple starts
    if (isStartingRecognitionRef.current) return;

    // 5. Check browser Web Speech API support
    if (!isSpeechRecognitionSupported()) {
      setError(
        language === 'hi'
          ? 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। आप Google Chrome, Edge, या Brave में चलाएं अथवा टाइप करें।'
          : "Voice input isn't supported in this browser. You can type your question instead."
      );
      setMascotState('idle');
      return;
    }

    isStartingRecognitionRef.current = true;

    // 6. Start real SpeechRecognition session with strict lifecycle callbacks
    const recInstance = startVoiceRecognition({
      language,
      onStart: () => {
        isStartingRecognitionRef.current = false;
        setIsListening(true);
        setMascotState('listening');
        setError(null);
        setInterimSpeech('');
      },
      onInterimResult: (interimText) => {
        setInterimSpeech(interimText);
      },
      onResult: (transcript) => {
        isStartingRecognitionRef.current = false;
        setIsListening(false);
        setInterimSpeech('');
        if (transcript && transcript.trim()) {
          handleSendMessage(transcript.trim());
        } else {
          setMascotState('idle');
        }
      },
      onError: (errMsg, errType) => {
        isStartingRecognitionRef.current = false;
        setIsListening(false);
        setInterimSpeech('');
        setMascotState('idle');
        if (errType !== 'no-speech' && errType !== 'aborted') {
          setError(errMsg);
        }
      },
      onEnd: (hasResult) => {
        isStartingRecognitionRef.current = false;
        setIsListening(false);
        setInterimSpeech('');
        if (!hasResult && mascotState === 'listening') {
          setMascotState('idle');
        }
      },
    });

    if (recInstance) {
      recognitionRef.current = recInstance;
    } else {
      isStartingRecognitionRef.current = false;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Notification Status Badge */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs font-bold text-ganga-900">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                mascotState === 'listening'
                  ? 'bg-rose-500 animate-ping'
                  : mascotState === 'speaking'
                  ? 'bg-emerald-500 animate-pulse'
                  : mascotState === 'thinking'
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-ganga-500'
              }`}
            />
            <span className="flex items-center gap-1.5">
              {mascotState === 'listening' ? (
                <>
                  <Mic className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                  <span className="text-rose-700">Chacha is listening to you... speak your question</span>
                </>
              ) : mascotState === 'speaking' ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="text-emerald-700">Chacha is speaking with synchronized voice & lip-sync</span>
                </>
              ) : mascotState === 'thinking' ? (
                <>
                  <Brain className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span className="text-amber-700">Thinking faster than a computer...</span>
                </>
              ) : (
                <span>Interactive Mascot Live Session (Namami Gange)</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Info className="w-3.5 h-3.5 text-ganga-600" />
            <span>Click the microphone or type to converse</span>
          </div>
        </div>

        {/* Main Grid: Mascot (Left) + ChatBox (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Mascot Column */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`lg:col-span-5 flex flex-col items-center justify-center bg-white rounded-3xl p-6 sm:p-8 border shadow-lg text-center transition-all duration-300 ${
              mascotState === 'listening'
                ? 'border-rose-400 ring-4 ring-rose-100 shadow-rose-200'
                : mascotState === 'speaking'
                ? 'border-emerald-400 ring-4 ring-emerald-100 shadow-emerald-200'
                : mascotState === 'thinking'
                ? 'border-amber-300 ring-4 ring-amber-100 shadow-amber-100'
                : 'border-slate-200/80'
            }`}
          >
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sacred-saffron">
                Official AI Mascot
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Chacha Chaudhary
              </h2>
            </div>

            <Mascot
              state={mascotState}
              size="xl"
              interactive={true}
              speechText={
                mascotState === 'listening'
                  ? interimSpeech
                    ? `"${interimSpeech}..."`
                    : language === 'hi'
                    ? 'मैं सुन रहा हूँ, कृपया अपना सवाल बोलें...'
                    : "I'm listening, please ask your question..."
                  : null
              }
              onClick={() => {
                if (mascotState === 'idle') {
                  setMascotState('celebrating');
                  setTimeout(() => setMascotState('idle'), 2500);
                }
              }}
            />

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 w-full text-xs text-slate-600 space-y-2 text-left">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-sacred-saffron" />
                <span>Interactive Mascot Features:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                <li>
                  <strong className="text-rose-700">Listening (🎤):</strong> Real-time Web Speech Recognition
                </li>
                <li>
                  <strong className="text-amber-700">Thinking (🤔):</strong> RAG AI brain reasoning
                </li>
                <li>
                  <strong className="text-emerald-700">Speaking (🔊):</strong> Synchronized Text-to-Speech & lip-sync
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right / Chat Interface Column */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7"
          >
            <ChatBox
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onResetChat={handleResetChat}
              onMicToggle={handleMicToggle}
              isListening={isListening}
              interimText={interimSpeech}
              error={error}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
