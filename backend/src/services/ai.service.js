const env = require('../config/env');
const logger = require('../utils/logger');
const knowledgeService = require('./knowledge.service');

class AIService {
  constructor() {
    this.provider = env.AI_PROVIDER || 'gemini';
  }

  /**
   * Chacha Chaudhary Mascot System Persona Prompt
   */
  getSystemPrompt(language = 'en') {
    const isHindi = language === 'hi';

    if (isHindi) {
      return `आप "गंगा मित्र" (GangaMitra) हैं - नमामि गंगे के आधिकारिक डिजिटल अवतार और शुभंकर "चाचा चौधरी" (Chacha Chaudhary)।
आपका व्यक्तित्व: बुद्धिमान, मिलनसार, ऊर्जावान और गंगा संरक्षण के प्रति समर्पित। जैसा कि सब जानते हैं, "चाचा चौधरी का दिमाग कंप्यूटर से भी तेज़ चलता है!"
आपका मिशन:
1. राष्ट्रीय नदी गंगा की पवित्रता, पारिस्थितिकी और जैव विविधता (जैसे गंगा डॉल्फिन, घड़ियाल) के बारे में जागरूकता फैलाना।
2. नमामि गंगे की प्रमुख परियोजनाओं, सीवेज उपचार संयंत्रों (STPs), और घाट स्वच्छता के बारे में जानकारी देना।
3. छात्रों, नागरिकों और उद्योगों को गंगा को स्वच्छ रखने के व्यावहारिक उपाय बताना।
4. उत्तर सरल, प्रेरणादायक, विनम्र और स्पष्ट हिंदी में दें।`;
    }

    return `You are "GangaMitra" - the official digital avatar and AI mascot based on the legendary "Chacha Chaudhary" for the Namami Gange Rejuvenation Programme.
Your Persona: Wise, warm, energetic, witty, and passionate about river conservation. As the saying goes, "Chacha Chaudhary's brain works faster than a computer!"
Your Mission:
1. Spread awareness regarding River Ganga's ecology, biodiversity (such as the endangered Ganges River Dolphin and Gharials), and cultural heritage.
2. Provide authentic information on Namami Gange initiatives, sewage treatment plants (STPs), river surface cleaning, and community afforestation.
3. Guide students, citizens, and companies on how to prevent pollution and participate in river cleanup drives.
4. Keep answers engaging, encouraging, scientifically grounded, and easy to understand.`;
  }

  /**
   * Build RAG-augmented prompt combining context and user query
   */
  buildPrompt(userMessage, contextArticles = [], language = 'en') {
    const systemPrompt = this.getSystemPrompt(language);
    let prompt = `${systemPrompt}\n\n`;

    if (contextArticles && contextArticles.length > 0) {
      prompt += `=== TRUSTED GANGA KNOWLEDGE BASE CONTEXT ===\n`;
      contextArticles.forEach((article, idx) => {
        prompt += `[Source ${idx + 1}: ${article.title} (Category: ${article.category})]\n${article.content}\n\n`;
      });
      prompt += `===========================================\n`;
      prompt += `Instruction: Use the above trusted context when applicable to answer the user accurately.\n\n`;
    }

    prompt += `User Query: ${userMessage}\n`;
    prompt += `Language to respond in: ${language === 'hi' ? 'Hindi (हिंदी)' : 'English'}\n`;
    prompt += `Chacha Chaudhary Mascot Answer:`;

    return prompt;
  }

  /**
   * Gemini Provider Implementation using REST API
   */
  async callGemini(prompt) {
    if (!env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment.');
    }

    const model = env.GEMINI_MODEL || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      throw new Error('Gemini API returned an empty response.');
    }

    return answer.trim();
  }

  /**
   * Groq Provider Implementation
   */
  async callGroq(prompt) {
    if (!env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment.');
    }

    const model = env.GROQ_MODEL || 'llama-3.1-8b-instant';
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const payload = {
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errBody}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      throw new Error('Groq API returned an empty response.');
    }

    return answer.trim();
  }

  /**
   * Fallback mock generator when API keys are not provided
   */
  getFallbackResponse(userMessage, contextArticles = [], language = 'en') {
    const isHindi = language === 'hi';
    const lower = userMessage.toLowerCase();

    if (contextArticles.length > 0) {
      const primary = contextArticles[0];
      if (isHindi) {
        return `नमस्ते! मैं चाचा चौधरी हूँ। आपके सवाल के अनुसार, हमारे ज्ञानकोष से जानकारी:\n\n${primary.content}\n\nगंगा को स्वच्छ और निर्मल रखने में अपना योगदान दें!`;
      }
      return `Hello! Chacha Chaudhary here! Based on our Namami Gange knowledge repository:\n\n${primary.content}\n\nRemember, keeping Mother Ganga clean is the collective duty of every citizen!`;
    }

    if (lower.includes('dolphin') || lower.includes('animal') || lower.includes('biodiversity')) {
      if (isHindi) {
        return `गंगा नदी भारत के राष्ट्रीय जलीय जीव 'गंगा डॉल्फिन' का घर है! हमें नदी को प्रदूषण मुक्त रखना चाहिए ताकि ये दुर्लभ जीव सुरक्षित रह सकें।`;
      }
      return `River Ganga is home to the precious Ganges River Dolphin (Platanista gangetica), India's National Aquatic Animal! Protecting their habitat is a primary focus of the Namami Gange mission.`;
    }

    if (isHindi) {
      return `नमस्ते! मैं आपका गंगा मित्र (चाचा चौधरी)। गंगा नदी के संरक्षण, नमामि गंगे परियोजनाओं और नदी स्वच्छता के बारे में आप जो भी पूछना चाहें, पूछ सकते हैं!`;
    }

    return `Hello there! I am your GangaMitra (Chacha Chaudhary). As you know, my brain works faster than a computer! Ask me anything about River Ganga, river ecology, pollution prevention, or the Namami Gange flagship initiatives.`;
  }

  /**
   * Primary Chat Generation with RAG retrieval and Provider selection
   */
  async generateResponse({ message, language = 'en' }) {
    // 1. Retrieve relevant knowledge base articles for RAG
    let sources = [];
    try {
      sources = await knowledgeService.searchRelevant(message, 3);
    } catch (err) {
      logger.warn(`RAG retrieval warning: ${err.message}`);
    }

    // 2. Build augmented prompt
    const prompt = this.buildPrompt(message, sources, language);

    // 3. Dispatch to selected AI provider
    let answer = null;
    let usedProvider = this.provider;

    try {
      if (this.provider === 'gemini' && env.GEMINI_API_KEY) {
        answer = await this.callGemini(prompt);
      } else if (this.provider === 'groq' && env.GROQ_API_KEY) {
        answer = await this.callGroq(prompt);
      } else if (env.GEMINI_API_KEY) {
        answer = await this.callGemini(prompt);
        usedProvider = 'gemini';
      } else if (env.GROQ_API_KEY) {
        answer = await this.callGroq(prompt);
        usedProvider = 'groq';
      } else {
        logger.info('No AI API keys configured. Using mascot rule/knowledge fallback.');
        answer = this.getFallbackResponse(message, sources, language);
        usedProvider = 'fallback';
      }
    } catch (apiError) {
      logger.error(`AI Provider error (${this.provider}): ${apiError.message}. Falling back.`);
      answer = this.getFallbackResponse(message, sources, language);
      usedProvider = 'fallback';
    }

    return {
      answer,
      sources: sources.map(s => ({
        id: s.id,
        title: s.title,
        category: s.category,
        source: s.source,
      })),
      provider: usedProvider,
    };
  }
}

module.exports = new AIService();
