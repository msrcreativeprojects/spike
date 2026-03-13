// ─── Shared admin types ───────────────────────────────────────────

export interface PuzzleRow {
  id: number;
  date: string | null;
  answer: string;
  category: string;
  clues: string[];
  aliases: string[] | null;
  status: string;
  theme: string | null;
  puzzle_number: number | null;
  created_at: string;
}

export interface ShowInfo {
  name: string;
  category: string;
  hasExisting: boolean;
}

export interface ClueRow {
  id: number;
  show_name: string;
  category: string;
  level: number;
  clue_text: string;
  clue_type: string | null;
  specificity: string | null;
  notes: string | null;
  used: boolean;
}

export interface PickedClue {
  text: string;
  bankId: number | null;
  clueType: string | null;
}

// ─── Tab system types ─────────────────────────────────────────────

export type AdminTab = "library" | "calendar" | "build";

export type LibraryFilter = "all" | "unbuilt" | "built" | "scheduled" | "archived";

export interface LibraryItem {
  type: "unbuilt" | "built" | "scheduled" | "live" | "archived";
  name: string;
  category: string;
  puzzle?: PuzzleRow;
}
