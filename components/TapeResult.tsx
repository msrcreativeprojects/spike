"use client";

import { useEffect, useState } from "react";
import { ALL_COLORS, GLOW_COLOR, WHITE_TAPE_COLOR, type TapeColor } from "@/types/puzzle";

interface TapeResultProps {
  colorsEarned: TapeColor[];
  totalTape: number;
  solved: boolean;
  isGuest: boolean;
  onSignIn?: () => void;
}

export default function TapeResult({
  colorsEarned,
  totalTape,
  solved,
  isGuest,
  onSignIn,
}: TapeResultProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  // Pop in tape strips sequentially
  useEffect(() => {
    if (colorsEarned.length === 0) {
      setVisibleCount(0);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= colorsEarned.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [colorsEarned]);

  const regularColors = colorsEarned.filter((c) => c !== "glow" && c !== "white");
  const hasGlow = colorsEarned.includes("glow");
  const hasWhite = colorsEarned.includes("white");

  function getColorHex(color: TapeColor): string {
    if (color === "glow") return GLOW_COLOR;
    if (color === "white") return WHITE_TAPE_COLOR;
    return ALL_COLORS[color] ?? "#ffffff";
  }

  const tapeCount = colorsEarned.filter((c) => c !== "glow").length;

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in mt-4">
      {/* Colored tape strips */}
      {colorsEarned.length > 0 && (
        <div className="flex gap-1 items-center">
          {colorsEarned.map((color, i) => (
            <div
              key={i}
              className={`h-3 w-7 transition-all duration-300 ${
                color === "glow" ? "animate-glow-pulse" : ""
              }`}
              style={{
                backgroundColor: getColorHex(color),
                opacity: i < visibleCount ? 1 : 0,
                transform: i < visibleCount ? "scale(1)" : "scale(0.5)",
              }}
            />
          ))}
        </div>
      )}

      {/* Tape earned text */}
      <div className="text-center">
        {hasWhite && tapeCount === 1 ? (
          <>
            <p className="text-xs text-white/40">
              You deserve a piece just for playing!
            </p>
            <p className="text-sm text-white/30 mt-0.5">
              +1 tape
            </p>
          </>
        ) : (
          <p className="text-sm">
            <span className="text-white/50">
              +{tapeCount} tape
            </span>
            {hasGlow && (
              <span className="text-white/70 ml-2">
                +1 glow
              </span>
            )}
          </p>
        )}

        {!isGuest && (
          <p className="text-xs text-white/25 mt-0.5">
            {totalTape} total
          </p>
        )}
      </div>

      {/* Guest nudge */}
      {isGuest && (
        <button
          onClick={onSignIn}
          className="text-xs text-white/30 hover:text-white/50 transition-colors underline underline-offset-2 decoration-white/15"
        >
          Sign in to save your tape
        </button>
      )}
    </div>
  );
}
