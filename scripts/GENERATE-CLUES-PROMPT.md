# Generate Clue Bank Data for SPIKE

You are generating clue bank data for **SPIKE**, a daily Broadway guessing game. The player gets 5 clues one at a time and tries to guess the answer. Win or lose, they walk away having learned something they didn't know before.

## Philosophy: Let Me Show You How This Actually Works

SPIKE is named after the spike mark — a piece of tape on a dark stage floor that the audience never sees but that makes the show work. The game lives on the production side of the proscenium. It knows what the crew knows. It knows what the dresser knows. It knows what the pit musician knows.

**Every clue should feel like someone who works the show leaning over and telling you something you'd never know from Row J.** The best clues are *revelatory* — they make you see a show you thought you knew in a completely different way. They pull back the curtain.

A clue like "A musical about a founding father" describes what the audience already sees. A clue like "The drummer is isolated in a room behind the pit and syncs with the conductor via live video feed" shows you how the show actually works. That's the difference.

### What makes a great SPIKE clue:

1. **It's a specific, concrete fact.** Numbers, names, weights, counts, dimensions. "281 candles per performance" is unforgettable. "Has elaborate staging" is nothing.

2. **It reveals the invisible layer.** The turntable rotations. The quick-change choreography. The orchestra configuration. The prop that breaks every night and gets replaced. The backstage name for a set piece. The vocal technique that protects an actor's voice.

3. **It makes you go "I had no idea."** Even a hardcore theater fan should learn something. The clue bank is an offering — it brings people inside the work.

4. **It stands alone as interesting.** Even without knowing the answer, the fact itself is fascinating. Someone should be able to read just the clue and think "that's cool."

### What to avoid:

- **Plot summaries.** "A young woman discovers she has powers" — the audience already knows this.
- **Generic awards.** "Won the Tony for Best Musical" applies to dozens of shows and teaches nothing.
- **Vague descriptions.** "Features elaborate costumes" — HOW elaborate? How many? What material? Who built them?
- **Rephrased duplicates.** One fact, one clue. Never say the same thing two ways.

### The priority stack:

Generate clues in roughly this order of preference:

1. **Revelatory backstage/technical facts** — the invisible machinery. Lighting cue counts, automation specs, rigging systems, flying rigs, sound design details, turntable mechanics, fog/haze/pyro, trap doors, projection systems.
2. **Specific numbers that stick** — performance counts, grosses, costume counts, orchestra size, instrument counts, crew size, audience records. Hard stats are memorable and make great game clues.
3. **Design and craft details** — costume construction, wig counts, set piece specs, prop management, quick-change logistics, makeup/prosthetics, puppet construction, scenic painting techniques.
4. **Orchestra and music facts** — pit size, unusual instruments, conductor details, orchestration credits, arrangements, on-stage musicians.
5. **Production history with texture** — workshops, out-of-town tryouts, development stories, opening/closing details, theater-specific facts, producer stories.
6. **Cast and creative team** — but make it specific. Not "starred in the show" but "originated the role at age 23" or "was the first Black director on Broadway."
7. **Awards and records** — when they're specific and surprising. "Won 7 Tonys" is fine. "The Pulitzer board overruled its own jury" is better.
8. **Cultural moments** — $20 rush tickets, famous audience incidents, historic performances, record-breaking events.
9. **Plot/song references** — use sparingly (max 2-3 per subject). Only when truly iconic or when the fact ABOUT the song/plot is interesting ("The opening number was cut and rewritten 3 times during tryouts" > "The show opens with a big ensemble number").

## SQL Format

Every file must follow this exact format:

```sql
-- SPIKE Clue Bank — [Category Name] (Batch [N])
-- [X] subjects x 25 clues each = [total] clues

INSERT INTO clue_bank (show_name, category, level, clue_text, clue_type, specificity, notes) VALUES

-- ============================================================
-- [SUBJECT NAME]
-- ============================================================
('[Subject Name]', '[Category]', 0, '[clue text]', '[clue_type]', 'fact', '[notes]'),
...
```

- Escape single quotes with double single quotes: `''` (e.g., `it''s`)
- The LAST row of the entire file should end with `;` not `,`
- Each subject is separated by a comment header block
- ALL rows use `level = 0` and `specificity = 'fact'`

## Clue Count Per Subject

**25 clues per subject.** Each clue is a unique, distinct fact. No difficulty labels — the puzzle builder decides the order.

Rough distribution per subject (flex as needed based on what's interesting):
- ~10 backstage / technical / design / orchestra (the invisible layer)
- ~5 numbers / awards (the hard stats)
- ~5 production / cast / creative team (the people)
- ~3 history / culture (the context)
- ~2 plot / song (max — only when revelatory)

## Clue Type Values

Use these `clue_type` values:

| Type | What it covers |
|------|----------------|
| `technical` | Lighting, sound design, cue counts, rigging, automation, projections, fog/haze |
| `backstage` | Crew, stage management, quick changes, pyrotechnics, flying rigs, turntable mechanics |
| `design` | Costumes, wigs, set pieces, props, scenic elements, makeup, puppetry |
| `orchestra` | Orchestra size, instruments, arrangements, musical direction, pit details |
| `cast` | Cast size, understudies, swings, actor facts, original cast, replacements |
| `numbers` | Performance count, grosses, run length, capacity, ticket records, milestones |
| `production` | Opening/closing dates, creative team, director, choreographer, theater |
| `award` | Tony wins/noms, other awards, records, historical firsts |
| `history` | Development, workshops, tryouts, rewrites, revivals, source material |
| `culture` | Cultural impact, audience moments, pop culture, merchandise, fandom, firsts |
| `plot` | Story elements — use sparingly, only when the fact itself is interesting |
| `song` | Facts ABOUT songs (not lyrics) — cut songs, recording stats, song origins |

## Critical Rules

1. **One fact per clue.** If two clues share the same core fact, delete one.
2. **Specific > vague.** Always. Give the number, the name, the dimension, the count.
3. **Factually accurate.** Double-check all numbers, dates, names, and awards.
4. **Notes column** should add context — why this fact is interesting, what it reveals, or what makes it surprising.
5. **No clue should contain the answer** as a standalone identifiable word.
6. **Dig deep.** Research lighting plots, sound system specs, automation systems, costume breakdowns, orchestra configurations, crew calls, stage dimensions, load-in schedules, vocal techniques, prop management — the stuff that makes theater WORK.

## Examples of GREAT Clues

These are real clues that a puzzle builder loved picking. Notice what they have in common — they're specific, surprising, and they show you the invisible side:

```
-- Revelatory backstage facts
'Two hundred and eighty-one candles are used per performance', 'backstage', 'fact', 'Each must be lit and extinguished by crew during the show'
'The stage splits apart and moves back approximately 7 feet to expose a third turntable', 'technical', 'fact', 'Creates the descent to the underworld'
'Actors playing the title character use ventricular fold phonation to sustain the gravelly voice without vocal cord damage', 'technical', 'fact', 'A specific vocal technique that protects the performer eight shows a week'
'Every piece of scenery contains a light, special effect, trap door, smoke machine, projection surface, speaker, or automation element', 'design', 'fact', 'Nothing on stage is purely decorative'
'A set piece named Ruthie II weighs 1 ton and features 6,000 beads and 20 globe lights', 'design', 'fact', 'Named after the character, maintained by a dedicated crew member'

-- Specific numbers that stick
'The 23-member orchestra plays 132 different instruments during each performance', 'orchestra', 'fact', 'One of the most diverse pit orchestras on Broadway'
'The iconic revolving stage makes 63 rotations per performance', 'technical', 'fact', 'Precisely choreographed with the blocking'
'Over 350 costumes are maintained, some decorated with thousands of individually hand-sewn beads', 'design', 'fact', 'Full-time costume maintenance crew works between shows'
'The production uses 68 costumes for 15 performers', 'design', 'fact', 'Multiple quick changes require backstage dressing teams'

-- Numbers and records that wow
'Grossed over $1.3 billion lifetime on Broadway with audiences exceeding 20 million', 'numbers', 'fact', 'Among the highest-grossing productions in Broadway history'
'Closed April 16, 2023, after 13,981 performances, the most in Broadway history', 'numbers', 'fact', 'A record that stood for decades'

-- Production facts with texture
'The band conductor played keyboards on stage for the entire original run', 'orchestra', 'fact', 'Visible to the audience, not hidden in a pit'
'The first Broadway show to use a computerized electronic lighting board', 'technical', 'fact', 'A technological milestone in theater history'
'The front rows were sold as $20 rush tickets for every performance', 'culture', 'fact', 'Became a defining part of the show''s identity and community'
```

## Examples of BAD Clues

```
-- PLOT SUMMARIES (the audience already knows this)
'A story about love and loss'
'The main character goes on a journey of self-discovery'
'A young woman discovers she has magical powers'

-- GENERIC AWARDS (teaches nothing)
'Won the Tony for Best Musical'
'Received critical acclaim'
'A beloved classic of the American theater'

-- VAGUE (no numbers, no specifics)
'Has a large orchestra'
'Uses many costumes'
'Features elaborate staging'
'Has complex lighting'

-- REPHRASED SAME FACT
'Won the Tony for Best Musical' + 'Took home Broadway''s top prize' -- same fact twice
```

---

## Category-Specific Notes

### Broadway Musical (`'Broadway Musical'`)
- Richest category for backstage/technical data — dig into every production department
- For long-running shows, include specific performance milestones and records
- For shows with unique staging (turntables, flying, puppetry), detail the mechanics
- Output file: `scripts/clues-broadway-musical.sql`

### Broadway Play (`'Broadway Play'`)
- Plays have fewer technical elements but still have lighting, sound, and set design
- Focus on set design innovation, lighting choices, sound design for naturalistic plays
- Revival productions often have the most interesting technical details (video, modern staging)
- Additional `clue_type` values: `playwright` for author facts, `quote` for famous lines
- Output file: `scripts/clues-broadway-play.sql`

### Broadway Actor (`'Broadway Actor'`)
- The `show_name` field contains the actor's name
- Focus on specific roles, career connections, and the CRAFT of performing
- Technical performance facts are gold: vocal range, quick changes, physical demands, injury stories
- Additional `clue_type` values: `career`, `role`, `personal`, `crossover` (film/TV), `collaboration`
- Output file: `scripts/clues-broadway-actor.sql`

### Broadway Theater (`'Broadway Theater'`)
- Theaters are FULL of invisible infrastructure — stage dimensions, fly systems, trap rooms, pit configs, rigging, load-in logistics
- Include architectural details: capacity, year built, renovations, landmark status
- Every theater has stories: famous productions, hauntings, renovations, name changes
- Additional `clue_type` values: `location`, `architecture`, `naming`, `renovation`, `capacity`
- Output file: `scripts/clues-broadway-theater.sql`

### Touring City (`'Touring City'`)
- The `show_name` field contains the city name
- Include venue technical specs: stage dimensions, fly loft height, capacity
- Theater district history: when venues were built, renovations, historic performances
- Touring circuit context: which tours stop here, typical run lengths, market size
- Additional `clue_type` values: `geography`, `venue`, `theater_scene`, `landmark`
- Output file: `scripts/clues-touring-city.sql`

---

## Execution Instructions

1. Generate ONE category at a time, writing the complete SQL file
2. After each file, verify:
   - Every row has all 7 columns
   - Single quotes are properly escaped with `''`
   - The last row ends with `;`
   - Each subject has exactly 25 clues
   - All rows use `level = 0` and `specificity = 'fact'`
   - No two clues share the same core fact
   - At least 10 clues per subject are tagged `technical`, `backstage`, `design`, or `orchestra`
   - No clue text contains the answer as a standalone identifiable word
   - Every clue would make someone say "I had no idea" or "that's cool"
3. Write the file to the specified path
4. Move to the next category
