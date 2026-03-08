import { createClient } from "@/lib/supabase/client";
import {
  CLUE_COLORS,
  type TapeColor,
  type TapeStats,
  type TapeDayRecord,
} from "@/types/puzzle";

const ALL_TAPE_COLORS: TapeColor[] = [...CLUE_COLORS, "glow"];

function defaultTapeByColor(): Record<TapeColor, number> {
  return Object.fromEntries(ALL_TAPE_COLORS.map((c) => [c, 0])) as Record<
    TapeColor,
    number
  >;
}

export function defaultTapeStats(): TapeStats {
  return {
    totalTape: 0,
    tapeByColor: defaultTapeByColor(),
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: "",
    history: [],
    gamesPlayed: 0,
    gamesWon: 0,
  };
}

export async function loadTapeStats(
  userId: string
): Promise<TapeStats> {
  const supabase = createClient();

  // Load stats
  const { data: stats } = await supabase
    .from("tape_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Load recent history (last 30 entries)
  const { data: history } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(30);

  if (!stats) {
    return defaultTapeStats();
  }

  return {
    totalTape: stats.total_tape,
    tapeByColor: {
      pink: stats.tape_pink,
      purple: stats.tape_purple,
      blue: stats.tape_blue,
      green: stats.tape_green,
      yellow: stats.tape_yellow,
      glow: stats.tape_glow,
    },
    currentStreak: stats.current_streak,
    longestStreak: stats.longest_streak,
    lastPlayedDate: stats.last_played_date,
    history: (history ?? [])
      .reverse()
      .map((h) => ({
        date: h.date,
        puzzleId: h.puzzle_id,
        score: h.score,
        colorsEarned: h.colors_earned as TapeColor[],
        totalTapeAfter: h.total_tape_after,
      })),
    gamesPlayed: stats.games_played,
    gamesWon: stats.games_won,
  };
}

function isConsecutiveDay(current: string, previous: string): boolean {
  if (!previous) return false;
  const curr = new Date(current + "T00:00:00");
  const prev = new Date(previous + "T00:00:00");
  return curr.getTime() - prev.getTime() === 86400000;
}

export interface GameCompletionResult {
  colorsEarned: TapeColor[];
  newTotal: number;
  newStreak: number;
  tapeByColor: Record<TapeColor, number>;
}

export async function recordGameCompletion(
  userId: string,
  date: string,
  puzzleId: number,
  score: number,
  solved: boolean
): Promise<GameCompletionResult> {
  const supabase = createClient();

  // Check if already recorded (idempotent)
  const { data: existing } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  if (existing) {
    // Already recorded — return existing data
    const stats = await loadTapeStats(userId);
    return {
      colorsEarned: existing.colors_earned as TapeColor[],
      newTotal: stats.totalTape,
      newStreak: stats.currentStreak,
      tapeByColor: stats.tapeByColor,
    };
  }

  // Load current stats (or create defaults)
  let stats = await loadTapeStats(userId);

  // Calculate streak
  let newStreak: number;
  if (isConsecutiveDay(date, stats.lastPlayedDate)) {
    newStreak = stats.currentStreak + 1;
  } else if (date === stats.lastPlayedDate) {
    newStreak = stats.currentStreak; // same day, shouldn't happen
  } else {
    newStreak = 1;
  }

  // Calculate colors earned
  const colorsEarned: TapeColor[] = solved
    ? CLUE_COLORS.slice(5 - score)
    : [];

  // Glow bonus on every 7th streak day
  const hasGlowBonus = newStreak > 0 && newStreak % 7 === 0;
  if (hasGlowBonus) {
    colorsEarned.push("glow");
  }

  // Update tape counts
  const newTapeByColor = { ...stats.tapeByColor };
  for (const color of colorsEarned) {
    newTapeByColor[color] = (newTapeByColor[color] ?? 0) + 1;
  }
  const newTotal = stats.totalTape + colorsEarned.length;
  const newLongest = Math.max(stats.longestStreak, newStreak);

  // Upsert stats
  await supabase.from("tape_stats").upsert({
    user_id: userId,
    total_tape: newTotal,
    tape_pink: newTapeByColor.pink,
    tape_purple: newTapeByColor.purple,
    tape_blue: newTapeByColor.blue,
    tape_green: newTapeByColor.green,
    tape_yellow: newTapeByColor.yellow,
    tape_glow: newTapeByColor.glow,
    current_streak: newStreak,
    longest_streak: newLongest,
    last_played_date: date,
    games_played: stats.gamesPlayed + 1,
    games_won: stats.gamesWon + (solved ? 1 : 0),
  });

  // Insert history
  await supabase.from("game_history").insert({
    user_id: userId,
    date,
    puzzle_id: puzzleId,
    score,
    colors_earned: colorsEarned,
    total_tape_after: newTotal,
  });

  return {
    colorsEarned,
    newTotal,
    newStreak,
    tapeByColor: newTapeByColor,
  };
}
