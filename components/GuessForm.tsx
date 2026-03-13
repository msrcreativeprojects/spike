"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { getSuggestionBank } from "@/data/suggestions";
import { matchSuggestions } from "@/lib/suggestions";

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
}: GuessFormProps) {
  const [value, setValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLocked = !!(solved || failed || resolved);
  const showGlow = !isLocked && !disabled;
  const showFinalGlow = !!(isFinalGuess && showGlow);

  const displayValue = isLocked ? lockedValue ?? "" : value;
  const showCustomPlaceholder = !isLocked && !displayValue && !isFinalGuess && category;
  const showFinalPlaceholder = !isLocked && !displayValue && isFinalGuess;

  // Suggestion bank for current category
  const bank = useMemo(() => getSuggestionBank(category ?? ""), [category]);
  const suggestions = useMemo(() => matchSuggestions(value, bank), [value, bank]);

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
    if (!value.trim() || disabled || isLocked) return;
    setShowDropdown(false);
    onGuess(value);
    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setShowDropdown(true);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    if (value.length >= 2) setShowDropdown(true);
  };

  const handleBlur = () => {
    // Delay to allow click/tap on suggestion to register before closing
    blurTimeout.current = setTimeout(() => setShowDropdown(false), 150);
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
          className={`
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
          `}
        />
        {/* Custom placeholder — category portion is brighter */}
        {showCustomPlaceholder && (
          <div
            className="absolute inset-0 flex items-center px-4 text-base pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-white/40">Guess a&nbsp;</span>
            <span className="text-white/70">{category}</span>
            <span className="text-white/40">...</span>
          </div>
        )}
        {/* Final guess placeholder — amber-tinted "Last guess..." */}
        {showFinalPlaceholder && (
          <div
            className="absolute inset-0 flex items-center px-4 text-base pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-amber-400/70">Last guess...</span>
          </div>
        )}
        {/* Autocomplete dropdown */}
        {dropdownVisible && (
          <ul
            id="suggestion-list"
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-0.5 border border-white/15 bg-[#141418] overflow-hidden max-h-[240px] overflow-y-auto animate-dropdown-in"
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
        disabled={disabled || isLocked || !value.trim()}
        className={`
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
        `}
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
