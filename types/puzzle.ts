export interface Puzzle {
  id: number;
  date: string;
  answer: string;
  category: string;
  clues: [string, string, string, string, string];
  aliases?: string[];
}

export interface GameState {
  puzzleId: number;
  revealedClues: number;
  guesses: string[];
  solved: boolean;
  completed: boolean;
  score: number;
}

export type ClueColor = "pink" | "green" | "yellow" | "orange" | "purple";

export const CLUE_COLORS: ClueColor[] = [
  "pink",
  "green",
  "yellow",
  "orange",
  "purple",
];

export const CLUE_COLOR_MAP: Record<ClueColor, string> = {
  pink: "#ff2d8a",
  green: "#39ff14",
  yellow: "#faff00",
  orange: "#ff6b2b",
  purple: "#bf5fff",
};

export const SHARE_EMOJIS: Record<ClueColor | "empty", string> = {
  pink: "\u{1FA77}",
  green: "\uD83D\uDFE9",
  yellow: "\uD83D\uDFE8",
  orange: "\uD83D\uDFE7",
  purple: "\uD83D\uDFEA",
  empty: "\u2B1B",
};
