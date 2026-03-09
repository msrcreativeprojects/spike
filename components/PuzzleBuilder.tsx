"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useThemeClass } from "@/lib/adminTheme";

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

interface LockedClue {
  text: string;
  bankId: number | null; // null if edited/custom
}

export default function PuzzleBuilder({ shows: initialShows }: { shows: ShowInfo[] }) {
  const supabase = createClient();
  const c = useThemeClass();

  const [shows, setShows] = useState<ShowInfo[]>(initialShows);
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("Broadway Musical");
  const [clues, setClues] = useState<ClueRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeLevel, setActiveLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState<Record<number, number>>({1:0, 2:0, 3:0, 4:0, 5:0});
  const [lockedClues, setLockedClues] = useState<Record<number, LockedClue>>({});
  const [editText, setEditText] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [aliases, setAliases] = useState("");

  // Fetch clues when show selected
  useEffect(() => {
    if (!selectedShow) return;
    setLoading(true);
    setLockedClues({});
    setActiveLevel(1);
    setCurrentIndex({1:0, 2:0, 3:0, 4:0, 5:0});
    setEditText({});
    setSaveMessage(null);

    supabase
      .from("clue_bank")
      .select("*")
      .eq("show_name", selectedShow)
      .order("level")
      .order("id")
      .then(({ data }) => {
        setClues(data ?? []);
        // Initialize edit text with first clue for each level
        const initial: Record<number, string> = {};
        for (let lvl = 1; lvl <= 5; lvl++) {
          const levelClues = (data ?? []).filter(c => c.level === lvl);
          if (levelClues.length > 0) initial[lvl] = levelClues[0].clue_text;
        }
        setEditText(initial);
        setLoading(false);
      });

    // Set category from show info
    const showInfo = shows.find(s => s.name === selectedShow);
    if (showInfo) setSelectedCategory(showInfo.category);
  }, [selectedShow]);

  const getCluesForLevel = (level: number) => clues.filter(c => c.level === level);
  const facts = clues.filter(c => c.level === 0);

  const handleCycle = (level: number, dir: number) => {
    const levelClues = getCluesForLevel(level);
    if (levelClues.length === 0) return;
    const newIdx = (currentIndex[level] + dir + levelClues.length) % levelClues.length;
    setCurrentIndex(prev => ({ ...prev, [level]: newIdx }));
    setEditText(prev => ({ ...prev, [level]: levelClues[newIdx].clue_text }));
  };

  const handleLock = (level: number) => {
    const levelClues = getCluesForLevel(level);
    const currentClue = levelClues[currentIndex[level]];
    const text = editText[level] ?? currentClue?.clue_text ?? "";
    const isEdited = currentClue && text !== currentClue.clue_text;

    setLockedClues(prev => ({
      ...prev,
      [level]: {
        text,
        bankId: isEdited ? null : (currentClue?.id ?? null),
      }
    }));

    // Move to next unlocked level
    if (level < 5) {
      setActiveLevel(level + 1);
    }
  };

  const handleUnlock = (level: number) => {
    setLockedClues(prev => {
      const next = { ...prev };
      delete next[level];
      return next;
    });
    setActiveLevel(level);
  };

  const allLocked = [1,2,3,4,5].every(l => lockedClues[l]);

  const handleSave = async () => {
    if (!allLocked || !selectedShow) return;
    setSaving(true);
    setSaveMessage(null);

    const clueTexts = [1,2,3,4,5].map(l => lockedClues[l].text);
    const aliasArr = aliases.split(",").map(a => a.trim()).filter(Boolean);

    // Insert puzzle
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
    const usedIds = [1,2,3,4,5]
      .map(l => lockedClues[l].bankId)
      .filter((id): id is number => id !== null);

    if (usedIds.length > 0) {
      await supabase
        .from("clue_bank")
        .update({ used: true })
        .in("id", usedIds);
    }

    setSaveMessage("Saved to queue!");
    setSaving(false);

    // Mark show as built in local state
    setShows(prev => prev.map(s =>
      s.name === selectedShow ? { ...s, hasExisting: true } : s
    ));

    // Reset after a moment and jump to next unbuilt show
    setTimeout(() => {
      setLockedClues({});
      setActiveLevel(1);
      setCurrentIndex({1:0, 2:0, 3:0, 4:0, 5:0});
      setEditText({});
      setAliases("");
      setSaveMessage(null);
      // Auto-advance to next unbuilt show in the same category
      const filtered = shows.filter(s =>
        !s.hasExisting && s.name !== selectedShow &&
        (categoryFilter === "All" || s.category === categoryFilter)
      );
      if (filtered.length > 0) {
        setSelectedShow(filtered[0].name);
      }
    }, 1500);
  };

  // Unique categories for filter tabs
  const categories = useMemo(() => {
    const cats = Array.from(new Set(shows.map(s => s.category)));
    cats.sort();
    return ["All", ...cats];
  }, [shows]);

  // Filtered shows based on category
  const filteredShows = useMemo(() => {
    if (categoryFilter === "All") return shows;
    return shows.filter(s => s.category === categoryFilter);
  }, [shows, categoryFilter]);

  // Find first unbuilt show in current filter
  const nextUnbuilt = filteredShows.find(s => !s.hasExisting);

  const levelLabels: Record<number, string> = {
    1: "Very Broad",
    2: "Obscure Detail",
    3: "Thematic / Setting",
    4: "Narrowing",
    5: "Giveaway",
  };

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
                  ? `${c("border-white/30 bg-white/10 text-white/80", "border-gray-400 bg-gray-200 text-gray-800")}`
                  : `${c("border-white/10 text-white/30 hover:text-white/60 hover:border-white/20", "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300")}`
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Main builder */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(level => {
              const levelClues = getCluesForLevel(level);
              const isLocked = !!lockedClues[level];
              const isActive = activeLevel === level && !isLocked;
              const idx = currentIndex[level] ?? 0;
              const currentClue = levelClues[idx];

              if (isLocked) {
                return (
                  <div
                    key={level}
                    className={`px-5 py-3 flex items-center gap-4 cursor-pointer transition-colors border ${c(
                      "border-white/10 bg-white/[0.03] hover:border-white/20",
                      "border-gray-200 bg-gray-50 hover:border-gray-300"
                    )}`}
                    onClick={() => handleUnlock(level)}
                  >
                    <span className={`text-xs font-semibold w-6 ${c("text-green-400/70", "text-green-600")}`}>
                      {level}
                    </span>
                    <span className={`flex-1 text-sm ${c("text-white/60", "text-gray-600")}`}>
                      {lockedClues[level].text}
                    </span>
                    <span className={`text-xs ${c("text-white/20", "text-gray-400")}`}>
                      {lockedClues[level].bankId === null ? "edited" : "locked"}
                    </span>
                  </div>
                );
              }

              if (!isActive) {
                return (
                  <div
                    key={level}
                    className={`px-5 py-3 flex items-center gap-4 opacity-30 border ${c(
                      "border-white/[0.06] bg-white/[0.01]",
                      "border-gray-100 bg-gray-50/50"
                    )}`}
                  >
                    <span className={`text-xs font-semibold w-6 ${c("text-white/30", "text-gray-400")}`}>
                      {level}
                    </span>
                    <span className={`text-sm ${c("text-white/20", "text-gray-400")}`}>
                      {levelLabels[level]}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={level}
                  className={`p-5 space-y-4 border ${c(
                    "border-white/15 bg-white/[0.04]",
                    "border-gray-300 bg-white"
                  )}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold w-6 ${c("text-white/50", "text-gray-500")}`}>
                        {level}
                      </span>
                      <span className={`text-xs uppercase tracking-wider ${c("text-white/30", "text-gray-400")}`}>
                        {levelLabels[level]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCycle(level, -1)}
                        className={`w-8 h-8 flex items-center justify-center border transition-colors text-sm ${c(
                          "border-white/10 text-white/30 hover:text-white/60 hover:border-white/25",
                          "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400"
                        )}`}
                      >
                        ←
                      </button>
                      <span className={`text-xs tabular-nums w-12 text-center ${c("text-white/25", "text-gray-400")}`}>
                        {idx + 1} / {levelClues.length}
                      </span>
                      <button
                        onClick={() => handleCycle(level, 1)}
                        className={`w-8 h-8 flex items-center justify-center border transition-colors text-sm ${c(
                          "border-white/10 text-white/30 hover:text-white/60 hover:border-white/25",
                          "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400"
                        )}`}
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* Clue text - editable */}
                  <textarea
                    value={editText[level] ?? ""}
                    onChange={e => setEditText(prev => ({ ...prev, [level]: e.target.value }))}
                    className={`w-full px-4 py-3 text-sm focus:outline-none resize-none border ${c(
                      "bg-white/5 border-white/10 text-white/80 focus:border-white/30",
                      "bg-gray-50 border-gray-200 text-gray-800 focus:border-gray-400"
                    )}`}
                    rows={2}
                  />

                  {/* Meta info */}
                  {currentClue && (
                    <div className={`flex items-center gap-3 text-xs ${c("text-white/20", "text-gray-400")}`}>
                      {currentClue.clue_type && (
                        <span className={`px-2 py-0.5 border ${c(
                          "border-white/10 text-white/30",
                          "border-gray-200 text-gray-500"
                        )}`}>
                          {currentClue.clue_type}
                        </span>
                      )}
                      {currentClue.notes && (
                        <span className={`italic ${c("text-white/15", "text-gray-400")}`}>
                          {currentClue.notes}
                        </span>
                      )}
                      {currentClue.used && (
                        <span className={c("text-yellow-400/50", "text-yellow-600")}>used</span>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => handleLock(level)}
                    className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-green-500 transition-colors ${c(
                      "bg-green-600/80",
                      "bg-green-600"
                    )}`}
                  >
                    Lock Clue {level}
                  </button>
                </div>
              );
            })}

            {/* Aliases input */}
            {allLocked && (
              <div className={`p-5 space-y-3 border ${c(
                "border-white/15 bg-white/[0.04]",
                "border-gray-300 bg-white"
              )}`}>
                <label className={`text-xs uppercase tracking-wider block ${c("text-white/30", "text-gray-500")}`}>
                  Aliases (comma-separated)
                </label>
                <input
                  value={aliases}
                  onChange={e => setAliases(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm focus:outline-none border ${c(
                    "bg-white/5 border-white/10 text-white/80 focus:border-white/30",
                    "bg-gray-50 border-gray-200 text-gray-800 focus:border-gray-400"
                  )}`}
                  placeholder="e.g. phantom, poto"
                />
              </div>
            )}

            {/* Save button */}
            {allLocked && (
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-green-500 transition-colors disabled:opacity-40 ${c(
                  "bg-green-600/80",
                  "bg-green-600"
                )}`}
              >
                {saving ? "Saving..." : "Save to Queue"}
              </button>
            )}

            {saveMessage && (
              <p className={`text-sm text-center ${saveMessage.startsWith("Error") ? c("text-red-400", "text-red-600") : c("text-green-400", "text-green-600")}`}>
                {saveMessage}
              </p>
            )}
          </div>

          {/* Facts sidebar — click to use as clue */}
          {facts.length > 0 && (
            <div className={`p-5 space-y-3 h-fit lg:sticky lg:top-8 border ${c(
              "border-white/10 bg-white/[0.02]",
              "border-gray-200 bg-gray-50"
            )}`}>
              <h3 className={`text-xs font-semibold uppercase tracking-[3px] mb-3 ${c("text-white/25", "text-gray-400")}`}>
                Facts
              </h3>
              <p className={`text-[10px] -mt-1 mb-2 ${c("text-white/15", "text-gray-400")}`}>
                Click to use as clue {activeLevel}
              </p>
              {facts.map(fact => (
                <button
                  key={fact.id}
                  onClick={() => {
                    if (!lockedClues[activeLevel]) {
                      setEditText(prev => ({ ...prev, [activeLevel]: fact.clue_text }));
                    }
                  }}
                  className={`block w-full text-left text-xs leading-relaxed px-2 py-1.5 -mx-2 transition-colors ${
                    lockedClues[activeLevel]
                      ? c("text-white/20 cursor-default", "text-gray-300 cursor-default")
                      : c("text-white/35 hover:text-white/60 hover:bg-white/5 cursor-pointer", "text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer")
                  }`}
                  disabled={!!lockedClues[activeLevel]}
                >
                  {fact.clue_text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedShow && !loading && clues.length === 0 && (
        <p className={`text-sm ${c("text-white/30", "text-gray-400")}`}>No clues found for this show in the clue bank.</p>
      )}
    </div>
  );
}
