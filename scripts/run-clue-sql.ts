/**
 * Insert clue bank SQL files into Supabase.
 * Signs in as admin first to bypass RLS, then parses SQL VALUES and batch-inserts.
 *
 * Usage: npx tsx scripts/run-clue-sql.ts <password> [file1.sql file2.sql ...]
 * If no files specified, runs all 4 new category files.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Read .env.local
const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env: Record<string, string> = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Parse SQL VALUES rows into objects
function parseSqlFile(filePath: string) {
  const sql = readFileSync(filePath, "utf-8");
  const rows: {
    show_name: string;
    category: string;
    level: number;
    clue_text: string;
    clue_type: string | null;
    specificity: string | null;
    notes: string | null;
  }[] = [];

  // Match each VALUES tuple: ('...', '...', N, '...', '...', '...', '...')
  // Fields: show_name, category, level, clue_text, clue_type, specificity, notes
  const tupleRegex = /\(('(?:[^']|'')*'),\s*('(?:[^']|'')*'),\s*(\d+),\s*('(?:[^']|'')*'),\s*('(?:[^']|'')*'|NULL),\s*('(?:[^']|'')*'|NULL),\s*('(?:[^']|'')*'|NULL)\)/g;

  let match;
  while ((match = tupleRegex.exec(sql)) !== null) {
    const unquote = (s: string) => {
      if (s === "NULL") return null;
      // Remove surrounding quotes and unescape ''
      return s.slice(1, -1).replace(/''/g, "'");
    };

    rows.push({
      show_name: unquote(match[1])!,
      category: unquote(match[2])!,
      level: parseInt(match[3]),
      clue_text: unquote(match[4])!,
      clue_type: unquote(match[5]),
      specificity: unquote(match[6]),
      notes: unquote(match[7]),
    });
  }

  return rows;
}

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error("Usage: npx tsx scripts/run-clue-sql.ts <admin-password> [file1.sql ...]");
    process.exit(1);
  }

  // Sign in as admin
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: env.ADMIN_EMAIL,
    password,
  });

  if (authErr) {
    console.error("Auth failed:", authErr.message);
    process.exit(1);
  }
  console.log("✓ Signed in as", env.ADMIN_EMAIL);

  // Default files if none specified
  const files = process.argv.length > 3
    ? process.argv.slice(3)
    : [
        "scripts/clues-broadway-actor.sql",
        "scripts/clues-broadway-play.sql",
        "scripts/clues-broadway-theater.sql",
        "scripts/clues-touring-city.sql",
      ];

  let totalInserted = 0;

  for (const file of files) {
    const filePath = resolve(__dirname, "..", file);
    console.log(`\nParsing ${file}...`);
    const rows = parseSqlFile(filePath);
    console.log(`  Found ${rows.length} rows`);

    if (rows.length === 0) {
      console.warn("  ⚠ No rows parsed — check SQL format");
      continue;
    }

    // Insert in batches of 100
    const batchSize = 100;
    let inserted = 0;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase.from("clue_bank").insert(batch);
      if (error) {
        console.error(`  ✗ Batch ${i}-${i + batch.length} failed:`, error.message);
        // Try individual inserts to find the problem row
        for (const row of batch) {
          const { error: rowErr } = await supabase.from("clue_bank").insert(row);
          if (rowErr) {
            console.error(`    Failed row: ${row.show_name} L${row.level} — ${rowErr.message}`);
          } else {
            inserted++;
          }
        }
      } else {
        inserted += batch.length;
      }
    }

    console.log(`  ✓ Inserted ${inserted}/${rows.length} rows`);
    totalInserted += inserted;
  }

  console.log(`\n✓ Done! Inserted ${totalInserted} total rows.`);
}

main();
