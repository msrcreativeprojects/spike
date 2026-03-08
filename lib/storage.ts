import { GameState } from "@/types/puzzle";

const STORAGE_KEY = "spike-game";

interface StoredData {
  [date: string]: GameState;
}

function getAll(): StoredData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: StoredData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadGameState(date: string): GameState | null {
  const data = getAll();
  return data[date] ?? null;
}

export function saveGameState(date: string, state: GameState): void {
  const data = getAll();
  data[date] = state;
  saveAll(data);
}

export function clearGameState(date: string): void {
  const data = getAll();
  delete data[date];
  saveAll(data);
}
