import { Puzzle } from "@/types/puzzle";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

  // Puzzle data is public — use direct REST fetch so Next.js can cache it.
  // The Supabase SSR client reads cookies(), which is incompatible with caching.
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/puzzles?date=eq.${today}&status=eq.approved&select=id,date,answer,category,clues,aliases,theme,puzzle_number`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 3600, tags: ["puzzle-today"] },
    }
  );

  if (!res.ok) return null;

  const rows = await res.json();
  if (!rows.length) return null;

  const data = rows[0];
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
