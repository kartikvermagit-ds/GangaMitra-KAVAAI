import React, { useState, useEffect, useRef } from 'react';
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
import { Sparkles, MessageCircle, Info } from 'lucide-react';

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

  // Stop any active speech/recognition when navigating away
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

  const handleSendMessage = async (userText) => {
    if (!userText || !userText.trim() || isLoading) return;

    setError(null);
    setInterimSpeech('');

    // Stop any ongoing speech playback or microphone session
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }
    setIsListening(false);

    // 1. Append user message
    const userMsgObj = {
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setIsLoading(true);
    setMascotState('thinking');

    try {
      // 2. Call backend API
      const response = await sendMessageToChacha({
        message: userText.trim(),
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

      // 3. Trigger Text-to-Speech connected directly to mascot state
      speakText({
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
  };

  const handleResetChat = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
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
    if (isLoading) return; // Do not start listening while waiting for AI

    // If currently speaking, stop speech first
    stopSpeaking();

    if (isListening) {
      // User clicked mic to stop listening manually
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      setIsListening(false);
      setInterimSpeech('');
      setMascotState('idle');
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setError(
        language === 'hi'
          ? 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है। आप Google Chrome, Edge, या Brave में चलाएं।'
          : "Voice input isn't supported in this browser. Please use Chrome, Edge, or Brave, or type your question instead."
      );
      return;
    }

    // Start real SpeechRecognition
    recognitionRef.current = startVoiceRecognition({
      language,
      onStart: () => {
        setIsListening(true);
        setMascotState('listening');
        setError(null);
        setInterimSpeech('');
      },
      onInterimResult: (interimText) => {
        setInterimSpeech(interimText);
      },
      onResult: (transcript) => {
        setIsListening(false);
        setInterimSpeech('');
        if (transcript && transcript.trim()) {
          handleSendMessage(transcript.trim());
        } else {
          setMascotState('idle');
        }
      },
      onError: (errMsg, errType) => {
        setIsListening(false);
        setInterimSpeech('');
        setMascotState('idle');
        if (errType !== 'no-speech' && errType !== 'aborted') {
          setError(errMsg);
        }
      },
      onEnd: (hasResult) => {
        setIsListening(false);
        setInterimSpeech('');
        if (!hasResult && mascotState === 'listening') {
          setMascotState('idle');
        }
      },
    });
  };

  return (
    <div className="flex-1 bg-slate-50 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Notification Badge */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-ganga-800">
            <span
              className={`w-2 h-2 rounded-full ${
                mascotState === 'listening'
                  ? 'bg-rose-500 animate-ping'
                  : mascotState === 'speaking'
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-ganga-500'
              }`}
            />
            <span>
              {mascotState === 'listening'
                ? 'Listening to your voice...'
                : mascotState === 'speaking'
                ? 'Chacha is speaking with voice...'
                : 'SIH1290 Digital Avatar Live Session'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-ganga-600" />
            <span>Interactive mascot powered by Namami Gange knowledge base</span>
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
                ? 'border-rose-300 ring-2 ring-rose-200 shadow-rose-100'
                : mascotState === 'speaking'
                ? 'border-emerald-300 ring-2 ring-emerald-200 shadow-emerald-100'
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
                  <strong className="text-rose-700">Listening (🎤):</strong> Real-time SpeechRecognition
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
