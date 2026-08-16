const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const knowledgeRoutes = require('./knowledge.routes');
const chatRoutes = require('./chat.routes');
const quizRoutes = require('./quiz.routes');

// Health check endpoint
// GET /api/health -> { "success": true, "message": "GangaMitra backend is running" }
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GangaMitra backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'GangaMitra-KAVAAI (SIH1290)',
  });
});

// Mount domain routes
router.use('/auth', authRoutes);
router.use('/knowledge', knowledgeRoutes);
router.use('/chat', chatRoutes);
router.use('/quizzes', quizRoutes);

module.exports = router;
