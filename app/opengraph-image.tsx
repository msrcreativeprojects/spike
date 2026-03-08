import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SPIKE — A daily guessing game for show people";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const colors = ["#ff2d8a", "#ff6b2b", "#faff00", "#39ff14", "#bf5fff"];
  const letters = ["S", "P", "I", "K", "E"];

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
          gap: "8px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          hit your
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                fontSize: "140px",
                fontWeight: 900,
                color: colors[i],
                textShadow: `0 0 40px ${colors[i]}40`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "rgba(255,255,255,0.4)",
            marginTop: "16px",
            letterSpacing: "0.1em",
          }}
        >
          A daily guessing game for show people
        </div>
      </div>
    ),
    { ...size }
  );
}
