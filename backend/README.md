# 🌊 GangaMitra-KAVAAI Backend

> **SIH1290**: Development of AI, ML and Chatbot-powered Interactive Robot Mascot (Chacha Chaudhary) and digital avatar to strengthen the river people connect component of Namami Gange.

Welcome to the backend repository of **GangaMitra-KAVAAI**! This project powers the digital brain for our Chacha Chaudhary interactive avatar and robot mascot, delivering Namami Gange awareness, ecological education, quizzes, and citizen Q&A.

---

## 🏗️ Backend Architecture

The backend is built following a clean, layered architecture designed for a 6-person hackathon team:

- **Routes Layer (`src/routes/`)**: Pure route definitions and middleware bindings.
- **Controllers Layer (`src/controllers/`)**: Thin HTTP request parsers and standard response formatters.
- **Services Layer (`src/services/`)**: Core business logic, Supabase queries, and AI provider orchestrations.
- **Middleware Layer (`src/middleware/`)**: JWT verification, RBAC role guard, input validations, and central error handling.
- **Configuration & Utils (`src/config/`, `src/utils/`)**: Environment validation, database client, response helpers, and logging.
- **Database Layer (`database/schema.sql`)**: Supabase PostgreSQL schema, relational tables, performance indexes, and seed data.

```
backend/
├── src/
│   ├── config/
│   │   ├── env.js                  # Environment variable configuration
│   │   └── supabase.js             # Supabase client singleton
│   ├── controllers/
│   │   ├── auth.controller.js      # Register, login, profile endpoints
│   │   ├── knowledge.controller.js # Knowledge CRUD endpoints
│   │   ├── chat.controller.js      # Mascot Q&A and session endpoints
│   │   └── quiz.controller.js      # Quiz listing and scoring
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── knowledge.routes.js
│   │   ├── chat.routes.js
│   │   ├── quiz.routes.js
│   │   └── index.js                # Aggregated API router
│   ├── middleware/
│   │   ├── auth.middleware.js      # JWT authentication & role-based access
│   │   ├── validate.middleware.js  # Input payload validation
│   │   └── error.middleware.js     # Centralized error handler & 404
│   ├── services/
│   │   ├── auth.service.js         # bcrypt hashing, JWT issuance, user queries
│   │   ├── knowledge.service.js    # Knowledge base queries & keyword search
│   │   ├── ai.service.js           # Chacha Chaudhary Mascot persona + Gemini/Groq/Fallback
│   │   ├── chat.service.js         # Chat history & session management
│   │   └── quiz.service.js         # Quiz evaluation and grading
│   ├── utils/
│   │   ├── response.js             # Standardized API response formatters
│   │   └── logger.js               # Structured console logger
│   ├── app.js                      # Express application setup & CORS
│   └── server.js                   # Server entry point
├── database/
│   └── schema.sql                  # PostgreSQL table definitions & seed data
├── test/
│   └── smoke.test.js               # Automated API test suite
├── .env.example                    # Environment variable template
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL) with UUID keys
- **Authentication**: JWT (`jsonwebtoken`) + Password Hashing (`bcryptjs`)
- **AI Integration**: Pluggable provider abstraction supporting Google Gemini (`gemini-1.5-flash`), Groq (`llama-3.1-8b-instant`), and a built-in rule/knowledge fallback engine.
- **RAG Capability**: Context retriever querying `knowledge_base` to ground mascot responses with authentic Namami Gange data.

---

## 🔑 Environment Variables Setup

Create a `.env` file in the `backend/` directory based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the environment variables:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated or `*`) | `http://localhost:3000,http://localhost:5173` |
| `SUPABASE_URL` | Your Supabase project URL | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase **Service Role** Secret Key (backend only) | - |
| `JWT_SECRET` | Secret key for signing authentication tokens | - |
| `JWT_EXPIRES_IN` | Token expiration duration | `7d` |
| `AI_PROVIDER` | Active AI provider (`gemini`, `groq`, or `mock`) | `gemini` |
| `GEMINI_API_KEY` | Google Gemini API Key | - |
| `GEMINI_MODEL` | Gemini model name | `gemini-1.5-flash` |
| `GROQ_API_KEY` | Groq Cloud API Key | - |
| `GROQ_MODEL` | Groq model name | `llama-3.1-8b-instant` |

---

## 🗄️ Supabase Database Setup

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open [`database/schema.sql`](file:///c:/Users/hp/OneDrive/Desktop/GangaMitra-KAVAAI/backend/database/schema.sql) and paste its entire content into the SQL Editor.
4. Click **Run**. This will create the following tables and seed sample knowledge and quizzes:
   - `users`
   - `knowledge_base`
   - `chat_sessions`
   - `chat_messages`
   - `quizzes`
   - `quiz_questions`
5. Go to **Project Settings** -> **API** and copy:
   - **Project URL** -> `SUPABASE_URL`
   - **service_role (secret)** key -> `SUPABASE_SERVICE_ROLE_KEY`
6. Paste these into your `backend/.env` file.

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
Navigate into the `backend/` directory:
```bash
cd backend
npm install
```

### 2. Run Tests
Verify that all routes and logic pass smoke tests:
```bash
npm test
```

### 3. Start Development Server
Start the server with hot-reloading:
```bash
npm run dev
```
The server will start at: `http://localhost:5000`

---

## 📡 API Reference

### 1. Health Check
- **`GET /api/health`**
  - **Response:**
    ```json
    {
      "success": true,
      "message": "GangaMitra backend is running",
      "timestamp": "2026-08-16T08:22:00.000Z",
      "version": "1.0.0",
      "service": "GangaMitra-KAVAAI (SIH1290)"
    }
    ```

---

### 2. Authentication & Users
- **`POST /api/auth/register`**
  - **Body:**
    ```json
    {
      "name": "Aarav Sharma",
      "email": "aarav@example.com",
      "password": "Password@123",
      "role": "student"
    }
    ```
  - Supported roles: `student`, `company`, `admin`.

- **`POST /api/auth/login`**
  - **Body:**
    ```json
    {
      "email": "aarav@example.com",
      "password": "Password@123"
    }
    ```
  - **Response:** Returns JWT token and sanitized user details.

- **`GET /api/auth/me`** *(Requires `Authorization: Bearer <token>`)*
  - **Response:** Returns current authenticated user profile.

---

### 3. AI Mascot Chatbot (Chacha Chaudhary)
- **`POST /api/chat`**
  - Sends a question to Chacha Chaudhary mascot.
  - **Body:**
    ```json
    {
      "message": "Why is the Ganges river dolphin endangered and how does Namami Gange protect it?",
      "language": "en",
      "sessionId": "optional-uuid"
    }
    ```
  - Supports `language`: `"en"` (English) or `"hi"` (Hindi).
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Response generated successfully",
      "answer": "Namaste! Chacha Chaudhary here! The Ganges River Dolphin...",
      "sources": [
        {
          "id": "...",
          "title": "Biodiversity of River Ganga",
          "category": "Biodiversity",
          "source": "Wildlife Institute of India / NMCG"
        }
      ],
      "sessionId": "b46b-...",
      "provider": "gemini"
    }
    ```

---

### 4. Chat History & Sessions
- **`POST /api/chat/sessions`**
  - Creates a new conversation session.
  - **Body:** `{ "title": "Ganga Water Conservation" }`
- **`GET /api/chat/sessions`** *(Requires Bearer token)*
  - Lists all sessions belonging to the logged-in user.
- **`GET /api/chat/sessions/:id/messages`**
  - Retrieves chat message history for a given session.

---

### 5. Ganga Knowledge Base
- **`GET /api/knowledge`**
  - Query parameters: `?category=Biodiversity&language=en&search=dolphin&limit=10&offset=0`
- **`GET /api/knowledge/:id`**
  - Retrieves a specific knowledge article.
- **`POST /api/knowledge`** *(Admin only)*
  - Creates a new knowledge article.
  - **Body:**
    ```json
    {
      "title": "Afforestation along Ganga Banks",
      "content": "Planting indigenous tree species along riparian zones reduces soil erosion...",
      "category": "River Ecology",
      "source": "Forest Research Institute",
      "language": "en"
    }
    ```
- **`PUT /api/knowledge/:id`** *(Admin only)*
- **`DELETE /api/knowledge/:id`** *(Admin only)*

---

### 6. Quizzes & Awareness
- **`GET /api/quizzes`**
  - Lists all available quizzes.
- **`GET /api/quizzes/:id`**
  - Fetches quiz and question options without exposing the correct answer.
- **`POST /api/quizzes/:id/submit`**
  - Submits user answers and grades the quiz.
  - **Body:**
    ```json
    {
      "answers": {
        "question-uuid-1": "Ganges River Dolphin",
        "question-uuid-2": "2014"
      }
    }
    ```
  - **Response:** Returns score, total questions, percentage, pass status, and explanations for each question.

---

## 🔒 Security Best Practices
- Passwords are encrypted with **bcrypt** (salt rounds: 10) before saving.
- Tokens are signed using **JWT** with configurable expiration.
- Database service role key is kept backend-side and never exposed to the client.
- Strict input validation prevents invalid or empty payloads.
- Role-based authorization (`authorizeRoles('admin')`) guards sensitive administrative operations.
