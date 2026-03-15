"use client";

import { useState, useEffect, useCallback } from "react";

import { Puzzle, GameState, ALL_COLORS, type ClueColor, type TapeStats, type TapeColor } from "@/types/puzzle";
import { createInitialState, submitGuess } from "@/lib/gameLogic";
import { loadGameState, saveGameState } from "@/lib/storage";
import { shareResult } from "@/lib/shareResult";
import { getEncouragement } from "@/data/encouragements";
import { recordGameCompletion, loadTapeStats, type GameCompletionResult } from "@/lib/tapeService";
import { getColorHex, getEarnedColors } from "@/lib/colors";
import ClueBoard from "./ClueBoard";
import TapeResult from "./TapeResult";

/* ─── Timing constants (ms) ─── */
const WRONG_FLASH_MS = 600;
const REVEAL_START_DELAY_MS = 300;
const REVEAL_STAGGER_MS = 150;
const TAPE_PEEL_MS = 200;
const READING_PAUSE_MS = 0;
const SCORE_ZERO_SHARE_DELAY_MS = 400;
const LOSS_SHARE_DELAY_MS = 800;
const SHARE_LABEL_MS = 2000;

interface GameProps {
  puzzle: Puzzle;
  userId: string | null;
  isGuest: boolean;
  tapeStats: TapeStats | null;
  onTapeUpdate: (stats: TapeStats) => void;
  onGuestSignIn: () => void;
  dailyColors: ClueColor[];
}

export default function Game({
  puzzle,
  userId,
  isGuest,
  tapeStats,
  onTapeUpdate,
  onGuestSignIn,
  dailyColors,
}: GameProps) {
  const [state, setState] = useState<GameState | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [waving, setWaving] = useState(true); // entrance wave on mount
  const [revealing, setRevealing] = useState(false);
  const [shareLabel, setShareLabel] = useState<string | null>(null);
  const [shareMode, setShareMode] = useState(false);
  const [tapeResult, setTapeResult] = useState<GameCompletionResult | null>(null);
  const [selectedClue, setSelectedClue] = useState<number | null>(null);

  // Clear entrance wave after animation finishes
  useEffect(() => {
    const timer = setTimeout(() => setWaving(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load or initialize game state
  useEffect(() => {
    const saved = loadGameState(puzzle.date);
    if (saved && saved.puzzleId === puzzle.id) {
      setState(saved);
      // If loading a completed game, skip to share state
      if (saved.completed) {
        if (saved.solved) setCelebrating(true);
        setRevealing(true);
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

  // Record tape when game completes
  useEffect(() => {
    if (!state?.completed) return;

    if (userId && !isGuest) {
      // Authenticated: record to Supabase
      const expectedCount = state.score > 0 ? state.score : 1;
      recordGameCompletion(
        userId,
        puzzle.date,
        puzzle.id,
        state.score,
        state.solved,
        dailyColors,
        state.guesses
      ).then((result) => {
        setTapeResult(result);
        // Refresh tape stats in parent (DB was corrected server-side)
        loadTapeStats(userId).then(onTapeUpdate);
      });
    } else {
      // Guest: compute locally but don't persist
      setTapeResult({
        colorsEarned: getEarnedColors(state.score, dailyColors),
        newTotal: 0,
        newStreak: 0,
        tapeByColor: {},
      });
    }
  }, [state?.completed, state?.score, state?.solved, userId, isGuest, puzzle, onTapeUpdate, dailyColors]);

  // Fire confetti when transitioning to share mode after a win
  const fireConfetti = useCallback(async (colors: TapeColor[]) => {
    const { default: confettiFn } = await import("canvas-confetti");
    const hexColors = colors.map(getColorHex);
    confettiFn({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: hexColors,
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      confettiFn({
        particleCount: 40,
        spread: 90,
        origin: { y: 0.5, x: 0.4 },
        colors: hexColors,
        disableForReducedMotion: true,
      });
    }, 200);
  }, []);

  const handleGuess = useCallback(
    (guess: string) => {
      if (!state) return;
      const next = submitGuess(state, guess, puzzle);
      setState(next);

      if (next.solved) {
        // Win flow: confetti → reveal → share mode (fast)
        setCelebrating(true);
        const earnedColors = getEarnedColors(next.score, dailyColors);
        fireConfetti(earnedColors);

        if (next.score > 0) {
          setTimeout(() => setRevealing(true), REVEAL_START_DELAY_MS);
          const unrevealedCount = next.score;
          const revealDuration = REVEAL_START_DELAY_MS
            + (unrevealedCount * REVEAL_STAGGER_MS)
            + TAPE_PEEL_MS
            + READING_PAUSE_MS;
          setTimeout(() => {
            setShareMode(true);
          }, revealDuration);
        } else {
          setRevealing(true);
          setTimeout(() => {
            setShareMode(true);
          }, SCORE_ZERO_SHARE_DELAY_MS);
        }
      } else if (next.completed) {
        // Loss: flash, then share mode (all clues already visible)
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), WRONG_FLASH_MS);
        setRevealing(true);
        setTimeout(() => {
          setShareMode(true);
        }, LOSS_SHARE_DELAY_MS);
      } else {
        // Flash on wrong guess
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), WRONG_FLASH_MS);
      }
    },
    [state, puzzle, fireConfetti, dailyColors]
  );

const handleShare = async () => {
    if (!state || selectedClue === null) return;
    const result = await shareResult(state, puzzle, selectedClue, dailyColors);
    if (result === "shared") {
      setShareLabel("Shared!");
      setTimeout(() => setShareLabel(null), SHARE_LABEL_MS);
    } else if (result === "saved") {
      setShareLabel("Saved!");
      setTimeout(() => setShareLabel(null), SHARE_LABEL_MS);
    }
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  const puzzleNumber = puzzle.puzzle_number ?? puzzle.id;

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      {/* Header */}
      <header className="shrink-0 text-center mb-1">
        <h1 className="font-title text-[7rem] leading-none tracking-wide">
          {["S", "P", "I", "K", "E"].map((letter, i) => {
            const isLit = state.completed
              ? i >= 5 - state.score
              : i >= state.revealedClues;
            const color = ALL_COLORS[dailyColors[i]];
            const isGold = dailyColors[i] === "gold";
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-500 ${
                  (waving || celebrating) ? "animate-spike-wave" : ""
                } ${isLit && isGold ? "gold-text-glow" : ""}`}
                style={{
                  color: isLit && !isGold ? color : !isLit ? "rgba(255,255,255,0.9)" : undefined,
                  textShadow: isLit && !isGold ? `0 0 24px ${color}40` : !isLit ? "none" : undefined,
                  animationDelay: (waving || celebrating) ? `${i * 100}ms` : isLit && isGold ? `${i * 0.3}s` : "0ms",
                }}
              >
                {letter}
              </span>
            );
          })}
        </h1>

        {/* Category subtitle / answer reveal */}
        <div className="relative h-7 overflow-hidden mt-1">
          {shareMode ? (
            <p
              key="answer"
              className={`text-sm font-bold tracking-wide uppercase animate-slot-in ${
                state.solved ? "text-green-300" : "text-red-300"
              }`}
            >
              {puzzle.answer}
              <span className="text-white/30 ml-2 text-xs tracking-widest">
                #{String(puzzleNumber).padStart(3, "0")}
              </span>
            </p>
          ) : (
            <p key="category" className="text-sm text-white/70 tracking-wide uppercase">
              {puzzle.category}
            </p>
          )}
        </div>
      </header>

      {/* Guess history chips — fixed height so nothing shifts */}
      <div className="shrink-0 h-7 flex items-center gap-1.5 px-1 overflow-x-auto">
        {state.guesses.map((g, i) => {
          const isCorrect = i === state.guesses.length - 1 && state.solved;
          return (
            <span
              key={i}
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-sm whitespace-nowrap
                animate-fade-in
                ${isCorrect
                  ? "bg-green-500/15 text-green-300/80 border border-green-500/20"
                  : "bg-white/[0.04] text-white/30 border border-white/[0.06]"
                }
              `}
            >
              {isCorrect ? (
                <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 5.5L4.5 8L8 2.5"/></svg>
              ) : (
                <svg className="w-2.5 h-2.5 shrink-0 opacity-50" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 2.5l5 5M7.5 2.5l-5 5"/></svg>
              )}
              {g}
            </span>
          );
        })}
      </div>

      {/* Clue board with inline guess input */}
      <div className="py-1">
        <ClueBoard
          clues={puzzle.clues}
          revealedCount={state.revealedClues}
          completed={state.completed}
          revealing={revealing}
          dailyColors={dailyColors}
          shareMode={shareMode}
          selectedClue={selectedClue}
          onSelectClue={setSelectedClue}
          onGuess={handleGuess}
          disabled={state.completed}
          category={puzzle.category}
          guessCount={state.guesses.length}
        />
      </div>

      {/* CTA button — instruction state → active send */}
      {shareMode && (
        <div className="shrink-0 flex justify-center mt-2 animate-fade-in">
          {shareLabel ? (
            <button
              disabled
              className="
                w-full max-w-xs rounded-none px-5 py-3 text-sm font-semibold uppercase tracking-widest
                border border-green-500/30 bg-green-500/15 text-green-300
              "
            >
              {shareLabel}
            </button>
          ) : selectedClue !== null ? (
            <button
              onClick={handleShare}
              className="
                w-full max-w-xs rounded-none px-5 py-3 text-sm font-semibold uppercase tracking-widest
                transition-all duration-500
                border border-green-500/30 bg-green-500/15 text-green-300
                hover:bg-green-500/25 hover:border-green-500/50 hover:text-green-200
                active:scale-[0.98]
              "
            >
              Send a friend a clue
            </button>
          ) : (
            <button
              disabled
              className="
                w-full max-w-xs rounded-none px-5 py-3 text-sm font-semibold uppercase tracking-widest
                transition-all duration-500
                border border-white/10 bg-white/[0.04] text-white/30
                cursor-default
              "
            >
              Tap a clue to send a friend
            </button>
          )}
        </div>
      )}

      {/* Tape result (shown after completion, below clues) */}
      {state.completed && tapeResult && shareMode && (
        <div className="shrink-0">
        <TapeResult
          colorsEarned={tapeResult.colorsEarned}
          totalTape={tapeResult.newTotal}
          solved={state.solved}
          isGuest={isGuest}
          onSignIn={onGuestSignIn}
        />
        </div>
      )}

    </div>
  );
}
