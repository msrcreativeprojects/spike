"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { getSuggestionBank } from "@/data/suggestions";
import { matchSuggestions } from "@/lib/suggestions";

const GUESS_PHRASES = [
  "Take a guess",
  "Try again",
  "You've got this",
  "So close",
  "Last chance",
  "Final shot",
];

interface GuessFormProps {
  onGuess: (guess: string) => void;
  disabled: boolean;
  lockedValue?: string;
  solved?: boolean;
  failed?: boolean;
  category?: string;
  resolved?: boolean;
  puzzleId?: number;
  isFinalGuess?: boolean;
  /** When set, input renders with transparent bg inside a tape-colored container */
  tapeColor?: string;
  /** When true, autocomplete dropdown opens upward */
  dropdownUp?: boolean;
  /** When true, use dark (black) text for contrast on light tape colors */
  darkText?: boolean;
  /** Number of guesses made so far — drives sequential placeholder phrases */
  guessCount?: number;
}

export default function GuessForm({
  onGuess,
  disabled,
  lockedValue,
  solved,
  failed,
  category,
  resolved,
  puzzleId,
  isFinalGuess,
  tapeColor,
  dropdownUp,
  darkText,
  guessCount = 0,
}: GuessFormProps) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLocked = !!(solved || failed || resolved);
  const showGlow = !isLocked && !disabled;
  const showFinalGlow = !!(isFinalGuess && showGlow);
  const isInline = !!tapeColor;

  const displayValue = isLocked ? lockedValue ?? "" : value;
  const phraseIndex = Math.min(guessCount, GUESS_PHRASES.length - 1);
  const showPhrasePlaceholder = !isLocked && !displayValue && isInline;

  // Suggestion bank for current category
  const bank = useMemo(() => getSuggestionBank(category ?? ""), [category]);
  const suggestions = useMemo(() => matchSuggestions(value, bank), [value, bank]);

  // Check if current value exactly matches a bank item (canonical match)
  const isValidSelection = useMemo(
    () => bank.some((name) => name.toLowerCase() === value.toLowerCase()),
    [value, bank],
  );

  const dropdownVisible = showDropdown && suggestions.length > 0 && !isLocked && !disabled;

  // Reset highlight when suggestions change
  useEffect(() => {
    setHighlightIndex(-1);
  }, [suggestions]);

  // Cleanup blur timeout on unmount
  useEffect(() => {
    return () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  const selectSuggestion = useCallback((name: string) => {
    setValue(name);
    setShowDropdown(false);
    setHighlightIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled || isLocked || !isValidSelection) return;
    setShowDropdown(false);
    // Submit the canonical bank name (preserving its original casing)
    const canonical = bank.find((name) => name.toLowerCase() === value.toLowerCase()) ?? value;
    onGuess(canonical);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropdown(true);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    if (value.length >= 2) setShowDropdown(true);
    // Scroll into view when inline (mid-page)
    if (isInline) {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 300);
    }
  };

  const handleBlur = () => {
    // Delay to allow click/tap on suggestion to register before closing
    blurTimeout.current = setTimeout(() => setShowDropdown(false), 150);
  };

  const blockPaste = (e: React.ClipboardEvent | React.DragEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!dropdownVisible) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // Input styling based on mode
  const textColor = darkText ? "text-black placeholder-black/40" : "text-white placeholder-white/50";
  const inputClassName = isInline
    ? `
      w-full rounded-none border-0
      px-4 py-3 text-base
      outline-none transition-all duration-500
      bg-transparent ${textColor}
      disabled:opacity-40 disabled:cursor-not-allowed
      ${showFinalGlow ? "final-guess-glow placeholder-amber-300/60" : ""}
    `
    : `
      w-full rounded-none border border-r-0
      px-4 py-3 text-base
      outline-none transition-all duration-500
      ${
        resolved
          ? "border-white/10 bg-white/[0.06] text-white/90 font-bold"
          : solved
            ? "border-green-500/30 bg-green-500/15 text-green-300 opacity-100"
            : failed
              ? "border-red-500/30 bg-red-500/10 text-red-300 opacity-100"
              : showFinalGlow
                ? "border-amber-500/40 bg-amber-500/[0.08] final-guess-glow text-white placeholder-amber-300/60 disabled:opacity-40 disabled:cursor-not-allowed"
                : showGlow
                  ? "border-white/10 bg-white/[0.06] guess-glow text-white placeholder-white/50 disabled:opacity-40 disabled:cursor-not-allowed"
                  : "border-white/10 bg-white/[0.06] text-white placeholder-white/50 focus:border-white/25 focus:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed"
      }
    `;

  // Submit button styling based on mode
  const btnText = darkText ? "text-black/80" : "text-white/90";
  const buttonClassName = isInline
    ? `
      rounded-none px-5 py-3 text-sm font-semibold
      transition-all duration-500
      bg-black/20 ${btnText} hover:bg-black/30 active:scale-[0.98]
      disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/20 disabled:active:scale-100
    `
    : `
      rounded-none px-5 py-3 text-sm font-semibold
      transition-all duration-500
      ${
        resolved
          ? "bg-white/[0.06] border border-l-0 border-white/10 text-white/30 cursor-default tracking-widest"
          : solved
            ? "bg-green-500/80 text-white cursor-default"
            : failed
              ? "bg-red-500/40 text-white/60 cursor-default"
              : "bg-white/90 text-black hover:bg-white active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/90 disabled:active:scale-100"
      }
    `;

  // Dropdown positioning
  const dropdownPositionClass = dropdownUp
    ? "bottom-full mb-0.5 animate-dropdown-in-up"
    : "top-full mt-0.5 animate-dropdown-in";

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={blockPaste}
          onDrop={blockPaste}
          disabled={disabled || isLocked}
          readOnly={isLocked}
          placeholder={!category ? "Type your guess..." : undefined}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          enterKeyHint="go"
          spellCheck={false}
          role="combobox"
          aria-expanded={dropdownVisible}
          aria-autocomplete="list"
          aria-controls="suggestion-list"
          aria-activedescendant={
            dropdownVisible && highlightIndex >= 0
              ? `suggestion-${highlightIndex}`
              : undefined
          }
          className={inputClassName}
        />
        {/* Sequential encouraging placeholder */}
        {showPhrasePlaceholder && (
          <div
            className="absolute inset-0 flex items-center px-4 text-base pointer-events-none"
            aria-hidden="true"
          >
            <span className={
              isFinalGuess
                ? "text-amber-400/70"
                : darkText
                  ? "text-black/40"
                  : "text-white/40"
            }>
              {GUESS_PHRASES[phraseIndex]}...
            </span>
          </div>
        )}
        {/* Autocomplete dropdown */}
        {dropdownVisible && (
          <ul
            id="suggestion-list"
            role="listbox"
            className={`absolute left-0 right-0 z-50 border border-white/15 overflow-hidden max-h-[240px] overflow-y-auto shadow-lg ${dropdownPositionClass}`}
            style={{ backgroundColor: "#141418" }}
          >
            {suggestions.map((name, i) => (
              <li
                key={name}
                id={`suggestion-${i}`}
                role="option"
                aria-selected={i === highlightIndex}
                className={`
                  px-4 py-3 text-sm cursor-pointer transition-colors
                  ${
                    i === highlightIndex
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white/90"
                  }
                `}
                onMouseDown={(e) => {
                  e.preventDefault(); // prevent blur before click
                  selectSuggestion(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled || isLocked || !isValidSelection}
        className={buttonClassName}
      >
        {resolved && puzzleId
          ? `#${String(puzzleId).padStart(3, "0")}`
          : solved
            ? "Correct!"
            : failed
              ? "X"
              : "Submit"}
      </button>
    </form>
  );
}
