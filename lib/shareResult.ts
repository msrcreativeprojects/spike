import { SHARE_EMOJIS, GameState, type ClueColor, type TapeColor } from "@/types/puzzle";

const TOTAL_CLUES = 5;

interface TapeInfo {
  colorsEarned: TapeColor[];
  totalTape: number;
}

export function generateShareText(
  state: GameState,
  dailyColors: ClueColor[],
  tapeInfo?: TapeInfo
): string {
  const puzzleNum = String(state.puzzleId).padStart(3, "0");
  const cluesUsed = TOTAL_CLUES - state.score;

  // White = peeled (revealed), colored = still sealed (using daily colors)
  const marks = Array.from({ length: TOTAL_CLUES }, (_, i) => {
    const peeled = i < cluesUsed;
    return peeled ? SHARE_EMOJIS.peeled : SHARE_EMOJIS[dailyColors[i]];
  });

  const marksLine = marks.join("");
  const resultLine = state.solved
    ? `Solved in ${cluesUsed} clue${cluesUsed === 1 ? "" : "s"}`
    : "Missed it";

  let text = `SPIKE #${puzzleNum}\n${marksLine}\n${resultLine}`;

  if (tapeInfo) {
    const hasGlow = tapeInfo.colorsEarned.includes("glow");
    const earned = tapeInfo.colorsEarned.length;
    text += `\n\uD83C\uDFAD +${earned} tape (${tapeInfo.totalTape} total)`;
    if (hasGlow) text += " \u2728"; // ✨
  }

  return text;
}

export async function copyShareText(
  state: GameState,
  dailyColors: ClueColor[],
  tapeInfo?: TapeInfo
): Promise<boolean> {
  const text = generateShareText(state, dailyColors, tapeInfo);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
