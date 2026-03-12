import { getTodayPuzzle } from "@/lib/getTodayPuzzle";
import GameShell from "@/components/GameShell";

export default async function Home() {
  const puzzle = await getTodayPuzzle();

  if (!puzzle) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <h1 className="font-title text-8xl tracking-wide text-white/90">
          SPIKE
        </h1>
        <p className="mt-6 text-sm text-white/40">
          No puzzle today. Come back tomorrow!
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pt-[8vh] pb-4">
      <GameShell puzzle={puzzle} />
    </main>
  );
}
