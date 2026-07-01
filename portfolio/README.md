# 🚀 Aaroha Vartak — Portfolio Website

A modern, fully responsive React portfolio with dark/light mode, micro-animations, and a FastAPI + Supabase contact backend.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v4     |
| Animation| Framer Motion                       |
| Icons    | React Icons                         |
| Typing   | React Type Animation                |
| Scroll   | React Scroll                        |
| Toast    | React Hot Toast                     |
| Backend  | FastAPI + Python                    |
| Database | Supabase (PostgreSQL)               |

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Loader.jsx          # Animated loading screen
│   │   ├── Navbar.jsx          # Sticky nav with mobile menu
│   │   ├── Hero.jsx            # Hero with typing animation
│   │   ├── ParticleBackground.jsx  # Canvas particles
│   │   ├── About.jsx           # About + stats
│   │   ├── Skills.jsx          # Tabbed skill bars
│   │   ├── Projects.jsx        # Filterable project cards
│   │   ├── Education.jsx       # Timeline
│   │   ├── Certifications.jsx  # Cert cards
│   │   ├── Contact.jsx         # Form + FastAPI integration
│   │   ├── Footer.jsx          # Footer + back to top
│   │   └── SectionTitle.jsx    # Reusable section header
│   ├── context/
│   │   └── ThemeContext.jsx    # Dark/light mode
│   ├── hooks/
│   │   ├── useScrollReveal.js
│   │   └── useActiveSection.js
│   ├── data/
│   │   └── portfolioData.js    # All content data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── main.py                 # FastAPI app
│   ├── requirements.txt
│   └── .env.example
└── .env.example
```

## Getting Started

### Frontend

```bash
cd portfolio
npm install
cp .env.example .env     # Set VITE_API_URL
npm run dev
```

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env     # Set SUPABASE_URL and SUPABASE_KEY
uvicorn main:app --reload
```

### Supabase Setup

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Row Level Security (optional but recommended)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for all" ON contact_messages FOR INSERT WITH CHECK (true);
```

## Customization

Edit `src/data/portfolioData.js` to update:
- Personal info (name, email, GitHub, LinkedIn)
- Skills and proficiency levels
- Projects (title, description, tech, links)
- Education history
- Certifications

## Features

- ✅ Dark / Light mode toggle (persisted)
- ✅ Smooth scroll navigation with active section highlight
- ✅ Typing animation in Hero
- ✅ Canvas particle background
- ✅ Animated skill progress bars
- ✅ Project filtering by category
- ✅ Timeline education section
- ✅ Contact form with validation + FastAPI + Supabase
- ✅ Framer Motion scroll reveal animations
- ✅ Mobile responsive (320px → 4K)
- ✅ SEO meta tags
- ✅ Loading screen
- ✅ Back to top button
