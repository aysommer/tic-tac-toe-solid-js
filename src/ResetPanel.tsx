import type { Component, Accessor } from "solid-js";
import { getSign } from "./utils";

interface IResultPanel {
   isFull: Accessor<boolean>;
   orderValue: Accessor<boolean>;
   handleResetGame: () => void;
}

const ResultPanel: Component<IResultPanel> = ({ isFull, orderValue, handleResetGame }) => {
   return (
      <div class='reset-panel'>
         {
            (!isFull()) ? (
               <span>Order now: {getSign(orderValue())}</span>
            ) : (
               <button class="reset-button" onClick={handleResetGame}>Reset</button>
            )
         }
      </div>
   );
}

export default ResultPanel;