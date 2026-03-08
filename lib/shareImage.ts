import { ALL_COLORS, type ClueColor, type TapeColor } from "@/types/puzzle";

const SIZE = 1080;
const CAESAR_TTF =
  "https://fonts.gstatic.com/s/caesardressing/v22/yYLx0hLa3vawqtwdswbotmK4vrR3cQ.ttf";
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

interface ShareImageOptions {
  puzzleId: number;
  score: number;
  solved: boolean;
  dailyColors: ClueColor[];
  tapeEarned?: TapeColor[];
  totalTape?: number;
}

/** Ensure Caesar Dressing is available for canvas rendering. */
async function ensureFont(): Promise<string> {
  const name = "Caesar Dressing";
  await document.fonts.ready;
  if (document.fonts.check(`100px "${name}"`)) return name;

  // Fallback: load directly from Google Fonts CDN
  const face = new FontFace(name, `url(${CAESAR_TTF})`);
  const loaded = await face.load();
  document.fonts.add(loaded);
  return name;
}

/** Generate a 1080×1080 share card as a PNG Blob. */
export async function generateShareImage(
  opts: ShareImageOptions
): Promise<Blob> {
  const fontFamily = await ensureFont();

  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;

  // ── Background ──────────────────────────────────
  ctx.fillStyle = "#0a0a0c";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── Puzzle number ───────────────────────────────
  const puzzleNum = `#${String(opts.puzzleId).padStart(3, "0")}`;
  ctx.font = '20px system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.letterSpacing = "4px";
  ctx.fillText(puzzleNum, SIZE / 2, 210);
  ctx.letterSpacing = "0px";

  // ── SPIKE letters ──────────────────────────────
  const letters = ["S", "P", "I", "K", "E"];
  ctx.font = `180px "${fontFamily}"`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Measure total width to center the word
  const letterWidths = letters.map((l) => ctx.measureText(l).width);
  const gap = 10;
  const totalW = letterWidths.reduce((s, w) => s + w, 0) + gap * 4;
  let curX = (SIZE - totalW) / 2;
  const baseY = 380;

  for (let i = 0; i < 5; i++) {
    const isLit = i >= 5 - opts.score;
    const hex = isLit ? ALL_COLORS[opts.dailyColors[i]] : "#e8e8e8";

    // Glow for lit letters
    if (isLit) {
      ctx.shadowColor = hex + "60";
      ctx.shadowBlur = 30;
    } else {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = hex;
    ctx.fillText(letters[i], curX, baseY);
    curX += letterWidths[i] + gap;
  }

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // ── Tape strips ─────────────────────────────────
  const stripW = 320;
  const stripH = 28;
  const stripGap = 50;
  const stripStartY = 480;

  for (let i = 0; i < 5; i++) {
    const isPeeled = i < 5 - opts.score;
    const color = isPeeled
      ? "rgba(255,255,255,0.10)"
      : ALL_COLORS[opts.dailyColors[i]];
    const cy = stripStartY + i * stripGap;

    ctx.save();
    ctx.translate(SIZE / 2, cy);
    ctx.rotate((ROTATIONS[i] * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.fillRect(-stripW / 2, -stripH / 2, stripW, stripH);
    ctx.restore();
  }

  // ── Score line ──────────────────────────────────
  const tapeCollected = opts.score > 0 ? opts.score : 1;
  const scoreLine = opts.solved
    ? `Collected ${tapeCollected}/5 tape`
    : "Collected 1/5 tape";

  ctx.font = '24px system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(scoreLine, SIZE / 2, 790);

  // ── Tape stats (logged-in only) ─────────────────
  if (opts.tapeEarned && opts.totalTape !== undefined) {
    const earned = opts.tapeEarned.filter((c) => c !== "glow").length;
    const hasGlow = opts.tapeEarned.includes("glow");
    let statsLine = `+${earned} tape · ${opts.totalTape} total`;
    if (hasGlow) statsLine += " ✨";

    ctx.font = '18px system-ui, sans-serif';
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillText(statsLine, SIZE / 2, 840);
  }

  // ── Watermark ───────────────────────────────────
  ctx.font = '18px system-ui, sans-serif';
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillText("spike.quest", SIZE / 2, 970);

  // ── Export ──────────────────────────────────────
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
      "image/png"
    );
  });
}
