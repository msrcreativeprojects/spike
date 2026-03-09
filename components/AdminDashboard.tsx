"use client";

import { useState, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface PuzzleRow {
  id: number;
  date: string | null;
  answer: string;
  category: string;
  clues: string[];
  aliases: string[] | null;
  status: string;
  created_at: string;
}

interface AdminDashboardProps {
  initialScheduled: PuzzleRow[];
  initialQueued: PuzzleRow[];
}

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

// ─── Grip icon (6-dot drag handle) ───
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

// ─── Sortable row for future puzzles ───
function SortableRow({
  puzzle,
  editingId,
  onEdit,
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
  editForm: Partial<PuzzleRow>;
  setEditForm: (f: Partial<PuzzleRow>) => void;
  onSave: (id: number) => void;
  onCancelEdit: () => void;
  busy: boolean;
  disabled: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: puzzle.id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  const { dayOfWeek, shortDate } = formatDateSlot(puzzle.date!);
  const isEditing = editingId === puzzle.id;

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-4">
      {/* Date column */}
      <div className="w-14 shrink-0 pt-3 text-right">
        <div className="text-[10px] font-semibold tracking-wider text-white/35">{dayOfWeek}</div>
        <div className="text-xs text-white/20 tabular-nums">{shortDate}</div>
      </div>

      {/* Puzzle card */}
      <div className={`flex-1 flex items-center gap-3 border px-4 py-3 transition-colors ${
        isDragging ? "border-white/25 bg-white/[0.06]" : "border-white/10 hover:border-white/15"
      }`}>
        {!isEditing && !disabled && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-white/15 hover:text-white/40 transition-colors touch-none shrink-0"
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
            <span className="flex-1 text-sm text-white/70 truncate">{puzzle.answer}</span>
            <span className="text-xs text-white/20">{puzzle.category}</span>
            <button
              onClick={() => onEdit(puzzle)}
              className="text-xs text-white/25 hover:text-white/60 transition-colors"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Static row for past/today puzzles ───
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
  const { dayOfWeek, shortDate } = formatDateSlot(puzzle.date!);
  const isEditing = editingId === puzzle.id;

  return (
    <div className={`flex items-start gap-4 ${isToday ? "" : "opacity-40"}`}>
      {/* Date column */}
      <div className="w-14 shrink-0 pt-3 text-right">
        <div className={`text-[10px] font-semibold tracking-wider ${isToday ? "text-white/50" : "text-white/35"}`}>
          {dayOfWeek}
        </div>
        <div className="text-xs text-white/20 tabular-nums">{shortDate}</div>
        {isToday && (
          <div className="text-[9px] text-white/30 uppercase tracking-widest mt-0.5">live</div>
        )}
      </div>

      {/* Puzzle card */}
      <div className="flex-1 flex items-center gap-3 border border-white/10 px-4 py-3">
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
            <span className="flex-1 text-sm text-white/70 truncate">{puzzle.answer}</span>
            <span className="text-xs text-white/20">{puzzle.category}</span>
            {isToday && (
              <button
                onClick={() => onEdit(puzzle)}
                className="text-xs text-white/25 hover:text-white/60 transition-colors"
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

// ─── Main dashboard ───
export default function AdminDashboard({
  initialScheduled,
  initialQueued,
}: AdminDashboardProps) {
  const [scheduled, setScheduled] = useState<PuzzleRow[]>(initialScheduled);
  const [queued, setQueued] = useState<PuzzleRow[]>(initialQueued);
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

  // ─── DnD sensors ───
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
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

      // Capture fixed date slots
      const dateSlots = futurePuzzles.map((p) => p.date);

      // Reorder puzzles, reassign dates
      const reordered = arrayMove(futurePuzzles, oldIndex, newIndex);
      const updated = reordered.map((p, i) => ({ ...p, date: dateSlots[i] }));

      // Find which puzzles actually changed
      const changed = updated.filter(
        (p) => p.date !== futurePuzzles.find((f) => f.id === p.id)?.date
      );

      // Optimistic UI update
      setScheduled([...pastPuzzles, ...(todayPuzzle ? [todayPuzzle] : []), ...updated]);

      if (changed.length === 0) return;

      // Persist to Supabase
      setBusy(true);
      const results = await Promise.all(
        changed.map((p) =>
          supabase.from("puzzles").update({ date: p.date }).eq("id", p.id)
        )
      );

      const anyError = results.some((r) => r.error);
      if (anyError) {
        // Rollback: refetch from server
        const { data } = await supabase
          .from("puzzles")
          .select("*")
          .eq("status", "approved")
          .order("date", { ascending: true });
        if (data) setScheduled(data);
      }
      setBusy(false);
    },
    [supabase, futurePuzzles, pastPuzzles, todayPuzzle]
  );

  // ─── Other handlers (unchanged) ───
  const getNextDate = useCallback((): string => {
    if (scheduled.length === 0) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return fmt(tomorrow);
    }
    const lastDate = new Date(scheduled[scheduled.length - 1].date + "T00:00:00");
    lastDate.setDate(lastDate.getDate() + 1);
    return fmt(lastDate);
  }, [scheduled]);

  const handleApprove = useCallback(
    async (puzzle: PuzzleRow) => {
      setBusy(true);
      const date = getNextDate();
      const { error } = await supabase
        .from("puzzles")
        .update({ status: "approved", date })
        .eq("id", puzzle.id);

      if (!error) {
        const approved = { ...puzzle, status: "approved", date };
        setQueued((q) => q.filter((p) => p.id !== puzzle.id));
        setScheduled((s) =>
          [...s, approved].sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""))
        );
      }
      setBusy(false);
    },
    [supabase, getNextDate]
  );

  const handleCut = useCallback(
    async (id: number) => {
      setBusy(true);
      const { error } = await supabase.from("puzzles").delete().eq("id", id);
      if (!error) {
        setQueued((q) => q.filter((p) => p.id !== id));
      }
      setBusy(false);
    },
    [supabase]
  );

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
        const updateList = (list: PuzzleRow[]) =>
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
          );
        setScheduled(updateList);
        setQueued(updateList);
        setEditingId(null);
      }
      setBusy(false);
    },
    [supabase, editForm]
  );

  const cancelEdit = useCallback(() => setEditingId(null), []);

  // The puzzle currently being dragged (for overlay)
  const activePuzzle = activeId ? futurePuzzles.find((p) => p.id === activeId) : null;

  return (
    <div className="space-y-10">
      {/* Stats bar */}
      <div className="flex gap-6 text-sm text-white/40">
        <span>
          <strong className="text-white/70">{scheduled.length}</strong> scheduled
        </span>
        <span>
          <strong className="text-white/70">{queued.length}</strong> in queue
        </span>
        <span>
          <strong className="text-white/70">{daysOfCoverage}</strong> days of coverage
        </span>
      </div>

      {/* Scheduled section */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[3px] text-white/35 mb-4">
          Scheduled
        </h2>

        {scheduled.length === 0 && (
          <p className="text-sm text-white/20">No scheduled puzzles yet.</p>
        )}

        <div className="space-y-1">
          {/* Past puzzles (static, dimmed) */}
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

          {/* Today's puzzle (static, full opacity, LIVE badge) */}
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

          {/* Future puzzles (draggable) */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={futurePuzzles.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {futurePuzzles.map((p) => (
                <SortableRow
                  key={p.id}
                  puzzle={p}
                  editingId={editingId}
                  onEdit={startEdit}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  onSave={saveEdit}
                  onCancelEdit={cancelEdit}
                  busy={busy}
                  disabled={!!editingId || busy}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {activePuzzle && (
                <div className="flex items-center gap-3 border border-white/25 bg-[#0a0a0c] px-4 py-3 shadow-lg shadow-black/50">
                  <span className="text-white/20"><GripIcon /></span>
                  <span className="flex-1 text-sm text-white/80">{activePuzzle.answer}</span>
                  <span className="text-xs text-white/30">{activePuzzle.category}</span>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </section>

      {/* Queue section */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[3px] text-white/35 mb-4">
          Review Queue
        </h2>
        {queued.length === 0 && (
          <p className="text-sm text-white/20">Queue is empty. Generate more puzzles!</p>
        )}
        <div className="space-y-4">
          {queued.map((p) => (
            <div
              key={p.id}
              className="border border-white/10 bg-white/[0.02] p-5 space-y-3"
            >
              {editingId === p.id ? (
                <EditRow
                  form={editForm}
                  setForm={setEditForm}
                  onSave={() => saveEdit(p.id)}
                  onCancel={cancelEdit}
                  busy={busy}
                  expanded
                />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white/80">
                      {p.answer}
                    </h3>
                    <span className="text-xs text-white/25">{p.category}</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-white/40">
                    {p.clues.map((clue, i) => (
                      <li key={i}>{clue}</li>
                    ))}
                  </ol>
                  {p.aliases && p.aliases.length > 0 && (
                    <p className="text-xs text-white/20">
                      Aliases: {p.aliases.join(", ")}
                    </p>
                  )}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => handleApprove(p)}
                      disabled={busy}
                      className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-green-600/80 text-white hover:bg-green-500 transition-colors disabled:opacity-40"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      disabled={busy}
                      className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-white/15 text-white/40 hover:text-white/70 hover:border-white/30 transition-colors disabled:opacity-40"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCut(p.id)}
                      disabled={busy}
                      className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      Cut
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Inline edit form (unchanged) ───
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
  const inputClass =
    "w-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white/80 focus:border-white/30 focus:outline-none";

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
          className="px-3 py-1 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
