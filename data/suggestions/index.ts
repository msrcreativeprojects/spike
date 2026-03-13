import { BROADWAY_MUSICALS } from "./broadway-musical";
import { BROADWAY_PLAYS } from "./broadway-play";
import { BROADWAY_ACTORS } from "./broadway-actor";
import { BROADWAY_THEATERS } from "./broadway-theater";
import { TOURING_CITIES } from "./touring-city";

const BANKS: Record<string, string[]> = {
  "Broadway Musical": BROADWAY_MUSICALS,
  "Broadway Play": BROADWAY_PLAYS,
  "Broadway Actor": BROADWAY_ACTORS,
  "Broadway Theater": BROADWAY_THEATERS,
  "Touring City": TOURING_CITIES,
};

export function getSuggestionBank(category: string): string[] {
  return BANKS[category] ?? [];
}
