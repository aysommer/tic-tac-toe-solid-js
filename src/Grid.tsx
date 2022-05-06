import type { Component } from 'solid-js';

const Grid: Component = ({ children }) => {
   return (
      <section class='grid'>
         {children}
      </section>
   );
};

export default Grid;