"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ALL_COLORS,
  ALL_COLOR_NAMES,
  GLOW_COLOR,
  type TapeStats,
  type TapeColor,
  type ClueColor,
} from "@/types/puzzle";

interface TapeStatsModalProps {
  stats: TapeStats;
  onClose: () => void;
  onSignOut: () => void;
}

export default function TapeStatsModal({
  stats,
  onClose,
  onSignOut,
}: TapeStatsModalProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 250);
  }, [closing, onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;

  const nextGlow =
    stats.currentStreak > 0
      ? 7 - (stats.currentStreak % 7)
      : 7;

  const recentHistory = stats.history.slice(-7).reverse();

  // Only show colors that have been collected
  const collectedColors = ALL_COLOR_NAMES.filter(
    (c) => (stats.tapeByColor[c] ?? 0) > 0
  );
  const glowCount = stats.tapeByColor.glow ?? 0;

  function getColorHex(color: string): string {
    if (color === "glow") return GLOW_COLOR;
    return ALL_COLORS[color as ClueColor] ?? "#ffffff";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          closing ? "opacity-0" : ""
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-sm border border-white/10 bg-[#0a0a0c] p-6 pt-8 ${
          closing ? "animate-curtain-down" : "animate-curtain-up"
        }`}
        style={{ maxHeight: "80dvh", overflowY: "auto" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-white/25 hover:text-white/50 transition-colors text-sm"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-5">
          YOUR TAPE
        </h2>

        {/* Big total */}
        <div className="text-center mb-6">
          <p className="font-title text-5xl tracking-wide">{stats.totalTape}</p>
          <p className="text-xs text-white/30 mt-1 uppercase tracking-widest">
            tape collected
          </p>
        </div>

        {/* Per-color breakdown */}
        {(collectedColors.length > 0 || glowCount > 0) && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-6">
            {collectedColors.map((color) => (
              <div key={color} className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-4"
                  style={{ backgroundColor: ALL_COLORS[color] }}
                />
                <span className="text-sm tabular-nums text-white/60">
                  {stats.tapeByColor[color] ?? 0}
                </span>
              </div>
            ))}
            {/* Glow */}
            {glowCount > 0 && (
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-4 animate-glow-pulse"
                  style={{ backgroundColor: GLOW_COLOR }}
                />
                <span className="text-sm tabular-nums text-white/60">
                  {glowCount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { value: stats.gamesPlayed, label: "PLAYED" },
            { value: `${winRate}%`, label: "WIN %" },
            { value: stats.currentStreak, label: "STREAK" },
            { value: stats.longestStreak, label: "BEST" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="border border-white/[0.06] bg-white/[0.02] p-3 text-center"
            >
              <p className="text-lg font-semibold text-white/80">{value}</p>
              <p className="text-[9px] uppercase tracking-widest text-white/30">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Next glow countdown */}
        {stats.currentStreak > 0 && nextGlow !== 7 && (
          <p className="text-center text-xs text-white/25 mb-5">
            Next glow tape in{" "}
            <span className="text-white/40">{nextGlow}</span>{" "}
            {nextGlow === 1 ? "day" : "days"}
          </p>
        )}

        {/* Recent history */}
        {recentHistory.length > 0 && (
          <div className="border-t border-white/[0.06] pt-4">
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-2">
              Recent
            </p>
            <div className="flex flex-col gap-1.5">
              {recentHistory.map((day) => {
                const d = new Date(day.date + "T00:00:00");
                const label = d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <div
                    key={day.date}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-white/30 w-14">{label}</span>
                    <div className="flex gap-0.5 flex-1 justify-center">
                      {day.colorsEarned.length > 0 ? (
                        day.colorsEarned.map(
                          (color: TapeColor, i: number) => (
                            <div
                              key={i}
                              className={`h-2 w-3 ${
                                color === "glow" ? "animate-glow-pulse" : ""
                              }`}
                              style={{
                                backgroundColor: getColorHex(color),
                              }}
                            />
                          )
                        )
                      ) : (
                        <span className="text-white/15">&mdash;</span>
                      )}
                    </div>
                    <span className="text-white/20 tabular-nums w-10 text-right">
                      {day.totalTapeAfter}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sign out */}
        <div className="border-t border-white/[0.06] mt-5 pt-4 text-center">
          <button
            onClick={onSignOut}
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
