-- Add theme column for special edition puzzles (e.g., "gold" for Oscars)
-- Nullable text — null means normal daily colors, non-null overrides
ALTER TABLE puzzles ADD COLUMN IF NOT EXISTS theme text DEFAULT NULL;

-- Verify
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'puzzles' AND column_name = 'theme';
