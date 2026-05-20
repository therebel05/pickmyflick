# CINESense 🎬

An AI-powered movie discovery platform with a Netflix-style interface. Search for movies using natural language — describe a mood, genre, era, or vibe — and get personalised recommendations powered by Google Gemini, enriched with real metadata from TMDB.

[Live Demo](https://cinesense-ai.netlify.app)

---

![CINESense Home](https://github.com/user-attachments/assets/3651efb1-82e3-4e3e-97d2-0917830a3bf4)

---

## What it does

Most movie apps make you browse. CINESense lets you just describe what you want.

Type something like _"1980s horror movies with a slow burn"_ or _"feel-good comedies set in Italy"_ and Gemini interprets your intent, returns a structured list of matching titles, and the app fetches full metadata for each — poster, synopsis, ratings — rendered in a familiar Netflix-style UI.

**Core user flow:**
1. Browse the home screen — Now Playing, Popular, Top Rated rows sourced from TMDB
2. Click **AI Search** and describe what you want to watch in plain English
3. Log in with Google if not already authenticated
4. Enter your Gemini API key in your profile (one-time setup)
5. Hit Search — Gemini returns a structured movie list, TMDB fills in the details
6. Results render as a full movie row, just like the home screen

---

## Architecture decisions

### Why prompt-to-structure instead of free-form Gemini output?
Rather than asking Gemini to describe movies in prose, the prompt enforces a strict JSON schema response — movie titles in a predictable array. This makes the output deterministic and directly usable for TMDB API calls without any parsing fragility.

### Why Promise.all for TMDB calls?
Once Gemini returns N movie titles, the app fires all N TMDB search requests in parallel using `Promise.all`. This keeps the UI fast regardless of how many results Gemini returns — all metadata loads together rather than sequentially.

### Why user-supplied Gemini API keys?
Rather than proxying requests through a backend (which would require server infrastructure and cost), each user brings their own Gemini key stored in their profile. This keeps the app fully serverless and deployable on Netlify at zero cost, while keeping AI calls private to each user.

### Why Google Auth as the login gate?
The AI search feature is gated behind authentication to prevent anonymous abuse of the API key flow. Google OAuth via Firebase was the fastest path to a secure, production-grade auth layer without building a backend.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Styling | Tailwind CSS |
| AI | Google Gemini API |
| Movie Data | TMDB API |
| Auth | Google OAuth (Firebase) |
| Deployment | Netlify |

---

## Key features

- 🎬 **Netflix-style UI** — Hero banner, horizontally scrollable rows (Now Playing, Popular, Top Rated)
- 🤖 **Natural language AI search** — Describe what you want to watch, not just keywords
- ⚡ **Parallel API orchestration** — All TMDB calls fired simultaneously with Promise.all
- 🔐 **Google authentication** — Login-gated AI search with Firebase OAuth
- 🔑 **User API key management** — Personal Gemini key stored per user profile
- 📱 **Responsive design** — Works across desktop and mobile

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/your-username/cinesense.git
cd cinesense

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Add the following to your `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

```bash
# Start the dev server
npm run dev
```

> **Note:** Each user must add their own [Google Gemini API key](https://aistudio.google.com/app/apikey) in their profile after logging in.

---

## Screenshots

| Home | AI Search |
|---|---|
| ![Home](https://github.com/user-attachments/assets/65c5e140-5d28-4220-9d35-3092635dfa64) | ![AI Search](https://github.com/user-attachments/assets/28960860-e206-4c86-a8f6-6661964f76c1) |

---

## Roadmap

- [ ] Migrate to Next.js with App Router and SSR
- [ ] Server-side Gemini calls via Route Handlers (remove client-side API key requirement)
- [ ] Supabase auth and user data persistence
- [ ] Save and revisit past AI searches
- [ ] Streaming Gemini responses for faster perceived performance

---

## Author

**Akshay Kumar Raut** — [LinkedIn](https://linkedin.com/in/akshay-raut-a30331bb) · [GitHub](https://github.com/therebel05)
