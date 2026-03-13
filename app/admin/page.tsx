import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import AdminTabs from "@/components/AdminTabs";

function getTodayStr(): string {
  const now = new Date();
  const [month, day, year] = now
    .toLocaleDateString("en-US", { timeZone: "America/New_York" })
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  // ── 1. Fetch ALL puzzles ──
  const { data: allPuzzles } = await supabase
    .from("puzzles")
    .select("*")
    .order("created_at", { ascending: true });

  // ── 2. Fetch all show_name/category pairs from clue_bank (paginated) ──
  let allShows: { show_name: string; category: string }[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data } = await supabase
      .from("clue_bank")
      .select("show_name, category")
      .range(from, from + pageSize - 1);
    if (!data || data.length === 0) break;
    allShows = allShows.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  // ── 3. Dedupe shows ──
  const uniqueShows = Array.from(
    new Map(allShows.map((s) => [s.show_name, s])).values()
  );

  // ── 4. Compute hasExisting flags ──
  const existingAnswers = new Set(
    (allPuzzles ?? []).map((p) => p.answer)
  );

  const shows = uniqueShows.map((s) => ({
    name: s.show_name,
    category: s.category,
    hasExisting: existingAnswers.has(s.show_name),
  }));

  return (
    <main className="mx-auto max-w-4xl px-5 py-8">
      <AdminHeader />
      <AdminTabs
        initialPuzzles={allPuzzles ?? []}
        shows={shows}
        todayStr={getTodayStr()}
      />
    </main>
  );
}
