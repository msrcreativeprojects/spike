-- SPIKE Clue Bank Dataset
-- ~50 shows × ~32 clues each = ~1,600 rows
-- Levels: 1=very broad, 2=obscure detail, 3=narrowing, 4=recognition, 5=giveaway, 0=fact

INSERT INTO clue_bank (show_name, category, level, clue_text, clue_type, specificity, notes) VALUES

-- ============================================================
-- HAMILTON
-- ============================================================
('Hamilton', 'Broadway Musical', 1, 'Based on historical events', 'source', 'very_broad', 'Applies to many shows: 1776, Ragtime, Evita, etc.'),
('Hamilton', 'Broadway Musical', 1, 'Features a large ensemble', 'structure', 'very_broad', 'True of most major musicals'),
('Hamilton', 'Broadway Musical', 1, 'Set in America', 'setting', 'very_broad', 'Dozens of shows set in the US'),
('Hamilton', 'Broadway Musical', 1, 'Won the Pulitzer Prize for Drama', 'production', 'very_broad', 'Multiple musicals have won this'),
('Hamilton', 'Broadway Musical', 1, 'Uses contemporary music styles', 'structure', 'very_broad', 'Could be many modern musicals'),
('Hamilton', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows opened this decade'),

('Hamilton', 'Broadway Musical', 2, 'Started as a concept album before becoming a stage show', 'development', 'broad', 'Also true of Jesus Christ Superstar, Evita, etc.'),
('Hamilton', 'Broadway Musical', 2, 'The creator performed in the original cast', 'production', 'broad', 'True of several shows: Jonathan Groff pieces, etc.'),
('Hamilton', 'Broadway Musical', 2, 'Inspired by a biography the creator read on vacation', 'development', 'broad', 'Unusual origin but doesn''t identify the show'),
('Hamilton', 'Broadway Musical', 2, 'Originally workshopped at a nonprofit theater', 'development', 'broad', 'Common development path for many shows'),
('Hamilton', 'Broadway Musical', 2, 'The score blends hip-hop, R&B, and traditional Broadway', 'structure', 'broad', 'Could apply to In the Heights or others'),
('Hamilton', 'Broadway Musical', 2, 'Color-conscious casting was a deliberate artistic choice', 'production', 'broad', 'Multiple modern shows use this approach'),

('Hamilton', 'Broadway Musical', 3, 'Set during the American Revolution and early republic', 'setting', 'narrowing', 'Narrows to Hamilton, 1776, or a few others'),
('Hamilton', 'Broadway Musical', 3, 'Adapted from a Ron Chernow biography', 'source', 'narrowing', 'Very specific source but not widely known'),
('Hamilton', 'Broadway Musical', 3, 'Features political rivals who duel', 'plot', 'narrowing', 'Could be Hamilton or possibly 1776'),
('Hamilton', 'Broadway Musical', 3, 'The protagonist is an immigrant who rises to power', 'character', 'narrowing', 'Narrows significantly but not definitive'),
('Hamilton', 'Broadway Musical', 3, 'Created by the same artist behind In the Heights', 'development', 'narrowing', 'Strong hint but about the creator, not the show'),
('Hamilton', 'Broadway Musical', 3, 'A founding father tells his own story through rap', 'structure', 'narrowing', 'Very narrowing but could theoretically be others'),

('Hamilton', 'Broadway Musical', 4, 'The story ends with a famous duel in Weehawken', 'plot', 'recognition', 'Strongly suggests Hamilton or a Burr story'),
('Hamilton', 'Broadway Musical', 4, 'Features King George III as a comedic character', 'character', 'recognition', 'Very recognizable but technically not unique'),
('Hamilton', 'Broadway Musical', 4, 'The protagonist is the first Secretary of the Treasury', 'character', 'recognition', 'Nearly definitive but framed as a hint'),
('Hamilton', 'Broadway Musical', 4, 'Includes the song "My Shot"', 'song', 'recognition', 'Very recognizable, narrows to 1-2 shows'),
('Hamilton', 'Broadway Musical', 4, 'Aaron Burr serves as the narrator', 'character', 'recognition', 'Very strong hint'),
('Hamilton', 'Broadway Musical', 4, 'The ten-dollar founding father without a father', 'iconic_element', 'recognition', 'Opening line reference'),

('Hamilton', 'Broadway Musical', 5, 'Includes "The Room Where It Happens" and "Wait for It"', 'song', 'giveaway', 'Unmistakable song titles'),
('Hamilton', 'Broadway Musical', 5, 'Lin-Manuel Miranda''s hip-hop retelling of a founding father''s life', 'iconic_element', 'giveaway', 'Definitive identifier'),
('Hamilton', 'Broadway Musical', 5, 'Alexander and Eliza''s love story frames the narrative', 'character', 'giveaway', 'Character names give it away'),
('Hamilton', 'Broadway Musical', 5, 'The tagline asks "Who lives, who dies, who tells your story?"', 'iconic_element', 'giveaway', 'Unmistakable'),

('Hamilton', 'Broadway Musical', 0, 'A song from the show was performed at the White House before the musical was written', 'interesting_fact', 'fact', 'Miranda performed at a White House poetry jam in 2009'),
('Hamilton', 'Broadway Musical', 0, 'The show grossed over $600 million on Broadway before the film was released', 'interesting_fact', 'fact', 'Record-breaking commercial success'),
('Hamilton', 'Broadway Musical', 0, 'The original cast recording debuted at #12 on the Billboard 200', 'interesting_fact', 'fact', 'Highest chart debut for a cast recording in decades'),
('Hamilton', 'Broadway Musical', 0, 'The creator wrote the show over the course of seven years', 'interesting_fact', 'fact', 'Long development period'),

-- ============================================================
-- WICKED
-- ============================================================
('Wicked', 'Broadway Musical', 1, 'Adapted from a novel', 'source', 'very_broad', 'Many musicals are adapted from novels'),
('Wicked', 'Broadway Musical', 1, 'Features a female protagonist', 'character', 'very_broad', 'True of dozens of shows'),
('Wicked', 'Broadway Musical', 1, 'Set in a fantasy world', 'setting', 'very_broad', 'Could be many fantasy musicals'),
('Wicked', 'Broadway Musical', 1, 'Explores themes of friendship and identity', 'theme', 'very_broad', 'Very common themes'),
('Wicked', 'Broadway Musical', 1, 'Premiered in the 2000s', 'production', 'very_broad', 'Many shows opened this decade'),
('Wicked', 'Broadway Musical', 1, 'Features spectacular scenic effects', 'production', 'very_broad', 'True of many big-budget musicals'),

('Wicked', 'Broadway Musical', 2, 'The source novel reimagines a classic story from a villain''s perspective', 'source', 'broad', 'Could be several shows'),
('Wicked', 'Broadway Musical', 2, 'Stephen Schwartz wrote the score', 'development', 'broad', 'Schwartz wrote multiple Broadway shows'),
('Wicked', 'Broadway Musical', 2, 'The original production had one of the largest advance ticket sales in Broadway history', 'production', 'broad', 'Several shows hold similar records'),
('Wicked', 'Broadway Musical', 2, 'Universal Pictures optioned the film rights before the show opened', 'development', 'broad', 'Unusual but not identifying'),
('Wicked', 'Broadway Musical', 2, 'The two leads represent opposite ends of a moral spectrum', 'character', 'broad', 'True of many buddy/rival stories'),
('Wicked', 'Broadway Musical', 2, 'Based on a Gregory Maguire novel', 'source', 'broad', 'Maguire wrote several reimagined fairy tales'),

('Wicked', 'Broadway Musical', 3, 'A prequel that takes place before the events of a famous film', 'plot', 'narrowing', 'Could be Wicked, or a Star Wars-type prequel story'),
('Wicked', 'Broadway Musical', 3, 'Set in a land with talking animals and a corrupt government', 'setting', 'narrowing', 'Narrows to Oz-related stories'),
('Wicked', 'Broadway Musical', 3, 'Two women who start as friends end up on opposite sides', 'plot', 'narrowing', 'Could be a few shows'),
('Wicked', 'Broadway Musical', 3, 'The protagonist is misunderstood because of her appearance', 'character', 'narrowing', 'Narrows but not definitive'),
('Wicked', 'Broadway Musical', 3, 'Reinterprets a beloved 1939 movie from a different angle', 'source', 'narrowing', 'Strongly hints at Oz'),
('Wicked', 'Broadway Musical', 3, 'The antagonist of the original story becomes the hero', 'plot', 'narrowing', 'Classic villain-as-hero premise'),

('Wicked', 'Broadway Musical', 4, 'One character has green skin', 'character', 'recognition', 'Very strong hint — only a couple possibilities'),
('Wicked', 'Broadway Musical', 4, 'Set in the Land of Oz before Dorothy arrives', 'setting', 'recognition', 'Nearly definitive'),
('Wicked', 'Broadway Musical', 4, 'Includes the power ballad "Defying Gravity"', 'song', 'recognition', 'Very well known'),
('Wicked', 'Broadway Musical', 4, 'The blonde and the green girl become unlikely roommates at school', 'character', 'recognition', 'Strongly suggests Wicked'),
('Wicked', 'Broadway Musical', 4, 'A sorcery student rebels against a corrupt wizard', 'plot', 'recognition', 'Very recognizable plot'),
('Wicked', 'Broadway Musical', 4, 'Features a song where the heroine literally flies', 'iconic_element', 'recognition', 'The Act 1 finale flying moment'),

('Wicked', 'Broadway Musical', 5, 'Tells the origin story of Elphaba and Glinda', 'character', 'giveaway', 'Character names are unmistakable'),
('Wicked', 'Broadway Musical', 5, 'Includes "Popular," "For Good," and "Defying Gravity"', 'song', 'giveaway', 'Definitive song list'),
('Wicked', 'Broadway Musical', 5, 'The Wicked Witch of the West is actually the misunderstood heroine', 'character', 'giveaway', 'Unmistakable'),
('Wicked', 'Broadway Musical', 5, 'Features the Wizard, Madame Morrible, and Fiyero', 'character', 'giveaway', 'Multiple character names'),

('Wicked', 'Broadway Musical', 0, 'Idina Menzel and Kristin Chenoweth originated the lead roles', 'interesting_fact', 'fact', 'Iconic original casting'),
('Wicked', 'Broadway Musical', 0, 'The show has been running on Broadway since 2003 without closing', 'interesting_fact', 'fact', 'One of the longest runs'),
('Wicked', 'Broadway Musical', 0, 'The green makeup requires 30 minutes to apply and uses a custom formula', 'interesting_fact', 'fact', 'Production detail'),

-- ============================================================
-- LES MISÉRABLES
-- ============================================================
('Les Misérables', 'Broadway Musical', 1, 'Adapted from a classic novel', 'source', 'very_broad', 'Many musicals are adapted from novels'),
('Les Misérables', 'Broadway Musical', 1, 'Set in Europe', 'setting', 'very_broad', 'Many shows are set in Europe'),
('Les Misérables', 'Broadway Musical', 1, 'Features a large ensemble cast', 'structure', 'very_broad', 'Common in big musicals'),
('Les Misérables', 'Broadway Musical', 1, 'Based on historical events', 'source', 'very_broad', 'Applies to many shows'),
('Les Misérables', 'Broadway Musical', 1, 'Premiered in the West End before Broadway', 'production', 'very_broad', 'Many British imports'),
('Les Misérables', 'Broadway Musical', 1, 'Through-sung with no spoken dialogue', 'structure', 'very_broad', 'True of several musicals'),

('Les Misérables', 'Broadway Musical', 2, 'Originally developed as a concept album in French', 'development', 'broad', 'Also true of Jesus Christ Superstar (concept album)'),
('Les Misérables', 'Broadway Musical', 2, 'Cameron Mackintosh produced the English-language version', 'production', 'broad', 'Mackintosh produced many shows'),
('Les Misérables', 'Broadway Musical', 2, 'The source novel is over 1,400 pages long', 'source', 'broad', 'Unusual fact but not identifying'),
('Les Misérables', 'Broadway Musical', 2, 'Features a revolving stage as a key scenic element', 'production', 'broad', 'Several shows use revolving stages'),
('Les Misérables', 'Broadway Musical', 2, 'Claude-Michel Schönberg composed the score', 'development', 'broad', 'Schönberg wrote Miss Saigon too'),
('Les Misérables', 'Broadway Musical', 2, 'The original London production ran for over 30 years', 'production', 'broad', 'Could be a few long-running shows'),

('Les Misérables', 'Broadway Musical', 3, 'Set during revolutionary upheaval in 19th-century France', 'setting', 'narrowing', 'Could be Les Mis, Phantom, or a few others'),
('Les Misérables', 'Broadway Musical', 3, 'Adapted from a Victor Hugo novel', 'source', 'narrowing', 'Hugo wrote Les Mis and Hunchback'),
('Les Misérables', 'Broadway Musical', 3, 'Centers on a fugitive pursued relentlessly by the law', 'plot', 'narrowing', 'Strong hint but could be a few stories'),
('Les Misérables', 'Broadway Musical', 3, 'Spans nearly two decades of one man''s life', 'plot', 'narrowing', 'Narrows but not definitive'),
('Les Misérables', 'Broadway Musical', 3, 'Features barricade scenes during a student uprising', 'plot', 'narrowing', 'Very narrowing'),
('Les Misérables', 'Broadway Musical', 3, 'The same songwriters later created Miss Saigon', 'development', 'narrowing', 'Boublil and Schönberg connection'),

('Les Misérables', 'Broadway Musical', 4, 'A convict breaks parole and reinvents himself as a mayor', 'plot', 'recognition', 'Very recognizable plot'),
('Les Misérables', 'Broadway Musical', 4, 'An inspector obsessively hunts the protagonist for decades', 'character', 'recognition', 'Javert archetype is well known'),
('Les Misérables', 'Broadway Musical', 4, 'A dying woman''s daughter is rescued from cruel innkeepers', 'plot', 'recognition', 'Fantine/Cosette/Thénardiers'),
('Les Misérables', 'Broadway Musical', 4, 'Student revolutionaries build a barricade in Paris', 'plot', 'recognition', 'Nearly definitive'),
('Les Misérables', 'Broadway Musical', 4, 'Includes "One Day More" as the Act 1 finale', 'song', 'recognition', 'Very well known'),
('Les Misérables', 'Broadway Musical', 4, 'Prisoner 24601 seeks redemption after 19 years in chains', 'character', 'recognition', 'Famous identifier'),

('Les Misérables', 'Broadway Musical', 5, 'Jean Valjean and Inspector Javert''s lifelong pursuit', 'character', 'giveaway', 'Character names unmistakable'),
('Les Misérables', 'Broadway Musical', 5, 'Features "I Dreamed a Dream," "On My Own," and "Do You Hear the People Sing?"', 'song', 'giveaway', 'Definitive'),
('Les Misérables', 'Broadway Musical', 5, 'Cosette, Éponine, Marius, and the Thénardiers populate the story', 'character', 'giveaway', 'Multiple character names'),
('Les Misérables', 'Broadway Musical', 5, 'The longest-running musical in West End history for many years', 'iconic_element', 'giveaway', 'Widely known fact'),

('Les Misérables', 'Broadway Musical', 0, 'The original French concept album was recorded in 1980, five years before the English version', 'interesting_fact', 'fact', 'Long development'),
('Les Misérables', 'Broadway Musical', 0, 'The revolving stage was created because the original director wanted the set to feel like it was breathing', 'interesting_fact', 'fact', 'Iconic staging choice'),
('Les Misérables', 'Broadway Musical', 0, 'The barricade set piece weighs several tons and is rebuilt for every production', 'interesting_fact', 'fact', 'Massive technical element'),

-- ============================================================
-- RENT
-- ============================================================
('Rent', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many shows set in NYC'),
('Rent', 'Broadway Musical', 1, 'Features a rock score', 'structure', 'very_broad', 'Several rock musicals'),
('Rent', 'Broadway Musical', 1, 'Explores themes of love and loss', 'theme', 'very_broad', 'Universal themes'),
('Rent', 'Broadway Musical', 1, 'Premiered in the 1990s', 'production', 'very_broad', 'Many 90s shows'),
('Rent', 'Broadway Musical', 1, 'Inspired by a classic opera', 'source', 'very_broad', 'Several shows are opera-inspired'),
('Rent', 'Broadway Musical', 1, 'Deals with a community facing a health crisis', 'theme', 'very_broad', 'Could be several shows'),

('Rent', 'Broadway Musical', 2, 'The creator died suddenly before the show opened', 'development', 'broad', 'Tragic but could be a few shows'),
('Rent', 'Broadway Musical', 2, 'Premiered Off-Broadway before transferring', 'development', 'broad', 'Common development path'),
('Rent', 'Broadway Musical', 2, 'The cast originally performed with music stands during early workshops', 'production', 'broad', 'Workshop detail'),
('Rent', 'Broadway Musical', 2, 'Won both the Pulitzer Prize and the Tony for Best Musical', 'production', 'broad', 'A few shows have won both'),
('Rent', 'Broadway Musical', 2, 'The show was developed at New York Theatre Workshop', 'development', 'broad', 'NYTW has housed several notable shows'),
('Rent', 'Broadway Musical', 2, 'Features characters dealing with addiction and HIV/AIDS', 'theme', 'broad', 'Could be a few 90s shows'),

('Rent', 'Broadway Musical', 3, 'Inspired by Puccini''s La Bohème', 'source', 'narrowing', 'Strong hint — narrows to a few adaptations'),
('Rent', 'Broadway Musical', 3, 'Set in Manhattan''s East Village during the early 1990s', 'setting', 'narrowing', 'Very specific setting'),
('Rent', 'Broadway Musical', 3, 'Follows a year in the lives of struggling artists', 'plot', 'narrowing', 'La Bohème connection'),
('Rent', 'Broadway Musical', 3, 'The show is structured around seasons and the passage of a year', 'structure', 'narrowing', 'Time structure hint'),
('Rent', 'Broadway Musical', 3, 'Jonathan Larson spent seven years writing it', 'development', 'narrowing', 'Creator name is a strong hint'),
('Rent', 'Broadway Musical', 3, 'A rock musical about bohemians resisting gentrification', 'theme', 'narrowing', 'Very narrowing'),

('Rent', 'Broadway Musical', 4, 'Measures a year in the question "How do you measure a year in the life?"', 'iconic_element', 'recognition', 'Famous lyric reference'),
('Rent', 'Broadway Musical', 4, 'Features a filmmaker documenting his friends'' lives', 'character', 'recognition', 'Mark''s storyline'),
('Rent', 'Broadway Musical', 4, 'The motto is "No day but today"', 'iconic_element', 'recognition', 'Very recognizable'),
('Rent', 'Broadway Musical', 4, 'Artists refuse to pay their landlord who was once their friend', 'plot', 'recognition', 'Central conflict'),
('Rent', 'Broadway Musical', 4, 'A drag queen performs at a nightclub called the Cat Scratch Club', 'character', 'recognition', 'Angel/club reference'),
('Rent', 'Broadway Musical', 4, 'Opens with characters asking how to measure 525,600 minutes', 'song', 'recognition', 'Opening number reference'),

('Rent', 'Broadway Musical', 5, 'Includes "Seasons of Love," "La Vie Bohème," and "Out Tonight"', 'song', 'giveaway', 'Definitive'),
('Rent', 'Broadway Musical', 5, 'Mark, Roger, Mimi, Angel, and Collins struggle to survive in Alphabet City', 'character', 'giveaway', 'Character names'),
('Rent', 'Broadway Musical', 5, 'Jonathan Larson''s rock opera about love and loss in the age of AIDS', 'iconic_element', 'giveaway', 'Definitive'),
('Rent', 'Broadway Musical', 5, '525,600 minutes is the show''s iconic opening measurement', 'song', 'giveaway', 'Unmistakable number'),

('Rent', 'Broadway Musical', 0, 'Jonathan Larson died of an aortic dissection the morning of the first Off-Broadway preview', 'interesting_fact', 'fact', 'Tragic timing'),
('Rent', 'Broadway Musical', 0, 'The original cast included Idina Menzel, Taye Diggs, and Anthony Rapp', 'interesting_fact', 'fact', 'Star-studded original cast'),
('Rent', 'Broadway Musical', 0, 'The show inspired a generation of theater artists and was credited with bringing young audiences back to Broadway', 'interesting_fact', 'fact', 'Cultural impact'),

-- ============================================================
-- THE PHANTOM OF THE OPERA
-- ============================================================
('The Phantom of the Opera', 'Broadway Musical', 1, 'Set in Europe', 'setting', 'very_broad', 'Many shows set in Europe'),
('The Phantom of the Opera', 'Broadway Musical', 1, 'Features a love triangle', 'plot', 'very_broad', 'Extremely common plot device'),
('The Phantom of the Opera', 'Broadway Musical', 1, 'Andrew Lloyd Webber composed the score', 'development', 'very_broad', 'ALW wrote many shows'),
('The Phantom of the Opera', 'Broadway Musical', 1, 'Adapted from a novel', 'source', 'very_broad', 'Many shows from novels'),
('The Phantom of the Opera', 'Broadway Musical', 1, 'Premiered in the West End', 'production', 'very_broad', 'Many British imports'),
('The Phantom of the Opera', 'Broadway Musical', 1, 'Features elaborate scenic effects', 'production', 'very_broad', 'True of many spectacle shows'),

('The Phantom of the Opera', 'Broadway Musical', 2, 'Cameron Mackintosh produced the original production', 'production', 'broad', 'Mackintosh produced many shows'),
('The Phantom of the Opera', 'Broadway Musical', 2, 'The set design includes a massive practical effect that became the show''s signature moment', 'production', 'broad', 'Vague enough to be several shows'),
('The Phantom of the Opera', 'Broadway Musical', 2, 'Sarah Brightman originated the female lead', 'production', 'broad', 'Brightman connection but doesn''t confirm'),
('The Phantom of the Opera', 'Broadway Musical', 2, 'Based on a 1910 French novel by Gaston Leroux', 'source', 'broad', 'Source but not widely known author'),
('The Phantom of the Opera', 'Broadway Musical', 2, 'The score is through-sung with operatic vocal requirements', 'structure', 'broad', 'Several ALW shows are through-sung'),
('The Phantom of the Opera', 'Broadway Musical', 2, 'Held the record for longest-running Broadway show for over 35 years', 'production', 'broad', 'Record-holder hint'),

('The Phantom of the Opera', 'Broadway Musical', 3, 'Set inside and beneath a grand opera house', 'setting', 'narrowing', 'Very specific setting'),
('The Phantom of the Opera', 'Broadway Musical', 3, 'A disfigured genius lives hidden in the building', 'character', 'narrowing', 'Narrows significantly'),
('The Phantom of the Opera', 'Broadway Musical', 3, 'A young soprano is secretly tutored by a mysterious voice', 'plot', 'narrowing', 'Very narrowing'),
('The Phantom of the Opera', 'Broadway Musical', 3, 'Set in 19th-century Paris', 'setting', 'narrowing', 'Could be a few shows'),
('The Phantom of the Opera', 'Broadway Musical', 3, 'Features an iconic mask as a costume element', 'iconic_element', 'narrowing', 'Strong visual hint'),
('The Phantom of the Opera', 'Broadway Musical', 3, 'The love story involves obsession, not just romance', 'theme', 'narrowing', 'Narrowing theme'),

('The Phantom of the Opera', 'Broadway Musical', 4, 'A chandelier crashes during the performance', 'iconic_element', 'recognition', 'Very famous moment'),
('The Phantom of the Opera', 'Broadway Musical', 4, 'The protagonist wears half a mask to hide his face', 'character', 'recognition', 'Nearly definitive'),
('The Phantom of the Opera', 'Broadway Musical', 4, 'An underground lake beneath the opera house', 'setting', 'recognition', 'Very recognizable'),
('The Phantom of the Opera', 'Broadway Musical', 4, 'Includes "The Music of the Night"', 'song', 'recognition', 'Famous song'),
('The Phantom of the Opera', 'Broadway Musical', 4, 'A vicomte competes with a masked man for the soprano''s love', 'plot', 'recognition', 'Raoul/Phantom dynamic'),
('The Phantom of the Opera', 'Broadway Musical', 4, 'Broadway''s longest-running show until it closed in 2023', 'production', 'recognition', 'Very well known fact'),

('The Phantom of the Opera', 'Broadway Musical', 5, 'Christine Daaé is torn between Raoul and the Phantom', 'character', 'giveaway', 'Character names'),
('The Phantom of the Opera', 'Broadway Musical', 5, 'Features "Think of Me," "All I Ask of You," and "The Point of No Return"', 'song', 'giveaway', 'Definitive song list'),
('The Phantom of the Opera', 'Broadway Musical', 5, 'The masked Phantom of the Opera haunts the Paris Opéra', 'character', 'giveaway', 'Title character named'),
('The Phantom of the Opera', 'Broadway Musical', 5, 'The half-mask logo is one of the most recognizable images in theater', 'iconic_element', 'giveaway', 'Unmistakable branding'),

('The Phantom of the Opera', 'Broadway Musical', 0, 'The chandelier weighs about one ton and travels at high speed during the crash sequence', 'interesting_fact', 'fact', 'Famous technical detail'),
('The Phantom of the Opera', 'Broadway Musical', 0, 'The show used over 230 costumes designed by Maria Björnson', 'interesting_fact', 'fact', 'Lavish production'),
('The Phantom of the Opera', 'Broadway Musical', 0, 'It ran for 13,981 performances on Broadway before closing', 'interesting_fact', 'fact', 'Record-setting run'),

-- ============================================================
-- DEAR EVAN HANSEN
-- ============================================================
('Dear Evan Hansen', 'Broadway Musical', 1, 'Features a teenage protagonist', 'character', 'very_broad', 'Many shows feature teens'),
('Dear Evan Hansen', 'Broadway Musical', 1, 'Explores themes of mental health', 'theme', 'very_broad', 'Could be several modern shows'),
('Dear Evan Hansen', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows this decade'),
('Dear Evan Hansen', 'Broadway Musical', 1, 'Set in suburban America', 'setting', 'very_broad', 'Many shows in suburbia'),
('Dear Evan Hansen', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'One show wins each year'),
('Dear Evan Hansen', 'Broadway Musical', 1, 'Features a contemporary pop-rock score', 'structure', 'very_broad', 'Common in modern musicals'),

('Dear Evan Hansen', 'Broadway Musical', 2, 'Benj Pasek and Justin Paul wrote the score', 'development', 'broad', 'They also wrote La La Land and Greatest Showman'),
('Dear Evan Hansen', 'Broadway Musical', 2, 'The lead actor won the Tony at age 23', 'production', 'broad', 'Age detail doesn''t confirm show'),
('Dear Evan Hansen', 'Broadway Musical', 2, 'Developed at Arena Stage in Washington, D.C. before Broadway', 'development', 'broad', 'Common try-out path'),
('Dear Evan Hansen', 'Broadway Musical', 2, 'The set design uses screens displaying social media feeds', 'production', 'broad', 'Modern staging choice'),
('Dear Evan Hansen', 'Broadway Musical', 2, 'The story examines how a lie can spiral out of control', 'plot', 'broad', 'Could be several shows'),
('Dear Evan Hansen', 'Broadway Musical', 2, 'Social media and online identity are central themes', 'theme', 'broad', 'Modern theme, multiple shows'),

('Dear Evan Hansen', 'Broadway Musical', 3, 'A lonely high schooler fabricates a connection with a dead classmate', 'plot', 'narrowing', 'Very specific plot'),
('Dear Evan Hansen', 'Broadway Musical', 3, 'The protagonist writes letters to himself as a therapy exercise', 'character', 'narrowing', 'Distinctive detail'),
('Dear Evan Hansen', 'Broadway Musical', 3, 'A family grieving a suicide finds comfort in a false friendship', 'plot', 'narrowing', 'Narrowing significantly'),
('Dear Evan Hansen', 'Broadway Musical', 3, 'The show examines the gap between online personas and real life', 'theme', 'narrowing', 'Strong thematic hint'),
('Dear Evan Hansen', 'Broadway Musical', 3, 'A broken arm becomes a pivotal plot device', 'plot', 'narrowing', 'Unusual physical detail'),
('Dear Evan Hansen', 'Broadway Musical', 3, 'The protagonist''s anxiety disorder drives the story', 'character', 'narrowing', 'Character-defining trait'),

('Dear Evan Hansen', 'Broadway Musical', 4, 'A letter beginning "Dear Evan Hansen" is mistaken for a suicide note', 'plot', 'recognition', 'Very recognizable'),
('Dear Evan Hansen', 'Broadway Musical', 4, 'Includes the anthem "You Will Be Found"', 'song', 'recognition', 'Famous song'),
('Dear Evan Hansen', 'Broadway Musical', 4, 'The protagonist waves through a window, unseen by his peers', 'iconic_element', 'recognition', 'Song/image reference'),
('Dear Evan Hansen', 'Broadway Musical', 4, 'A teen with a cast on his arm claims a dead student signed it', 'plot', 'recognition', 'Very specific plot point'),
('Dear Evan Hansen', 'Broadway Musical', 4, 'The Connor Project becomes a viral movement based on a lie', 'plot', 'recognition', 'Nearly definitive'),
('Dear Evan Hansen', 'Broadway Musical', 4, 'Ben Platt originated the lead role on Broadway', 'production', 'recognition', 'Strong hint'),

('Dear Evan Hansen', 'Broadway Musical', 5, 'Evan Hansen''s fabricated friendship with Connor Murphy drives the plot', 'character', 'giveaway', 'Character names'),
('Dear Evan Hansen', 'Broadway Musical', 5, 'Features "Waving Through a Window," "You Will Be Found," and "For Forever"', 'song', 'giveaway', 'Definitive'),
('Dear Evan Hansen', 'Broadway Musical', 5, 'A socially anxious teen named Evan becomes an accidental activist', 'character', 'giveaway', 'Name + plot'),
('Dear Evan Hansen', 'Broadway Musical', 5, 'The show''s opening letter reads "Dear Evan Hansen, today is going to be a good day"', 'iconic_element', 'giveaway', 'Title in the text'),

('Dear Evan Hansen', 'Broadway Musical', 0, 'Ben Platt wore a hidden earpiece so the orchestra could follow his rubato singing style', 'interesting_fact', 'fact', 'Unusual tech choice'),
('Dear Evan Hansen', 'Broadway Musical', 0, 'The show''s social media marketing strategy was designed to mirror the story''s themes', 'interesting_fact', 'fact', 'Meta marketing'),
('Dear Evan Hansen', 'Broadway Musical', 0, 'The creators originally conceived it as a story about a girl, not a boy', 'interesting_fact', 'fact', 'Early development change'),

-- ============================================================
-- CHICAGO
-- ============================================================
('Chicago', 'Broadway Musical', 1, 'Set in America', 'setting', 'very_broad', 'Many American-set shows'),
('Chicago', 'Broadway Musical', 1, 'Features jazz-influenced music', 'structure', 'very_broad', 'Several shows use jazz'),
('Chicago', 'Broadway Musical', 1, 'Based on real events', 'source', 'very_broad', 'Many shows use real events'),
('Chicago', 'Broadway Musical', 1, 'Explores themes of crime and celebrity', 'theme', 'very_broad', 'Could be several shows'),
('Chicago', 'Broadway Musical', 1, 'Originally choreographed by a legendary director', 'production', 'very_broad', 'Vague enough to be many'),
('Chicago', 'Broadway Musical', 1, 'Has had a major revival production', 'production', 'very_broad', 'Many shows have revivals'),

('Chicago', 'Broadway Musical', 2, 'Bob Fosse directed and choreographed the original production', 'production', 'broad', 'Fosse did several shows'),
('Chicago', 'Broadway Musical', 2, 'Kander and Ebb wrote the score', 'development', 'broad', 'They wrote Cabaret too'),
('Chicago', 'Broadway Musical', 2, 'The revival became the longest-running American musical', 'production', 'broad', 'Record hint'),
('Chicago', 'Broadway Musical', 2, 'Based on a 1926 play by a reporter who covered the trials', 'source', 'broad', 'Source detail'),
('Chicago', 'Broadway Musical', 2, 'The revival stripped the production to a minimal concert staging', 'production', 'broad', 'Distinctive revival approach'),
('Chicago', 'Broadway Musical', 2, 'The original 1975 production was overshadowed by A Chorus Line', 'production', 'broad', 'Historical Broadway context'),

('Chicago', 'Broadway Musical', 3, 'Set in the Roaring Twenties during Prohibition', 'setting', 'narrowing', 'Could be a few shows'),
('Chicago', 'Broadway Musical', 3, 'Two women in jail compete for tabloid fame', 'plot', 'narrowing', 'Very specific'),
('Chicago', 'Broadway Musical', 3, 'A satire of the criminal justice system and media circus', 'theme', 'narrowing', 'Narrowing theme'),
('Chicago', 'Broadway Musical', 3, 'Features a shady lawyer who manipulates the press', 'character', 'narrowing', 'Billy Flynn archetype'),
('Chicago', 'Broadway Musical', 3, 'Every musical number is presented as a vaudeville act', 'structure', 'narrowing', 'Distinctive structure'),
('Chicago', 'Broadway Musical', 3, 'Murderesses tell their stories in a jailhouse setting', 'plot', 'narrowing', 'Very narrowing'),

('Chicago', 'Broadway Musical', 4, 'Includes "All That Jazz" and "Cell Block Tango"', 'song', 'recognition', 'Very famous songs'),
('Chicago', 'Broadway Musical', 4, 'A housewife murders her cheating lover and becomes famous for it', 'plot', 'recognition', 'Roxie''s story'),
('Chicago', 'Broadway Musical', 4, 'The razzle dazzle defense wins over the jury', 'iconic_element', 'recognition', 'Famous phrase'),
('Chicago', 'Broadway Musical', 4, 'Two rival jailbirds vie for the spotlight with help from lawyer Billy Flynn', 'character', 'recognition', 'Nearly definitive'),
('Chicago', 'Broadway Musical', 4, 'He had it coming — six merry murderesses explain their crimes', 'iconic_element', 'recognition', 'Cell Block Tango reference'),
('Chicago', 'Broadway Musical', 4, 'Bob Fosse''s signature jazz hands define the choreography', 'production', 'recognition', 'Very associated with this show'),

('Chicago', 'Broadway Musical', 5, 'Roxie Hart and Velma Kelly compete for fame in a 1920s jail', 'character', 'giveaway', 'Character names'),
('Chicago', 'Broadway Musical', 5, 'Features "Razzle Dazzle," "All That Jazz," and "Mr. Cellophane"', 'song', 'giveaway', 'Definitive'),
('Chicago', 'Broadway Musical', 5, 'Billy Flynn defends Roxie with "Give ''em the old razzle dazzle"', 'character', 'giveaway', 'Names + quote'),
('Chicago', 'Broadway Musical', 5, 'The longest-running American musical revival in Broadway history', 'iconic_element', 'giveaway', 'Widely known record'),

('Chicago', 'Broadway Musical', 0, 'The 1996 revival was originally intended as a one-night concert benefit', 'interesting_fact', 'fact', 'Surprise origin of the revival'),
('Chicago', 'Broadway Musical', 0, 'Gwen Verdon and Chita Rivera originated the lead roles in 1975', 'interesting_fact', 'fact', 'Legendary original cast'),
('Chicago', 'Broadway Musical', 0, 'The 2002 film won the Academy Award for Best Picture', 'interesting_fact', 'fact', 'Rare musical Best Picture win'),

-- ============================================================
-- THE LION KING
-- ============================================================
('The Lion King', 'Broadway Musical', 1, 'Adapted from a film', 'source', 'very_broad', 'Many Disney and film adaptations'),
('The Lion King', 'Broadway Musical', 1, 'Features animal characters', 'character', 'very_broad', 'Could be Cats, Lion King, etc.'),
('The Lion King', 'Broadway Musical', 1, 'Uses puppetry and visual storytelling', 'production', 'very_broad', 'Several shows use puppets'),
('The Lion King', 'Broadway Musical', 1, 'Disney produced the stage version', 'production', 'very_broad', 'Disney has many stage shows'),
('The Lion King', 'Broadway Musical', 1, 'Set in a non-Western location', 'setting', 'very_broad', 'Several shows set outside the West'),
('The Lion King', 'Broadway Musical', 1, 'Features a coming-of-age story', 'theme', 'very_broad', 'Extremely common theme'),

('The Lion King', 'Broadway Musical', 2, 'Julie Taymor directed and designed the original production', 'production', 'broad', 'Taymor is known for this but doesn''t confirm which show'),
('The Lion King', 'Broadway Musical', 2, 'Actors manipulate visible puppets while performing', 'production', 'broad', 'Could be Avenue Q or War Horse'),
('The Lion King', 'Broadway Musical', 2, 'The stage adaptation added new songs by Lebo M and others', 'development', 'broad', 'Adaptation detail'),
('The Lion King', 'Broadway Musical', 2, 'Opened at the New Amsterdam Theatre on 42nd Street', 'production', 'broad', 'Venue doesn''t confirm show'),
('The Lion King', 'Broadway Musical', 2, 'One of the highest-grossing entertainment properties in history', 'production', 'broad', 'Could be a few mega-hits'),
('The Lion King', 'Broadway Musical', 2, 'Inspired by both the original film and African artistic traditions', 'source', 'broad', 'Cultural fusion hint'),

('The Lion King', 'Broadway Musical', 3, 'Set on the African savanna', 'setting', 'narrowing', 'Very specific setting'),
('The Lion King', 'Broadway Musical', 3, 'A young prince is exiled after his father''s death', 'plot', 'narrowing', 'Classic Hamlet parallel'),
('The Lion King', 'Broadway Musical', 3, 'The villain is the hero''s uncle who seizes the throne', 'plot', 'narrowing', 'Hamlet-like plot'),
('The Lion King', 'Broadway Musical', 3, 'Features a "Circle of Life" opening that brings the entire cast on stage', 'iconic_element', 'narrowing', 'Very recognizable but framed generically'),
('The Lion King', 'Broadway Musical', 3, 'Actors wear elaborate headdresses representing animals', 'production', 'narrowing', 'Taymor''s design approach'),
('The Lion King', 'Broadway Musical', 3, 'The story parallels Shakespeare''s Hamlet', 'source', 'narrowing', 'Multiple shows parallel Hamlet'),

('The Lion King', 'Broadway Musical', 4, 'A cub learns "Hakuna Matata" during his exile', 'iconic_element', 'recognition', 'Very famous phrase'),
('The Lion King', 'Broadway Musical', 4, 'The opening sequence features a procession of animal puppets across the theater', 'iconic_element', 'recognition', 'Iconic staging'),
('The Lion King', 'Broadway Musical', 4, 'A warthog and a meerkat become unlikely mentors', 'character', 'recognition', 'Timon and Pumbaa hint'),
('The Lion King', 'Broadway Musical', 4, 'The villain sings about being prepared while hyenas march', 'iconic_element', 'recognition', '"Be Prepared" reference'),
('The Lion King', 'Broadway Musical', 4, 'A mandrill presents the newborn heir to the assembled kingdom', 'iconic_element', 'recognition', 'Rafiki''s moment'),
('The Lion King', 'Broadway Musical', 4, 'Elton John and Tim Rice wrote the original songs', 'development', 'recognition', 'Very associated'),

('The Lion King', 'Broadway Musical', 5, 'Simba returns to Pride Rock to defeat Scar', 'character', 'giveaway', 'Character and location names'),
('The Lion King', 'Broadway Musical', 5, 'Features "Circle of Life," "Can You Feel the Love Tonight," and "Hakuna Matata"', 'song', 'giveaway', 'Definitive'),
('The Lion King', 'Broadway Musical', 5, 'Mufasa''s ghost appears in the stars to tell his son to remember who he is', 'character', 'giveaway', 'Iconic scene'),
('The Lion King', 'Broadway Musical', 5, 'Julie Taymor''s puppet-driven adaptation of the Disney animated classic', 'iconic_element', 'giveaway', 'Definitive'),

('The Lion King', 'Broadway Musical', 0, 'Julie Taymor was the first woman to win the Tony for Best Direction of a Musical', 'interesting_fact', 'fact', 'Groundbreaking achievement'),
('The Lion King', 'Broadway Musical', 0, 'The show has grossed over $1 billion on Broadway alone', 'interesting_fact', 'fact', 'Highest-grossing Broadway show'),
('The Lion King', 'Broadway Musical', 0, 'Over 200 puppets are used in each performance', 'interesting_fact', 'fact', 'Massive puppet count'),

-- ============================================================
-- SWEENEY TODD
-- ============================================================
('Sweeney Todd', 'Broadway Musical', 1, 'Set in England', 'setting', 'very_broad', 'Many shows set in England'),
('Sweeney Todd', 'Broadway Musical', 1, 'Stephen Sondheim composed the score', 'development', 'very_broad', 'Sondheim wrote many shows'),
('Sweeney Todd', 'Broadway Musical', 1, 'Features dark themes of revenge', 'theme', 'very_broad', 'Could be several dark musicals'),
('Sweeney Todd', 'Broadway Musical', 1, 'Based on a 19th-century story', 'source', 'very_broad', 'Many shows from this era'),
('Sweeney Todd', 'Broadway Musical', 1, 'Won the Tony for Best Musical', 'production', 'very_broad', 'One per year'),
('Sweeney Todd', 'Broadway Musical', 1, 'Features a thriller plot with horror elements', 'theme', 'very_broad', 'Could be a few shows'),

('Sweeney Todd', 'Broadway Musical', 2, 'The original production featured a massive factory-like set', 'production', 'broad', 'Set design detail'),
('Sweeney Todd', 'Broadway Musical', 2, 'Hal Prince directed the original production', 'production', 'broad', 'Prince directed many shows'),
('Sweeney Todd', 'Broadway Musical', 2, 'Based on a penny dreadful serial from Victorian England', 'source', 'broad', 'Obscure source'),
('Sweeney Todd', 'Broadway Musical', 2, 'The score includes operatic complexity unusual for Broadway', 'structure', 'broad', 'Sondheim trait'),
('Sweeney Todd', 'Broadway Musical', 2, 'A 2005 revival had actors playing their own instruments', 'production', 'broad', 'Actor-musician approach'),
('Sweeney Todd', 'Broadway Musical', 2, 'Angela Lansbury originated one of the lead roles', 'production', 'broad', 'Famous cast but doesn''t confirm'),

('Sweeney Todd', 'Broadway Musical', 3, 'Set in Victorian London', 'setting', 'narrowing', 'Could be a few shows'),
('Sweeney Todd', 'Broadway Musical', 3, 'A man returns to the city seeking revenge after wrongful imprisonment', 'plot', 'narrowing', 'Could be Les Mis or others'),
('Sweeney Todd', 'Broadway Musical', 3, 'A business partnership is formed around a gruesome secret', 'plot', 'narrowing', 'Very specific'),
('Sweeney Todd', 'Broadway Musical', 3, 'The show functions as a musical thriller with a body count', 'structure', 'narrowing', 'Uncommon genre'),
('Sweeney Todd', 'Broadway Musical', 3, 'A barber shop serves as the setting for violence', 'setting', 'narrowing', 'Very narrowing'),
('Sweeney Todd', 'Broadway Musical', 3, 'Customers who sit in the chair never leave the same way', 'plot', 'narrowing', 'Dark hint'),

('Sweeney Todd', 'Broadway Musical', 4, 'A barber uses his razors as weapons of revenge', 'character', 'recognition', 'Very recognizable'),
('Sweeney Todd', 'Broadway Musical', 4, 'His accomplice bakes the evidence into meat pies', 'plot', 'recognition', 'Nearly definitive'),
('Sweeney Todd', 'Broadway Musical', 4, 'The closest shave you''ll ever know', 'iconic_element', 'recognition', 'Tagline reference'),
('Sweeney Todd', 'Broadway Musical', 4, 'Set on Fleet Street in London', 'setting', 'recognition', 'Very specific location'),
('Sweeney Todd', 'Broadway Musical', 4, 'A judge who wronged the barber becomes his primary target', 'plot', 'recognition', 'Judge Turpin hint'),
('Sweeney Todd', 'Broadway Musical', 4, 'Includes the song "A Little Priest" about a culinary partnership', 'song', 'recognition', 'Very recognizable'),

('Sweeney Todd', 'Broadway Musical', 5, 'The Demon Barber of Fleet Street exacts revenge with his silver razors', 'character', 'giveaway', 'Title character'),
('Sweeney Todd', 'Broadway Musical', 5, 'Mrs. Lovett bakes "the worst pies in London" — until she finds a new ingredient', 'character', 'giveaway', 'Character name + plot'),
('Sweeney Todd', 'Broadway Musical', 5, 'Features "Johanna," "Not While I''m Around," and "My Friends" (addressed to his razors)', 'song', 'giveaway', 'Definitive'),
('Sweeney Todd', 'Broadway Musical', 5, 'Sondheim''s darkest musical about a barber named Todd who murders his customers', 'character', 'giveaway', 'Full identifier'),

('Sweeney Todd', 'Broadway Musical', 0, 'The original barber chair trap door mechanism cost more than most Off-Broadway shows'' entire budgets', 'interesting_fact', 'fact', 'Expensive prop'),
('Sweeney Todd', 'Broadway Musical', 0, 'Johnny Depp starred in Tim Burton''s 2007 film adaptation', 'interesting_fact', 'fact', 'Film version'),
('Sweeney Todd', 'Broadway Musical', 0, 'Sondheim considered it an opera, not a musical', 'interesting_fact', 'fact', 'Creator''s intent'),

-- ============================================================
-- THE BOOK OF MORMON
-- ============================================================
('The Book of Mormon', 'Broadway Musical', 1, 'Features a comedic tone', 'theme', 'very_broad', 'Many comedic musicals'),
('The Book of Mormon', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows this decade'),
('The Book of Mormon', 'Broadway Musical', 1, 'Won the Tony for Best Musical', 'production', 'very_broad', 'One per year'),
('The Book of Mormon', 'Broadway Musical', 1, 'Features a buddy-comedy structure', 'structure', 'very_broad', 'Common structure'),
('The Book of Mormon', 'Broadway Musical', 1, 'Set partly in a developing country', 'setting', 'very_broad', 'Several shows use this setting'),
('The Book of Mormon', 'Broadway Musical', 1, 'Satirizes organized religion', 'theme', 'very_broad', 'Could be a few shows'),

('The Book of Mormon', 'Broadway Musical', 2, 'Created by the makers of South Park', 'development', 'broad', 'Trey Parker and Matt Stone, but could be other projects'),
('The Book of Mormon', 'Broadway Musical', 2, 'Robert Lopez co-wrote the score', 'development', 'broad', 'Lopez wrote Avenue Q and Frozen too'),
('The Book of Mormon', 'Broadway Musical', 2, 'The original cast recording debuted at #3 on the Billboard 200', 'production', 'broad', 'Chart success'),
('The Book of Mormon', 'Broadway Musical', 2, 'Tickets were among the most expensive on Broadway at opening', 'production', 'broad', 'True of several hot shows'),
('The Book of Mormon', 'Broadway Musical', 2, 'Combines offensive humor with genuinely heartfelt moments', 'theme', 'broad', 'Could describe several comedies'),
('The Book of Mormon', 'Broadway Musical', 2, 'The show received nine Tony Awards in its opening year', 'production', 'broad', 'Record-setting wins'),

('The Book of Mormon', 'Broadway Musical', 3, 'Two young missionaries are sent to a remote African village', 'plot', 'narrowing', 'Very specific setup'),
('The Book of Mormon', 'Broadway Musical', 3, 'The humor targets religious proselytizing', 'theme', 'narrowing', 'Narrowing target'),
('The Book of Mormon', 'Broadway Musical', 3, 'An enthusiastic optimist is paired with a slacker partner', 'character', 'narrowing', 'Buddy dynamic'),
('The Book of Mormon', 'Broadway Musical', 3, 'Set partly in Uganda', 'setting', 'narrowing', 'Very specific location'),
('The Book of Mormon', 'Broadway Musical', 3, 'The score parodies traditional musical theater conventions', 'structure', 'narrowing', 'Meta-musical aspect'),
('The Book of Mormon', 'Broadway Musical', 3, 'One character invents his own scripture to connect with locals', 'plot', 'narrowing', 'Specific plot point'),

('The Book of Mormon', 'Broadway Musical', 4, 'Missionaries ring doorbells singing "Hello!"', 'iconic_element', 'recognition', 'Very recognizable opening'),
('The Book of Mormon', 'Broadway Musical', 4, 'Elder Price and Elder Cunningham are assigned to Uganda', 'character', 'recognition', 'Character names are strong hints'),
('The Book of Mormon', 'Broadway Musical', 4, 'Includes a number about turning off difficult feelings like a light switch', 'song', 'recognition', '"Turn It Off" reference'),
('The Book of Mormon', 'Broadway Musical', 4, 'Trey Parker, Matt Stone, and Robert Lopez created the show', 'development', 'recognition', 'Full creator credits'),
('The Book of Mormon', 'Broadway Musical', 4, 'A musical about missionaries who discover their faith doesn''t match reality', 'plot', 'recognition', 'Nearly definitive'),
('The Book of Mormon', 'Broadway Musical', 4, 'The villagers create their own version of a religious text', 'plot', 'recognition', 'Specific plot outcome'),

('The Book of Mormon', 'Broadway Musical', 5, 'Elder Price sings "I Believe" as his crisis-of-faith anthem', 'song', 'giveaway', 'Character + song'),
('The Book of Mormon', 'Broadway Musical', 5, 'Features "Hello!," "Turn It Off," "Hasa Diga Eebowai," and "I Believe"', 'song', 'giveaway', 'Definitive song list'),
('The Book of Mormon', 'Broadway Musical', 5, 'South Park creators'' irreverent musical about Mormon missionaries in Africa', 'iconic_element', 'giveaway', 'Full identifier'),
('The Book of Mormon', 'Broadway Musical', 5, 'The show''s logo features a doorbell and the title in gold lettering', 'iconic_element', 'giveaway', 'Unmistakable branding'),

('The Book of Mormon', 'Broadway Musical', 0, 'The show was written over a seven-year period starting in 2003', 'interesting_fact', 'fact', 'Long development'),
('The Book of Mormon', 'Broadway Musical', 0, 'The LDS Church responded to the show by buying ads in the Playbill: "You''ve seen the show, now read the book"', 'interesting_fact', 'fact', 'Famous response'),
('The Book of Mormon', 'Broadway Musical', 0, 'It won nine Tony Awards including Best Musical, Best Book, Best Score, and Best Direction', 'interesting_fact', 'fact', 'Dominant Tony year'),

-- ============================================================
-- WEST SIDE STORY
-- ============================================================
('West Side Story', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many NYC shows'),
('West Side Story', 'Broadway Musical', 1, 'Features dance as a primary storytelling device', 'structure', 'very_broad', 'Many dance-heavy shows'),
('West Side Story', 'Broadway Musical', 1, 'Based on a Shakespeare play', 'source', 'very_broad', 'Several shows adapt Shakespeare'),
('West Side Story', 'Broadway Musical', 1, 'Explores themes of forbidden love', 'theme', 'very_broad', 'Very common theme'),
('West Side Story', 'Broadway Musical', 1, 'Premiered in the 1950s', 'production', 'very_broad', 'Several classic shows from this era'),
('West Side Story', 'Broadway Musical', 1, 'Leonard Bernstein composed the score', 'development', 'very_broad', 'Bernstein wrote several works'),

('West Side Story', 'Broadway Musical', 2, 'Jerome Robbins conceived, directed, and choreographed the original', 'production', 'broad', 'Robbins did several shows'),
('West Side Story', 'Broadway Musical', 2, 'The young Stephen Sondheim wrote the lyrics', 'development', 'broad', 'Sondheim''s early career'),
('West Side Story', 'Broadway Musical', 2, 'The original production struggled to find a producer who would take a chance on it', 'development', 'broad', 'Common development struggle'),
('West Side Story', 'Broadway Musical', 2, 'Arthur Laurents wrote the book', 'development', 'broad', 'Laurents wrote Gypsy too'),
('West Side Story', 'Broadway Musical', 2, 'Originally conceived as "East Side Story" about Jewish and Catholic families', 'development', 'broad', 'Development trivia'),
('West Side Story', 'Broadway Musical', 2, 'The 1961 film won 10 Academy Awards', 'production', 'broad', 'Film success'),

('West Side Story', 'Broadway Musical', 3, 'Two rival gangs in 1950s Manhattan', 'setting', 'narrowing', 'Very specific setting and conflict'),
('West Side Story', 'Broadway Musical', 3, 'Retells Romeo and Juliet in a modern American setting', 'source', 'narrowing', 'Strong source hint'),
('West Side Story', 'Broadway Musical', 3, 'Ethnic tension drives the gang rivalry', 'theme', 'narrowing', 'Narrowing theme'),
('West Side Story', 'Broadway Musical', 3, 'A young man falls for a girl from the rival group', 'plot', 'narrowing', 'Romeo and Juliet parallel'),
('West Side Story', 'Broadway Musical', 3, 'The choreography uses ballet and jazz to portray street violence', 'production', 'narrowing', 'Distinctive dance approach'),
('West Side Story', 'Broadway Musical', 3, 'Set in the Lincoln Center area before it was redeveloped', 'setting', 'narrowing', 'Historical NYC detail'),

('West Side Story', 'Broadway Musical', 4, 'The Jets and the Sharks snap their fingers and fight for territory', 'character', 'recognition', 'Very recognizable'),
('West Side Story', 'Broadway Musical', 4, 'Tony and Maria meet at a dance in a gymnasium', 'character', 'recognition', 'Character names are hints'),
('West Side Story', 'Broadway Musical', 4, 'Includes "Tonight" and "Somewhere"', 'song', 'recognition', 'Famous songs'),
('West Side Story', 'Broadway Musical', 4, 'A fire escape serves as the balcony scene', 'iconic_element', 'recognition', 'Famous staging'),
('West Side Story', 'Broadway Musical', 4, 'A rumble under the highway ends in tragedy', 'plot', 'recognition', 'Climactic scene'),
('West Side Story', 'Broadway Musical', 4, 'The Puerto Rican and white gangs clash in 1950s New York', 'plot', 'recognition', 'Nearly definitive'),

('West Side Story', 'Broadway Musical', 5, 'Tony and Maria''s love is doomed by the Jets and Sharks rivalry', 'character', 'giveaway', 'All names present'),
('West Side Story', 'Broadway Musical', 5, 'Features "America," "Tonight," "Somewhere," and "I Feel Pretty"', 'song', 'giveaway', 'Definitive song list'),
('West Side Story', 'Broadway Musical', 5, 'Bernstein and Sondheim''s Romeo and Juliet set among New York street gangs', 'iconic_element', 'giveaway', 'Full identifier'),
('West Side Story', 'Broadway Musical', 5, 'Anita warns Maria that "A boy like that" will only bring trouble', 'character', 'giveaway', 'Character names + song'),

('West Side Story', 'Broadway Musical', 0, 'The original concept was called "East Side Story" and dealt with Jewish-Catholic conflict during Easter/Passover', 'interesting_fact', 'fact', 'Original premise'),
('West Side Story', 'Broadway Musical', 0, 'Robbins demanded that Jets and Sharks actors not socialize during rehearsals to build real tension', 'interesting_fact', 'fact', 'Method directing'),
('West Side Story', 'Broadway Musical', 0, 'Steven Spielberg directed a 2021 film adaptation that won Rachel Zegler the role of Maria', 'interesting_fact', 'fact', 'Modern remake'),

-- ============================================================
-- INTO THE WOODS
-- ============================================================
('Into the Woods', 'Broadway Musical', 1, 'Stephen Sondheim composed the score', 'development', 'very_broad', 'Sondheim wrote many shows'),
('Into the Woods', 'Broadway Musical', 1, 'Features an ensemble of well-known characters', 'character', 'very_broad', 'Many shows feature ensembles'),
('Into the Woods', 'Broadway Musical', 1, 'Explores the consequences of getting what you wish for', 'theme', 'very_broad', 'Common theme'),
('Into the Woods', 'Broadway Musical', 1, 'Premiered in the 1980s', 'production', 'very_broad', 'Many shows from this decade'),
('Into the Woods', 'Broadway Musical', 1, 'Features a darkly comic tone', 'theme', 'very_broad', 'Several dark comedies'),
('Into the Woods', 'Broadway Musical', 1, 'Based on familiar stories retold for adults', 'source', 'very_broad', 'Could be several shows'),

('Into the Woods', 'Broadway Musical', 2, 'James Lapine wrote the book and directed', 'development', 'broad', 'Lapine did several Sondheim shows'),
('Into the Woods', 'Broadway Musical', 2, 'Bernadette Peters originated a lead role', 'production', 'broad', 'Peters was in several Sondheim shows'),
('Into the Woods', 'Broadway Musical', 2, 'Act 2 deconstructs the happy endings of Act 1', 'structure', 'broad', 'Unusual structure but not identifying'),
('Into the Woods', 'Broadway Musical', 2, 'Disney produced a 2014 film adaptation', 'production', 'broad', 'Disney has adapted several shows'),
('Into the Woods', 'Broadway Musical', 2, 'The second act was controversial because it kills beloved characters', 'development', 'broad', 'Structural choice'),
('Into the Woods', 'Broadway Musical', 2, 'Multiple fairy tale narratives interweave into a single story', 'structure', 'broad', 'Distinctive but vague'),

('Into the Woods', 'Broadway Musical', 3, 'Fairy tale characters discover that "happily ever after" has consequences', 'plot', 'narrowing', 'Very specific premise'),
('Into the Woods', 'Broadway Musical', 3, 'A baker and his wife must collect magical items to break a curse', 'plot', 'narrowing', 'Central quest'),
('Into the Woods', 'Broadway Musical', 3, 'Features Cinderella, Jack, Little Red Riding Hood, and Rapunzel', 'character', 'narrowing', 'Multiple fairy tale characters'),
('Into the Woods', 'Broadway Musical', 3, 'A witch cursed the baker''s family because his father stole from her garden', 'plot', 'narrowing', 'Very specific backstory'),
('Into the Woods', 'Broadway Musical', 3, 'The woods represent the unknown — where wishes come true but at a cost', 'theme', 'narrowing', 'Thematic hint'),
('Into the Woods', 'Broadway Musical', 3, 'A giant''s wife comes seeking revenge in the second act', 'plot', 'narrowing', 'Act 2 antagonist'),

('Into the Woods', 'Broadway Musical', 4, 'The Witch sings about children who won''t obey and the dangers beyond the garden', 'character', 'recognition', 'Witch''s perspective'),
('Into the Woods', 'Broadway Musical', 4, 'Jack climbs a beanstalk while Cinderella loses a slipper on the palace steps', 'character', 'recognition', 'Parallel storylines'),
('Into the Woods', 'Broadway Musical', 4, 'Includes the song "Children Will Listen"', 'song', 'recognition', 'Famous Sondheim number'),
('Into the Woods', 'Broadway Musical', 4, 'Little Red Riding Hood learns her grandmother has been eaten — but fights back', 'character', 'recognition', 'Fairy tale retelling'),
('Into the Woods', 'Broadway Musical', 4, 'Be careful what you wish for — "I wish" opens the show', 'iconic_element', 'recognition', 'Opening lyric'),
('Into the Woods', 'Broadway Musical', 4, 'A Sondheim musical where fairy tale characters meet in a forest', 'iconic_element', 'recognition', 'Nearly definitive'),

('Into the Woods', 'Broadway Musical', 5, 'The Baker, Cinderella, Jack, Little Red, and the Witch journey into the woods', 'character', 'giveaway', 'Full cast list'),
('Into the Woods', 'Broadway Musical', 5, 'Features "No One Is Alone," "Agony," "Giants in the Sky," and "Children Will Listen"', 'song', 'giveaway', 'Definitive'),
('Into the Woods', 'Broadway Musical', 5, 'Sondheim and Lapine''s fairy tale musical where everyone gets their wish — and then lives with it', 'iconic_element', 'giveaway', 'Full identifier'),
('Into the Woods', 'Broadway Musical', 5, 'The Witch''s rap — "Last Midnight" — is her farewell before vanishing', 'song', 'giveaway', 'Character + song'),

('Into the Woods', 'Broadway Musical', 0, 'The original production had a nearly 3-hour runtime', 'interesting_fact', 'fact', 'Long show'),
('Into the Woods', 'Broadway Musical', 0, 'Disney''s 2014 film toned down many of the darker elements including character deaths', 'interesting_fact', 'fact', 'Film changes'),
('Into the Woods', 'Broadway Musical', 0, 'Sondheim said the show is about the responsibility of parenthood', 'interesting_fact', 'fact', 'Creator''s intent'),

-- ============================================================
-- HADESTOWN
-- ============================================================
('Hadestown', 'Broadway Musical', 1, 'Based on a myth', 'source', 'very_broad', 'Several shows adapt myths'),
('Hadestown', 'Broadway Musical', 1, 'Features a folk-influenced score', 'structure', 'very_broad', 'Could be several shows'),
('Hadestown', 'Broadway Musical', 1, 'Won the Tony for Best Musical', 'production', 'very_broad', 'One per year'),
('Hadestown', 'Broadway Musical', 1, 'Set in a mythological world', 'setting', 'very_broad', 'Several shows use mythology'),
('Hadestown', 'Broadway Musical', 1, 'Explores themes of love and doubt', 'theme', 'very_broad', 'Universal themes'),
('Hadestown', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows this decade'),

('Hadestown', 'Broadway Musical', 2, 'Anaïs Mitchell wrote the score and book', 'development', 'broad', 'Creator name hint'),
('Hadestown', 'Broadway Musical', 2, 'Started as an indie concept album before becoming a stage show', 'development', 'broad', 'Also true of JCS, others'),
('Hadestown', 'Broadway Musical', 2, 'Rachel Chavkin directed the Broadway production', 'production', 'broad', 'Director credit'),
('Hadestown', 'Broadway Musical', 2, 'Developed through multiple iterations including a Vermont community theater version', 'development', 'broad', 'Unusual development path'),
('Hadestown', 'Broadway Musical', 2, 'The staging uses a New Orleans jazz-club aesthetic', 'production', 'broad', 'Design choice'),
('Hadestown', 'Broadway Musical', 2, 'Features a narrator who is also a character in the story', 'structure', 'broad', 'Common structural choice'),

('Hadestown', 'Broadway Musical', 3, 'Retells the Orpheus and Eurydice myth', 'source', 'narrowing', 'Very specific source'),
('Hadestown', 'Broadway Musical', 3, 'Set in a Depression-era mythological underworld', 'setting', 'narrowing', 'Distinctive blended setting'),
('Hadestown', 'Broadway Musical', 3, 'A musician journeys to the underworld to rescue his love', 'plot', 'narrowing', 'Classic myth retold'),
('Hadestown', 'Broadway Musical', 3, 'The ruler of the underworld runs it like a factory', 'character', 'narrowing', 'Hades characterization'),
('Hadestown', 'Broadway Musical', 3, 'The heroine is lured below by promises of security during hard times', 'plot', 'narrowing', 'Eurydice''s choice'),
('Hadestown', 'Broadway Musical', 3, 'Hermes serves as the storytelling guide', 'character', 'narrowing', 'Narrator identity'),

('Hadestown', 'Broadway Musical', 4, 'Orpheus sings a song so beautiful it makes the god of death cry', 'character', 'recognition', 'Very recognizable'),
('Hadestown', 'Broadway Musical', 4, 'The deal is simple: walk out and don''t look back', 'plot', 'recognition', 'Famous myth element'),
('Hadestown', 'Broadway Musical', 4, 'Includes "Wait for Me" and "Way Down Hadestown"', 'song', 'recognition', 'Famous songs'),
('Hadestown', 'Broadway Musical', 4, 'Persephone brings spring when she returns to the surface', 'character', 'recognition', 'Seasonal myth'),
('Hadestown', 'Broadway Musical', 4, 'A folk-opera where workers build a wall for the king of the underworld', 'plot', 'recognition', 'Nearly definitive'),
('Hadestown', 'Broadway Musical', 4, 'André De Shields originated the role of the narrator-god', 'production', 'recognition', 'Famous casting'),

('Hadestown', 'Broadway Musical', 5, 'Orpheus and Eurydice''s love story set in Hades'' underground kingdom', 'character', 'giveaway', 'Character names'),
('Hadestown', 'Broadway Musical', 5, 'Features "Wait for Me," "Epic III," and "Road to Hell"', 'song', 'giveaway', 'Definitive'),
('Hadestown', 'Broadway Musical', 5, 'Anaïs Mitchell''s folk-opera where Hermes tells the tale of two lovers and two gods', 'iconic_element', 'giveaway', 'Full identifier'),
('Hadestown', 'Broadway Musical', 5, 'Hades and Persephone''s troubled marriage mirrors the mortal love story below', 'character', 'giveaway', 'All four principals named'),

('Hadestown', 'Broadway Musical', 0, 'The original concept album featured Bon Iver as Orpheus and Ani DiFranco as Persephone', 'interesting_fact', 'fact', 'Indie music crossover'),
('Hadestown', 'Broadway Musical', 0, 'The show won 8 Tony Awards including Best Musical, Best Direction, and Best Score', 'interesting_fact', 'fact', 'Major sweep'),
('Hadestown', 'Broadway Musical', 0, 'Rachel Chavkin was the second woman to win the Tony for Best Direction of a Musical', 'interesting_fact', 'fact', 'Groundbreaking achievement'),

-- ============================================================
-- A CHORUS LINE
-- ============================================================
('A Chorus Line', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many NYC shows'),
('A Chorus Line', 'Broadway Musical', 1, 'Features a large ensemble', 'structure', 'very_broad', 'Many ensemble shows'),
('A Chorus Line', 'Broadway Musical', 1, 'Explores themes of ambition and identity', 'theme', 'very_broad', 'Common themes'),
('A Chorus Line', 'Broadway Musical', 1, 'Won the Pulitzer Prize for Drama', 'production', 'very_broad', 'Multiple musicals have won'),
('A Chorus Line', 'Broadway Musical', 1, 'Premiered in the 1970s', 'production', 'very_broad', 'Many 70s shows'),
('A Chorus Line', 'Broadway Musical', 1, 'Features dance as a central element', 'structure', 'very_broad', 'Many dance shows'),

('A Chorus Line', 'Broadway Musical', 2, 'Michael Bennett conceived, directed, and choreographed it', 'production', 'broad', 'Bennett did other work too'),
('A Chorus Line', 'Broadway Musical', 2, 'Developed from taped interviews with real Broadway dancers', 'development', 'broad', 'Unusual development method'),
('A Chorus Line', 'Broadway Musical', 2, 'Originally workshopped at the Public Theater', 'development', 'broad', 'Public Theater has launched many shows'),
('A Chorus Line', 'Broadway Musical', 2, 'Held the record for longest-running Broadway show for years', 'production', 'broad', 'Record hint'),
('A Chorus Line', 'Broadway Musical', 2, 'Marvin Hamlisch composed the score', 'development', 'broad', 'Hamlisch connection'),
('A Chorus Line', 'Broadway Musical', 2, 'The entire show takes place during a single event in real time', 'structure', 'broad', 'Unusual structure'),

('A Chorus Line', 'Broadway Musical', 3, 'Set entirely on a bare stage during an audition', 'setting', 'narrowing', 'Very specific setting'),
('A Chorus Line', 'Broadway Musical', 3, 'Dancers reveal their life stories while competing for a job', 'plot', 'narrowing', 'Central conceit'),
('A Chorus Line', 'Broadway Musical', 3, 'A director questions each dancer about why they chose this life', 'plot', 'narrowing', 'Audition format'),
('A Chorus Line', 'Broadway Musical', 3, 'The show strips away spectacle — just dancers on a line', 'production', 'narrowing', 'Minimalist staging'),
('A Chorus Line', 'Broadway Musical', 3, 'Based on real stories from working Broadway dancers', 'source', 'narrowing', 'Documentary approach'),
('A Chorus Line', 'Broadway Musical', 3, 'Mirrors and headshots line the back wall', 'production', 'narrowing', 'Iconic set element'),

('A Chorus Line', 'Broadway Musical', 4, 'Seventeen dancers compete for eight spots in the chorus', 'plot', 'recognition', 'Very recognizable setup'),
('A Chorus Line', 'Broadway Musical', 4, 'The opening number is "I Hope I Get It"', 'song', 'recognition', 'Famous opener'),
('A Chorus Line', 'Broadway Musical', 4, 'One singular sensation is the climactic number', 'song', 'recognition', 'Iconic finale'),
('A Chorus Line', 'Broadway Musical', 4, 'Cassie, a former star, is auditioning for the chorus — and the director is her ex', 'character', 'recognition', 'Central dramatic tension'),
('A Chorus Line', 'Broadway Musical', 4, 'The dancers step forward on a white line and share monologues', 'iconic_element', 'recognition', 'Signature staging'),
('A Chorus Line', 'Broadway Musical', 4, 'Paul''s monologue about growing up gay is a highlight', 'character', 'recognition', 'Famous scene'),

('A Chorus Line', 'Broadway Musical', 5, 'Features "One," "What I Did for Love," and "I Hope I Get It"', 'song', 'giveaway', 'Definitive song list'),
('A Chorus Line', 'Broadway Musical', 5, 'Zach auditions dancers including Cassie, Paul, Diana, and Val on a bare stage', 'character', 'giveaway', 'Character names'),
('A Chorus Line', 'Broadway Musical', 5, 'Michael Bennett''s musical about Broadway dancers auditioning for a spot in the chorus', 'iconic_element', 'giveaway', 'Full identifier'),
('A Chorus Line', 'Broadway Musical', 5, 'The finale dresses every dancer in identical gold costumes and top hats', 'iconic_element', 'giveaway', 'Unmistakable finale image'),

('A Chorus Line', 'Broadway Musical', 0, 'Bennett recorded 30 hours of interviews with real dancers to create the material', 'interesting_fact', 'fact', 'Research method'),
('A Chorus Line', 'Broadway Musical', 0, 'It ran for 6,137 performances in its original run', 'interesting_fact', 'fact', 'Historic run length'),
('A Chorus Line', 'Broadway Musical', 0, 'Several real dancers whose stories were used in the show appeared in the original cast', 'interesting_fact', 'fact', 'Life imitating art'),


-- ============================================================
-- COMPANY
-- ============================================================
('Company', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many shows set in NYC'),
('Company', 'Broadway Musical', 1, 'Explores themes of love and relationships', 'theme', 'very_broad', 'Universal musical theater themes'),
('Company', 'Broadway Musical', 1, 'Features a contemporary setting at the time of its premiere', 'setting', 'very_broad', 'True of many musicals'),
('Company', 'Broadway Musical', 1, 'Stephen Sondheim wrote the score', 'development', 'very_broad', 'Sondheim wrote many Broadway shows'),
('Company', 'Broadway Musical', 1, 'Premiered in the 1970s', 'production', 'very_broad', 'Many shows opened in this decade'),
('Company', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),

('Company', 'Broadway Musical', 2, 'Considered one of the first concept musicals', 'structure', 'broad', 'A few shows claim this distinction'),
('Company', 'Broadway Musical', 2, 'George Furth wrote the book', 'development', 'broad', 'Furth isn''t widely known outside theater'),
('Company', 'Broadway Musical', 2, 'Hal Prince directed the original production', 'production', 'broad', 'Prince directed many landmark musicals'),
('Company', 'Broadway Musical', 2, 'The 2020 revival gender-swapped the lead role', 'production', 'broad', 'Gender-swapped revivals are increasingly common'),
('Company', 'Broadway Musical', 2, 'The original cast album was produced by Thomas Z. Shepard', 'production', 'broad', 'Shepard produced many cast recordings'),
('Company', 'Broadway Musical', 2, 'Boris Aronson designed the original metallic set with elevators', 'production', 'broad', 'Distinctive design but not widely remembered'),

('Company', 'Broadway Musical', 3, 'The protagonist observes the marriages of friends rather than having a plot arc', 'structure', 'narrowing', 'Unusual structure narrows options'),
('Company', 'Broadway Musical', 3, 'A series of vignettes about couples rather than a linear narrative', 'structure', 'narrowing', 'Concept musical structure'),
('Company', 'Broadway Musical', 3, 'The protagonist celebrates a milestone birthday throughout the show', 'plot', 'narrowing', 'Birthday party framing device'),
('Company', 'Broadway Musical', 3, 'Dean Jones originated the lead on Broadway but left during the run', 'production', 'narrowing', 'Unusual casting history'),
('Company', 'Broadway Musical', 3, 'Features a character who can''t commit to any romantic partner', 'character', 'narrowing', 'Narrows to a few shows about commitment'),
('Company', 'Broadway Musical', 3, 'The show examines marriage from the perspective of the only single person in a friend group', 'theme', 'narrowing', 'Very specific premise'),

('Company', 'Broadway Musical', 4, 'The protagonist''s name is Bobby', 'character', 'recognition', 'Strongly identifies the show'),
('Company', 'Broadway Musical', 4, 'Features the song "Being Alive" as a climactic number', 'song', 'recognition', 'Very well-known Sondheim song'),
('Company', 'Broadway Musical', 4, 'Five married couples try to set up their single friend', 'plot', 'recognition', 'Very recognizable setup'),
('Company', 'Broadway Musical', 4, 'Includes "The Ladies Who Lunch," performed by a jaded older woman', 'song', 'recognition', 'Elaine Stritch''s signature number'),
('Company', 'Broadway Musical', 4, 'Bobby blows out 35 candles on his birthday cake', 'iconic_element', 'recognition', 'Famous image from the show'),
('Company', 'Broadway Musical', 4, 'The 2022 revival starred Katrina Lenk as a female Bobbie', 'production', 'recognition', 'Well-publicized gender-swap revival'),

('Company', 'Broadway Musical', 5, 'Bobby, Joanne, and the married couples explore "Being Alive" and "Side by Side by Side"', 'song', 'giveaway', 'Character names plus iconic songs'),
('Company', 'Broadway Musical', 5, 'Sondheim''s concept musical about a bachelor surrounded by married friends in Manhattan', 'iconic_element', 'giveaway', 'Definitive description'),
('Company', 'Broadway Musical', 5, 'Includes "Another Hundred People," "Getting Married Today," and "Being Alive"', 'song', 'giveaway', 'Unmistakable song combination'),
('Company', 'Broadway Musical', 5, 'The title refers both to the friends who gather and the human need for companionship', 'iconic_element', 'giveaway', 'Title meaning is definitive'),

('Company', 'Broadway Musical', 0, 'Elaine Stritch forgot the lyrics to "The Ladies Who Lunch" during the original cast album recording and her struggled take became legendary', 'interesting_fact', 'fact', 'Famous recording session story documented in D.A. Pennebaker film'),
('Company', 'Broadway Musical', 0, 'The show originally had no intermission but one was added during tryouts', 'interesting_fact', 'fact', 'Structural change during development'),
('Company', 'Broadway Musical', 0, 'The 2006 revival performed the show in a theater configured in the round', 'interesting_fact', 'fact', 'John Doyle''s actors-as-musicians production'),
('Company', 'Broadway Musical', 0, 'Dean Jones left the cast after just one month, replaced by Larry Kert', 'interesting_fact', 'fact', 'Kert had originated Tony in West Side Story'),

-- ============================================================
-- SPRING AWAKENING
-- ============================================================
('Spring Awakening', 'Broadway Musical', 1, 'Based on a classic European play', 'source', 'very_broad', 'Many musicals adapt European plays'),
('Spring Awakening', 'Broadway Musical', 1, 'Features a rock score', 'structure', 'very_broad', 'Several rock musicals on Broadway'),
('Spring Awakening', 'Broadway Musical', 1, 'Deals with teenage characters', 'character', 'very_broad', 'Many shows feature young characters'),
('Spring Awakening', 'Broadway Musical', 1, 'Explores themes of rebellion against authority', 'theme', 'very_broad', 'Common theme in many musicals'),
('Spring Awakening', 'Broadway Musical', 1, 'Premiered in the 2000s', 'production', 'very_broad', 'Many shows opened this decade'),
('Spring Awakening', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),

('Spring Awakening', 'Broadway Musical', 2, 'Based on a play that was banned for decades after it was written', 'source', 'broad', 'Several provocative European plays were censored'),
('Spring Awakening', 'Broadway Musical', 2, 'Duncan Sheik composed the score', 'development', 'broad', 'Sheik was known as an alt-rock singer-songwriter'),
('Spring Awakening', 'Broadway Musical', 2, 'Steven Sater wrote the book and lyrics', 'development', 'broad', 'Sater is not widely known outside theater'),
('Spring Awakening', 'Broadway Musical', 2, 'Michael Mayer directed the original production', 'production', 'broad', 'Mayer directed several Broadway shows'),
('Spring Awakening', 'Broadway Musical', 2, 'The actors use handheld microphones during musical numbers despite the period setting', 'production', 'broad', 'Distinctive staging choice'),
('Spring Awakening', 'Broadway Musical', 2, 'The original production featured minimal scenic design with chairs on a bare stage', 'production', 'broad', 'Minimalist staging is used in several shows'),

('Spring Awakening', 'Broadway Musical', 3, 'Set in 19th-century Germany among repressed adolescents', 'setting', 'narrowing', 'Very specific time and place'),
('Spring Awakening', 'Broadway Musical', 3, 'Based on Frank Wedekind''s 1891 play', 'source', 'narrowing', 'Specific playwright narrows significantly'),
('Spring Awakening', 'Broadway Musical', 3, 'Characters burst into contemporary rock songs that contrast the period costumes', 'structure', 'narrowing', 'Distinctive stylistic choice'),
('Spring Awakening', 'Broadway Musical', 3, 'Deals with sexual awakening, abuse, and suicide among teenagers', 'theme', 'narrowing', 'Very specific thematic combination'),
('Spring Awakening', 'Broadway Musical', 3, 'The adult authority figures are played by two actors doubling multiple roles', 'structure', 'narrowing', 'Specific casting convention'),
('Spring Awakening', 'Broadway Musical', 3, 'A 2015 revival at the Deaf West Theatre featured deaf and hearing actors', 'production', 'narrowing', 'Distinctive revival production'),

('Spring Awakening', 'Broadway Musical', 4, 'A boy is expelled for writing an essay about desire', 'plot', 'recognition', 'Moritz''s storyline is very recognizable'),
('Spring Awakening', 'Broadway Musical', 4, 'Opens with a girl singing "Mama Who Bore Me" about her frustration with her mother''s silence', 'song', 'recognition', 'Very recognizable opening'),
('Spring Awakening', 'Broadway Musical', 4, 'A teenager takes his own life after failing his exams', 'plot', 'recognition', 'Moritz''s tragic arc'),
('Spring Awakening', 'Broadway Musical', 4, 'Features the song "Totally Fucked" — a rare Broadway profanity in a song title', 'song', 'recognition', 'Memorable for its title alone'),
('Spring Awakening', 'Broadway Musical', 4, 'Lea Michele and Jonathan Groff originated the lead roles', 'production', 'recognition', 'Well-known casting'),
('Spring Awakening', 'Broadway Musical', 4, 'German schoolboys and girls explore forbidden feelings through rock anthems', 'iconic_element', 'recognition', 'Very recognizable description'),

('Spring Awakening', 'Broadway Musical', 5, 'Wendla, Melchior, and Moritz navigate adolescence in a repressive society', 'character', 'giveaway', 'Character names are definitive'),
('Spring Awakening', 'Broadway Musical', 5, 'Includes "The Bitch of Living," "Touch Me," and "Mama Who Bore Me"', 'song', 'giveaway', 'Unmistakable song combination'),
('Spring Awakening', 'Broadway Musical', 5, 'Duncan Sheik''s rock musical based on Wedekind''s banned German play about teenage sexuality', 'iconic_element', 'giveaway', 'Definitive description'),
('Spring Awakening', 'Broadway Musical', 5, 'The song "The Word of Your Body" accompanies the young leads'' first physical encounter', 'song', 'giveaway', 'Unmistakable scene and song'),

('Spring Awakening', 'Broadway Musical', 0, 'Wedekind''s original play was banned in Germany until 1906 and not performed in English until 1917', 'interesting_fact', 'fact', 'The source material was considered scandalous for decades'),
('Spring Awakening', 'Broadway Musical', 0, 'Lea Michele and Jonathan Groff became lifelong best friends during the run and later co-starred in Glee', 'interesting_fact', 'fact', 'Off-stage friendship became famous'),
('Spring Awakening', 'Broadway Musical', 0, 'The show won 8 Tony Awards in 2007 despite competing against heavy favorites', 'interesting_fact', 'fact', 'Major awards sweep'),

-- ============================================================
-- GREASE
-- ============================================================
('Grease', 'Broadway Musical', 1, 'Set in the United States', 'setting', 'very_broad', 'Dozens of shows set in the US'),
('Grease', 'Broadway Musical', 1, 'Features a romance at the center of the story', 'plot', 'very_broad', 'Very common plot device'),
('Grease', 'Broadway Musical', 1, 'Premiered in the 1970s', 'production', 'very_broad', 'Many shows opened this decade'),
('Grease', 'Broadway Musical', 1, 'Set in a high school', 'setting', 'very_broad', 'Multiple shows set in schools'),
('Grease', 'Broadway Musical', 1, 'Features an ensemble of young characters', 'character', 'very_broad', 'True of many musicals'),
('Grease', 'Broadway Musical', 1, 'Became a major Hollywood film', 'production', 'very_broad', 'Many musicals were adapted into films'),

('Grease', 'Broadway Musical', 2, 'Originally opened at a small Chicago theater before transferring to Broadway', 'development', 'broad', 'Several shows took this path'),
('Grease', 'Broadway Musical', 2, 'Jim Jacobs and Warren Casey wrote the book, music, and lyrics', 'development', 'broad', 'Not widely known writing team'),
('Grease', 'Broadway Musical', 2, 'The Broadway production ran for over 3,000 performances', 'production', 'broad', 'A few shows achieved this milestone in the 1970s'),
('Grease', 'Broadway Musical', 2, 'Barry Bostwick originated the male lead on Broadway', 'production', 'broad', 'Before his film career'),
('Grease', 'Broadway Musical', 2, 'The show is set in a nostalgic past era that was roughly 20 years before its premiere', 'setting', 'broad', 'Nostalgic period piece concept'),
('Grease', 'Broadway Musical', 2, 'Several songs from the famous film version were not in the original stage show', 'development', 'broad', 'Film adaptations often add songs'),

('Grease', 'Broadway Musical', 3, 'Set in the late 1950s at a suburban American high school', 'setting', 'narrowing', 'Narrows to a small group of shows'),
('Grease', 'Broadway Musical', 3, 'Features rival cliques of boys and girls with matching jackets', 'character', 'narrowing', 'Distinctive character groupings'),
('Grease', 'Broadway Musical', 3, 'A summer romance is tested when the couple reunites at school', 'plot', 'narrowing', 'Specific plot setup'),
('Grease', 'Broadway Musical', 3, 'Includes a drag race as a climactic scene', 'plot', 'narrowing', 'Unusual plot element for musicals'),
('Grease', 'Broadway Musical', 3, 'The score blends doo-wop, rock and roll, and 1950s pop pastiche', 'structure', 'narrowing', 'Very specific musical style'),
('Grease', 'Broadway Musical', 3, 'The 1978 film starring John Travolta became the highest-grossing movie musical at the time', 'production', 'narrowing', 'Strong hint toward the show'),

('Grease', 'Broadway Musical', 4, 'The school is called Rydell High', 'setting', 'recognition', 'Very recognizable setting name'),
('Grease', 'Broadway Musical', 4, 'Features the gangs the T-Birds and the Pink Ladies', 'character', 'recognition', 'Iconic group names'),
('Grease', 'Broadway Musical', 4, 'Includes the song "Summer Nights" about a vacation romance', 'song', 'recognition', 'Very famous song'),
('Grease', 'Broadway Musical', 4, 'The female lead transforms her look in the finale to win back her guy', 'plot', 'recognition', 'Very recognizable ending'),
('Grease', 'Broadway Musical', 4, 'A good girl and a greaser fall in love despite peer pressure', 'character', 'recognition', 'Nearly definitive'),
('Grease', 'Broadway Musical', 4, 'Includes "Greased Lightnin''," a song about souping up a car', 'song', 'recognition', 'Very famous number'),

('Grease', 'Broadway Musical', 5, 'Danny Zuko and Sandy Dumbrowski''s romance at Rydell High', 'character', 'giveaway', 'Character and school names are definitive'),
('Grease', 'Broadway Musical', 5, 'Includes "Summer Nights," "Greased Lightnin''," and "You''re the One That I Want"', 'song', 'giveaway', 'Unmistakable song list'),
('Grease', 'Broadway Musical', 5, 'The T-Birds and Pink Ladies navigate love and cool at a 1950s high school', 'iconic_element', 'giveaway', 'Definitive description'),
('Grease', 'Broadway Musical', 5, 'Features Kenickie, Rizzo, Doody, and Frenchy among the ensemble', 'character', 'giveaway', 'Character names are unmistakable'),

('Grease', 'Broadway Musical', 0, 'The show originally premiered in a converted trolley barn in Chicago in 1971', 'interesting_fact', 'fact', 'Kingston Mines Theatre Company'),
('Grease', 'Broadway Musical', 0, 'The song "You''re the One That I Want" was written specifically for the 1978 film and was not in the stage version', 'interesting_fact', 'fact', 'John Farrar wrote it for the movie'),
('Grease', 'Broadway Musical', 0, 'At the time it closed in 1980, it was the longest-running show in Broadway history', 'interesting_fact', 'fact', 'It held the record before A Chorus Line surpassed it'),

-- ============================================================
-- FIDDLER ON THE ROOF
-- ============================================================
('Fiddler on the Roof', 'Broadway Musical', 1, 'Set in a small village', 'setting', 'very_broad', 'Many shows have small-town settings'),
('Fiddler on the Roof', 'Broadway Musical', 1, 'Based on literary source material', 'source', 'very_broad', 'Many musicals adapt literature'),
('Fiddler on the Roof', 'Broadway Musical', 1, 'Features a large family at the center of the story', 'character', 'very_broad', 'True of many musicals'),
('Fiddler on the Roof', 'Broadway Musical', 1, 'Explores themes of tradition versus change', 'theme', 'very_broad', 'Universal theme in many shows'),
('Fiddler on the Roof', 'Broadway Musical', 1, 'Premiered in the 1960s', 'production', 'very_broad', 'Many shows opened this decade'),
('Fiddler on the Roof', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),

('Fiddler on the Roof', 'Broadway Musical', 2, 'Jerome Robbins directed and choreographed the original production', 'production', 'broad', 'Robbins worked on multiple landmark shows'),
('Fiddler on the Roof', 'Broadway Musical', 2, 'Jerry Bock composed the music and Sheldon Harnick wrote the lyrics', 'development', 'broad', 'Bock and Harnick also wrote She Loves Me'),
('Fiddler on the Roof', 'Broadway Musical', 2, 'Joseph Stein wrote the book', 'development', 'broad', 'Stein is not widely known'),
('Fiddler on the Roof', 'Broadway Musical', 2, 'Based on short stories by Sholem Aleichem', 'source', 'broad', 'Specific literary source'),
('Fiddler on the Roof', 'Broadway Musical', 2, 'The original Broadway run lasted over 3,200 performances', 'production', 'broad', 'Was the longest-running Broadway musical at the time'),
('Fiddler on the Roof', 'Broadway Musical', 2, 'Zero Mostel originated the lead role', 'production', 'broad', 'Mostel was in several shows'),

('Fiddler on the Roof', 'Broadway Musical', 3, 'Set in a Jewish shtetl in Tsarist Russia', 'setting', 'narrowing', 'Very specific setting'),
('Fiddler on the Roof', 'Broadway Musical', 3, 'A father must decide whether to let his daughters marry for love', 'plot', 'narrowing', 'Specific conflict narrows options'),
('Fiddler on the Roof', 'Broadway Musical', 3, 'The community faces an eviction order from the Tsar', 'plot', 'narrowing', 'Historical reference narrows it'),
('Fiddler on the Roof', 'Broadway Musical', 3, 'A poor dairyman talks directly to God throughout the show', 'character', 'narrowing', 'Unusual character device'),
('Fiddler on the Roof', 'Broadway Musical', 3, 'Each of three daughters chooses a progressively more radical husband', 'plot', 'narrowing', 'Very specific plot structure'),
('Fiddler on the Roof', 'Broadway Musical', 3, 'The famous bottle dance at a wedding is a showstopping number', 'iconic_element', 'narrowing', 'Distinctive choreographic moment'),

('Fiddler on the Roof', 'Broadway Musical', 4, 'Opens with a man singing about the importance of traditions in his village', 'song', 'recognition', 'Very recognizable opening'),
('Fiddler on the Roof', 'Broadway Musical', 4, 'A milkman dreams of being wealthy in the song "If I Were a Rich Man"', 'song', 'recognition', 'Iconic song and character'),
('Fiddler on the Roof', 'Broadway Musical', 4, 'The village of Anatevka is the setting', 'setting', 'recognition', 'Specific village name'),
('Fiddler on the Roof', 'Broadway Musical', 4, 'A fiddler balancing on a rooftop serves as a metaphor for the community', 'iconic_element', 'recognition', 'Title image is very recognizable'),
('Fiddler on the Roof', 'Broadway Musical', 4, 'The protagonist has five daughters and worries about finding them husbands', 'character', 'recognition', 'Very strong hint'),
('Fiddler on the Roof', 'Broadway Musical', 4, 'Features the song "Matchmaker, Matchmaker" sung by the daughters', 'song', 'recognition', 'Well-known number'),

('Fiddler on the Roof', 'Broadway Musical', 5, 'Tevye the milkman weighs tradition against love in Anatevka', 'character', 'giveaway', 'Character and place names are definitive'),
('Fiddler on the Roof', 'Broadway Musical', 5, 'Includes "Tradition," "If I Were a Rich Man," and "Sunrise, Sunset"', 'song', 'giveaway', 'Unmistakable song combination'),
('Fiddler on the Roof', 'Broadway Musical', 5, 'Tevye and Golde debate "Do You Love Me?" after 25 years of marriage', 'song', 'giveaway', 'Iconic scene and character names'),
('Fiddler on the Roof', 'Broadway Musical', 5, 'Tzeitel, Hodel, and Chava each choose husbands who challenge their father', 'character', 'giveaway', 'Daughter names are unmistakable'),

('Fiddler on the Roof', 'Broadway Musical', 0, 'Zero Mostel was so dominant in the role that producers worried no one else could play Tevye — but the role has been played by hundreds of actors since', 'interesting_fact', 'fact', 'One of the most iconic roles in musical theater'),
('Fiddler on the Roof', 'Broadway Musical', 0, 'Jerome Robbins spent months researching Eastern European Jewish culture before staging the show', 'interesting_fact', 'fact', 'Extensive cultural research'),
('Fiddler on the Roof', 'Broadway Musical', 0, 'The show was the first musical to surpass 3,000 Broadway performances', 'interesting_fact', 'fact', 'Set the record in 1972'),

-- ============================================================
-- LITTLE SHOP OF HORRORS
-- ============================================================
('Little Shop of Horrors', 'Broadway Musical', 1, 'Based on a film', 'source', 'very_broad', 'Many musicals adapt films'),
('Little Shop of Horrors', 'Broadway Musical', 1, 'Features a sci-fi or fantasy element', 'plot', 'very_broad', 'Several musicals include fantasy elements'),
('Little Shop of Horrors', 'Broadway Musical', 1, 'Premiered Off-Broadway', 'production', 'very_broad', 'Many shows start Off-Broadway'),
('Little Shop of Horrors', 'Broadway Musical', 1, 'Features a romantic subplot', 'plot', 'very_broad', 'Very common in musicals'),
('Little Shop of Horrors', 'Broadway Musical', 1, 'The protagonist is a downtrodden underdog', 'character', 'very_broad', 'Common character archetype'),
('Little Shop of Horrors', 'Broadway Musical', 1, 'Explores themes of ambition and its consequences', 'theme', 'very_broad', 'Universal theme'),

('Little Shop of Horrors', 'Broadway Musical', 2, 'Alan Menken composed the score', 'development', 'broad', 'Menken wrote many famous scores'),
('Little Shop of Horrors', 'Broadway Musical', 2, 'Howard Ashman wrote the lyrics and book', 'development', 'broad', 'Ashman is known for several projects'),
('Little Shop of Horrors', 'Broadway Musical', 2, 'Based on a low-budget 1960 Roger Corman film', 'source', 'broad', 'Corman made many B-movies'),
('Little Shop of Horrors', 'Broadway Musical', 2, 'Originally produced at the WPA Theatre Off-Broadway in 1982', 'development', 'broad', 'Specific venue but not widely known'),
('Little Shop of Horrors', 'Broadway Musical', 2, 'The score is influenced by early 1960s girl-group pop and doo-wop', 'structure', 'broad', 'Distinctive but not immediately identifying'),
('Little Shop of Horrors', 'Broadway Musical', 2, 'A Greek chorus of three women narrate and comment on the action', 'structure', 'broad', 'Greek chorus device used in several shows'),

('Little Shop of Horrors', 'Broadway Musical', 3, 'Set in a run-down flower shop in a rough urban neighborhood', 'setting', 'narrowing', 'Very specific setting'),
('Little Shop of Horrors', 'Broadway Musical', 3, 'A meek shop assistant discovers a strange plant that changes his life', 'plot', 'narrowing', 'Narrows significantly'),
('Little Shop of Horrors', 'Broadway Musical', 3, 'The plant grows larger and more demanding as the story progresses', 'plot', 'narrowing', 'Very distinctive plot element'),
('Little Shop of Horrors', 'Broadway Musical', 3, 'A sadistic dentist serves as the villain', 'character', 'narrowing', 'Unusual character role'),
('Little Shop of Horrors', 'Broadway Musical', 3, 'The 1986 film version starred Rick Moranis and Steve Martin', 'production', 'narrowing', 'Strong hint through cast'),
('Little Shop of Horrors', 'Broadway Musical', 3, 'The plant has an extraterrestrial origin', 'plot', 'narrowing', 'Sci-fi element narrows options'),

('Little Shop of Horrors', 'Broadway Musical', 4, 'A man-eating plant demands to be fed', 'character', 'recognition', 'Very recognizable concept'),
('Little Shop of Horrors', 'Broadway Musical', 4, 'The plant is discovered after a total eclipse of the sun', 'plot', 'recognition', 'Distinctive origin story'),
('Little Shop of Horrors', 'Broadway Musical', 4, 'Set on Skid Row, where the characters dream of escape', 'setting', 'recognition', 'Famous setting and song'),
('Little Shop of Horrors', 'Broadway Musical', 4, 'The plant can talk and sing, growing from a small pot to a massive puppet', 'character', 'recognition', 'Unmistakable staging'),
('Little Shop of Horrors', 'Broadway Musical', 4, 'Features the song "Suddenly Seymour"', 'song', 'recognition', 'Very well-known song'),
('Little Shop of Horrors', 'Broadway Musical', 4, 'The plant''s signature line is a demand for food', 'iconic_element', 'recognition', 'Famous catchphrase reference'),

('Little Shop of Horrors', 'Broadway Musical', 5, 'Seymour Krelborn feeds a man-eating plant named Audrey II', 'character', 'giveaway', 'Character names are definitive'),
('Little Shop of Horrors', 'Broadway Musical', 5, 'Includes "Feed Me (Git It)," "Somewhere That''s Green," and "Suddenly Seymour"', 'song', 'giveaway', 'Unmistakable song combination'),
('Little Shop of Horrors', 'Broadway Musical', 5, 'Seymour names the plant after his crush Audrey and it cries "Feed me!"', 'iconic_element', 'giveaway', 'Definitive character and line'),
('Little Shop of Horrors', 'Broadway Musical', 5, 'A carnivorous alien plant from outer space takes over a Skid Row flower shop', 'plot', 'giveaway', 'Unmistakable plot summary'),

('Little Shop of Horrors', 'Broadway Musical', 0, 'The original Off-Broadway production ran for five years and over 2,200 performances', 'interesting_fact', 'fact', 'Massive Off-Broadway success'),
('Little Shop of Horrors', 'Broadway Musical', 0, 'The original Roger Corman film was shot in just two days', 'interesting_fact', 'fact', 'Legendarily fast production'),
('Little Shop of Horrors', 'Broadway Musical', 0, 'The 1986 film originally had a dark ending like the stage show, but test audiences rejected it and a happy ending was shot', 'interesting_fact', 'fact', 'The original dark ending was later restored on home video'),
('Little Shop of Horrors', 'Broadway Musical', 0, 'Howard Ashman and Alan Menken went on to write the songs for The Little Mermaid and Beauty and the Beast', 'interesting_fact', 'fact', 'Legendary Disney partnership began here'),

-- ============================================================
-- MOULIN ROUGE!
-- ============================================================
('Moulin Rouge!', 'Broadway Musical', 1, 'Set in Europe', 'setting', 'very_broad', 'Many shows set in Europe'),
('Moulin Rouge!', 'Broadway Musical', 1, 'Based on a film', 'source', 'very_broad', 'Many musicals adapt films'),
('Moulin Rouge!', 'Broadway Musical', 1, 'Features a love story at its center', 'plot', 'very_broad', 'Very common in musicals'),
('Moulin Rouge!', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('Moulin Rouge!', 'Broadway Musical', 1, 'Features lavish, immersive scenic design', 'production', 'very_broad', 'True of many spectacle shows'),
('Moulin Rouge!', 'Broadway Musical', 1, 'Uses popular songs rather than an original score', 'structure', 'very_broad', 'Several jukebox musicals do this'),

('Moulin Rouge!', 'Broadway Musical', 2, 'Alex Timbers directed the stage adaptation', 'production', 'broad', 'Timbers has directed multiple Broadway shows'),
('Moulin Rouge!', 'Broadway Musical', 2, 'The stage version incorporates over 70 songs from various artists and eras', 'structure', 'broad', 'Distinctive mashup approach'),
('Moulin Rouge!', 'Broadway Musical', 2, 'Derek McLane''s scenic design transforms the entire theater into the world of the show', 'production', 'broad', 'Immersive design is used in several shows'),
('Moulin Rouge!', 'Broadway Musical', 2, 'Premiered at the Emerson Colonial Theatre in Boston before Broadway', 'development', 'broad', 'Common out-of-town tryout'),
('Moulin Rouge!', 'Broadway Musical', 2, 'Based on a Baz Luhrmann film from 2001', 'source', 'broad', 'Luhrmann connection'),
('Moulin Rouge!', 'Broadway Musical', 2, 'Aaron Tveit originated the male lead on Broadway', 'production', 'broad', 'Tveit has been in multiple shows'),

('Moulin Rouge!', 'Broadway Musical', 3, 'Set in the Montmartre district of Paris at the turn of the 20th century', 'setting', 'narrowing', 'Very specific setting'),
('Moulin Rouge!', 'Broadway Musical', 3, 'A poet falls in love with the star of a famous nightclub', 'plot', 'narrowing', 'Narrows significantly'),
('Moulin Rouge!', 'Broadway Musical', 3, 'The heroine is a courtesan who is secretly ill', 'character', 'narrowing', 'Echoes La Traviata/Camille traditions'),
('Moulin Rouge!', 'Broadway Musical', 3, 'A wealthy duke threatens the lovers'' relationship', 'plot', 'narrowing', 'Love triangle with aristocrat'),
('Moulin Rouge!', 'Broadway Musical', 3, 'The production design is maximalist, with a giant heart-shaped set piece', 'production', 'narrowing', 'Distinctive visual element'),
('Moulin Rouge!', 'Broadway Musical', 3, 'The show mashes up pop hits from Elton John, Whitney Houston, Katy Perry, and dozens more', 'structure', 'narrowing', 'Specific mashup approach'),

('Moulin Rouge!', 'Broadway Musical', 4, 'Set in the most famous cabaret in Paris, circa 1899', 'setting', 'recognition', 'Nearly definitive setting'),
('Moulin Rouge!', 'Broadway Musical', 4, 'The bohemian ideals are "truth, beauty, freedom, and love"', 'iconic_element', 'recognition', 'Very recognizable motto'),
('Moulin Rouge!', 'Broadway Musical', 4, 'Features a "Roxanne" tango sequence', 'song', 'recognition', 'Iconic number from the source film'),
('Moulin Rouge!', 'Broadway Musical', 4, 'A young writer joins a band of bohemian artists', 'character', 'recognition', 'Recognizable protagonist type'),
('Moulin Rouge!', 'Broadway Musical', 4, 'The nightclub''s giant windmill and red decor are its signature', 'iconic_element', 'recognition', 'Unmistakable visual identity'),
('Moulin Rouge!', 'Broadway Musical', 4, 'A doomed love affair between a writer and the club''s star performer', 'plot', 'recognition', 'Very recognizable'),

('Moulin Rouge!', 'Broadway Musical', 5, 'Christian and Satine''s tragic love story at the famous Parisian nightclub', 'character', 'giveaway', 'Character names are definitive'),
('Moulin Rouge!', 'Broadway Musical', 5, 'Baz Luhrmann''s jukebox spectacular set in 1899 Montmartre', 'iconic_element', 'giveaway', 'Definitive description'),
('Moulin Rouge!', 'Broadway Musical', 5, 'Features "Come What May," "Elephant Love Medley," and a mashup of pop hits spanning decades', 'song', 'giveaway', 'Unmistakable songs'),
('Moulin Rouge!', 'Broadway Musical', 5, 'The Duke, Toulouse-Lautrec, and the Diamond Dogs populate this cabaret world', 'character', 'giveaway', 'Character names are definitive'),

('Moulin Rouge!', 'Broadway Musical', 0, 'The stage version updates the film''s soundtrack to include songs released after 2001 like "Chandelier" and "Bad Romance"', 'interesting_fact', 'fact', 'Constantly updated song list'),
('Moulin Rouge!', 'Broadway Musical', 0, 'The Al Hirschfeld Theatre was physically transformed with red curtains, heart shapes, and a windmill for the production', 'interesting_fact', 'fact', 'One of the most dramatic theater makeovers in Broadway history'),
('Moulin Rouge!', 'Broadway Musical', 0, 'Aaron Tveit won the Tony for Best Actor in a Musical in 2020 as the only nominee in the category due to the pandemic-shortened season', 'interesting_fact', 'fact', 'Unusual solo nomination'),

-- ============================================================
-- SIX
-- ============================================================
('Six', 'Broadway Musical', 1, 'Based on historical figures', 'source', 'very_broad', 'Many shows feature historical characters'),
('Six', 'Broadway Musical', 1, 'Features an all-female principal cast', 'character', 'very_broad', 'Several shows feature all-female casts'),
('Six', 'Broadway Musical', 1, 'Uses contemporary pop music styles', 'structure', 'very_broad', 'Multiple modern musicals do this'),
('Six', 'Broadway Musical', 1, 'Premiered in the UK before Broadway', 'production', 'very_broad', 'Many British imports'),
('Six', 'Broadway Musical', 1, 'Runs without an intermission', 'structure', 'very_broad', 'Many shorter musicals have no intermission'),
('Six', 'Broadway Musical', 1, 'Won the Tony Award for Best Original Score', 'production', 'very_broad', 'Many shows have won this award'),

('Six', 'Broadway Musical', 2, 'Created by Toby Marlow and Lucy Moss while students at Cambridge University', 'development', 'broad', 'Unusual origin but doesn''t identify the show'),
('Six', 'Broadway Musical', 2, 'Originally performed at the Edinburgh Festival Fringe', 'development', 'broad', 'Many shows debut at Edinburgh'),
('Six', 'Broadway Musical', 2, 'Structured as a pop concert rather than a traditional musical', 'structure', 'broad', 'Concert format used in a few shows'),
('Six', 'Broadway Musical', 2, 'The show is approximately 80 minutes with no intermission', 'structure', 'broad', 'Several short musicals'),
('Six', 'Broadway Musical', 2, 'Each performer''s musical style is inspired by a different pop diva', 'structure', 'broad', 'Specific concept but not immediately identifying'),
('Six', 'Broadway Musical', 2, 'Lucy Moss became one of the youngest women to direct a Broadway musical', 'production', 'broad', 'Notable but not identifying'),

('Six', 'Broadway Musical', 3, 'Set in the court of a famous English king', 'setting', 'narrowing', 'Narrows to a few shows about royalty'),
('Six', 'Broadway Musical', 3, 'Historical women reclaim their narratives in a modern format', 'theme', 'narrowing', 'Specific feminist reframing'),
('Six', 'Broadway Musical', 3, 'The characters compete to determine who had the worst experience', 'plot', 'narrowing', 'Unusual competition structure'),
('Six', 'Broadway Musical', 3, 'Each character''s song is inspired by a different modern pop artist like Beyonce, Adele, or Ariana Grande', 'structure', 'narrowing', 'Very specific musical concept'),
('Six', 'Broadway Musical', 3, 'The Broadway opening was delayed by over two years due to the pandemic', 'production', 'narrowing', 'Was scheduled for March 12, 2020'),
('Six', 'Broadway Musical', 3, 'The show reimagines Tudor-era women as pop stars', 'iconic_element', 'narrowing', 'Strong hint toward the concept'),

('Six', 'Broadway Musical', 4, 'Structured around the rhyme "divorced, beheaded, died, divorced, beheaded, survived"', 'iconic_element', 'recognition', 'Very recognizable mnemonic'),
('Six', 'Broadway Musical', 4, 'The women were all married to the same king', 'plot', 'recognition', 'Nearly definitive'),
('Six', 'Broadway Musical', 4, 'Each queen performs a solo pop anthem about her life', 'structure', 'recognition', 'Very recognizable format'),
('Six', 'Broadway Musical', 4, 'Features the song "Ex-Wives" as the opening number', 'song', 'recognition', 'Well-known opening'),
('Six', 'Broadway Musical', 4, 'The cast wears Tudor-inspired costumes remixed with modern pop-star fashion', 'iconic_element', 'recognition', 'Distinctive visual style'),
('Six', 'Broadway Musical', 4, 'The show ends with the queens deciding not to compete but to celebrate together', 'plot', 'recognition', 'Recognizable resolution'),

('Six', 'Broadway Musical', 5, 'Catherine of Aragon, Anne Boleyn, Jane Seymour, Anna of Cleves, Katherine Howard, and Catherine Parr take the stage', 'character', 'giveaway', 'All six queens named'),
('Six', 'Broadway Musical', 5, 'Henry VIII''s six wives tell their stories as a pop concert', 'iconic_element', 'giveaway', 'Definitive description'),
('Six', 'Broadway Musical', 5, 'Includes "Don''t Lose Ur Head," "Heart of Stone," and "Six"', 'song', 'giveaway', 'Unmistakable songs'),
('Six', 'Broadway Musical', 5, 'The queens'' fates — divorced, beheaded, died, divorced, beheaded, survived — structure the show', 'iconic_element', 'giveaway', 'Unmistakable'),

('Six', 'Broadway Musical', 0, 'The show''s Broadway opening night was canceled on March 12, 2020 — the night Broadway shut down for the pandemic', 'interesting_fact', 'fact', 'The cast had just finished their opening number at the press preview'),
('Six', 'Broadway Musical', 0, 'The show was originally created as a student project for a university musical theater course', 'interesting_fact', 'fact', 'Cambridge University origin'),
('Six', 'Broadway Musical', 0, 'Each queen''s pop style references a specific artist: Beyonce, Lily Allen, Adele, Nicki Minaj, Ariana Grande, and Alicia Keys', 'interesting_fact', 'fact', 'Intentional pop diva parallels'),

-- ============================================================
-- MEAN GIRLS
-- ============================================================
('Mean Girls', 'Broadway Musical', 1, 'Based on a film', 'source', 'very_broad', 'Many musicals adapt films'),
('Mean Girls', 'Broadway Musical', 1, 'Set in an American high school', 'setting', 'very_broad', 'Multiple shows set in schools'),
('Mean Girls', 'Broadway Musical', 1, 'Features a contemporary setting', 'setting', 'very_broad', 'Many modern musicals'),
('Mean Girls', 'Broadway Musical', 1, 'Deals with themes of popularity and social hierarchy', 'theme', 'very_broad', 'Common theme in youth-oriented shows'),
('Mean Girls', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows opened this decade'),
('Mean Girls', 'Broadway Musical', 1, 'Features a female ensemble', 'character', 'very_broad', 'True of many musicals'),

('Mean Girls', 'Broadway Musical', 2, 'Tina Fey wrote the book for the musical', 'development', 'broad', 'Fey is famous but this doesn''t confirm which show'),
('Mean Girls', 'Broadway Musical', 2, 'Jeff Richmond composed the music', 'development', 'broad', 'Richmond isn''t widely known outside TV'),
('Mean Girls', 'Broadway Musical', 2, 'Nell Benjamin wrote the lyrics', 'development', 'broad', 'Benjamin also wrote Legally Blonde lyrics'),
('Mean Girls', 'Broadway Musical', 2, 'Casey Nicholaw directed and choreographed', 'production', 'broad', 'Nicholaw has directed many Broadway shows'),
('Mean Girls', 'Broadway Musical', 2, 'The scenic design used LED screens extensively instead of physical sets', 'production', 'broad', 'Increasingly common in modern productions'),
('Mean Girls', 'Broadway Musical', 2, 'The source film has become one of the most quoted comedies of the 2000s', 'source', 'broad', 'Doesn''t directly identify the musical'),

('Mean Girls', 'Broadway Musical', 3, 'A homeschooled girl enters a public high school and navigates social cliques', 'plot', 'narrowing', 'Very specific premise'),
('Mean Girls', 'Broadway Musical', 3, 'The protagonist was raised in Africa before moving to suburban America', 'character', 'narrowing', 'Distinctive backstory'),
('Mean Girls', 'Broadway Musical', 3, 'A trio of popular girls rules the school with strict social rules', 'character', 'narrowing', 'Specific character dynamic'),
('Mean Girls', 'Broadway Musical', 3, 'The protagonist infiltrates the popular clique as a spy for her outcast friends', 'plot', 'narrowing', 'Very narrowing plot point'),
('Mean Girls', 'Broadway Musical', 3, 'Features a "revenge plot" that involves a book of secrets about classmates', 'plot', 'narrowing', 'Distinctive plot device'),
('Mean Girls', 'Broadway Musical', 3, 'Based on a 2004 Paramount comedy that became a cultural touchstone', 'source', 'narrowing', 'Very strong hint'),

('Mean Girls', 'Broadway Musical', 4, 'The Plastics are the most feared clique in school', 'character', 'recognition', 'Very recognizable group name'),
('Mean Girls', 'Broadway Musical', 4, 'Features the rule "On Wednesdays we wear pink"', 'iconic_element', 'recognition', 'Unmistakable line'),
('Mean Girls', 'Broadway Musical', 4, 'A Burn Book full of gossip about every girl in school drives the conflict', 'plot', 'recognition', 'Iconic plot device'),
('Mean Girls', 'Broadway Musical', 4, 'The new girl goes from outsider to queen bee to outcast', 'plot', 'recognition', 'Very recognizable arc'),
('Mean Girls', 'Broadway Musical', 4, 'The tagline "That''s so fetch" becomes a running joke', 'iconic_element', 'recognition', 'Famous catchphrase'),
('Mean Girls', 'Broadway Musical', 4, 'Includes a talent show performance of "Jingle Bell Rock" that goes wrong', 'plot', 'recognition', 'Iconic scene'),

('Mean Girls', 'Broadway Musical', 5, 'Cady Heron infiltrates Regina George''s Plastics at North Shore High School', 'character', 'giveaway', 'Character names are definitive'),
('Mean Girls', 'Broadway Musical', 5, 'Tina Fey''s musical adaptation of the 2004 teen comedy', 'iconic_element', 'giveaway', 'Definitive description'),
('Mean Girls', 'Broadway Musical', 5, 'Includes "Apex Predator," "Stupid with Love," and "Meet the Plastics"', 'song', 'giveaway', 'Unmistakable songs'),
('Mean Girls', 'Broadway Musical', 5, 'Regina, Gretchen, Karen, and Cady navigate North Shore High', 'character', 'giveaway', 'Character names are unmistakable'),

('Mean Girls', 'Broadway Musical', 0, 'The musical opened on Broadway in 2018 but was adapted into a movie musical in 2024 with a new cast', 'interesting_fact', 'fact', 'Unusual film-to-stage-to-film pipeline'),
('Mean Girls', 'Broadway Musical', 0, 'Tina Fey based the original 2004 film on Rosalind Wiseman''s non-fiction book Queen Bees and Wannabes', 'interesting_fact', 'fact', 'Non-fiction parenting book as source material'),
('Mean Girls', 'Broadway Musical', 0, 'October 3rd has become an unofficial fan holiday because of a line in the original film', 'interesting_fact', 'fact', '"On October 3rd, he asked me what day it was"'),

-- ============================================================
-- COME FROM AWAY
-- ============================================================
('Come From Away', 'Broadway Musical', 1, 'Based on a true story', 'source', 'very_broad', 'Many musicals are based on true events'),
('Come From Away', 'Broadway Musical', 1, 'Set in a small town', 'setting', 'very_broad', 'Many shows set in small communities'),
('Come From Away', 'Broadway Musical', 1, 'Features an ensemble cast with no single lead', 'structure', 'very_broad', 'True of many ensemble shows'),
('Come From Away', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows opened this decade'),
('Come From Away', 'Broadway Musical', 1, 'Uses folk and Celtic-influenced music', 'structure', 'very_broad', 'Several shows use folk-inspired scores'),
('Come From Away', 'Broadway Musical', 1, 'Runs without an intermission', 'structure', 'very_broad', 'Several shorter musicals have no intermission'),

('Come From Away', 'Broadway Musical', 2, 'Irene Sankoff and David Hein wrote the book, music, and lyrics', 'development', 'broad', 'Husband-and-wife team not widely known'),
('Come From Away', 'Broadway Musical', 2, 'Christopher Ashley directed the original production', 'production', 'broad', 'Ashley has directed several shows'),
('Come From Away', 'Broadway Musical', 2, 'The cast of 12 plays multiple roles, switching characters with simple costume pieces', 'structure', 'broad', 'Multi-role casting is used in several shows'),
('Come From Away', 'Broadway Musical', 2, 'The writers spent years interviewing real people for the script', 'development', 'broad', 'Documentary-style research'),
('Come From Away', 'Broadway Musical', 2, 'Developed at multiple regional theaters before reaching Broadway', 'development', 'broad', 'Common development path'),
('Come From Away', 'Broadway Musical', 2, 'Tables and chairs are the primary set pieces, rearranged to create different locations', 'production', 'broad', 'Minimalist staging used in many shows'),

('Come From Away', 'Broadway Musical', 3, 'Set in a Canadian town during a national emergency', 'setting', 'narrowing', 'Narrows the possibilities significantly'),
('Come From Away', 'Broadway Musical', 3, 'Thousands of stranded travelers are taken in by a small community', 'plot', 'narrowing', 'Very specific premise'),
('Come From Away', 'Broadway Musical', 3, 'Set in September 2001', 'setting', 'narrowing', 'Very specific time period'),
('Come From Away', 'Broadway Musical', 3, 'Planes are diverted to a remote airport in Newfoundland', 'plot', 'narrowing', 'Very distinctive plot point'),
('Come From Away', 'Broadway Musical', 3, 'The story focuses on hospitality and human connection during crisis', 'theme', 'narrowing', 'Specific thematic focus'),
('Come From Away', 'Broadway Musical', 3, 'Characters include pilots, townspeople, and passengers from around the world', 'character', 'narrowing', 'Distinctive character mix'),

('Come From Away', 'Broadway Musical', 4, 'Set in Gander, Newfoundland after American airspace was closed', 'setting', 'recognition', 'Very specific and recognizable'),
('Come From Away', 'Broadway Musical', 4, '38 planes land in a town of fewer than 10,000 people', 'plot', 'recognition', 'Very recognizable detail'),
('Come From Away', 'Broadway Musical', 4, 'Opens with the line "Welcome to the Rock"', 'song', 'recognition', 'Famous opening'),
('Come From Away', 'Broadway Musical', 4, 'The September 12th perspective — what happened elsewhere while the world watched New York', 'theme', 'recognition', 'Distinctive point of view'),
('Come From Away', 'Broadway Musical', 4, 'Nearly 7,000 passengers are housed by local residents', 'plot', 'recognition', 'Well-known detail'),
('Come From Away', 'Broadway Musical', 4, 'A budding romance between a Texan divorcee and a Newfoundland local', 'character', 'recognition', 'Central relationship'),

('Come From Away', 'Broadway Musical', 5, 'Gander, Newfoundland residents host 7,000 stranded passengers after 9/11', 'plot', 'giveaway', 'Definitive description'),
('Come From Away', 'Broadway Musical', 5, 'Includes "Welcome to the Rock," "Me and the Sky," and "Screech In"', 'song', 'giveaway', 'Unmistakable songs'),
('Come From Away', 'Broadway Musical', 5, 'Beverley Bass, the first female American Airlines captain, is a character in the show', 'character', 'giveaway', 'Unmistakable real person'),
('Come From Away', 'Broadway Musical', 5, 'The "screech-in" ceremony — kissing a cod to become an honorary Newfoundlander — is a highlight', 'iconic_element', 'giveaway', 'Unmistakable cultural detail'),

('Come From Away', 'Broadway Musical', 0, 'The real Beverley Bass attended dozens of performances and became close friends with the actress who plays her', 'interesting_fact', 'fact', 'Real-life connection to the show'),
('Come From Away', 'Broadway Musical', 0, 'The writers first visited Gander for the tenth anniversary of 9/11 and interviewed locals and returning passengers', 'interesting_fact', 'fact', '2011 research trip'),
('Come From Away', 'Broadway Musical', 0, 'A filmed version of the Broadway production was released on Apple TV+ in 2021', 'interesting_fact', 'fact', 'Pandemic-era filmed stage production'),

-- ============================================================
-- ANNIE
-- ============================================================
('Annie', 'Broadway Musical', 1, 'Based on a comic strip', 'source', 'very_broad', 'Several musicals adapt comic strips'),
('Annie', 'Broadway Musical', 1, 'Features a child protagonist', 'character', 'very_broad', 'Several musicals have child leads'),
('Annie', 'Broadway Musical', 1, 'Set in the United States', 'setting', 'very_broad', 'Dozens of shows set in the US'),
('Annie', 'Broadway Musical', 1, 'Premiered in the 1970s', 'production', 'very_broad', 'Many shows opened this decade'),
('Annie', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('Annie', 'Broadway Musical', 1, 'Became a major Hollywood film', 'production', 'very_broad', 'Many musicals were adapted into films'),

('Annie', 'Broadway Musical', 2, 'Charles Strouse composed the music and Martin Charnin wrote the lyrics', 'development', 'broad', 'Strouse also wrote Bye Bye Birdie'),
('Annie', 'Broadway Musical', 2, 'Thomas Meehan wrote the book', 'development', 'broad', 'Meehan also wrote The Producers and Hairspray'),
('Annie', 'Broadway Musical', 2, 'Based on Harold Gray''s comic strip "Little Orphan Annie"', 'source', 'broad', 'Specific source but could be trivia'),
('Annie', 'Broadway Musical', 2, 'Mike Nichols was originally attached to direct but left the project', 'development', 'broad', 'Development trivia'),
('Annie', 'Broadway Musical', 2, 'The show features a live dog on stage', 'production', 'broad', 'A few shows use live animals'),
('Annie', 'Broadway Musical', 2, 'Andrea McArdle originated the title role after the original child actress was replaced', 'production', 'broad', 'Casting change during development'),

('Annie', 'Broadway Musical', 3, 'Set during the Great Depression in New York City', 'setting', 'narrowing', 'Narrows to a few shows'),
('Annie', 'Broadway Musical', 3, 'An orphan escapes a cruel caretaker and finds a wealthy benefactor', 'plot', 'narrowing', 'Specific rags-to-riches story'),
('Annie', 'Broadway Musical', 3, 'President Franklin D. Roosevelt appears as a character', 'character', 'narrowing', 'Unusual cameo narrows options'),
('Annie', 'Broadway Musical', 3, 'A billionaire invites an orphan to stay at his mansion for Christmas', 'plot', 'narrowing', 'Very distinctive setup'),
('Annie', 'Broadway Musical', 3, 'The villain runs a group home for children and drinks heavily', 'character', 'narrowing', 'Specific character description'),
('Annie', 'Broadway Musical', 3, 'A dog named Sandy plays a key role', 'character', 'narrowing', 'Distinctive animal character'),

('Annie', 'Broadway Musical', 4, 'A red-haired orphan sings about a brighter future', 'character', 'recognition', 'Very recognizable image'),
('Annie', 'Broadway Musical', 4, 'The optimistic anthem "Tomorrow" became a pop standard', 'song', 'recognition', 'Extremely well-known song'),
('Annie', 'Broadway Musical', 4, 'The orphans sing about their difficult life in the orphanage', 'song', 'recognition', 'Well-known opening number'),
('Annie', 'Broadway Musical', 4, 'A bald billionaire becomes a father figure', 'character', 'recognition', 'Very recognizable character'),
('Annie', 'Broadway Musical', 4, 'The villain tries to pose fake parents to claim a reward', 'plot', 'recognition', 'Recognizable scheme'),
('Annie', 'Broadway Musical', 4, 'Features the song "It''s the Hard Knock Life"', 'song', 'recognition', 'Very famous number'),

('Annie', 'Broadway Musical', 5, 'Little orphan Annie is adopted by Daddy Warbucks', 'character', 'giveaway', 'Character names are definitive'),
('Annie', 'Broadway Musical', 5, 'Includes "Tomorrow," "It''s the Hard Knock Life," and "Maybe"', 'song', 'giveaway', 'Unmistakable songs'),
('Annie', 'Broadway Musical', 5, 'Miss Hannigan, Rooster, and Lily scheme against the curly-haired orphan', 'character', 'giveaway', 'Character names are definitive'),
('Annie', 'Broadway Musical', 5, 'The sun''ll come out tomorrow for this red-haired optimist', 'iconic_element', 'giveaway', 'Unmistakable catchphrase and description'),

('Annie', 'Broadway Musical', 0, 'The role of Sandy the dog is traditionally played by a rescue mutt from a shelter', 'interesting_fact', 'fact', 'Art imitating life'),
('Annie', 'Broadway Musical', 0, 'Jay-Z sampled "It''s the Hard Knock Life" for his 1998 hit "Hard Knock Life (Ghetto Anthem)"', 'interesting_fact', 'fact', 'Broadway-to-hip-hop crossover'),
('Annie', 'Broadway Musical', 0, 'The show has been adapted into three major films: 1982, 1999, and 2014', 'interesting_fact', 'fact', 'Multiple film versions'),

-- ============================================================
-- CATS
-- ============================================================
('Cats', 'Broadway Musical', 1, 'Adapted from poetry', 'source', 'very_broad', 'A few musicals adapt poetry'),
('Cats', 'Broadway Musical', 1, 'Andrew Lloyd Webber composed the score', 'development', 'very_broad', 'ALW wrote many shows'),
('Cats', 'Broadway Musical', 1, 'Premiered in the West End before Broadway', 'production', 'very_broad', 'Many British imports'),
('Cats', 'Broadway Musical', 1, 'Features extensive dance and choreography', 'structure', 'very_broad', 'True of many musicals'),
('Cats', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('Cats', 'Broadway Musical', 1, 'Ran for many years on Broadway', 'production', 'very_broad', 'Several long-running shows'),

('Cats', 'Broadway Musical', 2, 'Based on T.S. Eliot''s poetry collection', 'source', 'broad', 'Specific source but not widely known'),
('Cats', 'Broadway Musical', 2, 'Cameron Mackintosh produced the original production', 'production', 'broad', 'Mackintosh produced many shows'),
('Cats', 'Broadway Musical', 2, 'Gillian Lynne choreographed the original production', 'production', 'broad', 'Lynne is known for multiple shows'),
('Cats', 'Broadway Musical', 2, 'Trevor Nunn directed the original London and Broadway productions', 'production', 'broad', 'Nunn directed several major musicals'),
('Cats', 'Broadway Musical', 2, 'The show has virtually no traditional plot or dialogue', 'structure', 'broad', 'Unusual structure but not unique'),
('Cats', 'Broadway Musical', 2, 'John Napier''s set design transforms the entire theater into a larger-than-life environment', 'production', 'broad', 'Immersive design used in a few shows'),

('Cats', 'Broadway Musical', 3, 'Based on "Old Possum''s Book of Practical Cats" by T.S. Eliot', 'source', 'narrowing', 'Very specific literary source'),
('Cats', 'Broadway Musical', 3, 'Each character is introduced with a solo number describing their personality', 'structure', 'narrowing', 'Revue-like character showcase structure'),
('Cats', 'Broadway Musical', 3, 'Set in a junkyard at night', 'setting', 'narrowing', 'Very distinctive setting'),
('Cats', 'Broadway Musical', 3, 'A tribe gathers annually for a special ceremony to choose one member for rebirth', 'plot', 'narrowing', 'Very specific plot framework'),
('Cats', 'Broadway Musical', 3, 'The performers wear full-body unitards with painted fur patterns', 'iconic_element', 'narrowing', 'Distinctive costuming'),
('Cats', 'Broadway Musical', 3, 'The set includes oversized props to make actors appear cat-sized', 'production', 'narrowing', 'Distinctive scenic concept'),

('Cats', 'Broadway Musical', 4, 'Features the song "Memory," one of the most recorded show tunes in history', 'song', 'recognition', 'Extremely well-known ballad'),
('Cats', 'Broadway Musical', 4, 'A tribe of felines gathers for the annual Jellicle Ball', 'plot', 'recognition', 'Very recognizable term'),
('Cats', 'Broadway Musical', 4, 'One old, glamorous cat sings about her faded glory and hopes for a new life', 'character', 'recognition', 'Grizabella''s arc is very recognizable'),
('Cats', 'Broadway Musical', 4, 'The chosen one ascends to the Heaviside Layer', 'plot', 'recognition', 'Unique to this show'),
('Cats', 'Broadway Musical', 4, 'Characters include a magical conjuring cat and a criminal mastermind cat', 'character', 'recognition', 'Mr. Mistoffelees and Macavity'),
('Cats', 'Broadway Musical', 4, 'A disgraced diva begs to be accepted back by the tribe', 'character', 'recognition', 'Grizabella''s return'),

('Cats', 'Broadway Musical', 5, 'Grizabella sings "Memory" at the Jellicle Ball and ascends to the Heaviside Layer', 'character', 'giveaway', 'Character name, song, and concept are definitive'),
('Cats', 'Broadway Musical', 5, 'Old Deuteronomy chooses which Jellicle cat will be reborn', 'character', 'giveaway', 'Character names are unmistakable'),
('Cats', 'Broadway Musical', 5, 'Features Rum Tum Tugger, Mr. Mistoffelees, Macavity, and Skimbleshanks', 'character', 'giveaway', 'Cat names are definitive'),
('Cats', 'Broadway Musical', 5, 'Andrew Lloyd Webber''s musical based on T.S. Eliot''s poems about felines', 'iconic_element', 'giveaway', 'Unmistakable description'),

('Cats', 'Broadway Musical', 0, 'The 2019 film adaptation was considered one of the biggest critical disasters in movie musical history', 'interesting_fact', 'fact', 'Infamous CGI "digital fur technology"'),
('Cats', 'Broadway Musical', 0, 'Betty Buckley sang "Memory" on Broadway and the song has been recorded by over 150 artists', 'interesting_fact', 'fact', 'One of the most covered show tunes ever'),
('Cats', 'Broadway Musical', 0, 'It was the longest-running show in Broadway history from 1997 until The Phantom of the Opera broke its record in 2006', 'interesting_fact', 'fact', 'Held the record for nearly a decade'),

-- ============================================================
-- THE PRODUCERS
-- ============================================================
('The Producers', 'Broadway Musical', 1, 'Based on a film', 'source', 'very_broad', 'Many musicals adapt films'),
('The Producers', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many shows set in NYC'),
('The Producers', 'Broadway Musical', 1, 'Features a comedic tone', 'structure', 'very_broad', 'Many musicals are comedies'),
('The Producers', 'Broadway Musical', 1, 'Premiered in the 2000s', 'production', 'very_broad', 'Many shows opened this decade'),
('The Producers', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('The Producers', 'Broadway Musical', 1, 'A story about show business', 'theme', 'very_broad', 'Several backstage musicals exist'),

('The Producers', 'Broadway Musical', 2, 'Mel Brooks wrote the music and lyrics', 'development', 'broad', 'Brooks is famous but wrote few stage shows'),
('The Producers', 'Broadway Musical', 2, 'Thomas Meehan co-wrote the book', 'development', 'broad', 'Meehan wrote several shows'),
('The Producers', 'Broadway Musical', 2, 'Susan Stroman directed and choreographed', 'production', 'broad', 'Stroman worked on multiple shows'),
('The Producers', 'Broadway Musical', 2, 'Won a record-breaking 12 Tony Awards in a single year', 'production', 'broad', 'Record still stands'),
('The Producers', 'Broadway Musical', 2, 'Based on a 1967 film that was the creator''s directorial debut', 'source', 'broad', 'Specific source detail'),
('The Producers', 'Broadway Musical', 2, 'Nathan Lane and Matthew Broderick starred in the original cast', 'production', 'broad', 'Star casting doesn''t confirm the show'),

('The Producers', 'Broadway Musical', 3, 'Two men scheme to make money by producing a Broadway flop', 'plot', 'narrowing', 'Very specific premise'),
('The Producers', 'Broadway Musical', 3, 'A timid accountant is recruited into a theatrical scam', 'character', 'narrowing', 'Distinctive character dynamic'),
('The Producers', 'Broadway Musical', 3, 'They deliberately choose the worst script imaginable', 'plot', 'narrowing', 'Specific scheme detail'),
('The Producers', 'Broadway Musical', 3, 'The show-within-the-show is intentionally offensive', 'plot', 'narrowing', 'Meta-theatrical concept'),
('The Producers', 'Broadway Musical', 3, 'An aging Broadway impresario seduces elderly women for investment money', 'character', 'narrowing', 'Distinctive character detail'),
('The Producers', 'Broadway Musical', 3, 'Mel Brooks adapted his own film into a stage musical decades later', 'development', 'narrowing', 'Strong creator hint'),

('The Producers', 'Broadway Musical', 4, 'The deliberately terrible show-within-the-show features a musical tribute to a dictator', 'plot', 'recognition', 'Very recognizable concept'),
('The Producers', 'Broadway Musical', 4, 'An accountant and a producer realize they can make more money with a flop than a hit', 'plot', 'recognition', 'Very famous scheme'),
('The Producers', 'Broadway Musical', 4, 'Features a flamboyant director named Roger De Bris', 'character', 'recognition', 'Recognizable character name'),
('The Producers', 'Broadway Musical', 4, 'Includes the number "Springtime for Hitler"', 'song', 'recognition', 'Unmistakable song title'),
('The Producers', 'Broadway Musical', 4, 'The worst play ever written accidentally becomes a smash hit', 'plot', 'recognition', 'Very recognizable irony'),
('The Producers', 'Broadway Musical', 4, 'Nathan Lane played the scheming showman in the original cast', 'production', 'recognition', 'Well-known casting'),

('The Producers', 'Broadway Musical', 5, 'Max Bialystock and Leo Bloom produce "Springtime for Hitler"', 'character', 'giveaway', 'Character names and show-within-a-show are definitive'),
('The Producers', 'Broadway Musical', 5, 'Mel Brooks''s musical about producing the worst show ever on Broadway', 'iconic_element', 'giveaway', 'Definitive description'),
('The Producers', 'Broadway Musical', 5, 'Includes "I Wanna Be a Producer," "Springtime for Hitler," and "Betrayed"', 'song', 'giveaway', 'Unmistakable songs'),
('The Producers', 'Broadway Musical', 5, 'Franz Liebkind writes a love letter to the Fuhrer that becomes Broadway''s biggest hit', 'character', 'giveaway', 'Character and plot are unmistakable'),

('The Producers', 'Broadway Musical', 0, 'The show won 12 Tony Awards in 2001, breaking the record previously held by Hello, Dolly!', 'interesting_fact', 'fact', 'Still the all-time record'),
('The Producers', 'Broadway Musical', 0, 'When Nathan Lane and Matthew Broderick left the cast, ticket sales dropped significantly and they were eventually brought back', 'interesting_fact', 'fact', 'Star power proved essential'),
('The Producers', 'Broadway Musical', 0, 'Mel Brooks was 74 years old when the show opened on Broadway, making him one of the oldest first-time Broadway composers', 'interesting_fact', 'fact', 'Late-career triumph'),

-- ============================================================
-- GUYS AND DOLLS
-- ============================================================
('Guys and Dolls', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many shows set in NYC'),
('Guys and Dolls', 'Broadway Musical', 1, 'Features a romantic comedy plot', 'plot', 'very_broad', 'Many musicals are romantic comedies'),
('Guys and Dolls', 'Broadway Musical', 1, 'Premiered in the 1950s', 'production', 'very_broad', 'Many shows opened this decade'),
('Guys and Dolls', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('Guys and Dolls', 'Broadway Musical', 1, 'Based on short stories', 'source', 'very_broad', 'Some musicals adapt short fiction'),
('Guys and Dolls', 'Broadway Musical', 1, 'Features a large ensemble with comedic and romantic pairings', 'structure', 'very_broad', 'Common musical structure'),

('Guys and Dolls', 'Broadway Musical', 2, 'Frank Loesser wrote the music and lyrics', 'development', 'broad', 'Loesser wrote several shows'),
('Guys and Dolls', 'Broadway Musical', 2, 'Jo Swerling and Abe Burrows wrote the book', 'development', 'broad', 'Not widely known writers'),
('Guys and Dolls', 'Broadway Musical', 2, 'George S. Kaufman directed the original production', 'production', 'broad', 'Kaufman directed many Broadway productions'),
('Guys and Dolls', 'Broadway Musical', 2, 'Based on stories by Damon Runyon about New York''s colorful underworld', 'source', 'broad', 'Runyon connection is specific'),
('Guys and Dolls', 'Broadway Musical', 2, 'The original production starred Robert Alda and Vivian Blaine', 'production', 'broad', 'Original cast not widely known'),
('Guys and Dolls', 'Broadway Musical', 2, 'Often called the perfect musical comedy by theater historians', 'production', 'broad', 'Could apply to a few Golden Age shows'),

('Guys and Dolls', 'Broadway Musical', 3, 'Set in the world of small-time gamblers and Broadway showgirls in 1940s New York', 'setting', 'narrowing', 'Very specific milieu'),
('Guys and Dolls', 'Broadway Musical', 3, 'A gambler makes a bet that he can take a pious woman on a date to Havana', 'plot', 'narrowing', 'Very distinctive wager'),
('Guys and Dolls', 'Broadway Musical', 3, 'Features an illegal floating craps game that keeps changing locations', 'plot', 'narrowing', 'Specific underworld detail'),
('Guys and Dolls', 'Broadway Musical', 3, 'Two parallel love stories: a high-roller and a missionary, a gambler and a showgirl', 'plot', 'narrowing', 'Distinctive double romance'),
('Guys and Dolls', 'Broadway Musical', 3, 'The Damon Runyon characters speak in a distinctive, overly formal slang', 'character', 'narrowing', 'Runyonesque dialogue is unique'),
('Guys and Dolls', 'Broadway Musical', 3, 'A mission band worker tries to save sinners from the streets of Broadway', 'character', 'narrowing', 'Save-a-Soul Mission reference'),

('Guys and Dolls', 'Broadway Musical', 4, 'A gambler bets he can romance a Salvation Army sergeant', 'plot', 'recognition', 'Very recognizable setup'),
('Guys and Dolls', 'Broadway Musical', 4, 'Features the song "Luck Be a Lady" at a climactic craps game', 'song', 'recognition', 'Very well-known song'),
('Guys and Dolls', 'Broadway Musical', 4, 'A crap game moves to the sewers beneath New York', 'plot', 'recognition', 'Iconic scene'),
('Guys and Dolls', 'Broadway Musical', 4, 'The long-suffering showgirl has been engaged for 14 years', 'character', 'recognition', 'Adelaide''s running joke'),
('Guys and Dolls', 'Broadway Musical', 4, 'Includes "Sit Down, You''re Rockin'' the Boat" sung by a sinner confessing at a revival meeting', 'song', 'recognition', 'Very famous number'),
('Guys and Dolls', 'Broadway Musical', 4, 'A chronic gambler keeps delaying his wedding to his nightclub-singer fiancee', 'character', 'recognition', 'Nathan and Adelaide dynamic'),

('Guys and Dolls', 'Broadway Musical', 5, 'Sky Masterson bets Nathan Detroit he can take Sister Sarah Brown to Havana', 'character', 'giveaway', 'Character names are definitive'),
('Guys and Dolls', 'Broadway Musical', 5, 'Includes "Luck Be a Lady," "Sit Down, You''re Rockin'' the Boat," and "A Bushel and a Peck"', 'song', 'giveaway', 'Unmistakable songs'),
('Guys and Dolls', 'Broadway Musical', 5, 'Nathan Detroit, Adelaide, Sky Masterson, and Sarah Brown in Damon Runyon''s Broadway', 'character', 'giveaway', 'Character names and source are definitive'),
('Guys and Dolls', 'Broadway Musical', 5, 'The Save-a-Soul Mission meets the oldest established permanent floating crap game in New York', 'iconic_element', 'giveaway', 'Unmistakable phrase'),

('Guys and Dolls', 'Broadway Musical', 0, 'The 1955 film starred Marlon Brando as Sky Masterson, though Brando was not known for singing', 'interesting_fact', 'fact', 'Unusual casting choice'),
('Guys and Dolls', 'Broadway Musical', 0, 'Frank Loesser reportedly worked on the score for two years and wrote over 30 songs, many of which were cut', 'interesting_fact', 'fact', 'Extensive composition process'),
('Guys and Dolls', 'Broadway Musical', 0, 'Adelaide''s psychosomatic cold — she sneezes because her fiance won''t marry her — was an original invention not from the Runyon stories', 'interesting_fact', 'fact', 'Creative addition for the musical'),

-- ============================================================
-- KINKY BOOTS
-- ============================================================
('Kinky Boots', 'Broadway Musical', 1, 'Based on a true story', 'source', 'very_broad', 'Many musicals are based on true events'),
('Kinky Boots', 'Broadway Musical', 1, 'Features themes of acceptance and identity', 'theme', 'very_broad', 'Universal themes'),
('Kinky Boots', 'Broadway Musical', 1, 'Set in England', 'setting', 'very_broad', 'Several musicals set in England'),
('Kinky Boots', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('Kinky Boots', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows opened this decade'),
('Kinky Boots', 'Broadway Musical', 1, 'Features a pop-influenced score', 'structure', 'very_broad', 'Several modern musicals use pop'),

('Kinky Boots', 'Broadway Musical', 2, 'Cyndi Lauper wrote the music and lyrics', 'development', 'broad', 'Lauper is famous but this was her only Broadway score'),
('Kinky Boots', 'Broadway Musical', 2, 'Harvey Fierstein wrote the book', 'development', 'broad', 'Fierstein wrote several shows'),
('Kinky Boots', 'Broadway Musical', 2, 'Jerry Mitchell directed and choreographed', 'production', 'broad', 'Mitchell has worked on many shows'),
('Kinky Boots', 'Broadway Musical', 2, 'Based on a 2005 British independent film', 'source', 'broad', 'Several musicals adapt indie films'),
('Kinky Boots', 'Broadway Musical', 2, 'The show was inspired by a real shoe factory in Northampton, England', 'source', 'broad', 'True story but obscure'),
('Kinky Boots', 'Broadway Musical', 2, 'Billy Porter won the Tony for Best Actor for his performance', 'production', 'broad', 'Porter is well known but this alone doesn''t identify the show'),

('Kinky Boots', 'Broadway Musical', 3, 'A young man inherits a struggling shoe factory', 'plot', 'narrowing', 'Specific premise'),
('Kinky Boots', 'Broadway Musical', 3, 'The factory''s salvation comes from an unlikely partnership with a drag performer', 'plot', 'narrowing', 'Distinctive partnership concept'),
('Kinky Boots', 'Broadway Musical', 3, 'The factory pivots from traditional men''s shoes to a niche market', 'plot', 'narrowing', 'Specific business pivot'),
('Kinky Boots', 'Broadway Musical', 3, 'Set in a working-class English industrial town', 'setting', 'narrowing', 'Specific British setting'),
('Kinky Boots', 'Broadway Musical', 3, 'The show climaxes at a fashion trade show in Milan', 'plot', 'narrowing', 'Distinctive climactic scene'),
('Kinky Boots', 'Broadway Musical', 3, 'Cyndi Lauper became the first solo woman to win the Tony for Best Original Score', 'production', 'narrowing', 'Strong creator hint'),

('Kinky Boots', 'Broadway Musical', 4, 'A drag queen helps a factory owner design fabulous boots', 'plot', 'recognition', 'Very recognizable concept'),
('Kinky Boots', 'Broadway Musical', 4, 'Features the anthem "Raise You Up / Just Be"', 'song', 'recognition', 'Well-known number'),
('Kinky Boots', 'Broadway Musical', 4, 'Thigh-high red stiletto boots are the factory''s new product', 'iconic_element', 'recognition', 'Unmistakable visual'),
('Kinky Boots', 'Broadway Musical', 4, 'A factory heir and a nightclub performer find common ground', 'character', 'recognition', 'Recognizable odd-couple dynamic'),
('Kinky Boots', 'Broadway Musical', 4, 'The factory workers must overcome prejudice to embrace their new product line', 'theme', 'recognition', 'Central conflict is recognizable'),
('Kinky Boots', 'Broadway Musical', 4, 'Billy Porter originated the role of the fabulous drag performer', 'production', 'recognition', 'Strong casting hint'),

('Kinky Boots', 'Broadway Musical', 5, 'Charlie Price and Lola save the Price & Son shoe factory with fabulous boots', 'character', 'giveaway', 'Character names are definitive'),
('Kinky Boots', 'Broadway Musical', 5, 'Cyndi Lauper''s musical about a drag queen who saves a Northampton shoe factory', 'iconic_element', 'giveaway', 'Definitive description'),
('Kinky Boots', 'Broadway Musical', 5, 'Includes "Everybody Say Yeah," "Land of Lola," and "Sex Is in the Heel"', 'song', 'giveaway', 'Unmistakable songs'),
('Kinky Boots', 'Broadway Musical', 5, 'Lola''s red thigh-high boots become the factory''s salvation and the show''s icon', 'iconic_element', 'giveaway', 'Unmistakable'),

('Kinky Boots', 'Broadway Musical', 0, 'The real Steve Pateman saved his family shoe factory W.J. Brookes by making fetish footwear', 'interesting_fact', 'fact', 'True story inspiration'),
('Kinky Boots', 'Broadway Musical', 0, 'Cyndi Lauper reportedly wrote over 100 songs for the show before narrowing it down', 'interesting_fact', 'fact', 'Extensive writing process'),
('Kinky Boots', 'Broadway Musical', 0, 'Billy Porter went on to win an Emmy for Pose, becoming one of the few performers to win both a Tony and an Emmy', 'interesting_fact', 'fact', 'Cross-medium success'),

-- ============================================================
-- NEWSIES
-- ============================================================
('Newsies', 'Broadway Musical', 1, 'Based on historical events', 'source', 'very_broad', 'Many shows draw from history'),
('Newsies', 'Broadway Musical', 1, 'Based on a Disney film', 'source', 'very_broad', 'Several Disney films became musicals'),
('Newsies', 'Broadway Musical', 1, 'Set in New York City', 'setting', 'very_broad', 'Many shows set in NYC'),
('Newsies', 'Broadway Musical', 1, 'Features themes of fighting for justice', 'theme', 'very_broad', 'Common theme in many musicals'),
('Newsies', 'Broadway Musical', 1, 'Premiered in the 2010s', 'production', 'very_broad', 'Many shows opened this decade'),
('Newsies', 'Broadway Musical', 1, 'Features acrobatic choreography', 'structure', 'very_broad', 'Several musicals emphasize athletic dance'),

('Newsies', 'Broadway Musical', 2, 'Alan Menken composed the music', 'development', 'broad', 'Menken wrote many Disney and Broadway scores'),
('Newsies', 'Broadway Musical', 2, 'Jack Feldman wrote the lyrics', 'development', 'broad', 'Feldman isn''t widely known'),
('Newsies', 'Broadway Musical', 2, 'Harvey Fierstein wrote the book for the stage version', 'development', 'broad', 'Fierstein wrote several shows'),
('Newsies', 'Broadway Musical', 2, 'The original 1992 film was a box office flop that later became a cult favorite', 'source', 'broad', 'Cult film-to-stage pipeline'),
('Newsies', 'Broadway Musical', 2, 'Jeff Calhoun directed the stage production', 'production', 'broad', 'Calhoun has directed multiple shows'),
('Newsies', 'Broadway Musical', 2, 'The show started as a limited engagement at the Nederlander Theatre but extended due to demand', 'production', 'broad', 'Several shows have extended runs'),

('Newsies', 'Broadway Musical', 3, 'Set in 1899 New York during a real workers'' strike', 'setting', 'narrowing', 'Very specific time period'),
('Newsies', 'Broadway Musical', 3, 'A group of young workers organize against a powerful media mogul', 'plot', 'narrowing', 'Specific conflict'),
('Newsies', 'Broadway Musical', 3, 'The protagonist dreams of leaving the city and going to Santa Fe', 'character', 'narrowing', 'Distinctive dream of escape'),
('Newsies', 'Broadway Musical', 3, 'The choreography features gymnastic flips, jumps, and use of newspapers as props', 'production', 'narrowing', 'Very distinctive staging'),
('Newsies', 'Broadway Musical', 3, 'The villain is a real-life newspaper publisher who raised distribution prices', 'character', 'narrowing', 'Historical detail narrows it'),
('Newsies', 'Broadway Musical', 3, 'Based on the real Newsboys'' Strike of 1899', 'source', 'narrowing', 'Very specific historical event'),

('Newsies', 'Broadway Musical', 4, 'Street kids who sell newspapers go on strike for fair wages', 'plot', 'recognition', 'Very recognizable premise'),
('Newsies', 'Broadway Musical', 4, 'Features the rallying cry "Seize the Day"', 'song', 'recognition', 'Well-known anthem'),
('Newsies', 'Broadway Musical', 4, 'The boys take on Joseph Pulitzer and William Randolph Hearst', 'character', 'recognition', 'Famous real-life antagonists'),
('Newsies', 'Broadway Musical', 4, 'Includes "Carrying the Banner" and "The World Will Know"', 'song', 'recognition', 'Recognizable songs'),
('Newsies', 'Broadway Musical', 4, 'The stage version added the song "Watch What Happens" for a reporter character', 'song', 'recognition', 'Well-known added number'),
('Newsies', 'Broadway Musical', 4, 'Young newspaper sellers shout "Extra! Extra!" as they hawk their papers', 'iconic_element', 'recognition', 'Famous image'),

('Newsies', 'Broadway Musical', 5, 'Jack Kelly leads the newsboys'' strike against Joseph Pulitzer', 'character', 'giveaway', 'Character names are definitive'),
('Newsies', 'Broadway Musical', 5, 'Disney''s singing and dancing newspaper boys fight for fair wages in 1899 New York', 'iconic_element', 'giveaway', 'Definitive description'),
('Newsies', 'Broadway Musical', 5, 'Includes "Seize the Day," "Carrying the Banner," and "King of New York"', 'song', 'giveaway', 'Unmistakable songs'),
('Newsies', 'Broadway Musical', 5, 'Jack, Crutchie, Davey, and Les rally the newsboys to strike', 'character', 'giveaway', 'Character names are definitive'),

('Newsies', 'Broadway Musical', 0, 'The 1992 film starred a young Christian Bale as Jack Kelly', 'interesting_fact', 'fact', 'Before Bale became Batman'),
('Newsies', 'Broadway Musical', 0, 'The show was filmed live at the Pantages Theatre in Hollywood for a theatrical release in 2017', 'interesting_fact', 'fact', 'Theatrical filmed capture'),
('Newsies', 'Broadway Musical', 0, 'The real 1899 Newsboys'' Strike lasted two weeks and successfully forced Pulitzer and Hearst to make concessions', 'interesting_fact', 'fact', 'The true history behind the musical'),

-- ============================================================
-- THE SOUND OF MUSIC
-- ============================================================
('The Sound of Music', 'Broadway Musical', 1, 'Based on a true story', 'source', 'very_broad', 'Many musicals are based on true events'),
('The Sound of Music', 'Broadway Musical', 1, 'Set in Europe', 'setting', 'very_broad', 'Many shows set in Europe'),
('The Sound of Music', 'Broadway Musical', 1, 'Rodgers and Hammerstein wrote the score', 'development', 'very_broad', 'R&H wrote many musicals'),
('The Sound of Music', 'Broadway Musical', 1, 'Features a large family', 'character', 'very_broad', 'Several musicals center on families'),
('The Sound of Music', 'Broadway Musical', 1, 'Won the Tony Award for Best Musical', 'production', 'very_broad', 'Many shows have won this award'),
('The Sound of Music', 'Broadway Musical', 1, 'Became one of the most successful movie musicals of all time', 'production', 'very_broad', 'Several film musicals were massive hits'),

('The Sound of Music', 'Broadway Musical', 2, 'The last musical Rodgers and Hammerstein wrote together before Hammerstein''s death', 'development', 'broad', 'Poignant but not identifying'),
('The Sound of Music', 'Broadway Musical', 2, 'Mary Martin originated the lead role on Broadway', 'production', 'broad', 'Martin starred in several shows'),
('The Sound of Music', 'Broadway Musical', 2, 'Lindsay and Crouse wrote the book', 'development', 'broad', 'Veteran writing team'),
('The Sound of Music', 'Broadway Musical', 2, 'Based on the memoir "The Story of the Trapp Family Singers"', 'source', 'broad', 'Specific source but not widely known title'),
('The Sound of Music', 'Broadway Musical', 2, 'The original production was directed by Vincent J. Donehue', 'production', 'broad', 'Not widely remembered'),
('The Sound of Music', 'Broadway Musical', 2, 'The 1965 film starring Julie Andrews won the Academy Award for Best Picture', 'production', 'broad', 'Film success hint'),

('The Sound of Music', 'Broadway Musical', 3, 'Set in Austria in the late 1930s as political tensions rise', 'setting', 'narrowing', 'Very specific setting and time'),
('The Sound of Music', 'Broadway Musical', 3, 'A young woman leaves a convent to become a governess', 'plot', 'narrowing', 'Distinctive plot setup'),
('The Sound of Music', 'Broadway Musical', 3, 'A widowed military officer hires someone to care for his seven children', 'character', 'narrowing', 'Very specific character situation'),
('The Sound of Music', 'Broadway Musical', 3, 'The family must decide whether to collaborate with or flee from the Nazi regime', 'plot', 'narrowing', 'Historical conflict narrows options'),
('The Sound of Music', 'Broadway Musical', 3, 'The governess teaches the children to sing and brings music back to the household', 'plot', 'narrowing', 'Distinctive music-as-redemption theme'),
('The Sound of Music', 'Broadway Musical', 3, 'The family escapes over the Alps at the climax', 'plot', 'narrowing', 'Famous escape'),

('The Sound of Music', 'Broadway Musical', 4, 'A novice nun becomes governess to seven children and falls in love with their father', 'plot', 'recognition', 'Very recognizable story'),
('The Sound of Music', 'Broadway Musical', 4, 'The children are taught the musical scale using "Do-Re-Mi"', 'song', 'recognition', 'Extremely famous scene and song'),
('The Sound of Music', 'Broadway Musical', 4, 'Features the song "My Favorite Things" about whiskers on kittens and brown paper packages', 'song', 'recognition', 'One of the most famous songs in musical theater'),
('The Sound of Music', 'Broadway Musical', 4, 'A singing family enters a music festival as a cover for their escape', 'plot', 'recognition', 'Very well-known plot point'),
('The Sound of Music', 'Broadway Musical', 4, 'The Mother Abbess sings "Climb Ev''ry Mountain" as encouragement', 'song', 'recognition', 'Very famous number'),
('The Sound of Music', 'Broadway Musical', 4, 'Set in Salzburg, Austria on the eve of the Anschluss', 'setting', 'recognition', 'Very specific and recognizable'),

('The Sound of Music', 'Broadway Musical', 5, 'Maria leaves the abbey to care for Captain von Trapp''s seven children', 'character', 'giveaway', 'Character names are definitive'),
('The Sound of Music', 'Broadway Musical', 5, 'Includes "Do-Re-Mi," "My Favorite Things," "Edelweiss," and "Climb Ev''ry Mountain"', 'song', 'giveaway', 'Unmistakable songs'),
('The Sound of Music', 'Broadway Musical', 5, 'The von Trapp family sings their way to freedom across the Austrian Alps', 'iconic_element', 'giveaway', 'Definitive description'),
('The Sound of Music', 'Broadway Musical', 5, 'Liesl, Friedrich, Louisa, Kurt, Brigitta, Marta, and Gretl are the seven von Trapp children', 'character', 'giveaway', 'All children named'),

('The Sound of Music', 'Broadway Musical', 0, 'The real Maria von Trapp lived to see the film''s success and made a cameo appearance in the 1965 movie', 'interesting_fact', 'fact', 'She appears briefly as a background extra'),
('The Sound of Music', 'Broadway Musical', 0, '"Edelweiss" is so closely associated with Austria that many people believe it is a traditional Austrian folk song — it is not', 'interesting_fact', 'fact', 'Rodgers and Hammerstein original often mistaken for folk music'),
('The Sound of Music', 'Broadway Musical', 0, 'The real von Trapp family did not actually hike over the Alps — they took a train to Italy', 'interesting_fact', 'fact', 'Dramatic license in both stage and film versions'),
('The Sound of Music', 'Broadway Musical', 0, 'It was the last musical Oscar Hammerstein II worked on; he died of cancer nine months after the Broadway opening', 'interesting_fact', 'fact', 'Hammerstein''s final work');
