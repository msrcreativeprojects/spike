import { SHARE_EMOJIS, GameState, Puzzle, type ClueColor, type TapeColor } from "@/types/puzzle";
import { generateShareImage } from "./shareImage";

const TOTAL_CLUES = 5;

interface TapeInfo {
  colorsEarned: TapeColor[];
  totalTape: number;
}

export function generateShareText(
  state: GameState,
  puzzle: Puzzle,
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
  const tapeCollected = state.score > 0 ? state.score : 1;
  const resultLine = state.solved
    ? `Collected ${tapeCollected}/5 tape`
    : `Collected 1/5 tape`;

  let text = `SPIKE #${puzzleNum}\nGuess the ${puzzle.category}\n${marksLine}\n${resultLine}`;

  if (tapeInfo) {
    const hasGlow = tapeInfo.colorsEarned.includes("glow");
    const earned = tapeInfo.colorsEarned.length;
    text += `\n\uD83C\uDFAD +${earned} tape (${tapeInfo.totalTape} total)`;
    if (hasGlow) text += " \u2728"; // ✨
  }

  return text;
}

/** Download a blob as a file via temporary <a> element. */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate a share image and share it via the Web Share API (mobile)
 * or download + clipboard copy (desktop).
 */
export async function shareResult(
  state: GameState,
  puzzle: Puzzle,
  selectedClueIndex: number,
  dailyColors: ClueColor[],
  tapeInfo?: TapeInfo
): Promise<"shared" | "saved" | "failed"> {
  const text = generateShareText(state, puzzle, dailyColors, tapeInfo) + "\nspike.quest";

  try {
    const blob = await generateShareImage({
      puzzleId: state.puzzleId,
      score: state.score,
      solved: state.solved,
      dailyColors,
      category: puzzle.category,
      featuredClue: puzzle.clues[selectedClueIndex],
    });

    const file = new File([blob], "spike-result.png", { type: "image/png" });

    // Try native Web Share API with file support (mobile)
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return "shared";
    }

    // Fallback: download image + copy text to clipboard
    const puzzleNum = String(state.puzzleId).padStart(3, "0");
    downloadBlob(blob, `spike-${puzzleNum}.png`);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard failed silently — image was still downloaded
    }
    return "saved";
  } catch (err) {
    // User cancelled the share sheet — not an error
    if (err instanceof DOMException && err.name === "AbortError") {
      return "failed";
    }

    // Canvas or share failed — fall back to text-only clipboard
    try {
      await navigator.clipboard.writeText(text);
      return "saved";
    } catch {
      return "failed";
    }
  }
}
