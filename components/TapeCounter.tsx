"use client";

import { useEffect, useRef, useState } from "react";

interface TapeCounterProps {
  total: number | null; // null = guest (show sign-in prompt)
  onClick: () => void;
}

export default function TapeCounter({ total, onClick }: TapeCounterProps) {
  const [pulse, setPulse] = useState(false);
  const prevTotal = useRef(total);

  useEffect(() => {
    if (total !== null && prevTotal.current !== null && total > prevTotal.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(t);
    }
    prevTotal.current = total;
  }, [total]);

  return (
    <button
      onClick={onClick}
      aria-label={total !== null ? `${total} tape collected` : "Sign in"}
      className={`
        fixed top-4 right-4 z-40
        flex h-8 items-center justify-center gap-1.5 px-2.5
        border border-white/15 bg-white/[0.04]
        text-xs text-white/30
        transition-all duration-200
        hover:border-white/30 hover:bg-white/[0.08] hover:text-white/60
        animate-fade-in
        ${pulse ? "animate-tape-pulse" : ""}
      `}
    >
      {total !== null ? (
        <>
          <span
            className="inline-block h-2.5 w-4"
            style={{
              background: "linear-gradient(90deg, #ff2d8a, #bf5fff, #00d4ff, #39ff14, #faff00)",
            }}
          />
          <span className="font-semibold tabular-nums">{total}</span>
        </>
      ) : (
        <span className="text-[10px] font-semibold uppercase tracking-wider">Sign in</span>
      )}
    </button>
  );
}
