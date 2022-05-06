import type { GameField, Sign, Winner } from './types';
import {
   Component,
   createEffect,
   createSignal,
   For
} from 'solid-js';
import Cell from './Cell';
import Grid from './Grid';
import ResultPanel from './ResetPanel';
import { getRandBoolean, getSign, isFullGrid } from './utils';
import { GRID_STUB } from './constants';

import './App.css';

const App: Component = () => {
   const [gridValue, setGridValue] = createSignal<GameField>(GRID_STUB);
   const [orderValue, setOrderValue] = createSignal<boolean>(getRandBoolean());
   const [isFull, setIsFull] = createSignal<boolean>(false);
   const [winner, setWinner] = createSignal<Winner>(undefined);

   createEffect(() => {
      setIsFull(isFullGrid(gridValue()));
   });

   const attachCellClick = (value: Sign, i: number, j: number) => {
      return () => {
         if (!value) {
            setCellValue(i, j)
         }
      };
   }

   const setCellValue = (i: number, j: number) => {
      setGridValue((old) => {
         const res = [...old].map((row, _i) => row.map((value: Sign, _j: number) => (
            (i === _i && j === _j) ? getSign(orderValue()) : value
         )));

         setOrderValue(!orderValue());

         return res;
      })
   }

   const handleResetGame = () => {
      setGridValue(GRID_STUB);
   }

   return (
      <main class='layout'>
         <main class='game-panel'>
            <ResultPanel
               isFull={isFull}
               orderValue={orderValue}
               handleResetGame={handleResetGame}
            />
            <Grid>
               {
                  <For each={gridValue()}>
                     {(row, i) => (
                        <For each={row}>
                           {(value: Sign, j) => {
                              return (
                                 <Cell
                                    value={value}
                                    orderValue={getSign(orderValue())}
                                    onClick={attachCellClick(value, i(), j())}
                                 />
                              )
                           }}
                        </For>
                     )}
                  </For>
               }
            </Grid>
         </main>
      </main>
   );
};

export default App;
