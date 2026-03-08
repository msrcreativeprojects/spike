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

export type ClueColor =
  | "pink"
  | "purple"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "cyan"
  | "red";
export type TapeColor = ClueColor | "glow" | "white";

// All 8 neon colors in the pool (daily shuffle picks 5)
export const ALL_COLORS: Record<ClueColor, string> = {
  pink: "#ff2d8a",
  purple: "#bf5fff",
  blue: "#00d4ff",
  green: "#39ff14",
  yellow: "#faff00",
  orange: "#ff6b2d",
  cyan: "#00ffcc",
  red: "#ff2d2d",
};

export const ALL_COLOR_NAMES: ClueColor[] = Object.keys(ALL_COLORS) as ClueColor[];

export const GLOW_COLOR = "#c8ffc8";
export const WHITE_TAPE_COLOR = "#e0e0e0";

export const SHARE_EMOJIS: Record<ClueColor | "peeled", string> = {
  pink: "\uD83E\uDE77",   // 🩷
  purple: "\uD83D\uDFEA", // 🟪
  blue: "\uD83D\uDFE6",   // 🟦
  green: "\uD83D\uDFE9",  // 🟩
  yellow: "\uD83D\uDFE8", // 🟨
  orange: "\uD83D\uDFE7", // 🟧
  cyan: "\uD83E\uDE75",   // 🩵
  red: "\uD83D\uDFE5",    // 🟥
  peeled: "\u2B1C",        // ⬜
};

export interface TapeStats {
  totalTape: number;
  tapeByColor: Record<string, number>;
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
