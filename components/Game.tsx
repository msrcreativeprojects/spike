"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Puzzle, GameState, ALL_COLORS, type ClueColor, type TapeStats, type TapeColor } from "@/types/puzzle";
import { createInitialState, submitGuess } from "@/lib/gameLogic";
import { loadGameState, saveGameState, clearGameState } from "@/lib/storage";
import { shareResult } from "@/lib/shareResult";
import { getEncouragement } from "@/data/encouragements";
import { recordGameCompletion, loadTapeStats, type GameCompletionResult } from "@/lib/tapeService";
import ClueList from "./ClueList";
import GuessForm from "./GuessForm";
import TapeResult from "./TapeResult";

const TOTAL_CLUES = 5;

interface GameProps {
  puzzle: Puzzle;
  userId: string | null;
  isGuest: boolean;
  tapeStats: TapeStats | null;
  onTapeUpdate: (stats: TapeStats) => void;
  onGuestSignIn: () => void;
  dailyColors: ClueColor[];
}

function getColorHex(color: TapeColor): string {
  if (color === "glow") return "#c8ffc8";
  if (color === "white") return "#e0e0e0";
  return ALL_COLORS[color as ClueColor] ?? "#ffffff";
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
  const [collecting, setCollecting] = useState(false);
  const [shareLabel, setShareLabel] = useState<string | null>(null);
  const [shareMode, setShareMode] = useState(false);
  const [tapeResult, setTapeResult] = useState<GameCompletionResult | null>(null);

  // Load or initialize game state
  useEffect(() => {
    const saved = loadGameState(puzzle.date);
    if (saved && saved.puzzleId === puzzle.id) {
      setState(saved);
      // If loading a completed game, skip to share state
      if (saved.completed) {
        if (saved.solved) setCelebrating(true);
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
      recordGameCompletion(
        userId,
        puzzle.date,
        puzzle.id,
        state.score,
        state.solved,
        dailyColors
      ).then((result) => {
        setTapeResult(result);
        // Refresh tape stats in parent
        loadTapeStats(userId).then(onTapeUpdate);
      });
    } else {
      // Guest: compute locally but don't persist
      const colorsEarned: TapeColor[] = state.score > 0
        ? dailyColors.slice(5 - state.score)
        : ["white"];
      setTapeResult({
        colorsEarned,
        newTotal: 0,
        newStreak: 0,
        tapeByColor: {},
      });
    }
  }, [state?.completed, state?.score, state?.solved, userId, isGuest, puzzle, onTapeUpdate, dailyColors]);

  // Fire confetti when transitioning to share mode after a win
  const fireConfetti = useCallback((colors: TapeColor[]) => {
    const hexColors = colors.map(getColorHex);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: hexColors,
      disableForReducedMotion: true,
    });
    setTimeout(() => {
      confetti({
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
        // Win flow: SPIKE wave → tapes fall → confetti → share mode
        setCelebrating(true);

        if (next.score > 0) {
          // Tapes to collect: fall after a beat
          setTimeout(() => setCollecting(true), 600);
          // After tapes finish falling, fire confetti and go to share
          const fallDuration = 600 + (next.score * 150) + 600; // delay + stagger + fall
          setTimeout(() => {
            const earnedColors = dailyColors.slice(5 - next.score);
            fireConfetti(earnedColors);
            setShareMode(true);
          }, fallDuration);
        } else {
          // Solved on 6th guess (score 0): white consolation tape + white confetti
          setTimeout(() => {
            fireConfetti(["white"]);
            setShareMode(true);
          }, 1000);
        }
      } else if (next.completed) {
        // Loss: flash, then white confetti + share mode
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 600);
        setTimeout(() => {
          fireConfetti(["white"]);
          setShareMode(true);
        }, 1200);
      } else {
        // Flash on wrong guess
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 600);
      }
    },
    [state, puzzle, dailyColors, fireConfetti]
  );

  const handleReset = () => {
    clearGameState(puzzle.date);
    setState(createInitialState(puzzle.id));
    setCelebrating(false);
    setCollecting(false);
    setShareLabel(null);
    setShareMode(false);
    setTapeResult(null);
    confetti.reset();
  };

  const handleShare = async () => {
    if (!state) return;
    const tapeInfo = tapeResult && !isGuest
      ? {
          colorsEarned: tapeResult.colorsEarned,
          totalTape: tapeResult.newTotal,
        }
      : undefined;
    const result = await shareResult(state, dailyColors, tapeInfo);
    if (result === "shared") {
      setShareLabel("Shared!");
      setTimeout(() => setShareLabel(null), 2000);
    } else if (result === "saved") {
      setShareLabel("Saved!");
      setTimeout(() => setShareLabel(null), 2000);
    }
  };

  if (!state) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  const lastGuess = state.guesses[state.guesses.length - 1] ?? "";
  const tapeCollected = state.score > 0 ? state.score : 1; // min 1 (white consolation)

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <header className="text-center mb-2">
        {shareMode && (
          <p
            key="share"
            className="text-sm text-white/35 tracking-widest uppercase"
          >
            {"share your".split("").map((char, ci) => (
              <span
                key={ci}
                className="inline-block animate-letter-in"
                style={{ animationDelay: `${ci * 40}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        )}
        <h1 className="font-title text-8xl tracking-wide">
          {["S", "P", "I", "K", "E"].map((letter, i) => {
            const isLit = state.completed
              ? i >= 5 - state.score
              : i >= state.revealedClues;
            const color = ALL_COLORS[dailyColors[i]];
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
            {shareLabel ?? "Share"}
          </button>
        ) : (
          <GuessForm
            onGuess={handleGuess}
            disabled={state.completed}
            lockedValue={state.completed ? lastGuess : undefined}
            solved={state.solved}
            failed={state.completed && !state.solved}
            category={puzzle.category}
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
                ? state.score > 0
                  ? `Collected ${tapeCollected}/5 tape!`
                  : `Collected 1/5 tape!`
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

      {/* Tape result (shown after completion) */}
      {state.completed && tapeResult && shareMode && (
        <TapeResult
          colorsEarned={tapeResult.colorsEarned}
          totalTape={tapeResult.newTotal}
          solved={state.solved}
          isGuest={isGuest}
          onSignIn={onGuestSignIn}
        />
      )}

      {/* Clues board — hide in share mode */}
      {!shareMode && (
        <ClueList
          clues={puzzle.clues}
          revealedCount={state.revealedClues}
          completed={state.completed}
          collecting={collecting}
          dailyColors={dailyColors}
        />
      )}

      {/* Dev reset — hidden but always available */}
      <button
        onClick={handleReset}
        className="mx-auto mt-4 text-[10px] text-white/[0.07] hover:text-white/25 transition-colors"
      >
        reset puzzle
      </button>
    </div>
  );
}
