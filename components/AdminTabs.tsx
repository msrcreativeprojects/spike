"use client";

import { Suspense, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useThemeClass } from "@/lib/adminTheme";
import type { PuzzleRow, ShowInfo, AdminTab } from "@/lib/adminTypes";
import AdminLibrary from "./AdminLibrary";
import AdminCalendar from "./AdminCalendar";
import PuzzleBuilder from "./PuzzleBuilder";

// ─── Tab definitions ──────────────────────────────────────────────
const TABS: { key: AdminTab; label: string }[] = [
  { key: "library", label: "Library" },
  { key: "calendar", label: "Calendar" },
  { key: "build", label: "Build" },
];

// ─── Props from server component ──────────────────────────────────
interface AdminTabsProps {
  initialPuzzles: PuzzleRow[];
  shows: ShowInfo[];
  todayStr: string;
}

// ─── Wrapper with Suspense (useSearchParams requirement) ──────────
export default function AdminTabs(props: AdminTabsProps) {
  return (
    <Suspense>
      <AdminTabsInner {...props} />
    </Suspense>
  );
}

function AdminTabsInner({ initialPuzzles, shows, todayStr }: AdminTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const c = useThemeClass();
  const supabase = createClient();

  // ── Shared puzzle state (all tabs read from this) ──
  const [allPuzzles, setAllPuzzles] = useState<PuzzleRow[]>(initialPuzzles);

  const refetchAll = useCallback(async () => {
    const { data } = await supabase
      .from("puzzles")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setAllPuzzles(data);
  }, [supabase]);

  // ── Tab state from URL ──
  const activeTab = (searchParams.get("tab") as AdminTab) || "library";
  const preSelectedShow = searchParams.get("show") || null;
  const editPuzzleId = searchParams.get("puzzle") || null;

  const setTab = (tab: AdminTab, extra?: Record<string, string>) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => params.set(k, v));
    }
    router.replace(`/admin?${params.toString()}`);
  };

  const goToBuild = (showName: string) => {
    setTab("build", { show: showName });
  };

  const goToEdit = (puzzleId: number) => {
    setTab("build", { puzzle: String(puzzleId) });
  };

  const handleBuildSaveComplete = useCallback(async () => {
    await refetchAll();
    setTab("library");
  }, [refetchAll]);

  // ── Derive data subsets ──
  const scheduled = allPuzzles.filter(
    (p) => p.status === "approved" && p.date && p.date >= todayStr
  );
  const archived = allPuzzles.filter(
    (p) => p.status === "approved" && p.date && p.date < todayStr
  );
  const queued = allPuzzles.filter((p) => p.status === "queued");

  // Calendar needs all approved (past + today + future) for its date-split view
  const allApproved = allPuzzles
    .filter((p) => p.status === "approved")
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));

  // ── Compute shows with hasExisting incorporating current puzzle state ──
  const puzzleAnswers = new Set(allPuzzles.map((p) => p.answer));
  const currentShows = shows.map((s) => ({
    ...s,
    hasExisting: puzzleAnswers.has(s.name),
  }));

  return (
    <div>
      {/* ── Tab bar ── */}
      <div
        className={`flex gap-1 mb-8 border-b ${c(
          "border-white/10",
          "border-gray-200"
        )}`}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
                isActive
                  ? c(
                      "border-white/60 text-white/90",
                      "border-gray-800 text-gray-900"
                    )
                  : c(
                      "border-transparent text-white/30 hover:text-white/50",
                      "border-transparent text-gray-400 hover:text-gray-600"
                    )
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "library" && (
        <AdminLibrary
          allPuzzles={allPuzzles}
          shows={currentShows}
          todayStr={todayStr}
          onBuild={goToBuild}
          onEdit={goToEdit}
          onRefetch={refetchAll}
        />
      )}

      {activeTab === "calendar" && (
        <AdminCalendar
          initialScheduled={allApproved}
          queuedPuzzles={queued}
          onRefetch={refetchAll}
        />
      )}

      {activeTab === "build" && (
        <PuzzleBuilder
          shows={currentShows}
          preSelectedShow={preSelectedShow}
          editPuzzleId={editPuzzleId ? Number(editPuzzleId) : null}
          onSaveComplete={handleBuildSaveComplete}
        />
      )}
    </div>
  );
}
