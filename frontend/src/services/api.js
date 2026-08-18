import axios from 'axios';

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('gangamitra_api_url');
    if (customUrl && customUrl.trim()) {
      return customUrl.trim().replace(/\/+$/, '');
    }
  }
  return (import.meta.env.VITE_API_URL || 'http://172.16.4.251:5000/api').replace(/\/+$/, '');
};

export const setCustomApiUrl = (url) => {
  if (typeof window !== 'undefined') {
    if (url && url.trim()) {
      localStorage.setItem('gangamitra_api_url', url.trim());
    } else {
      localStorage.removeItem('gangamitra_api_url');
    }
  }
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

// Dynamic interceptor to ensure always using latest runtime URL
apiClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  return config;
});

// Helper to extract clean error message
const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    return `Cannot connect to backend (${getApiBaseUrl()}). Please make sure backend is running and phone is on same Wi-Fi.`;
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
