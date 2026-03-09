import puzzles from "@/data/puzzles.json";
import { Puzzle } from "@/types/puzzle";

// DEV OVERRIDE: change this to test different days (set to "" for real date)
const DEV_DATE_OVERRIDE = "";

// Puzzle day rolls over at midnight America/New_York
function getLocalDateString(): string {
  if (DEV_DATE_OVERRIDE) return DEV_DATE_OVERRIDE;
  const now = new Date();
  const [month, day, year] = now
    .toLocaleDateString("en-US", { timeZone: "America/New_York" })
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function getTodayPuzzle(): Puzzle | null {
  const today = getLocalDateString();
  return (puzzles as Puzzle[]).find((p) => p.date === today) ?? null;
}

export function getPuzzleById(id: number): Puzzle | undefined {
  return (puzzles as Puzzle[]).find((p) => p.id === id);
}
