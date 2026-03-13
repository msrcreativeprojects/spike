-- Update puzzles table: shorten clues > 110 chars
-- Run in Supabase SQL Editor (postgres role to bypass RLS)
-- Column type is JSONB, use '[]'::jsonb syntax

-- Cabaret
UPDATE puzzles SET clues = '["The 1966 original had no overture and no show curtain — the audience entered to a bare stage","Rob Marshall co-directed and choreographed the 1998 revival before directing the 2002 film of Chicago","The score by John Kander and Fred Ebb was their first major Broadway success","Based on Christopher Isherwood''s 1939 novel Goodbye to Berlin and Van Druten''s play I Am a Camera","Joel Grey originated the Emcee in 1966 and returned for the 1987 revival, 20 years later"]'::jsonb WHERE id = '108';

-- Fiddler on the Roof
UPDATE puzzles SET clues = '["Working titles included The Old Country, Not So Long Ago, Not So Far Away, and Where Poppa Came From","Stephen Sondheim urged Jerome Robbins to direct the show after hearing the score at a private party","Boris Aronson''s original set design was inspired by a Marc Chagall painting","The original production ran for 3,242 performances at the Imperial Theatre","The pit concertmaster played the fiddler''s violin parts live while the onstage fiddler mimed"]'::jsonb WHERE id = '106';

-- Hair
UPDATE puzzles SET clues = '["The first Broadway musical to feature a live rock band on stage instead of a traditional pit orchestra","Originally developed at Joseph Papp''s Public Theater in 1967, then moved to Broadway in April 1968","Written by two actors who were also in the original cast, performing alongside characters they created","The original production had no formal choreographer — the movement was described as organized chaos","Over 20 international productions opened within two years of the Broadway premiere"]'::jsonb WHERE id = '112';

-- Spring Awakening
UPDATE puzzles SET clues = '["The show ran for 859 performances at the Eugene O''Neill Theatre from December 2006 to January 2009","The marketing campaign targeted younger audiences through MySpace and early social media","Based on Frank Wedekind''s 1891 play of the same name","Jonathan Groff was 21 years old when he originated the role of Melchior, his Broadway debut","Actors in 19th-century costumes pulled out handheld microphones when they began to sing"]'::jsonb WHERE id = '103';

-- Avenue Q
UPDATE puzzles SET clues = '["The show was developed at the Eugene O''Neill Theater Center in Waterford, Connecticut","Capitalized at approximately $3.5 million, a fraction of the cost of most Broadway musicals","The set was a split-level apartment building facade on the Golden Theatre''s intimate stage","Beat Wicked for the Tony for Best Musical in 2003, one of the biggest upsets in Tony history","All four principal puppeteers had worked as real Sesame Street performers before the show"]'::jsonb WHERE id = '109';

-- West Side Story
UPDATE puzzles SET clues = '["Originally conceived as a conflict between a Catholic and Jewish family on the Lower East Side","Won only 2 Tony Awards in 1958, losing Best Musical to The Music Man","Jerome Robbins negotiated eight weeks of rehearsal time, double the standard four weeks","The prologue features nearly ten minutes of continuous dance with almost no dialogue","Chita Rivera originated the role of Anita at age 24"]'::jsonb WHERE id = '104';

-- Guys and Dolls
UPDATE puzzles SET clues = '["The original production opened November 24, 1950, at the 46th Street Theatre for 1,200 performances","Book writer Abe Burrows was denied program credit because he was blacklisted during the McCarthy era","Frank Rich of the New York Times called it the greatest American musical ever written","The 1992 revival won 4 Tony Awards including Best Revival","Based on the short stories of Damon Runyon"]'::jsonb WHERE id = '101';
