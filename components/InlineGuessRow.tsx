"use client";

import GuessForm from "./GuessForm";

interface InlineGuessRowProps {
  onGuess: (guess: string) => void;
  disabled: boolean;
  category?: string;
  isFinalGuess?: boolean;
  tapeColor: string;
  isGold?: boolean;
  darkText?: boolean;
  guessCount?: number;
}

export default function InlineGuessRow({
  onGuess,
  disabled,
  category,
  isFinalGuess,
  tapeColor,
  isGold,
  darkText,
  guessCount,
}: InlineGuessRowProps) {
  return (
    <div
      className={`relative animate-input-slide-in ${isFinalGuess ? "final-guess-glow" : ""} ${isGold && !isFinalGuess ? "animate-gold-shimmer" : ""}`}
      style={{
        width: "min(90vw, 28rem)",
        backgroundColor: isFinalGuess ? "rgba(255,255,255,0.06)" : tapeColor,
        border: isFinalGuess ? "1px solid rgba(245,158,11,0.4)" : undefined,
        zIndex: 20,
      }}
    >
      <GuessForm
        onGuess={onGuess}
        disabled={disabled}
        category={category}
        isFinalGuess={isFinalGuess}
        tapeColor={tapeColor}
        darkText={darkText}
        dropdownUp={isFinalGuess}
        guessCount={guessCount}
      />
    </div>
  );
}
