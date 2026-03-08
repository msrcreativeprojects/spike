import puzzles from "@/data/puzzles.json";
import { Puzzle } from "@/types/puzzle";

function getLocalDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayPuzzle(): Puzzle {
  const today = getLocalDateString();
  const match = (puzzles as Puzzle[]).find((p) => p.date === today);
  return match ?? (puzzles as Puzzle[])[0];
}

export function getPuzzleById(id: number): Puzzle | undefined {
  return (puzzles as Puzzle[]).find((p) => p.id === id);
}
