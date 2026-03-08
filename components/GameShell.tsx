"use client";

import { useState, useEffect } from "react";
import { Puzzle } from "@/types/puzzle";
import { hasSeenTutorial, markTutorialSeen } from "@/lib/tutorial";
import Game from "./Game";
import HowToPlay from "./HowToPlay";

interface GameShellProps {
  puzzle: Puzzle;
}

export default function GameShell({ puzzle }: GameShellProps) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasSeenTutorial()) {
      setShowTutorial(true);
    }
    setReady(true);
  }, []);

  const handleCloseTutorial = () => {
    markTutorialSeen();
    setShowTutorial(false);
  };

  return (
    <>
      <Game puzzle={puzzle} />

      {showTutorial && <HowToPlay onClose={handleCloseTutorial} />}

      {ready && !showTutorial && (
        <button
          onClick={() => setShowTutorial(true)}
          aria-label="How to play"
          className="
            fixed bottom-4 right-4 z-40
            flex h-8 w-8 items-center justify-center
            border border-white/15 bg-white/[0.04]
            text-sm text-white/30
            transition-all duration-200
            hover:border-white/30 hover:bg-white/[0.08] hover:text-white/60
            animate-fade-in
          "
        >
          ?
        </button>
      )}
    </>
  );
}
