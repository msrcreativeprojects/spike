import { CLUE_COLORS, SHARE_EMOJIS, GameState } from "@/types/puzzle";

const TOTAL_CLUES = 5;

export function generateShareText(state: GameState): string {
  const puzzleNum = String(state.puzzleId).padStart(3, "0");
  const cluesUsed = TOTAL_CLUES - state.score;

  // White = peeled (revealed), colored = still sealed
  const marks = Array.from({ length: TOTAL_CLUES }, (_, i) => {
    const peeled = i < cluesUsed;
    return peeled ? SHARE_EMOJIS.peeled : SHARE_EMOJIS[CLUE_COLORS[i]];
  });

  const marksLine = marks.join("");
  const resultLine = state.solved
    ? `Solved in ${cluesUsed} clue${cluesUsed === 1 ? "" : "s"}`
    : "Missed it";

  return `SPIKE #${puzzleNum}\n${marksLine}\n${resultLine}`;
}

export async function copyShareText(state: GameState): Promise<boolean> {
  const text = generateShareText(state);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
