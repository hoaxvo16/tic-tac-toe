import React from 'react';
import { getNewState, checkDraw, calculateWinner } from '../utils';
import Board from './Board';
class Game extends React.Component {
   constructor(props) {
      super(props);

      const res1 = prompt('Insert matrix column (>=3)', '3');
      const res2 = prompt('Insert matrix row (>=3)', '3');

      let col = parseInt(res1);
      let row = parseInt(res2);
      let toWin = 3;
      if (isNaN(col) || col < 3) {
         col = 3;
      }
      if (isNaN(row) || row < 3) {
         row = 3;
      }
      if (row >= 5 && col >= 5) {
         toWin = 5;
      }

      this.state = {
         history: [
            {
               matrix: Array(row).fill(Array(col).fill(null)),
               position: { col: null, row: null },
               move: 0,
            },
         ],
         isFinished: false,
         winPosition: [],
         stepNumber: 0,
         xIsNext: true,
         isAscending: true,
         toWin: toWin,
      };
   }

   handleClick(row, col) {
      if (!this.state.isFinished) {
         const newState = getNewState(this.state, row, col);

         if (newState) {
            this.setState(newState);
         }
      }
   }

   jumpTo(step) {
      this.setState({
         stepNumber: step,
         isFinished: false,
         winPosition: [],
         xIsNext: step % 2 === 0,
      });
   }

   sortAscending() {
      if (!this.state.isAscending) {
         const history = [...this.state.history];
         history.reverse();
         this.setState({
            history: history,
            isAscending: true,
         });
      }
   }

   sortDescending() {
      if (this.state.isAscending) {
         const history = [...this.state.history];
         history.reverse();
         this.setState({
            history: history,
            isAscending: false,
         });
      }
   }

   componentDidUpdate() {
      const history = this.state.history;
      let idx = this.state.isAscending
         ? this.state.stepNumber
         : history.length - this.state.stepNumber - 1;
      const current = history[idx];
      const winnerInfo = calculateWinner(
         current.matrix,
         current.position.row,
         current.position.col
      );
      if (winnerInfo && !this.state.isFinished) {
         this.setState({ winPosition: winnerInfo.position, isFinished: true });
      }
   }

   render() {
      const history = this.state.history;
      let idx = this.state.isAscending
         ? this.state.stepNumber
         : history.length - this.state.stepNumber - 1;
      const current = history[idx];
      const winnerInfo = calculateWinner(
         current.matrix,
         current.position.row,
         current.position.col
      );
      const draw = checkDraw(current.matrix);

      const moves = history.map(step => {
         const desc = step.move
            ? 'Go to move #' + step.move
            : 'Go to game start';
         return (
            <div style={{ marginRight: '10px' }} key={step.move}>
               {step.position.col !== null && (
                  <p>
                     col:{step.position.col + 1} row:{step.position.row + 1}
                  </p>
               )}
               <button onClick={() => this.jumpTo(step.move)}>
                  {step.move === this.state.stepNumber ? (
                     <b>{desc}</b>
                  ) : (
                     <span>{desc}</span>
                  )}
               </button>
            </div>
         );
      });

      let status;
      if (winnerInfo) {
         status = 'Winner: ' + winnerInfo.player;
      } else {
         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      if (draw && winnerInfo === null) {
         status = 'Draw!!!';
      }

      return (
         <div className="game">
            <div className="game-board">
               <Board
                  matrix={current.matrix}
                  winPosition={this.state.winPosition}
                  onClick={(row, col) => this.handleClick(row, col)}
               />
            </div>
            <div className="game-info">
               <div>{status}</div>
               <div>{this.state.toWin} To Win</div>
               <div className="button-area">
                  <button onClick={() => this.sortAscending()}>
                     Sort move ascending order
                  </button>
                  <button onClick={() => this.sortDescending()}>
                     Sort move descending order
                  </button>
               </div>
               <div className="move">{moves}</div>
            </div>
         </div>
      );
   }
}

export default Game;
