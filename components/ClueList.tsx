"use client";

import { CLUE_COLOR_MAP, CLUE_COLORS } from "@/types/puzzle";

interface ClueListProps {
  clues: string[];
  revealedCount: number;
  onPeel?: () => void;
  completed?: boolean;
}

const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

export default function ClueList({ clues, revealedCount, onPeel, completed }: ClueListProps) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      {clues.map((clue, i) => {
        const isRevealed = i < revealedCount;
        const isNextTape = !isRevealed && i === revealedCount;
        const isUnrevealed = !isRevealed;
        const color = CLUE_COLOR_MAP[CLUE_COLORS[i]];

        // Hide unrevealed tapes when game is complete
        if (completed && isUnrevealed) {
          return (
            <div
              key={i}
              className="transition-all duration-700 ease-out"
              style={{ opacity: 0, height: 0, overflow: "hidden" }}
            />
          );
        }

        return (
          <div
            key={i}
            onClick={isNextTape && onPeel ? onPeel : undefined}
            className={`relative px-8 py-3 text-center text-sm font-semibold transition-all duration-500 ease-out ${
              isNextTape && onPeel ? "cursor-pointer hover:brightness-110 hover:scale-[1.02]" : ""
            }`}
            style={{
              backgroundColor: isRevealed
                ? "rgba(255,255,255,0.06)"
                : color,
              color: isRevealed
                ? "rgba(255,255,255,0.7)"
                : "transparent",
              transform: isRevealed
                ? "rotate(0deg)"
                : `rotate(${ROTATIONS[i]}deg)`,
              width: "fit-content",
            }}
          >
            {/* Clue text — transparent when covered, used for sizing */}
            {clue}
            {/* PEEL overlay on next tape */}
            {isNextTape && (
              <span className="absolute inset-0 flex items-center justify-center text-black/25">
                PEEL
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
