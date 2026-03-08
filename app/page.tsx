import { getTodayPuzzle } from "@/lib/getTodayPuzzle";
import GameShell from "@/components/GameShell";

export default function Home() {
  const puzzle = getTodayPuzzle();

  const fwButton = (
    <a
      href="https://fourthwall.news"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fourth Wall"
      className="
        fixed bottom-4 left-4 z-40
        flex h-8 w-8 items-center justify-center
        border border-white/15 bg-white/[0.04]
        text-[10px] font-bold text-white/30
        transition-all duration-200
        hover:border-white/30 hover:bg-white/[0.08] hover:text-white/60
      "
    >
      FW
    </a>
  );

  if (!puzzle) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <h1 className="font-title text-8xl tracking-wide text-white/90">
          SPIKE
        </h1>
        <p className="mt-6 text-sm text-white/40">
          No puzzle today. Come back tomorrow!
        </p>
        {fwButton}
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <GameShell puzzle={puzzle} />
      {fwButton}
    </main>
  );
}
