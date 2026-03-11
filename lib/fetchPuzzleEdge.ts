import { Puzzle } from "@/types/puzzle";

/**
 * Edge-compatible puzzle fetch via Supabase REST API.
 *
 * The SSR client (`lib/supabase/server.ts`) uses `cookies()` from
 * `next/headers`, which is incompatible with the edge runtime used
 * by OG image routes. This fetches directly from the PostgREST API.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function fetchPuzzleById(id: number): Promise<Puzzle | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/puzzles?id=eq.${id}&status=eq.approved&select=id,date,answer,category,clues,aliases`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;

  const rows = await res.json();
  if (!rows.length) return null;

  const row = rows[0];
  return {
    id: row.id,
    date: row.date,
    answer: row.answer,
    category: row.category,
    clues: row.clues as [string, string, string, string, string],
    aliases: (row.aliases as string[]) ?? undefined,
  };
}
