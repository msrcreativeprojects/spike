/**
 * Autocomplete matching utilities for the guess input.
 * Uses accent-folding + case-insensitive substring matching.
 */

/** Accent-fold and lowercase for search comparison. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Return up to `max` suggestions from `bank` matching `query`.
 * - Requires minimum 2 characters to trigger
 * - Matches by normalized substring inclusion
 * - Ranks: startsWith matches first, then contains, each group alphabetical
 */
export function matchSuggestions(
  query: string,
  bank: string[],
  max: number = 6,
): string[] {
  if (query.length < 2) return [];

  const norm = normalize(query);
  const matches = bank.filter((name) => normalize(name).includes(norm));

  matches.sort((a, b) => {
    const aStarts = normalize(a).startsWith(norm) ? 0 : 1;
    const bStarts = normalize(b).startsWith(norm) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.localeCompare(b);
  });

  return matches.slice(0, max);
}
