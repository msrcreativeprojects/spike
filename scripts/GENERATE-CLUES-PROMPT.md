# Generate Clue Bank Data for SPIKE

You are generating clue bank data for SPIKE, a daily Broadway guessing game. The player gets clues one at a time and tries to guess the answer. Clues progress from very broad (level 1) to giveaway (level 5), plus fun facts (level 0).

## Your Task

Generate SQL INSERT statements for the `clue_bank` table for the categories listed below. Write each category's output to a separate `.sql` file in the `scripts/` directory.

## SQL Format

Every file must follow this exact format:

```sql
-- SPIKE Clue Bank — [Category Name]
-- [X] subjects x ~32 clues each

INSERT INTO clue_bank (show_name, category, level, clue_text, clue_type, specificity, notes) VALUES

-- ============================================================
-- [SUBJECT NAME]
-- ============================================================
('[Subject Name]', '[Category]', 1, '[clue text]', '[clue_type]', '[specificity]', '[notes]'),
...
```

- Escape single quotes with double single quotes: `''`  (e.g., `it''s`)
- The LAST row of the entire file should end with `;` not `,`
- Each subject is separated by a comment header block

## Level Structure (per subject)

| Level | Count | Name | Specificity Value | Description |
|-------|-------|------|-------------------|-------------|
| 1 | 6 | Very Broad | `very_broad` | Could apply to dozens of answers in this category. Player has almost no chance of guessing. |
| 2 | 6 | Obscure Detail | `broad` | An unusual or lesser-known fact. Narrows the field but still ambiguous. |
| 3 | 6 | Narrowing | `narrowing` | Theme, era, setting, or detail that narrows to a handful of possibilities. |
| 4 | 6 | Recognition | `recognition` | Most knowledgeable fans would recognize this. Narrows to 1-2 possibilities. |
| 5 | 4 | Giveaway | `giveaway` | Unmistakable. Character names, famous quotes, or iconic identifiers. |
| 0 | 3-5 | Fun Facts | `fact` | Interesting trivia shown after the game. Not used as gameplay clues. |

**Total per subject: ~31-33 clues**

## Clue Type Values

Use these `clue_type` values as appropriate:
- `source` — where the material originated (book, film, real events)
- `setting` — place or location
- `era` — time period
- `character` — character description or trait
- `plot` — story/plot element
- `theme` — thematic element
- `structure` — format, style, staging
- `production` — production history, awards, cast
- `development` — how it was created/developed
- `song` — song title or lyric reference
- `iconic_element` — famous quotes, images, moments
- `tone` — mood, genre, style
- `interesting_fact` — (level 0 only) fun trivia

## Critical Rules for Clue Quality

1. **Level 1 clues MUST be genuinely broad.** They should apply to many possible answers. "Won a Tony Award" is good. "Debuted in 1949" is too specific for level 1.
2. **Level 5 clues MUST be unmistakable giveaways.** Use real names, famous quotes, or unique identifiers.
3. **Clues must be factually accurate.** Double-check dates, names, awards, and quotes.
4. **Notes column should explain WHY the clue is at that difficulty level.** E.g., "Also true of Phantom, Les Mis, etc." for broad clues.
5. **Avoid duplicating information across levels.** Each clue should reveal something new.
6. **No clue should reference the answer directly.** Level 5 can get very close but should not literally contain the answer text as a standalone word.

---

## CATEGORY 1: Broadway Play

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

### Adaptation Notes for Plays
- For plays, `clue_type` values like `song` and `iconic_element` should be adapted:
  - Use `quote` instead of `song` for famous lines
  - `iconic_element` for famous staging moments or cultural impact
  - `playwright` as an additional clue_type for author-related clues

---

## CATEGORY 2: Broadway Actor

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

### Adaptation Notes for Actors
- Level 1: Very broad traits ("Has appeared in both film and stage", "Won a Tony Award", "Known for musical theater and screen work")
- Level 2: Career details that could be several people ("Originated a role in a Sondheim musical", "Has a Disney voice credit")
- Level 3: Narrowing career details ("Known for both hip-hop and musical theater", "Transitioned from Broadway to a Marvel franchise")
- Level 4: Specific roles or shows without naming the person ("Played the original Elder Cunningham", "The first actor to play both Burr and Hamilton")
- Level 5: Unmistakable identifiers ("Created and starred in Hamilton and In the Heights", "Lin-Manuel Miranda")
- Level 0: Fun facts about their career
- Use `clue_type` values: `career`, `role`, `award`, `personal`, `crossover` (film/TV), `collaboration`, `interesting_fact`

---

## CATEGORY 3: Broadway Theater

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

### Adaptation Notes for Theaters
- Level 1: Broad location/age details ("Located in the Theater District", "Built in the early 20th century", "Has hosted both plays and musicals")
- Level 2: Architectural or historical details that could be several theaters ("Originally built as a movie palace", "Named after a famous American")
- Level 3: Narrowing details ("Home to Broadway's longest-running show for decades", "Underwent a major renovation involving hydraulic lifts")
- Level 4: Strong identifiers ("Currently home to Wicked", "Where Hamilton opened")
- Level 5: Giveaways ("The theater where Phantom of the Opera ran for 35 years — the Majestic")
- Level 0: Fun architectural or historical facts
- Use `clue_type` values: `location`, `architecture`, `history`, `naming`, `current_show`, `renovation`, `capacity`, `interesting_fact`

---

## CATEGORY 4: Touring City

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

### Adaptation Notes for Touring Cities
- Clues should relate to the city's relationship with Broadway/theater touring AND general city knowledge
- Level 1: Very broad ("This city is in the United States", "Has a major performing arts center", "Located east of the Mississippi")
- Level 2: Could be several cities ("Home to a Tony-winning regional theater", "Has hosted Broadway tours since the 1920s")
- Level 3: Narrowing ("Known for deep-dish pizza and improv comedy", "The Kennedy Center hosts tours here")
- Level 4: Recognition ("The Pantages Theatre hosts tours in this city", "Playhouse Square is the second-largest performing arts center in the US")
- Level 5: Giveaway ("Home to the Windy City's CIBC Theatre — Chicago")
- Level 0: Fun facts about the city's theater scene
- Use `clue_type` values: `geography`, `venue`, `history`, `culture`, `theater_scene`, `landmark`, `interesting_fact`

---

## Execution Instructions

1. Generate ONE category at a time, writing the complete SQL file
2. After each file, verify:
   - Every row has all 7 columns
   - Single quotes are properly escaped with `''`
   - The last row ends with `;`
   - Level counts match: 6 for L1-L4, 4 for L5, 3-5 for L0
   - No clue text contains the answer as a standalone identifiable word at levels 1-4
3. Write the file to the specified path using the Write tool
4. Move to the next category

Start with **Broadway Play** (`scripts/clues-broadway-play.sql`), then **Broadway Actor** (`scripts/clues-broadway-actor.sql`), then **Broadway Theater** (`scripts/clues-broadway-theater.sql`), then **Touring City** (`scripts/clues-touring-city.sql`).
