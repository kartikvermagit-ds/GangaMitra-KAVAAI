import axios from 'axios';

const LIVE_RENDER_API = 'https://gangamitra-kavaai.onrender.com/api';

export const API_BASE_URL = import.meta.env.VITE_API_URL || LIVE_RENDER_API;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Helper to extract clean error message
const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    return 'Chacha is taking a short moment to connect to cloud brain. Please try again.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

/**
 * Health Check API
 */
export const checkHealth = async () => {
  try {
    const res = await apiClient.get('/health');
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Chat with Mascot Chacha Chaudhary
 */
export const sendMessageToChacha = async ({ message, language = 'en', sessionId = null }) => {
  try {
    const res = await apiClient.post('/chat', {
      message,
      language,
      sessionId,
    });
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Chat Session APIs
 */
export const createChatSession = async (title = 'New Conversation') => {
  try {
    const res = await apiClient.post('/chat/sessions', { title });
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchSessionMessages = async (sessionId) => {
  try {
    const res = await apiClient.get(`/chat/sessions/${sessionId}/messages`);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Knowledge Base APIs
 */
export const fetchKnowledge = async (params = {}) => {
  try {
    const res = await apiClient.get('/knowledge', { params });
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchKnowledgeById = async (id) => {
  try {
    const res = await apiClient.get(`/knowledge/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Quiz APIs
 */
export const fetchQuizzes = async () => {
  try {
    const res = await apiClient.get('/quizzes');
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchQuizById = async (id) => {
  try {
    const res = await apiClient.get(`/quizzes/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const submitQuizAnswers = async (quizId, answers) => {
  try {
    const res = await apiClient.post(`/quizzes/${quizId}/submit`, { answers });
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export default apiClient;
