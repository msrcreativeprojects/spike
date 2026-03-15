"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSeenTutorial, markTutorialSeen } from "@/lib/tutorial";
import { getDailyColors } from "@/lib/dailyColors";
import HowToPlay from "@/components/HowToPlay";

interface ShareLandingProps {
  puzzleDate?: string;
}

/**
 * Share link landing page.
 *
 * New visitors (haven't seen the tutorial) get the full HowToPlay slideshow
 * right here — no blank redirect. When they close it, they land on the game.
 *
 * Returning players who've already seen the tutorial redirect instantly.
 */
export default function ShareLanding({ puzzleDate }: ShareLandingProps) {
  const router = useRouter();
  const [showTutorial, setShowTutorial] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (hasSeenTutorial()) {
      // Returning player — go straight to the game
      router.replace("/");
    } else {
      // New visitor — show them how to play
      setShowTutorial(true);
    }
    setChecked(true);
  }, [router]);

  const handleClose = () => {
    markTutorialSeen();
    router.replace("/");
  };

  // Compute daily colors for the tutorial visuals
  const dailyColors = puzzleDate ? getDailyColors(puzzleDate) : undefined;

  if (!checked || !showTutorial) {
    // Brief loading state (or returning player mid-redirect)
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="font-title text-6xl tracking-wide text-white/20">
          SPIKE
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#0a0a0c]">
      <HowToPlay onClose={handleClose} dailyColors={dailyColors} />
    </div>
  );
}
