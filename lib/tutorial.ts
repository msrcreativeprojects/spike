const TUTORIAL_KEY = "spike-tutorial";

export function hasSeenTutorial(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(TUTORIAL_KEY) === "1";
  } catch {
    return true;
  }
}

export function markTutorialSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TUTORIAL_KEY, "1");
  } catch {
    // silently fail
  }
}
