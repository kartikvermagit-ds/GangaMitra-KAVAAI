# 🌊 GangaMitra-KAVAAI Frontend

> **SIH1290**: Development of AI, ML and Chatbot-powered Interactive Robot Mascot (Chacha Chaudhary) and digital avatar to strengthen the river people connect component of Namami Gange.

Welcome to the frontend web application of **GangaMitra-KAVAAI**! Built with React, Vite, Tailwind CSS, Lucide React, and Framer Motion, this application delivers a child-friendly, interactive digital mascot experience representing the iconic **Chacha Chaudhary**.

---

## 🎨 Visual Identity & UI/UX Design

- **Palette**: Ganga Deep Blue, River Azure, Sacred Saffron accents, and Fresh Emerald greens.
- **Mascot Experience (`<Mascot />`)**: Dynamic animated states (`idle`, `thinking`, `speaking`, `happy`, `celebrating`) with custom SVG character illustrations and a pluggable architecture ready for future 3D/Robot integration.
- **Multilingual Ready**: Native bilingual interface toggling seamlessly between **English** and **Hindi (हिंदी)**.
- **Voice-Ready Chat Interface**: Chat input equipped with a simulated microphone listener ready for future Speech-to-Text hardware.
- **Educational Knowledge & Quizzes**: Knowledge card reader modal with official NMCG citations and an interactive quiz scoring engine with detailed answer explanations.

---

## 📁 Frontend Architecture & Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Header with branding, mobile drawer & language switcher
│   │   ├── Footer.jsx            # Educational footer with Namami Gange references
│   │   ├── Mascot.jsx            # Chacha Chaudhary digital avatar component with dynamic states
│   │   ├── ChatBox.jsx           # Chat interaction container with suggestion chips & voice demo
│   │   ├── MessageBubble.jsx     # Message bubbles with RAG source badges & read-aloud action
│   │   ├── KnowledgeCard.jsx     # Educational article cards with detailed reading modal
│   │   ├── QuizCard.jsx          # Interactive quiz cards
│   │   ├── LoadingAnimation.jsx  # River spinner & Chacha thinking indicators
│   │   └── StateViews.jsx        # Loading, empty, and friendly error alert components
│   ├── pages/
│   │   ├── Home.jsx              # Hero, "What can Chacha do?", "Explore Ganga" & Action flow
│   │   ├── Chat.jsx              # Split-screen Mascot + AI Chat experience
│   │   ├── Learn.jsx             # Categorized Namami Gange knowledge discovery & search
│   │   ├── Quiz.jsx              # Question stepper, progress bar & score report
│   │   ├── AboutGanga.jsx        # River ecology, Dolphin/Gharial biodiversity & Citizen pledge
│   │   └── NotFound.jsx          # Mascot-themed 404 page
│   ├── services/
│   │   └── api.js                # Centralized Axios API service with clean error handling
│   ├── context/
│   │   └── LanguageContext.jsx   # English / Hindi state and translation dictionary
│   ├── App.jsx                   # Layout wrapper & React Router configuration
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Tailwind CSS & custom animations
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── package.json
└── README.md
```

---

## 🔗 How the Frontend Connects to the Backend

The frontend communicates with the Express backend via [src/services/api.js](file:///c:/Users/hp/OneDrive/Desktop/GangaMitra-KAVAAI/frontend/src/services/api.js):

- `POST /api/chat` -> Sends `{ message, language: "en" | "hi", sessionId }` and receives `{ success: true, answer, sources, sessionId }`.
- `GET /api/knowledge` -> Fetches articles with optional `?category=...&search=...`.
- `GET /api/quizzes` & `GET /api/quizzes/:id` -> Fetches quiz list and question options.
- `POST /api/quizzes/:id/submit` -> Evaluates user answers and returns score breakdown with explanations.
- `GET /api/health` -> Health check validation.

---

## 🚀 Getting Started Locally

### 1. Configure Environment
Create a `.env` file in the `frontend/` directory:
```bash
cp .env.example .env
```

Ensure `VITE_API_URL` points to your backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🏆 3-Minute Hackathon Jury Demo Flow

1. **Home Page**: Show the vibrant hero with the animated Chacha Chaudhary avatar and click **"Talk to Chacha"**.
2. **Chat Demo**:
   - Click a suggested question: *"Why is the Ganga important?"* or *"Tell me about the Ganges River Dolphin"*.
   - Watch the Mascot shift dynamically: **Idle -> Thinking -> Speaking**.
   - Show the verified Namami Gange source references attached to the answer.
   - Click the **Language Toggle** (top right) to switch the interface and ask questions in **Hindi (हिंदी)**.
   - Click the **Microphone Button** to demonstrate future Voice/Robot Mascot interaction.
3. **Knowledge Hub (`/learn`)**:
   - Filter by categories (*Biodiversity, Pollution, Namami Gange*).
   - Open a card to demonstrate the rich reading modal with source citations.
4. **Quiz (`/quiz`)**:
   - Start the *Ganga Ecology & Namami Gange Quiz*.
   - Answer the step-by-step questions and submit.
   - Show the score metric, celebration badge, and educational explanations for each question.
5. **About Ganga (`/about-ganga`)**:
   - Show the 5 Pillars of Namami Gange and click the interactive **Citizen Ganga Guardian Pledge**.
