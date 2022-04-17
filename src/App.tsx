import {
   Component,
   createEffect,
   createSignal,
   For,
   JSX
} from 'solid-js';

type Sign = 'X' | 'O';

const GRID_STUB = Array(3).fill(Array(3).fill(undefined));
const GRID_STYLE = {
   'display': 'grid',
   'grid-template-columns': 'repeat(3, 1fr)',
   'grid-template-rows': 'repeat(3, 1fr)',
   'grid-column-gap': 3,
   'grid-row-gap': 3,
   'width': '300px',
   'height': '300px'
};
const CELL_STYLE = {
   'cursor': 'pointer'
};

interface ICell {
   value: Sign | undefined;
   onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

const Cell: Component<ICell> = ({ value, onClick }) => {
   return (
      <button onClick={onClick} style={CELL_STYLE}>
         {value}
      </button>
   )
}

const Grid: Component = ({ children }) => {
   return (
      <section style={GRID_STYLE}>
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

      return () => {
         setGridValue((old) => {
            const res = [...old].map((row, _i) => row.map((value: Sign, _j: number) => (
               (i === _i && j === _j) ? getSign(orderValue()) : value
            )));

            setOrderValue(!orderValue())

            return res;
         })
      }
   }

   const handleResetGame = () => {
      setGridValue(GRID_STUB);
   }

   return (
      <div>
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
