import type { GameField } from "./types";

export const GRID_SIZE = 3;
export const GRID_STUB: GameField = Array(GRID_SIZE).fill(Array(GRID_SIZE).fill(undefined));