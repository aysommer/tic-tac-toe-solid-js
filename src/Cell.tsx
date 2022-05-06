import {
   Component,
   createEffect,
   createSignal,
   JSX
} from 'solid-js';
import type { Sign } from './types';

interface ICell {
   value: Sign;
   orderValue: Sign;
   onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
}

const HOVER_STYLE: JSX.CSSProperties = {
   color: 'gray'
};

const Cell: Component<ICell> = ({ value, orderValue, onClick }) => {
   const [shownValue, setShownValue] = createSignal<Sign>(value);
   const [isShown, setIsShown] = createSignal<boolean>(false);
   const [hoverStyle, setHoverStyle] = createSignal<JSX.CSSProperties>();

   const attachHover = (val: boolean) => {
      return () => setIsShown(val);
   };

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
         {shownValue()}
      </button>
   );
};

export default Cell;