import { ALL_COLOR_NAMES, type ClueColor } from "@/types/puzzle";

/**
 * djb2 hash — fast, well-distributed 32-bit hash for short strings.
 */
function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * mulberry32 — simple seeded PRNG, returns values in [0, 1).
 */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle using a seeded PRNG.
 */
function seededShuffle<T>(arr: T[], rand: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Returns 5 color names for the given date string (e.g. "2026-03-08").
 * Deterministic — all players see the same 5 colors on the same day.
 */
export function getDailyColors(date: string): ClueColor[] {
  const seed = djb2(date);
  const rand = mulberry32(seed);
  const shuffled = seededShuffle(ALL_COLOR_NAMES, rand);
  return shuffled.slice(0, 5);
}
