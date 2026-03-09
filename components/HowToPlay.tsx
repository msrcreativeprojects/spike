"use client";

import { useState, useCallback, useEffect } from "react";
import { ALL_COLORS, ALL_COLOR_NAMES, GLOW_COLOR, type ClueColor } from "@/types/puzzle";

interface HowToPlayProps {
  onClose: () => void;
  dailyColors?: ClueColor[];
}

const TOTAL_STEPS = 4;
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

// Fallback colors if dailyColors not yet available
const FALLBACK_COLORS: ClueColor[] = ["pink", "purple", "blue", "green", "yellow"];

/* ─── Step 1: TAKE A GUESS ─── */
function StepTakeAGuess() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mock guess box with glow-tape category */}
      <div className="flex gap-0 w-[260px]">
        <div
          className="flex-1 border border-r-0 px-3 py-2.5 text-xs"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.35)" }}>Guess a </span>
          <span
            className="animate-glow-text-pulse"
            style={{ color: GLOW_COLOR }}
          >
            Broadway Musical
          </span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>...</span>
        </div>
        <div
          className="px-3 py-2.5 text-xs font-semibold"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "black",
          }}
        >
          Submit
        </div>
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        The category tells you what to guess.
        <br />
        Type your best shot and submit.
      </p>
    </div>
  );
}

/* ─── Step 2: WRONG ANSWERS ─── */
function StepWrongAnswers({ colors }: { colors: ClueColor[] }) {
  const [flash, setFlash] = useState(false);
  const [autoPeeled, setAutoPeeled] = useState(false);
  const [lostCount, setLostCount] = useState(0);

  useEffect(() => {
    const run = () => {
      setFlash(true);
      setAutoPeeled(false);
      setTimeout(() => setFlash(false), 500);
      setTimeout(() => {
        setAutoPeeled(true);
        setLostCount((c) => c + 1);
      }, 700);
    };
    run();
    const interval = setInterval(() => {
      setAutoPeeled(false);
      setFlash(false);
      setTimeout(run, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 overflow-hidden">
      {/* Mini input mockup */}
      <div
        className="flex gap-0 w-[220px] transition-all duration-300"
        style={{ transform: flash ? "translateX(-3px)" : "none" }}
      >
        <div
          className="flex-1 border border-r-0 px-3 py-2 text-xs transition-colors duration-300"
          style={{
            borderColor: flash ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)",
            backgroundColor: flash ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.06)",
            color: flash ? "rgba(239,68,68,0.8)" : "rgba(255,255,255,0.5)",
          }}
        >
          wrong answer
        </div>
        <div
          className="px-3 py-2 text-xs font-semibold transition-colors duration-300"
          style={{
            backgroundColor: flash ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.9)",
            color: flash ? "rgba(255,255,255,0.6)" : "black",
          }}
        >
          {flash ? "X" : "Submit"}
        </div>
      </div>
      {/* Mini tape that auto-peels */}
      <div className="relative" style={{ width: "220px", height: "28px" }}>
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-white/60 transition-opacity duration-500"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            opacity: autoPeeled ? 1 : 0,
          }}
        >
          A clue appears...
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-black/25 transition-all duration-700"
          style={{
            backgroundColor: ALL_COLORS[colors[lostCount % colors.length]],
            transform: autoPeeled
              ? `translateX(120%) rotate(${ROTATIONS[0] + 5}deg)`
              : `rotate(${ROTATIONS[0]}deg)`,
            opacity: autoPeeled ? 0 : 1,
          }}
        />
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Wrong guesses cost tape
        <br />
        — but reveal clues.
      </p>
    </div>
  );
}

/* ─── Step 3: COLLECT YOUR TAPE ─── */
function StepCollect({ colors }: { colors: ClueColor[] }) {
  const letters = ["S", "P", "I", "K", "E"];
  // Show a 3/5 scenario: first 2 peeled (dim), last 3 collected (glowing)
  const collectedColors = colors.slice(2);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-title text-5xl tracking-wide py-2">
        {letters.map((letter, i) => {
          const isLit = i >= 2;
          const color = ALL_COLORS[colors[i]];
          return (
            <span
              key={i}
              className="inline-block"
              style={{
                color: isLit ? color : "rgba(255,255,255,0.25)",
                textShadow: isLit ? `0 0 24px ${color}40` : "none",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      {/* Mini tape strips showing what you collect */}
      <div className="flex gap-1.5 items-center">
        {collectedColors.map((c, i) => (
          <div
            key={i}
            className="h-3 w-8"
            style={{ backgroundColor: ALL_COLORS[c] }}
          />
        ))}
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Guess right and collect your
        <br />
        remaining tape!
        <br />
        New colors every day.
      </p>
    </div>
  );
}

/* ─── Step 4: THE QUEST ─── */
function StepTheQuest() {
  // Build gradient from all 8 neon colors
  const allHexes = ALL_COLOR_NAMES.map((c) => ALL_COLORS[c]).join(", ");
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Glow tape pulsing */}
      <div className="flex flex-col items-center gap-2 py-2">
        <div
          className="h-5 w-20 animate-glow-pulse"
          style={{ backgroundColor: GLOW_COLOR }}
        />
        <p className="text-[10px] uppercase tracking-widest text-white/30">
          glow tape
        </p>
      </div>
      {/* Mini tape counter mockup */}
      <div className="flex items-center gap-1.5 border border-white/15 bg-white/[0.04] px-3 py-1.5">
        <span
          className="inline-block h-2.5 w-4"
          style={{
            background: `linear-gradient(90deg, ${allHexes})`,
          }}
        />
        <span className="text-xs font-semibold text-white/40 tabular-nums">47</span>
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Collect tape. Build streaks.
        <br />
        Earn glow tape.
        <br />
        New puzzle every day.
      </p>
    </div>
  );
}

const STEP_TITLES = [
  "TAKE A GUESS",
  "WRONG ANSWERS",
  "COLLECT YOUR TAPE",
  "THE QUEST",
];

export default function HowToPlay({ onClose, dailyColors }: HowToPlayProps) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);

  const colors = dailyColors ?? FALLBACK_COLORS;

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 250);
  }, [closing, onClose]);

  const next = useCallback(() => {
    if (step === TOTAL_STEPS - 1) {
      handleClose();
    } else {
      setStep((s) => s + 1);
    }
  }, [step, handleClose]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose, next, prev]);

  const isLast = step === TOTAL_STEPS - 1;

  const renderStep = () => {
    switch (step) {
      case 0: return <StepTakeAGuess />;
      case 1: return <StepWrongAnswers colors={colors} />;
      case 2: return <StepCollect colors={colors} />;
      case 3: return <StepTheQuest />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          closing ? "opacity-0" : ""
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-sm border border-white/10 bg-[#0a0a0c] p-6 pt-8 ${
          closing ? "animate-curtain-down" : "animate-curtain-up"
        }`}
        style={{ maxHeight: "80dvh", overflowY: "auto" }}
      >
        {/* Step title */}
        <h2
          key={step}
          className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-5 animate-fade-in"
        >
          {STEP_TITLES[step]}
        </h2>

        {/* Step content */}
        <div key={`content-${step}`} className="animate-fade-in">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
          {/* Back */}
          <button
            onClick={prev}
            className={`text-sm text-white/30 hover:text-white/60 transition-colors w-10 ${
              step === 0 ? "invisible" : ""
            }`}
            aria-label="Previous step"
          >
            &larr;
          </button>

          {/* Dots */}
          <div className="flex gap-1.5">
            {STEP_TITLES.map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 transition-all duration-300"
                style={{
                  backgroundColor:
                    i === step ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Next / Places */}
          <button
            onClick={next}
            className="rounded-none bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-black hover:bg-white active:scale-[0.97] transition-all"
          >
            {isLast ? "Places" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
