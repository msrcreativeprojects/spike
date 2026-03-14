import { Metadata } from "next";
import { fetchPuzzleById } from "@/lib/fetchPuzzleEdge";
import ClientRedirect from "./redirect";

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
 * This page exists only to serve OG metadata + image for link previews.
 * Human visitors are immediately redirected to the main game via
 * client-side redirect (so crawlers still see the meta tags).
 */
export default function SharePage() {
  return <ClientRedirect />;
}
