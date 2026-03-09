"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Puzzle, type TapeStats } from "@/types/puzzle";
import { createClient } from "@/lib/supabase/client";
import { loadTapeStats } from "@/lib/tapeService";
import { hasSeenTutorial, markTutorialSeen } from "@/lib/tutorial";
import { getDailyColors } from "@/lib/dailyColors";
import Game from "./Game";
import HowToPlay from "./HowToPlay";
import AuthGate from "./AuthGate";
import TapeCounter from "./TapeCounter";
import TapeStatsModal from "./TapeStatsModal";

interface GameShellProps {
  puzzle: Puzzle;
}

type Overlay = "none" | "tutorial" | "auth";

export default function GameShell({ puzzle }: GameShellProps) {
  const [ready, setReady] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [userId, setUserId] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [tapeStats, setTapeStats] = useState<TapeStats | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Compute daily colors once from puzzle date
  const dailyColors = useMemo(() => getDailyColors(puzzle.date), [puzzle.date]);

  const gameBlocked = overlay !== "none";

  // Check auth state on mount
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        loadTapeStats(user.id).then((stats) => {
          setTapeStats(stats);
          setReady(true);
          setOverlay("none");
        });
      } else if (!hasSeenTutorial()) {
        setReady(true);
        setOverlay("tutorial");
      } else {
        setReady(true);
        setOverlay("auth");
      }
    });
  }, []);

  const handleCloseTutorial = useCallback(() => {
    markTutorialSeen();
    // If guest was already chosen, dismiss overlay; otherwise show auth
    if (isGuest) {
      setOverlay("none");
    } else {
      setOverlay("auth");
    }
  }, [isGuest]);

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
    setIsGuest(true);
    setOverlay("tutorial");
  }, []);

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserId(null);
    setTapeStats(null);
    setIsGuest(false);
    setShowStats(false);
    setOverlay("auth");
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
        className="transition-all duration-500"
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

      {/* Auth overlay */}
      {overlay === "auth" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <AuthGate onAuth={handleAuth} onGuest={handleGuest} />
        </div>
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
          <TapeCounter
            total={isGuest ? null : (tapeStats?.totalTape ?? 0)}
            onClick={handleTapeCounterClick}
            dailyColors={dailyColors}
          />
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
