const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

let supabase = null;

if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  console.warn(
    '[GangaMitra Backend] WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured in .env. Database operations will be mocked or fail.'
  );
}

module.exports = supabase;
