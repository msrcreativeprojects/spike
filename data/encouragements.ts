/**
 * Encouragement pools by stage (0-4 clues revealed).
 * Add as many as you want per stage — one is picked at random per puzzle day.
 */

const STAGE_POOLS: string[][] = [
  // Stage 0 — no clues yet (instruct + encourage blind guessing)
  [
    "Guess the show — type your answer and submit",
    "Type a show name to start",
    "Start guessing! Wrong answers reveal clues",
    "Take a swing — wrong guesses give you clues",
    "Go ahead, guess blind. Wrong answers reveal clues",
  ],
  // Stage 1 — one clue revealed
  [
    "This is easy street babe",
    "Warm up's over",
    "Ring any bells?",
    "Off book already?",
    "Think you know?",
  ],
  // Stage 2 — two clues revealed
  [
    "you're doing 5, 6, 7, GREAT",
    "Getting warmer",
    "The plot thickens",
    "Two down, three to go",
    "You've got this",
  ],
  // Stage 3 — three clues revealed
  [
    "full out on this one",
    "Almost there",
    "Big clue energy",
    "Don't choke now",
    "It's right there",
  ],
  // Stage 4 — four clues revealed (last chance)
  [
    "this is your last chance to come through!",
    "Final call!",
    "Now or never",
    "Last tape standing",
    "Bring it home",
  ],
];

/**
 * Simple date-seeded hash for deterministic daily picks.
 * Same puzzle date always gets the same encouragement set.
 */
function dateHash(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Get the encouragement message for a given stage and puzzle date.
 * Deterministic per date so everyone sees the same text.
 */
export function getEncouragement(stage: number, puzzleDate: string): string {
  const pool = STAGE_POOLS[Math.min(stage, STAGE_POOLS.length - 1)];
  const hash = dateHash(puzzleDate);
  return pool[hash % pool.length];
}
