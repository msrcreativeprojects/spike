# Generate Clue Bank Data for SPIKE

You are generating clue bank data for **SPIKE**, a daily Broadway guessing game. The player gets 5 clues one at a time and tries to guess the answer. Win or lose, they walk away having learned something they didn't know before.

## Philosophy: Let Me Show You How This Actually Works

SPIKE is named after the spike mark — a piece of tape on a dark stage floor that the audience never sees but that makes the show work. The game lives on the production side of the proscenium. It knows what the crew knows. It knows what the dresser knows. It knows what the pit musician knows.

**Every clue should feel like someone who works the show leaning over and telling you something you'd never know from Row J.** The best clues are *revelatory* — they make you see a show you thought you knew in a completely different way. They pull back the curtain.

A clue like "A musical about a founding father" describes what the audience already sees. A clue like "The drummer is isolated in a room behind the pit and syncs with the conductor via live video feed" shows you how the show actually works. That's the difference.

### What makes a great SPIKE clue:

1. **It's a specific, concrete fact.** Numbers, weights, counts, dimensions, amounts. "281 candles per performance" is unforgettable. "Has elaborate staging" is nothing.

2. **It reveals the invisible layer.** The turntable rotations. The quick-change choreography. The orchestra configuration. The prop that breaks every night and gets replaced. The vocal technique that protects an actor's voice.

3. **It makes you go "I had no idea."** Even a hardcore theater fan should learn something. The clue bank is an offering — it brings people inside the work.

4. **It stands alone as interesting.** Even without knowing the answer, the fact itself is fascinating. Someone should be able to read just the clue and think "that's cool."

5. **Quantities over jargon.** "Twenty-five tons of scenery" lands harder than "Uses a Wahlberg triple-purchase counterweight fly system." The *amount* is what's interesting and accessible, not the equipment name. A player doesn't need to know how it works — they need to be impressed by the scale.

### What to avoid:

- **Character names.** They identify the show instantly. A clue mentioning "Elphaba" or "Jean Valjean" is a dead giveaway — it's not a clue, it's the answer. Never include character names.
- **Song titles.** Same problem. "Defying Gravity" or "One Day More" immediately names the show. Facts *about* songs are fine ("The opening number was rewritten 3 times during tryouts"), but never include the song title itself.
- **Plot summaries.** "A young woman discovers she has powers" — the audience already knows this. Plot descriptions aren't interesting because they don't teach anything new. They describe what someone sees from the audience, which is the opposite of what SPIKE does.
- **Generic awards.** "Won the Tony for Best Musical" applies to dozens of shows and teaches nothing. Be specific: the vote margin, the record it broke, the controversy.
- **Vague descriptions.** "Features elaborate costumes" — HOW elaborate? How many? What material? Who built them? Always give the number.
- **Technical equipment names without context.** "Uses ETC Source Four PARs" means nothing to most players. "Uses over 400 individual lighting fixtures" is fascinating. Lead with the quantity, not the model number.
- **Rephrased duplicates.** One fact, one clue. Never say the same thing two ways.
- **Generic touring mentions.** "The show toured nationally" is empty. "The touring production required 16 semi-trucks to transport" is a great clue.

### The priority stack:

Generate clues in roughly this order of preference:

1. **Revelatory backstage/technical facts** — the invisible machinery. Lighting cue counts, automation specs, rigging systems, flying rigs, sound design details, turntable mechanics, fog/haze/pyro, trap doors, projection systems. Lead with quantities and scale, not equipment names.
2. **Specific numbers that stick** — performance counts, grosses, costume counts, orchestra size, crew size, audience records, weight of scenery, gallons of fog fluid, yards of fabric. Hard stats are memorable and make great game clues.
3. **Design and craft details** — costume construction (how many, how long to build, what materials), wig counts, set piece specs, prop management, quick-change logistics, makeup/prosthetics, puppet construction, scenic painting techniques.
4. **Orchestra and music facts** — pit size, unusual instruments, conductor details, orchestration credits, arrangements, on-stage musicians, recording session facts.
5. **Lore** — insider knowledge about the cast, creative team, and production history. Not resume facts ("directed by so-and-so") but the stories behind the people. "The director insisted on casting an unknown" or "the lead was pulled from the ensemble two weeks before opening." The word is *lore* — the stuff that gets passed around backstage.
6. **Source material and adaptation** — what the show is based on, how it was adapted, what changed from source to stage, who wrote the source material, how the rights were secured. These connections are always interesting and help players piece together answers.
7. **Touring history** — when the show toured, how many cities, touring-specific adaptations (scaled-down sets, modified staging), truck counts, crew size on the road, records set on tour. Touring facts are inherently interesting because they show how a show lives beyond Broadway.
8. **Awards and records** — when they're specific and surprising. "Won 7 Tonys" is fine. "The Pulitzer board overruled its own jury" is better. "Set the record for most Tony nominations without a win" is great.
9. **Cultural moments** — rush ticket policies, famous audience incidents, historic performances, record-breaking events, merchandise facts, cast recording milestones.
10. **Plot/song references** — use very sparingly (max 1-2 per subject). Only when the fact ABOUT the plot or song is genuinely interesting ("The second act was completely restructured during Boston tryouts"). Never name characters or songs.

## How Clues Get Used in Puzzles

The puzzle builder picks 5 clues from your bank of 25 and orders them from hardest to easiest. Understanding this arc helps you generate useful clues across the full difficulty spectrum:

- **Slot 1 (hardest — cold open):** Genuinely obscure. A backstage fact, a technical spec, a production number that could apply to many shows. The player has NO idea what the answer is. This is the "wow, I didn't know that about anything" clue.
- **Slot 2 (still in the dark):** Another distinct, intriguing fact. Still doesn't narrow it down much. The player is learning cool things but can't guess yet.
- **Slot 3 (the first thread):** Something starts to narrow the field. Maybe a source material connection, an era hint, a creative team member, a specific theater. A knowledgeable player might start to have a hunch.
- **Slot 4 (confirmation):** A specific detail that, combined with earlier clues, points clearly. The answer is narrowing to one or two possibilities.
- **Slot 5 (unmistakable):** An iconic detail that most theater fans would immediately recognize. This is the "if you don't get it now, you probably don't know the show" clue.

**Your job is to generate clues across this entire spectrum.** Don't just write 25 obscure technical facts — we also need source material connections, production lore, iconic details, and widely-known facts. The builder needs options at every difficulty level.

A good 25-clue bank for one show should have:
- 8-10 clues that could work as Slot 1-2 (obscure, technical, quantitative)
- 5-7 clues that could work as Slot 3 (narrows the field but doesn't give it away)
- 5-7 clues that could work as Slot 4-5 (more identifiable — era, creative team lore, widely-known facts)
- 2-3 wildcard clues that are just really interesting regardless of difficulty

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
- ~5 numbers / awards / records (the hard stats)
- ~4 lore / cast / creative team (the people and their stories)
- ~3 history / source material / touring (the context)
- ~2 culture (max — only when genuinely interesting)
- ~1 plot or song fact (max — only when the fact itself is revelatory, never name characters or songs)

## Clue Type Values

Use these `clue_type` values:

| Type | What it covers |
|------|----------------|
| `technical` | Lighting, sound design, cue counts, rigging, automation, projections, fog/haze |
| `backstage` | Crew, stage management, quick changes, pyrotechnics, flying rigs, turntable mechanics |
| `design` | Costumes, wigs, set pieces, props, scenic elements, makeup, puppetry |
| `orchestra` | Orchestra size, instruments, arrangements, musical direction, pit details |
| `cast` | Cast size, understudies, swings, actor lore, original cast, replacements |
| `numbers` | Performance count, grosses, run length, capacity, ticket records, milestones |
| `production` | Opening/closing dates, creative team, director, choreographer, theater |
| `award` | Tony wins/noms, other awards, records, historical firsts |
| `history` | Development, workshops, tryouts, rewrites, revivals, source material, adaptation |
| `culture` | Cultural impact, audience moments, pop culture, merchandise, fandom, firsts |
| `plot` | Story elements — use very sparingly, never include character names |
| `song` | Facts ABOUT songs (not lyrics, not titles) — cut songs, recording stats, song origins |

## Critical Rules

1. **One fact per clue.** If two clues share the same core fact, delete one.
2. **Specific > vague.** Always. Give the number, the dimension, the count, the amount.
3. **Quantities over jargon.** Lead with how many, how heavy, how long — not equipment model numbers or technical terminology.
4. **No character names.** Ever. They're dead giveaways.
5. **No song titles.** Ever. Facts about songs are fine, but don't name them.
6. **No plot descriptions.** They don't teach anything the audience doesn't already know.
7. **Factually accurate.** Double-check all numbers, dates, names, and awards.
8. **Notes column** should add context — why this fact is interesting, what it reveals, or what makes it surprising.
9. **No clue should contain the answer** as a standalone identifiable word.
10. **Dig deep.** Research lighting plots, sound system specs, automation systems, costume breakdowns, orchestra configurations, crew calls, stage dimensions, load-in schedules, vocal techniques, prop management, touring logistics — the stuff that makes theater WORK.
11. **Source material matters.** Always include what the show is based on and how it was adapted. These are consistently interesting clues.
12. **Touring facts matter.** How many trucks, how many cities, how long on the road, what was modified for tour. Players find this fascinating.

## Examples of GREAT Clues

These are real clues that the puzzle builder loved picking. Notice what they have in common — they're specific, surprising, and they show you the invisible side:

```
-- Revelatory backstage facts (Slot 1-2 material — obscure, fascinating)
'Two hundred and eighty-one candles are used per performance', 'backstage', 'fact', 'Each must be lit and extinguished by crew during the show'
'The stage splits apart and moves back approximately 7 feet to expose a third turntable', 'technical', 'fact', 'Creates the descent to the underworld'
'Actors playing the title character use ventricular fold phonation to sustain the gravelly voice without vocal cord damage', 'technical', 'fact', 'A specific vocal technique that protects the performer eight shows a week'
'Every piece of scenery contains a light, special effect, trap door, smoke machine, projection surface, speaker, or automation element', 'design', 'fact', 'Nothing on stage is purely decorative'

-- Specific quantities that stick (Slot 1-3 material — the numbers are the hook)
'The 23-member orchestra plays 132 different instruments during each performance', 'orchestra', 'fact', 'One of the most diverse pit orchestras on Broadway'
'The iconic revolving stage makes 63 rotations per performance', 'technical', 'fact', 'Precisely choreographed with the blocking'
'Over 350 costumes are maintained, some decorated with thousands of individually hand-sewn beads', 'design', 'fact', 'Full-time costume maintenance crew works between shows'
'The production uses 68 costumes for 15 performers', 'design', 'fact', 'Multiple quick changes require backstage dressing teams'
'The touring production required 16 semi-trucks to transport the full set', 'backstage', 'fact', 'One of the largest touring loads in Broadway history'

-- Records and milestones (Slot 3-4 material — starts to narrow it)
'Grossed over $1.3 billion lifetime on Broadway with audiences exceeding 20 million', 'numbers', 'fact', 'Among the highest-grossing productions in Broadway history'
'Closed April 16, 2023, after 13,981 performances, the most in Broadway history', 'numbers', 'fact', 'A record that stood for decades'

-- Lore and production texture (Slot 3-5 material — identifiable but interesting)
'The band conductor played keyboards on stage for the entire original run', 'orchestra', 'fact', 'Visible to the audience, not hidden in a pit'
'The first Broadway show to use a computerized electronic lighting board', 'technical', 'fact', 'A technological milestone in theater history'
'The front rows were sold as $20 rush tickets for every performance', 'culture', 'fact', 'Became a defining part of the show''s identity and community'
'Based on a memoir that was originally self-published by the author', 'history', 'fact', 'The source material came from outside traditional publishing'
```

## Examples of BAD Clues

```
-- CHARACTER NAMES (instant giveaway — NEVER do this)
'Elphaba defies gravity in the first act finale'
'Jean Valjean is pursued by an inspector'
'The Phantom lurks beneath the opera house'

-- SONG TITLES (also a giveaway — NEVER do this)
'The show features the song "Defying Gravity"'
'Opens with "Tradition"'
'"Memory" is performed by the aging glamour cat'

-- PLOT SUMMARIES (the audience already knows this — boring)
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

-- TECHNICAL JARGON (inaccessible)
'Uses ETC Source Four PARs and Vari-Lite VL3500 Wash fixtures'
'The sound design utilizes a Meyer Sound Leopard line array system'
'Fly system uses a Wahlberg triple-purchase counterweight'

-- GENERIC TOURING (empty)
'The show toured nationally'
'Has been performed across the country'
'A popular touring production'

-- REPHRASED SAME FACT
'Won the Tony for Best Musical' + 'Took home Broadway''s top prize' -- same fact twice
```

---

## Category-Specific Notes

### Broadway Musical (`'Broadway Musical'`)
- Richest category for backstage/technical data — dig into every production department
- For long-running shows, include specific performance milestones and records
- For shows with unique staging (turntables, flying, puppetry), detail the mechanics
- Always include what the show is based on (novel, film, true story, original concept)
- Include touring facts when available (truck counts, cities, adaptations)
- For golden age / pre-2000 shows: original production technical details may be harder to find — lean into cast lore, development history, cultural impact, revivals, and the records they set
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
   - At least 8 clues per subject are tagged `technical`, `backstage`, `design`, or `orchestra`
   - **No character names appear in any clue text**
   - **No song titles appear in any clue text**
   - No clue text contains the answer as a standalone identifiable word
   - Every clue would make someone say "I had no idea" or "that's cool"
   - At least 2-3 clues per subject reference source material, adaptation, or touring history
3. Write the file to the specified path
4. Move to the next category
