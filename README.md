# Clicky — AI-Powered Child Online Safety Learning Platform

> **"Big Adventures. Smarter Kids. Safer Online."**

Clicky is a gamified, AI-powered digital safety learning platform for children aged 7–13. Instead of dry lectures, Clicky turns online safety into an interactive cartoon adventure where children learn by navigating authentic digital scenarios, collecting badges, leveling up, and consulting **KindBot**, their friendly AI safety companion.

---

## 🌟 Key Highlights & Features

- **8 Fully Playable Games**: Every single game contains at least 6 rich scenarios with character dialogue, clues, red-flag checklists, immediate feedback, and Golden Safety Rules.
- **KindBot AI Companion**: Safe, empathetic, child-friendly AI companion with structured scenario heuristics, recommended next steps, and emergency guidance (zero external API key required).
- **Interactive Landing Page Hero**: Instant playable safety challenge directly on the homepage—no login needed.
- **Parent Guardian Dashboard**: Real-time progress analytics powered by Recharts, topic-by-topic mastery breakdown, weekly practice time, and actionable offline conversation starters.
- **Parent-Child Linkage**: Secure one-time pairing code generator (`CLICKY-XXXX`) and redemption workflow that logically links child and parent accounts.
- **Judges Demo Bar**: 1-click account switching between **Child (Alex)** and **Parent (Sarah)**, instant pairing code lookup, sound toggle, and demo data reset.
- **Zero-Config Persistent Architecture**: Out-of-the-box in-memory and client-synced persistence for immediate judge evaluation without needing external database setup. Full PostgreSQL Prisma schema included for persistent production deployments.
- **Child-Friendly Design System**: Custom rounded design tokens, playful robot shield mascot, sound synthesizer, and accessible navigation.

---

## 🎮 The 8 Playable Safety Games

1. **Scam Detective (`/child/games/scam-detective`)**
   - *Theme:* Detective Mystery
   - *Focus:* Spotting phishing links, fake prize traps, false urgency countdowns, and credential theft attempts.
2. **Cyberbullying Heroes (`/child/games/cyberbullying-heroes`)**
   - *Theme:* Superhero Empathy
   - *Focus:* Recognizing harassment, handling toxic gaming voice chats, practicing upstander behavior, and blocking/reporting bullies without retaliation.
3. **Fake or Fact (`/child/games/fake-or-fact`)**
   - *Theme:* Junior Newsroom Investigation
   - *Focus:* Uncovering deepfakes, manipulated disaster photos, clickbait headlines, and verifying news through established sources.
4. **Privacy Protector (`/child/games/privacy-protector`)**
   - *Theme:* Personal Data Treasure Vault
   - *Focus:* Protecting passwords, home addresses, school jerseys in photos, overreaching app permissions, and avoiding viral quiz security traps.
5. **Safe AI Explorer (`/child/games/safe-ai-explorer`)**
   - *Theme:* Futuristic AI Lab
   - *Focus:* Detecting AI hallucinations, understanding that bots make mistakes, preventing oversharing of secrets, and avoiding plagiarism.
6. **VoiceGuard Rescue (`/child/games/voiceguard-rescue`)**
   - *Theme:* Secret Agent Radio
   - *Focus:* Thwarting cloned voice telephone scams, verifying emergencies with known family numbers, and using secret family safe words.
7. **Kindness Kingdom (`/child/games/kindness-kingdom`)**
   - *Theme:* Cooperative Quest
   - *Focus:* Welcoming newcomers, defusing heated chat arguments, reframing creative feedback constructively, and practicing sincere apologies.
8. **Gamer Safety Quest (`/child/games/gamer-safety-quest`)**
   - *Theme:* Video Game Dungeon
   - *Focus:* Identifying fake currency generators, malware hidden in .exe mods, dangerous requests to move to unmonitored private chat apps, and fake sponsorship scams.

---

## 🧭 Application Routes

### Public Routes
- `/`: Landing page with hero challenge, 8-game showcase, How It Works, KindBot preview, FAQs, and footer.
- `/about`: Platform mission, educational philosophy, and core principles.
- `/how-it-works`: Step-by-step breakdown of the learning cycle.
- `/safety`: Privacy-first standards, COPPA compliance, and emergency helpline cards.
- `/login`: Sign in with credentials or instant 1-click judge demo buttons.
- `/signup`: Role-based registration with age band selection (Early Explorer, Digital Navigator, Cyber Hero).
- `/forgot-password`: Password recovery flow.

### Child Routes
- `/child/dashboard`: Greeting, level badge, XP bar, 3-day streak, daily challenge, continue learning, and featured missions.
- `/child/adventures`: Visual 8-realm quest world map.
- `/child/games`: Arcade with search, safety topic filter pills, and launch buttons.
- `/child/games/[slug]`: Dynamic interactive game runner powered by `GameEngine`.
- `/child/progress`: Topic accuracy percentages, mastery badges, and recent activity log.
- `/child/achievements`: Complete badge trophy room showing 13 collectible achievements.
- `/child/kindbot`: Full interactive AI companion chat.
- `/child/safety-toolkit`: Family safe word generator, red flag cheat-sheet, and emergency numbers.
- `/child/profile`: Character avatar customizer and hero nickname.

### Parent Routes
- `/parent/dashboard`: Comprehensive guardian dashboard with Recharts accuracy analytics and weekly practice time.
- `/parent/children`: Linked child profiles overview and new profile creator.
- `/parent/children/[id]`: Individual child deep-dive page.
- `/parent/progress`: Topic-by-topic performance comparisons.
- `/parent/insights`: Strengths and practice opportunities.
- `/parent/recommendations`: Constructive recommendations and offline dinner conversation starters.
- `/parent/settings`: Notification preferences and guardian settings.

### Shared Utility Routes
- `/pair-child`: One-time pairing code generator for parents and redemption tool for children.
- `/not-found`: 404 page with Clicky mascot and return links.

---

## 🔑 Demo Access for Judges

Use the **Judges Demo Bar** at the very top of any page, or use these seeded credentials:

| Account Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Child Demo (Alex)** | `alex@clicky.demo` | `Password123!` | Level 2 Safety Scout • 480 XP • 3-Day Streak |
| **Parent Demo (Sarah)** | `parent@clicky.demo` | `Password123!` | Linked to Alex • Live charts & recommendations |

*You can also click **"Child Demo (Alex)"** or **"Parent Demo (Sarah)"** on the top toolbar to switch instantly with 1 click.*

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Environment Variables (`.env`)

See `.env.example` for reference:

```env
# Optional: PostgreSQL Database connection string (Prisma)
# If omitted, Clicky automatically runs in robust Zero-Config Demo Mode with full local persistence!
DATABASE_URL="postgresql://postgres:password@localhost:5432/clicky?schema=public"

# Authentication session secret
SESSION_SECRET="clicky_super_secret_session_jwt_key_32_chars_min"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional External AI Provider for KindBot
# If not provided, KindBot utilizes its comprehensive, safe local scenario & intent engine
AI_PROVIDER_API_KEY=""
AI_MODEL="gemini-1.5-flash"
```

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Framework Preset: **Next.js**.
4. (Optional) Set `DATABASE_URL` and `SESSION_SECRET` in Environment Variables. If not provided, Clicky automatically boots in zero-config demo mode.
5. Click **Deploy**. Vercel will build and serve the application globally with zero extra configuration!
