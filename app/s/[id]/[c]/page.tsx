import { Metadata } from "next";
import { fetchPuzzleById } from "@/lib/fetchPuzzleEdge";
import ShareLanding from "./redirect";

const OG_TITLES = [
  "Can you guess?",
  "Take a guess",
  "Any guesses?",
  "What do you think?",
  "Think you know?",
  "Know this one?",
];

interface Props {
  params: Promise<{ id: string; c: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, c } = await params;
  const puzzleId = parseInt(id, 10);
  const clueIndex = parseInt(c, 10);

  if (isNaN(puzzleId) || isNaN(clueIndex) || clueIndex < 0 || clueIndex > 4) {
    return { title: "SPIKE" };
  }

  const puzzle = await fetchPuzzleById(puzzleId);
  if (!puzzle) {
    return { title: "SPIKE" };
  }

  // Deterministic pick seeded by puzzle ID so the same puzzle always gets
  // the same title (avoids OG cache confusion on re-crawl).
  const title = OG_TITLES[puzzleId % OG_TITLES.length];

  return {
    title,
    description: "Play today's puzzle at spike.quest",
    openGraph: {
      title,
      description: "Play today's puzzle at spike.quest",
      siteName: "SPIKE",
      url: `https://spike.quest/s/${id}/${c}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Play today's puzzle at spike.quest",
    },
  };
}

/**
 * Share link landing page.
 *
 * Serves OG metadata + image for link previews (crawlers see the meta tags).
 * Human visitors either see the tutorial (new players) or redirect to the
 * game (returning players). The tutorial IS the onboarding — the share link
 * becomes the front door.
 */
export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const puzzleId = parseInt(id, 10);

  // Fetch puzzle date so the tutorial can show today's colors
  let puzzleDate: string | undefined;
  if (!isNaN(puzzleId)) {
    const puzzle = await fetchPuzzleById(puzzleId);
    puzzleDate = puzzle?.date;
  }

  return <ShareLanding puzzleDate={puzzleDate} />;
}
