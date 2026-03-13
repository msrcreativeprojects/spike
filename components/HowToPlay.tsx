"use client";

import { useState, useCallback, useEffect } from "react";
import { ALL_COLORS, ALL_COLOR_NAMES, GLOW_COLOR, type ClueColor } from "@/types/puzzle";

interface HowToPlayProps {
  onClose: () => void;
  dailyColors?: ClueColor[];
}

const TOTAL_STEPS = 4;
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];
const FALLBACK_COLORS: ClueColor[] = ["pink", "purple", "blue", "green", "yellow"];
const DEMO_CATEGORIES = ["Broadway Musical", "Play", "Actor", "Theater"];

// Organic x-offsets for "marks on a stage" layout
const TAPE_X = [-8, 16, -18, 12, -3];

/* ═══════════════════════════════════════════════════════════════════
   STEP 1 — THE GOAL
   "Collect tape. Build streaks. Earn glow tape."
   ═══════════════════════════════════════════════════════════════════ */
function StepGoal({ colors }: { colors: ClueColor[] }) {
  const allHexes = ALL_COLOR_NAMES.map((c) => ALL_COLORS[c]).join(", ");

  return (
    <div className="flex flex-col items-center">
      {/* Tape marks — staggered like marks on a stage floor */}
      <div className="flex flex-col items-center gap-1.5 py-6">
        {colors.map((color, i) => (
          <div
            key={i}
            className="animate-fade-in"
            style={{
              height: "10px",
              width: "5rem",
              backgroundColor: ALL_COLORS[color],
              transform: `translateX(${TAPE_X[i]}px) rotate(${ROTATIONS[i]}deg)`,
              animationDelay: `${i * 100}ms`,
              animationFillMode: "backwards",
            }}
          />
        ))}
      </div>

      {/* Glow tape + counter */}
      <div
        className="flex items-center gap-4 mt-2 animate-fade-in"
        style={{ animationDelay: "600ms", animationFillMode: "backwards" }}
      >
        <div
          className="h-2.5 w-12 animate-glow-pulse"
          style={{ backgroundColor: GLOW_COLOR }}
        />
        <div className="flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-1.5">
          <span
            className="inline-block h-2 w-3.5"
            style={{ background: `linear-gradient(90deg, ${allHexes})` }}
          />
          <span className="text-xs font-semibold text-white/40 tabular-nums">47</span>
        </div>
      </div>

      {/* Copy */}
      <div
        className="mt-8 text-center animate-fade-in"
        style={{ animationDelay: "800ms", animationFillMode: "backwards" }}
      >
        <p className="text-base text-white/60 leading-relaxed">
          Collect tape. Build streaks.
          <br />
          Earn glow tape.
        </p>
        <p className="text-sm text-white/30 mt-3">
          New puzzle every day.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 2 — HOW YOU EARN IT
   "Guess right and keep your remaining tape."
   ═══════════════════════════════════════════════════════════════════ */
function StepEarn({ colors }: { colors: ClueColor[] }) {
  const letters = ["S", "P", "I", "K", "E"];
  // 3/5 scenario — guessed right with 3 tapes left
  const collectedColors = colors.slice(2);

  return (
    <div className="flex flex-col items-center">
      {/* Copy above */}
      <p className="text-base text-white/60 text-center leading-relaxed">
        Guess right and keep
        <br />
        your remaining tape.
      </p>

      {/* SPIKE letters — 3 lit (I, K, E), 2 dim (S, P) */}
      <div className="font-title text-5xl tracking-wide py-5">
        {letters.map((letter, i) => {
          const isLit = i >= 2;
          const color = ALL_COLORS[colors[i]];
          return (
            <span
              key={i}
              className="inline-block animate-fade-in"
              style={{
                color: isLit ? color : "rgba(255,255,255,0.18)",
                textShadow: isLit ? `0 0 24px ${color}40` : "none",
                animationDelay: `${200 + i * 80}ms`,
                animationFillMode: "backwards",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Collected tape strips */}
      <div className="flex gap-2.5 items-center mb-2">
        {collectedColors.map((c, i) => (
          <div
            key={i}
            className="h-3 w-11 animate-fade-in"
            style={{
              backgroundColor: ALL_COLORS[c],
              transform: `rotate(${ROTATIONS[i + 2]}deg)`,
              animationDelay: `${600 + i * 120}ms`,
              animationFillMode: "backwards",
            }}
          />
        ))}
      </div>

      <p
        className="text-sm text-white/30 text-center mt-4 animate-fade-in"
        style={{ animationDelay: "900ms", animationFillMode: "backwards" }}
      >
        New colors every day.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 3 — THE TRADEOFF
   "Wrong answers cost tape — but reveal clues."
   ═══════════════════════════════════════════════════════════════════ */
function StepCost({ colors }: { colors: ClueColor[] }) {
  const [flash, setFlash] = useState(false);
  const [peeled, setPeeled] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const run = () => {
      setFlash(true);
      setPeeled(false);
      setTimeout(() => setFlash(false), 500);
      setTimeout(() => {
        setPeeled(true);
        setCycle((c) => c + 1);
      }, 700);
    };
    run();
    const interval = setInterval(() => {
      setPeeled(false);
      setFlash(false);
      setTimeout(run, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Copy above */}
      <p className="text-base text-white/60 text-center leading-relaxed mb-6">
        Wrong answers cost tape,
        <br />
        but reveal clues.
      </p>

      {/* Mock wrong guess */}
      <div
        className="flex gap-0 w-full transition-all duration-300"
        style={{ transform: flash ? "translateX(-3px)" : "none" }}
      >
        <div
          className="flex-1 border border-r-0 px-4 py-3 text-sm transition-colors duration-300"
          style={{
            borderColor: flash ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)",
            backgroundColor: flash ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.06)",
            color: flash ? "rgba(239,68,68,0.8)" : "rgba(255,255,255,0.45)",
          }}
        >
          wrong answer
        </div>
        <div
          className="px-5 py-3 text-sm font-semibold transition-colors duration-300"
          style={{
            backgroundColor: flash ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.9)",
            color: flash ? "rgba(255,255,255,0.6)" : "black",
          }}
        >
          {flash ? "X" : "Submit"}
        </div>
      </div>

      {/* Tape → clue reveal */}
      <div className="relative w-full mt-3" style={{ height: "36px" }}>
        {/* Revealed clue underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-white/55 transition-opacity duration-500"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            opacity: peeled ? 1 : 0,
          }}
        >
          A clue appears...
        </div>
        {/* Tape on top */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundColor: ALL_COLORS[colors[cycle % colors.length]],
            transform: peeled
              ? `translateX(120%) rotate(${ROTATIONS[0] + 5}deg)`
              : `rotate(${ROTATIONS[0]}deg)`,
            opacity: peeled ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 4 — YOUR TURN
   "The category tells you what to guess."
   ═══════════════════════════════════════════════════════════════════ */
function StepPlay() {
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatIndex((i) => (i + 1) % DEMO_CATEGORIES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Copy above */}
      <p className="text-base text-white/60 text-center leading-relaxed mb-6">
        The category tells you
        <br />
        what to guess.
      </p>

      {/* Mock input with rotating category */}
      <div className="flex gap-0 w-full">
        <div
          className="flex-1 border border-r-0 px-4 py-3 text-sm overflow-hidden"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <span
            key={catIndex}
            className="inline-block animate-slot-in animate-glow-text-pulse"
            style={{ color: GLOW_COLOR }}
          >
            {DEMO_CATEGORIES[catIndex]}
          </span>
        </div>
        <div
          className="px-5 py-3 text-sm font-semibold"
          style={{
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "black",
          }}
        >
          Submit
        </div>
      </div>

      {/* Copy below */}
      <p className="text-base text-white/60 text-center leading-relaxed mt-6">
        Type your answer and hit submit.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   Goal → Earn → Cost → Play → "Places"
   ═══════════════════════════════════════════════════════════════════ */
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
      case 0: return <StepGoal colors={colors} />;
      case 1: return <StepEarn colors={colors} />;
      case 2: return <StepCost colors={colors} />;
      case 3: return <StepPlay />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/85 transition-opacity duration-300 ${
          closing ? "opacity-0" : ""
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-md border border-white/[0.08] bg-[#0a0a0c] px-8 py-10 ${
          closing ? "animate-curtain-down" : "animate-curtain-up"
        }`}
        style={{ maxHeight: "80dvh", overflowY: "auto" }}
      >
        {/* Step content */}
        <div key={`step-${step}`} className="animate-fade-in">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-5 border-t border-white/[0.06]">
          {/* Back */}
          <button
            onClick={prev}
            className={`text-base text-white/25 hover:text-white/55 transition-colors w-12 ${
              step === 0 ? "invisible" : ""
            }`}
            aria-label="Previous step"
          >
            &larr;
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === step ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.12)",
                  transform: i === step ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Next / Places */}
          <button
            onClick={next}
            className="rounded-none bg-white/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white active:scale-[0.97] transition-all"
          >
            {isLast ? "Places" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
