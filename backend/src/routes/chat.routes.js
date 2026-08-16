const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { authenticateUser, optionalAuth } = require('../middleware/auth.middleware');
const { validateChat } = require('../middleware/validate.middleware');

// Public / Authenticated Chat Message endpoint (supports guests and logged-in users)
router.post('/', optionalAuth, validateChat, chatController.sendMessage);

// Session endpoints
router.post('/sessions', optionalAuth, chatController.createSession);
router.get('/sessions', authenticateUser, chatController.getSessions);
router.get('/sessions/:id/messages', optionalAuth, chatController.getSessionMessages);

module.exports = router;
