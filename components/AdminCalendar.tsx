"use client";

import { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useThemeClass } from "@/lib/adminTheme";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import type { PuzzleRow } from "@/lib/adminTypes";

// ─── Props ────────────────────────────────────────────────────────
interface AdminCalendarProps {
  initialScheduled: PuzzleRow[];
  queuedPuzzles: PuzzleRow[];
  onRefetch: () => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────
function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateSlot(dateStr: string): { dayOfWeek: string; shortDate: string } {
  const date = new Date(dateStr + "T00:00:00");
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
  const shortDate = `${date.getMonth() + 1}/${date.getDate()}`;
  return { dayOfWeek, shortDate };
}

function daysBetween(a: string, b: string): number {
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── Grip icon ────────────────────────────────────────────────────
function GripIcon() {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="currentColor" className="opacity-60">
      <circle cx="3" cy="3" r="1.5" />
      <circle cx="9" cy="3" r="1.5" />
      <circle cx="3" cy="9" r="1.5" />
      <circle cx="9" cy="9" r="1.5" />
      <circle cx="3" cy="15" r="1.5" />
      <circle cx="9" cy="15" r="1.5" />
    </svg>
  );
}

// ─── Sortable row for future puzzles ──────────────────────────────
function SortableRow({
  puzzle,
  editingId,
  onEdit,
  onUnschedule,
  editForm,
  setEditForm,
  onSave,
  onCancelEdit,
  busy,
  disabled,
}: {
  puzzle: PuzzleRow;
  editingId: number | null;
  onEdit: (p: PuzzleRow) => void;
  onUnschedule: (p: PuzzleRow) => void;
  editForm: Partial<PuzzleRow>;
  setEditForm: (f: Partial<PuzzleRow>) => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
  busy: boolean;
  disabled: boolean;
}) {
  const c = useThemeClass();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: puzzle.id, disabled });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  const { dayOfWeek, shortDate } = formatDateSlot(puzzle.date!);
  const isEditing = editingId === puzzle.id;

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-4">
      <div className="w-14 shrink-0 pt-3 text-right">
        <div className={`text-[10px] font-semibold tracking-wider ${c("text-white/35", "text-gray-400")}`}>{dayOfWeek}</div>
        <div className={`text-xs tabular-nums ${c("text-white/20", "text-gray-300")}`}>{shortDate}</div>
      </div>

      <div className={`flex-1 flex items-center gap-3 border px-4 py-3 transition-colors ${
        isDragging
          ? c("border-dashed border-white/15 bg-white/[0.02]", "border-dashed border-gray-300 bg-gray-50")
          : c("border-white/10 hover:border-white/15", "border-gray-200 hover:border-gray-300")
      }`}>
        {!isEditing && !disabled && (
          <button
            {...attributes}
            {...listeners}
            className={`cursor-grab active:cursor-grabbing transition-colors touch-none shrink-0 ${c("text-white/15 hover:text-white/40", "text-gray-300 hover:text-gray-500")}`}
            aria-label="Drag to reorder"
          >
            <GripIcon />
          </button>
        )}
        {isEditing ? (
          <EditRow
            form={editForm}
            setForm={setEditForm}
            onSave={() => onSave(puzzle.id)}
            onCancel={onCancelEdit}
            busy={busy}
          />
        ) : (
          <>
            <span className={`flex-1 text-sm truncate ${c("text-white/70", "text-gray-700")}`}>{puzzle.answer}</span>
            <span className={`text-xs ${c("text-white/20", "text-gray-400")}`}>{puzzle.category}</span>
            <button
              onClick={() => onEdit(puzzle)}
              className={`text-xs transition-colors ${c("text-white/25 hover:text-white/60", "text-gray-400 hover:text-gray-700")}`}
            >
              Edit
            </button>
            <button
              onClick={() => onUnschedule(puzzle)}
              className={`text-xs transition-colors ${c("text-red-400/40 hover:text-red-400/80", "text-red-500/50 hover:text-red-600")}`}
            >
              Unsched
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Static row for past / today puzzles ──────────────────────────
function StaticRow({
  puzzle,
  isToday,
  editingId,
  onEdit,
  editForm,
  setEditForm,
  onSave,
  onCancelEdit,
  busy,
}: {
  puzzle: PuzzleRow;
  isToday: boolean;
  editingId: number | null;
  onEdit: (p: PuzzleRow) => void;
  editForm: Partial<PuzzleRow>;
  setEditForm: (f: Partial<PuzzleRow>) => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
  busy: boolean;
}) {
  const c = useThemeClass();
  const { dayOfWeek, shortDate } = formatDateSlot(puzzle.date!);
  const isEditing = editingId === puzzle.id;

  return (
    <div className={`flex items-start gap-4 ${isToday ? "" : "opacity-40"}`}>
      <div className="w-14 shrink-0 pt-3 text-right">
        <div className={`text-[10px] font-semibold tracking-wider ${isToday ? "text-green-400/60" : c("text-white/35", "text-gray-400")}`}>
          {dayOfWeek}
        </div>
        <div className={`text-xs tabular-nums ${c("text-white/20", "text-gray-300")}`}>{shortDate}</div>
        {isToday && (
          <div className="mt-0.5 text-right">
            <span className="text-[9px] font-bold uppercase tracking-widest text-green-500">
              live
            </span>
          </div>
        )}
      </div>

      <div className={`flex-1 flex items-center gap-3 border px-4 py-3 ${
        isToday ? "border-green-500/60" : c("border-white/10", "border-gray-200")
      }`}>
        {isEditing ? (
          <EditRow
            form={editForm}
            setForm={setEditForm}
            onSave={() => onSave(puzzle.id)}
            onCancel={onCancelEdit}
            busy={busy}
          />
        ) : (
          <>
            <span className={`flex-1 text-sm truncate ${c("text-white/70", "text-gray-700")}`}>{puzzle.answer}</span>
            <span className={`text-xs ${c("text-white/20", "text-gray-400")}`}>{puzzle.category}</span>
            {isToday && (
              <button
                onClick={() => onEdit(puzzle)}
                className={`text-xs transition-colors ${c("text-white/25 hover:text-white/60", "text-gray-400 hover:text-gray-700")}`}
              >
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Gap indicator with fill action ──────────────────────────────
function GapIndicator({
  days,
  gapDate,
  queuedPuzzles,
  onFill,
  busy,
}: {
  days: number;
  gapDate: string;
  queuedPuzzles: PuzzleRow[];
  onFill: (puzzleId: number, date: string) => void;
  busy: boolean;
}) {
  const c = useThemeClass();
  const [showPicker, setShowPicker] = useState(false);
  const { shortDate } = formatDateSlot(gapDate);

  return (
    <div className="flex items-start gap-4">
      <div className="w-14 shrink-0 pt-2 text-right">
        <div className={`text-xs tabular-nums ${c("text-red-400/30", "text-red-300")}`}>{shortDate}</div>
      </div>
      <div className={`flex-1 border border-dashed ${c(
        "border-red-400/20 bg-red-400/[0.03]",
        "border-red-300 bg-red-50"
      )}`}>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className={`text-xs flex-1 ${c("text-red-400/50", "text-red-400")}`}>
            ⚠ {days} day{days > 1 ? "s" : ""} gap
          </span>
          {queuedPuzzles.length > 0 && (
            <button
              onClick={() => setShowPicker(!showPicker)}
              disabled={busy}
              className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 transition-colors disabled:opacity-40 ${c(
                "text-amber-400/60 hover:text-amber-400 border border-amber-400/20 hover:border-amber-400/40",
                "text-amber-600 hover:text-amber-700 border border-amber-300 hover:border-amber-400"
              )}`}
            >
              Fill
            </button>
          )}
        </div>
        {showPicker && queuedPuzzles.length > 0 && (
          <div className={`px-4 pb-3 flex flex-wrap gap-1.5`}>
            {queuedPuzzles.map((p) => (
              <button
                key={p.id}
                onClick={() => { onFill(p.id, gapDate); setShowPicker(false); }}
                disabled={busy}
                className={`text-xs px-2.5 py-1 transition-colors disabled:opacity-40 ${c(
                  "bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 hover:border-white/25",
                  "bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400"
                )}`}
              >
                {p.answer}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add puzzle row (+ button at bottom) ────────────────────────
function AddPuzzleRow({
  nextDate,
  queuedPuzzles,
  onAdd,
  busy,
}: {
  nextDate: string;
  queuedPuzzles: PuzzleRow[];
  onAdd: (puzzleId: number, date: string) => void;
  busy: boolean;
}) {
  const c = useThemeClass();
  const [showPicker, setShowPicker] = useState(false);
  const { dayOfWeek, shortDate } = formatDateSlot(nextDate);

  if (queuedPuzzles.length === 0) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="w-14 shrink-0 pt-3 text-right">
        {showPicker && (
          <>
            <div className={`text-[10px] font-semibold tracking-wider ${c("text-white/25", "text-gray-400")}`}>{dayOfWeek}</div>
            <div className={`text-xs tabular-nums ${c("text-white/15", "text-gray-300")}`}>{shortDate}</div>
          </>
        )}
      </div>
      <div className="flex-1">
        {!showPicker ? (
          <button
            onClick={() => setShowPicker(true)}
            disabled={busy}
            className={`w-full border border-dashed px-4 py-3 flex items-center justify-center transition-colors disabled:opacity-40 ${c(
              "border-white/10 hover:border-white/25 text-white/20 hover:text-white/50",
              "border-gray-200 hover:border-gray-400 text-gray-300 hover:text-gray-500"
            )}`}
          >
            <span className="text-lg leading-none">+</span>
          </button>
        ) : (
          <div className={`border border-dashed px-4 py-3 ${c(
            "border-white/15 bg-white/[0.02]",
            "border-gray-300 bg-gray-50"
          )}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs ${c("text-white/40", "text-gray-500")}`}>
                Add puzzle for {shortDate}
              </span>
              <button
                onClick={() => setShowPicker(false)}
                className={`text-xs transition-colors ${c("text-white/25 hover:text-white/50", "text-gray-400 hover:text-gray-600")}`}
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {queuedPuzzles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { onAdd(p.id, nextDate); setShowPicker(false); }}
                  disabled={busy}
                  className={`text-xs px-2.5 py-1 transition-colors disabled:opacity-40 ${c(
                    "bg-white/[0.04] border border-white/10 text-white/50 hover:text-white/80 hover:border-white/25",
                    "bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400"
                  )}`}
                >
                  {p.answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Inline edit form ─────────────────────────────────────────────
function EditRow({
  form,
  setForm,
  onSave,
  onCancel,
  busy,
  expanded = false,
}: {
  form: Partial<PuzzleRow>;
  setForm: (f: Partial<PuzzleRow>) => void;
  onSave: () => void;
  onCancel: () => void;
  busy: boolean;
  expanded?: boolean;
}) {
  const c = useThemeClass();
  const inputClass = `w-full px-3 py-1.5 text-sm focus:outline-none border ${c(
    "bg-white/5 border-white/10 text-white/80 focus:border-white/30",
    "bg-white border-gray-200 text-gray-800 focus:border-gray-400"
  )}`;

  return (
    <div className={`space-y-2 ${expanded ? "" : "flex-1"}`}>
      <div className="flex gap-2">
        <input
          className={inputClass + " flex-1"}
          value={form.answer ?? ""}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          placeholder="Answer"
        />
        <input
          className={inputClass + " w-40"}
          value={form.category ?? ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
        />
      </div>
      {(form.clues ?? []).map((clue, i) => (
        <input
          key={i}
          className={inputClass}
          value={clue}
          onChange={(e) => {
            const clues = [...(form.clues ?? [])];
            clues[i] = e.target.value;
            setForm({ ...form, clues });
          }}
          placeholder={`Clue ${i + 1}`}
        />
      ))}
      <input
        className={inputClass}
        value={(form.aliases ?? []).join(", ")}
        onChange={(e) =>
          setForm({
            ...form,
            aliases: e.target.value
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean),
          })
        }
        placeholder="Aliases (comma-separated)"
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={busy}
          className="px-3 py-1 text-xs font-semibold bg-green-600/80 text-white hover:bg-green-500 transition-colors disabled:opacity-40"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className={`px-3 py-1 text-xs transition-colors ${c("text-white/30 hover:text-white/60", "text-gray-400 hover:text-gray-700")}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main Calendar ────────────────────────────────────────────────
export default function AdminCalendar({
  initialScheduled,
  queuedPuzzles,
  onRefetch,
}: AdminCalendarProps) {
  const c = useThemeClass();
  const [scheduled, setScheduled] = useState<PuzzleRow[]>(initialScheduled);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<PuzzleRow>>({});
  const [busy, setBusy] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const supabase = createClient();
  const todayStr = fmt(new Date());

  // Split scheduled into past / today / future
  const pastPuzzles = useMemo(
    () => scheduled.filter((p) => p.date && p.date < todayStr),
    [scheduled, todayStr]
  );
  const todayPuzzle = useMemo(
    () => scheduled.find((p) => p.date === todayStr) ?? null,
    [scheduled, todayStr]
  );
  const futurePuzzles = useMemo(
    () => scheduled.filter((p) => p.date && p.date > todayStr),
    [scheduled, todayStr]
  );

  const daysOfCoverage = futurePuzzles.length + (todayPuzzle ? 1 : 0);

  // Detect gaps in future schedule (with first missing date for filling)
  const futureWithGaps = useMemo(() => {
    const items: { type: "puzzle" | "gap"; puzzle?: PuzzleRow; gapDays?: number; gapDate?: string }[] = [];
    for (let i = 0; i < futurePuzzles.length; i++) {
      const prevDate =
        i === 0
          ? todayPuzzle?.date ?? todayStr
          : futurePuzzles[i - 1].date!;
      const gap = daysBetween(prevDate, futurePuzzles[i].date!);
      if (gap > 1) {
        // First missing date in the gap
        const firstGap = new Date(prevDate + "T00:00:00");
        firstGap.setDate(firstGap.getDate() + 1);
        items.push({ type: "gap", gapDays: gap - 1, gapDate: fmt(firstGap) });
      }
      items.push({ type: "puzzle", puzzle: futurePuzzles[i] });
    }
    return items;
  }, [futurePuzzles, todayPuzzle, todayStr]);

  // Next available date (day after last scheduled, or tomorrow if empty)
  const nextDate = useMemo(() => {
    const lastDate =
      futurePuzzles.length > 0
        ? futurePuzzles[futurePuzzles.length - 1].date!
        : todayPuzzle?.date ?? todayStr;
    const d = new Date(lastDate + "T00:00:00");
    d.setDate(d.getDate() + 1);
    return fmt(d);
  }, [futurePuzzles, todayPuzzle, todayStr]);

  // ─── DnD sensors ───
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = futurePuzzles.findIndex((p) => p.id === active.id);
      const newIndex = futurePuzzles.findIndex((p) => p.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const dateSlots = futurePuzzles.map((p) => p.date);
      const reordered = arrayMove(futurePuzzles, oldIndex, newIndex);
      const updated = reordered.map((p, i) => ({ ...p, date: dateSlots[i] }));

      const changed = updated.filter(
        (p) => p.date !== futurePuzzles.find((f) => f.id === p.id)?.date
      );

      setScheduled([...pastPuzzles, ...(todayPuzzle ? [todayPuzzle] : []), ...updated]);

      if (changed.length === 0) return;

      setBusy(true);
      const results = await Promise.all(
        changed.map((p) =>
          supabase.from("puzzles").update({ date: p.date }).eq("id", p.id)
        )
      );

      const anyError = results.some((r) => r.error);
      if (anyError) await refetchScheduled();
      await onRefetch();
      setBusy(false);
    },
    [supabase, futurePuzzles, pastPuzzles, todayPuzzle, onRefetch]
  );

  // ─── Refetch (local fallback for error recovery) ───
  const refetchScheduled = useCallback(async () => {
    const { data } = await supabase
      .from("puzzles")
      .select("*")
      .eq("status", "approved")
      .order("date", { ascending: true });
    if (data) setScheduled(data);
  }, [supabase]);

  // ─── Unschedule ───
  const handleUnschedule = useCallback(
    async (puzzle: PuzzleRow) => {
      if (!confirm(`Unschedule "${puzzle.answer}" and shift remaining dates?`)) return;
      setBusy(true);

      const puzzleIndex = futurePuzzles.findIndex((p) => p.id === puzzle.id);
      if (puzzleIndex === -1) { setBusy(false); return; }

      const dateSlots = futurePuzzles.map((p) => p.date);
      const remaining = futurePuzzles.filter((p) => p.id !== puzzle.id);
      const shifted = remaining.map((p, i) => ({ ...p, date: dateSlots[i] }));

      setScheduled([...pastPuzzles, ...(todayPuzzle ? [todayPuzzle] : []), ...shifted]);

      const { error: unschedErr } = await supabase
        .from("puzzles")
        .update({ status: "queued", date: null })
        .eq("id", puzzle.id);

      if (unschedErr) {
        await refetchScheduled();
        setBusy(false);
        return;
      }

      const toUpdate = shifted.filter(
        (p) => p.date !== futurePuzzles.find((f) => f.id === p.id)?.date
      );

      if (toUpdate.length > 0) {
        const results = await Promise.all(
          toUpdate.map((p) =>
            supabase.from("puzzles").update({ date: p.date }).eq("id", p.id)
          )
        );
        if (results.some((r) => r.error)) await refetchScheduled();
      }

      await onRefetch();
      setBusy(false);
    },
    [supabase, futurePuzzles, pastPuzzles, todayPuzzle, refetchScheduled, onRefetch]
  );

  // ─── Edit handlers ───
  const startEdit = useCallback((puzzle: PuzzleRow) => {
    setEditingId(puzzle.id);
    setEditForm({
      answer: puzzle.answer,
      category: puzzle.category,
      clues: [...puzzle.clues],
      aliases: puzzle.aliases ? [...puzzle.aliases] : [],
    });
  }, []);

  const saveEdit = useCallback(
    async (id: number) => {
      setBusy(true);
      const { error } = await supabase
        .from("puzzles")
        .update({
          answer: editForm.answer,
          category: editForm.category,
          clues: editForm.clues,
          aliases: editForm.aliases?.length ? editForm.aliases : null,
        })
        .eq("id", id);

      if (!error) {
        setScheduled((list) =>
          list.map((p) =>
            p.id === id
              ? {
                  ...p,
                  answer: editForm.answer ?? p.answer,
                  category: editForm.category ?? p.category,
                  clues: (editForm.clues as string[]) ?? p.clues,
                  aliases: editForm.aliases?.length ? (editForm.aliases as string[]) : null,
                }
              : p
          )
        );
        setEditingId(null);
        await onRefetch();
      }
      setBusy(false);
    },
    [supabase, editForm, onRefetch]
  );

  const cancelEdit = useCallback(() => setEditingId(null), []);

  // ─── Fill a gap with a queued puzzle ───
  const handleFillGap = useCallback(
    async (puzzleId: number, date: string) => {
      setBusy(true);
      const { error } = await supabase
        .from("puzzles")
        .update({ status: "approved", date })
        .eq("id", puzzleId);
      if (!error) {
        await refetchScheduled();
        await onRefetch();
      }
      setBusy(false);
    },
    [supabase, refetchScheduled, onRefetch]
  );

  const activePuzzle = activeId ? futurePuzzles.find((p) => p.id === activeId) : null;

  return (
    <div className="space-y-10">
      {/* Stats bar */}
      <div className={`flex gap-6 text-sm ${c("text-white/40", "text-gray-500")}`}>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{scheduled.length}</strong> total
        </span>
        <span>
          <strong className={c("text-white/70", "text-gray-700")}>{daysOfCoverage}</strong> days of coverage
        </span>
        {futurePuzzles.length > 0 && (
          <span>
            through <strong className={c("text-white/70", "text-gray-700")}>
              {formatDateSlot(futurePuzzles[futurePuzzles.length - 1].date!).shortDate}
            </strong>
          </span>
        )}
      </div>

      {/* Schedule */}
      <section>
        {scheduled.length === 0 && (
          <p className={`text-sm ${c("text-white/20", "text-gray-400")}`}>
            No scheduled puzzles yet. Schedule puzzles from the Library tab.
          </p>
        )}

        <div className="space-y-1">
          {pastPuzzles.map((p) => (
            <StaticRow
              key={p.id}
              puzzle={p}
              isToday={false}
              editingId={editingId}
              onEdit={startEdit}
              editForm={editForm}
              setEditForm={setEditForm}
              onSave={saveEdit}
              onCancelEdit={cancelEdit}
              busy={busy}
            />
          ))}

          {todayPuzzle && (
            <StaticRow
              key={todayPuzzle.id}
              puzzle={todayPuzzle}
              isToday={true}
              editingId={editingId}
              onEdit={startEdit}
              editForm={editForm}
              setEditForm={setEditForm}
              onSave={saveEdit}
              onCancelEdit={cancelEdit}
              busy={busy}
            />
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={futurePuzzles.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {futureWithGaps.map((item, i) =>
                item.type === "gap" ? (
                  <GapIndicator
                    key={`gap-${i}`}
                    days={item.gapDays!}
                    gapDate={item.gapDate!}
                    queuedPuzzles={queuedPuzzles}
                    onFill={handleFillGap}
                    busy={busy}
                  />
                ) : (
                  <SortableRow
                    key={item.puzzle!.id}
                    puzzle={item.puzzle!}
                    editingId={editingId}
                    onEdit={startEdit}
                    onUnschedule={handleUnschedule}
                    editForm={editForm}
                    setEditForm={setEditForm}
                    onSave={saveEdit}
                    onCancelEdit={cancelEdit}
                    busy={busy}
                    disabled={!!editingId || busy}
                  />
                )
              )}
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activePuzzle && (
                <div className={`flex items-center gap-3 border px-4 py-3 shadow-xl ${c(
                  "border-white/30 bg-[#141418] shadow-black/60 ring-1 ring-white/10",
                  "border-gray-300 bg-white shadow-gray-300/50 ring-1 ring-gray-200"
                )}`}>
                  <span className={c("text-white/25", "text-gray-300")}><GripIcon /></span>
                  <span className={`flex-1 text-sm font-medium ${c("text-white/90", "text-gray-900")}`}>{activePuzzle.answer}</span>
                  <span className={`text-xs ${c("text-white/35", "text-gray-400")}`}>{activePuzzle.category}</span>
                </div>
              )}
            </DragOverlay>
          </DndContext>

          <AddPuzzleRow
            nextDate={nextDate}
            queuedPuzzles={queuedPuzzles}
            onAdd={handleFillGap}
            busy={busy}
          />
        </div>
      </section>
    </div>
  );
}
