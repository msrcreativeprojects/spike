"use client";

import { useState, useEffect, useCallback } from "react";
import { Puzzle, GameState, CLUE_COLOR_MAP, CLUE_COLORS } from "@/types/puzzle";
import { createInitialState, submitGuess, revealNextClue } from "@/lib/gameLogic";
import { loadGameState, saveGameState, clearGameState } from "@/lib/storage";
import { copyShareText } from "@/lib/shareResult";
import { getEncouragement } from "@/data/encouragements";
import ClueList from "./ClueList";
import GuessForm from "./GuessForm";

const TOTAL_CLUES = 5;

interface GameProps {
  puzzle: Puzzle;
}

export default function Game({ puzzle }: GameProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareMode, setShareMode] = useState(false);

  // Load or initialize game state
  useEffect(() => {
    const saved = loadGameState(puzzle.date);
    if (saved && saved.puzzleId === puzzle.id) {
      setState(saved);
      // If loading a completed+solved game, skip to celebrated state
      if (saved.completed && saved.solved) {
        setCelebrating(true);
        setShareMode(true);
      }
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

      if (next.solved) {
        setCelebrating(true);
        setTimeout(() => setShareMode(true), 1400);
      } else if (!next.completed) {
        // Flash on wrong guess
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
    setCelebrating(false);
    setCopied(false);
    setShareMode(false);
  };

  const handleShare = async () => {
    if (!state) return;
    const success = await copyShareText(state);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  const canReveal = !state.completed && state.revealedClues < TOTAL_CLUES;
  const lastGuess = state.guesses[state.guesses.length - 1] ?? "";
  const cluesUsed = TOTAL_CLUES - state.score;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <header className="text-center mb-2">
        <p
          key={shareMode ? "share" : "hit"}
          className="text-sm text-white/35 tracking-widest uppercase"
        >
          {(shareMode ? "share your" : "hit your").split("").map((char, ci) => (
            <span
              key={ci}
              className={shareMode ? "inline-block animate-letter-in" : ""}
              style={shareMode ? { animationDelay: `${ci * 40}ms` } : undefined}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
        <h1 className="font-title text-7xl tracking-wide -mt-1">
          {["S", "P", "I", "K", "E"].map((letter, i) => {
            const isLit = state.completed
              ? i >= 5 - state.score
              : i >= state.revealedClues;
            const color = CLUE_COLOR_MAP[CLUE_COLORS[i]];
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-500 ${
                  celebrating ? "animate-spike-wave" : ""
                }`}
                style={{
                  color: isLit ? color : "rgba(255,255,255,0.9)",
                  textShadow: isLit ? `0 0 24px ${color}40` : "none",
                  animationDelay: celebrating ? `${i * 100}ms` : "0ms",
                }}
              >
                {letter}
              </span>
            );
          })}
        </h1>
      </header>

      {/* Guess form / share button + encouragement */}
      <div className={`flex flex-col ${shareMode ? "items-center" : ""}`}>
        {shareMode ? (
          <button
            onClick={handleShare}
            className="
              w-48 rounded-none px-5 py-2.5 text-sm font-semibold uppercase tracking-widest
              transition-all duration-500 animate-fade-in
              border border-green-500/30 bg-green-500/15 text-green-300
              hover:bg-green-500/25 hover:border-green-500/50 hover:text-green-200
              active:scale-[0.98]
            "
          >
            {copied ? "Copied!" : "Share"}
          </button>
        ) : (
          <GuessForm
            onGuess={handleGuess}
            disabled={state.completed}
            lockedValue={state.completed ? lastGuess : undefined}
            solved={state.solved}
            failed={state.completed && !state.solved}
          />
        )}
        <div className="flex items-center justify-center gap-2 py-3">
          <div
            className={`
              h-0.5 rounded-full transition-all duration-300
              ${wrongFlash ? "w-8 bg-red-500/60" : "w-0 bg-transparent"}
            `}
          />
          <p
            key={state.completed ? "result" : state.revealedClues}
            className="text-center text-xs tracking-wide text-white/50"
          >
            {(() => {
              const msg = state.solved
                ? `Solved in ${cluesUsed} clue${cluesUsed === 1 ? "" : "s"}!`
                : state.completed
                  ? `the answer was ${puzzle.answer}`
                  : getEncouragement(state.revealedClues, puzzle.date);
              return msg.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="inline-block animate-letter-in"
                  style={{ animationDelay: `${ci * 28}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ));
            })()}
          </p>
          <div
            className={`
              h-0.5 rounded-full transition-all duration-300
              ${wrongFlash ? "w-8 bg-red-500/60" : "w-0 bg-transparent"}
            `}
          />
        </div>
      </div>

      {/* Clues board — hide in share mode */}
      {!shareMode && (
        <ClueList
          clues={puzzle.clues}
          revealedCount={state.revealedClues}
          onPeel={canReveal ? handleReveal : undefined}
          completed={state.completed}
        />
      )}

      {/* Share button for failed games */}
      {state.completed && !state.solved && (
        <div className="flex flex-col items-center mt-2 animate-fade-in">
          <button
            onClick={handleShare}
            className="
              rounded-none border border-white/20 bg-white/[0.06]
              px-5 py-2 text-sm font-semibold uppercase tracking-widest text-white/80
              transition-all duration-200
              hover:border-white/35 hover:bg-white/[0.12] hover:text-white
              active:scale-[0.97]
            "
          >
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
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
