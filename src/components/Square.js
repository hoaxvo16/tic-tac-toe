export default function Square({ value, onClick, winPosition, index }) {
   const isWinSquare = winPosition.includes(index);
   return (
      <button
         className={isWinSquare ? 'square-win' : 'square'}
         onClick={onClick}
      >
         {value}
      </button>
   );
}
