import { ALL_COLORS, type ClueColor } from "@/types/puzzle";

const SIZE = 1080;
const CAESAR_TTF =
  "https://fonts.gstatic.com/s/caesardressing/v22/yYLx0hLa3vawqtwdswbotmK4vrR3cQ.ttf";
const ROTATIONS = [-1.5, 2, -1, 1.8, -0.8];

interface ShareImageOptions {
  puzzleId: number;
  score: number;
  solved: boolean;
  dailyColors: ClueColor[];
  category: string;
  featuredClue: string;
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

/** Word-wrap text for canvas rendering. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    const test = current + " " + words[i];
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = words[i];
    } else {
      current = test;
    }
  }
  lines.push(current);
  return lines;
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
  ctx.font = "20px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.letterSpacing = "4px";
  ctx.fillText(puzzleNum, SIZE / 2, 160);
  ctx.letterSpacing = "0px";

  // ── SPIKE letters ──────────────────────────────
  const letters = ["S", "P", "I", "K", "E"];
  ctx.font = `140px "${fontFamily}"`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const letterWidths = letters.map((l) => ctx.measureText(l).width);
  const gap = 8;
  const totalW = letterWidths.reduce((s, w) => s + w, 0) + gap * 4;
  let curX = (SIZE - totalW) / 2;
  const baseY = 310;

  for (let i = 0; i < 5; i++) {
    const isLit = i >= 5 - opts.score;
    const hex = isLit ? ALL_COLORS[opts.dailyColors[i]] : "#e8e8e8";

    if (isLit) {
      ctx.shadowColor = hex + "60";
      ctx.shadowBlur = 24;
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

  // ── Category challenge ────────────────────────
  ctx.font = "600 28px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.letterSpacing = "2px";
  ctx.fillText(`Guess the ${opts.category}`, SIZE / 2, 390);
  ctx.letterSpacing = "0px";

  // ── Featured clue box ─────────────────────────
  const clueColor = ALL_COLORS[opts.dailyColors[0]];
  const boxW = 680;
  const boxPadX = 40;
  const boxPadY = 32;
  const lineHeight = 38;

  // Measure clue text to determine box height
  ctx.font = "600 26px system-ui, sans-serif";
  const clueLines = wrapText(ctx, opts.featuredClue, boxW - boxPadX * 2);
  const textBlockH = clueLines.length * lineHeight;
  const boxH = textBlockH + boxPadY * 2;
  const boxX = (SIZE - boxW) / 2;
  const boxY = 440;

  // Draw rotated clue box
  ctx.save();
  ctx.translate(SIZE / 2, boxY + boxH / 2);
  ctx.rotate((-0.5 * Math.PI) / 180);

  // Box background
  ctx.fillStyle = clueColor + "20";
  ctx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);

  // Left accent border
  ctx.fillStyle = clueColor + "80";
  ctx.fillRect(-boxW / 2, -boxH / 2, 4, boxH);

  // Clue text
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  const textStartY = -((clueLines.length - 1) * lineHeight) / 2;
  for (let i = 0; i < clueLines.length; i++) {
    ctx.fillText(clueLines[i], 0, textStartY + i * lineHeight);
  }

  ctx.restore();

  // ── Tape strips ─────────────────────────────────
  const stripW = 280;
  const stripH = 22;
  const stripGap = 40;
  const stripStartY = boxY + boxH + 60;

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

  ctx.font = "22px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillText(scoreLine, SIZE / 2, stripStartY + 5 * stripGap + 20);

  // ── Watermark ───────────────────────────────────
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillText("spike.quest", SIZE / 2, 970);

  // ── Export ──────────────────────────────────────
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Canvas toBlob failed")),
      "image/png"
    );
  });
}
