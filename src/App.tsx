import {
   Component,
   createEffect,
   createSignal,
   For,
   JSX
} from 'solid-js';
import './App.css';

type Sign = 'X' | 'O';

const GRID_STUB = Array(3).fill(Array(3).fill(undefined));

interface ICell {
   value: Sign | undefined;
   onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

const Cell: Component<ICell> = ({ value, onClick }) => {
   return (
      <button onClick={onClick} class='grid__cell'>
         {value}
      </button>
   )
}

const Grid: Component = ({ children }) => {
   return (
      <section class='grid'>
         {children}
      </section>
   )
}

const getSign = (curr: boolean): Sign => curr ? 'X' : 'O';

const App: Component = () => {
   const [gridValue, setGridValue] = createSignal(GRID_STUB);
   const [orderValue, setOrderValue] = createSignal(false);
   const [isFullGrid, setIsFullGrid] = createSignal(false);

   createEffect(() => {
      setIsFullGrid(gridValue().every(row => row.every(Boolean)));
   });

   const attachCellClick = (value: Sign, i: number, j: number) => {
      if (value) {
         return;
      }

      return () => setCellValue(value, i, j);
   }

   const attachCellHover = ()

   const setCellValue = (value: Sign, i: number, j: number) => {
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
      <div class='layout'>
         {
            (!isFullGrid()) ? (
               <h2>Order now: {getSign(orderValue())}</h2>
            ) : (
               <button onClick={handleResetGame}>Reset</button>
            )
         }
         <Grid>
            {
               <For each={gridValue()}>
                  {(row, i) => (
                     <For each={row}>
                        {(value: Sign, j) => {
                           return <Cell value={value} onClick={attachCellClick(value, i(), j())} />
                        }}
                     </For>
                  )}
               </For>
            }
         </Grid>
      </div>
   );
};

export default App;
