"use client";

import { useState } from "react";
import { GameState } from "@/types/puzzle";
import { copyShareText } from "@/lib/shareResult";
import ScoreMarks from "./ScoreMarks";

interface ResultCardProps {
  state: GameState;
  answer: string;
}

export default function ResultCard({ state, answer }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const success = await copyShareText(state);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cluesUsed = 5 - state.score + 1;

  return (
    <div className="animate-fade-in rounded-xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Answer reveal */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-1">
            {state.solved ? "Correct" : "The answer was"}
          </p>
          <p className="text-2xl font-bold text-white">{answer}</p>
        </div>

        {/* Score marks */}
        <ScoreMarks score={state.score} />

        {/* Result text */}
        <p className="text-sm text-white/50">
          {state.solved
            ? `Solved in ${cluesUsed} clue${cluesUsed === 1 ? "" : "s"}`
            : "Missed it"}
        </p>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="
            mt-1 rounded-lg border border-white/15 bg-white/[0.06]
            px-5 py-2.5 text-sm font-medium text-white/80
            transition-all duration-200
            hover:border-white/25 hover:bg-white/[0.1] hover:text-white
            active:scale-[0.97]
          "
        >
          {copied ? "Copied!" : "Share result"}
        </button>
      </div>
    </div>
  );
}
