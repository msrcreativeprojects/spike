#!/usr/bin/env npx tsx
/**
 * Import puzzles from a CSV file into data/puzzles.json
 *
 * CSV format (header row required):
 *   id, date, answer, category, clue1, clue2, clue3, clue4, clue5, aliases
 *
 * - aliases is optional, pipe-separated: "phantom|the phantom of the opera"
 * - date format: YYYY-MM-DD
 *
 * Usage:
 *   npx tsx scripts/import-puzzles.ts path/to/puzzles.csv
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

interface PuzzleRow {
  id: number;
  date: string;
  answer: string;
  category: string;
  clues: [string, string, string, string, string];
  aliases?: string[];
}

function parseCSV(raw: string): Record<string, string>[] {
  const lines = raw.trim().split("\n");
  if (lines.length < 2) throw new Error("CSV must have a header row and at least one data row");

  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h.trim().toLowerCase()] = (values[i] ?? "").trim();
    });
    return row;
  });
}

function parseLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error("Usage: npx tsx scripts/import-puzzles.ts <path-to-csv>");
    process.exit(1);
  }

  const raw = readFileSync(resolve(csvPath), "utf-8");
  const rows = parseCSV(raw);

  const puzzles: PuzzleRow[] = rows.map((row, idx) => {
    const id = parseInt(row.id, 10);
    if (isNaN(id)) throw new Error(`Row ${idx + 2}: invalid id "${row.id}"`);

    const date = row.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Row ${idx + 2}: invalid date "${date}"`);

    const answer = row.answer;
    if (!answer) throw new Error(`Row ${idx + 2}: missing answer`);

    const category = row.category || "musical";

    const clues = [row.clue1, row.clue2, row.clue3, row.clue4, row.clue5] as [
      string, string, string, string, string
    ];
    if (clues.some((c) => !c)) throw new Error(`Row ${idx + 2}: missing clue(s) for "${answer}"`);

    const aliasStr = row.aliases?.trim();
    const aliases = aliasStr ? aliasStr.split("|").map((a) => a.trim()).filter(Boolean) : undefined;

    return { id, date, answer, category, clues, ...(aliases ? { aliases } : {}) };
  });

  // Validate no duplicate ids or dates
  const ids = new Set<number>();
  const dates = new Set<string>();
  for (const p of puzzles) {
    if (ids.has(p.id)) throw new Error(`Duplicate id: ${p.id}`);
    if (dates.has(p.date)) throw new Error(`Duplicate date: ${p.date}`);
    ids.add(p.id);
    dates.add(p.date);
  }

  // Sort by date
  puzzles.sort((a, b) => a.date.localeCompare(b.date));

  const outPath = resolve(__dirname, "../data/puzzles.json");
  writeFileSync(outPath, JSON.stringify(puzzles, null, 2) + "\n");
  console.log(`Wrote ${puzzles.length} puzzles to data/puzzles.json`);
}

main();
