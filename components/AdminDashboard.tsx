"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

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

export default function AdminDashboard({
  initialScheduled,
  initialQueued,
}: AdminDashboardProps) {
  const [scheduled, setScheduled] = useState<PuzzleRow[]>(initialScheduled);
  const [queued, setQueued] = useState<PuzzleRow[]>(initialQueued);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<PuzzleRow>>({});
  const [busy, setBusy] = useState(false);

  const supabase = createClient();

  // Find the next available date after the last scheduled puzzle
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

  // Approve a queued puzzle — assign next date, set status
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
        setScheduled((s) => [...s, approved].sort((a, b) => (a.date ?? "").localeCompare(b.date ?? "")));
      }
      setBusy(false);
    },
    [supabase, getNextDate]
  );

  // Delete a queued puzzle
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

  // Start editing
  const startEdit = useCallback((puzzle: PuzzleRow) => {
    setEditingId(puzzle.id);
    setEditForm({
      answer: puzzle.answer,
      category: puzzle.category,
      clues: [...puzzle.clues],
      aliases: puzzle.aliases ? [...puzzle.aliases] : [],
    });
  }, []);

  // Save edit
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

  const todayStr = fmt(new Date());
  const futurePuzzles = scheduled.filter((p) => p.date && p.date >= todayStr);
  const daysOfCoverage = futurePuzzles.length;

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
        <div className="space-y-1">
          {scheduled.length === 0 && (
            <p className="text-sm text-white/20">No scheduled puzzles yet.</p>
          )}
          {scheduled.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-4 border border-white/10 px-4 py-3 ${
                p.date && p.date < todayStr ? "opacity-40" : ""
              }`}
            >
              <span className="w-24 shrink-0 text-xs text-white/30 tabular-nums">
                {p.date}
              </span>
              {editingId === p.id ? (
                <EditRow
                  form={editForm}
                  setForm={setEditForm}
                  onSave={() => saveEdit(p.id)}
                  onCancel={() => setEditingId(null)}
                  busy={busy}
                />
              ) : (
                <>
                  <span className="flex-1 text-sm text-white/70 truncate">
                    {p.answer}
                  </span>
                  <span className="text-xs text-white/20">{p.category}</span>
                  <button
                    onClick={() => startEdit(p)}
                    className="text-xs text-white/25 hover:text-white/60 transition-colors"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
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
                  onCancel={() => setEditingId(null)}
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
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      disabled={busy}
                      className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-white/15 text-white/40 hover:text-white/70 hover:border-white/30 transition-colors disabled:opacity-40"
                    >
                      ✎ Edit
                    </button>
                    <button
                      onClick={() => handleCut(p.id)}
                      disabled={busy}
                      className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-400/60 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      ✗ Cut
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

// Inline edit form
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
      {(expanded || true) &&
        (form.clues ?? []).map((clue, i) => (
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

function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
