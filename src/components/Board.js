import React from 'react';
import Square from './Square';
import { matrix } from '../utils';

class Board extends React.Component {
   renderSquare(i) {
      return (
         <Square
            key={i}
            index={i}
            value={this.props.squares[i]}
            winPosition={this.props.winPosition}
            onClick={() => this.props.onClick(i)}
         />
      );
   }

   render() {
      return (
         <div>
            {matrix.map((array, index) => {
               return (
                  <div key={index} className="board-row">
                     {array.map(i => {
                        return this.renderSquare(i);
                     })}
                  </div>
               );
            })}
         </div>
      );
   }
}

export default Board;
