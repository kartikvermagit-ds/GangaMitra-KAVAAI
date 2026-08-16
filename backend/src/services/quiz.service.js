const supabase = require('../config/supabase');

class QuizService {
  checkSupabase() {
    if (!supabase) {
      throw new Error('Database is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.');
    }
  }

  /**
   * Get list of all available quizzes
   */
  async getAllQuizzes() {
    this.checkSupabase();

    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title, description, category, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch quizzes: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get single quiz and its questions WITHOUT revealing correct answers
   */
  async getQuizById(id) {
    this.checkSupabase();

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title, description, category, created_at')
      .eq('id', id)
      .maybeSingle();

    if (quizError) {
      throw new Error(`Database error: ${quizError.message}`);
    }

    if (!quiz) {
      const err = new Error('Quiz not found');
      err.statusCode = 404;
      throw err;
    }

    // Fetch questions WITHOUT correct_answer and explanation
    const { data: questions, error: qError } = await supabase
      .from('quiz_questions')
      .select('id, question, options')
      .eq('quiz_id', id);

    if (qError) {
      throw new Error(`Failed to fetch quiz questions: ${qError.message}`);
    }

    return {
      ...quiz,
      questions: questions || [],
    };
  }

  /**
   * Submit quiz answers, calculate score, and return review with explanations
   * answers: { [questionId]: "selectedOption" }
   */
  async submitQuiz(quizId, answers = {}) {
    this.checkSupabase();

    // Verify quiz exists
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('id', quizId)
      .maybeSingle();

    if (quizError || !quiz) {
      const err = new Error('Quiz not found');
      err.statusCode = 404;
      throw err;
    }

    // Fetch all questions with answers for scoring
    const { data: questions, error: qError } = await supabase
      .from('quiz_questions')
      .select('id, question, options, correct_answer, explanation')
      .eq('quiz_id', quizId);

    if (qError) {
      throw new Error(`Failed to evaluate quiz: ${qError.message}`);
    }

    let score = 0;
    const totalQuestions = (questions || []).length;
    const results = [];

    (questions || []).forEach(q => {
      const userAnswer = answers[q.id] ? String(answers[q.id]).trim() : null;
      const isCorrect = userAnswer && userAnswer.toLowerCase() === q.correct_answer.trim().toLowerCase();

      if (isCorrect) {
        score += 1;
      }

      results.push({
        questionId: q.id,
        question: q.question,
        userAnswer,
        correctAnswer: q.correct_answer,
        isCorrect: Boolean(isCorrect),
        explanation: q.explanation || null,
      });
    });

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    return {
      quizId,
      quizTitle: quiz.title,
      score,
      totalQuestions,
      percentage,
      passed: percentage >= 60,
      breakdown: results,
    };
  }
}

module.exports = new QuizService();
