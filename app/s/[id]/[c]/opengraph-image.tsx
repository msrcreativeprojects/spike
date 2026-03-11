import { ImageResponse } from "next/og";
import { fetchPuzzleById } from "@/lib/fetchPuzzleEdge";
import { getDailyColors } from "@/lib/dailyColors";
import { ALL_COLORS } from "@/types/puzzle";

export const runtime = "edge";
export const alt = "SPIKE — A daily guessing game for show people";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAESAR_TTF =
  "https://fonts.gstatic.com/s/caesardressing/v22/yYLx0hLa3vawqtwdswbotmK4vrR3cQ.ttf";
const INTER_TTF =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";

const LETTERS = ["S", "P", "I", "K", "E"];

interface Props {
  params: Promise<{ id: string; c: string }>;
}

export default async function OGImage({ params }: Props) {
  const { id, c } = await params;
  const puzzleId = parseInt(id, 10);
  const clueIndex = parseInt(c, 10);

  const [caesarFont, interFont] = await Promise.all([
    fetch(CAESAR_TTF).then((res) => res.arrayBuffer()),
    fetch(INTER_TTF).then((res) => res.arrayBuffer()),
  ]);

  // Fallback: generic SPIKE image if puzzle not found
  const puzzle = await fetchPuzzleById(puzzleId);
  if (!puzzle || isNaN(clueIndex) || clueIndex < 0 || clueIndex > 4) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#0a0a0c",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: "6px" }}>
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Caesar Dressing",
                  fontSize: "120px",
                  color: Object.values(ALL_COLORS)[i],
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "18px",
              color: "rgba(255,255,255,0.35)",
              marginTop: "16px",
              letterSpacing: "0.1em",
            }}
          >
            A daily guessing game for show people
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          { name: "Inter", data: interFont, style: "normal", weight: 400 },
          { name: "Caesar Dressing", data: caesarFont, style: "normal", weight: 400 },
        ],
      }
    );
  }

  const dailyColors = getDailyColors(puzzle.date);
  const accentHex = ALL_COLORS[dailyColors[0]];
  const clue = puzzle.clues[clueIndex] ?? puzzle.clues[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 72px",
        }}
      >
        {/* Top: "Guess the CATEGORY" — one line */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "32px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Guess the
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "32px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {puzzle.category}
          </div>
        </div>

        {/* Center: The clue — the hero */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "64px",
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 400,
            }}
          >
            {clue}
          </div>
        </div>

        {/* Bottom-right: SPIKE wordmark + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Caesar Dressing",
                  fontSize: "48px",
                  color: ALL_COLORS[dailyColors[i]] + "70",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: "18px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            spike.quest
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interFont, style: "normal", weight: 400 },
        { name: "Caesar Dressing", data: caesarFont, style: "normal", weight: 400 },
      ],
    }
  );
}
