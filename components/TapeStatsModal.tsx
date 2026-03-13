"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ALL_COLORS,
  ALL_COLOR_NAMES,
  GLOW_COLOR,
  type TapeStats,
  type TapeColor,
} from "@/types/puzzle";
import { getColorHex } from "@/lib/colors";

interface TapeStatsModalProps {
  stats: TapeStats;
  onClose: () => void;
  onSignOut: () => void;
}

/* ── Count-up hook ─────────────────────────────────────────────── */
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (target === 0) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* ── Component ─────────────────────────────────────────────────── */
export default function TapeStatsModal({
  stats,
  onClose,
  onSignOut,
}: TapeStatsModalProps) {
  const [closing, setClosing] = useState(false);
  const displayTotal = useCountUp(stats.totalTape);

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
  const goldCount = stats.tapeByColor.gold ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/85 transition-opacity duration-300 ${
          closing ? "opacity-0" : ""
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-sm border border-white/[0.08] bg-[#0a0a0c] px-8 py-10 ${
          closing ? "animate-curtain-down" : "animate-curtain-up"
        }`}
        style={{ maxHeight: "80dvh", overflowY: "auto" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-white/30 hover:text-white/60 transition-colors text-lg"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-6">
          Your Tape
        </h2>

        {/* Big total — Inter bold, count-up animation */}
        <div className="text-center mb-8">
          <p className="text-7xl font-bold tabular-nums text-white/90 leading-none">
            {displayTotal}
          </p>
          <p className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.2em]">
            tape collected
          </p>
        </div>

        {/* Per-color breakdown */}
        {(collectedColors.length > 0 || glowCount > 0 || goldCount > 0) && (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-8">
            {collectedColors.map((color) => (
              <div key={color} className="flex items-center gap-2">
                <div
                  className="h-3 w-6"
                  style={{ backgroundColor: ALL_COLORS[color] }}
                />
                <span className="text-sm tabular-nums text-white/50">
                  {stats.tapeByColor[color] ?? 0}
                </span>
              </div>
            ))}
            {/* Gold */}
            {goldCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-6 animate-gold-shimmer-sm" />
                <span className="text-sm tabular-nums text-white/50">
                  {goldCount}
                </span>
              </div>
            )}
            {/* Glow */}
            {glowCount > 0 && (
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-6 animate-glow-pulse"
                  style={{ backgroundColor: GLOW_COLOR }}
                />
                <span className="text-sm tabular-nums text-white/50">
                  {glowCount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats row — single line, no boxes */}
        <div className="flex justify-between px-2 mb-6">
          {[
            { value: stats.gamesPlayed, label: "Played" },
            { value: `${winRate}%`, label: "Win" },
            { value: stats.currentStreak, label: "Streak" },
            { value: stats.longestStreak, label: "Best" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-semibold tabular-nums text-white/70">
                {value}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-white/35 mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Next glow countdown */}
        {stats.currentStreak > 0 && nextGlow !== 7 && (
          <p className="text-center text-xs text-white/30 mb-6">
            Next glow tape in{" "}
            <span className="text-white/50">{nextGlow}</span>{" "}
            {nextGlow === 1 ? "day" : "days"}
          </p>
        )}

        {/* Recent history */}
        {recentHistory.length > 0 && (
          <div className="border-t border-white/[0.08] pt-5">
            <p className="text-[9px] uppercase tracking-widest text-white/35 mb-3">
              Recent
            </p>
            <div className="flex flex-col gap-2">
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
                    <span className="text-white/40 w-14">{label}</span>
                    <div className="flex gap-1 flex-1 justify-center">
                      {day.colorsEarned.length > 0 ? (
                        day.colorsEarned.map(
                          (color: TapeColor, i: number) => (
                            <div
                              key={i}
                              className={`h-2.5 w-4 ${
                                color === "glow" ? "animate-glow-pulse" : ""
                              } ${color === "gold" ? "animate-gold-shimmer-sm" : ""}`}
                              style={{
                                backgroundColor: color === "gold" ? undefined : getColorHex(color),
                              }}
                            />
                          )
                        )
                      ) : (
                        <span className="text-white/20">&mdash;</span>
                      )}
                    </div>
                    <span className="text-white/30 tabular-nums w-10 text-right">
                      {day.totalTapeAfter}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sign out */}
        <div className="border-t border-white/[0.08] mt-6 pt-5 text-center">
          <button
            onClick={onSignOut}
            className="text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
