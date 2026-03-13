# SPIKE Knowledge Base

## How To Use This File

This is a living knowledge base for **SPIKE** (spike.quest). Read this at the start of any AI-assisted working session — whether that's Claude, GPT, or any future tool. It grounds the collaborator in the game's identity, technical architecture, workflow, and current state so they can contribute meaningfully without re-learning everything.

**Keep this file updated.** After significant changes (new features, database shifts, clue bank additions, design decisions), update the relevant sections. Treat it like a shared brain.

---

## What SPIKE Is

**SPIKE** is a daily Broadway guessing game. One puzzle per day. Players guess a Broadway show — blind at first, then aided by clues revealed one at a time when they guess wrong. The fewer clues you need, the more "tape" you collect.

**URL:** spike.quest
**Parent brand:** The Fourth Wall (fourthwall.news)
**Created by:** Matt Rodin

### The Name

A spike mark is a piece of tape on a dark stage floor that the audience never sees but that makes the show work. The game lives on the production side of the proscenium. It knows what the crew knows. It knows what the dresser knows. It knows what the pit musician knows.

### The Philosophy

SPIKE is not trivia. It's revelation.

Every clue should feel like someone who works the show leaning over and telling you something you'd never know from Row J. The best clues are *revelatory* — they make you see a show you thought you knew in a completely different way. They pull back the curtain.

A clue like "A musical about a founding father" describes what the audience already sees. A clue like "The drummer is isolated in a room behind the pit and syncs with the conductor via live video feed" shows you how the show actually works. That's the difference.

Win or lose, the player walks away having learned something they didn't know before. The clue progression IS the journey through the fourth wall — from the audience's experience to the invisible infrastructure that makes theater work.

### Relationship to The Fourth Wall

The Fourth Wall (fourthwall.news) is Matt's weekly newsletter about theater, culture, and creativity. Its tagline is "Where art meets its audience." SPIKE breaks the fourth wall by pulling the audience backstage. The game is a natural extension of the newsletter's mission — bringing more people inside the work.

---

## Game Mechanics

### Daily Flow
1. A new puzzle goes live every day at midnight Eastern.
2. Each puzzle has an **answer** (a Broadway show), a **category** (e.g. "Broadway Musical"), and **5 text clues** hidden under colored tape strips.
3. Players start blind — no clues visible. They can guess immediately.
4. Each **wrong guess** automatically peels one tape strip, revealing the clue underneath.
5. Players get **6 total wrong guesses** before they lose.
6. Clues go from hardest to easiest (the admin orders them during puzzle building).

### Scoring (Tape Collection)
- Solve with 0 clues revealed: 5/5 tape
- Solve with 1 clue revealed: 4/5 tape
- Solve with 4 clues revealed: 1/5 tape
- Solve after all 5 revealed or lose: 1 white consolation tape
- Every 7-day win streak: bonus glow tape

### Guess Matching
- Case-insensitive
- Each puzzle can have **aliases** (e.g. "Phantom of the Opera" also accepts "phantom", "the phantom of the opera")

---

## Technical Architecture

### Stack
- **Framework:** Next.js 16 (App Router, server components for data fetching)
- **Database/Auth:** Supabase (PostgreSQL + magic link OTP auth)
- **Styling:** Tailwind CSS 4
- **Hosting:** Netlify
- **Drag & Drop:** @dnd-kit (core, sortable, modifiers, utilities)
- **Game state:** Client-side React state + localStorage persistence (keyed by date)

### Project Structure
```
app/
  page.tsx              — Main game page (fetches today's puzzle)
  layout.tsx            — Root layout
  globals.css           — Global styles, animations
  admin/
    page.tsx            — Admin dashboard (queue + schedule management)
    build/
      page.tsx          — Puzzle builder
components/
  Game.tsx              — Core game logic (guess handling, state machine)
  GameShell.tsx         — Game wrapper (auth check, tutorial, stats)
  GuessForm.tsx         — Text input + submit
  ClueList.tsx          — Tape strips + clue reveal animations
  ScoreMarks.tsx        — Post-game tape visualization
  TapeCounter.tsx       — Top-right tape count
  TapeResult.tsx        — End-of-game results card
  TapeStatsModal.tsx    — Stats modal (streaks, history, color breakdown)
  HowToPlay.tsx         — Tutorial modal (4-step walkthrough)
  AuthGate.tsx          — Email OTP or guest play
  AdminDashboard.tsx    — Queue/schedule management with DnD reordering
  AdminHeader.tsx       — Admin nav header
  AdminShell.tsx        — Admin layout wrapper
  PuzzleBuilder.tsx     — "Pick 5" clue builder with DnD slots + pool
lib/
  supabase/server.ts    — Server-side Supabase client
  getTodayPuzzle.ts     — Fetches today's approved puzzle by date
types/
  puzzle.ts             — Puzzle, GameState, TapeStats, color types
scripts/
  GENERATE-CLUES-PROMPT.md    — AI prompt for generating clue bank data
  clues-broadway-musical.sql  — SQL insert file for Broadway Musical clues
  clues-broadway-play.sql     — SQL insert file for Broadway Play clues
```

### Database Tables

#### `puzzles`
The live puzzle pipeline.
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| answer | text | The show name (display name) |
| category | text | "Broadway Musical", "Broadway Play", etc. |
| clues | text[] | Array of 5 clue strings, ordered easiest→hardest by admin |
| aliases | text[] | Alternate acceptable answers |
| status | text | `queued` → `approved` (admin pipeline) |
| date | date | When the puzzle goes live (null if queued, set when approved) |
| created_at | timestamptz | Auto-generated |

**RLS:** Anonymous users can only read `status = 'approved'` puzzles. Admin (matched by `ADMIN_EMAIL` env var) can read/write all.

#### `clue_bank`
The source material for building puzzles.
| Column | Type | Notes |
|--------|------|-------|
| id | serial | Primary key |
| show_name | text | The show/subject name |
| category | text | "Broadway Musical", "Broadway Play", etc. |
| level | int | Always `0` (flat list, no difficulty tiers) |
| clue_text | text | The clue content |
| clue_type | text | Taxonomy tag (see below) |
| specificity | text | Always `'fact'` |
| notes | text | Context about why this fact is interesting |
| used | boolean | Marked true when picked for a puzzle |

### Clue Type Taxonomy
| Type | What it covers |
|------|----------------|
| `technical` | Lighting, sound, cue counts, rigging, automation, projections, fog/haze |
| `backstage` | Crew, stage management, quick changes, pyrotechnics, flying rigs, turntable mechanics |
| `design` | Costumes, wigs, set pieces, props, scenic elements, makeup, puppetry |
| `orchestra` | Orchestra size, instruments, arrangements, musical direction, pit details |
| `cast` | Cast size, understudies, swings, actor facts, original cast, replacements |
| `numbers` | Performance count, grosses, run length, capacity, ticket records |
| `production` | Opening/closing dates, creative team, director, choreographer, theater |
| `award` | Tony wins/noms, other awards, records, historical firsts |
| `history` | Development, workshops, tryouts, rewrites, revivals, source material |
| `culture` | Cultural impact, audience moments, pop culture, merch, fandom, firsts |
| `plot` | Story elements — use sparingly |
| `song` | Facts ABOUT songs (not lyrics) — cut songs, recording stats, origins |

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (RLS enforced) |
| `ADMIN_EMAIL` | Admin user's email (gates /admin routes) |

**Service role key** (bypasses RLS, for direct DB operations) is stored in Supabase dashboard under Settings → API → Legacy API Keys. Not in `.env.local`.

---

## Admin Workflow

### Puzzle Builder (`/admin/build`)

The builder uses a "pick 5" layout:

1. **Top section:** 5 numbered slots (DnD reorderable). Admin clicks clues from the pool below to fill slots, then drags to reorder.
2. **Bottom section:** Scrollable clue pool showing all clues for the selected show, filtered by type pills (All / technical / design / backstage / etc.)
3. **Aliases input** and **Save to Queue** button in the picked section.

The admin picks 5 clues from the bank, orders them from hardest (slot 1) to easiest (slot 5), optionally edits inline, adds aliases, and saves. The puzzle goes to the queue with `status = 'queued'`.

### Admin Dashboard (`/admin`)

- **Scheduled section:** Approved puzzles with assigned dates. DnD reorderable to shuffle the schedule.
- **Queue section:** Queued puzzles waiting for approval. Admin can approve (assigns next available date) or cut.
- Shows a "LIVE" badge on today's puzzle.

---

## Clue Generation

### How Clue Banks Work

Clue data is generated using the prompt at `scripts/GENERATE-CLUES-PROMPT.md`. The prompt instructs an AI to research shows deeply and produce 25 clues per show in SQL INSERT format.

### What Makes a Great SPIKE Clue

1. **It's a specific, concrete fact.** Numbers, names, weights, counts, dimensions.
2. **It reveals the invisible layer.** The turntable rotations. The quick-change choreography. The orchestra configuration.
3. **It makes you go "I had no idea."** Even a hardcore theater fan should learn something.
4. **It stands alone as interesting.** Even without knowing the answer, the fact itself is fascinating.

### Distribution Per Subject (~25 clues)
- ~10 backstage / technical / design / orchestra (the invisible layer)
- ~5 numbers / awards (the hard stats)
- ~5 production / cast / creative team (the people)
- ~3 history / culture (the context)
- ~2 plot / song (max — only when revelatory)

### SQL Format
```sql
INSERT INTO clue_bank (show_name, category, level, clue_text, clue_type, specificity, notes) VALUES
('Show Name', 'Broadway Musical', 0, 'Clue text here', 'technical', 'fact', 'Why this is interesting');
```
- All rows: `level = 0`, `specificity = 'fact'`
- Escape single quotes with `''`
- Last row ends with `;`

### Inserting Clues

Clues are inserted into Supabase via the REST API using the service role key. The SQL files in `scripts/` are the source of truth for what's been generated. Actual insertion is done via API calls (not psql).

---

## Current State

*Last updated: March 11, 2026*

### Clue Bank
- **1,150 clues** total in database
- **Category:** Broadway Musical only (other categories not yet populated)
- **Shows (46):** 15 from Batch 1 + 16 from Batch 2 + 15 from Batch 3
- **Batch 1 (15 shows):** A Chorus Line, Beetlejuice, Chicago, Come From Away, Dear Evan Hansen, Hadestown, Hamilton, Into the Woods, Les Miserables, Rent, Six, Sweeney Todd, The Lion King, The Phantom of the Opera, Wicked
- **Batch 2 (16 shows):** & Juliet, Avenue Q, Back to the Future, Cabaret, Company, Dreamgirls, Fiddler on the Roof, Funny Girl, Guys and Dolls, MJ the Musical, Moulin Rouge!, Spring Awakening, The Book of Mormon, The Music Man, The Outsiders, West Side Story
- **Batch 3 (15 shows — pre-2000 / golden age):** 42nd Street, Annie, Beauty and the Beast, Cats, Grease, Gypsy, Hair, Hello Dolly!, Jesus Christ Superstar, Miss Saigon, My Fair Lady, Oklahoma!, South Pacific, The King and I, The Sound of Music

### Puzzles
- **3 approved** (played): Hamilton (Mar 7), Wicked (Mar 8), A Chorus Line (Mar 9)
- **12 queued (Batch 1):** Phantom, Rent, Les Mis, DEH, Hadestown, Lion King, A Chorus Line (duplicate), Sweeney Todd, Into the Woods, Chicago, Come From Away, Beetlejuice
- **9 queued (Batch 2):** Guys and Dolls, Book of Mormon, Spring Awakening, West Side Story, The Music Man, Fiddler on the Roof, Moulin Rouge!, Cabaret, Avenue Q
- **Not yet built:** Hamilton (new clues), Wicked (new clues), Six, + remaining Batch 2 shows + all 15 Batch 3 shows

### What's Next
1. Build puzzles for Batch 3 golden age shows (15 new shows ready for the builder)
2. Build remaining Batch 2 shows
3. Once musicals are solid, expand to: Broadway Plays, Broadway Theaters, Broadway Actors, Touring Cities

---

## Visual Identity (Summary)

- **Background:** `#0a0a0c` (near-black). No light mode. The game lives in darkness.
- **8 tape colors**, 5 selected per day: Pink, Purple, Blue, Green, Yellow, Orange, Cyan, Red
- **Title font:** Caesar Dressing (playful serif, uppercase)
- **Body font:** Inter (clean sans-serif)
- **Vibe:** Dark, neon, theatrical. Backstage at a Broadway show. Sharp corners. Neon text-shadow glows.
- **Admin pages:** Light mode with cream/warm tones (uses `useThemeClass()` hook)

See `SPIKE-ONE-SHEET.md` for full visual identity details including animations, color values, and copy examples.

---

## Voice & Tone

SPIKE talks like a supportive, theater-savvy friend. Encouraging but never condescending. Insider-y but never gatekeeping. Think stage manager energy: organized, calm, a little funny under pressure.

- Theater-native language: "Places" instead of "Start"
- Celebrate everything: even a loss earns consolation tape
- Short and punchy: no walls of text
- Playful, not cute: humor is knowing, not infantilizing

---

## Development Notes

### Running Locally
```bash
npm run dev    # Next.js dev server
```

### Deploying
Push to `main` branch → Netlify auto-deploys via `@netlify/plugin-nextjs`.

### Key Patterns
- **Server components** for data fetching (puzzles, clue bank)
- **Client components** for interactive UI (game, builder, dashboard)
- **Admin theme:** `useThemeClass()` hook toggles dark/light. `c(darkClass, lightClass)` helper for conditional styling.
- **DnD:** `@dnd-kit` with `SortableContext`, `verticalListSortingStrategy`, `restrictToVerticalAxis` modifier
- **Auth:** Supabase magic link OTP. Admin gated by email match against `ADMIN_EMAIL` env var.

### Git Repository
- **Remote:** https://github.com/msrcreativeprojects/spike.git
- **Branch:** `main` (single-branch workflow)

---

## HOW TO UPDATE THIS FILE

After any significant session, update:
1. **Current State** section — clue bank counts, puzzle counts, what's been built
2. **What's Next** — current priorities and direction
3. **Any new sections** if architecture, workflow, or philosophy has changed

This file should always reflect the actual state of the project, not aspirational plans.
