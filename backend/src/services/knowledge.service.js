const supabase = require('../config/supabase');

class KnowledgeService {
  checkSupabase() {
    if (!supabase) {
      throw new Error('Database is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.');
    }
  }

  /**
   * Get all knowledge articles with optional category, language, and search filter
   */
  async getAll({ category, language, search, limit = 50, offset = 0 } = {}) {
    this.checkSupabase();

    let query = supabase
      .from('knowledge_base')
      .select('id, title, content, category, source, language, created_at', { count: 'exact' });

    if (category) {
      query = query.ilike('category', category);
    }

    if (language) {
      query = query.eq('language', language);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch knowledge base: ${error.message}`);
    }

    return {
      total: count || 0,
      limit,
      offset,
      articles: data || [],
    };
  }

  /**
   * Get single article by ID
   */
  async getById(id) {
    this.checkSupabase();

    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      const notFound = new Error('Knowledge article not found');
      notFound.statusCode = 404;
      throw notFound;
    }

    return data;
  }

  /**
   * Create new knowledge entry (Admin)
   */
  async create({ title, content, category, source = null, language = 'en' }) {
    this.checkSupabase();

    const { data, error } = await supabase
      .from('knowledge_base')
      .insert([
        {
          title: title.trim(),
          content: content.trim(),
          category: category.trim(),
          source: source ? source.trim() : null,
          language: language || 'en',
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create knowledge entry: ${error.message}`);
    }

    return data;
  }

  /**
   * Update existing knowledge entry (Admin)
   */
  async update(id, updates) {
    this.checkSupabase();

    // Check if exists
    await this.getById(id);

    const payload = {};
    if (updates.title !== undefined) payload.title = updates.title.trim();
    if (updates.content !== undefined) payload.content = updates.content.trim();
    if (updates.category !== undefined) payload.category = updates.category.trim();
    if (updates.source !== undefined) payload.source = updates.source ? updates.source.trim() : null;
    if (updates.language !== undefined) payload.language = updates.language;

    const { data, error } = await supabase
      .from('knowledge_base')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update knowledge entry: ${error.message}`);
    }

    return data;
  }

  /**
   * Delete knowledge entry (Admin)
   */
  async delete(id) {
    this.checkSupabase();

    // Check if exists
    await this.getById(id);

    const { error } = await supabase
      .from('knowledge_base')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete knowledge entry: ${error.message}`);
    }

    return { id, deleted: true };
  }

  /**
   * Search knowledge base for relevant context for AI RAG pipeline
   */
  async searchRelevant(queryText, limit = 3) {
    if (!supabase) return [];

    try {
      // Clean query and extract keywords
      const terms = queryText
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(/\s+/)
        .filter(term => term.length > 2);

      if (terms.length === 0) return [];

      // Construct a broad ilike search for matching terms in title/content
      let query = supabase.from('knowledge_base').select('id, title, content, category, source');
      const conditions = terms.slice(0, 4).map(term => `title.ilike.%${term}%,content.ilike.%${term}%`);
      
      query = query.or(conditions.join(',')).limit(limit);

      const { data, error } = await query;
      if (error || !data) return [];
      return data;
    } catch (e) {
      return [];
    }
  }
}

module.exports = new KnowledgeService();
