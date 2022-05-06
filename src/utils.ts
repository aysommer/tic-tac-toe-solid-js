import { GRID_SIZE } from './constants';
import type { GameField, Sign, Winner } from "./types"

type Direction = 'row' | 'col';

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

const isWinRow = (row: Sign[]): boolean => {
   if (row.some(sign => !Boolean(sign))) {
      return false;
   }

   return new Set(row).size === 1;
}

const getRow = (dir: Direction): Sign[] => {
   return []
}

export const getWinner = (grid: GameField): Winner => {
   for (let col = 0; col < GRID_SIZE; col++) {

   }

   return undefined;
}