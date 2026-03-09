# Generate Clue Bank Data for SPIKE

You are generating clue bank data for **SPIKE**, a daily Broadway guessing game themed around spike tape and the technical side of theater. The player gets 5 clues one at a time and tries to guess the answer. The game celebrates the backstage, technical, and craft elements of theater — not just the stories on stage.

## Philosophy: Technical-First, One Fact Per Clue

Every clue should be a **single, distinct fact**. Never rephrase the same information in multiple clues. Prioritize facts that a stage manager, lighting designer, sound engineer, or crew member would know. The game is called "Spike Tape" — lean into the TECHNICAL side of theater.

**Prioritize (in order):**
1. Technical/backstage facts — lighting cue counts, sound design details, rigging, automation, pyrotechnics, fog machines, flying rigs
2. Design facts — costume counts, wig counts, set pieces, scenic elements, quick-change details, prop counts
3. Crew/orchestra facts — orchestra size, instruments used, crew size, stage management calls, cast size, swing/understudy count
4. Numbers — performance counts, Tony nominations/wins, box office records, run length, opening/closing dates
5. Cast/creative crossover — actor career connections, director/choreographer credits, creative team facts
6. Awards and records — specific awards, historical firsts, records broken
7. Development history — workshops, out-of-town tryouts, rewrites, cut songs
8. Cultural impact — audience records, pop culture references, merchandise
9. Plot/song elements — use sparingly (max 3 per subject), only when distinctive

**Include specific numbers whenever possible:** "The production uses 236 lighting cues" is better than "The show has complex lighting."

## Your Task

Generate SQL INSERT statements for the `clue_bank` table. Write each category's output to a separate `.sql` file in the `scripts/` directory.

## SQL Format

Every file must follow this exact format:

```sql
-- SPIKE Clue Bank — [Category Name]
-- [X] subjects x ~25 clues each

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

**25 clues per subject.** Each clue is a unique, distinct fact. No difficulty labels — the puzzle builder user decides the order.

Target distribution per subject:
- ~8 technical / backstage / design clues
- ~5 numbers / award clues
- ~5 cast / production / creative team clues
- ~4 history / culture clues
- ~3 plot / song clues (max)

## Clue Type Values

Use these `clue_type` values:

| Type | What it covers |
|------|----------------|
| `technical` | Lighting, sound design, cue counts, rigging, automation, projections, fog/haze |
| `backstage` | Crew, stage management, quick changes, pyrotechnics, flying rigs, turntables |
| `design` | Costumes, wigs, set design, props, scenic elements, makeup |
| `orchestra` | Orchestra size, instruments, arrangements, musical direction, pit details |
| `cast` | Cast size, understudies, swings, actor crossover facts, original cast |
| `numbers` | Performance count, grosses, run length, capacity, ticket records |
| `production` | Opening/closing dates, producers, creative team, director, choreographer |
| `award` | Tony wins/noms, other awards, records, historical firsts |
| `history` | Development, workshops, tryouts, rewrites, revivals, cut content |
| `culture` | Cultural impact, pop culture, audience records, merchandise, fandom |
| `plot` | Story elements — use sparingly |
| `song` | Song-related facts (NOT lyrics — facts about songs, cut songs, etc.) |

## Critical Rules

1. **One fact per clue.** If two clues share the same core fact, delete one.
2. **No plot summaries.** A clue like "A young woman discovers she has magical powers" is lazy. Instead: "The show's flying rig requires 12 automation cues and a dedicated fly operator."
3. **Specific > vague.** "Has elaborate costumes" is bad. "The wardrobe department maintains 342 individual costume pieces across 46 characters" is great.
4. **Factually accurate.** Double-check all numbers, dates, names, and awards.
5. **Notes column** should add context — source info, why it's interesting, or what makes it distinctive.
6. **No clue should contain the answer** as a standalone identifiable word.
7. **Dig deep for technical facts.** Research lighting plots, sound system specs, automation systems, costume breakdowns, orchestra configurations, crew calls, stage dimensions, load-in schedules — the stuff that makes theater WORK.

## Examples of GOOD Clues (technical-first)

```
-- Technical/backstage
'The production runs 236 lighting cues across two acts', 'technical', 'fact', 'One of the highest cue counts on Broadway'
'The sound design uses 86 wireless microphones simultaneously', 'technical', 'fact', 'Requires a dedicated A2 just for mic maintenance'
'The turntable stage weighs 40,000 pounds and has two concentric rotating rings', 'backstage', 'fact', 'Custom-built for the original production'
'Actors execute a full costume change in 14 seconds during the Act 1 finale', 'backstage', 'fact', 'Requires 3 dressers per actor'

-- Design
'The costume shop built 572 individual pieces for the original production', 'design', 'fact', 'Largest costume build in the designer''s career'
'The lead actress wears 7 different wigs throughout the show', 'design', 'fact', 'Each takes 45 minutes to style'

-- Orchestra/crew
'The pit orchestra includes a hammered dulcimer and an erhu', 'orchestra', 'fact', 'Unusual instruments for a Broadway pit'
'The running crew numbers 52, one of the largest on Broadway', 'backstage', 'fact', 'Includes 8 fly operators'

-- Numbers
'Ran for 9,281 performances before closing', 'numbers', 'fact', 'The longest-running show in Broadway history at that time'
'The original production grossed over $1.7 billion on Broadway', 'numbers', 'fact', 'Highest-grossing production in Broadway history'
```

## Examples of BAD Clues (avoid these)

```
-- TOO VAGUE / PLOT-HEAVY
'A story about love and loss' -- applies to hundreds of shows
'The main character goes on a journey of self-discovery' -- meaningless
'Features elaborate dance numbers' -- says nothing specific

-- REPHRASED SAME FACT
'Won the Tony for Best Musical' + 'Took home Broadway''s top prize' + 'Named Best Musical at the Tonys' -- these are all the same fact

-- NO NUMBERS
'Has a large orchestra' -- HOW large? Give the number
'Uses many costumes' -- HOW many? Be specific
```

---

## CATEGORY 1: Broadway Musical

**Category value:** `'Broadway Musical'`

Generate clues for these 15 musicals:

1. **Hamilton**
2. **Wicked**
3. **The Phantom of the Opera**
4. **Les Misérables**
5. **Rent**
6. **Dear Evan Hansen**
7. **Hadestown**
8. **The Lion King**
9. **Come From Away**
10. **Six**
11. **Beetlejuice**
12. **Chicago**
13. **A Chorus Line**
14. **Sweeney Todd**
15. **Into the Woods**

**Output file:** `scripts/clues-broadway-musical.sql`

### Category-Specific Notes
- Musicals have the richest technical data — dig into lighting plots, sound rigs, automation, costumes, orchestra configs
- For long-running shows, include specific performance milestones
- For shows with unique staging (turntables, flying, puppetry), detail the technical specs

---

## CATEGORY 2: Broadway Play

**Category value:** `'Broadway Play'`

Generate clues for these 15 plays:

1. **Death of a Salesman** — Arthur Miller
2. **A Streetcar Named Desire** — Tennessee Williams
3. **A Raisin in the Sun** — Lorraine Hansberry
4. **The Crucible** — Arthur Miller
5. **The Glass Menagerie** — Tennessee Williams
6. **Long Day's Journey Into Night** — Eugene O'Neill
7. **Who's Afraid of Virginia Woolf?** — Edward Albee
8. **Angels in America** — Tony Kushner
9. **August: Osage County** — Tracy Letts
10. **Fences** — August Wilson
11. **The Curious Incident of the Dog in the Night-Time** — Simon Stephens
12. **Doubt** — John Patrick Shanley
13. **The Inheritance** — Matthew Lopez
14. **Slave Play** — Jeremy O. Harris
15. **To Kill a Mockingbird** — Aaron Sorkin adaptation

**Output file:** `scripts/clues-broadway-play.sql`

### Category-Specific Notes
- Plays have fewer technical elements than musicals but still have lighting, sound, and set design
- Focus on set design complexity, lighting design choices, sound design (especially for naturalistic plays)
- Include playwright facts, production history, notable stagings
- Use `clue_type` values: `playwright` for author-related clues, `quote` for famous lines

---

## CATEGORY 3: Broadway Actor

**Category value:** `'Broadway Actor'`

The `show_name` field contains the actor's name. Generate clues for these 15 actors:

1. **Lin-Manuel Miranda**
2. **Hugh Jackman**
3. **Nathan Lane**
4. **Idina Menzel**
5. **Audra McDonald**
6. **Patti LuPone**
7. **Ben Platt**
8. **Jonathan Groff**
9. **Daveed Diggs**
10. **Brian Stokes Mitchell**
11. **Raul Esparza**
12. **Norbert Leo Butz**
13. **Alex Brightman**
14. **Aaron Tveit**
15. **Jeremy Jordan**

**Output file:** `scripts/clues-broadway-actor.sql`

### Category-Specific Notes
- Focus on specific roles, show connections, and career crossovers
- Include technical facts where possible: "Performed the role's 8 quick changes nightly" or "Sang the show's highest note, a B5"
- Use `clue_type` values: `career`, `role`, `award`, `personal`, `crossover` (film/TV), `collaboration`

---

## CATEGORY 4: Broadway Theater

**Category value:** `'Broadway Theater'`

The `show_name` field contains the theater name. Generate clues for these 15 theaters:

1. **Majestic Theatre**
2. **Gershwin Theatre**
3. **Richard Rodgers Theatre**
4. **St. James Theatre**
5. **Palace Theatre**
6. **Shubert Theatre**
7. **Lyceum Theatre**
8. **New Amsterdam Theatre**
9. **Al Hirschfeld Theatre**
10. **Booth Theatre**
11. **Eugene O'Neill Theatre**
12. **Winter Garden Theatre**
13. **Broadhurst Theatre**
14. **Imperial Theatre**
15. **August Wilson Theatre**

**Output file:** `scripts/clues-broadway-theater.sql`

### Category-Specific Notes
- Theaters are FULL of technical facts — stage dimensions, fly systems, trap rooms, orchestra pit configs, rigging systems, load-in door sizes
- Include architectural details: seating capacity, year built, renovations, landmark status
- Detail technical specs: grid height, stage depth/width, wing space, loading dock access
- Use `clue_type` values: `location`, `architecture`, `history`, `naming`, `current_show`, `renovation`, `capacity`, `technical`

---

## CATEGORY 5: Touring City

**Category value:** `'Touring City'`

The `show_name` field contains the city name. Generate clues for these 15 cities:

1. **Chicago**
2. **Los Angeles**
3. **Boston**
4. **San Francisco**
5. **Washington, D.C.**
6. **Philadelphia**
7. **Denver**
8. **Seattle**
9. **Houston**
10. **Atlanta**
11. **Minneapolis**
12. **Dallas**
13. **Cleveland**
14. **Detroit**
15. **Miami**

**Output file:** `scripts/clues-touring-city.sql`

### Category-Specific Notes
- Include venue technical specs: stage dimensions, fly loft height, seating capacity
- Theater history: when the primary touring venue was built, renovations, historic performances
- Touring circuit details: which tours typically stop here, length of typical runs
- Use `clue_type` values: `geography`, `venue`, `history`, `culture`, `theater_scene`, `landmark`, `technical`

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
   - At least 8 clues per subject are tagged `technical`, `backstage`, or `design`
   - No clue text contains the answer as a standalone identifiable word
3. Write the file to the specified path
4. Move to the next category

Start with **Broadway Musical**, then **Broadway Play**, then **Broadway Actor**, then **Broadway Theater**, then **Touring City**.
