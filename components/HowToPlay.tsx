"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ALL_COLORS, GLOW_COLOR, type ClueColor } from "@/types/puzzle";

interface HowToPlayProps {
  onClose: () => void;
  dailyColors?: ClueColor[];
}

const TOTAL_STEPS = 4;
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];
const FALLBACK_COLORS: ClueColor[] = ["pink", "purple", "blue", "green", "yellow"];
const DEMO_CATEGORIES = ["Broadway Musical", "Leading Actress", "Choreographer", "Award Winner"];
const TAPE_X = [-8, 16, -18, 12, -3];

/* ═══════════════════════════════════════════════════════════════════
   STEP 1 — THE SETUP
   "Under five pieces of spike tape are five facts about a
    Broadway [Musical/Play/Actor/Theater]."
   ═══════════════════════════════════════════════════════════════════ */
function StepSetup({ colors }: { colors: ClueColor[] }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % DEMO_CATEGORIES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-base text-white/60 text-center leading-relaxed mb-8">
        Under five pieces of spike tape
        <br />
        are five facts about a
        <br />
        <span
          className="inline-block overflow-hidden align-bottom"
          style={{ height: "1.5em" }}
        >
          <span
            key={wordIndex}
            className="inline-block animate-slot-down font-semibold"
            style={{
              color: GLOW_COLOR,
              textShadow: `0 0 10px ${GLOW_COLOR}50, 0 0 25px ${GLOW_COLOR}20`,
            }}
          >
            {DEMO_CATEGORIES[wordIndex]}.
          </span>
        </span>
      </p>

      {/* Five tape strips covering facts */}
      <div className="flex flex-col items-center gap-1.5 w-3/4">
        {colors.map((color, i) => (
          <div
            key={i}
            className="relative w-full animate-fade-in"
            style={{
              animationDelay: `${300 + i * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div className="h-8 bg-white/[0.03]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: ALL_COLORS[color],
                transform: `translateX(${TAPE_X[i]}px) rotate(${ROTATIONS[i]}deg)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 2 — THE MECHANICS
   "Guess the Broadway [Musical] before all the tape is gone.
    Wrong answers cost tape, but reveal facts."
   ═══════════════════════════════════════════════════════════════════ */
function StepMechanics({ colors }: { colors: ClueColor[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [peeled, setPeeled] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % DEMO_CATEGORIES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    const startDelay = setTimeout(run, 600);
    const interval = setInterval(() => {
      setPeeled(false);
      setFlash(false);
      setTimeout(run, 400);
    }, 3500);
    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Copy with rotating category */}
      <div className="text-base text-white/60 text-center leading-relaxed mb-3">
        <div className="flex items-baseline justify-center gap-1.5 flex-wrap">
          <span>Guess the</span>
          <span
            className="inline-block overflow-hidden"
            style={{ height: "1.4em" }}
          >
            <span
              key={wordIndex}
              className="inline-block animate-slot-down font-semibold"
              style={{
                color: GLOW_COLOR,
                textShadow: `0 0 10px ${GLOW_COLOR}50, 0 0 25px ${GLOW_COLOR}20`,
              }}
            >
              {DEMO_CATEGORIES[wordIndex]}.
            </span>
          </span>
        </div>
      </div>
      <p className="text-sm text-white/40 text-center mb-6">
        Wrong answers cost tape, but reveal facts.
      </p>

      {/* Mock wrong guess */}
      <div className="w-4/5">
        <div
          className="flex gap-0 w-full transition-all duration-300"
          style={{ transform: flash ? "translateX(-3px)" : "none" }}
        >
          <div
            className="flex-1 border border-r-0 px-4 py-3 text-sm transition-colors duration-300"
            style={{
              borderColor: flash
                ? "rgba(239,68,68,0.4)"
                : "rgba(255,255,255,0.1)",
              backgroundColor: flash
                ? "rgba(239,68,68,0.1)"
                : "rgba(255,255,255,0.06)",
              color: flash
                ? "rgba(239,68,68,0.8)"
                : "rgba(255,255,255,0.45)",
            }}
          >
            wrong answer
          </div>
          <div
            className="px-5 py-3 text-sm font-semibold transition-colors duration-300"
            style={{
              backgroundColor: flash
                ? "rgba(239,68,68,0.4)"
                : "rgba(255,255,255,0.9)",
              color: flash ? "rgba(255,255,255,0.6)" : "black",
            }}
          >
            {flash ? "\u2715" : "Submit"}
          </div>
        </div>

        {/* Tape peels away to reveal fact */}
        <div className="relative w-full mt-3" style={{ height: "36px" }}>
          <div
            className="absolute inset-0 flex items-center justify-center text-xs text-white/50 transition-opacity duration-500"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              opacity: peeled ? 1 : 0,
            }}
          >
            A fact!
          </div>
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

    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 3 — THE REWARD (compact — ~75% height)
   "Guess right and collect the leftover tape.
    (earn glow tape from streaks)"
   ═══════════════════════════════════════════════════════════════════ */
function StepReward({ colors }: { colors: ClueColor[] }) {
  const letters = ["S", "P", "I", "K", "E"];
  const collectedColors = colors.slice(2);

  return (
    <div className="flex flex-col items-center">
      {/* Copy */}
      <p className="text-base text-white/60 text-center leading-relaxed">
        Guess right and collect
        <br />
        your leftover tape.
      </p>

      {/* SPIKE letters — 3 lit, with wave dance */}
      <div className="font-title text-6xl tracking-wide py-3">
        {letters.map((letter, i) => {
          const isLit = i >= 2;
          const color = ALL_COLORS[colors[i]];
          return (
            <span
              key={i}
              className="inline-block animate-spike-wave"
              style={{
                color: isLit ? color : "rgba(255,255,255,0.18)",
                textShadow: isLit ? `0 0 24px ${color}40` : "none",
                animationDelay: `${i * 100}ms`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Collected tape strips + count */}
      <div className="flex flex-col items-center mb-1">
        <div className="flex gap-2.5 items-center">
          {collectedColors.map((c, i) => (
            <div
              key={i}
              className="h-3 w-11 animate-fade-in"
              style={{
                backgroundColor: ALL_COLORS[c],
                transform: `rotate(${ROTATIONS[i + 2]}deg)`,
                animationDelay: `${400 + i * 120}ms`,
                animationFillMode: "backwards",
              }}
            />
          ))}
        </div>
        <span
          className="text-sm font-semibold text-white/50 mt-1.5 animate-fade-in"
          style={{ animationDelay: "800ms", animationFillMode: "backwards" }}
        >
          +{collectedColors.length}
        </span>
      </div>

      {/* Parenthetical + glow tape (glow at the end) */}
      <div
        className="flex items-center gap-3 mt-3 animate-fade-in"
        style={{ animationDelay: "700ms", animationFillMode: "backwards" }}
      >
        <p className="text-sm text-white/30 italic">
          earn glow from streaks
        </p>
        <div
          className="h-2 w-7 animate-glow-pulse"
          style={{ backgroundColor: GLOW_COLOR }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 4 — THE SHARE
   "Then send a friend a clue and see how they do."
   Facts → selection → card moves into iMessage bubble →
   typing dots → friend replies "MAMMA MIA 2!!" → you reply "omg"
   ═══════════════════════════════════════════════════════════════════ */
function StepShare({ colors }: { colors: ClueColor[] }) {
  const SELECTED = 2; // Fact 3 is always the pick
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState(0);
  // phase 0: facts visible, selection cycling
  // phase 1: selection landed on Fact 3, green button
  // phase 2: iMessage — blue bubble with card (you send a clue)
  // phase 3: typing dots (friend typing)
  // phase 4: friend replies "MAMMA MIA 2!!"
  // phase 5: you text back "omg"

  useEffect(() => {
    const run = () => {
      setSelectedIdx(null);
      setPhase(0);

      return [
        setTimeout(() => setSelectedIdx(1), 400),
        setTimeout(() => setSelectedIdx(4), 800),
        setTimeout(() => {
          setSelectedIdx(SELECTED);
          setPhase(1);
        }, 1200),
        // Click → straight to iMessage
        setTimeout(() => setPhase(2), 2000),
        // Typing dots
        setTimeout(() => setPhase(3), 2800),
        // Friend replies "MAMMA MIA 2!!"
        setTimeout(() => setPhase(4), 3200),
        // You text back "omg" — quickly after
        setTimeout(() => setPhase(5), 3800),
      ];
    };

    let timers = run();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = run();
    }, 5500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  const selectedColor = ALL_COLORS[colors[SELECTED]];

  return (
    <div className="flex flex-col items-center">
      {/* Copy */}
      <p className="text-base text-white/60 text-center leading-relaxed mb-5">
        Then send a friend a clue
        <br />
        and see how they do.
      </p>

      <div className="w-full" style={{ minHeight: 198 }}>
        {/* Phase 0–1: fact board + green button */}
        {phase < 2 && (
          <>
            <div className="flex flex-col gap-1 w-full">
              {[1, 2, 3, 4, 5].map((n, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 text-xs transition-all duration-200"
                  style={{
                    backgroundColor:
                      selectedIdx === i
                        ? `${ALL_COLORS[colors[i]]}15`
                        : "rgba(255,255,255,0.04)",
                    borderLeft:
                      selectedIdx === i
                        ? `3px solid ${ALL_COLORS[colors[i]]}`
                        : "3px solid transparent",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  Fact {n}
                </div>
              ))}
            </div>

            {phase === 1 && (
              <button
                className="
                  w-full mt-2 py-2 text-xs font-semibold uppercase tracking-widest
                  border border-green-500/30 bg-green-500/15 text-green-300
                  animate-fade-in
                "
              >
                Send a friend a clue
              </button>
            )}
          </>
        )}

        {/* Phase 2+: iMessage exchange */}
        {phase >= 2 && (
          <div className="w-full space-y-2.5 animate-fade-in">
            {/* Sent bubble — clue card inside blue bubble (you send a clue) */}
            <div className="flex justify-end">
              <div
                className="px-2 py-2"
                style={{
                  backgroundColor: "#007AFF",
                  borderRadius: "16px 16px 4px 16px",
                }}
              >
                <div
                  className="px-3 py-2 text-xs text-white/90"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    borderLeft: `3px solid ${selectedColor}`,
                  }}
                >
                  Fact 3
                </div>
              </div>
            </div>

            {/* Typing dots → friend replies "Mamma Mia" */}
            {phase >= 3 && (
              <div
                key={phase >= 4 ? "reply" : "dots"}
                className="flex justify-start animate-fade-in"
              >
                <div
                  className="text-xs px-3.5 py-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "16px 16px 16px 4px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {phase === 3 ? (
                    <span className="flex gap-1 items-center h-4">
                      <span
                        className="typing-dot"
                        style={{ animationDelay: "0ms" }}
                      >
                        &bull;
                      </span>
                      <span
                        className="typing-dot"
                        style={{ animationDelay: "200ms" }}
                      >
                        &bull;
                      </span>
                      <span
                        className="typing-dot"
                        style={{ animationDelay: "400ms" }}
                      >
                        &bull;
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm font-semibold">
                      MAMMA MIA 2!!
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* You text back "omg" */}
            {phase >= 5 && (
              <div className="flex justify-end animate-fade-in">
                <div
                  className="text-sm font-semibold px-3.5 py-2"
                  style={{
                    backgroundColor: "#007AFF",
                    borderRadius: "16px 16px 4px 16px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  omg
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   Setup → Mechanics → Reward → Share → Ready?
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
      case 0:
        return <StepSetup colors={colors} />;
      case 1:
        return <StepMechanics colors={colors} />;
      case 2:
        return <StepReward colors={colors} />;
      case 3:
        return <StepShare colors={colors} />;
      default:
        return null;
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
                    i === step
                      ? "rgba(255,255,255,0.65)"
                      : "rgba(255,255,255,0.12)",
                  transform: i === step ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Next / Ready? */}
          <button
            onClick={next}
            className="rounded-none bg-white/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-black hover:bg-white active:scale-[0.97] transition-all"
          >
            {isLast ? "Ready?" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
