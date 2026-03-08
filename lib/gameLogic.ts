import { GameState, Puzzle } from "@/types/puzzle";

const TOTAL_CLUES = 5;

export function createInitialState(puzzleId: number): GameState {
  return {
    puzzleId,
    revealedClues: 0,
    guesses: [],
    solved: false,
    completed: false,
    score: 0,
  };
}

export function checkGuess(guess: string, puzzle: Puzzle): boolean {
  const normalize = (s: string) => s.trim().toLowerCase();
  const normalized = normalize(guess);
  if (!normalized) return false;

  if (normalized === normalize(puzzle.answer)) return true;
  if (puzzle.aliases?.some((a) => normalize(a) === normalized)) return true;

  return false;
}

export function submitGuess(state: GameState, guess: string, puzzle: Puzzle): GameState {
  if (state.completed) return state;

  const trimmed = guess.trim();
  if (!trimmed) return state;

  const isCorrect = checkGuess(trimmed, puzzle);
  const newGuesses = [...state.guesses, trimmed];

  if (isCorrect) {
    return {
      ...state,
      guesses: newGuesses,
      solved: true,
      completed: true,
      score: TOTAL_CLUES - state.revealedClues,
    };
  }

  // Wrong guess on last clue = game over
  if (state.revealedClues >= TOTAL_CLUES) {
    return {
      ...state,
      guesses: newGuesses,
      solved: false,
      completed: true,
      score: 0,
    };
  }

  // Wrong guess: auto-peel next tape
  return {
    ...state,
    guesses: newGuesses,
    revealedClues: state.revealedClues + 1,
  };
}

export function revealNextClue(state: GameState): GameState {
  if (state.completed) return state;
  if (state.revealedClues >= TOTAL_CLUES) return state;

  const next = state.revealedClues + 1;

  // Revealing the last clue doesn't end the game — they still get to guess
  return {
    ...state,
    revealedClues: next,
  };
}
