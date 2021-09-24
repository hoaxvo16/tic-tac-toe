export const matrix = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
];

export function calculateWinner(squares) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
         squares[a] &&
         squares[a] === squares[b] &&
         squares[a] === squares[c]
      ) {
         return { winner: squares[a], position: [a, b, c] };
      }
   }
   return null;
}

export function findColAndRow(value) {
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         if (matrix[i][j] === value) {
            return { row: i, col: j };
         }
      }
   }
}

export function checkDraw(squares) {
   for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
         return false;
      }
   }
   return true;
}

export function getNewState(state, i) {
   if (state.isAscending) {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      const { row, col } = findColAndRow(i);
      if (calculateWinner(squares) || squares[i]) {
         return null;
      }
      squares[i] = state.xIsNext ? 'X' : 'O';
      return {
         history: history.concat([
            {
               squares: squares,
               position: { col: col, row: row },
               move: current.move + 1,
            },
         ]),
         stepNumber: history.length,

         xIsNext: !state.xIsNext,
      };
   } else {
      const history = state.history.slice(
         state.history.length - state.stepNumber - 1,
         state.history.length
      );
      const current = history[0];
      const squares = current.squares.slice();

      const { row, col } = findColAndRow(i);
      if (calculateWinner(squares) || squares[i]) {
         return null;
      }
      squares[i] = state.xIsNext ? 'X' : 'O';
      return {
         history: [
            {
               squares: squares,
               position: { col: col, row: row },
               move: current.move + 1,
            },
            ...history,
         ],
         stepNumber: history.length,
         xIsNext: !state.xIsNext,
      };
   }
}
