const { errorResponse } = require('../utils/response');

/**
 * Validate registration request body
 */
const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  const validRoles = ['student', 'company', 'admin'];
  if (role && !validRoles.includes(role)) {
    errors.push(`Role must be one of: ${validRoles.join(', ')}`);
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation error', 400, errors);
  }

  next();
};

/**
 * Validate login request body
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation error', 400, errors);
  }

  next();
};

/**
 * Validate knowledge base creation / update
 */
const validateKnowledge = (req, res, next) => {
  const { title, content, category } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation error', 400, errors);
  }

  next();
};

/**
 * Validate chat request body
 */
const validateChat = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return errorResponse(res, 'Message string cannot be empty', 400);
  }

  next();
};

/**
 * Validate quiz submission
 */
const validateQuizSubmit = (req, res, next) => {
  const { answers } = req.body;

  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return errorResponse(
      res,
      'Answers must be a JSON object mapping questionId to selectedOption, e.g. { "questionId": "Option A" }',
      400
    );
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateKnowledge,
  validateChat,
  validateQuizSubmit,
};
