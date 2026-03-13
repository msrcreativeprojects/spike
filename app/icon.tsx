import { ImageResponse } from "next/og";
import { getDailyColors } from "@/lib/dailyColors";
import { ALL_COLORS } from "@/types/puzzle";

export const dynamic = "force-dynamic";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function getEasternDateString(): string {
  const now = new Date();
  const [month, day, year] = now
    .toLocaleDateString("en-US", { timeZone: "America/New_York" })
    .split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export default function Icon() {
  const today = getEasternDateString();
  const colors = getDailyColors(today);
  const pColor = ALL_COLORS[colors[1]]; // 'P' is index 1 in S-P-I-K-E

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 26 26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="2,1 24,13 2,25"
            fill="none"
            stroke={pColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
