import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  // Fetch approved (scheduled) puzzles
  const { data: scheduled } = await supabase
    .from("puzzles")
    .select("*")
    .eq("status", "approved")
    .order("date", { ascending: true });

  // Fetch queued puzzles (admin RLS policy allows this)
  const { data: queued } = await supabase
    .from("puzzles")
    .select("*")
    .eq("status", "queued")
    .order("created_at", { ascending: true });

  return (
    <main className="mx-auto max-w-2xl px-5 py-8">
      <AdminHeader subtitle="Admin" navHref="/admin/build" navLabel="Puzzle Builder →" />
      <AdminDashboard
        initialScheduled={scheduled ?? []}
        initialQueued={queued ?? []}
      />
    </main>
  );
}
