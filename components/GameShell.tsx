"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Puzzle, type TapeStats, type ClueColor } from "@/types/puzzle";
import { createClient } from "@/lib/supabase/client";
import { loadTapeStats } from "@/lib/tapeService";
import { hasSeenTutorial, markTutorialSeen } from "@/lib/tutorial";
import { getDailyColors } from "@/lib/dailyColors";
import Game from "./Game";
import HowToPlay from "./HowToPlay";
import Welcome from "./Welcome";
import AuthGate from "./AuthGate";
import TapeCounter from "./TapeCounter";
import TapeStatsModal from "./TapeStatsModal";

interface GameShellProps {
  puzzle: Puzzle;
}

type Overlay = "none" | "welcome" | "tutorial" | "auth";

export default function GameShell({ puzzle }: GameShellProps) {
  const [ready, setReady] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [userId, setUserId] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(true); // Start as guest by default
  const [tapeStats, setTapeStats] = useState<TapeStats | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Compute daily colors once from puzzle date (or override for themed puzzles)
  const dailyColors = useMemo(() => {
    if (puzzle.theme === "gold") {
      return ["gold", "gold", "gold", "gold", "gold"] as ClueColor[];
    }
    return getDailyColors(puzzle.date);
  }, [puzzle.date, puzzle.theme]);

  const gameBlocked = overlay !== "none";

  // Check auth state on mount — no gate, just check quietly
  useEffect(() => {
    setReady(true);
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setIsGuest(false);
        loadTapeStats(user.id).then((stats) => {
          setTapeStats(stats);
        });
      }
      // Show welcome for first-time visitors, otherwise straight to game
      if (!user && !hasSeenTutorial()) {
        setOverlay("welcome");
      }
    });
  }, []);

  const handleCloseWelcome = useCallback(() => {
    markTutorialSeen();
    setOverlay("none");
  }, []);

  const handleCloseTutorial = useCallback(() => {
    markTutorialSeen();
    setOverlay("none");
  }, []);

  const handleAuth = useCallback(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setIsGuest(false);
        loadTapeStats(user.id).then((stats) => {
          setTapeStats(stats);
          setOverlay("none");
        });
      }
    });
  }, []);

  const handleGuest = useCallback(() => {
    setOverlay("none");
  }, []);

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserId(null);
    setTapeStats(null);
    setIsGuest(true);
    setShowStats(false);
  }, []);

  const handleTapeUpdate = useCallback((stats: TapeStats) => {
    setTapeStats(stats);
  }, []);

  const handleTapeCounterClick = useCallback(() => {
    if (isGuest) {
      setOverlay("auth");
    } else if (tapeStats) {
      setShowStats(true);
    }
  }, [isGuest, tapeStats]);

  const handleGuestSignIn = useCallback(() => {
    setOverlay("auth");
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    );
  }

  return (
    <>
      {/* Game always renders — blurred + dimmed when an overlay is active */}
      <div
        className="flex flex-1 min-h-0 flex-col transition-all duration-500"
        style={{
          filter: gameBlocked ? "blur(6px) brightness(0.4)" : "none",
          pointerEvents: gameBlocked ? "none" : "auto",
        }}
      >
        <Game
          puzzle={puzzle}
          userId={userId}
          isGuest={isGuest}
          tapeStats={tapeStats}
          onTapeUpdate={handleTapeUpdate}
          onGuestSignIn={handleGuestSignIn}
          dailyColors={dailyColors}
        />
      </div>

      {/* Auth overlay — dismissible, opens from person icon or post-game nudge */}
      {overlay === "auth" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={handleGuest} />
          <div className="relative z-10 w-full max-w-md border border-white/10 bg-[#0a0a0c] p-8 pt-10 flex flex-col items-center animate-curtain-up">
            <AuthGate onAuth={handleAuth} onGuest={handleGuest} />
          </div>
        </div>
      )}

      {/* Welcome overlay (first visit only) */}
      {overlay === "welcome" && (
        <Welcome onClose={handleCloseWelcome} dailyColors={dailyColors} />
      )}

      {/* Tutorial overlay */}
      {overlay === "tutorial" && (
        <HowToPlay onClose={handleCloseTutorial} dailyColors={dailyColors} />
      )}

      {/* In-game tutorial (from ? button) */}
      {showTutorial && (
        <HowToPlay
          onClose={() => setShowTutorial(false)}
          dailyColors={dailyColors}
        />
      )}

      {showStats && tapeStats && (
        <TapeStatsModal
          stats={tapeStats}
          onClose={() => setShowStats(false)}
          onSignOut={handleSignOut}
        />
      )}

      {!gameBlocked && !showTutorial && (
        <>
          {/* Tape counter — only for logged-in users (guests use person icon) */}
          {!isGuest && (
            <TapeCounter
              total={tapeStats?.totalTape ?? 0}
              onClick={handleTapeCounterClick}
              dailyColors={dailyColors}
            />
          )}
          {/* Person icon — bottom left, guests only (logged-in users see tape counter here instead) */}
          {isGuest && (
            <button
              onClick={handleGuestSignIn}
              aria-label="Sign in"
              className="
                fixed bottom-4 left-4 z-40
                flex h-8 w-8 items-center justify-center
                border border-white/15 bg-white/[0.04]
                text-white/30
                transition-all duration-200
                hover:border-white/30 hover:bg-white/[0.08] hover:text-white/60
                animate-fade-in
              "
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="5" r="2.5" />
                <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" />
              </svg>
            </button>
          )}
          {/* ? icon — bottom right */}
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
        </>
      )}
    </>
  );
}
