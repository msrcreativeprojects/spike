import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

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
    <main className="mx-auto min-h-dvh max-w-2xl px-5 py-8">
      <h1 className="font-title text-4xl tracking-wide text-white/90 mb-8">
        SPIKE <span className="text-base font-sans tracking-normal text-white/30">Admin</span>
      </h1>
      <AdminDashboard
        initialScheduled={scheduled ?? []}
        initialQueued={queued ?? []}
      />
    </main>
  );
}
