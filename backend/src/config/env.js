const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file (checking cwd and backend root)
const fs = require('fs');
const envPathCwd = path.resolve(process.cwd(), '.env');
const envPathBackend = path.resolve(__dirname, '../../.env');

if (fs.existsSync(envPathCwd)) {
  dotenv.config({ path: envPathCwd });
} else if (fs.existsSync(envPathBackend)) {
  dotenv.config({ path: envPathBackend });
} else {
  dotenv.config();
}

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : '*',
  
  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'gangamitra_default_jwt_secret_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // AI Configuration
  AI_PROVIDER: (process.env.AI_PROVIDER || 'gemini').toLowerCase(),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
};

module.exports = env;
