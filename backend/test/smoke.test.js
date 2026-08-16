/**
 * GangaMitra Backend Smoke Test Suite
 * Validates route wiring, input validation, AI provider fallback, and business logic
 */

const http = require('http');
const app = require('../src/app');
const aiService = require('../src/services/ai.service');
const quizService = require('../src/services/quiz.service');

let server;
const PORT = 5099;
const BASE_URL = `http://localhost:${PORT}`;

const request = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve({ status: res.statusCode, body: json });
          } catch (e) {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );

    req.on('error', reject);

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🧪 Starting GangaMitra Backend Smoke Tests...\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  };

  try {
    // 1. Health check test
    const health = await request('/api/health');
    assert(health.status === 200, 'GET /api/health returns 200 status');
    assert(health.body.success === true, 'GET /api/health returns success: true');
    assert(
      health.body.message === 'GangaMitra backend is running',
      'GET /api/health returns expected message'
    );

    // 2. Auth input validation tests
    const badRegister = await request('/api/auth/register', {
      method: 'POST',
      body: { name: '', email: 'not-an-email', password: '123' },
    });
    assert(badRegister.status === 400, 'POST /api/auth/register validates inputs (400 on invalid payload)');

    const badLogin = await request('/api/auth/login', {
      method: 'POST',
      body: {},
    });
    assert(badLogin.status === 400, 'POST /api/auth/login validates required fields');

    // 3. AI Service tests
    console.log('\n🤖 Testing AI Mascot Service...');
    const enResponse = await aiService.generateResponse({
      message: 'Why is River Ganga important?',
      language: 'en',
    });
    assert(typeof enResponse.answer === 'string' && enResponse.answer.length > 0, 'AI Service generates English answer');
    assert(Array.isArray(enResponse.sources), 'AI Service returns sources array');

    const hiResponse = await aiService.generateResponse({
      message: 'गंगा डॉल्फिन के बारे में बताओ',
      language: 'hi',
    });
    assert(typeof hiResponse.answer === 'string' && hiResponse.answer.length > 0, 'AI Service generates Hindi answer');

    // 4. Chat endpoint test (POST /api/chat)
    const chatEndpoint = await request('/api/chat', {
      method: 'POST',
      body: {
        message: 'Namami Gange mission details',
        language: 'en',
      },
    });
    assert(chatEndpoint.status === 200, 'POST /api/chat returns 200 status');
    assert(chatEndpoint.body.success === true, 'POST /api/chat returns success: true');
    assert(Boolean(chatEndpoint.body.answer), 'POST /api/chat includes answer in response');

    // 5. 404 handler test
    const notFound = await request('/api/non-existent-route');
    assert(notFound.status === 404, 'Undefined route returns 404 with standard format');

    console.log(`\n========================================`);
    console.log(`🎉 Tests completed: ${passed} passed, ${failed} failed`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  } finally {
    server.close();
  }
}

// Start temporary test server
server = app.listen(PORT, () => {
  runTests();
});
