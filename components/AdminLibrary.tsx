"use client";

import { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useThemeClass } from "@/lib/adminTheme";
import type { PuzzleRow, ShowInfo, LibraryFilter, LibraryItem } from "@/lib/adminTypes";

// ─── Props ────────────────────────────────────────────────────────
interface AdminLibraryProps {
  allPuzzles: PuzzleRow[];
  shows: ShowInfo[];
  todayStr: string;
  onBuild: (showName: string) => void;
  onEdit: (puzzleId: number) => void;
  onRefetch: () => Promise<void>;
}

// ─── Filter pill config ───────────────────────────────────────────
const FILTERS: { key: LibraryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unbuilt", label: "Unbuilt" },
  { key: "built", label: "Built" },
  { key: "scheduled", label: "Scheduled" },
  { key: "archived", label: "Archived" },
];

// ─── Helpers ──────────────────────────────────────────────────────
function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// ─── Status badge ─────────────────────────────────────────────────
function StatusBadge({ type }: { type: LibraryItem["type"] }) {
  const c = useThemeClass();
  const config = {
    unbuilt: { label: "Unbuilt", cls: c("text-white/25 border-white/10", "text-gray-400 border-gray-200") },
    built: { label: "Built", cls: c("text-amber-400/70 border-amber-400/20", "text-amber-600 border-amber-200") },
    scheduled: { label: "Scheduled", cls: c("text-green-400/70 border-green-400/20", "text-green-600 border-green-200") },
    live: { label: "Live", cls: c("text-green-400 border-green-400/30", "text-green-600 border-green-300") },
    archived: { label: "Archived", cls: c("text-white/20 border-white/[0.06]", "text-gray-400 border-gray-200") },
  };
  const { label, cls } = config[type];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border inline-flex items-center gap-1.5 ${cls}`}>
      {type === "live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
      )}
      {label}
    </span>
  );
}

// ─── Main Library ─────────────────────────────────────────────────
export default function AdminLibrary({
  allPuzzles,
  shows,
  todayStr,
  onBuild,
  onEdit,
  onRefetch,
}: AdminLibraryProps) {
  const c = useThemeClass();
  const supabase = createClient();

  const [filter, setFilter] = useState<LibraryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingDateId, setEditingDateId] = useState<number | null>(null);

  // ── Derive the full library ──
  const libraryItems = useMemo(() => {
    const items: LibraryItem[] = [];
    const puzzleAnswers = new Set(allPuzzles.map((p) => p.answer));

    // Unbuilt shows
    for (const show of shows) {
      if (!puzzleAnswers.has(show.name)) {
        items.push({ type: "unbuilt", name: show.name, category: show.category });
      }
    }

    // Puzzles
    for (const puzzle of allPuzzles) {
      if (puzzle.status === "queued") {
        items.push({ type: "built", name: puzzle.answer, category: puzzle.category, puzzle });
      } else if (puzzle.status === "approved") {
        if (puzzle.date && puzzle.date < todayStr) {
          items.push({ type: "archived", name: puzzle.answer, category: puzzle.category, puzzle });
        } else if (puzzle.date === todayStr) {
          items.push({ type: "live", name: puzzle.answer, category: puzzle.category, puzzle });
        } else {
          items.push({ type: "scheduled", name: puzzle.answer, category: puzzle.category, puzzle });
        }
      }
    }

    return items;
  }, [allPuzzles, shows, todayStr]);

  // ── Counts for filter pills ──
  const counts = useMemo(
    () => ({
      all: libraryItems.length,
      unbuilt: libraryItems.filter((i) => i.type === "unbuilt").length,
      built: libraryItems.filter((i) => i.type === "built").length,
      scheduled: libraryItems.filter((i) => i.type === "scheduled" || i.type === "live").length,
      archived: libraryItems.filter((i) => i.type === "archived").length,
    }),
    [libraryItems]
  );

  // ── Filter + search ──
  const filtered = useMemo(() => {
    let list = libraryItems;
    if (filter !== "all") {
      list = list.filter((item) => {
        if (filter === "scheduled") return item.type === "scheduled" || item.type === "live";
        return item.type === filter;
      });
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(q));
    }
    // Sort scheduled/live items by date ascending (soonest first)
    if (filter === "scheduled") {
      list = [...list].sort((a, b) =>
        (a.puzzle?.date ?? "").localeCompare(b.puzzle?.date ?? "")
      );
    }
    return list;
  }, [libraryItems, filter, searchQuery]);

  // ── Stats ──
  const scheduledPuzzles = allPuzzles.filter(
    (p) => p.status === "approved" && p.date && p.date >= todayStr
  );
  const daysOfCoverage =
    scheduledPuzzles.length > 0
      ? scheduledPuzzles.filter((p) => p.date! >= todayStr).length
      : 0;

  // ── Actions ──
  const getNextDate = useCallback((): string => {
    const approved = allPuzzles
      .filter((p) => p.status === "approved" && p.date)
      .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
    if (approved.length === 0) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return fmt(tomorrow);
    }
    const lastDate = new Date(approved[approved.length - 1].date + "T00:00:00");
    lastDate.setDate(lastDate.getDate() + 1);
    return fmt(lastDate);
  }, [allPuzzles]);

  const handleSchedule = useCallback(
    async (puzzle: PuzzleRow) => {
      setBusy(true);
      const date = getNextDate();
      const { error } = await supabase
        .from("puzzles")
        .update({ status: "approved", date })
        .eq("id", puzzle.id);
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, getNextDate, onRefetch]
  );

  const handleUnschedule = useCallback(
    async (puzzle: PuzzleRow) => {
      setBusy(true);
      const { error } = await supabase
        .from("puzzles")
        .update({ status: "queued", date: null })
        .eq("id", puzzle.id);
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, onRefetch]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("Delete this puzzle? This cannot be undone.")) return;
      setBusy(true);
      const { error } = await supabase.from("puzzles").delete().eq("id", id);
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, onRefetch]
  );

  const handleClone = useCallback(
    async (puzzle: PuzzleRow) => {
      setBusy(true);
      const { error } = await supabase.from("puzzles").insert({
        answer: puzzle.answer,
        category: puzzle.category,
        clues: puzzle.clues,
        aliases: puzzle.aliases,
        status: "queued",
      });
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, onRefetch]
  );

  const handleRequeue = useCallback(
    async (puzzle: PuzzleRow) => {
      setBusy(true);
      const { error } = await supabase
        .from("puzzles")
        .update({ status: "queued", date: null })
        .eq("id", puzzle.id);
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, onRefetch]
  );

  const handleDateChange = useCallback(
    async (puzzleId: number, newDate: string) => {
      if (!newDate) return;
      setBusy(true);
      setEditingDateId(null);
      const { error } = await supabase
        .from("puzzles")
        .update({ date: newDate, status: "approved" })
        .eq("id", puzzleId);
      if (!error) await onRefetch();
      setBusy(false);
    },
    [supabase, onRefetch]
  );

  return (
    <div className="space-y-6">
      {/* ── Stats bar ── */}
      <div className={`flex gap-6 text-sm ${c("text-white/40", "text-gray-500")}`}>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{shows.length}</strong> shows
        </span>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{counts.built + counts.scheduled + counts.archived}</strong> built
        </span>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{counts.scheduled}</strong> scheduled
        </span>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{daysOfCoverage}</strong> days of coverage
        </span>
      </div>

      {/* ── Search + Filter row ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter pills */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                  isActive
                    ? c(
                        "border-white/30 text-white/80 bg-white/[0.06]",
                        "border-gray-400 text-gray-800 bg-gray-100"
                      )
                    : c(
                        "border-white/10 text-white/25 hover:text-white/40 hover:border-white/15",
                        "border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300"
                      )
                }`}
              >
                {f.label}
                <span className="ml-1.5 tabular-nums">{counts[f.key]}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={`w-full sm:w-56 px-3 py-1.5 text-sm border focus:outline-none transition-colors ${c(
            "bg-white/[0.03] border-white/10 text-white/70 placeholder-white/20 focus:border-white/25",
            "bg-white border-gray-200 text-gray-700 placeholder-gray-300 focus:border-gray-400"
          )}`}
        />
      </div>

      {/* ── List ── */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className={`text-sm py-8 text-center ${c("text-white/20", "text-gray-400")}`}>
            {searchQuery ? "No matches found." : "Nothing here yet."}
          </p>
        )}

        {filtered.map((item, idx) => (
          <LibraryRow
            key={item.puzzle?.id ?? `unbuilt-${item.name}`}
            item={item}
            busy={busy}
            expanded={item.puzzle?.id === expandedId}
            onToggleExpand={() =>
              setExpandedId(item.puzzle?.id === expandedId ? null : (item.puzzle?.id ?? null))
            }
            onBuild={() => onBuild(item.name)}
            onEdit={() => item.puzzle && onEdit(item.puzzle.id)}
            onSchedule={() => item.puzzle && handleSchedule(item.puzzle)}
            onUnschedule={() => item.puzzle && handleUnschedule(item.puzzle)}
            onDelete={() => item.puzzle && handleDelete(item.puzzle.id)}
            onClone={() => item.puzzle && handleClone(item.puzzle)}
            onRequeue={() => item.puzzle && handleRequeue(item.puzzle)}
            editingDateId={editingDateId}
            onStartDateEdit={(id) => setEditingDateId(id)}
            onDateChange={handleDateChange}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Library Row ──────────────────────────────────────────────────
function LibraryRow({
  item,
  busy,
  expanded,
  onToggleExpand,
  onBuild,
  onEdit,
  onSchedule,
  onUnschedule,
  onDelete,
  onClone,
  onRequeue,
  editingDateId,
  onStartDateEdit,
  onDateChange,
}: {
  item: LibraryItem;
  busy: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onBuild: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onUnschedule: () => void;
  onDelete: () => void;
  onClone: () => void;
  onRequeue: () => void;
  editingDateId: number | null;
  onStartDateEdit: (id: number) => void;
  onDateChange: (puzzleId: number, newDate: string) => void;
}) {
  const c = useThemeClass();

  return (
    <div
      className={`border transition-colors ${c(
        "border-white/[0.06] hover:border-white/10",
        "border-gray-100 hover:border-gray-200"
      )} ${expanded ? c("bg-white/[0.02]", "bg-gray-50") : ""}`}
    >
      {/* Main row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
        onClick={item.puzzle ? onToggleExpand : undefined}
      >
        <span className={`flex-1 text-sm truncate ${
          item.type === "unbuilt"
            ? c("text-white/40", "text-gray-400")
            : item.type === "archived"
            ? c("text-white/40", "text-gray-500")
            : c("text-white/70", "text-gray-700")
        }`}>
          {item.name}
        </span>

        <span className={`text-xs hidden sm:inline ${c("text-white/15", "text-gray-300")}`}>
          {item.category}
        </span>

        {/* Date for scheduled / live — click to edit */}
        {(item.type === "scheduled" || item.type === "live") && item.puzzle?.date && (
          editingDateId === item.puzzle.id ? (
            <input
              type="date"
              defaultValue={item.puzzle.date}
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onBlur={(e) => {
                if (e.target.value && e.target.value !== item.puzzle!.date) {
                  onDateChange(item.puzzle!.id, e.target.value);
                } else {
                  onStartDateEdit(-1);
                }
              }}
              onChange={(e) => {
                if (e.target.value) {
                  onDateChange(item.puzzle!.id, e.target.value);
                }
              }}
              className={`text-xs tabular-nums w-28 px-1 py-0.5 border focus:outline-none ${c(
                "bg-white/5 border-white/20 text-green-400/70 focus:border-green-400/40",
                "bg-white border-gray-300 text-green-600 focus:border-green-500"
              )}`}
            />
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onStartDateEdit(item.puzzle!.id); }}
              className={`text-xs tabular-nums hover:underline ${c("text-green-400/50 hover:text-green-400/80", "text-green-600 hover:text-green-700")}`}
            >
              {item.type === "live" ? "Today" : formatShortDate(item.puzzle.date)}
            </button>
          )
        )}

        {/* Date for archived */}
        {item.type === "archived" && item.puzzle?.date && (
          <span className={`text-xs tabular-nums ${c("text-white/15", "text-gray-300")}`}>
            {formatShortDate(item.puzzle.date)}
          </span>
        )}

        <StatusBadge type={item.type} />

        {/* Quick actions */}
        <div className="flex gap-2 ml-2">
          {item.type === "unbuilt" && (
            <button
              onClick={(e) => { e.stopPropagation(); onBuild(); }}
              disabled={busy}
              className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 ${c(
                "text-white/30 hover:text-white/60 border border-white/10 hover:border-white/20",
                "text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300"
              )}`}
            >
              Build →
            </button>
          )}

          {item.type === "built" && (
            <button
              onClick={(e) => { e.stopPropagation(); onSchedule(); }}
              disabled={busy}
              className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-green-600/80 text-white hover:bg-green-500 transition-colors disabled:opacity-40"
            >
              Schedule
            </button>
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && item.puzzle && (
        <div className={`px-4 pb-4 space-y-3 border-t ${c("border-white/[0.06]", "border-gray-100")}`}>
          <ol className={`list-decimal list-inside space-y-1 text-sm pt-3 ${c("text-white/40", "text-gray-500")}`}>
            {item.puzzle.clues.map((clue, i) => (
              <li key={i}>{clue}</li>
            ))}
          </ol>

          {item.puzzle.aliases && item.puzzle.aliases.length > 0 && (
            <p className={`text-xs ${c("text-white/20", "text-gray-400")}`}>
              Aliases: {item.puzzle.aliases.join(", ")}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-1 flex-wrap">
            {item.type === "built" && (
              <>
                <ActionBtn onClick={onEdit} disabled={busy} variant="default">
                  Edit Clues
                </ActionBtn>
                <ActionBtn onClick={onSchedule} disabled={busy} variant="green">
                  Schedule Next
                </ActionBtn>
                <label className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${c(
                  "border border-white/15 text-white/40 hover:text-white/70 hover:border-white/30",
                  "border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
                )}`}>
                  <span>Date:</span>
                  <input
                    type="date"
                    disabled={busy}
                    onChange={(e) => {
                      if (e.target.value && item.puzzle) {
                        onDateChange(item.puzzle.id, e.target.value);
                      }
                    }}
                    className={`text-xs bg-transparent focus:outline-none cursor-pointer disabled:opacity-40 ${c(
                      "text-white/60",
                      "text-gray-600"
                    )}`}
                  />
                </label>
                <ActionBtn onClick={onDelete} disabled={busy} variant="red">
                  Delete
                </ActionBtn>
              </>
            )}

            {(item.type === "scheduled" || item.type === "live") && (
              <>
                <ActionBtn onClick={onEdit} disabled={busy} variant="default">
                  Edit Clues
                </ActionBtn>
                <ActionBtn onClick={onUnschedule} disabled={busy} variant="default">
                  Unschedule
                </ActionBtn>
              </>
            )}

            {item.type === "archived" && (
              <>
                <ActionBtn onClick={onEdit} disabled={busy} variant="default">
                  Edit Clues
                </ActionBtn>
                <ActionBtn onClick={onClone} disabled={busy} variant="default">
                  Clone
                </ActionBtn>
                <ActionBtn onClick={onRequeue} disabled={busy} variant="default">
                  Re-queue
                </ActionBtn>
                <ActionBtn onClick={onDelete} disabled={busy} variant="red">
                  Delete
                </ActionBtn>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reusable action button ───────────────────────────────────────
function ActionBtn({
  onClick,
  disabled,
  variant,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  variant: "green" | "red" | "default";
  children: React.ReactNode;
}) {
  const c = useThemeClass();
  const cls =
    variant === "green"
      ? "bg-green-600/80 text-white hover:bg-green-500"
      : variant === "red"
      ? c("text-red-400/60 hover:text-red-400", "text-red-500/60 hover:text-red-600")
      : c(
          "border border-white/15 text-white/40 hover:text-white/70 hover:border-white/30",
          "border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
        );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-40 ${cls}`}
    >
      {children}
    </button>
  );
}
