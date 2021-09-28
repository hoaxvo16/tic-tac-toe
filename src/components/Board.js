import React from 'react';
import Square from './Square';

class Board extends React.Component {
   renderSquare(value, row, col) {
      return (
         <Square
            key={col}
            row={row}
            col={col}
            value={value}
            winPosition={this.props.winPosition}
            onClick={() => this.props.onClick(row, col)}
         />
      );
   }

   render() {
      return (
         <div>
            {this.props.matrix.map((array, row) => {
               return (
                  <div key={row} className="board-row">
                     {array.map((value, col) => {
                        return this.renderSquare(value, row, col);
                     })}
                  </div>
               );
            })}
         </div>
      );
   }
}

export default Board;
