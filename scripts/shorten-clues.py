#!/usr/bin/env python3
"""
Shorten all clues over 110 characters in SQL seed files.
Strategy: find natural breakpoints, trim elaboration, ensure clean endings.
"""
import re
import os

MAX_LEN = 110

# Words that can't end a clue — indicate a mid-thought cut
DANGLING = {
    'a', 'an', 'the', 'of', 'with', 'for', 'in', 'to', 'at', 'from', 'by',
    'and', 'or', 'but', 'that', 'which', 'who', 'whom', 'whose', 'its',
    'their', 'over', 'into', 'on', 'as', 'than', 'this', 'these', 'those',
    'between', 'through', 'during', 'before', 'after', 'about', 'under',
    'not', 'also', 'each', 'every', 'both', 'all', 'such', 'more',
    'most', 'very', 'being', 'having', 'including', 'featuring', 'using',
    'was', 'were', 'is', 'are', 'had', 'has', 'been', 'would', 'could',
    'honoring', 'creating', 'making', 'becoming', 'like',
}

# Breakpoint phrases — cut before these
BREAK_PHRASES = [
    ", with ",
    ", which ",
    ", where ",
    ", while ",
    ", making ",
    ", including ",
    ", requiring ",
    ", allowing ",
    ", creating ",
    ", earning ",
    ", becoming ",
    ", producing ",
    ", featuring ",
    ", using ",
    ", adding ",
    ", helping ",
    " — ",
    " – ",
    ", plus ",
    ", and the ",
    ", the first ",
    ", one of ",
    "; ",
]


def ends_clean(text: str) -> bool:
    """Check if text ends at a natural thought boundary."""
    last_word = text.rstrip(' .,;:').split()[-1].lower().rstrip('.,;:')
    return last_word not in DANGLING


def find_clean_comma_cut(text, max_len):
    """Find the last comma before max_len that produces a clean ending."""
    positions = [i for i, ch in enumerate(text) if ch == ',' and i < max_len]
    # Try from rightmost comma backwards
    for pos in reversed(positions):
        candidate = text[:pos].strip()
        if len(candidate) >= 40 and len(candidate) <= max_len and ends_clean(candidate):
            return candidate
    return None


def shorten_clue(text: str) -> str:
    if len(text) <= MAX_LEN:
        return text

    # Strategy 1: Try breakpoint phrases
    for phrase in BREAK_PHRASES:
        idx = text.find(phrase)
        if idx > 0 and idx <= MAX_LEN:
            candidate = text[:idx].strip()
            if 40 <= len(candidate) <= MAX_LEN and ends_clean(candidate):
                return candidate

    # Strategy 2: Find cleanest comma cut
    result = find_clean_comma_cut(text, MAX_LEN)
    if result:
        return result

    # Strategy 3: Cut at last space before MAX_LEN, but ensure clean ending
    # Try progressively shorter cuts until we get a clean ending
    for target in range(MAX_LEN, 50, -1):
        space = text.rfind(' ', 0, target)
        if space > 40:
            candidate = text[:space].strip()
            if ends_clean(candidate):
                return candidate

    # Strategy 4: Allow a slightly dangling end at a comma (better than nothing)
    result = find_clean_comma_cut(text, MAX_LEN)
    if result:
        return result

    # Fallback: just cut at last space, even if dangling
    last_space = text.rfind(' ', 0, MAX_LEN)
    if last_space > 50:
        return text[:last_space].strip()

    return text[:MAX_LEN].strip()


def process_sql_file(filepath: str, dry_run: bool = False) -> tuple[int, int, list]:
    """Process a SQL file, returning (total, shortened, changes_list)."""
    content = open(filepath).read()

    pattern = r"(\('(?:[^']|'')*',\s*'[^']*',\s*\d+,\s*')((?:[^']|'')*?)(',\s*'[^']*',\s*'[^']*',\s*'(?:[^']|'')*'\))"

    total = 0
    shortened = 0
    changes = []

    def replacer(m):
        nonlocal total, shortened
        prefix = m.group(1)
        clue_sql = m.group(2)
        suffix = m.group(3)

        clue_text = clue_sql.replace("''", "'")
        total += 1

        if len(clue_text) <= MAX_LEN:
            return m.group(0)

        new_text = shorten_clue(clue_text)
        if new_text != clue_text:
            shortened += 1
            changes.append((len(clue_text), len(new_text), clue_text, new_text))
            new_sql = new_text.replace("'", "''")
            return prefix + new_sql + suffix

        return m.group(0)

    new_content = re.sub(pattern, replacer, content)

    if not dry_run and new_content != content:
        open(filepath, 'w').write(new_content)

    return total, shortened, changes


def main():
    sql_files = [
        'scripts/clues-broadway-musical.sql',
        'scripts/clues-broadway-musical-batch2.sql',
        'scripts/clues-broadway-musical-batch3.sql',
        'scripts/clues-broadway-theater.sql',
        'scripts/clues-broadway-actor.sql',
        'scripts/clues-broadway-play.sql',
    ]

    grand_total = 0
    grand_shortened = 0
    all_changes = []

    for f in sql_files:
        if not os.path.exists(f):
            continue
        total, shortened, changes = process_sql_file(f)
        grand_total += total
        grand_shortened += shortened
        all_changes.extend(changes)
        print(f"{f}: {total} clues, {shortened} shortened")

    print(f"\nTotal: {grand_total} clues, {grand_shortened} shortened")

    # Verify: check remaining long clues AND dangling endings
    still_long = []
    dangling = []
    for f in sql_files:
        if not os.path.exists(f):
            continue
        content = open(f).read()
        pattern = r"\('([^']*(?:''[^']*)*)',\s*'[^']*',\s*\d+,\s*'((?:[^']|'')*)',\s*'[^']*',\s*'[^']*',\s*'(?:[^']|'')*'\)"
        for m in re.finditer(pattern, content):
            show = m.group(1).replace("''", "'")
            ct = m.group(2).replace("''", "'")
            if len(ct) > MAX_LEN:
                still_long.append((len(ct), ct, show))
            if not ends_clean(ct):
                dangling.append((len(ct), ct, show))

    print(f"\nStill over {MAX_LEN}: {len(still_long)}")
    print(f"Dangling endings: {len(dangling)}")

    if still_long:
        print("\n--- Still long ---")
        for length, text, show in still_long[:15]:
            print(f"[{length}] {show}: {text}")
            print()

    if dangling:
        print("\n--- Dangling endings ---")
        for length, text, show in dangling[:15]:
            print(f"[{length}] {show}: ...{text[-40:]}")
            print()


if __name__ == "__main__":
    main()
