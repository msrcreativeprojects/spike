import { fetchPuzzleById } from "@/lib/fetchPuzzleEdge";
import GameShell from "@/components/GameShell";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;
  const puzzleId = parseInt(id, 10);

  if (isNaN(puzzleId)) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <h1 className="font-title text-8xl tracking-wide text-white/90">
          SPIKE
        </h1>
        <p className="mt-6 text-sm text-white/40">Invalid puzzle ID.</p>
      </main>
    );
  }

  const puzzle = await fetchPuzzleById(puzzleId);

  if (!puzzle) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-5 py-12 text-center">
        <h1 className="font-title text-8xl tracking-wide text-white/90">
          SPIKE
        </h1>
        <p className="mt-6 text-sm text-white/40">
          Puzzle not found.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pt-[3vh] pb-4">
      <GameShell puzzle={puzzle} />
    </main>
  );
}
