const knowledgeService = require('../services/knowledge.service');
const { successResponse } = require('../utils/response');

/**
 * Get all knowledge articles
 * GET /api/knowledge
 */
const getAllKnowledge = async (req, res, next) => {
  try {
    const { category, language, search, limit, offset } = req.query;
    const result = await knowledgeService.getAll({
      category,
      language,
      search,
      limit: limit ? parseInt(limit, 10) : 50,
      offset: offset ? parseInt(offset, 10) : 0,
    });
    return successResponse(res, result, 'Knowledge articles fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get single knowledge article by ID
 * GET /api/knowledge/:id
 */
const getKnowledgeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await knowledgeService.getById(id);
    return successResponse(res, { article }, 'Knowledge article fetched successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Create new knowledge article (Admin only)
 * POST /api/knowledge
 */
const createKnowledge = async (req, res, next) => {
  try {
    const { title, content, category, source, language } = req.body;
    const newArticle = await knowledgeService.create({
      title,
      content,
      category,
      source,
      language,
    });
    return successResponse(res, { article: newArticle }, 'Knowledge article created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update knowledge article (Admin only)
 * PUT /api/knowledge/:id
 */
const updateKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await knowledgeService.update(id, req.body);
    return successResponse(res, { article: updated }, 'Knowledge article updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete knowledge article (Admin only)
 * DELETE /api/knowledge/:id
 */
const deleteKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await knowledgeService.delete(id);
    return successResponse(res, result, 'Knowledge article deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllKnowledge,
  getKnowledgeById,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
};
