import { Component, createSignal, For, JSX } from 'solid-js';

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

interface ICell {
   value: Sign | undefined;
   onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

const Cell: Component<ICell> = ({ value, onClick }) => {
   return (
      <button onClick={onClick}>
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
   const [orderValue, setOrderValue] = createSignal(false);
   const [gridValue, setGridValue] = createSignal(GRID_STUB);

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

   return (
      <div>
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
