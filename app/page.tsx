import { getTodayPuzzle } from "@/lib/getTodayPuzzle";
import Game from "@/components/Game";

export default function Home() {
  const puzzle = getTodayPuzzle();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <Game puzzle={puzzle} />
    </main>
  );
}
