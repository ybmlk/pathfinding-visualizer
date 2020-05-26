import useClearBoard from '../hooks/useClearBoard';
import visualizeMaze from '../functions/visualizeMaze';
import Context from '../Context';
import { useContext } from 'react';

function useDivisionMaze() {
  const clearBoard = useClearBoard();
  const { grid, NUMBER_OF_ROWS, NUMBER_OF_COLS, setisAnimating } = useContext(Context);

  return function () {
    clearBoard();
    const addWallsToAnimate = [];

    // Top Border
    for (let c = 0; c < NUMBER_OF_COLS; c++) {
      addWallsToAnimate.push([0, c]);
    }

    // Right Border
    for (let r = 1; r < NUMBER_OF_ROWS; r++) {
      addWallsToAnimate.push([r, NUMBER_OF_COLS - 1]);
    }

    // Bottom Border
    for (let c = NUMBER_OF_COLS - 2; c >= 0; c--) {
      addWallsToAnimate.push([NUMBER_OF_ROWS - 1, c]);
    }

    // Left Border
    for (let r = NUMBER_OF_ROWS - 2; r >= 1; r--) {
      addWallsToAnimate.push([r, 0]);
    }

    // Creates the inside of the maze
    mazeRecursively(2, NUMBER_OF_ROWS - 3, 2, NUMBER_OF_COLS - 3, 'horizontal');
    visualizeMaze(addWallsToAnimate, 10, [], 1, grid, setisAnimating);

    function mazeRecursively(rowStart, rowEnd, colStart, colEnd, orientation) {
      if (rowStart > rowEnd || colStart > colEnd) return;

      if (orientation === 'horizontal') {
        const possibleRows = [];
        for (let num = rowStart; num <= rowEnd; num += 2) possibleRows.push(num);
        const currentRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];

        const possibleCols = [];
        for (let num = colStart - 1; num <= colEnd + 1; num += 2) possibleCols.push(num);
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
        const possibleCols = [];
        for (let num = colStart; num <= colEnd; num += 2) possibleCols.push(num);
        const currentCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];

        const possibleRows = [];
        for (let num = rowStart - 1; num <= rowEnd + 1; num += 2) possibleRows.push(num);
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
