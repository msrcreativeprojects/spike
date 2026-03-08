import { getTodayPuzzle } from "@/lib/getTodayPuzzle";
import Game from "@/components/Game";

export default function Home() {
  const puzzle = getTodayPuzzle();

  if (!puzzle) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <p className="text-sm text-white/35 tracking-widest uppercase">
          hit your
        </p>
        <h1 className="font-title text-7xl tracking-wide -mt-1 text-white/90">
          SPIKE
        </h1>
        <p className="mt-6 text-sm text-white/40">
          No puzzle today. Come back tomorrow!
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <Game puzzle={puzzle} />
    </main>
  );
}
