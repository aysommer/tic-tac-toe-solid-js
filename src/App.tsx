import {
   Accessor,
   Component,
   createEffect,
   createSignal,
   For,
   JSX
} from 'solid-js';
import './App.css';

type Sign = 'X' | 'O';

const GRID_STUB = Array(3).fill(Array(3).fill(undefined));

const HOVER_STYLE: JSX.CSSProperties = {
   color: 'gray'
};

interface ICell {
   value: Sign;
   orderValue: Sign;
   onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
}

const getSign = (val: boolean): Sign => val ? 'X' : 'O';

const Cell: Component<ICell> = ({ value, orderValue, onClick }) => {
   const [shownValue, setShownValue] = createSignal<Sign>(value);
   const [isShown, setIsShown] = createSignal<boolean>(false);
   const [hoverStyle, setHoverStyle] = createSignal<JSX.CSSProperties>();

   const attachHover = (val: boolean) => {
      return () => setIsShown(val);
   }

   createEffect(() => {
      setHoverStyle((!value && isShown()) ? HOVER_STYLE : undefined);
      setShownValue((!value && isShown()) ? orderValue : value);
   });

   return (
      <button
         onClick={onClick}
         onMouseEnter={attachHover(true)}
         onMouseLeave={attachHover(false)}
         style={hoverStyle()}
         class='grid__cell'>
         {
            shownValue()
         }
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

const App: Component = () => {
   const [gridValue, setGridValue] = createSignal<typeof GRID_STUB>(GRID_STUB);
   const [orderValue, setOrderValue] = createSignal<boolean>(false);
   const [isFullGrid, setIsFullGrid] = createSignal<boolean>(false);

   createEffect(() => {
      setIsFullGrid(gridValue().every(row => row.every(Boolean)));
   });

   const attachCellClick = (value: Sign, i: number, j: number) => {
      return () => {
         if (!value) {
            setCellValue(value, i, j)
         }
      };
   }

   // const attachCellHover = ()

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
      </div>
   );
};

export default App;
