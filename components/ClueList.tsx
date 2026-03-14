"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

interface ClueListProps {
  clues: string[];
  revealedCount: number;
  completed?: boolean;
  revealing?: boolean;
  dailyColors: ClueColor[];
  shareMode?: boolean;
  selectedClue?: number | null;
  onSelectClue?: (index: number) => void;
}

const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];
const TAPE_X = [-8, 14, -18, 12, -6];
const REVEAL_STAGGER_MS = 300;
const TAPE_PEEL_MS = 400;

export default function ClueList({
  clues,
  revealedCount,
  completed,
  revealing,
  dailyColors,
  shareMode,
  selectedClue,
  onSelectClue,
}: ClueListProps) {
  const prevRevealed = useRef(revealedCount);
  const [fallingSet, setFallingSet] = useState<Set<number>>(new Set());
  const [peelingSet, setPeelingSet] = useState<Set<number>>(new Set());
  const [peeledSet, setPeeledSet] = useState<Set<number>>(new Set());

  // Wrong guess: newly revealed tape starts falling
  useEffect(() => {
    if (revealedCount > prevRevealed.current) {
      const newlyRevealed = prevRevealed.current;
      setFallingSet((prev) => new Set(prev).add(newlyRevealed));
    }
    prevRevealed.current = revealedCount;
  }, [revealedCount]);

  // Reset peel state when revealing turns off (e.g., puzzle reset)
  useEffect(() => {
    if (!revealing) {
      setPeelingSet(new Set());
      setPeeledSet(new Set());
    }
  }, [revealing]);

  // Post-game reveal: peel remaining tapes sequentially
  useEffect(() => {
    if (!revealing) return;

    // If loading a completed game, skip animation — mark all as peeled immediately
    if (completed && peelingSet.size === 0 && peeledSet.size === 0) {
      const allPeeled = new Set<number>();
      for (let i = 0; i < clues.length; i++) {
        if (i >= revealedCount) allPeeled.add(i);
      }
      setPeeledSet(allPeeled);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let staggerIndex = 0;
    for (let i = 0; i < clues.length; i++) {
      if (i >= revealedCount) {
        const peelDelay = staggerIndex * REVEAL_STAGGER_MS;
        // Start peeling
        timers.push(
          setTimeout(() => {
            setPeelingSet((prev) => new Set(prev).add(i));
          }, peelDelay)
        );
        // Mark as fully peeled after animation completes
        timers.push(
          setTimeout(() => {
            setPeelingSet((prev) => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
            setPeeledSet((prev) => new Set(prev).add(i));
          }, peelDelay + TAPE_PEEL_MS)
        );
        staggerIndex++;
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [revealing, revealedCount, clues.length, completed]);

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      {clues.map((clue, i) => {
        const isRevealed = i < revealedCount;
        const isUnrevealed = !isRevealed;
        const isFalling = fallingSet.has(i);
        const isPeeling = peelingSet.has(i);
        const isPeeled = peeledSet.has(i);
        const color = ALL_COLORS[dailyColors[i]];
        const isGold = dailyColors[i] === "gold";
        const rotation = ROTATIONS[i];

        // Text is visible if: revealed by wrong guess, or peeling/peeled
        const textVisible = isRevealed || isPeeling || isPeeled;

        // Static tape: show if unrevealed and not peeling/peeled, or falling
        const showTape = isUnrevealed && !isPeeling && !isPeeled && !isFalling;

        // Selection state for share mode
        const isSelected = shareMode && selectedClue === i;
        const isSelectable = shareMode && textVisible;

        return (
          <div
            key={i}
            className={`relative ${isSelectable ? "cursor-pointer" : ""}`}
            style={{ width: "min(90vw, 28rem)" }}
            onClick={isSelectable ? () => onSelectClue?.(i) : undefined}
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
              }}
            >
              {clue}
            </div>

            {/* Tape overlay — peel animation (visible only during animation) */}
            {isPeeling && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  bottom: 0,
                  left: "2%",
                  right: "2%",
                  transform: `translateX(${TAPE_X[i]}px) rotate(${rotation}deg)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={`w-full h-full animate-tape-peel ${isGold ? "animate-gold-shimmer" : ""}`}
                  style={{
                    backgroundColor: isGold ? undefined : color,
                    animationDelay: isGold ? `${i * 0.5}s` : undefined,
                  }}
                />
              </div>
            )}

            {/* Tape overlay — static (unrevealed) */}
            {showTape && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  bottom: 0,
                  left: "2%",
                  right: "2%",
                  transform: `translateX(${TAPE_X[i]}px) rotate(${rotation}deg)`,
                  zIndex: 1,
                }}
              >
                <div
                  className={`w-full h-full ${isGold ? "animate-gold-shimmer" : ""}`}
                  style={{
                    backgroundColor: isGold ? undefined : color,
                    animationDelay: isGold ? `${i * 0.5}s` : undefined,
                  }}
                />
              </div>
            )}

            {/* Tape overlay — falling (wrong guess during gameplay) */}
            {isFalling && !isPeeled && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: 0,
                  bottom: 0,
                  left: "2%",
                  right: "2%",
                  transform: `translateX(${TAPE_X[i]}px) rotate(${rotation}deg)`,
                  zIndex: 10,
                }}
              >
                <div
                  className={`w-full h-full animate-tape-fall ${isGold ? "animate-gold-shimmer" : ""}`}
                  style={{
                    backgroundColor: isGold ? undefined : color,
                    animationDelay: isGold ? `${i * 0.5}s` : undefined,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
