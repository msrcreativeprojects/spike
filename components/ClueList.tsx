"use client";

import { CLUE_COLOR_MAP, CLUE_COLORS } from "@/types/puzzle";

interface ClueListProps {
  clues: string[];
  revealedCount: number;
}

const ROTATIONS = [-12, 8, -6, 14, -10];

export default function ClueList({ clues, revealedCount }: ClueListProps) {
  return (
    <div className="flex flex-col gap-3">
      {clues.map((clue, i) => {
        const isRevealed = i < revealedCount;
        const color = CLUE_COLOR_MAP[CLUE_COLORS[i]];
        const rotation = ROTATIONS[i];

        return (
          <div
            key={i}
            className="flex items-center gap-4 transition-all duration-500 ease-out"
            style={{
              opacity: isRevealed ? 1 : 0.3,
              transform: isRevealed ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {/* Large X bullet */}
            <span
              className="font-title text-3xl font-bold shrink-0 inline-block transition-colors duration-500"
              style={{
                color: isRevealed ? color : "rgba(255,255,255,0.1)",
                transform: `rotate(${rotation}deg)`,
                textShadow: isRevealed ? `0 0 16px ${color}50` : "none",
              }}
            >
              X
            </span>

            {/* Clue text */}
            <span
              className={`text-sm transition-colors duration-500 ${
                isRevealed ? "text-white/90" : "text-white/15"
              }`}
            >
              {isRevealed ? clue : "???"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
