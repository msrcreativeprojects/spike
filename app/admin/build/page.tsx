import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PuzzleBuilder from "@/components/PuzzleBuilder";
import AdminHeader from "@/components/AdminHeader";

export default async function BuildPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  // Fetch distinct show names from clue_bank, and which shows already have puzzles
  const { data: shows } = await supabase
    .from("clue_bank")
    .select("show_name, category")
    .order("show_name");

  // Get unique shows
  const uniqueShows = Array.from(
    new Map((shows ?? []).map(s => [s.show_name, s])).values()
  );

  // Check which shows already have puzzles in the queue
  const { data: existingPuzzles } = await supabase
    .from("puzzles")
    .select("answer");

  const existingAnswers = new Set((existingPuzzles ?? []).map(p => p.answer));

  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <AdminHeader subtitle="Builder" navHref="/admin" navLabel="← Back to Admin" />
      <PuzzleBuilder
        shows={uniqueShows.map(s => ({
          name: s.show_name,
          category: s.category,
          hasExisting: existingAnswers.has(s.show_name),
        }))}
      />
    </main>
  );
}
