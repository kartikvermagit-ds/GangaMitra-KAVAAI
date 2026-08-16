const chatService = require('../services/chat.service');
const { successResponse } = require('../utils/response');

/**
 * Send chat message to AI mascot Chacha Chaudhary
 * POST /api/chat
 */
const sendMessage = async (req, res, next) => {
  try {
    const { message, language = 'en', sessionId = null } = req.body;
    const userId = req.user ? req.user.id : null;

    const result = await chatService.processChat({
      message,
      language,
      sessionId,
      userId,
    });

    return successResponse(res, result, 'Response generated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new chat session
 * POST /api/chat/sessions
 */
const createSession = async (req, res, next) => {
  try {
    const { title = 'New Conversation' } = req.body;
    const userId = req.user ? req.user.id : null;

    const session = await chatService.createSession(userId, title);
    return successResponse(res, { session }, 'Chat session created', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all sessions for authenticated user
 * GET /api/chat/sessions
 */
const getSessions = async (req, res, next) => {
  try {
    const sessions = await chatService.getUserSessions(req.user.id);
    return successResponse(res, { sessions }, 'Chat sessions fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get messages of a specific session
 * GET /api/chat/sessions/:id/messages
 */
const getSessionMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;

    const result = await chatService.getSessionMessages(id, userId);
    return successResponse(res, result, 'Session messages fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  createSession,
  getSessions,
  getSessionMessages,
};
