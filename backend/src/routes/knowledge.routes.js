const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledge.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');
const { validateKnowledge } = require('../middleware/validate.middleware');

// Public read routes
router.get('/', knowledgeController.getAllKnowledge);
router.get('/:id', knowledgeController.getKnowledgeById);

// Admin-only write routes
router.post(
  '/',
  authenticateUser,
  authorizeRoles('admin'),
  validateKnowledge,
  knowledgeController.createKnowledge
);

router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('admin'),
  knowledgeController.updateKnowledge
);

router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles('admin'),
  knowledgeController.deleteKnowledge
);

module.exports = router;
