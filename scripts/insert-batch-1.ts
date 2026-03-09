/**
 * Batch 1: Insert ~60 queued puzzles into Supabase.
 * Run with: npx tsx scripts/insert-batch-1.ts
 *
 * These go in as status='queued' with no date — admin reviews and approves them.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Read .env.local manually (no dotenv dependency needed)
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

interface QueuedPuzzle {
  answer: string;
  category: string;
  clues: string[];
  aliases: string[] | null;
  status: "queued";
}

const puzzles: QueuedPuzzle[] = [
  // ──────────────── MUSICALS ────────────────
  {
    answer: "Les Misérables",
    category: "Broadway Musical",
    clues: [
      "A stolen loaf of bread",
      "Barricades",
      "One more day",
      "24601",
      "Jean Valjean's quest for redemption in revolutionary France",
    ],
    aliases: ["les mis", "les miserables"],
    status: "queued",
  },
  {
    answer: "Rent",
    category: "Broadway Musical",
    clues: [
      "525,600 minutes",
      "No day but today",
      "East Village bohemians",
      "A rock musical about artists facing AIDS",
      "Jonathan Larson's modern La Bohème",
    ],
    aliases: ["rent the musical"],
    status: "queued",
  },
  {
    answer: "Dear Evan Hansen",
    category: "Broadway Musical",
    clues: [
      "A letter to yourself",
      "You will be found",
      "A broken arm and a lie that spirals",
      "Waving through a window",
      "Ben Platt's anxious teenager finds belonging through deception",
    ],
    aliases: ["dear evan hansen the musical", "DEH"],
    status: "queued",
  },
  {
    answer: "The Lion King",
    category: "Broadway Musical",
    clues: [
      "Circle of life",
      "Puppetry on the savanna",
      "Hakuna Matata",
      "A cub's exile and return",
      "Julie Taymor's visually stunning Disney adaptation",
    ],
    aliases: ["lion king", "the lion king musical"],
    status: "queued",
  },
  {
    answer: "Sweeney Todd",
    category: "Broadway Musical",
    clues: [
      "The closest shave you'll ever know",
      "A barber chair with a secret",
      "Meat pies",
      "Mrs. Lovett's unusual recipe",
      "Sondheim's demon barber of Fleet Street",
    ],
    aliases: ["sweeney todd the demon barber of fleet street"],
    status: "queued",
  },
  {
    answer: "The Book of Mormon",
    category: "Broadway Musical",
    clues: [
      "Hello!",
      "Doorbell ringing",
      "Two missionaries in Uganda",
      "Turn it off",
      "Trey Parker and Matt Stone's irreverent religious satire",
    ],
    aliases: ["book of mormon"],
    status: "queued",
  },
  {
    answer: "Into the Woods",
    category: "Broadway Musical",
    clues: [
      "I wish",
      "Fairy tales collide",
      "A baker and his wife need ingredients",
      "Be careful what you wish for",
      "Sondheim twists Cinderella, Rapunzel, and Jack into one dark journey",
    ],
    aliases: ["into the woods the musical"],
    status: "queued",
  },
  {
    answer: "Hadestown",
    category: "Broadway Musical",
    clues: [
      "Way down underground",
      "Wait for me",
      "A factory beneath the earth",
      "Orpheus and Eurydice, retold",
      "Anaïs Mitchell's folk-opera set in a mythological Depression-era underworld",
    ],
    aliases: ["hades town"],
    status: "queued",
  },
  {
    answer: "Company",
    category: "Broadway Musical",
    clues: [
      "Being alive",
      "35 candles on a cake",
      "Bobby's married friends",
      "A bachelor examines commitment",
      "Sondheim's concept musical about love and loneliness in New York",
    ],
    aliases: ["company the musical"],
    status: "queued",
  },
  {
    answer: "Spring Awakening",
    category: "Broadway Musical",
    clues: [
      "Mama who bore me",
      "Teenage rebellion in a repressive society",
      "German schoolboys discover desire",
      "Rock music meets 19th-century Germany",
      "Duncan Sheik's coming-of-age musical based on Frank Wedekind's play",
    ],
    aliases: ["spring awakening the musical"],
    status: "queued",
  },
  {
    answer: "West Side Story",
    category: "Broadway Musical",
    clues: [
      "Somewhere",
      "Snapping fingers",
      "A dance at the gym",
      "Jets versus Sharks",
      "Bernstein and Sondheim's Romeo and Juliet on the streets of New York",
    ],
    aliases: ["west side story the musical", "WSS"],
    status: "queued",
  },
  {
    answer: "Grease",
    category: "Broadway Musical",
    clues: [
      "Summer lovin'",
      "Rydell High",
      "A leather jacket and a poodle skirt",
      "Danny and Sandy",
      "The T-Birds and Pink Ladies' 1950s high school romance",
    ],
    aliases: ["grease the musical"],
    status: "queued",
  },
  {
    answer: "Fiddler on the Roof",
    category: "Broadway Musical",
    clues: [
      "Tradition!",
      "If I were a rich man",
      "A milkman talks to God",
      "Five daughters, three weddings",
      "Tevye navigates change in his small Russian shtetl",
    ],
    aliases: ["fiddler", "fiddler on the roof the musical"],
    status: "queued",
  },
  {
    answer: "Little Shop of Horrors",
    category: "Broadway Musical",
    clues: [
      "Feed me!",
      "Skid Row",
      "A mysterious plant from outer space",
      "Seymour names it after his crush",
      "A man-eating Venus flytrap named Audrey II",
    ],
    aliases: ["little shop"],
    status: "queued",
  },
  {
    answer: "Moulin Rouge!",
    category: "Broadway Musical",
    clues: [
      "A bohemian revolution of truth, beauty, freedom, and love",
      "A giant elephant-shaped room",
      "Spectacular spectacular",
      "A doomed love affair in Montmartre",
      "Baz Luhrmann's jukebox musical set in 1899 Paris",
    ],
    aliases: ["moulin rouge", "moulin rouge the musical"],
    status: "queued",
  },
  {
    answer: "Six",
    category: "Broadway Musical",
    clues: [
      "Ex-wives",
      "A pop concert at court",
      "Divorced, beheaded, survived",
      "Six queens reclaim their stories",
      "Henry VIII's wives compete for who had it worst",
    ],
    aliases: ["six the musical"],
    status: "queued",
  },
  {
    answer: "Mean Girls",
    category: "Broadway Musical",
    clues: [
      "On Wednesdays we wear pink",
      "The burn book",
      "A new girl navigates high school cliques",
      "The Plastics",
      "Tina Fey's teen comedy adapted by Jeff Richmond",
    ],
    aliases: ["mean girls the musical"],
    status: "queued",
  },
  {
    answer: "Come From Away",
    category: "Broadway Musical",
    clues: [
      "Welcome to the Rock",
      "38 planes diverted",
      "September 12, 2001",
      "A small Newfoundland town opens its doors",
      "Gander residents host 7,000 stranded passengers after 9/11",
    ],
    aliases: ["come from away the musical"],
    status: "queued",
  },
  {
    answer: "Annie",
    category: "Broadway Musical",
    clues: [
      "Tomorrow, tomorrow",
      "A hard-knock life",
      "A red-haired orphan",
      "Daddy Warbucks",
      "The sun'll come out for a girl who escapes Miss Hannigan's orphanage",
    ],
    aliases: ["annie the musical"],
    status: "queued",
  },
  {
    answer: "Cats",
    category: "Broadway Musical",
    clues: [
      "Memory",
      "A junkyard ball",
      "The Jellicle choice",
      "One cat ascends to the Heaviside Layer",
      "Andrew Lloyd Webber's T.S. Eliot adaptation about feline selection",
    ],
    aliases: ["cats the musical"],
    status: "queued",
  },
  {
    answer: "The Producers",
    category: "Broadway Musical",
    clues: [
      "Springtime",
      "Accounting fraud as show business",
      "The worst play ever written",
      "Max Bialystock and Leo Bloom",
      "Mel Brooks' scheme to profit from a guaranteed Broadway flop",
    ],
    aliases: ["the producers the musical"],
    status: "queued",
  },
  {
    answer: "Guys and Dolls",
    category: "Broadway Musical",
    clues: [
      "Luck be a lady",
      "A floating crap game",
      "A bet to take a missionary to Havana",
      "Nathan Detroit and Sky Masterson",
      "Damon Runyon's gamblers and showgirls on Broadway",
    ],
    aliases: ["guys and dolls the musical"],
    status: "queued",
  },
  {
    answer: "Kinky Boots",
    category: "Broadway Musical",
    clues: [
      "Raise you up",
      "A failing shoe factory",
      "Red thigh-high stilettos",
      "Lola saves the family business",
      "Cyndi Lauper's musical about a drag queen who revives a Northampton factory",
    ],
    aliases: ["kinky boots the musical"],
    status: "queued",
  },
  {
    answer: "Newsies",
    category: "Broadway Musical",
    clues: [
      "Seize the day",
      "Extra! Extra!",
      "Newsboys on strike",
      "Jack Kelly versus Joseph Pulitzer",
      "Disney's singing paperboys fight for fair wages in 1899 New York",
    ],
    aliases: ["newsies the musical"],
    status: "queued",
  },
  {
    answer: "The Sound of Music",
    category: "Broadway Musical",
    clues: [
      "Do-Re-Mi",
      "A nun who doesn't fit in",
      "Seven children and a whistle",
      "Climbing every mountain to escape",
      "Maria leaves the abbey to be governess for the von Trapp family",
    ],
    aliases: ["sound of music"],
    status: "queued",
  },
  {
    answer: "Jesus Christ Superstar",
    category: "Broadway Musical",
    clues: [
      "What's the buzz?",
      "A rock opera about the last week",
      "Judas narrates",
      "Gethsemane",
      "Andrew Lloyd Webber and Tim Rice's retelling of the Passion",
    ],
    aliases: ["JCS", "jesus christ superstar the musical"],
    status: "queued",
  },
  {
    answer: "A Raisin in the Sun",
    category: "Broadway Play",
    clues: [
      "A dream deferred",
      "A $10,000 insurance check",
      "Clybourne Park",
      "The Younger family debates their future",
      "Lorraine Hansberry's groundbreaking drama about a Black family in 1950s Chicago",
    ],
    aliases: ["raisin in the sun"],
    status: "queued",
  },
  {
    answer: "Gypsy",
    category: "Broadway Musical",
    clues: [
      "Everything's coming up roses",
      "Let me entertain you",
      "The ultimate stage mother",
      "From vaudeville to burlesque",
      "Mama Rose pushes her daughters to stardom — especially Louise",
    ],
    aliases: ["gypsy the musical"],
    status: "queued",
  },
  {
    answer: "Legally Blonde",
    category: "Broadway Musical",
    clues: [
      "Omigod you guys",
      "A Gemini vegetarian",
      "Bend and snap",
      "Elle Woods goes to Harvard Law",
      "A sorority girl proves blondes can litigate too",
    ],
    aliases: ["legally blonde the musical"],
    status: "queued",
  },
  {
    answer: "Funny Girl",
    category: "Broadway Musical",
    clues: [
      "Don't rain on my parade",
      "I'm the greatest star",
      "A girl from Henry Street",
      "Nicky Arnstein",
      "Fanny Brice rises from the Lower East Side to Ziegfeld stardom",
    ],
    aliases: ["funny girl the musical"],
    status: "queued",
  },
  {
    answer: "Pippin",
    category: "Broadway Musical",
    clues: [
      "Magic to do",
      "Corner of the sky",
      "A prince searches for meaning",
      "Charlemagne's son joins a traveling troupe",
      "Bob Fosse's circus-framed quest for an extraordinary life",
    ],
    aliases: ["pippin the musical"],
    status: "queued",
  },
  {
    answer: "Avenue Q",
    category: "Broadway Musical",
    clues: [
      "The internet is for…",
      "It sucks to be me",
      "Puppets with adult problems",
      "Princeton moves to a cheap New York street",
      "Sesame Street meets post-college existential crisis",
    ],
    aliases: ["avenue q the musical"],
    status: "queued",
  },
  {
    answer: "Matilda",
    category: "Broadway Musical",
    clues: [
      "Revolting children",
      "When I grow up",
      "A girl with telekinetic powers",
      "Miss Trunchbull's chokey",
      "Roald Dahl's brilliant child stands up to her terrible headmistress",
    ],
    aliases: ["matilda the musical"],
    status: "queued",
  },
  {
    answer: "The Phantom of the Opera",
    category: "Broadway Musical",
    clues: [
      "Half a mask",
      "Chandelier crash",
      "An underground lake beneath the Paris opera house",
      "The Music of the Night",
      "Broadway's longest-running show until 2023",
    ],
    aliases: ["phantom", "the phantom of the opera"],
    status: "queued",
  },
  {
    answer: "Waitress",
    category: "Broadway Musical",
    clues: [
      "She used to be mine",
      "A secret recipe",
      "Pies with emotional fillings",
      "Jenna bakes her way out",
      "Sara Bareilles' musical about a small-town waitress with a talent for pastry",
    ],
    aliases: ["waitress the musical"],
    status: "queued",
  },
  {
    answer: "Aladdin",
    category: "Broadway Musical",
    clues: [
      "A whole new world",
      "A diamond in the rough",
      "Three wishes",
      "The Cave of Wonders",
      "A street rat from Agrabah wins the princess with help from a Genie",
    ],
    aliases: ["aladdin the musical"],
    status: "queued",
  },
  {
    answer: "Dreamgirls",
    category: "Broadway Musical",
    clues: [
      "And I am telling you I'm not going",
      "A girl group rises in the Motown era",
      "The lead gets pushed to backup",
      "Curtis Taylor Jr. controls the music",
      "A Supremes-inspired story of ambition and betrayal in R&B",
    ],
    aliases: ["dream girls", "dreamgirls the musical"],
    status: "queued",
  },
  {
    answer: "Thoroughly Modern Millie",
    category: "Broadway Musical",
    clues: [
      "Not for the life of me",
      "A small-town girl arrives in 1922 Manhattan",
      "A suspicious hotel for women",
      "Bobbed hair and raised hemlines",
      "Millie Dillmount modernizes in the Jazz Age — but her landlady has dark plans",
    ],
    aliases: ["modern millie", "thoroughly modern millie the musical"],
    status: "queued",
  },
  {
    answer: "Oklahoma!",
    category: "Broadway Musical",
    clues: [
      "Oh, what a beautiful mornin'",
      "The surrey with the fringe on top",
      "Farmers and cowboys",
      "Laurey chooses between two suitors",
      "Rodgers and Hammerstein's first collaboration set in Indian Territory",
    ],
    aliases: ["oklahoma"],
    status: "queued",
  },
  {
    answer: "South Pacific",
    category: "Broadway Musical",
    clues: [
      "Some enchanted evening",
      "I'm gonna wash that man right outta my hair",
      "A nurse on a tropical island during wartime",
      "Bali Ha'i",
      "Rodgers and Hammerstein tackle race and romance on a WWII Pacific island",
    ],
    aliases: ["south pacific the musical"],
    status: "queued",
  },
  {
    answer: "Evita",
    category: "Broadway Musical",
    clues: [
      "Don't cry for me",
      "Rainbow High",
      "Che narrates her rise",
      "An actress becomes First Lady of Argentina",
      "Andrew Lloyd Webber's Eva Perón rises from poverty to power in Buenos Aires",
    ],
    aliases: ["evita the musical"],
    status: "queued",
  },
  {
    answer: "Hair",
    category: "Broadway Musical",
    clues: [
      "Let the sunshine in",
      "Aquarius",
      "A tribe of hippies in Central Park",
      "A draft card gets burned",
      "The American tribal love-rock musical of the Vietnam era",
    ],
    aliases: ["hair the musical"],
    status: "queued",
  },
  {
    answer: "In the Heights",
    category: "Broadway Musical",
    clues: [
      "96,000",
      "A bodega in Washington Heights",
      "Paciencia y fe",
      "A winning lottery ticket",
      "Lin-Manuel Miranda's first musical about a Latino neighborhood facing change",
    ],
    aliases: ["in the heights the musical"],
    status: "queued",
  },
  {
    answer: "The Music Man",
    category: "Broadway Musical",
    clues: [
      "76 trombones",
      "A con man sells instruments",
      "River City, Iowa",
      "Trouble with a capital T",
      "Harold Hill promises a boys' band but delivers love instead",
    ],
    aliases: ["music man"],
    status: "queued",
  },
  {
    answer: "Beauty and the Beast",
    category: "Broadway Musical",
    clues: [
      "Be our guest",
      "A tale as old as time",
      "An enchanted rose",
      "A castle full of talking objects",
      "Belle breaks the curse by seeing past the Beast's exterior",
    ],
    aliases: ["beauty and the beast the musical"],
    status: "queued",
  },
  {
    answer: "Hairspray",
    category: "Broadway Musical",
    clues: [
      "Good morning Baltimore",
      "You can't stop the beat",
      "A plus-size teen wants to dance on TV",
      "The Corny Collins Show",
      "Tracy Turnblad integrates a 1960s Baltimore dance program",
    ],
    aliases: ["hairspray the musical"],
    status: "queued",
  },
  {
    answer: "Jersey Boys",
    category: "Broadway Musical",
    clues: [
      "Oh, what a night",
      "Four seasons of music",
      "Newark to stardom",
      "Frankie's falsetto",
      "The Four Seasons' rise from New Jersey streets to the Rock and Roll Hall of Fame",
    ],
    aliases: ["jersey boys the musical"],
    status: "queued",
  },
  {
    answer: "The Color Purple",
    category: "Broadway Musical",
    clues: [
      "I'm here",
      "Letters to God",
      "Sisters separated in the rural South",
      "Celie finds her voice",
      "Alice Walker's story of a Black woman's triumph over decades of abuse in Georgia",
    ],
    aliases: ["color purple", "the color purple the musical"],
    status: "queued",
  },
  {
    answer: "Falsettos",
    category: "Broadway Musical",
    clues: [
      "Four Jews in a room bitching",
      "A tight-knit family unravels",
      "Marvin leaves his wife for a man",
      "A bar mitzvah during a crisis",
      "William Finn's intimate musical about a non-traditional family facing the AIDS epidemic",
    ],
    aliases: ["falsettos the musical"],
    status: "queued",
  },
  {
    answer: "Miss Saigon",
    category: "Broadway Musical",
    clues: [
      "A helicopter on stage",
      "The heat is on in Saigon",
      "The last night of the war",
      "A bargirl and an American soldier",
      "Boublil and Schönberg's Madame Butterfly set during the fall of Saigon",
    ],
    aliases: ["miss saigon the musical"],
    status: "queued",
  },
  {
    answer: "My Fair Lady",
    category: "Broadway Musical",
    clues: [
      "The rain in Spain",
      "I could have danced all night",
      "A flower seller's elocution lessons",
      "A bet at the Embassy Ball",
      "Henry Higgins transforms Eliza Doolittle's cockney accent",
    ],
    aliases: ["my fair lady the musical"],
    status: "queued",
  },
  {
    answer: "A Streetcar Named Desire",
    category: "Broadway Play",
    clues: [
      "Stella!",
      "A faded Southern belle arrives in New Orleans",
      "Blanche depends on the kindness of strangers",
      "Stanley Kowalski",
      "Tennessee Williams' brutal drama of illusion versus reality",
    ],
    aliases: ["streetcar named desire", "streetcar"],
    status: "queued",
  },
  {
    answer: "Once",
    category: "Broadway Musical",
    clues: [
      "Falling slowly",
      "A busker and an immigrant",
      "The actors play their own instruments",
      "A Hoover vacuum cleaner",
      "A Dublin street musician falls for a Czech pianist in this intimate folk musical",
    ],
    aliases: ["once the musical"],
    status: "queued",
  },
  {
    answer: "Frozen",
    category: "Broadway Musical",
    clues: [
      "Let it go",
      "Do you want to build a snowman?",
      "An eternal winter",
      "A queen's powers isolate her from her sister",
      "Anna journeys to bring Elsa home to Arendelle",
    ],
    aliases: ["frozen the musical"],
    status: "queued",
  },
  {
    answer: "Heathers",
    category: "Broadway Musical",
    clues: [
      "Beautiful",
      "Croquet and cruelty",
      "A new girl joins the most powerful clique",
      "Big Fun and Ich Lüge bullets",
      "Veronica and J.D.'s deadly takedown of high school hierarchy",
    ],
    aliases: ["heathers the musical"],
    status: "queued",
  },
  {
    answer: "Next to Normal",
    category: "Broadway Musical",
    clues: [
      "I miss the mountains",
      "A suburban family unravels",
      "Electroshock and medication",
      "A mother's grief won't let go",
      "Tom Kitt and Brian Yorkey's Pulitzer-winning rock musical about mental illness",
    ],
    aliases: ["next to normal the musical"],
    status: "queued",
  },
  {
    answer: "Carousel",
    category: "Broadway Musical",
    clues: [
      "You'll never walk alone",
      "A clambake",
      "A carnival barker and a mill worker",
      "Billy Bigelow gets one day back",
      "Rodgers and Hammerstein's bittersweet tale of love beyond death in a Maine coastal town",
    ],
    aliases: ["carousel the musical"],
    status: "queued",
  },
  {
    answer: "The Crucible",
    category: "Broadway Play",
    clues: [
      "I saw Goody Proctor with the Devil",
      "Dancing in the woods",
      "Salem, 1692",
      "John Proctor tears up his confession",
      "Arthur Miller's allegory of McCarthyism through the Salem witch trials",
    ],
    aliases: ["crucible"],
    status: "queued",
  },
  {
    answer: "Spamalot",
    category: "Broadway Musical",
    clues: [
      "Always look on the bright side of life",
      "Tis but a scratch",
      "Knights who say Ni",
      "The Holy Grail quest",
      "Monty Python's King Arthur musical lovingly mocks the search for the sacred cup",
    ],
    aliases: ["monty python spamalot", "spamalot the musical"],
    status: "queued",
  },
  {
    answer: "Bloody Bloody Andrew Jackson",
    category: "Broadway Musical",
    clues: [
      "Populism, yeah yeah",
      "An emo rock president",
      "Frontier justice",
      "Old Hickory with eyeliner",
      "A punk-rock retelling of America's seventh president as a rebellious teen idol",
    ],
    aliases: ["bloody bloody andrew jackson the musical", "BBAJ"],
    status: "queued",
  },
  {
    answer: "The Glass Menagerie",
    category: "Broadway Play",
    clues: [
      "A collection of tiny animals",
      "A fire escape",
      "A gentleman caller comes to dinner",
      "Tom narrates his family's crumbling world",
      "Tennessee Williams' memory play about the Wingfield family's fragile hopes",
    ],
    aliases: ["glass menagerie"],
    status: "queued",
  },
  {
    answer: "Beetlejuice",
    category: "Broadway Musical",
    clues: [
      "Say the name three times",
      "Sandworm",
      "A recently deceased couple haunts their own home",
      "Day-O dinner party",
      "Alex Brightman's chaotic afterlife comedy",
    ],
    aliases: ["beetlejuice the musical"],
    status: "queued",
  },
];

async function main() {
  // Remove duplicates that are already in the database
  const { data: existing } = await supabase
    .from("puzzles")
    .select("answer");

  const existingAnswers = new Set(
    (existing ?? []).map((p) => p.answer.toLowerCase())
  );

  const newPuzzles = puzzles.filter(
    (p) => !existingAnswers.has(p.answer.toLowerCase())
  );

  console.log(
    `Found ${existingAnswers.size} existing puzzles. Inserting ${newPuzzles.length} new ones...`
  );

  if (newPuzzles.length === 0) {
    console.log("Nothing to insert.");
    return;
  }

  // Insert in batches of 20
  for (let i = 0; i < newPuzzles.length; i += 20) {
    const batch = newPuzzles.slice(i, i + 20);
    const { error } = await supabase.from("puzzles").insert(batch);

    if (error) {
      console.error(`Error inserting batch starting at ${i}:`, error.message);
      return;
    }
    console.log(
      `  Inserted ${batch.length} puzzles (${i + 1}–${i + batch.length})`
    );
  }

  console.log(`\nDone! ${newPuzzles.length} puzzles queued for review.`);
}

main().catch(console.error);
