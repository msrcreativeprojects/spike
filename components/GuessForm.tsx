"use client";

import { useState, useRef, useEffect } from "react";

interface GuessFormProps {
  onGuess: (guess: string) => void;
  disabled: boolean;
  lockedValue?: string;
  solved?: boolean;
  failed?: boolean;
  category?: string;
}

export default function GuessForm({
  onGuess,
  disabled,
  lockedValue,
  solved,
  failed,
  category,
}: GuessFormProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isLocked = !!(solved || failed);
  const showShimmer = !isLocked && !disabled;

  useEffect(() => {
    if (!disabled && !isLocked) {
      inputRef.current?.focus();
    }
  }, [disabled, isLocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled || isLocked) return;
    onGuess(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <input
        ref={inputRef}
        type="text"
        value={isLocked ? lockedValue ?? "" : value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled || isLocked}
        readOnly={isLocked}
        placeholder={category ? `Guess a ${category}...` : "Type your guess..."}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className={`
          flex-1 rounded-none border border-r-0
          px-4 py-3 text-sm
          outline-none transition-all duration-500
          ${
            solved
              ? "border-green-500/30 bg-green-500/15 text-green-300 opacity-100"
              : failed
                ? "border-red-500/30 bg-red-500/10 text-red-300 opacity-100"
                : showShimmer
                  ? "guess-shimmer text-white placeholder-white/30 disabled:opacity-40 disabled:cursor-not-allowed"
                  : "border-white/10 bg-white/[0.06] text-white placeholder-white/30 focus:border-white/25 focus:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed"
          }
        `}
      />
      <button
        type="submit"
        disabled={disabled || isLocked || !value.trim()}
        className={`
          rounded-none px-5 py-3 text-sm font-semibold
          transition-all duration-500
          ${
            solved
              ? "bg-green-500/80 text-white cursor-default"
              : failed
                ? "bg-red-500/40 text-white/60 cursor-default"
                : "bg-white/90 text-black hover:bg-white active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:active:scale-100"
          }
        `}
      >
        {solved ? "Correct!" : failed ? "X" : "Submit"}
      </button>
    </form>
  );
}
