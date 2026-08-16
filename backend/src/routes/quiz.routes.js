const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');
const { validateQuizSubmit } = require('../middleware/validate.middleware');

router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/:id/submit', validateQuizSubmit, quizController.submitQuiz);

module.exports = router;
