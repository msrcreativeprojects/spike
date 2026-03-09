-- SPIKE Clue Bank — Broadway Actor
-- 15 subjects x 35 clues each = 525 total rows

INSERT INTO clue_bank (show_name, category, level, clue_text, clue_type, specificity, notes) VALUES

-- ============================================================
-- LIN-MANUEL MIRANDA (35 clues)
-- ============================================================
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Created the musical that won the Pulitzer Prize for Drama', 'career', 'fact', 'Only the second musical ever to win this honor'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Achieved EGOT status (Emmy, Grammy, Oscar, Tony)', 'award', 'fact', 'Rare achievement reached by very few performers'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Wrote the music for Moana and Encanto', 'crossover', 'fact', 'Both became massive Disney commercial successes'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Grew up in Washington Heights, NYC, which inspired one of his musicals', 'personal', 'fact', 'Autobiographical connection to his first Broadway hit'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Founded Freestyle Love Supreme, a hip-hop improvisation group', 'collaboration', 'fact', 'This preceded his major Broadway breakthrough'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Married Vanessa Nadal, his high school sweetheart who became a lawyer', 'personal', 'fact', 'Wife is an intellectual property attorney'),
('Lin-Manuel Miranda', 'Broadway Actor', 0, 'Wrote the score for the live-action remake of The Little Mermaid', 'crossover', 'fact', 'Released in 2023 as part of Disney''s live-action series'),
-- Level 1: Very Broad (6 clues)
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Has created multiple Tony Award-winning musicals', 'career', 'very_broad', 'Applies to several major composers'),
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Bridged hip-hop and traditional musical theater on Broadway', 'career', 'very_broad', 'Revolutionary crossover between genres'),
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Won awards for both composing and performing', 'award', 'very_broad', 'Common for multi-talented theater artists'),
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Created work that dominated popular culture for years', 'career', 'very_broad', 'Referenced in countless shows and parodies'),
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Worked extensively with Disney on film and stage projects', 'crossover', 'very_broad', 'Many Broadway artists work in multiple mediums'),
('Lin-Manuel Miranda', 'Broadway Actor', 1, 'Originated a role in a show that later won Best Musical on Broadway', 'role', 'very_broad', 'Many Broadway creators perform in their own work'),
-- Level 2: Broad (6 clues)
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'His first Broadway musical was set in a New York neighborhood and featured Latin-influenced music', 'role', 'broad', 'Narrows to a few composers with this background'),
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'His breakthrough show featured predominantly Spanish and English-language music', 'role', 'broad', 'Few Broadway shows use bilingual approach'),
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'Created a musical where all roles were specifically written for non-white casting', 'career', 'broad', 'Deliberately color-conscious casting approach'),
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'Contributed music to a Disney film featuring a female Polynesian protagonist', 'crossover', 'broad', 'Moana was a major 2016 release'),
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'Wrote multiple character songs that became cultural phenomena despite original limited exposure', 'career', 'broad', 'His songs achieved unusual viral success'),
('Lin-Manuel Miranda', 'Broadway Actor', 2, 'Known for working collaboratively with diverse creative teams in multiple entertainment mediums', 'collaboration', 'broad', 'Demonstrates versatility across theater, film, television'),
-- Level 3: Narrowing (6 clues)
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'Composed for the show in which all main characters are non-white immigrants or first-generation Americans', 'role', 'narrowing', 'Reflects actual Washington Heights demographics'),
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'Created the concept album for a music-driven show that blended sung-through structure with modern hip-hop delivery', 'career', 'narrowing', 'Unusually structured for Broadway'),
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'His most famous musical uses a diverse cast to portray 18th-century American historical figures', 'role', 'narrowing', 'Historical revisionist casting approach'),
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'Wrote songs for an animated film about a girl discovering her family connection to ocean magic', 'crossover', 'narrowing', 'Moana mythology-based film'),
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'Created the enchanted house that sings in a 2021 Disney animated film', 'crossover', 'narrowing', 'Encanto featured sentient architecture'),
('Lin-Manuel Miranda', 'Broadway Actor', 3, 'Played multiple historical figures in a show where he performed for 492 consecutive performances off-Broadway before moving to Broadway', 'role', 'narrowing', 'Very specific run length'),
-- Level 4: Recognition (6 clues)
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'Originated Alexander Hamilton in the Broadway musical of that name', 'role', 'recognition', 'Specific historical-musical role identification'),
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'Composed "How Does a Bastard, Orphan, Son of a Whore" as the opening number', 'role', 'recognition', 'Distinctive opening lyric'),
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'The musical he created has a track with the Schuyler Sisters performing their introductory number', 'role', 'recognition', 'Recognizable show structure'),
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'Wrote the Central Park in the Heights prequel film that became a 2021 HBO Max release', 'crossover', 'recognition', 'In the Heights film adaptation detail'),
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'Created the musical where a character raps about being in debt from medical school', 'role', 'recognition', 'Usnavi''s doctor sister storyline'),
('Lin-Manuel Miranda', 'Broadway Actor', 4, 'Wrote the "You''ll Be Back" song performed by a villainous character in a 2015 Broadway musical', 'role', 'recognition', 'King George III''s signature number'),
-- Level 5: Giveaway (4 clues)
('Lin-Manuel Miranda', 'Broadway Actor', 5, 'Wrote and originated the role of Alexander Hamilton in the 2015 musical sensation', 'role', 'giveaway', 'The most famous Broadway premiere in recent decades'),
('Lin-Manuel Miranda', 'Broadway Actor', 5, 'Creator of a show that features Angelica Schuyler singing "The Schuyler Sisters"', 'role', 'giveaway', 'Extremely specific song and character identification'),
('Lin-Manuel Miranda', 'Broadway Actor', 5, 'Composed the In the Heights musical that won Best Musical at the 2008 Tony Awards', 'career', 'giveaway', 'Only Broadway show he co-created (other than Hamilton)'),
('Lin-Manuel Miranda', 'Broadway Actor', 5, 'The composer and lyricist who writes primarily in hip-hop, rap, and R&B styles', 'career', 'giveaway', 'His signature musical style is immediately identifiable'),

-- ============================================================
-- HUGH JACKMAN (35 clues)
-- ============================================================
('Hugh Jackman', 'Broadway Actor', 0, 'Australian performer who became an international film star', 'personal', 'fact', 'Born and trained in Australia before major fame'),
('Hugh Jackman', 'Broadway Actor', 0, 'Played a superhero character in nine theatrical films', 'role', 'fact', 'Wolverine in the X-Men franchise'),
('Hugh Jackman', 'Broadway Actor', 0, 'Won the Tony Award for Best Actor in a Musical for a show based on an entertainer''s life story', 'award', 'fact', 'The Boy from Oz in 2004'),
('Hugh Jackman', 'Broadway Actor', 0, 'Starred as circus master in a musical fantasy film released in 2017', 'role', 'fact', 'The Greatest Showman became a cultural phenomenon'),
('Hugh Jackman', 'Broadway Actor', 0, 'Revived a classic Rodgers and Hammerstein musical on Broadway in 2022', 'role', 'fact', 'Oklahoma! marked his major Broadway return'),
('Hugh Jackman', 'Broadway Actor', 0, 'Attended a prestigious Western Australian performing arts conservatory known for developing theater talent', 'personal', 'fact', 'WAAPA (Western Australia Academy of Performing Arts)'),
('Hugh Jackman', 'Broadway Actor', 0, 'Married to an actress he met while both were employed in Australian theater', 'personal', 'fact', 'Married Deborra-Lee Furness in 1996'),
-- Level 1: Very Broad (6 clues)
('Hugh Jackman', 'Broadway Actor', 1, 'Has had a successful career spanning film, television, and stage', 'career', 'very_broad', 'Multi-platform success common among major stars'),
('Hugh Jackman', 'Broadway Actor', 1, 'Won a Tony Award for a biographical musical role', 'award', 'very_broad', 'Several actors have won for similar work'),
('Hugh Jackman', 'Broadway Actor', 1, 'Played a role in a superhero film franchise for over a decade', 'role', 'very_broad', 'Multiple actors have sustained long comic book runs'),
('Hugh Jackman', 'Broadway Actor', 1, 'Hosted the Tony Awards ceremony multiple times', 'career', 'very_broad', 'Many Broadway stars have hosted major awards'),
('Hugh Jackman', 'Broadway Actor', 1, 'Appeared in both dramatic and musical theater productions', 'career', 'very_broad', 'Common for versatile performers'),
('Hugh Jackman', 'Broadway Actor', 1, 'Built a career that transitioned from stage to film stardom', 'career', 'very_broad', 'Standard pathway for many international actors'),
-- Level 2: Broad (6 clues)
('Hugh Jackman', 'Broadway Actor', 2, 'Played a character with adamantium claws in a film franchise', 'role', 'broad', 'Specific superhero franchise detail'),
('Hugh Jackman', 'Broadway Actor', 2, 'Starred in a biographical musical about an Australian entertainer known for impersonations', 'role', 'broad', 'Peter Allen was the subject of The Boy from Oz'),
('Hugh Jackman', 'Broadway Actor', 2, 'Featured as the lead in a circus-themed musical film with an ensemble cast of performers', 'role', 'broad', 'The Greatest Showman specific setting'),
('Hugh Jackman', 'Broadway Actor', 2, 'Known for strong dancing and singing abilities in addition to dramatic film roles', 'career', 'broad', 'Dancer-actor crossover is less common'),
('Hugh Jackman', 'Broadway Actor', 2, 'Trained at an institution known for producing theater professionals in his home country', 'personal', 'broad', 'WAAPA graduates include many major actors'),
('Hugh Jackman', 'Broadway Actor', 2, 'Portrayed a character searching for his biological father in a musical theater production', 'role', 'broad', 'The Boy from Oz plot element'),
-- Level 3: Narrowing (6 clues)
('Hugh Jackman', 'Broadway Actor', 3, 'Maintained his role as a mutant superhero across two decades of interconnected films', 'role', 'narrowing', 'X-Men franchise longevity is exceptional'),
('Hugh Jackman', 'Broadway Actor', 3, 'Originated the role of a circus promoter in a musical that became one of the highest-grossing theatrical releases of its year', 'role', 'narrowing', 'The Greatest Showman 2017 success'),
('Hugh Jackman', 'Broadway Actor', 3, 'Appeared in a Stephen Sondheim-inspired musical revival that opened at the St. James Theatre', 'role', 'narrowing', 'Oklahoma! specific venue detail'),
('Hugh Jackman', 'Broadway Actor', 3, 'Performed a Tony-winning musical role based on a performer who died of AIDS-related complications', 'role', 'narrowing', 'Peter Allen biography element'),
('Hugh Jackman', 'Broadway Actor', 3, 'Sang "The Man. The Music. The Show" as part of his Tony-winning performance', 'role', 'narrowing', 'Specific song from The Boy from Oz'),
('Hugh Jackman', 'Broadway Actor', 3, 'Revived a classic musical that features "Oh, What a Beautiful Mornin''" as its opening number', 'role', 'narrowing', 'Rodgers and Hammerstein composition'),
-- Level 4: Recognition (6 clues)
('Hugh Jackman', 'Broadway Actor', 4, 'Originated the role of Peter Allen in the 2003 Broadway musical adaptation', 'role', 'recognition', 'Specific biographical musical identification'),
('Hugh Jackman', 'Broadway Actor', 4, 'Played P.T. Barnum in the circus-themed musical with Michael Gracey as director', 'role', 'recognition', 'The Greatest Showman character identification'),
('Hugh Jackman', 'Broadway Actor', 4, 'Portrayed Wolverine in films including "Days of Future Past" and "Deadpool & Wolverine"', 'role', 'recognition', 'Specific X-Men film titles'),
('Hugh Jackman', 'Broadway Actor', 4, 'Starred as Curly in the 2022 Broadway revival of Oklahoma!', 'role', 'recognition', 'Specific character and production details'),
('Hugh Jackman', 'Broadway Actor', 4, 'Sang duets including "I Don''t Know How to Love Him" in The Boy from Oz', 'role', 'recognition', 'Specific song from his Tony-winning show'),
('Hugh Jackman', 'Broadway Actor', 4, 'Known for the catchphrase "G''day mate" and his Australian accent in interviews', 'personal', 'recognition', 'Strongly associated with Australian identity'),
-- Level 5: Giveaway (4 clues)
('Hugh Jackman', 'Broadway Actor', 5, 'Australian actor best known for playing Wolverine in X-Men and winning a Tony for The Boy from Oz', 'career', 'giveaway', 'Combination of film and Broadway fame'),
('Hugh Jackman', 'Broadway Actor', 5, 'Originated the role of Peter Allen in The Boy from Oz, winning the Tony Award in 2004', 'role', 'giveaway', 'Specific award and year identification'),
('Hugh Jackman', 'Broadway Actor', 5, 'Played the title character in the 2022 Broadway revival of Oklahoma!', 'role', 'giveaway', 'Curly McLain in the classic musical'),
('Hugh Jackman', 'Broadway Actor', 5, 'The actor who famously performed "Start Hopping" and other numbers in The Greatest Showman', 'role', 'giveaway', 'Distinctive musical number from the film'),

-- ============================================================
-- NATHAN LANE (35 clues)
-- ============================================================
('Nathan Lane', 'Broadway Actor', 0, 'Born Joseph Lane but adopted a stage name early in his career', 'personal', 'fact', 'Real name known to theater historians'),
('Nathan Lane', 'Broadway Actor', 0, 'Won the Tony Award for playing Max Bialystock in a musical adaptation of a Mel Brooks film', 'award', 'fact', 'The Producers in 2001 was a major revival'),
('Nathan Lane', 'Broadway Actor', 0, 'Voiced the comedic meerkat in an animated Disney film that became a cultural phenomenon', 'role', 'fact', 'Timon in The Lion King'),
('Nathan Lane', 'Broadway Actor', 0, 'Appeared in a film comedy about a drag queen and his straight-man partner', 'role', 'fact', 'The Birdcage is a classic comedic film'),
('Nathan Lane', 'Broadway Actor', 0, 'Won Tony Awards for roles in two Stephen Sondheim musicals', 'award', 'fact', 'A Funny Thing Happened and Company'),
('Nathan Lane', 'Broadway Actor', 0, 'Originated a crucial role in an HBO adaptation of a controversial play about AIDS crisis figures', 'role', 'fact', 'Angels in America revival in 2018'),
('Nathan Lane', 'Broadway Actor', 0, 'Known for comedic timing and physical humor that made audiences laugh consistently', 'career', 'fact', 'Comedy is his signature strength'),
-- Level 1: Very Broad (6 clues)
('Nathan Lane', 'Broadway Actor', 1, 'Has won multiple Tony Awards for acting on Broadway', 'award', 'very_broad', 'Several actors have multiple Tonys'),
('Nathan Lane', 'Broadway Actor', 1, 'Performed in film comedies based on Broadway musicals', 'role', 'very_broad', 'Common crossover for musical theater actors'),
('Nathan Lane', 'Broadway Actor', 1, 'Known primarily for comedic roles across multiple mediums', 'career', 'very_broad', 'Many actors specialize in comedy'),
('Nathan Lane', 'Broadway Actor', 1, 'Appeared in a satirical musical adaptation of a film by a major comedy director', 'role', 'very_broad', 'Several musicals based on comedy films'),
('Nathan Lane', 'Broadway Actor', 1, 'Provided voice acting for a major animated Disney film villain or supporting character', 'role', 'very_broad', 'Many Broadway actors voice animated roles'),
('Nathan Lane', 'Broadway Actor', 1, 'Has appeared in television dramas as well as comedies and musicals', 'career', 'very_broad', 'Versatile performers work across genres'),
-- Level 2: Broad (6 clues)
('Nathan Lane', 'Broadway Actor', 2, 'Starred in The Producers as the neurotic theater producer character', 'role', 'broad', 'Max Bialystock is highly specific'),
('Nathan Lane', 'Broadway Actor', 2, 'Provided comedic voice work for a character in a Disney animated film about African animals', 'role', 'broad', 'The Lion King specific setting'),
('Nathan Lane', 'Broadway Actor', 2, 'Played a supporting role in a Sondheim musical famous for its opening "Comedy Tonight"', 'role', 'broad', 'A Funny Thing Happened on the Way to the Forum specifics'),
('Nathan Lane', 'Broadway Actor', 2, 'Appeared in a comedic film adaptation of a musical involving multiple couples and adult themes', 'role', 'broad', 'The Birdcage is based on a French farce musical'),
('Nathan Lane', 'Broadway Actor', 2, 'Known for playing characters with neurotic, verbose personalities', 'career', 'broad', 'His signature comedic type'),
('Nathan Lane', 'Broadway Actor', 2, 'Appeared in a television comedy-drama series known for sharp writing and ensemble cast', 'role', 'broad', 'Worked on multiple acclaimed TV shows'),
-- Level 3: Narrowing (6 clues)
('Nathan Lane', 'Broadway Actor', 3, 'Played Max Bialystock opposite Matthew Broderick in a musical with the song "Springtime for Hitler"', 'role', 'narrowing', 'The Producers specific casting and musical numbers'),
('Nathan Lane', 'Broadway Actor', 3, 'Won a Tony for playing Pseudolus in a Sondheim revival that featured a treadmill in a famous scene', 'role', 'narrowing', 'A Funny Thing Happened specific staging detail'),
('Nathan Lane', 'Broadway Actor', 3, 'Provided the voice of a wisecracking comic relief meerkat paired with a warthog character', 'role', 'narrowing', 'Timon and Pumbaa relationship'),
('Nathan Lane', 'Broadway Actor', 3, 'Played Roy Cohn in a 2018 Broadway revival of a play about AIDS and American politics', 'role', 'narrowing', 'Angels in America role specificity'),
('Nathan Lane', 'Broadway Actor', 3, 'Originated a comedic character in a 1996 Sondheim musical revival that became a Broadway classic', 'role', 'narrowing', 'A Funny Thing Happened 1996 premiere'),
('Nathan Lane', 'Broadway Actor', 3, 'Known for his high-energy, physically comedic style that emphasizes audience interaction and farce', 'career', 'narrowing', 'His distinctive performance approach'),
-- Level 4: Recognition (6 clues)
('Nathan Lane', 'Broadway Actor', 4, 'Sang "I''m Alive" and other comic numbers as Max Bialystock in The Producers', 'role', 'recognition', 'Specific songs from his Tony-winning role'),
('Nathan Lane', 'Broadway Actor', 4, 'Delivered the opening number "Comedy Tonight" as Pseudolus', 'role', 'recognition', 'Iconic Sondheim opening'),
('Nathan Lane', 'Broadway Actor', 4, 'Voiced the character who sang "Hakuna Matata" in The Lion King animated film', 'role', 'recognition', 'The most famous Disney song from the film'),
('Nathan Lane', 'Broadway Actor', 4, 'Played opposite Gene Wilder in a comedic drama film about a mismatched musical duo', 'role', 'recognition', 'The Birdcage specific co-star'),
('Nathan Lane', 'Broadway Actor', 4, 'Known for his nasal voice and exaggerated facial expressions in comedic roles', 'career', 'recognition', 'His distinctive performance characteristics'),
('Nathan Lane', 'Broadway Actor', 4, 'Appeared in Penny Dreadful television series and other prestige dramas', 'role', 'recognition', 'Worked on major TV productions'),
-- Level 5: Giveaway (4 clues)
('Nathan Lane', 'Broadway Actor', 5, 'Three-time Tony Award winner known for comedic genius in The Producers, A Funny Thing Happened, and Company', 'award', 'giveaway', 'Specific award count and show titles'),
('Nathan Lane', 'Broadway Actor', 5, 'Originated Max Bialystock in The Producers and voiced Timon in Disney''s The Lion King', 'role', 'giveaway', 'Two of his most iconic roles'),
('Nathan Lane', 'Broadway Actor', 5, 'The comedic actor who won a Tony for playing Pseudolus opposite Kelsey Grammer in A Funny Thing Happened on the Way to the Forum', 'role', 'giveaway', 'Specific casting and character details'),
('Nathan Lane', 'Broadway Actor', 5, 'Broadway''s premier comedy actor, known for his neurotic, high-energy characterizations', 'career', 'giveaway', 'Definitive description of his career'),

-- ============================================================
-- IDINA MENZEL (35 clues)
-- ============================================================
('Idina Menzel', 'Broadway Actor', 0, 'Performed the Disney song "Let It Go" from an animated film based on a classic fairytale', 'crossover', 'fact', 'Frozen became the highest-grossing animated film'),
('Idina Menzel', 'Broadway Actor', 0, 'Originated the role of Elphaba in Wicked, the prequel musical about The Wizard of Oz', 'role', 'fact', 'Won Tony Award for this role in 2004'),
('Idina Menzel', 'Broadway Actor', 0, 'Had her name mispronounced at a major awards ceremony, becoming an internet meme', 'personal', 'fact', 'John Travolta said "Adele Dazeem" at 2014 Oscars'),
('Idina Menzel', 'Broadway Actor', 0, 'Born Idina Kim Mentzel in New York and uses a stage version of her real name', 'personal', 'fact', 'Removed the "t" from her surname professionally'),
('Idina Menzel', 'Broadway Actor', 0, 'Originated Maureen Johnson in the musical Rent, a role about queer and bohemian artists', 'role', 'fact', '1996 original cast member'),
('Idina Menzel', 'Broadway Actor', 0, 'Performed at the Super Bowl halftime show', 'career', 'fact', 'Major national television performance'),
('Idina Menzel', 'Broadway Actor', 0, 'Known for her powerful belt voice and strong emotional delivery in theatrical performances', 'career', 'fact', 'Her signature vocal quality'),
-- Level 1: Very Broad (6 clues)
('Idina Menzel', 'Broadway Actor', 1, 'Has performed in multiple Tony Award-nominated musicals', 'career', 'very_broad', 'Several actors have had multiple nominations'),
('Idina Menzel', 'Broadway Actor', 1, 'Won awards for performance work on both stage and in film', 'award', 'very_broad', 'Many actors work across both mediums'),
('Idina Menzel', 'Broadway Actor', 1, 'Known for powerful vocal performance in emotional scenes', 'career', 'very_broad', 'Common trait among musical theater stars'),
('Idina Menzel', 'Broadway Actor', 1, 'Originated a major role in a musical created by a famous composer and lyricist team', 'role', 'very_broad', 'Applies to many Broadway originals'),
('Idina Menzel', 'Broadway Actor', 1, 'Appeared in both stage and film adaptations of musicals', 'career', 'very_broad', 'Standard crossover for successful performers'),
('Idina Menzel', 'Broadway Actor', 1, 'Had a major pop culture moment related to a mispronouncement or misidentification', 'personal', 'very_broad', 'Various celebrities have experienced this'),
-- Level 2: Broad (6 clues)
('Idina Menzel', 'Broadway Actor', 2, 'Originated the Wicked Witch in a reimagining of The Wizard of Oz universe', 'role', 'broad', 'Wicked specific premise'),
('Idina Menzel', 'Broadway Actor', 2, 'Performed the Oscar-nominated song from Disney''s 2013 animated film about ice magic', 'crossover', 'broad', 'Frozen release year and theme specificity'),
('Idina Menzel', 'Broadway Actor', 2, 'Originated a queer bohemian character in the 1996 Jonathan Larson musical', 'role', 'broad', 'Rent specific content and era'),
('Idina Menzel', 'Broadway Actor', 2, 'Known for portraying complex, emotionally vulnerable female characters', 'career', 'broad', 'Her signature character types'),
('Idina Menzel', 'Broadway Actor', 2, 'Appeared in a musical comedy about life, death, and technology called If/Then', 'role', 'broad', 'Lesser-known but significant Broadway role'),
('Idina Menzel', 'Broadway Actor', 2, 'Performed the signature power ballad from a musical about the Wizard of Oz universe', 'role', 'broad', 'Wicked''s "Defying Gravity" fame'),
-- Level 3: Narrowing (6 clues)
('Idina Menzel', 'Broadway Actor', 3, 'Originated Elphaba opposite Kristin Chenoweth in the Broadway premiere of Wicked', 'role', 'narrowing', 'Specific original casting'),
('Idina Menzel', 'Broadway Actor', 3, 'Performed "Defying Gravity" as the act-one finale of a musical that became Broadway''s longest-running show', 'role', 'narrowing', 'Wicked longevity and song placement'),
('Idina Menzel', 'Broadway Actor', 3, 'Sang the theme song for Disney''s Frozen film, winning an Academy Award for the composition', 'crossover', 'narrowing', 'Song award specificity'),
('Idina Menzel', 'Broadway Actor', 3, 'Originated a role alongside Anthony Rapp in a 1996 musical about AIDS, poverty, and art', 'role', 'narrowing', 'Rent and its significant themes'),
('Idina Menzel', 'Broadway Actor', 3, 'Performed in a musical that features the song "For Good," a powerful duet about friendship', 'role', 'narrowing', 'Wicked specific emotional song'),
('Idina Menzel', 'Broadway Actor', 3, 'Her voice acting is featured in a Disney animated film where a character has ice-based magical powers', 'crossover', 'narrowing', 'Frozen Elsa character specificity'),
-- Level 4: Recognition (6 clues)
('Idina Menzel', 'Broadway Actor', 4, 'Originated Elphaba in Wicked and performed the iconic "Defying Gravity" number', 'role', 'recognition', 'Specific character and song'),
('Idina Menzel', 'Broadway Actor', 4, 'Voiced Elsa in Disney''s Frozen and sang "Let It Go" during the film''s climactic scene', 'role', 'recognition', 'Character and song specificity'),
('Idina Menzel', 'Broadway Actor', 4, 'Originated Maureen Johnson in Rent, a character in a show based on La Bohème', 'role', 'recognition', 'Specific casting and original show'),
('Idina Menzel', 'Broadway Actor', 4, 'Won a Tony Award in 2004 for her performance in Wicked', 'award', 'recognition', 'Specific award and year'),
('Idina Menzel', 'Broadway Actor', 4, 'Known for belting high notes and emotional intensity in ballads', 'career', 'recognition', 'Her vocal signature'),
('Idina Menzel', 'Broadway Actor', 4, 'John Travolta mispronounced her name as "Adele Dazeem" at the 2014 Academy Awards', 'personal', 'recognition', 'Specific incident and year'),
-- Level 5: Giveaway (4 clues)
('Idina Menzel', 'Broadway Actor', 5, 'Originated Elphaba in Wicked and voiced Elsa in Disney''s Frozen, singing "Let It Go"', 'career', 'giveaway', 'Two of her most iconic roles'),
('Idina Menzel', 'Broadway Actor', 5, 'Tony Award-winning actor famous for originating the Wicked Witch in Wicked', 'award', 'giveaway', 'Her most prestigious Broadway role'),
('Idina Menzel', 'Broadway Actor', 5, 'The Broadway and Disney performer whose name was mispronounced "Adele Dazeem" by John Travolta', 'personal', 'giveaway', 'Definitive viral moment'),
('Idina Menzel', 'Broadway Actor', 5, 'Broadway actor and voice actress best known for Elphaba, Elsa, and originating Maureen in Rent', 'career', 'giveaway', 'Three signature roles combined'),

-- ============================================================
-- AUDRA McDONALD (35 clues)
-- ============================================================
('Audra McDonald', 'Broadway Actor', 0, 'Record holder for the most Tony Awards won by any individual performer', 'award', 'fact', 'Currently holds 6 Tony Awards'),
('Audra McDonald', 'Broadway Actor', 0, 'Trained at Juilliard School of Performing Arts', 'personal', 'fact', 'Prestigious music conservatory in New York'),
('Audra McDonald', 'Broadway Actor', 0, 'Won her first Tony Award for a supporting role in a classic Rodgers and Hammerstein musical', 'award', 'fact', 'Carousel in 1998'),
('Audra McDonald', 'Broadway Actor', 0, 'Married to fellow Broadway actor Will Swenson', 'personal', 'fact', 'Both major musical theater performers'),
('Audra McDonald', 'Broadway Actor', 0, 'Appeared in television drama series about a law firm and political intrigue', 'role', 'fact', 'The Good Fight on CBS'),
('Audra McDonald', 'Broadway Actor', 0, 'Originated roles in musicals spanning from classic revivals to contemporary works', 'career', 'fact', 'Wide range of musical theater roles'),
('Audra McDonald', 'Broadway Actor', 0, 'Known for mezzo-soprano voice and dramatic acting ability combined', 'career', 'fact', 'Distinctive vocal and performance qualities'),
-- Level 1: Very Broad (6 clues)
('Audra McDonald', 'Broadway Actor', 1, 'Has won multiple Tony Awards across different decades', 'award', 'very_broad', 'Several multi-decade award winners exist'),
('Audra McDonald', 'Broadway Actor', 1, 'Appeared in both leading and supporting roles in major Broadway musicals', 'career', 'very_broad', 'Common for versatile performers'),
('Audra McDonald', 'Broadway Actor', 1, 'Trained at a prestigious performing arts conservatory', 'personal', 'very_broad', 'Many Broadway actors attended similar schools'),
('Audra McDonald', 'Broadway Actor', 1, 'Performed in television dramas and musicals on stage', 'career', 'very_broad', 'Standard multi-medium career path'),
('Audra McDonald', 'Broadway Actor', 1, 'Known for powerful dramatic singing and emotional performances', 'career', 'very_broad', 'Trait shared by many mezzo-sopranos'),
('Audra McDonald', 'Broadway Actor', 1, 'Married to someone within the same entertainment industry', 'personal', 'very_broad', 'Common for performers'),
-- Level 2: Broad (6 clues)
('Audra McDonald', 'Broadway Actor', 2, 'Won a Tony Award for a supporting female role in a musical from the 1950s', 'award', 'broad', 'Carousel era specificity'),
('Audra McDonald', 'Broadway Actor', 2, 'Has originated roles in Stephen Sondheim musicals', 'career', 'broad', 'Sondheim interpreter like several major actors'),
('Audra McDonald', 'Broadway Actor', 2, 'Appeared in an Aaron Sorkin drama series on television', 'role', 'broad', 'The Good Fight narrow identification'),
('Audra McDonald', 'Broadway Actor', 2, 'Known for mezzo-soprano vocal range and classical training', 'career', 'broad', 'Distinguished vocal classification'),
('Audra McDonald', 'Broadway Actor', 2, 'Originated a leading role in a musical about the Gershwin brothers and George Gershwin', 'role', 'broad', 'Porgy and Bess musical specificity'),
('Audra McDonald', 'Broadway Actor', 2, 'Appeared in a revival of a Lorraine Hansberry drama on Broadway', 'role', 'broad', 'A Raisin in the Sun'),
-- Level 3: Narrowing (6 clues)
('Audra McDonald', 'Broadway Actor', 3, 'Won her first Tony as Julie in a 1998 revival of Carousel', 'award', 'narrowing', 'Specific year and role'),
('Audra McDonald', 'Broadway Actor', 3, 'Originated roles in Ragtime, Master Class, and other major Broadway productions', 'role', 'narrowing', 'Multiple prestigious roles across her career'),
('Audra McDonald', 'Broadway Actor', 3, 'Performed in The Gershwins'' Porgy and Bess revival as Bess', 'role', 'narrowing', 'Specific opera-musical role'),
('Audra McDonald', 'Broadway Actor', 3, 'Originated a leading role in a musical drama about a jazz singer and her personal struggles', 'role', 'narrowing', 'Lady Day at Emerson''s Bar and Grill'),
('Audra McDonald', 'Broadway Actor', 3, 'Appeared opposite Michael Bublé in a musical about Frankie and Johnny''s romantic relationship', 'role', 'narrowing', 'Specific casting in the revival'),
('Audra McDonald', 'Broadway Actor', 3, 'Known as a Broadway icon with a career spanning multiple decades of major productions', 'career', 'narrowing', 'Her exceptional longevity'),
-- Level 4: Recognition (6 clues)
('Audra McDonald', 'Broadway Actor', 4, 'Won Tony Awards for roles in Carousel, Ragtime, A Raisin in the Sun, Master Class, Porgy and Bess, and Lady Day at Emerson''s Bar and Grill', 'award', 'recognition', 'All 6 Tony-winning roles'),
('Audra McDonald', 'Broadway Actor', 4, 'Originated Julie Jordan in the 1998 Carousel revival at Lincoln Center', 'role', 'recognition', 'Specific venue and year'),
('Audra McDonald', 'Broadway Actor', 4, 'Originated Billie Holiday in Lady Day at Emerson''s Bar and Grill', 'role', 'recognition', 'Biographical one-woman show role'),
('Audra McDonald', 'Broadway Actor', 4, 'Performed in multiple revivals of classic musicals and contemporary works', 'career', 'recognition', 'Her versatile repertoire'),
('Audra McDonald', 'Broadway Actor', 4, 'Married to Will Swenson, who played Raoul in Phantom of the Opera tour', 'personal', 'recognition', 'Her spouse''s career'),
('Audra McDonald', 'Broadway Actor', 4, 'Mezzo-soprano known for her rich, powerful voice and dramatic depth', 'career', 'recognition', 'Her vocal signature'),
-- Level 5: Giveaway (4 clues)
('Audra McDonald', 'Broadway Actor', 5, 'Record-holder for the most Tony Awards won by any performer with six wins', 'award', 'giveaway', 'Unique achievement in Broadway history'),
('Audra McDonald', 'Broadway Actor', 5, 'Six-time Tony Award-winning actor known for iconic roles in Carousel, Ragtime, and Porgy and Bess', 'award', 'giveaway', 'Specific wins and shows'),
('Audra McDonald', 'Broadway Actor', 5, 'Juilliard-trained mezzo-soprano with six Tony Awards for diverse roles from classic to contemporary musicals', 'career', 'giveaway', 'Education, vocal type, and achievement'),
('Audra McDonald', 'Broadway Actor', 5, 'Broadway''s most-awarded performer, also featured in The Good Fight television series', 'career', 'giveaway', 'Definitive Broadway achievement'),

-- ============================================================
-- PATTI LUPONE (35 clues)
-- ============================================================
('Patti LuPone', 'Broadway Actor', 0, 'Originated Eva Perón in the 1980 Broadway production of Evita', 'role', 'fact', 'Won Tony Award for this iconic role'),
('Patti LuPone', 'Broadway Actor', 0, 'Won a Tony Award for playing Rose in Gypsy, the famous stage mother role', 'award', 'fact', 'Gypsy revival in 2008'),
('Patti LuPone', 'Broadway Actor', 0, 'Part of the founding Juilliard Group 1 with Kevin Kline and David Ogden Stiers', 'personal', 'fact', 'Trained at prestigious conservatory'),
('Patti LuPone', 'Broadway Actor', 0, 'Known for dramatically confronting audience members using personal electronic devices during performances', 'personal', 'fact', 'Iconic theater etiquette stance'),
('Patti LuPone', 'Broadway Actor', 0, 'Appeared in the television drama series Penny Dreadful', 'role', 'fact', 'Gothic horror television production'),
('Patti LuPone', 'Broadway Actor', 0, 'Originated Joanne in Stephen Sondheim''s Company revival', 'role', 'fact', 'Company 2022 revival production'),
('Patti LuPone', 'Broadway Actor', 0, 'Originally from Northport on Long Island, New York', 'personal', 'fact', 'Her hometown geographic origin'),
-- Level 1: Very Broad (6 clues)
('Patti LuPone', 'Broadway Actor', 1, 'Has won multiple Tony Awards for leading roles in musicals', 'award', 'very_broad', 'Several actors have this achievement'),
('Patti LuPone', 'Broadway Actor', 1, 'Appeared in major stage and television productions across decades', 'career', 'very_broad', 'Multi-medium long career'),
('Patti LuPone', 'Broadway Actor', 1, 'Trained at a prestigious performing arts conservatory', 'personal', 'very_broad', 'Common among elite performers'),
('Patti LuPone', 'Broadway Actor', 1, 'Known for powerful soprano voice and dramatic stage presence', 'career', 'very_broad', 'Trait of many major musical theater stars'),
('Patti LuPone', 'Broadway Actor', 1, 'Originated iconic female lead roles in classic Broadway musicals', 'role', 'very_broad', 'Applies to several major performers'),
('Patti LuPone', 'Broadway Actor', 1, 'Appeared in television drama series with historical and supernatural themes', 'role', 'very_broad', 'Several actors work in prestige television'),
-- Level 2: Broad (6 clues)
('Patti LuPone', 'Broadway Actor', 2, 'Won a Tony Award for originating Eva Perón, the lead role in Andrew Lloyd Webber''s Evita', 'award', 'broad', 'Webber opera-musical specificity'),
('Patti LuPone', 'Broadway Actor', 2, 'Won a Tony Award for playing the famous mother character in the 2008 Gypsy revival', 'award', 'broad', 'Rose role in classic musical'),
('Patti LuPone', 'Broadway Actor', 2, 'Known for her dramatic confrontations of audience members texting or using phones', 'personal', 'broad', 'Her signature theater advocacy stance'),
('Patti LuPone', 'Broadway Actor', 2, 'Appeared in Pose, a television series about New York City ball culture in the 1980s', 'role', 'broad', 'Major prestige television role'),
('Patti LuPone', 'Broadway Actor', 2, 'Member of the original Juilliard drama class with other future Broadway stars', 'personal', 'broad', 'Juilliard Group 1 membership'),
('Patti LuPone', 'Broadway Actor', 2, 'Known for working extensively with Stephen Sondheim on stage productions', 'collaboration', 'broad', 'Multiple Sondheim collaborations'),
-- Level 3: Narrowing (6 clues)
('Patti LuPone', 'Broadway Actor', 3, 'Won her first Tony Award in 1981 for creating the role of Eva Perón on Broadway', 'award', 'narrowing', 'Specific year and role'),
('Patti LuPone', 'Broadway Actor', 3, 'Originated Rose in the 2008 Broadway revival of Gypsy opposite Laura Michelle Kelly', 'role', 'narrowing', 'Specific production year and co-star'),
('Patti LuPone', 'Broadway Actor', 3, 'Part of the legendary Juilliard drama class that also produced John Houseman''s protégés', 'personal', 'narrowing', 'Historical theater education detail'),
('Patti LuPone', 'Broadway Actor', 3, 'Originated Joanne Jefferson in the 2022 Broadway revival of Company at the Bernard B. Jacobs Theatre', 'role', 'narrowing', 'Specific venue and year'),
('Patti LuPone', 'Broadway Actor', 3, 'Performed in Penny Dreadful television series alongside Josh Harrington and others', 'role', 'narrowing', 'Specific TV series cast'),
('Patti LuPone', 'Broadway Actor', 3, 'Known for her dramatic soprano voice and commanding stage authority', 'career', 'narrowing', 'Distinctive vocal and performance qualities'),
-- Level 4: Recognition (6 clues)
('Patti LuPone', 'Broadway Actor', 4, 'Originated Eva Perón in Andrew Lloyd Webber''s Evita, the role that made her famous', 'role', 'recognition', 'Her breakthrough role'),
('Patti LuPone', 'Broadway Actor', 4, 'Won Tony Awards for both Evita and Gypsy revivals', 'award', 'recognition', 'Her two Tony-winning roles'),
('Patti LuPone', 'Broadway Actor', 4, 'Famous for her comedic monologue confronting a patron using a phone during a performance', 'personal', 'recognition', 'Her signature advocacy moment'),
('Patti LuPone', 'Broadway Actor', 4, 'Performed "Finishing the Hat" and other Stephen Sondheim material in Company revival', 'role', 'recognition', 'Sondheim musical signature'),
('Patti LuPone', 'Broadway Actor', 4, 'Part of the original Juilliard Group 1 alongside Kevin Kline and David Ogden Stiers', 'personal', 'recognition', 'Specific Juilliard cohort members'),
('Patti LuPone', 'Broadway Actor', 4, 'Known for her powerful soprano voice in dramatic musical roles', 'career', 'recognition', 'Her vocal signature and type'),
-- Level 5: Giveaway (4 clues)
('Patti LuPone', 'Broadway Actor', 5, 'Two-time Tony Award winner who originated Eva Perón in Evita and Rose in Gypsy', 'award', 'giveaway', 'Both iconic roles combined'),
('Patti LuPone', 'Broadway Actor', 5, 'Broadway legend and Juilliard Group 1 member famous for Evita, Gypsy, and confronting phone users', 'career', 'giveaway', 'Multiple signature identifiers'),
('Patti LuPone', 'Broadway Actor', 5, 'The actress who originated Eva Perón in the 1980 Broadway production of Evita', 'role', 'giveaway', 'Her most iconic role'),
('Patti LuPone', 'Broadway Actor', 5, 'Tony Award-winning performer and fierce advocate for theater etiquette', 'career', 'giveaway', 'Career and public persona combined'),

-- ============================================================
-- BEN PLATT (35 clues)
-- ============================================================
('Ben Platt', 'Broadway Actor', 0, 'Originated the titular role of Evan Hansen in the musical Dear Evan Hansen', 'role', 'fact', 'Won Tony Award in 2017'),
('Ben Platt', 'Broadway Actor', 0, 'Son of producer Marc Platt, who produced Legally Blonde and other major films', 'personal', 'fact', 'His father is a Hollywood producer'),
('Ben Platt', 'Broadway Actor', 0, 'Appeared in the Pitch Perfect films as Benji, a member of the Bellas acapella group', 'role', 'fact', 'Recurring role across the film trilogy'),
('Ben Platt', 'Broadway Actor', 0, 'Starred in the Netflix series The Politician as the protagonist Payton Hobart', 'role', 'fact', 'Ryan Murphy series'),
('Ben Platt', 'Broadway Actor', 0, 'Released a solo album titled "Sing to Me Instead"', 'career', 'fact', 'Musical career beyond theater'),
('Ben Platt', 'Broadway Actor', 0, 'Attended Harvard-Westlake School in Los Angeles', 'personal', 'fact', 'Prestigious preparatory school'),
('Ben Platt', 'Broadway Actor', 0, 'Known for his soaring tenor voice and emotional vulnerability in performances', 'career', 'fact', 'Distinctive vocal and performance qualities'),
-- Level 1: Very Broad (6 clues)
('Ben Platt', 'Broadway Actor', 1, 'Has appeared in both Broadway and film productions', 'career', 'very_broad', 'Standard multi-medium career'),
('Ben Platt', 'Broadway Actor', 1, 'Won a Tony Award for a leading role in a contemporary Broadway musical', 'award', 'very_broad', 'Several actors have this achievement'),
('Ben Platt', 'Broadway Actor', 1, 'Appeared in a film series about collegiate acapella singing', 'role', 'very_broad', 'Pitch Perfect franchise identification'),
('Ben Platt', 'Broadway Actor', 1, 'Is the son of a major Hollywood producer', 'personal', 'very_broad', 'Several Broadway actors have industry family'),
('Ben Platt', 'Broadway Actor', 1, 'Known for powerful tenor voice and emotional stage delivery', 'career', 'very_broad', 'Trait common among leading men'),
('Ben Platt', 'Broadway Actor', 1, 'Appeared in a prestigious Netflix series by a major producer-director', 'role', 'very_broad', 'Many actors appear in prestige streaming'),
-- Level 2: Broad (6 clues)
('Ben Platt', 'Broadway Actor', 2, 'Originated a teenage character dealing with mental health and family issues in a contemporary musical', 'role', 'broad', 'Dear Evan Hansen''s primary themes'),
('Ben Platt', 'Broadway Actor', 2, 'Appeared as a member of a college acapella group in a film series', 'role', 'broad', 'Pitch Perfect acapella setting'),
('Ben Platt', 'Broadway Actor', 2, 'Son of the producer of Legally Blonde and other major Hollywood productions', 'personal', 'broad', 'Marc Platt''s filmography'),
('Ben Platt', 'Broadway Actor', 2, 'Starred in Ryan Murphy''s Netflix series about ambitious high school politics', 'role', 'broad', 'The Politician series specificity'),
('Ben Platt', 'Broadway Actor', 2, 'Known for portraying anxious, introspective characters with emotional depth', 'career', 'broad', 'His signature character types'),
('Ben Platt', 'Broadway Actor', 2, 'Released solo music in addition to his stage and television work', 'career', 'broad', 'Multi-talent performer'),
-- Level 3: Narrowing (6 clues)
('Ben Platt', 'Broadway Actor', 3, 'Won a Tony Award for originating Evan Hansen at age 23', 'award', 'narrowing', 'Specific age and character'),
('Ben Platt', 'Broadway Actor', 3, 'Played Benji in all three Pitch Perfect films alongside Anna Kendrick', 'role', 'narrowing', 'Specific co-star and trilogy participation'),
('Ben Platt', 'Broadway Actor', 3, 'Originated a character who sings about a school email in the Dear Evan Hansen musical', 'role', 'narrowing', 'Specific song reference'),
('Ben Platt', 'Broadway Actor', 3, 'Son of Marc Platt, the producer of the In the Heights film adaptation', 'personal', 'narrowing', 'Specific production by his father'),
('Ben Platt', 'Broadway Actor', 3, 'Played Payton Hobart, a closeted gay student, in The Politician on Netflix', 'role', 'narrowing', 'Specific character and streaming series'),
('Ben Platt', 'Broadway Actor', 3, 'Known for his soaring tenor voice that captures emotional vulnerability in musicals', 'career', 'narrowing', 'Distinctive vocal quality'),
-- Level 4: Recognition (6 clues)
('Ben Platt', 'Broadway Actor', 4, 'Won the Tony Award for Best Actor in a Musical for Dear Evan Hansen in 2017', 'award', 'recognition', 'Specific award, category, and year'),
('Ben Platt', 'Broadway Actor', 4, 'Originated Evan Hansen, the protagonist who receives an email intended for someone else', 'role', 'recognition', 'Specific character and plot element'),
('Ben Platt', 'Broadway Actor', 4, 'Sang "Sincerely, Me" as a duet in Dear Evan Hansen', 'role', 'recognition', 'Iconic song from the musical'),
('Ben Platt', 'Broadway Actor', 4, 'Appeared as Benji Applebaum in the Pitch Perfect film series', 'role', 'recognition', 'Character name and film franchise'),
('Ben Platt', 'Broadway Actor', 4, 'Son of Marc Platt, producer of films including Legally Blonde and La La Land', 'personal', 'recognition', 'Major films by his producer father'),
('Ben Platt', 'Broadway Actor', 4, 'Known for his vulnerability and tenor vocal range in emotional scenes', 'career', 'recognition', 'His performance signature'),
-- Level 5: Giveaway (4 clues)
('Ben Platt', 'Broadway Actor', 5, 'Tony Award-winning actor who originated Evan Hansen in Dear Evan Hansen', 'award', 'giveaway', 'His breakthrough and most famous role'),
('Ben Platt', 'Broadway Actor', 5, 'The performer who sang "Sincerely, Me" and starred in the original cast of Dear Evan Hansen', 'role', 'giveaway', 'Iconic show and song identification'),
('Ben Platt', 'Broadway Actor', 5, 'Son of producer Marc Platt, originator of Evan Hansen, and Benji in Pitch Perfect', 'career', 'giveaway', 'Multiple roles and family background'),
('Ben Platt', 'Broadway Actor', 5, 'Broadway star known for his role as anxious teenager Evan Hansen', 'career', 'giveaway', 'His most iconic characterization'),

-- ============================================================
-- JONATHAN GROFF (35 clues)
-- ============================================================
('Jonathan Groff', 'Broadway Actor', 0, 'Originated Melchior Gabor in the Broadway musical Spring Awakening', 'role', 'fact', 'Won Tony Award in 2006'),
('Jonathan Groff', 'Broadway Actor', 0, 'Played King George III in the musical Hamilton', 'role', 'fact', 'Originated the role in 2015'),
('Jonathan Groff', 'Broadway Actor', 0, 'Provided the voice of Kristoff in Disney''s Frozen films', 'crossover', 'fact', 'Voiced character in animated series'),
('Jonathan Groff', 'Broadway Actor', 0, 'Appeared as a main character in Netflix''s Mindhunter series', 'role', 'fact', 'Streamed psychological thriller'),
('Jonathan Groff', 'Broadway Actor', 0, 'Originated Bobby in Stephen Sondheim''s Merrily We Roll Along revival', 'role', 'fact', '2023 Broadway production'),
('Jonathan Groff', 'Broadway Actor', 0, 'Grew up in Lancaster, Pennsylvania with a strong music education background', 'personal', 'fact', 'Geographic origin and early training'),
('Jonathan Groff', 'Broadway Actor', 0, 'Known for his distinctive baritone voice and powerful dramatic presence', 'career', 'fact', 'Vocal and performance signature'),
-- Level 1: Very Broad (6 clues)
('Jonathan Groff', 'Broadway Actor', 1, 'Has appeared in major Broadway musicals across different decades', 'career', 'very_broad', 'Standard long Broadway career'),
('Jonathan Groff', 'Broadway Actor', 1, 'Won a Tony Award for a leading role in a contemporary musical', 'award', 'very_broad', 'Several actors have this achievement'),
('Jonathan Groff', 'Broadway Actor', 1, 'Provided voice acting for a Disney animated character', 'crossover', 'very_broad', 'Many Broadway actors voice characters'),
('Jonathan Groff', 'Broadway Actor', 1, 'Appeared in a prestigious Netflix psychological drama series', 'role', 'very_broad', 'Many actors appear in prestige streaming'),
('Jonathan Groff', 'Broadway Actor', 1, 'Known for his baritone vocal range and emotional intensity', 'career', 'very_broad', 'Trait common among male musical leads'),
('Jonathan Groff', 'Broadway Actor', 1, 'Worked in Stephen Sondheim musicals on stage', 'collaboration', 'very_broad', 'Several actors have Sondheim roles'),
-- Level 2: Broad (6 clues)
('Jonathan Groff', 'Broadway Actor', 2, 'Originated a male lead character in a rock musical about teenage sexuality and rebellion', 'role', 'broad', 'Spring Awakening''s themes and music style'),
('Jonathan Groff', 'Broadway Actor', 2, 'Provided the voice of a reindeer in Disney''s Frozen animated films', 'crossover', 'broad', 'Kristoff character specificity'),
('Jonathan Groff', 'Broadway Actor', 2, 'Appeared in a Netflix series about FBI profilers during serial killer investigations', 'role', 'broad', 'Mindhunter premise'),
('Jonathan Groff', 'Broadway Actor', 2, 'Originated a Sondheim character in a musical about friendship and Broadway failure', 'role', 'broad', 'Merrily We Roll Along themes'),
('Jonathan Groff', 'Broadway Actor', 2, 'Known for portraying complex, emotionally troubled characters', 'career', 'broad', 'His signature character types'),
('Jonathan Groff', 'Broadway Actor', 2, 'Performed memorable villainous or antagonistic song numbers in musicals', 'career', 'broad', 'King George III''s comedic role'),
-- Level 3: Narrowing (6 clues)
('Jonathan Groff', 'Broadway Actor', 3, 'Won a Tony Award for originating Melchior in the 2006 Spring Awakening production', 'award', 'narrowing', 'Specific year and role'),
('Jonathan Groff', 'Broadway Actor', 3, 'Originated King George III in Hamilton and performed the song "You''ll Be Back"', 'role', 'narrowing', 'Specific character and song'),
('Jonathan Groff', 'Broadway Actor', 3, 'Voiced Kristoff alongside Idina Menzel''s Elsa in the Frozen franchise', 'crossover', 'narrowing', 'Specific co-star in Disney films'),
('Jonathan Groff', 'Broadway Actor', 3, 'Originated Bobby Charton in the 2023 Sondheim revival that reunited the original cast', 'role', 'narrowing', 'Specific production year and Sondheim detail'),
('Jonathan Groff', 'Broadway Actor', 3, 'Played FBI profiler Holden Ford in Netflix''s Mindhunter series', 'role', 'narrowing', 'Specific character name and show'),
('Jonathan Groff', 'Broadway Actor', 3, 'Known for his dramatic baritone voice in comedic and tragic roles', 'career', 'narrowing', 'Distinctive vocal quality'),
-- Level 4: Recognition (6 clues)
('Jonathan Groff', 'Broadway Actor', 4, 'Won the Tony Award for Best Actor in a Musical for Spring Awakening in 2006', 'award', 'recognition', 'Specific award, category, and year'),
('Jonathan Groff', 'Broadway Actor', 4, 'Originated Melchior Gabor, singing "Mama Who Bore Me" in Spring Awakening', 'role', 'recognition', 'Specific character and iconic song'),
('Jonathan Groff', 'Broadway Actor', 4, 'Played King George III who sings "You''ll Be Back" in Hamilton', 'role', 'recognition', 'Specific character and signature song'),
('Jonathan Groff', 'Broadway Actor', 4, 'Voiced Kristoff the ice harvester in Disney''s Frozen films', 'role', 'recognition', 'Character name and film franchise'),
('Jonathan Groff', 'Broadway Actor', 4, 'Played FBI profiler Holden Ford in Mindhunter opposite Holt McCallany', 'role', 'recognition', 'Character name and co-star'),
('Jonathan Groff', 'Broadway Actor', 4, 'Known for his ability to switch between comedic and deeply emotional performances', 'career', 'recognition', 'His range and versatility'),
-- Level 5: Giveaway (4 clues)
('Jonathan Groff', 'Broadway Actor', 5, 'Tony Award winner who originated Melchior in Spring Awakening and King George III in Hamilton', 'award', 'giveaway', 'Two of his most iconic roles'),
('Jonathan Groff', 'Broadway Actor', 5, 'The actor who sings "You''ll Be Back" as King George III in Hamilton', 'role', 'giveaway', 'His most recognizable Hamilton song'),
('Jonathan Groff', 'Broadway Actor', 5, 'Voice of Kristoff in Frozen and originator of Melchior in Spring Awakening', 'career', 'giveaway', 'Multiple iconic roles across mediums'),
('Jonathan Groff', 'Broadway Actor', 5, 'Broadway star known for Spring Awakening, Hamilton, Mindhunter, and voicing Kristoff in Frozen', 'career', 'giveaway', 'All major roles combined'),

-- ============================================================
-- DAVEED DIGGS (35 clues)
-- ============================================================
('Daveed Diggs', 'Broadway Actor', 0, 'Originated the dual roles of Lafayette and Thomas Jefferson in the musical Hamilton', 'role', 'fact', 'Won Tony Award for Featured Actor'),
('Daveed Diggs', 'Broadway Actor', 0, 'Member of the experimental hip-hop group Clipping, which he founded', 'collaboration', 'fact', 'Multi-disciplinary musical career'),
('Daveed Diggs', 'Broadway Actor', 0, 'Appeared in the television series Snowpiercer based on the film', 'role', 'fact', 'Dystopian science fiction series'),
('Daveed Diggs', 'Broadway Actor', 0, 'Originated and appeared in the film Blindspotting, a project he co-created and acted in', 'role', 'fact', 'Oakland-based drama film and series'),
('Daveed Diggs', 'Broadway Actor', 0, 'Attended Brown University, an Ivy League institution', 'personal', 'fact', 'Educational background'),
('Daveed Diggs', 'Broadway Actor', 0, 'Voiced Sebastian the crab in the live-action adaptation of The Little Mermaid', 'crossover', 'fact', '2023 Disney film'),
('Daveed Diggs', 'Broadway Actor', 0, 'Pioneer of blending hip-hop and theater in ways that were previously rare on Broadway', 'career', 'fact', 'Genre-crossing innovator'),
-- Level 1: Very Broad (6 clues)
('Daveed Diggs', 'Broadway Actor', 1, 'Has appeared in both stage and film/television productions', 'career', 'very_broad', 'Standard multi-medium career'),
('Daveed Diggs', 'Broadway Actor', 1, 'Won a Tony Award for a supporting role in a contemporary Broadway musical', 'award', 'very_broad', 'Several actors have this achievement'),
('Daveed Diggs', 'Broadway Actor', 1, 'Known for combining theater with hip-hop and rap music', 'career', 'very_broad', 'Genre fusion by several contemporary artists'),
('Daveed Diggs', 'Broadway Actor', 1, 'Appeared in a television series based on a dystopian science fiction film', 'role', 'very_broad', 'Several actors work in prestige streaming'),
('Daveed Diggs', 'Broadway Actor', 1, 'Attended an Ivy League university', 'personal', 'very_broad', 'Several performers went to prestigious colleges'),
('Daveed Diggs', 'Broadway Actor', 1, 'Voiced a character in a major Disney film adaptation', 'crossover', 'very_broad', 'Many Broadway actors provide voice work'),
-- Level 2: Broad (6 clues)
('Daveed Diggs', 'Broadway Actor', 2, 'Originated dual roles as American founding fathers in a hip-hop infused musical', 'role', 'broad', 'Hamilton''s genre and historical focus'),
('Daveed Diggs', 'Broadway Actor', 2, 'Member of an experimental hip-hop group that blends multiple musical genres', 'collaboration', 'broad', 'Clipping''s musical style'),
('Daveed Diggs', 'Broadway Actor', 2, 'Appeared in the Snowpiercer television adaptation with similar dystopian themes', 'role', 'broad', 'Post-apocalyptic setting specificity'),
('Daveed Diggs', 'Broadway Actor', 2, 'Co-wrote and starred in a film about Oakland, California street culture and violence', 'role', 'broad', 'Blindspotting origin story'),
('Daveed Diggs', 'Broadway Actor', 2, 'Brown University graduate who pursued a career in performing arts', 'personal', 'broad', 'Educational path to Broadway'),
('Daveed Diggs', 'Broadway Actor', 2, 'Known for rapid-fire rap delivery and technical hip-hop wordplay in theater', 'career', 'broad', 'His signature performance style'),
-- Level 3: Narrowing (6 clues)
('Daveed Diggs', 'Broadway Actor', 3, 'Won a Tony Award for Featured Actor for playing Lafayette and Jefferson in Hamilton', 'award', 'narrowing', 'Specific award category and roles'),
('Daveed Diggs', 'Broadway Actor', 3, 'Originated Lafayette/Jefferson opposite Lin-Manuel Miranda''s Hamilton at the Public Theater', 'role', 'narrowing', 'Specific co-star and venue detail'),
('Daveed Diggs', 'Broadway Actor', 3, 'Member of Clipping, a group that won a Grammy for experimental hip-hop', 'collaboration', 'narrowing', 'Specific music award'),
('Daveed Diggs', 'Broadway Actor', 3, 'Appeared as Andre Layton in Snowpiercer, the television adaptation of the film', 'role', 'narrowing', 'Specific character name and show'),
('Daveed Diggs', 'Broadway Actor', 3, 'Voiced Sebastian in the 2023 live-action remake of The Little Mermaid', 'crossover', 'narrowing', 'Character name and film year'),
('Daveed Diggs', 'Broadway Actor', 3, 'Known for his distinctive rapid-fire delivery style in both rap and sung numbers', 'career', 'narrowing', 'Performance trademark'),
-- Level 4: Recognition (6 clues)
('Daveed Diggs', 'Broadway Actor', 4, 'Won the Tony Award for Featured Actor in a Musical for Hamilton in 2016', 'award', 'recognition', 'Specific award, category, and year'),
('Daveed Diggs', 'Broadway Actor', 4, 'Originated the roles of Lafayette and Thomas Jefferson in the 2015 Hamilton premiere', 'role', 'recognition', 'Specific characters and production year'),
('Daveed Diggs', 'Broadway Actor', 4, 'Performed rapid-fire rap sections as both Lafayette and Jefferson in Hamilton', 'role', 'recognition', 'Character specialization'),
('Daveed Diggs', 'Broadway Actor', 4, 'Starred opposite John Boyega in the Snowpiercer television series', 'role', 'recognition', 'Co-star identification'),
('Daveed Diggs', 'Broadway Actor', 4, 'Co-wrote Blindspotting with Rafael Casal, playing Collin, the lead character', 'role', 'recognition', 'Film co-writer and character'),
('Daveed Diggs', 'Broadway Actor', 4, 'Founder of Clipping, an experimental hip-hop group known for avant-garde productions', 'collaboration', 'recognition', 'Group leadership'),
-- Level 5: Giveaway (4 clues)
('Daveed Diggs', 'Broadway Actor', 5, 'Tony Award-winning actor who originated Lafayette and Thomas Jefferson in Hamilton', 'award', 'giveaway', 'His breakthrough and most famous role'),
('Daveed Diggs', 'Broadway Actor', 5, 'The performer who rapid-fires through "Yorktown (The World Turned Upside Down)" as Lafayette in Hamilton', 'role', 'giveaway', 'Most iconic song moment'),
('Daveed Diggs', 'Broadway Actor', 5, 'Hip-hop theater pioneer known for Clipping, Hamilton, and co-writing Blindspotting', 'career', 'giveaway', 'All major career elements'),
('Daveed Diggs', 'Broadway Actor', 5, 'Broadway star and rapper/producer who originated Lafayette/Jefferson in Hamilton and voiced Sebastian in The Little Mermaid remake', 'career', 'giveaway', 'Multiple iconic roles combined'),

-- ============================================================
-- BRIAN STOKES MITCHELL (35 clues)
-- ============================================================
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Won the Tony Award for playing Don Quixote in the 2000 Broadway revival of Man of La Mancha', 'award', 'fact', 'Iconic role in classic musical'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Known as "The Last Leading Man" due to his classical leading man roles', 'personal', 'fact', 'Theatrical nickname'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Originated a major role in the musical Ragtime', 'role', 'fact', 'Played Coalhouse Walker Jr.'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Appeared in the musical Kiss Me, Kate, a revival of a Cole Porter classic', 'role', 'fact', 'Opposite Ashley Brown'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Currently serves as Chairman of The Actors Fund', 'career', 'fact', 'Philanthropic theater organization leadership'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Known for his rich, powerful baritone voice', 'career', 'fact', 'Distinctive vocal quality'),
('Brian Stokes Mitchell', 'Broadway Actor', 0, 'Had an early television career in medical drama series', 'role', 'fact', 'Appeared in Trapper John, M.D.'),
-- Level 1: Very Broad (6 clues)
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Has appeared in multiple classic Broadway musicals over several decades', 'career', 'very_broad', 'Long traditional musical theater career'),
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Won a Tony Award for a leading role in a classic musical revival', 'award', 'very_broad', 'Several actors have won for revivals'),
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Known for baritone vocal range and classical musical theater approach', 'career', 'very_broad', 'Trait common among musical leads'),
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Appeared in television dramas as well as Broadway musicals', 'career', 'very_broad', 'Standard multi-medium career path'),
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Served in leadership positions within theater organizations', 'career', 'very_broad', 'Several performers advocate for theater'),
('Brian Stokes Mitchell', 'Broadway Actor', 1, 'Originated roles in contemporary musicals as well as classic revivals', 'role', 'very_broad', 'Versatile repertoire'),
-- Level 2: Broad (6 clues)
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Won a Tony Award for playing the protagonist in a musical adaptation of a Cervantes novel', 'award', 'broad', 'Man of La Mancha specific source material'),
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Originated the lead role of Coalhouse Walker Jr. in a musical about American social conflict', 'role', 'broad', 'Ragtime''s historical setting'),
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Known for his classical approach to musical theater roles with romantic and dramatic depth', 'career', 'broad', 'His signature style'),
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Appeared in a Cole Porter musical revival featuring a famous taming subplot', 'role', 'broad', 'Kiss Me, Kate premise'),
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Appeared as a regular cast member in a television medical drama from the 1980s', 'role', 'broad', 'Trapper John, M.D. era'),
('Brian Stokes Mitchell', 'Broadway Actor', 2, 'Known for his powerful baritone voice that carries the weight of lead roles', 'career', 'broad', 'Vocal strength and type'),
-- Level 3: Narrowing (6 clues)
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Won a Tony Award for Don Quixote in the 2000 Man of La Mancha revival at the Martin Beck Theatre', 'award', 'narrowing', 'Specific year and venue detail'),
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Originated Coalhouse Walker Jr., who sings about racial injustice in the musical Ragtime', 'role', 'narrowing', 'Specific character and song theme'),
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Known professionally as "The Last Leading Man" due to his classical romantic leads', 'personal', 'narrowing', 'His distinctive professional nickname'),
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Appeared opposite Ashley Brown in a Cole Porter musical at the Roundabout Theatre', 'role', 'narrowing', 'Specific co-star and venue'),
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Appeared in the original Broadway cast of Ragtime, which opened in 1998', 'role', 'narrowing', 'Specific production year'),
('Brian Stokes Mitchell', 'Broadway Actor', 3, 'Serves as Chairman of The Actors Fund, a major theatrical support organization', 'career', 'narrowing', 'Leadership position specificity'),
-- Level 4: Recognition (6 clues)
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Won the Tony Award for Best Actor in a Musical for Man of La Mancha in 2000', 'award', 'recognition', 'Specific award, category, and year'),
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Originated Don Quixote, singing "The Impossible Dream" in Man of La Mancha', 'role', 'recognition', 'Character name and signature song'),
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Played Coalhouse Walker Jr. in the original Broadway cast of Ragtime', 'role', 'recognition', 'Specific character and musical'),
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Appeared opposite Ashley Brown in Kiss Me, Kate at the Roundabout Theatre', 'role', 'recognition', 'Co-star and venue identification'),
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Known for his exceptional vocal technique and romantic leading man presence', 'career', 'recognition', 'His performance signature'),
('Brian Stokes Mitchell', 'Broadway Actor', 4, 'Early television career included roles in Trapper John, M.D. and other dramas', 'role', 'recognition', 'Specific TV show'),
-- Level 5: Giveaway (4 clues)
('Brian Stokes Mitchell', 'Broadway Actor', 5, 'Tony Award winner known as "The Last Leading Man" who originated Don Quixote in Man of La Mancha', 'award', 'giveaway', 'Award and distinctive nickname combined'),
('Brian Stokes Mitchell', 'Broadway Actor', 5, 'The actor who sang "The Impossible Dream" as Don Quixote in the 2000 Man of La Mancha revival', 'role', 'giveaway', 'Iconic song and role'),
('Brian Stokes Mitchell', 'Broadway Actor', 5, 'Tony Award-winning "Last Leading Man" in Man of La Mancha and Ragtime', 'award', 'giveaway', 'Signature roles and nickname'),
('Brian Stokes Mitchell', 'Broadway Actor', 5, 'Broadway''s classical leading man and Chairman of The Actors Fund', 'career', 'giveaway', 'Career and leadership combined'),

-- ============================================================
-- RAUL ESPARZA (35 clues)
-- ============================================================
('Raul Esparza', 'Broadway Actor', 0, 'Originated the role of Robert in the 2006 revival of Stephen Sondheim''s Company', 'role', 'fact', 'Major Sondheim musical'),
('Raul Esparza', 'Broadway Actor', 0, 'Appeared as ADA Rafael Barba in the television series Law & Order: SVU', 'role', 'fact', 'Long-running crime drama series'),
('Raul Esparza', 'Broadway Actor', 0, 'Originated the lead role in the musical Leap of Faith', 'role', 'fact', 'Jeanine Tesori musical'),
('Raul Esparza', 'Broadway Actor', 0, 'Appeared in Chitty Chitty Bang Bang as the title character', 'role', 'fact', 'Broadway musical adaptation'),
('Raul Esparza', 'Broadway Actor', 0, 'Appeared in the musical Taboo, which featured provocative themes', 'role', 'fact', 'Produced by Boy George'),
('Raul Esparza', 'Broadway Actor', 0, 'Known for his Sondheim interpretations and dramatic performances', 'career', 'fact', 'Signature musical style and approach'),
('Raul Esparza', 'Broadway Actor', 0, 'Has received multiple Tony Award nominations without winning', 'award', 'fact', '4 nominations, 0 wins'),
-- Level 1: Very Broad (6 clues)
('Raul Esparza', 'Broadway Actor', 1, 'Has appeared in multiple Broadway musicals across different eras', 'career', 'very_broad', 'Long musical theater career'),
('Raul Esparza', 'Broadway Actor', 1, 'Known for Stephen Sondheim interpretations on stage', 'career', 'very_broad', 'Several actors specialize in Sondheim'),
('Raul Esparza', 'Broadway Actor', 1, 'Appeared in both Broadway and television dramas', 'career', 'very_broad', 'Standard multi-medium career'),
('Raul Esparza', 'Broadway Actor', 1, 'Received multiple Tony Award nominations for performances', 'award', 'very_broad', 'Several actors have multiple nominations'),
('Raul Esparza', 'Broadway Actor', 1, 'Known for dramatic vocal delivery and emotional depth', 'career', 'very_broad', 'Common trait among musical theater stars'),
('Raul Esparza', 'Broadway Actor', 1, 'Appeared in musicals with both contemporary and classic music styles', 'career', 'very_broad', 'Versatile performer across genres'),
-- Level 2: Broad (6 clues)
('Raul Esparza', 'Broadway Actor', 2, 'Originated the male lead in a Stephen Sondheim musical revival', 'role', 'broad', 'Company ''06 specificity'),
('Raul Esparza', 'Broadway Actor', 2, 'Played a prosecutor in a long-running television law drama', 'role', 'broad', 'Law & Order: SVU legal setting'),
('Raul Esparza', 'Broadway Actor', 2, 'Originated a role in a musical about a faith healer and false miracle', 'role', 'broad', 'Leap of Faith plot'),
('Raul Esparza', 'Broadway Actor', 2, 'Known for his interpretations of complex Sondheim characters and songs', 'career', 'broad', 'Sondheim specialist'),
('Raul Esparza', 'Broadway Actor', 2, 'Appeared in multiple collaborations with provocative or unconventional material', 'role', 'broad', 'Taboo and experimental work'),
('Raul Esparza', 'Broadway Actor', 2, 'Received four Tony Award nominations throughout his Broadway career', 'award', 'broad', 'Specific nomination count'),
-- Level 3: Narrowing (6 clues)
('Raul Esparza', 'Broadway Actor', 3, 'Originated Robert in the 2006 Company revival opposite Kristin Chenoweth', 'role', 'narrowing', 'Specific co-star and year'),
('Raul Esparza', 'Broadway Actor', 3, 'Played Robert singing "Being Alive," the famous Sondheim showstopper', 'role', 'narrowing', 'Specific song showcase'),
('Raul Esparza', 'Broadway Actor', 3, 'Portrayed ADA Rafael Barba for multiple seasons in Law & Order: SVU', 'role', 'narrowing', 'Character name and show'),
('Raul Esparza', 'Broadway Actor', 3, 'Originated the title role in Leap of Faith, a musical about a con man preacher', 'role', 'narrowing', 'Character type and musical specificity'),
('Raul Esparza', 'Broadway Actor', 3, 'Appeared in Taboo, produced by Boy George, exploring gender and sexuality themes', 'role', 'narrowing', 'Producer and content specificity'),
('Raul Esparza', 'Broadway Actor', 3, 'Known for his dramatic interpretations of Sondheim''s complex, sophisticated lyrics', 'career', 'narrowing', 'His musical theater specialty'),
-- Level 4: Recognition (6 clues)
('Raul Esparza', 'Broadway Actor', 4, 'Originated Robert in the 2006 revival of Company and received a Tony nomination', 'award', 'recognition', 'Specific role, year, and award'),
('Raul Esparza', 'Broadway Actor', 4, 'Sang "Being Alive" as the act-two closer in Company', 'role', 'recognition', 'Specific song placement'),
('Raul Esparza', 'Broadway Actor', 4, 'Played Rafael Barba, the recurring prosecutor in Law & Order: SVU', 'role', 'recognition', 'Character name and show'),
('Raul Esparza', 'Broadway Actor', 4, 'Originated the lead in Leap of Faith, a musical about a traveling evangelist', 'role', 'recognition', 'Character type and musical'),
('Raul Esparza', 'Broadway Actor', 4, 'Known for his sophisticated interpretations of Sondheim''s complex character songs', 'career', 'recognition', 'His signature performance style'),
('Raul Esparza', 'Broadway Actor', 4, 'Nominated for four Tony Awards for his Broadway performances', 'award', 'recognition', 'Specific nomination count'),
-- Level 5: Giveaway (4 clues)
('Raul Esparza', 'Broadway Actor', 5, 'Originated Robert in the 2006 revival of Company and starred as ADA Barba in Law & Order: SVU', 'career', 'giveaway', 'Two major roles combined'),
('Raul Esparza', 'Broadway Actor', 5, 'The Sondheim specialist who originated Robert singing "Being Alive" in Company', 'role', 'giveaway', 'Character and iconic song'),
('Raul Esparza', 'Broadway Actor', 5, 'Broadway actor and Law & Order: SVU star known for Sondheim interpretations', 'career', 'giveaway', 'Multiple career identifiers'),
('Raul Esparza', 'Broadway Actor', 5, 'Four-time Tony-nominated performer best known for Company and Law & Order: SVU', 'award', 'giveaway', 'Award count and major roles'),

-- ============================================================
-- NORBERT LEO BUTZ (35 clues)
-- ============================================================
('Norbert Leo Butz', 'Broadway Actor', 0, 'Won the Tony Award for Best Actor in a Musical for Dirty Rotten Scoundrels in 2005', 'award', 'fact', 'Comic musical role'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Won a second Tony Award for Catch Me If You Can', 'award', 'fact', '2011 musical about con artist'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Originated the character of Fiyero in Wicked, the Wizard of Oz prequel', 'role', 'fact', 'Original Broadway cast member'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Originated Jamie in The Last Five Years, a musical by Jason Robert Brown', 'role', 'fact', 'Innovative musical structure'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Appeared in the musical Big Fish', 'role', 'fact', 'Musical adaptation of film'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Appeared in My Fair Lady revival on Broadway', 'role', 'fact', 'Rodgers and Hammerstein revival'),
('Norbert Leo Butz', 'Broadway Actor', 0, 'Holds an MFA from the Alabama Shakespeare Festival', 'personal', 'fact', 'Theater training background'),
-- Level 1: Very Broad (6 clues)
('Norbert Leo Butz', 'Broadway Actor', 1, 'Has won multiple Tony Awards for leading roles', 'award', 'very_broad', 'Several multi-Tony winners exist'),
('Norbert Leo Butz', 'Broadway Actor', 1, 'Appeared in multiple Broadway musicals across different eras', 'career', 'very_broad', 'Standard long musical theater career'),
('Norbert Leo Butz', 'Broadway Actor', 1, 'Known for both comedic and dramatic musical roles', 'career', 'very_broad', 'Versatile performer range'),
('Norbert Leo Butz', 'Broadway Actor', 1, 'Trained at a prestigious regional theater institution', 'personal', 'very_broad', 'Several actors studied at similar places'),
('Norbert Leo Butz', 'Broadway Actor', 1, 'Originated a major character in a contemporary musical adaptation', 'role', 'very_broad', 'Common practice for new musicals'),
('Norbert Leo Butz', 'Broadway Actor', 1, 'Appeared in both comic and serious musicals throughout his career', 'career', 'very_broad', 'Demonstrates versatility'),
-- Level 2: Broad (6 clues)
('Norbert Leo Butz', 'Broadway Actor', 2, 'Won Tony Awards for two different musicals about charming con artists', 'award', 'broad', 'Scoundrels and Catch Me If You Can themes'),
('Norbert Leo Butz', 'Broadway Actor', 2, 'Originated Fiyero opposite Kristin Chenoweth''s Elphaba in Wicked', 'role', 'broad', 'Major Wicked cast member'),
('Norbert Leo Butz', 'Broadway Actor', 2, 'Originated Jamie in a musical that is performed chronologically and backwards', 'role', 'broad', 'The Last Five Years structure'),
('Norbert Leo Butz', 'Broadway Actor', 2, 'Known for his athletic movement and comedic timing in musical roles', 'career', 'broad', 'Performance characteristics'),
('Norbert Leo Butz', 'Broadway Actor', 2, 'Appeared in a musical adaptation of a Tim Burton-inspired film', 'role', 'broad', 'Big Fish has Burton elements'),
('Norbert Leo Butz', 'Broadway Actor', 2, 'MFA graduate of the Alabama Shakespeare Festival training program', 'personal', 'broad', 'Specific educational institution'),
-- Level 3: Narrowing (6 clues)
('Norbert Leo Butz', 'Broadway Actor', 3, 'Won the Tony Award for Best Actor in a Musical for Dirty Rotten Scoundrels in 2005', 'award', 'narrowing', 'Specific award and year'),
('Norbert Leo Butz', 'Broadway Actor', 3, 'Originated Fiyero in the original Broadway cast of Wicked', 'role', 'narrowing', 'Original cast specificity'),
('Norbert Leo Butz', 'Broadway Actor', 3, 'Originated Jamie Wellerstein, a composer, in The Last Five Years', 'role', 'narrowing', 'Character name and profession'),
('Norbert Leo Butz', 'Broadway Actor', 3, 'Won a Tony Award for playing Frank Abagnale Jr., the con artist, in Catch Me If You Can', 'award', 'narrowing', 'Specific character and award'),
('Norbert Leo Butz', 'Broadway Actor', 3, 'Appeared as Fiyero opposite Idina Menzel''s Elphaba in Wicked', 'role', 'narrowing', 'Specific co-star in original cast'),
('Norbert Leo Butz', 'Broadway Actor', 3, 'Known for his charismatic, charming leading man qualities in musicals', 'career', 'narrowing', 'His signature character type'),
-- Level 4: Recognition (6 clues)
('Norbert Leo Butz', 'Broadway Actor', 4, 'Two-time Tony Award winner for Dirty Rotten Scoundrels and Catch Me If You Can', 'award', 'recognition', 'Specific Tony-winning shows'),
('Norbert Leo Butz', 'Broadway Actor', 4, 'Originated Fiyero, who sings "Dancing Through Life" in Wicked', 'role', 'recognition', 'Character and signature song'),
('Norbert Leo Butz', 'Broadway Actor', 4, 'Originated Frank Abagnale Jr. in Catch Me If You Can', 'role', 'recognition', 'Character name and musical'),
('Norbert Leo Butz', 'Broadway Actor', 4, 'Originated Jamie in The Last Five Years alongside Mary Jane Pinckney', 'role', 'recognition', 'Character and co-star identification'),
('Norbert Leo Butz', 'Broadway Actor', 4, 'Known for his ability to play charming, charismatic characters with depth', 'career', 'recognition', 'His performance signature'),
('Norbert Leo Butz', 'Broadway Actor', 4, 'Trained at the Alabama Shakespeare Festival, a prestigious regional theater', 'personal', 'recognition', 'Educational institution'),
-- Level 5: Giveaway (4 clues)
('Norbert Leo Butz', 'Broadway Actor', 5, 'Two-time Tony Award winner who originated Fiyero in Wicked and won for Dirty Rotten Scoundrels', 'award', 'giveaway', 'Two Tony wins and major roles'),
('Norbert Leo Butz', 'Broadway Actor', 5, 'The actor who originated Fiyero singing "Dancing Through Life" in Wicked', 'role', 'giveaway', 'Character and iconic song'),
('Norbert Leo Butz', 'Broadway Actor', 5, 'Two-time Tony winner best known for Wicked, Dirty Rotten Scoundrels, and Catch Me If You Can', 'award', 'giveaway', 'Both awards and major roles'),
('Norbert Leo Butz', 'Broadway Actor', 5, 'Tony Award-winning actor famous for playing charming con men and romantic leads', 'career', 'giveaway', 'Career specialty and signature roles'),

-- ============================================================
-- ALEX BRIGHTMAN (35 clues)
-- ============================================================
('Alex Brightman', 'Broadway Actor', 0, 'Originated the title role of Beetlejuice in the 2019 Broadway musical', 'role', 'fact', 'Tim Burton''s character adaptation'),
('Alex Brightman', 'Broadway Actor', 0, 'Originated Dewey Finn in School of Rock, based on the Jack Black film', 'role', 'fact', '2015 musical adaptation'),
('Alex Brightman', 'Broadway Actor', 0, 'Only actor to originate both Beetlejuice and Dewey Finn roles', 'career', 'fact', 'Unique achievement in Broadway history'),
('Alex Brightman', 'Broadway Actor', 0, 'Known for extreme physical comedy and contortionist-like flexibility', 'career', 'fact', 'Signature physical performance style'),
('Alex Brightman', 'Broadway Actor', 0, 'Nominated for a Tony Award for his performance in Beetlejuice', 'award', 'fact', 'Broadway recognition'),
('Alex Brightman', 'Broadway Actor', 0, 'Known for wide vocal range and comedic singing delivery', 'career', 'fact', 'Vocal and comedic qualities'),
('Alex Brightman', 'Broadway Actor', 0, 'Defined the comedic, high-energy Deadliest Catch energy of Beetlejuice on stage', 'role', 'fact', 'Character interpretation'),
-- Level 1: Very Broad (6 clues)
('Alex Brightman', 'Broadway Actor', 1, 'Has originated lead roles in multiple Broadway musicals', 'career', 'very_broad', 'Standard for originating actors'),
('Alex Brightman', 'Broadway Actor', 1, 'Known for comedic performance in contemporary musicals', 'career', 'very_broad', 'Several actors specialize in comedy'),
('Alex Brightman', 'Broadway Actor', 1, 'Received a Tony Award nomination for a Broadway role', 'award', 'very_broad', 'Several actors have nominations'),
('Alex Brightman', 'Broadway Actor', 1, 'Appeared in musicals based on popular films', 'role', 'very_broad', 'Common practice on Broadway'),
('Alex Brightman', 'Broadway Actor', 1, 'Known for physical comedy and acrobatic movement', 'career', 'very_broad', 'Trait of several comedic performers'),
('Alex Brightman', 'Broadway Actor', 1, 'Originated roles in musicals with supernatural or fantastical themes', 'role', 'very_broad', 'Genre theme in contemporary musicals'),
-- Level 2: Broad (6 clues)
('Alex Brightman', 'Broadway Actor', 2, 'Originated a comedic lead role in a musical adaptation of a Tim Burton-adjacent film', 'role', 'broad', 'Beetlejuice''s filmmaker connection'),
('Alex Brightman', 'Broadway Actor', 2, 'Originated Dewey Finn in a school-based musical about rock and roll education', 'role', 'broad', 'School of Rock premise'),
('Alex Brightman', 'Broadway Actor', 2, 'Known for contortionist-like flexibility and extreme physical comedy', 'career', 'broad', 'Distinctive performance trademark'),
('Alex Brightman', 'Broadway Actor', 2, 'Originated a comedic supernatural character in a 2019 Broadway musical', 'role', 'broad', 'Beetlejuice''s ghost and Tim Burton themes'),
('Alex Brightman', 'Broadway Actor', 2, 'Famous for being the first and only actor to originate two major Broadway titles', 'career', 'broad', 'Unique achievement'),
('Alex Brightman', 'Broadway Actor', 2, 'Known for high-energy, unhinged comedic characterizations', 'career', 'broad', 'His signature comedy style'),
-- Level 3: Narrowing (6 clues)
('Alex Brightman', 'Broadway Actor', 3, 'Originated Beetlejuice opposite Kerry Butler in the 2019 Broadway production', 'role', 'narrowing', 'Specific co-star and year'),
('Alex Brightman', 'Broadway Actor', 3, 'Originated Dewey Finn in School of Rock, the musical based on the Jack Black film', 'role', 'narrowing', 'Specific film connection'),
('Alex Brightman', 'Broadway Actor', 3, 'Nominated for a Tony Award for his comedic performance in Beetlejuice', 'award', 'narrowing', 'Specific nomination for role'),
('Alex Brightman', 'Broadway Actor', 3, 'Known for playing comedic supernatural characters with extreme physicality', 'career', 'narrowing', 'Character type and performance style'),
('Alex Brightman', 'Broadway Actor', 3, 'Only Broadway actor to originate the roles of both Beetlejuice and Dewey Finn', 'career', 'narrowing', 'Singular achievement in theater'),
('Alex Brightman', 'Broadway Actor', 3, 'Known for high-energy, unhinged comedic performance style in exuberant characters', 'career', 'narrowing', 'Distinctive performance approach'),
-- Level 4: Recognition (6 clues)
('Alex Brightman', 'Broadway Actor', 4, 'Originated Beetlejuice in the 2019 Broadway musical and received a Tony nomination', 'award', 'recognition', 'Specific role, year, and award'),
('Alex Brightman', 'Broadway Actor', 4, 'Originated Dewey Finn opposite Meryl Streep in School of Rock', 'role', 'recognition', 'Specific co-star identification'),
('Alex Brightman', 'Broadway Actor', 4, 'Known for his extreme physical contortionism and comedic flexibility', 'career', 'recognition', 'Physical performance trademark'),
('Alex Brightman', 'Broadway Actor', 4, 'Originated the mischievous ghost character in the Tim Burton-inspired Beetlejuice musical', 'role', 'recognition', 'Character type and film connection'),
('Alex Brightman', 'Broadway Actor', 4, 'The only actor to have originated both Beetlejuice and Dewey Finn on Broadway', 'career', 'recognition', 'Unique achievement'),
('Alex Brightman', 'Broadway Actor', 4, 'Known for his elastic, contortionist-like movement in comedic roles', 'career', 'recognition', 'Physical comedy signature'),
-- Level 5: Giveaway (4 clues)
('Alex Brightman', 'Broadway Actor', 5, 'Only actor to originate both Beetlejuice and Dewey Finn in Broadway musicals', 'career', 'giveaway', 'Singular unique achievement'),
('Alex Brightman', 'Broadway Actor', 5, 'The actor who originated Beetlejuice in the 2019 Broadway musical of that name', 'role', 'giveaway', 'Specific role identification'),
('Alex Brightman', 'Broadway Actor', 5, 'Tony-nominated comedian known for originating Beetlejuice and Dewey Finn', 'award', 'giveaway', 'Both major roles and recognition'),
('Alex Brightman', 'Broadway Actor', 5, 'Broadway''s physical comedy genius who originated both Beetlejuice and School of Rock''s Dewey Finn', 'career', 'giveaway', 'Signature skills and both roles'),

-- ============================================================
-- AARON TVEIT (35 clues)
-- ============================================================
('Aaron Tveit', 'Broadway Actor', 0, 'Originated Gabe, a character representing death and loss, in Next to Normal', 'role', 'fact', '2009 musical about family dysfunction'),
('Aaron Tveit', 'Broadway Actor', 0, 'Won the Tony Award for Lead Actor in a Musical for Moulin Rouge! in 2020', 'award', 'fact', 'Sole nominee in that category that year'),
('Aaron Tveit', 'Broadway Actor', 0, 'Originated the role of Frank Abagnale Jr. in Catch Me If You Can', 'role', 'fact', 'Con artist biographical musical'),
('Aaron Tveit', 'Broadway Actor', 0, 'Played Danny Zuko in the television special Grease: Live', 'role', 'fact', 'Live television musical broadcast'),
('Aaron Tveit', 'Broadway Actor', 0, 'Played Enjolras in the Les Misérables film adaptation', 'role', 'fact', '2012 film musical'),
('Aaron Tveit', 'Broadway Actor', 0, 'Appeared as Winn Schott in the television series Supergirl', 'role', 'fact', 'DC Comics television show'),
('Aaron Tveit', 'Broadway Actor', 0, 'Known for his powerful belt voice and leading man presence', 'career', 'fact', 'Distinctive vocal and performance qualities'),
-- Level 1: Very Broad (6 clues)
('Aaron Tveit', 'Broadway Actor', 1, 'Has appeared in multiple Broadway musicals across different eras', 'career', 'very_broad', 'Standard long musical theater career'),
('Aaron Tveit', 'Broadway Actor', 1, 'Won a major Broadway award for a contemporary musical role', 'award', 'very_broad', 'Several actors win major awards'),
('Aaron Tveit', 'Broadway Actor', 1, 'Appeared in film adaptations of stage musicals', 'role', 'very_broad', 'Common crossover for stage actors'),
('Aaron Tveit', 'Broadway Actor', 1, 'Known for strong vocal power and romantic leading man roles', 'career', 'very_broad', 'Common trait among musical leads'),
('Aaron Tveit', 'Broadway Actor', 1, 'Appeared in both stage and television productions', 'career', 'very_broad', 'Standard multi-medium career'),
('Aaron Tveit', 'Broadway Actor', 1, 'Appeared in a television broadcast of a classic musical', 'role', 'very_broad', 'Several actors participate in live TV specials'),
-- Level 2: Broad (6 clues)
('Aaron Tveit', 'Broadway Actor', 2, 'Originated Gabe in a rock musical about suburban family mental health crises', 'role', 'broad', 'Next to Normal''s contemporary themes'),
('Aaron Tveit', 'Broadway Actor', 2, 'Originated Frank Abagnale Jr., a famous con artist, in a musical adaptation', 'role', 'broad', 'Catch Me If You Can premise'),
('Aaron Tveit', 'Broadway Actor', 2, 'Won the Tony Award for a musical revival with elaborate visual design', 'award', 'broad', 'Moulin Rouge! production specificity'),
('Aaron Tveit', 'Broadway Actor', 2, 'Played Enjolras, the revolutionary leader, in a major film adaptation', 'role', 'broad', 'Les Misérables character and medium'),
('Aaron Tveit', 'Broadway Actor', 2, 'Known for his powerful belt voice in both dramatic and comedic musicals', 'career', 'broad', 'Vocal strength and versatility'),
('Aaron Tveit', 'Broadway Actor', 2, 'Appeared as a tech-genius character in a superhero television series', 'role', 'broad', 'Supergirl character type'),
-- Level 3: Narrowing (6 clues)
('Aaron Tveit', 'Broadway Actor', 3, 'Originated Gabe, representing death and loss, in Next to Normal''s 2009 Broadway premiere', 'role', 'narrowing', 'Specific year and character significance'),
('Aaron Tveit', 'Broadway Actor', 3, 'Won the Tony Award for Lead Actor in a Musical for Moulin Rouge! in 2020', 'award', 'narrowing', 'Specific award and year'),
('Aaron Tveit', 'Broadway Actor', 3, 'Originated Frank Abagnale Jr., the con artist who sings about FBI evasion', 'role', 'narrowing', 'Specific character and musical'),
('Aaron Tveit', 'Broadway Actor', 3, 'Played Danny Zuko in Grease: Live, the 2016 television special broadcast', 'role', 'narrowing', 'Specific TV special and year'),
('Aaron Tveit', 'Broadway Actor', 3, 'Played Enjolras, singing "Bring Him Home" and revolutionary songs in Les Misérables film', 'role', 'narrowing', 'Character and film identification'),
('Aaron Tveit', 'Broadway Actor', 3, 'Known for his powerful Broadway presence in romantic and heroic leading roles', 'career', 'narrowing', 'Character type specialty'),
-- Level 4: Recognition (6 clues)
('Aaron Tveit', 'Broadway Actor', 4, 'Won the Tony Award for Best Actor in a Musical for Moulin Rouge! in 2020', 'award', 'recognition', 'Specific award, category, and year'),
('Aaron Tveit', 'Broadway Actor', 4, 'Originated Gabe in Next to Normal and later appeared in Catch Me If You Can', 'role', 'recognition', 'Two significant roles'),
('Aaron Tveit', 'Broadway Actor', 4, 'Played Danny Zuko in the Grease: Live television special broadcast in 2016', 'role', 'recognition', 'Specific TV event and year'),
('Aaron Tveit', 'Broadway Actor', 4, 'Played Enjolras in the 2012 Les Misérables film adaptation', 'role', 'recognition', 'Specific character and film'),
('Aaron Tveit', 'Broadway Actor', 4, 'Appeared as Winn Schott on the Supergirl television series', 'role', 'recognition', 'Character name and show'),
('Aaron Tveit', 'Broadway Actor', 4, 'Known for his powerful belt voice and stage presence in leading roles', 'career', 'recognition', 'Vocal and performance signature'),
-- Level 5: Giveaway (4 clues)
('Aaron Tveit', 'Broadway Actor', 5, 'Tony Award winner known for originating Gabe in Next to Normal and winning for Moulin Rouge!', 'award', 'giveaway', 'Award and both major musicals'),
('Aaron Tveit', 'Broadway Actor', 5, 'The actor who won the Tony Award for Moulin Rouge! as sole nominee in his category', 'award', 'giveaway', 'Unique award circumstance'),
('Aaron Tveit', 'Broadway Actor', 5, 'Broadway star who originated Gabe in Next to Normal, Frank in Catch Me If You Can, and won a Tony for Moulin Rouge!', 'award', 'giveaway', 'Multiple major roles and award'),
('Aaron Tveit', 'Broadway Actor', 5, 'Tony-winning actor known for powerful vocal performances in Next to Normal, Moulin Rouge!, and Les Misérables', 'award', 'giveaway', 'Multiple significant roles combined'),

-- ============================================================
-- JEREMY JORDAN (35 clues)
-- ============================================================
('Jeremy Jordan', 'Broadway Actor', 0, 'Originated Jack Kelly in Newsies, based on the Disney film about newspaper boy strikers', 'role', 'fact', '2012 musical'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Won a Tony Award nomination for his role in Newsies', 'award', 'fact', 'Best Actor in a Musical nomination'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Originated Clyde Barrow opposite Laura Michelle Kelly in Bonnie & Clyde', 'role', 'fact', 'Biographical musical about criminals'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Appeared as Winn Schott in the television series Supergirl', 'role', 'fact', 'DC Comics television show'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Known for his signature powerful belt voice', 'career', 'fact', 'Distinctive vocal quality'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Originated Jack Kelly singing the iconic "Santa Fe" number in Newsies', 'role', 'fact', 'Most famous song from the show'),
('Jeremy Jordan', 'Broadway Actor', 0, 'Appeared in Little Shop of Horrors revival on Broadway', 'role', 'fact', 'Recent musical theater work'),
-- Level 1: Very Broad (6 clues)
('Jeremy Jordan', 'Broadway Actor', 1, 'Has appeared in multiple Broadway musicals across different eras', 'career', 'very_broad', 'Standard long musical theater career'),
('Jeremy Jordan', 'Broadway Actor', 1, 'Received a Tony Award nomination for a Broadway role', 'award', 'very_broad', 'Several actors have nominations'),
('Jeremy Jordan', 'Broadway Actor', 1, 'Known for powerful vocal delivery in leading musical roles', 'career', 'very_broad', 'Common trait among male musical leads'),
('Jeremy Jordan', 'Broadway Actor', 1, 'Appeared in both stage and television productions', 'career', 'very_broad', 'Standard multi-medium career'),
('Jeremy Jordan', 'Broadway Actor', 1, 'Originated roles in contemporary musicals based on film or historical subjects', 'role', 'very_broad', 'Common practice in modern musicals'),
('Jeremy Jordan', 'Broadway Actor', 1, 'Known for athletic, energetic movement in choreographed numbers', 'career', 'very_broad', 'Common for dynamic performers'),
-- Level 2: Broad (6 clues)
('Jeremy Jordan', 'Broadway Actor', 2, 'Originated Jack Kelly in a musical about 1899 New York newspaper boys on strike', 'role', 'broad', 'Newsies historical setting and premise'),
('Jeremy Jordan', 'Broadway Actor', 2, 'Originated Clyde Barrow in a musical about the famous outlaw couple', 'role', 'broad', 'Bonnie & Clyde biographical premise'),
('Jeremy Jordan', 'Broadway Actor', 2, 'Tony-nominated for originating a lead role in a contemporary Broadway musical', 'award', 'broad', 'Newsies nomination specificity'),
('Jeremy Jordan', 'Broadway Actor', 2, 'Known for his powerful, athletic performance style in dance-heavy musicals', 'career', 'broad', 'Performance characteristic'),
('Jeremy Jordan', 'Broadway Actor', 2, 'Appeared in a superhero television series in a supporting role', 'role', 'broad', 'Supergirl character identification'),
('Jeremy Jordan', 'Broadway Actor', 2, 'Performed the iconic song "Santa Fe" in a major Broadway musical', 'role', 'broad', 'Newsies song specificity'),
-- Level 3: Narrowing (6 clues)
('Jeremy Jordan', 'Broadway Actor', 3, 'Originated Jack Kelly in Newsies at the Neil Simon Theatre in 2012', 'role', 'narrowing', 'Specific venue and year'),
('Jeremy Jordan', 'Broadway Actor', 3, 'Nominated for a Tony Award for Best Actor in a Musical for Newsies', 'award', 'narrowing', 'Specific nomination and show'),
('Jeremy Jordan', 'Broadway Actor', 3, 'Originated Clyde Barrow opposite Laura Michelle Kelly in Bonnie & Clyde', 'role', 'narrowing', 'Specific co-star identification'),
('Jeremy Jordan', 'Broadway Actor', 3, 'Known for belting the iconic "Santa Fe" number as Jack Kelly', 'role', 'narrowing', 'Specific song and character'),
('Jeremy Jordan', 'Broadway Actor', 3, 'Appeared as a tech-genius supporting character in Supergirl television series', 'role', 'narrowing', 'Character type specificity'),
('Jeremy Jordan', 'Broadway Actor', 3, 'Known for his powerful belt voice and dynamic dance abilities combined', 'career', 'narrowing', 'Integrated performance skills'),
-- Level 4: Recognition (6 clues)
('Jeremy Jordan', 'Broadway Actor', 4, 'Originated Jack Kelly singing "Santa Fe" in the 2012 Broadway musical Newsies', 'role', 'recognition', 'Character, song, and show identification'),
('Jeremy Jordan', 'Broadway Actor', 4, 'Tony-nominated for his performance as Jack Kelly in Newsies', 'award', 'recognition', 'Specific nomination'),
('Jeremy Jordan', 'Broadway Actor', 4, 'Originated Clyde Barrow in Bonnie & Clyde musical opposite Laura Michelle Kelly', 'role', 'recognition', 'Character and co-star identification'),
('Jeremy Jordan', 'Broadway Actor', 4, 'Appeared as Winn Schott in the Supergirl television series', 'role', 'recognition', 'Character name and show'),
('Jeremy Jordan', 'Broadway Actor', 4, 'Known for his powerful belt voice and athletic choreography in Broadway musicals', 'career', 'recognition', 'Performance signature'),
('Jeremy Jordan', 'Broadway Actor', 4, 'Appeared in Little Shop of Horrors revival as the antagonist dentist', 'role', 'recognition', 'Specific character and musical'),
-- Level 5: Giveaway (4 clues)
('Jeremy Jordan', 'Broadway Actor', 5, 'Tony-nominated actor who originated Jack Kelly singing "Santa Fe" in Newsies', 'award', 'giveaway', 'Nomination and iconic role'),
('Jeremy Jordan', 'Broadway Actor', 5, 'The actor who originated Jack Kelly and sang the iconic "Santa Fe" in the 2012 Newsies musical', 'role', 'giveaway', 'Character and most famous song'),
('Jeremy Jordan', 'Broadway Actor', 5, 'Broadway star known for powerful belt voice and originating Jack Kelly in Newsies and Clyde Barrow in Bonnie & Clyde', 'career', 'giveaway', 'Two major roles and vocal signature'),
('Jeremy Jordan', 'Broadway Actor', 5, 'Tony-nominated performer famous for "Santa Fe" in Newsies and Supergirl television series', 'career', 'giveaway', 'Both stage and TV recognition')
;
