import { createClient } from "@/lib/supabase/server";
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

export async function getTodayPuzzle(): Promise<Puzzle | null> {
  const today = getLocalDateString();
  const supabase = await createClient();

  const { data } = await supabase
    .from("puzzles")
    .select("id, date, answer, category, clues, aliases, theme, puzzle_number")
    .eq("date", today)
    .eq("status", "approved")
    .single();

  if (!data) return null;

  return {
    id: data.id,
    date: data.date,
    answer: data.answer,
    category: data.category,
    clues: data.clues as [string, string, string, string, string],
    aliases: (data.aliases as string[]) ?? undefined,
    theme: (data.theme as string) ?? undefined,
    puzzle_number: (data.puzzle_number as number) ?? undefined,
  };
}
