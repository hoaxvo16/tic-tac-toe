import React from 'react';
import { getNewState, checkDraw, calculateWinner } from '../utils';
import Board from './Board';
class Game extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         history: [
            {
               squares: Array(9).fill(null),
               position: { col: null, row: null },
               move: 0,
            },
         ],
         isFinished: false,
         winPosition: [],
         stepNumber: 0,
         xIsNext: true,
         isAscending: true,
      };
   }

   handleClick(i) {
      const newState = getNewState(this.state, i);
      if (newState) {
         this.setState(newState);
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
      const winnerInfo = calculateWinner(current.squares);
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
      const winnerInfo = calculateWinner(current.squares);
      const draw = checkDraw(current.squares);

      const moves = history.map(step => {
         const desc = step.move
            ? 'Go to move #' + step.move
            : 'Go to game start';
         return (
            <div key={step.move}>
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
         status = 'Winner: ' + winnerInfo.winner;
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
                  squares={current.squares}
                  winPosition={this.state.winPosition}
                  onClick={i => this.handleClick(i)}
               />
            </div>
            <div className="game-info">
               <div>{status}</div>
               <div className="button-area">
                  <button onClick={() => this.sortAscending()}>
                     Sort move ascending order
                  </button>
                  <button onClick={() => this.sortDescending()}>
                     Sort move descending order
                  </button>
               </div>
               <ol>{moves}</ol>
            </div>
         </div>
      );
   }
}

export default Game;
