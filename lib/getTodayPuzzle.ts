import puzzles from "@/data/puzzles.json";
import { Puzzle } from "@/types/puzzle";

// DEV OVERRIDE: change this to test different days (set to "" for real date)
const DEV_DATE_OVERRIDE = "";

function getLocalDateString(): string {
  if (DEV_DATE_OVERRIDE) return DEV_DATE_OVERRIDE;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayPuzzle(): Puzzle | null {
  const today = getLocalDateString();
  return (puzzles as Puzzle[]).find((p) => p.date === today) ?? null;
}

export function getPuzzleById(id: number): Puzzle | undefined {
  return (puzzles as Puzzle[]).find((p) => p.id === id);
}
