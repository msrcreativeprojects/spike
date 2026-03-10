"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useThemeClass } from "@/lib/adminTheme";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

interface ShowInfo {
  name: string;
  category: string;
  hasExisting: boolean;
}

interface ClueRow {
  id: number;
  show_name: string;
  category: string;
  level: number;
  clue_text: string;
  clue_type: string | null;
  specificity: string | null;
  notes: string | null;
  used: boolean;
}

interface PickedClue {
  text: string;
  bankId: number | null;
  clueType: string | null;
}

// Stable IDs for the 5 sortable slots
const SLOT_IDS = ["slot-0", "slot-1", "slot-2", "slot-3", "slot-4"];

function GripIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <circle cx="4" cy="2" r="1" /><circle cx="8" cy="2" r="1" />
      <circle cx="4" cy="6" r="1" /><circle cx="8" cy="6" r="1" />
      <circle cx="4" cy="10" r="1" /><circle cx="8" cy="10" r="1" />
    </svg>
  );
}

/* ─── Sortable Slot ─── */
function SortableSlot({
  slotId,
  index,
  clue,
  isEditing,
  editText,
  onEditStart,
  onEditChange,
  onEditSave,
  onEditCancel,
  onRemove,
}: {
  slotId: string;
  index: number;
  clue: PickedClue | null;
  isEditing: boolean;
  editText: string;
  onEditStart: () => void;
  onEditChange: (v: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onRemove: () => void;
}) {
  const c = useThemeClass();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slotId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  if (!clue) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-3 px-4 py-3 border border-dashed ${c(
          "border-white/10 bg-white/[0.01]",
          "border-gray-200 bg-gray-50/50"
        )}`}
      >
        <span className={`text-xs font-semibold w-5 ${c("text-white/15", "text-gray-300")}`}>
          {index + 1}
        </span>
        <span className={`text-sm italic ${c("text-white/15", "text-gray-300")}`}>
          Click a clue below to fill
        </span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 border transition-colors ${
        isDragging
          ? c("border-dashed border-white/15 bg-white/[0.02]", "border-dashed border-gray-300 bg-gray-50")
          : c("border-white/10 bg-white/[0.03] hover:border-white/20", "border-gray-200 bg-white hover:border-gray-300")
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className={`cursor-grab active:cursor-grabbing transition-colors touch-none shrink-0 ${c(
          "text-white/15 hover:text-white/40",
          "text-gray-300 hover:text-gray-500"
        )}`}
        aria-label="Drag to reorder"
      >
        <GripIcon />
      </button>

      <span className={`text-xs font-semibold w-5 shrink-0 ${c("text-green-400/70", "text-green-600")}`}>
        {index + 1}
      </span>

      {isEditing ? (
        <div className="flex-1 space-y-2">
          <textarea
            value={editText}
            onChange={e => onEditChange(e.target.value)}
            className={`w-full px-3 py-2 text-sm focus:outline-none resize-none border ${c(
              "bg-white/5 border-white/10 text-white/80 focus:border-white/30",
              "bg-gray-50 border-gray-200 text-gray-800 focus:border-gray-400"
            )}`}
            rows={2}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={onEditSave}
              className={`px-3 py-1 text-xs ${c(
                "bg-green-600/80 text-white hover:bg-green-500",
                "bg-green-600 text-white hover:bg-green-500"
              )}`}
            >
              Save
            </button>
            <button
              onClick={onEditCancel}
              className={`px-3 py-1 text-xs ${c(
                "text-white/30 hover:text-white/60",
                "text-gray-400 hover:text-gray-700"
              )}`}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <span
          className={`flex-1 text-sm cursor-pointer ${c("text-white/60 hover:text-white/80", "text-gray-600 hover:text-gray-900")}`}
          onClick={onEditStart}
          title="Click to edit"
        >
          {clue.text}
        </span>
      )}

      {!isEditing && (
        <>
          {clue.clueType && (
            <span className={`text-[10px] px-1.5 py-0.5 shrink-0 border ${c(
              "border-white/10 text-white/20",
              "border-gray-200 text-gray-400"
            )}`}>
              {clue.clueType}
            </span>
          )}
          {clue.bankId === null && (
            <span className={`text-[10px] italic shrink-0 ${c("text-white/20", "text-gray-400")}`}>
              edited
            </span>
          )}
          <button
            onClick={onRemove}
            className={`text-xs shrink-0 transition-colors ${c(
              "text-red-400/40 hover:text-red-400/80",
              "text-red-400 hover:text-red-600"
            )}`}
            title="Remove from slot"
          >
            x
          </button>
        </>
      )}
    </div>
  );
}

/* ─── Main Builder ─── */
export default function PuzzleBuilder({ shows: initialShows }: { shows: ShowInfo[] }) {
  const supabase = createClient();
  const c = useThemeClass();

  const [shows, setShows] = useState<ShowInfo[]>(initialShows);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("Broadway Musical");
  const [clues, setClues] = useState<ClueRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [aliases, setAliases] = useState("");

  // Pick-5 state
  const [picked, setPicked] = useState<(PickedClue | null)[]>([null, null, null, null, null]);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // DnD state
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  // Fetch clues when show selected
  useEffect(() => {
    if (!selectedShow) return;
    setLoading(true);
    setPicked([null, null, null, null, null]);
    setEditingSlot(null);
    setTypeFilter("All");
    setSaveMessage(null);
    setAliases("");

    supabase
      .from("clue_bank")
      .select("*")
      .eq("show_name", selectedShow)
      .order("id")
      .then(({ data }) => {
        setClues(data ?? []);
        setLoading(false);
      });

    const showInfo = shows.find(s => s.name === selectedShow);
    if (showInfo) setSelectedCategory(showInfo.category);
  }, [selectedShow]);

  // Set of picked bankIds for graying out pool items
  const pickedBankIds = useMemo(() => {
    const ids = new Set<number>();
    for (const p of picked) {
      if (p?.bankId != null) ids.add(p.bankId);
    }
    return ids;
  }, [picked]);

  // Unique clue types for filter
  const clueTypes = useMemo(() => {
    const types = new Set<string>();
    for (const cl of clues) {
      if (cl.clue_type) types.add(cl.clue_type);
    }
    const sorted = Array.from(types).sort();
    return ["All", ...sorted];
  }, [clues]);

  // Filtered pool
  const pool = useMemo(() => {
    let list = clues;
    if (typeFilter !== "All") {
      list = list.filter(cl => cl.clue_type === typeFilter);
    }
    return list;
  }, [clues, typeFilter]);

  // First empty slot index
  const firstEmptySlot = picked.findIndex(p => p === null);
  const allFilled = picked.every(p => p !== null);

  const handlePickClue = useCallback((clue: ClueRow) => {
    const emptyIdx = picked.findIndex(p => p === null);
    if (emptyIdx === -1) return; // all full
    // Don't pick if already picked
    if (clue.id && pickedBankIds.has(clue.id)) return;

    setPicked(prev => {
      const next = [...prev];
      next[emptyIdx] = {
        text: clue.clue_text,
        bankId: clue.id,
        clueType: clue.clue_type,
      };
      return next;
    });
  }, [picked, pickedBankIds]);

  const handleRemoveSlot = useCallback((idx: number) => {
    setPicked(prev => {
      // Remove item at idx, shift remaining up, pad with null
      const filled = prev.filter((_, i) => i !== idx).filter(Boolean);
      const next: (PickedClue | null)[] = [...filled];
      while (next.length < 5) next.push(null);
      return next;
    });
    if (editingSlot === idx) setEditingSlot(null);
  }, [editingSlot]);

  const handleEditStart = useCallback((idx: number) => {
    const clue = picked[idx];
    if (!clue) return;
    setEditingSlot(idx);
    setEditingText(clue.text);
  }, [picked]);

  const handleEditSave = useCallback(() => {
    if (editingSlot === null) return;
    setPicked(prev => {
      const next = [...prev];
      const existing = next[editingSlot];
      if (existing) {
        next[editingSlot] = {
          ...existing,
          text: editingText,
          bankId: editingText !== existing.text ? null : existing.bankId,
        };
      }
      return next;
    });
    setEditingSlot(null);
  }, [editingSlot, editingText]);

  const handleEditCancel = useCallback(() => {
    setEditingSlot(null);
  }, []);

  // DnD handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveSlotId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveSlotId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = SLOT_IDS.indexOf(active.id as string);
    const newIndex = SLOT_IDS.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    setPicked(prev => arrayMove(prev, oldIndex, newIndex) as (PickedClue | null)[]);
  }, []);

  // Save puzzle
  const handleSave = async () => {
    if (!allFilled || !selectedShow) return;
    setSaving(true);
    setSaveMessage(null);

    const clueTexts = picked.map(p => p!.text);
    const aliasArr = aliases.split(",").map(a => a.trim()).filter(Boolean);

    const { error } = await supabase.from("puzzles").insert({
      answer: selectedShow,
      category: selectedCategory,
      clues: clueTexts,
      aliases: aliasArr.length > 0 ? aliasArr : null,
      status: "queued",
    });

    if (error) {
      setSaveMessage(`Error: ${error.message}`);
      setSaving(false);
      return;
    }

    // Mark used clues
    const usedIds = picked
      .map(p => p?.bankId)
      .filter((id): id is number => id != null);

    if (usedIds.length > 0) {
      await supabase
        .from("clue_bank")
        .update({ used: true })
        .in("id", usedIds);
    }

    setSaveMessage("Saved to queue!");
    setSaving(false);

    setShows(prev => prev.map(s =>
      s.name === selectedShow ? { ...s, hasExisting: true } : s
    ));

    setTimeout(() => {
      setPicked([null, null, null, null, null]);
      setEditingSlot(null);
      setAliases("");
      setSaveMessage(null);
      const filtered = shows.filter(s =>
        !s.hasExisting && s.name !== selectedShow &&
        (categoryFilter === "All" || s.category === categoryFilter)
      );
      if (filtered.length > 0) {
        setSelectedShow(filtered[0].name);
      }
    }, 1500);
  };

  // Category/show filtering (unchanged)
  const categories = useMemo(() => {
    const cats = Array.from(new Set(shows.map(s => s.category)));
    cats.sort();
    return ["All", ...cats];
  }, [shows]);

  const filteredShows = useMemo(() => {
    if (categoryFilter === "All") return shows;
    return shows.filter(s => s.category === categoryFilter);
  }, [shows, categoryFilter]);

  const nextUnbuilt = filteredShows.find(s => !s.hasExisting);

  // Drag overlay content
  const activeSlotIndex = activeSlotId ? SLOT_IDS.indexOf(activeSlotId) : -1;
  const activeClue = activeSlotIndex >= 0 ? picked[activeSlotIndex] : null;

  return (
    <div className="space-y-8">
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => {
          const count = cat === "All"
            ? shows.filter(s => !s.hasExisting).length
            : shows.filter(s => s.category === cat && !s.hasExisting).length;
          const total = cat === "All" ? shows.length : shows.filter(s => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setSelectedShow(null);
              }}
              className={`px-3 py-1.5 text-xs transition-colors border ${
                categoryFilter === cat
                  ? c("border-white/30 bg-white/10 text-white/80", "border-gray-400 bg-gray-200 text-gray-800")
                  : c("border-white/10 text-white/30 hover:text-white/60 hover:border-white/20", "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300")
              }`}
            >
              {cat}{" "}
              <span className={c("text-white/20", "text-gray-400")}>{count}/{total}</span>
            </button>
          );
        })}
      </div>

      {/* Show picker */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className={`text-xs uppercase tracking-wider block mb-2 ${c("text-white/30", "text-gray-500")}`}>
            Show
          </label>
          <select
            value={selectedShow ?? ""}
            onChange={e => setSelectedShow(e.target.value || null)}
            className={`w-full px-4 py-2.5 text-sm focus:outline-none appearance-none ${c(
              "bg-white/5 border border-white/10 text-white/80 focus:border-white/30",
              "bg-gray-50 border border-gray-200 text-gray-800 focus:border-gray-400"
            )}`}
          >
            <option value="">Select a show...</option>
            <optgroup label="Needs Puzzle">
              {filteredShows.filter(s => !s.hasExisting).map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </optgroup>
            <optgroup label="Already Has Puzzle">
              {filteredShows.filter(s => s.hasExisting).map(s => (
                <option key={s.name} value={s.name}>{s.name} ✓</option>
              ))}
            </optgroup>
          </select>
        </div>
        {nextUnbuilt && (
          <button
            onClick={() => setSelectedShow(nextUnbuilt.name)}
            className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-colors whitespace-nowrap ${c(
              "border-white/15 text-white/40 hover:text-white/70 hover:border-white/30",
              "border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
            )}`}
          >
            Next Unbuilt →
          </button>
        )}
      </div>

      {loading && (
        <p className={`text-sm animate-pulse ${c("text-white/30", "text-gray-400")}`}>Loading clues...</p>
      )}

      {selectedShow && !loading && clues.length > 0 && (
        <div className="space-y-6">
          {/* ── Picked Clues (5 DnD slots) ── */}
          <div className={`p-5 space-y-2 border ${c(
            "border-white/15 bg-white/[0.02]",
            "border-gray-300 bg-gray-50"
          )}`}>
            <h3 className={`text-xs font-semibold uppercase tracking-[3px] mb-3 ${c("text-white/25", "text-gray-400")}`}>
              Picked Clues
            </h3>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={SLOT_IDS} strategy={verticalListSortingStrategy}>
                <div className="space-y-1">
                  {SLOT_IDS.map((id, idx) => (
                    <SortableSlot
                      key={id}
                      slotId={id}
                      index={idx}
                      clue={picked[idx]}
                      isEditing={editingSlot === idx}
                      editText={editingText}
                      onEditStart={() => handleEditStart(idx)}
                      onEditChange={setEditingText}
                      onEditSave={handleEditSave}
                      onEditCancel={handleEditCancel}
                      onRemove={() => handleRemoveSlot(idx)}
                    />
                  ))}
                </div>
              </SortableContext>

              <DragOverlay dropAnimation={null}>
                {activeClue && (
                  <div className={`flex items-center gap-3 px-4 py-3 border shadow-lg ${c(
                    "border-white/25 bg-[#141418] text-white/80",
                    "border-gray-400 bg-white text-gray-800 shadow-gray-300"
                  )}`}>
                    <GripIcon />
                    <span className={`text-xs font-semibold w-5 ${c("text-green-400/70", "text-green-600")}`}>
                      {activeSlotIndex + 1}
                    </span>
                    <span className="flex-1 text-sm truncate">{activeClue.text}</span>
                  </div>
                )}
              </DragOverlay>
            </DndContext>

            {/* Aliases + Save row */}
            <div className="flex items-center gap-3 pt-3">
              <input
                value={aliases}
                onChange={e => setAliases(e.target.value)}
                className={`flex-1 px-4 py-2 text-sm focus:outline-none border ${c(
                  "bg-white/5 border-white/10 text-white/80 focus:border-white/30",
                  "bg-white border-gray-200 text-gray-800 focus:border-gray-400"
                )}`}
                placeholder="Aliases (comma-separated, e.g. phantom, poto)"
              />
              <button
                onClick={handleSave}
                disabled={!allFilled || saving}
                className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors disabled:opacity-30 shrink-0 ${c(
                  "bg-green-600/80 hover:bg-green-500",
                  "bg-green-600 hover:bg-green-500"
                )}`}
              >
                {saving ? "Saving..." : "Save to Queue"}
              </button>
            </div>

            {saveMessage && (
              <p className={`text-sm text-center pt-1 ${saveMessage.startsWith("Error") ? c("text-red-400", "text-red-600") : c("text-green-400", "text-green-600")}`}>
                {saveMessage}
              </p>
            )}
          </div>

          {/* ── Clue Pool ── */}
          <div className={`p-5 space-y-3 border ${c(
            "border-white/10 bg-white/[0.01]",
            "border-gray-200 bg-white"
          )}`}>
            <h3 className={`text-xs font-semibold uppercase tracking-[3px] mb-1 ${c("text-white/25", "text-gray-400")}`}>
              Clue Pool
              <span className={`ml-2 font-normal tracking-normal ${c("text-white/15", "text-gray-300")}`}>
                {pool.length} clues
              </span>
            </h3>

            {/* Type filter pills */}
            <div className="flex flex-wrap gap-1.5">
              {clueTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-2 py-1 text-[10px] transition-colors border ${
                    typeFilter === type
                      ? c("border-white/30 bg-white/10 text-white/70", "border-gray-400 bg-gray-200 text-gray-700")
                      : c("border-white/[0.06] text-white/20 hover:text-white/40 hover:border-white/15", "border-gray-100 text-gray-400 hover:text-gray-600 hover:border-gray-300")
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Clue list */}
            <div className="space-y-0.5 max-h-[60vh] overflow-y-auto">
              {pool.map(clue => {
                const isPicked = pickedBankIds.has(clue.id);
                return (
                  <button
                    key={clue.id}
                    onClick={() => handlePickClue(clue)}
                    disabled={isPicked || allFilled}
                    className={`w-full text-left flex items-start gap-3 px-3 py-2 transition-colors ${
                      isPicked
                        ? c("text-white/10 line-through cursor-default", "text-gray-300 line-through cursor-default")
                        : allFilled
                          ? c("text-white/20 cursor-default", "text-gray-400 cursor-default")
                          : c("text-white/50 hover:text-white/80 hover:bg-white/5 cursor-pointer", "text-gray-600 hover:text-gray-900 hover:bg-gray-50 cursor-pointer")
                    }`}
                  >
                    <span className="flex-1 text-xs leading-relaxed">{clue.clue_text}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      {clue.clue_type && (
                        <span className={`text-[10px] px-1.5 py-0.5 border ${c(
                          "border-white/[0.06] text-white/15",
                          "border-gray-100 text-gray-300"
                        )}`}>
                          {clue.clue_type}
                        </span>
                      )}
                      {clue.used && (
                        <span className={`text-[10px] ${c("text-yellow-400/40", "text-yellow-600/60")}`}>used</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedShow && !loading && clues.length === 0 && (
        <p className={`text-sm ${c("text-white/30", "text-gray-400")}`}>No clues found for this show in the clue bank.</p>
      )}
    </div>
  );
}
