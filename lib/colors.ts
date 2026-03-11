import {
  ALL_COLORS,
  GLOW_COLOR,
  WHITE_TAPE_COLOR,
  type ClueColor,
  type TapeColor,
} from "@/types/puzzle";

/** Resolve any TapeColor (clue color, glow, or white) to its hex value. */
export function getColorHex(color: TapeColor | string): string {
  if (color === "glow") return GLOW_COLOR;
  if (color === "white") return WHITE_TAPE_COLOR;
  return ALL_COLORS[color as ClueColor] ?? "#ffffff";
}

/**
 * Determine which tape colors a player earns for a given score.
 * Score > 0: the last `score` daily colors (positions 5-score through 4).
 * Score 0 (solved on last guess or failed): 1 white consolation tape.
 */
export function getEarnedColors(
  score: number,
  dailyColors: ClueColor[]
): TapeColor[] {
  return score > 0 ? dailyColors.slice(5 - score) : ["white"];
}
