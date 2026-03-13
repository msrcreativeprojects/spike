"use client";

import { useState, useCallback, useEffect } from "react";
import { ALL_COLORS, GLOW_COLOR, type ClueColor } from "@/types/puzzle";

interface HowToPlayProps {
  onClose: () => void;
  dailyColors?: ClueColor[];
}

const TOTAL_STEPS = 4;
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];
const FALLBACK_COLORS: ClueColor[] = ["pink", "purple", "blue", "green", "yellow"];
const CATEGORY_WORDS = ["Musical", "Play", "Actor", "Theater"];
const TAPE_X = [-8, 16, -18, 12, -3];

/* ═══════════════════════════════════════════════════════════════════
   STEP 1 — THE SETUP
   "Under five pieces of spike tape are five facts about a Broadway ___."
   ═══════════════════════════════════════════════════════════════════ */
function StepSetup({ colors }: { colors: ClueColor[] }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % CATEGORY_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Copy with inline rotating category */}
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
            className="inline-block animate-slot-in font-semibold text-white/80"
          >
            Broadway {CATEGORY_WORDS[wordIndex]}.
          </span>
        </span>
      </p>

      {/* Five tape strips covering facts */}
      <div className="flex flex-col items-center gap-1.5 w-full max-w-[280px]">
        {colors.map((color, i) => (
          <div
            key={i}
            className="relative w-full animate-fade-in"
            style={{
              animationDelay: `${300 + i * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            {/* Fact underneath (hidden by tape) */}
            <div className="h-8 bg-white/[0.03]" />
            {/* Tape overlay */}
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
   "Guess what's what before all the tape is gone.
    Wrong answers cost tape, but reveal facts."
   ═══════════════════════════════════════════════════════════════════ */
function StepMechanics({ colors }: { colors: ClueColor[] }) {
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
      {/* Copy above */}
      <p className="text-base text-white/60 text-center leading-relaxed mb-6">
        Guess what&apos;s what before
        <br />
        all the tape is gone.
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
          {flash ? "\u2715" : "Submit"}
        </div>
      </div>

      {/* Tape peels away to reveal fact */}
      <div className="relative w-full mt-3" style={{ height: "36px" }}>
        {/* Revealed fact underneath */}
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-white/50 transition-opacity duration-500"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            opacity: peeled ? 1 : 0,
          }}
        >
          A fact appears...
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

      {/* Copy below */}
      <p
        className="text-sm text-white/40 text-center mt-5 animate-fade-in"
        style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
      >
        Wrong answers cost tape, but reveal facts.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 3 — THE REWARD
   "Guess right and collect the leftover tape.
    (earn glow tape from streaks)"
   ═══════════════════════════════════════════════════════════════════ */
function StepReward({ colors }: { colors: ClueColor[] }) {
  const letters = ["S", "P", "I", "K", "E"];
  // 3/5 scenario — guessed right with 3 tapes left
  const collectedColors = colors.slice(2);

  return (
    <div className="flex flex-col items-center">
      {/* Copy */}
      <p className="text-base text-white/60 text-center leading-relaxed">
        Guess right and collect
        <br />
        the leftover tape.
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
      <div className="flex gap-2.5 items-center mb-3">
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

      {/* Glow tape + parenthetical */}
      <div
        className="flex items-center gap-3 mt-2 animate-fade-in"
        style={{ animationDelay: "900ms", animationFillMode: "backwards" }}
      >
        <div
          className="h-2 w-10 animate-glow-pulse"
          style={{ backgroundColor: GLOW_COLOR }}
        />
        <p className="text-sm text-white/30 italic">
          earn glow tape from streaks
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STEP 4 — THE SHARE
   "Then send a friend a clue and see how they do."
   Animated sequence: facts → selection cycles → green send button →
   iMessage blue bubble → typing dots → "Mamma Mia!" reply
   ═══════════════════════════════════════════════════════════════════ */
function StepShare({ colors }: { colors: ClueColor[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [phase, setPhase] = useState(0);
  // phase 0: facts visible, selection cycling
  // phase 1: landed on final selection, green button
  // phase 2: blue bubble sent
  // phase 3: typing dots
  // phase 4: reply

  useEffect(() => {
    const run = () => {
      setSelectedIdx(null);
      setPhase(0);

      return [
        // Selection bounces across facts before landing
        setTimeout(() => setSelectedIdx(1), 400),
        setTimeout(() => setSelectedIdx(4), 800),
        setTimeout(() => {
          setSelectedIdx(2);
          setPhase(1);
        }, 1200),
        // Send → iMessage
        setTimeout(() => setPhase(2), 2200),
        // Typing dots
        setTimeout(() => setPhase(3), 3000),
        // Reply
        setTimeout(() => setPhase(4), 3800),
      ];
    };

    let timers = run();
    const loop = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = run();
    }, 6000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Copy */}
      <p className="text-base text-white/60 text-center leading-relaxed mb-5">
        Then send a friend a clue
        <br />
        and see how they do.
      </p>

      {/* Five revealed facts */}
      <div
        className="flex flex-col gap-1 w-full transition-opacity duration-300"
        style={{ opacity: phase >= 2 ? 0.3 : 1 }}
      >
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

      {/* Green send button */}
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

      {/* iMessage exchange */}
      {phase >= 2 && (
        <div className="w-full space-y-2 mt-3">
          {/* Sent bubble (blue, right-aligned) */}
          <div className="flex justify-end animate-fade-in">
            <div
              className="text-white text-xs px-3.5 py-2"
              style={{
                backgroundColor: "#007AFF",
                borderRadius: "16px 16px 4px 16px",
              }}
            >
              Fact 3
            </div>
          </div>

          {/* Typing dots → reply (gray, left-aligned) */}
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
                    <span className="typing-dot" style={{ animationDelay: "0ms" }}>
                      &bull;
                    </span>
                    <span className="typing-dot" style={{ animationDelay: "200ms" }}>
                      &bull;
                    </span>
                    <span className="typing-dot" style={{ animationDelay: "400ms" }}>
                      &bull;
                    </span>
                  </span>
                ) : (
                  "Mamma Mia!"
                )}
              </div>
            </div>
          )}
        </div>
      )}
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
