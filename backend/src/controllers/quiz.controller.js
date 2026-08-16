const quizService = require('../services/quiz.service');
const { successResponse } = require('../utils/response');

/**
 * Get all available quizzes
 * GET /api/quizzes
 */
const getAllQuizzes = async (req, res, next) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    return successResponse(res, { quizzes }, 'Quizzes fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get single quiz and question options (without correct answers)
 * GET /api/quizzes/:id
 */
const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await quizService.getQuizById(id);
    return successResponse(res, { quiz }, 'Quiz details fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Submit quiz answers and get score/evaluation
 * POST /api/quizzes/:id/submit
 */
const submitQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const evaluation = await quizService.submitQuiz(id, answers);
    return successResponse(res, evaluation, 'Quiz evaluated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  submitQuiz,
};
