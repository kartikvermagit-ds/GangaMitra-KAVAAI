const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const env = require('../config/env');

class AuthService {
  /**
   * Helper to ensure Supabase client is configured
   */
  checkSupabase() {
    if (!supabase) {
      throw new Error('Database is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.');
    }
  }

  /**
   * Generate JWT token for user
   */
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }

  /**
   * Register a new user
   */
  async register({ name, email, password, role = 'student' }) {
    this.checkSupabase();

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user with email already exists
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (findError) {
      throw new Error(`Database error while checking user: ${findError.message}`);
    }

    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          role,
        },
      ])
      .select('id, name, email, role, created_at')
      .single();

    if (insertError) {
      throw new Error(`Failed to create user: ${insertError.message}`);
    }

    // Generate JWT token
    const token = this.generateToken(newUser);

    return {
      user: newUser,
      token,
    };
  }

  /**
   * Login user
   */
  async login({ email, password }) {
    this.checkSupabase();

    const normalizedEmail = email.trim().toLowerCase();

    // Find user by email
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, name, email, password, role, created_at')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (findError) {
      throw new Error(`Database error while finding user: ${findError.message}`);
    }

    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Verify password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    const token = this.generateToken(user);

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId) {
    this.checkSupabase();

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!user) {
      const notFoundError = new Error('User not found');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return user;
  }
}

module.exports = new AuthService();
