import { getTodayPuzzle } from "@/lib/getTodayPuzzle";
import Game from "@/components/Game";

export default function Home() {
  const puzzle = getTodayPuzzle();

  const footer = (
    <footer className="mt-auto pt-8 pb-4 text-center text-[10px] tracking-widest uppercase text-white/15">
      a{" "}
      <a
        href="https://fourthwall.news"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/25 hover:text-white/40 transition-colors"
      >
        fourth wall
      </a>{" "}
      project
    </footer>
  );

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
        {footer}
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-12">
      <Game puzzle={puzzle} />
      {footer}
    </main>
  );
}
