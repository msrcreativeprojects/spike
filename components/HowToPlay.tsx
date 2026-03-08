"use client";

import { useState, useCallback, useEffect } from "react";
import { CLUE_COLORS, CLUE_COLOR_MAP } from "@/types/puzzle";

interface HowToPlayProps {
  onClose: () => void;
}

const TOTAL_STEPS = 5;
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

function StepSetup() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1.5 py-2">
        {CLUE_COLORS.map((c, i) => (
          <div
            key={i}
            className="h-7 text-[10px] font-semibold text-transparent flex items-center justify-center"
            style={{
              backgroundColor: CLUE_COLOR_MAP[c],
              width: "180px",
              transform: `rotate(${ROTATIONS[i]}deg)`,
            }}
          >
            ???
          </div>
        ))}
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        5 pieces of tape. 5 clues.
        <br />
        One correct answer.
      </p>
    </div>
  );
}

function StepPeel() {
  const [peeled, setPeeled] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPeeled(true), 800);
    const t2 = setTimeout(() => setPeeled(false), 3000);
    const interval = setInterval(() => {
      setTimeout(() => setPeeled(true), 0);
      setTimeout(() => setPeeled(false), 2200);
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 overflow-hidden">
      <div className="flex flex-col items-center gap-1.5 py-2">
        {/* First tape — peels */}
        <div className="relative" style={{ width: "220px", height: "28px" }}>
          <div
            className="absolute inset-0 flex items-center justify-center text-xs text-white/60 transition-opacity duration-500"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              opacity: peeled ? 1 : 0,
            }}
          >
            A cryptic first clue...
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-black/25 transition-all duration-700"
            style={{
              backgroundColor: CLUE_COLOR_MAP.pink,
              transform: peeled
                ? `translateX(120%) rotate(${ROTATIONS[0] + 5}deg)`
                : `rotate(${ROTATIONS[0]}deg)`,
              opacity: peeled ? 0 : 1,
            }}
          >
            PEEL
          </div>
        </div>
        {/* Remaining tapes */}
        {CLUE_COLORS.slice(1).map((c, i) => (
          <div
            key={i}
            className="h-7 text-transparent text-[10px] flex items-center justify-center"
            style={{
              backgroundColor: CLUE_COLOR_MAP[c],
              width: "180px",
              transform: `rotate(${ROTATIONS[i + 1]}deg)`,
            }}
          >
            ???
          </div>
        ))}
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Peel tape to reveal a clue.
        <br />
        Or skip the clues and guess blind.
      </p>
    </div>
  );
}

function StepCost() {
  const [flash, setFlash] = useState(false);
  const [autoPeeled, setAutoPeeled] = useState(false);

  useEffect(() => {
    const run = () => {
      setFlash(true);
      setAutoPeeled(false);
      setTimeout(() => setFlash(false), 500);
      setTimeout(() => setAutoPeeled(true), 700);
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
          Next clue revealed
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-black/25 transition-all duration-700"
          style={{
            backgroundColor: CLUE_COLOR_MAP.orange,
            transform: autoPeeled
              ? `translateX(120%) rotate(${ROTATIONS[1] + 5}deg)`
              : `rotate(${ROTATIONS[1]}deg)`,
            opacity: autoPeeled ? 0 : 1,
          }}
        />
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Wrong guess? The next piece of
        <br />
        tape peels automatically.
      </p>
    </div>
  );
}

function StepScore() {
  const letters = ["S", "P", "I", "K", "E"];
  // Show a 3/5 scenario: first 2 used (dim), last 3 glowing
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-title text-5xl tracking-wide py-2">
        {letters.map((letter, i) => {
          const isLit = i >= 2;
          const color = CLUE_COLOR_MAP[CLUE_COLORS[i]];
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
      <div className="flex gap-1">
        {CLUE_COLORS.map((c, i) => (
          <div
            key={i}
            className="h-1.5 w-8 transition-all"
            style={{
              backgroundColor: i >= 2 ? CLUE_COLOR_MAP[c] : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        Fewer tapes peeled = higher score.
        <br />
        Guess blind for a perfect 5.
      </p>
    </div>
  );
}

function StepCurtainUp() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-title text-5xl tracking-wide py-2">
        {["S", "P", "I", "K", "E"].map((letter, i) => {
          const color = CLUE_COLOR_MAP[CLUE_COLORS[i]];
          return (
            <span
              key={i}
              className="inline-block animate-spike-wave"
              style={{
                color,
                textShadow: `0 0 24px ${color}40`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <p className="text-sm text-white/50 text-center leading-relaxed">
        New puzzle every day.
        <br />
        Share your score.
      </p>
    </div>
  );
}

const STEPS = [
  { title: "THE SETUP", component: StepSetup },
  { title: "PEEL OR GUESS", component: StepPeel },
  { title: "THE COST", component: StepCost },
  { title: "YOUR SCORE", component: StepScore },
  { title: "CURTAIN UP", component: StepCurtainUp },
];

export default function HowToPlay({ onClose }: HowToPlayProps) {
  const [step, setStep] = useState(0);
  const [closing, setClosing] = useState(false);

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
  const CurrentStep = STEPS[step].component;

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
          {STEPS[step].title}
        </h2>

        {/* Step content */}
        <div key={`content-${step}`} className="animate-fade-in">
          <CurrentStep />
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
            {STEPS.map((_, i) => (
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
