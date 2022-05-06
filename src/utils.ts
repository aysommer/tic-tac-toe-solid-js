import type { GameField, Sign } from "./types"

export const isFullGrid = (grid: GameField): boolean => {
   return grid.every(row => row.every(Boolean))
}

export const getSign = (val: boolean): Sign => {
   return val ? 'X' : 'O';
}

export const getRandBoolean = (): boolean => {
   let rand = 0 - 0.5 + Math.random() * 2;
   return Boolean(Math.round(rand));
}
