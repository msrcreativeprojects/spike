"use client";

import { useState, useCallback, useEffect } from "react";
import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

interface WelcomeProps {
  onClose: () => void;
  dailyColors?: ClueColor[];
}

const FALLBACK_COLORS: ClueColor[] = ["pink", "purple", "blue", "green", "yellow"];

export default function Welcome({ onClose, dailyColors }: WelcomeProps) {
  const [closing, setClosing] = useState(false);
  const colors = dailyColors ?? FALLBACK_COLORS;

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 250);
  }, [closing, onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

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
        {/* Personal note */}
        <div className="flex flex-col gap-4 text-sm text-white/55 leading-relaxed" style={{ textWrap: "pretty" }}>
          <p className="text-base text-white/70">
            Welcome to{" "}
            <strong>
              {["S", "P", "I", "K", "E"].map((letter, i) => (
                <span
                  key={i}
                  style={{
                    color: ALL_COLORS[colors[i]],
                    textShadow: `0 0 16px ${ALL_COLORS[colors[i]]}40`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </strong>
          </p>
          <p>
            If you{"'"}re seeing this, you{"'"}re one of the first people
            to ever play it. That means a lot{"—"}so thank you
            for being here.
          </p>
          <p>
            I{"'"}ve always believed that the more you know about
            something, the more it opens up to you. How a show gets made,
            what{"'"}s happening in the dark just offstage{"—"}all of it
            just pulls you closer to the people who made it. And that
            closeness, for me, is the whole point.
          </p>
          <p>
            That{"'"}s what this game is. A small daily practice
            in getting closer to something we love.
          </p>
          <p>
            New puzzle (and tape colors) every day. Have fun!
          </p>
        </div>

        {/* Mini tape strips decoration */}
        <div className="flex justify-center gap-1.5 mt-6 mb-4">
          {colors.map((c, i) => (
            <div
              key={i}
              className="h-2 w-8"
              style={{
                backgroundColor: ALL_COLORS[c],
                transform: `rotate(${[-1.5, 2, -1, 1.8, -0.8][i]}deg)`,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleClose}
          className="w-full rounded-none bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-black hover:bg-white active:scale-[0.98] transition-all mt-2"
        >
          Places
        </button>
      </div>
    </div>
  );
}
