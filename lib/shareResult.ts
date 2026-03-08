import { CLUE_COLORS, SHARE_EMOJIS, GameState } from "@/types/puzzle";

const TOTAL_CLUES = 5;

export function generateShareText(state: GameState): string {
  const marks = Array.from({ length: TOTAL_CLUES }, (_, i) => {
    if (state.solved && i < state.score) {
      return SHARE_EMOJIS[CLUE_COLORS[i]];
    }
    return SHARE_EMOJIS.empty;
  });

  const marksLine = marks.join("");
  const resultLine = state.solved
    ? `Solved in ${TOTAL_CLUES - state.score + 1} clue${TOTAL_CLUES - state.score + 1 === 1 ? "" : "s"}`
    : "Missed it";

  return `SPIKE #${state.puzzleId}\n${marksLine}\n${resultLine}`;
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
