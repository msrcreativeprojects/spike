"use client";

import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

interface ClueRowProps {
  clue: string;
  index: number;
  dailyColor: ClueColor;
  isRevealed: boolean;
  isFalling: boolean;
  isPeeling: boolean;
  isPeeled: boolean;
  shareMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function ClueRow({
  clue,
  index,
  dailyColor,
  isRevealed,
  isFalling,
  isPeeling,
  isPeeled,
  shareMode,
  isSelected,
  onSelect,
}: ClueRowProps) {
  const color = ALL_COLORS[dailyColor];
  const isGold = dailyColor === "gold";

  const textVisible = isRevealed || isPeeling || isPeeled;
  const showTape = !isRevealed && !isPeeling && !isPeeled && !isFalling;
  const isSelectable = shareMode && textVisible;

  return (
    <div
      className={`relative ${isSelectable ? "cursor-pointer" : ""}`}
      style={{ width: "min(90vw, 28rem)" }}
      onClick={isSelectable ? onSelect : undefined}
    >
      {/* Clue text — always present for sizing */}
      <div
        className="px-8 py-2 text-center text-sm font-semibold text-balance transition-all duration-200"
        style={{
          backgroundColor: isSelected
            ? `${color}18`
            : "rgba(255,255,255,0.06)",
          color: textVisible ? "rgba(255,255,255,0.7)" : "transparent",
          borderLeft: isSelected ? `3px solid ${color}` : "3px solid transparent",
          transition: isPeeling
            ? "color 0.3s ease-out"
            : "background-color 0.2s, border-color 0.2s",
          userSelect: textVisible ? "auto" : "none",
          WebkitUserSelect: textVisible ? "auto" : "none",
        }}
      >
        {clue}
      </div>

      {/* Tape overlay — peel animation */}
      {isPeeling && (
        <div
          className="absolute pointer-events-none inset-0"
          style={{ zIndex: 10 }}
        >
          <div
            className={`w-full h-full animate-tape-peel ${isGold ? "animate-gold-shimmer" : ""}`}
            style={{
              backgroundColor: isGold ? undefined : color,
              animationDelay: isGold ? `${index * 0.5}s` : undefined,
            }}
          />
        </div>
      )}

      {/* Tape overlay — static (unrevealed) */}
      {showTape && (
        <div
          className="absolute pointer-events-none inset-0"
          style={{ zIndex: 1 }}
        >
          <div
            className={`w-full h-full ${isGold ? "animate-gold-shimmer" : ""}`}
            style={{
              backgroundColor: isGold ? undefined : color,
              animationDelay: isGold ? `${index * 0.5}s` : undefined,
            }}
          />
        </div>
      )}

      {/* Tape overlay — falling (wrong guess) */}
      {isFalling && !isPeeled && (
        <div
          className="absolute pointer-events-none inset-0"
          style={{ zIndex: 10 }}
        >
          <div
            className={`w-full h-full animate-tape-fall ${isGold ? "animate-gold-shimmer" : ""}`}
            style={{
              backgroundColor: isGold ? undefined : color,
              animationDelay: isGold ? `${index * 0.5}s` : undefined,
            }}
          />
        </div>
      )}
    </div>
  );
}
