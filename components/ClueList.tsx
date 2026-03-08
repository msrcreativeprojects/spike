"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

interface ClueListProps {
  clues: string[];
  revealedCount: number;
  completed?: boolean;
  collecting?: boolean;
  dailyColors: ClueColor[];
}

const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

export default function ClueList({ clues, revealedCount, completed, collecting, dailyColors }: ClueListProps) {
  const prevRevealed = useRef(revealedCount);
  const [fallingSet, setFallingSet] = useState<Set<number>>(new Set());

  // Wrong guess: newly revealed tape starts falling
  useEffect(() => {
    if (revealedCount > prevRevealed.current) {
      const newlyRevealed = prevRevealed.current;
      setFallingSet((prev) => new Set(prev).add(newlyRevealed));
    }
    prevRevealed.current = revealedCount;
  }, [revealedCount]);

  // Win: all unrevealed tapes start falling
  useEffect(() => {
    if (!collecting) return;
    setFallingSet((prev) => {
      const next = new Set(prev);
      for (let i = revealedCount; i < clues.length; i++) {
        next.add(i);
      }
      return next;
    });
  }, [collecting, revealedCount, clues.length]);

  return (
    <div className="relative flex flex-col items-center gap-2">
      {clues.map((clue, i) => {
        const isRevealed = i < revealedCount;
        const isUnrevealed = !isRevealed;
        const isFalling = fallingSet.has(i);
        const color = ALL_COLORS[dailyColors[i]];
        const rotation = ROTATIONS[i];

        // Stagger delay: only for collecting (win), not for single wrong guesses
        const collectDelay = collecting && isUnrevealed
          ? `${(i - revealedCount) * 150}ms`
          : "0ms";

        return (
          <div key={i} className="relative" style={{ width: "fit-content" }}>
            {/* Clue text — always present for sizing */}
            <div
              className="px-8 py-3 text-center text-sm font-semibold"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: isRevealed ? "rgba(255,255,255,0.7)" : "transparent",
              }}
            >
              {clue}
            </div>

            {/* Tape overlay — rotation wrapper + falling inner */}
            {(isUnrevealed || isFalling) && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  zIndex: isFalling ? 10 : 1,
                }}
              >
                <div
                  className={`w-full h-full ${isFalling ? "animate-tape-fall" : ""}`}
                  style={{
                    backgroundColor: color,
                    animationDelay: collectDelay,
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
