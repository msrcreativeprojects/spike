"use client";

import { useState, useEffect, useCallback } from "react";
import { Puzzle, GameState, CLUE_COLOR_MAP, CLUE_COLORS } from "@/types/puzzle";
import { createInitialState, submitGuess, revealNextClue } from "@/lib/gameLogic";
import { loadGameState, saveGameState, clearGameState } from "@/lib/storage";
import ClueList from "./ClueList";
import GuessForm from "./GuessForm";
import ResultCard from "./ResultCard";

const TOTAL_CLUES = 5;

interface GameProps {
  puzzle: Puzzle;
}

export default function Game({ puzzle }: GameProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Load or initialize game state
  useEffect(() => {
    const saved = loadGameState(puzzle.date);
    if (saved && saved.puzzleId === puzzle.id) {
      setState(saved);
    } else {
      setState(createInitialState(puzzle.id));
    }
  }, [puzzle]);

  // Persist state changes
  useEffect(() => {
    if (state) {
      saveGameState(puzzle.date, state);
    }
  }, [state, puzzle.date]);

  const handleGuess = useCallback(
    (guess: string) => {
      if (!state) return;
      const next = submitGuess(state, guess, puzzle);
      setState(next);

      // Flash on wrong guess
      if (!next.solved && !next.completed) {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 600);
      }
    },
    [state, puzzle]
  );

  const handleReveal = useCallback(() => {
    if (!state) return;
    setState(revealNextClue(state));
  }, [state]);

  const handleReset = () => {
    clearGameState(puzzle.date);
    setState(createInitialState(puzzle.id));
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  const canReveal = !state.completed && state.revealedClues < TOTAL_CLUES;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="text-center">
        <p className="text-sm text-white/35 tracking-widest uppercase">
          hit your
        </p>
        <h1 className="font-title text-6xl tracking-wide text-white -mt-1">
          SPIKE
        </h1>
        <p
          className="font-sans text-sm font-bold -mt-1 transition-colors duration-300"
          style={{ color: CLUE_COLOR_MAP[CLUE_COLORS[state.revealedClues - 1]] + "80" }}
        >
          #{String(state.revealedClues).padStart(3, "0")}
        </p>
      </header>

      {/* Clues */}
      <ClueList clues={puzzle.clues} revealedCount={state.revealedClues} />

      {/* Wrong guess indicator */}
      <div
        className={`
          h-0.5 mx-auto rounded-full transition-all duration-300
          ${wrongFlash ? "w-16 bg-red-500/60" : "w-0 bg-transparent"}
        `}
      />

      {/* Guess form or result */}
      {state.completed ? (
        <ResultCard state={state} answer={puzzle.answer} />
      ) : (
        <GuessForm
          onGuess={handleGuess}
          onReveal={handleReveal}
          canReveal={canReveal}
          disabled={state.completed}
        />
      )}

      {/* Dev reset — only in development */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={handleReset}
          className="mx-auto mt-4 text-[10px] text-white/15 hover:text-white/30 transition-colors"
        >
          reset puzzle (dev)
        </button>
      )}
    </div>
  );
}
