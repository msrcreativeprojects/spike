import { createClient } from "@/lib/supabase/client";
import {
  type ClueColor,
  type TapeColor,
  type TapeStats,
  type TapeDayRecord,
} from "@/types/puzzle";

export function defaultTapeStats(): TapeStats {
  return {
    totalTape: 0,
    tapeByColor: {},
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
    tapeByColor: (stats.tape_colors as Record<string, number>) ?? {},
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
  tapeByColor: Record<string, number>;
}

export async function recordGameCompletion(
  userId: string,
  date: string,
  puzzleId: number,
  score: number,
  solved: boolean,
  dailyColors: ClueColor[]
): Promise<GameCompletionResult> {
  const supabase = createClient();

  // Check if already recorded (idempotent)
  const { data: existing } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .single();

  if (existing && existing.puzzle_id === puzzleId) {
    // Same puzzle, already recorded — return existing data
    const stats = await loadTapeStats(userId);
    return {
      colorsEarned: existing.colors_earned as TapeColor[],
      newTotal: stats.totalTape,
      newStreak: stats.currentStreak,
      tapeByColor: stats.tapeByColor,
    };
  }

  // If puzzle changed for the same date (admin swapped puzzle), undo old record
  if (existing && existing.puzzle_id !== puzzleId) {
    const oldColors = (existing.colors_earned as TapeColor[]) ?? [];
    // Remove old tape from stats before re-recording
    const currentStats = await loadTapeStats(userId);
    const fixedByColor: Record<string, number> = { ...currentStats.tapeByColor };
    for (const c of oldColors) {
      fixedByColor[c] = Math.max((fixedByColor[c] ?? 0) - 1, 0);
    }
    const fixedTotal = Math.max(currentStats.totalTape - oldColors.length, 0);
    await supabase
      .from("tape_stats")
      .update({
        total_tape: fixedTotal,
        tape_colors: fixedByColor,
        games_played: Math.max(currentStats.gamesPlayed - 1, 0),
        games_won: Math.max(currentStats.gamesWon - (existing.score > 0 ? 1 : 0), 0),
      })
      .eq("user_id", userId);
    await supabase
      .from("game_history")
      .delete()
      .eq("user_id", userId)
      .eq("date", date);
  }

  // Load current stats (or create defaults)
  const stats = await loadTapeStats(userId);

  // Calculate streak
  let newStreak: number;
  if (isConsecutiveDay(date, stats.lastPlayedDate)) {
    newStreak = stats.currentStreak + 1;
  } else if (date === stats.lastPlayedDate) {
    newStreak = stats.currentStreak; // same day, shouldn't happen
  } else {
    newStreak = 1;
  }

  // Calculate colors earned — the unpeeled positions use daily colors
  // Score > 0: earn colored tape from remaining positions
  // Score 0 (solved on last guess or failed): earn 1 white consolation tape
  const colorsEarned: TapeColor[] = score > 0
    ? dailyColors.slice(5 - score)
    : ["white"];

  // Glow bonus on every 7th streak day
  const hasGlowBonus = newStreak > 0 && newStreak % 7 === 0;
  if (hasGlowBonus) {
    colorsEarned.push("glow");
  }

  // Update tape counts (JSONB)
  const newTapeByColor: Record<string, number> = { ...stats.tapeByColor };
  for (const color of colorsEarned) {
    newTapeByColor[color] = (newTapeByColor[color] ?? 0) + 1;
  }
  const newTotal = stats.totalTape + colorsEarned.length;
  const newLongest = Math.max(stats.longestStreak, newStreak);

  // Upsert stats
  await supabase.from("tape_stats").upsert({
    user_id: userId,
    total_tape: newTotal,
    tape_colors: newTapeByColor,
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
