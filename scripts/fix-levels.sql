-- SPIKE Clue Bank: Shift difficulty levels
-- Problem: Level 3 (narrowing) feels like it should be level 4,
--          Level 4 (recognition) feels like it should be level 5
-- Solution: Shift 4→5, then 3→4. Level 3 becomes empty for new harder clues.

-- Step 1: Shift level 4 → 5 (do this FIRST to avoid collision)
UPDATE clue_bank SET level = 5, specificity = 'giveaway' WHERE level = 4;

-- Step 2: Shift level 3 → 4
UPDATE clue_bank SET level = 4, specificity = 'recognition' WHERE level = 3;

-- Step 3: Delete old queued puzzles (the ones from batch-1.sql before the clue bank existed)
DELETE FROM puzzles WHERE status = 'queued';

-- Verify the shift
SELECT level, specificity, count(*) as clue_count
FROM clue_bank
GROUP BY level, specificity
ORDER BY level;
