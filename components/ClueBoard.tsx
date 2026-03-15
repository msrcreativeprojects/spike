"use client";

import { useState, useEffect, useRef } from "react";
import { ALL_COLORS, DARK_TEXT_COLORS, type ClueColor } from "@/types/puzzle";
import ClueRow from "./ClueRow";
import InlineGuessRow from "./InlineGuessRow";

const REVEAL_STAGGER_MS = 300;
const TAPE_PEEL_MS = 400;

interface ClueBoardProps {
  clues: string[];
  revealedCount: number;
  completed: boolean;
  revealing: boolean;
  dailyColors: ClueColor[];
  shareMode: boolean;
  selectedClue: number | null;
  onSelectClue: (index: number) => void;
  // Guess form props
  onGuess: (guess: string) => void;
  disabled: boolean;
  category?: string;
  guessCount: number;
}

export default function ClueBoard({
  clues,
  revealedCount,
  completed,
  revealing,
  dailyColors,
  shareMode,
  selectedClue,
  onSelectClue,
  onGuess,
  disabled,
  category,
  guessCount,
}: ClueBoardProps) {
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

  // Reset peel state when revealing turns off
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
        timers.push(
          setTimeout(() => {
            setPeelingSet((prev) => new Set(prev).add(i));
          }, peelDelay)
        );
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

  const isFinalGuess = revealedCount >= 5 && !completed;
  const activeIndex = revealedCount; // the row where the input goes (0-4)
  const showInlineInput = !completed && !shareMode && activeIndex < 5;
  const showFinalRow = isFinalGuess && !shareMode;

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      {clues.map((clue, i) => {
        const isRevealed = i < revealedCount;
        const isActiveInputRow = showInlineInput && i === activeIndex;

        // If this row is the active input row, render the InlineGuessRow instead
        if (isActiveInputRow) {
          return (
            <InlineGuessRow
              key={`input-${revealedCount}`}
              onGuess={onGuess}
              disabled={disabled}
              category={category}
              tapeColor={ALL_COLORS[dailyColors[i]]}
              isGold={dailyColors[i] === "gold"}
              darkText={DARK_TEXT_COLORS.has(dailyColors[i])}
              guessCount={guessCount}
            />
          );
        }

        // Otherwise render a ClueRow (revealed, sealed, or animating)
        return (
          <ClueRow
            key={i}
            clue={clue}
            index={i}
            dailyColor={dailyColors[i]}
            isRevealed={isRevealed}
            isFalling={fallingSet.has(i)}
            isPeeling={peelingSet.has(i)}
            isPeeled={peeledSet.has(i)}
            shareMode={shareMode}
            isSelected={shareMode && selectedClue === i}
            onSelect={() => onSelectClue(i)}
          />
        );
      })}

      {/* 6th row: final guess input (all 5 clues revealed, one last chance) */}
      {showFinalRow && (
        <InlineGuessRow
          key="input-final"
          onGuess={onGuess}
          disabled={disabled}
          category={category}
          isFinalGuess
          tapeColor={ALL_COLORS[dailyColors[4]]}
          guessCount={guessCount}
        />
      )}
    </div>
  );
}
