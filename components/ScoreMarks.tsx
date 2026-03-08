"use client";

import { useEffect, useState } from "react";
import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

const TOTAL = 5;

interface ScoreMarksProps {
  score: number;
  animate?: boolean;
  dailyColors: ClueColor[];
}

export default function ScoreMarks({ score, animate = true, dailyColors }: ScoreMarksProps) {
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : TOTAL);

  useEffect(() => {
    if (!animate) {
      setVisibleCount(TOTAL);
      return;
    }

    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= TOTAL) clearInterval(interval);
    }, 140);

    return () => clearInterval(interval);
  }, [score, animate]);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: TOTAL }, (_, i) => {
        const isEarned = i < score;
        const isVisible = i < visibleCount;
        const color = ALL_COLORS[dailyColors[i]];

        return (
          <div
            key={i}
            className="transition-all duration-300 ease-out"
            style={{
              width: 48,
              height: 14,
              backgroundColor: isEarned ? color : "rgba(255,255,255,0.08)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scaleX(1)" : "scaleX(0.3)",
            }}
          />
        );
      })}
    </div>
  );
}
