import useClearBoard from '../hooks/useClearBoard';
import useVisualizeMaze from '../hooks/useVisualizeMaze';
import { createBoundary } from '../functions/wallFunctions';
import Context from '../Context';
import { useContext } from 'react';

function useDivisionMaze() {
  const clearBoard = useClearBoard();
  const visualizeMaze = useVisualizeMaze();
  const { grid, NUMBER_OF_ROWS, NUMBER_OF_COLS } = useContext(Context);

  return function () {
    clearBoard();
    const boundary = createBoundary(NUMBER_OF_COLS, NUMBER_OF_ROWS);
    const addWallsToAnimate = [...boundary];

    // Creates the inside of the maze
    mazeRecursively(2, NUMBER_OF_ROWS - 3, 2, NUMBER_OF_COLS - 3, 'horizontal');
    visualizeMaze(addWallsToAnimate, 10);

    function mazeRecursively(rowStart, rowEnd, colStart, colEnd, orientation) {
      if (rowStart > rowEnd || colStart > colEnd) return;

      if (orientation === 'horizontal') {
        const possibleRows = [];
        for (let num = rowStart; num <= rowEnd; num += 2) possibleRows.push(num);
        const currentRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

        const possibleCols = [];
        for (let num = colStart - 1; num <= colEnd + 1; num += 2) possibleCols.push(num);
        // this random col will be a gate (won't be turned into wall)
        const randomCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

        for (let c = colStart - 1; c <= colEnd + 1; c++) {
          if (c === randomCol) continue;
          addWallsToAnimate.push([currentRow, c]);
        }

        if (currentRow - 2 - rowStart > colEnd - colStart) {
          mazeRecursively(rowStart, currentRow - 2, colStart, colEnd, 'horizontal', grid);
        } else {
          mazeRecursively(rowStart, currentRow - 2, colStart, colEnd, 'vertical', grid);
        }

        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
          mazeRecursively(currentRow + 2, rowEnd, colStart, colEnd, 'horizontal', grid);
        } else {
          mazeRecursively(currentRow + 2, rowEnd, colStart, colEnd, 'vertical', grid);
        }
      } else {
        // If its vertical
        const possibleCols = [];
        for (let num = colStart; num <= colEnd; num += 2) possibleCols.push(num);
        const currentCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

        const possibleRows = [];
        for (let num = rowStart - 1; num <= rowEnd + 1; num += 2) possibleRows.push(num);
        // this random row will be a gate (won't be turned into wall)
        const randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

        for (let r = rowStart - 1; r <= rowEnd + 1; r++) {
          if (r === randomRow) continue;
          addWallsToAnimate.push([r, currentCol]);
        }

        if (currentCol - 2 - colStart > rowEnd - rowStart) {
          mazeRecursively(rowStart, rowEnd, colStart, currentCol - 2, 'vertical', grid);
        } else {
          mazeRecursively(rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', grid);
        }

        if (colEnd - (currentCol + 2) > rowEnd - rowStart) {
          mazeRecursively(rowStart, rowEnd, currentCol + 2, colEnd, 'vertical', grid);
        } else {
          mazeRecursively(rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', grid);
        }
      }
    }
  };
}

export default useDivisionMaze;
