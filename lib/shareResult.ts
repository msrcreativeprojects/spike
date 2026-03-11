import { GameState, Puzzle, type ClueColor } from "@/types/puzzle";

export function generateShareText(state: GameState): string {
  const puzzleNum = String(state.puzzleId).padStart(3, "0");
  return `SPIKE #${puzzleNum} (+${state.score})`;
}

/**
 * Share a link to the game via Web Share API (mobile)
 * or copy to clipboard (desktop).
 *
 * The share URL points to a dynamic route that serves an OG image
 * showing the selected clue — platforms render it as a rich link preview.
 */
export async function shareResult(
  state: GameState,
  puzzle: Puzzle,
  selectedClueIndex: number,
  dailyColors: ClueColor[]
): Promise<"shared" | "saved" | "failed"> {
  const text = generateShareText(state);
  const url = `https://spike.quest/s/${state.puzzleId}/${selectedClueIndex}`;

  try {
    // Try native Web Share API (mobile share sheet)
    if (navigator.share) {
      await navigator.share({ url, text });
      return "shared";
    }

    // Fallback: copy URL + text to clipboard
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return "saved";
  } catch (err) {
    // User cancelled the share sheet — not an error
    if (err instanceof DOMException && err.name === "AbortError") {
      return "failed";
    }

    // Share failed — fall back to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return "saved";
    } catch {
      return "failed";
    }
  }
}
