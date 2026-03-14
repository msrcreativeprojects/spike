#!/usr/bin/env python3
"""
Sync SQL seed files with live DB clue_text values.

For each of the 14 unbuilt shows, fetches the live DB clues (sorted by id),
then updates the corresponding INSERT rows in the SQL seed files to match
the live DB clue_text, preserving all other fields.
"""

import json
import subprocess
import re
import sys
from collections import defaultdict

# The 14 unbuilt shows whose clues were rewritten
UNBUILT_SHOWS = {
    "& Juliet",
    "Back to the Future: The Musical",
    "Cats",
    "Dreamgirls",
    "Funny Girl",
    "Gypsy",
    "Hamilton",
    "Hello, Dolly!",
    "Jesus Christ Superstar",
    "Miss Saigon",
    "My Fair Lady",
    "Six",
    "South Pacific",
    "Wicked",
}

SQL_FILES = [
    "clues-broadway-musical.sql",
    "clues-broadway-musical-batch2.sql",
    "clues-broadway-musical-batch3.sql",
]

SCRIPT_DIR = "/Users/mattrodin/Documents/*PROJECTS/SPIKE/scripts"

SUPABASE_URL = "https://dbzpjqzowsmcidftnhxl.supabase.co/rest/v1/clue_bank"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRienBqcXpvd3NtY2lkZnRuaHhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjk3NzA5NiwiZXhwIjoyMDg4NTUzMDk2fQ.hehejsa9UAsEe7P72ijGG5v5nSG1jmAeFwZEfrI-cuY"


def fetch_live_clues():
    """Fetch all 350 clues for the 14 unbuilt shows from the live DB."""
    # Use the exact pre-encoded URL from the instructions
    url = (
        'https://dbzpjqzowsmcidftnhxl.supabase.co/rest/v1/clue_bank'
        '?select=id,show_name,level,clue_text'
        '&show_name=in.(%22%26%20Juliet%22,%22Back%20to%20the%20Future%3A%20The%20Musical%22,'
        '%22Cats%22,%22Dreamgirls%22,%22Funny%20Girl%22,%22Gypsy%22,%22Hamilton%22,'
        '%22Hello%2C%20Dolly!%22,%22Jesus%20Christ%20Superstar%22,%22Miss%20Saigon%22,'
        '%22My%20Fair%20Lady%22,%22Six%22,%22South%20Pacific%22,%22Wicked%22)'
        '&order=show_name,id'
    )

    result = subprocess.run(
        [
            "curl", "-s", "--globoff", url,
            "-H", f"apikey: {SUPABASE_KEY}",
            "-H", f"Authorization: Bearer {SUPABASE_KEY}",
        ],
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(f"ERROR: curl failed with return code {result.returncode}")
        print(result.stderr)
        sys.exit(1)

    data = json.loads(result.stdout)
    if isinstance(data, dict) and "message" in data:
        print(f"ERROR: API returned error: {data}")
        sys.exit(1)

    print(f"Fetched {len(data)} clues from live DB")

    # Group by show_name, sorted by id within each show
    clues_by_show = defaultdict(list)
    for row in data:
        clues_by_show[row["show_name"]].append(row)

    # Verify each show has exactly 25 clues
    for show, clues in sorted(clues_by_show.items()):
        if len(clues) != 25:
            print(f"WARNING: {show} has {len(clues)} clues, expected 25")

    return clues_by_show


def escape_sql_string(s):
    """Escape a string for SQL single-quoted literals (double up single quotes)."""
    return s.replace("'", "''")


def parse_insert_row(line):
    """
    Parse a SQL INSERT row like:
      ('Hamilton', 'Broadway Musical', 0, 'clue text here', 'backstage', 'fact', 'notes here'),

    Returns a dict with the parsed fields, or None if the line is not a data row.
    """
    # Match lines that start with ( and contain the field pattern
    # We need to handle single quotes inside strings (escaped as '')
    stripped = line.strip()
    if not stripped.startswith("("):
        return None

    # Remove trailing comma and/or semicolon
    if stripped.endswith("),") or stripped.endswith(");"):
        stripped = stripped[:-1]  # remove the trailing , or ;

    if not stripped.endswith(")"):
        return None

    # Remove outer parens
    inner = stripped[1:-1]

    # Parse the 7 fields. Fields are either:
    #   - A single-quoted string (may contain '' for escaped quotes)
    #   - A number
    fields = []
    i = 0
    while i < len(inner) and len(fields) < 7:
        # Skip whitespace and commas
        while i < len(inner) and inner[i] in (' ', ','):
            i += 1
        if i >= len(inner):
            break

        if inner[i] == "'":
            # String field - find the end, handling '' escapes
            i += 1  # skip opening quote
            value = []
            while i < len(inner):
                if inner[i] == "'" and i + 1 < len(inner) and inner[i + 1] == "'":
                    value.append("'")
                    i += 2
                elif inner[i] == "'":
                    i += 1  # skip closing quote
                    break
                else:
                    value.append(inner[i])
                    i += 1
            fields.append("".join(value))
        else:
            # Numeric field
            start = i
            while i < len(inner) and inner[i] not in (',', ' '):
                i += 1
            fields.append(inner[start:i])

    if len(fields) != 7:
        return None

    return {
        "show_name": fields[0],
        "category": fields[1],
        "level": fields[2],
        "clue_text": fields[3],
        "clue_type": fields[4],
        "specificity": fields[5],
        "notes": fields[6],
    }


def rebuild_insert_row(parsed, new_clue_text, original_line):
    """
    Rebuild the INSERT row with the new clue_text, preserving the original
    line's trailing comma/semicolon and whitespace.
    """
    # Determine the trailing character(s)
    stripped = original_line.rstrip()
    trailing = ""
    if stripped.endswith(");"):
        trailing = ");"
    elif stripped.endswith("),"):
        trailing = "),"
    elif stripped.endswith(")"):
        trailing = ")"
    else:
        trailing = stripped[-1] if stripped else ""

    escaped_clue = escape_sql_string(new_clue_text)

    return (
        f"('{escape_sql_string(parsed['show_name'])}', "
        f"'{escape_sql_string(parsed['category'])}', "
        f"{parsed['level']}, "
        f"'{escaped_clue}', "
        f"'{escape_sql_string(parsed['clue_type'])}', "
        f"'{escape_sql_string(parsed['specificity'])}', "
        f"'{escape_sql_string(parsed['notes'])}')"
        f"{trailing[1:]}"  # trailing , or ; or nothing (skip the ) since we already added it)
    )


def process_sql_file(filepath, clues_by_show):
    """
    Process a single SQL file, updating clue_text for unbuilt shows.
    Returns (updated_content, changes_count).
    """
    with open(filepath, "r") as f:
        lines = f.readlines()

    # First pass: find all rows for each unbuilt show and their line indices
    rows_by_show = defaultdict(list)  # show_name -> [(line_index, parsed)]
    for i, line in enumerate(lines):
        parsed = parse_insert_row(line)
        if parsed and parsed["show_name"] in UNBUILT_SHOWS:
            rows_by_show[parsed["show_name"]].append((i, parsed))

    changes = 0

    for show_name, rows in rows_by_show.items():
        if show_name not in clues_by_show:
            print(f"  WARNING: {show_name} not found in live DB data")
            continue

        live_clues = clues_by_show[show_name]

        if len(rows) != len(live_clues):
            print(
                f"  WARNING: {show_name} has {len(rows)} rows in SQL "
                f"but {len(live_clues)} clues in live DB"
            )

        # Match by position
        for idx, (line_idx, parsed) in enumerate(rows):
            if idx >= len(live_clues):
                print(f"  WARNING: {show_name} row {idx} has no matching live clue")
                break

            live_clue_text = live_clues[idx]["clue_text"]
            old_clue_text = parsed["clue_text"]

            if old_clue_text != live_clue_text:
                new_line = rebuild_insert_row(parsed, live_clue_text, lines[line_idx])
                lines[line_idx] = new_line + "\n"
                changes += 1

    updated_content = "".join(lines)
    return updated_content, changes


def main():
    print("Fetching live DB clues...")
    clues_by_show = fetch_live_clues()

    print(f"\nShows in live DB: {sorted(clues_by_show.keys())}")
    print(f"Clues per show: {', '.join(f'{k}: {len(v)}' for k, v in sorted(clues_by_show.items()))}")

    total_changes = 0

    for sql_file in SQL_FILES:
        filepath = f"{SCRIPT_DIR}/{sql_file}"
        print(f"\nProcessing {sql_file}...")

        updated_content, changes = process_sql_file(filepath, clues_by_show)
        total_changes += changes

        with open(filepath, "w") as f:
            f.write(updated_content)

        print(f"  Updated {changes} clue_text values")

    print(f"\nTotal changes: {total_changes}")

    # Verification: Show a few examples
    print("\n--- Verification: First 3 clues for Hamilton (live DB) ---")
    for clue in clues_by_show.get("Hamilton", [])[:3]:
        print(f"  ID {clue['id']}: {clue['clue_text'][:80]}...")

    print("\n--- Verification: First 3 clues for Wicked (live DB) ---")
    for clue in clues_by_show.get("Wicked", [])[:3]:
        print(f"  ID {clue['id']}: {clue['clue_text'][:80]}...")

    print("\n--- Verification: First 3 clues for Six (live DB) ---")
    for clue in clues_by_show.get("Six", [])[:3]:
        print(f"  ID {clue['id']}: {clue['clue_text'][:80]}...")


if __name__ == "__main__":
    main()
