import { Metadata } from "next";
import { fetchPuzzleById } from "@/lib/fetchPuzzleEdge";
import ClientRedirect from "./redirect";

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

  return {
    title: "Can You Guess?",
    description: "Play today's puzzle at spike.quest",
    openGraph: {
      title: "Can You Guess?",
      description: "Play today's puzzle at spike.quest",
      siteName: "SPIKE",
      url: `https://spike.quest/s/${id}/${c}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Can You Guess?",
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
