import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    appName: 'GangaMitra',
    tagline: 'Chacha Chaudhary AI Mascot for Namami Gange',
    nav: {
      home: 'Home',
      talkToChacha: 'Talk to Chacha',
      learn: 'Learn',
      quiz: 'Quiz',
      aboutGanga: 'About Ganga',
      cta: 'Talk to Chacha',
    },
    hero: {
      badge: 'Namami Gange Interactive AI Mascot (SIH1290)',
      title1: 'Meet Chacha Chaudhary —',
      title2: 'Your AI Guide to River Ganga',
      subtitle: 'Ask questions, explore river ecology, discover clean river initiatives, and learn how every citizen can protect Mother Ganga.',
      btnPrimary: 'Talk to Chacha',
      btnSecondary: 'Explore Ganga',
      statsRiverLength: '2,525 km River Basin',
      statsSpecies: '140+ Fish Species',
      statsMission: 'National Flagship Mission',
    },
    features: {
      heading: 'What can Chacha do?',
      subheading: 'Interact with our friendly AI mascot to discover, learn, and take positive action for river rejuvenation.',
      card1Title: 'Ask Chacha',
      card1Desc: 'Ask anything about River Ganga, ghat cleanliness, and Namami Gange missions.',
      card2Title: 'Explore Ecology',
      card2Desc: 'Discover river biodiversity, water cycles, dolphins, gharials, and aquatic life.',
      card3Title: 'Play & Learn',
      card3Desc: 'Test your river knowledge through fun, interactive educational quizzes.',
      card4Title: 'Take Action',
      card4Desc: 'Learn practical daily habits to reduce plastic waste and keep ghats pristine.',
    },
    howItWorks: {
      heading: 'How GangaMitra Works',
      subheading: 'A continuous cycle of curiosity, education, and collective conservation.',
      step1: 'Ask',
      step1Desc: 'Pose your questions to Chacha Chaudhary in English or Hindi.',
      step2: 'Understand',
      step2Desc: 'Get authentic answers grounded in official Namami Gange knowledge.',
      step3: 'Learn',
      step3Desc: 'Explore interactive cards, river maps, and educational quizzes.',
      step4: 'Act',
      step4Desc: 'Participate in river cleaning and advocate for clean water in your school and community.',
    },
    ctaSection: {
      heading: 'Every Drop Matters. Every Citizen Counts.',
      subheading: 'Join thousands of students, youth, and citizens championing the rejuvenation of our National River.',
      btn: 'Start Learning Now',
    },
    chat: {
      title: 'Talk to Chacha Chaudhary',
      subtitle: 'Your wise & friendly digital guide for Namami Gange',
      inputPlaceholder: 'Ask Chacha anything about River Ganga...',
      suggestedHeading: 'Suggested Questions:',
      send: 'Send',
      listening: 'Listening...',
      speakPlaceholder: 'Voice interaction enabled soon',
      sourcesHeading: 'Trusted Knowledge Sources:',
      mascotThinking: 'Chacha is thinking faster than a computer...',
      clearChat: 'Reset Chat',
    },
    quiz: {
      heading: 'Test Your Ganga Knowledge',
      subtitle: 'Play interactive quizzes and become a certified Ganga Guardian!',
      startBtn: 'Start Quiz',
      submitBtn: 'Submit Answers',
      nextBtn: 'Next Question',
      prevBtn: 'Previous',
      scoreTitle: 'Quiz Results',
      passedMsg: 'Congratulations! You are a true Ganga Mitra!',
      tryAgainMsg: 'Great attempt! Keep learning to protect our rivers.',
      retakeBtn: 'Retake Quiz',
      explanationHeading: 'Why is this correct?',
    },
  },
  hi: {
    appName: 'गंगा मित्र',
    tagline: 'नमामि गंगे के लिए चाचा चौधरी एआई शुभंकर',
    nav: {
      home: 'होम',
      talkToChacha: 'चाचा से बात करें',
      learn: 'ज्ञानकोष',
      quiz: 'प्रश्नोत्तरी',
      aboutGanga: 'गंगा परिचय',
      cta: 'चाचा से बात करें',
    },
    hero: {
      badge: 'नमामि गंगे संवादात्मक एआई शुभंकर (SIH1290)',
      title1: 'मिलिए चाचा चौधरी से —',
      title2: 'माँ गंगा के आपके एआई मार्गदर्शक',
      subtitle: 'सवाल पूछें, नदी पारिस्थितिकी जानें, स्वच्छ गंगा अभियानों को समझें और माँ गंगा के संरक्षण में अपना योगदान दें।',
      btnPrimary: 'चाचा से बात करें',
      btnSecondary: 'गंगा को जानें',
      statsRiverLength: '2,525 किमी नदी बेसिन',
      statsSpecies: '140+ जलीय प्रजातियां',
      statsMission: 'राष्ट्रीय संरक्षण मिशन',
    },
    features: {
      heading: 'चाचा चौधरी क्या कर सकते हैं?',
      subheading: 'हमारे मित्रवत एआई शुभंकर से बात करें और नदी संरक्षण के उपाय समझें।',
      card1Title: 'चाचा से पूछें',
      card1Desc: 'गंगा नदी, घाटों की स्वच्छता और नमामि गंगे के बारे में कोई भी प्रश्न पूछें।',
      card2Title: 'पारिस्थितिकी समझें',
      card2Desc: 'गंगा डॉल्फिन, घड़ियाल, जैव विविधता और जलीय जीवन के बारे में विस्तार से जानें।',
      card3Title: 'खेलें और सीखें',
      card3Desc: 'रोचक प्रश्नोत्तरी (Quiz) के माध्यम से अपने गंगा ज्ञान को परखें।',
      card4Title: 'भागीदार बनें',
      card4Desc: 'प्लास्टिक कचरा रोकने और नदी को निर्मल बनाए रखने के आसान उपाय जानें।',
    },
    howItWorks: {
      heading: 'गंगा मित्र कैसे काम करता है?',
      subheading: 'जिज्ञासा, ज्ञान और जनभागीदारी का एक सहज माध्यम।',
      step1: 'पूछें',
      step1Desc: 'चाचा चौधरी से हिंदी या अंग्रेजी में सवाल पूछें।',
      step2: 'समझें',
      step2Desc: 'नमामि गंगे के प्रामाणिक ज्ञानकोष से सटीक उत्तर पाएं।',
      step3: 'सीखें',
      step3Desc: 'ज्ञान कार्ड्स और क्विज के जरिए जानकारी को समृद्ध करें।',
      step4: 'कार्य करें',
      step4Desc: 'अपने विद्यालय और समाज में गंगा स्वच्छता के प्रति जागरूकता फैलाएं।',
    },
    ctaSection: {
      heading: 'हर एक बूँद अनमोल है। हर नागरिक का प्रयास आवश्यक है।',
      subheading: 'माँ गंगा के पुनरुद्धार और स्वच्छता के इस पुनीत अभियान से जुड़ें।',
      btn: 'सीखना शुरू करें',
    },
    chat: {
      title: 'चाचा चौधरी से संवाद',
      subtitle: 'नमामि गंगे के लिए आपके बुद्धिमान व स्नेही साथी',
      inputPlaceholder: 'गंगा नदी के बारे में चाचा से कुछ भी पूछें...',
      suggestedHeading: 'सुझाए गए प्रश्न:',
      send: 'भेजें',
      listening: 'सुन रहे हैं...',
      speakPlaceholder: 'ध्वनि संवाद शीघ्र उपलब्ध होगा',
      sourcesHeading: 'प्रामाणिक ज्ञान स्रोत:',
      mascotThinking: 'चाचा चौधरी का दिमाग कंप्यूटर से भी तेज़ सोच रहा है...',
      clearChat: 'नई बातचीत',
    },
    quiz: {
      heading: 'गंगा ज्ञान प्रश्नोत्तरी',
      subtitle: 'रोचक क्विज खेलें और गंगा संरक्षक बनें!',
      startBtn: 'क्विज शुरू करें',
      submitBtn: 'उत्तर जमा करें',
      nextBtn: 'अगला प्रश्न',
      prevBtn: 'पिछला प्रश्न',
      scoreTitle: 'आपका परिणाम',
      passedMsg: 'बधाई हो! आप एक सच्चे गंगा मित्र हैं!',
      tryAgainMsg: 'अच्छा प्रयास! और अधिक सीखकर फिर से प्रयास करें।',
      retakeBtn: 'पुनः प्रयास करें',
      explanationHeading: 'सही उत्तर का कारण:',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('gangamitra_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('gangamitra_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let current = translations[language] || translations.en;
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to english
        let fallback = translations.en;
        for (const fKey of keys) {
          fallback = fallback ? fallback[fKey] : null;
        }
        return fallback || keyPath;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
