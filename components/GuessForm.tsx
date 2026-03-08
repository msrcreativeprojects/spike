"use client";

import { useState, useRef, useEffect } from "react";

interface GuessFormProps {
  onGuess: (guess: string) => void;
  onReveal: () => void;
  canReveal: boolean;
  disabled: boolean;
}

export default function GuessForm({
  onGuess,
  onReveal,
  canReveal,
  disabled,
}: GuessFormProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onGuess(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Type your guess..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="
            w-full rounded-lg border border-white/10 bg-white/[0.06]
            px-4 py-3 text-sm text-white placeholder-white/30
            outline-none transition-all duration-200
            focus:border-white/25 focus:bg-white/[0.08] focus:ring-1 focus:ring-white/10
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="
            flex-1 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-semibold
            text-black transition-all duration-200
            hover:bg-white active:scale-[0.98]
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/90
            disabled:active:scale-100
          "
        >
          Submit
        </button>

        <button
          type="button"
          onClick={onReveal}
          disabled={disabled || !canReveal}
          className="
            flex-1 rounded-lg border border-white/15 bg-transparent
            px-4 py-2.5 text-sm font-medium text-white/70
            transition-all duration-200
            hover:border-white/25 hover:text-white/90 hover:bg-white/[0.04]
            active:scale-[0.98]
            disabled:opacity-30 disabled:cursor-not-allowed
            disabled:hover:border-white/15 disabled:hover:text-white/70
            disabled:hover:bg-transparent disabled:active:scale-100
          "
        >
          Reveal clue
        </button>
      </div>
    </form>
  );
}
