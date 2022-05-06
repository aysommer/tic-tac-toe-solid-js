import type { Component, Accessor } from "solid-js";
import { getSign } from "./utils";

interface IResetPanel {
   isFull: Accessor<boolean>;
   orderValue: Accessor<boolean>;
   handleResetGame: () => void;
}

const ResetPanel: Component<IResetPanel> = ({ isFull, orderValue, handleResetGame }) => {
   return (
      <div class='reset-panel'>
         {
            (!isFull()) ? (
               <span>Order now: {getSign(orderValue())}</span>
            ) : (
               <button onClick={handleResetGame}>Reset</button>
            )
         }
      </div>
   );
}

export default ResetPanel;