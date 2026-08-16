const supabase = require('../config/supabase');
const aiService = require('./ai.service');
const logger = require('../utils/logger');

class ChatService {
  checkSupabase() {
    if (!supabase) {
      throw new Error('Database is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.');
    }
  }

  /**
   * Create a new chat session
   */
  async createSession(userId = null, title = 'New Conversation') {
    this.checkSupabase();

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert([
        {
          user_id: userId,
          title: title.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create chat session: ${error.message}`);
    }

    return data;
  }

  /**
   * List all chat sessions for a specific user
   */
  async getUserSessions(userId) {
    this.checkSupabase();

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('id, title, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch chat sessions: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get all messages for a specific session with ownership validation
   */
  async getSessionMessages(sessionId, userId = null) {
    this.checkSupabase();

    // Verify session exists and check authorization if user is logged in
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id, user_id, title')
      .eq('id', sessionId)
      .maybeSingle();

    if (sessionError) {
      throw new Error(`Database error: ${sessionError.message}`);
    }

    if (!session) {
      const err = new Error('Chat session not found');
      err.statusCode = 404;
      throw err;
    }

    if (userId && session.user_id && session.user_id !== userId) {
      const forbidden = new Error('Access denied to this chat session');
      forbidden.statusCode = 403;
      throw forbidden;
    }

    // Fetch messages
    const { data: messages, error: msgError } = await supabase
      .from('chat_messages')
      .select('id, role, message, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (msgError) {
      throw new Error(`Failed to fetch chat messages: ${msgError.message}`);
    }

    return {
      session,
      messages: messages || [],
    };
  }

  /**
   * Record a message in the database
   */
  async saveMessage(sessionId, role, message) {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            session_id: sessionId,
            role,
            message,
          },
        ])
        .select()
        .single();

      if (error) {
        logger.warn(`Failed to persist chat message: ${error.message}`);
        return null;
      }
      return data;
    } catch (e) {
      logger.warn(`Chat message persistence error: ${e.message}`);
      return null;
    }
  }

  /**
   * High-level chat process: generates answer + optionally records history if sessionId provided
   */
  async processChat({ message, language = 'en', sessionId = null, userId = null }) {
    let targetSessionId = sessionId;

    // If Supabase is available and no session provided, or session is passed, handle session persistence
    if (supabase) {
      try {
        if (!targetSessionId) {
          const newSession = await this.createSession(
            userId,
            message.slice(0, 40) + (message.length > 40 ? '...' : '')
          );
          targetSessionId = newSession.id;
        }

        // Save incoming user message
        await this.saveMessage(targetSessionId, 'user', message);
      } catch (err) {
        logger.warn(`Session handling warning: ${err.message}`);
      }
    }

    // Call AI Service with Chacha Chaudhary mascot persona and RAG
    const aiResult = await aiService.generateResponse({ message, language });

    // Save assistant response
    if (supabase && targetSessionId) {
      await this.saveMessage(targetSessionId, 'assistant', aiResult.answer);
    }

    return {
      answer: aiResult.answer,
      sources: aiResult.sources,
      sessionId: targetSessionId,
      provider: aiResult.provider,
    };
  }
}

module.exports = new ChatService();
