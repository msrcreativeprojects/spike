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

export type ClueColor = "pink" | "purple" | "blue" | "green" | "yellow";
export type TapeColor = ClueColor | "glow";

// Ordered rarest (top, position 0) to most common (bottom, position 4)
export const CLUE_COLORS: ClueColor[] = [
  "pink",
  "purple",
  "blue",
  "green",
  "yellow",
];

export const CLUE_COLOR_MAP: Record<ClueColor, string> = {
  pink: "#ff2d8a",
  purple: "#bf5fff",
  blue: "#00d4ff",
  green: "#39ff14",
  yellow: "#faff00",
};

export const TAPE_COLOR_MAP: Record<TapeColor, string> = {
  ...CLUE_COLOR_MAP,
  glow: "#ffffff",
};

export const SHARE_EMOJIS: Record<ClueColor | "peeled", string> = {
  pink: "\uD83E\uDE77",   // 🩷
  purple: "\uD83D\uDFEA", // 🟪
  blue: "\uD83D\uDFE6",   // 🟦
  green: "\uD83D\uDFE9",  // 🟩
  yellow: "\uD83D\uDFE8", // 🟨
  peeled: "\u2B1C",        // ⬜
};

export interface TapeStats {
  totalTape: number;
  tapeByColor: Record<TapeColor, number>;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string;
  history: TapeDayRecord[];
  gamesPlayed: number;
  gamesWon: number;
}

export interface TapeDayRecord {
  date: string;
  puzzleId: number;
  score: number;
  colorsEarned: TapeColor[];
  totalTapeAfter: number;
}
