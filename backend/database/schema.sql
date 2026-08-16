-- =====================================================================
-- GangaMitra-KAVAAI Database Schema (Supabase / PostgreSQL)
-- SIH1290: Interactive Robot Mascot (Chacha Chaudhary) for Namami Gange
-- =====================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'company', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. KNOWLEDGE BASE TABLE
CREATE TABLE IF NOT EXISTS public.knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    source VARCHAR(255),
    language VARCHAR(10) DEFAULT 'en' CHECK (language IN ('en', 'hi')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CHAT SESSIONS TABLE (Supports authenticated users and guest sessions)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title VARCHAR(255) DEFAULT 'New Conversation',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of strings: ["Option A", "Option B", "Option C", "Option D"]
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- PERFORMANCE INDEXES
-- =====================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON public.knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_language ON public.knowledge_base(language);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);

-- =====================================================================
-- SEED DATA (INITIAL KNOWLEDGE & QUIZZES)
-- =====================================================================

-- Sample Ganga Knowledge Records
INSERT INTO public.knowledge_base (title, content, category, source, language) VALUES
(
    'What is Namami Gange Programme?',
    'Namami Gange Programme is an Integrated Conservation Mission, approved as a Flagship Programme by the Union Government in June 2014 with a budget outlay of Rs. 20,000 Crore to accomplish the twin objectives of effective abatement of pollution, conservation and rejuvenation of National River Ganga.',
    'Namami Gange',
    'National Mission for Clean Ganga (NMCG)',
    'en'
),
(
    'Biodiversity of River Ganga',
    'The River Ganga is home to more than 140 fish species, 90 amphibian species, and the endangered Ganges River Dolphin (Platanista gangetica), which is India''s National Aquatic Animal. It also supports the critically endangered Gharial and Mugger crocodiles.',
    'Biodiversity',
    'Wildlife Institute of India / NMCG',
    'en'
),
(
    'Sewage and Industrial Pollution Control',
    'Under Namami Gange, comprehensive sewage infrastructure is constructed, including Sewage Treatment Plants (STPs) in key river cities like Haridwar, Kanpur, Prayagraj, and Varanasi to prevent untreated wastewater from entering the river.',
    'Pollution',
    'Central Pollution Control Board',
    'en'
),
(
    'नमामि गंगे कार्यक्रम क्या है?',
    'नमामि गंगे कार्यक्रम एक एकीकृत संरक्षण मिशन है जिसे जून 2014 में केंद्र सरकार द्वारा राष्ट्रीय नदी गंगा के प्रदूषण निवारण, संरक्षण और पुनरुद्धार के लिए अनुमोदित किया गया था।',
    'Namami Gange',
    'NMCG Hindi Portal',
    'hi'
)
ON CONFLICT DO NOTHING;

-- Sample Quiz
INSERT INTO public.quizzes (id, title, description, category) VALUES
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Ganga Ecology & Namami Gange Quiz',
    'Test your knowledge about the holy River Ganga and the conservation initiatives under Namami Gange.',
    'Awareness'
)
ON CONFLICT DO NOTHING;

-- Sample Quiz Questions
INSERT INTO public.quiz_questions (quiz_id, question, options, correct_answer, explanation) VALUES
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Which animal found in River Ganga is the National Aquatic Animal of India?',
    '["Ganges River Dolphin", "Gharial", "Golden Mahseer", "Indian Star Tortoise"]'::jsonb,
    'Ganges River Dolphin',
    'The Ganges River Dolphin (Platanista gangetica) was declared the National Aquatic Animal of India in 2009.'
),
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'In which year was the Namami Gange Flagship Programme launched?',
    '["2010", "2014", "2018", "2020"]'::jsonb,
    '2014',
    'Namami Gange was approved as a flagship programme by the Government of India in June 2014.'
),
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Which comic character mascot is officially associated with the Namami Gange public awareness campaign?',
    '["Chacha Chaudhary", "Shaktimaan", "Tenali Raman", "Vikram Betal"]'::jsonb,
    'Chacha Chaudhary',
    'Chacha Chaudhary is the official mascot declared by NMCG to educate children and citizens about river rejuvenation.'
)
ON CONFLICT DO NOTHING;
