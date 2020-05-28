import useClearBoard from '../hooks/useClearBoard';
import useVisualizeMaze from '../hooks/useVisualizeMaze';
import { createBoundary } from '../functions/wallFunctions';
import Context from '../Context';
import { useContext } from 'react';

function useBacktrackingMaze() {
  const clearBoard = useClearBoard();
  const { grid, NUMBER_OF_ROWS, NUMBER_OF_COLS } = useContext(Context);
  const visualizeMaze = useVisualizeMaze();

  return function () {
    clearBoard();
    const border = createBoundary(NUMBER_OF_COLS, NUMBER_OF_ROWS);
    const addWallsToAnimate = [...border];
    const removeWallsToAnimate = [];

    generateInitialWall(2, NUMBER_OF_ROWS - 3, 2, NUMBER_OF_COLS - 3, grid);
    backtrackingRecursion(grid[1][1], grid);
    visualizeMaze(addWallsToAnimate, 2, removeWallsToAnimate, 25);

    function generateInitialWall(rowStart, rowEnd, colStart, colEnd) {
      const wallRows = [];
      for (let r = rowStart; r <= rowEnd; r += 2) wallRows.push(r);

      for (let r of wallRows) {
        for (let c = 0; c < NUMBER_OF_COLS; c++) {
          addWallsToAnimate.push([r, c]);
        }
      }

      const wallCols = [];
      for (let c = colStart; c <= colEnd; c += 2) wallCols.push(c);

      for (let c of wallCols) {
        for (let r = 0; r < NUMBER_OF_ROWS; r++) {
          addWallsToAnimate.push([r, c]);
        }
      }
    }

    function backtrackingRecursion(currentNode) {
      if (currentNode.isVisited) return;

      const { row, col } = currentNode;
      currentNode.isVisited = true;
      const neighbors = [];

      // Top
      if (row - 2 > 0 && !grid[row - 2][col].isVisited) neighbors.push(grid[row - 2][col]);
      // Bottom
      if (row + 2 < NUMBER_OF_ROWS - 1 && !grid[row + 2][col].isVisited)
        neighbors.push(grid[row + 2][col]);
      // Right
      if (col - 2 > 0 && !grid[row][col - 2].isVisited) neighbors.push(grid[row][col - 2]);
      // Left
      if (col + 2 < NUMBER_OF_COLS - 1 && !grid[row][col + 2].isVisited)
        neighbors.push(grid[row][col + 2]);

      while (neighbors.length) {
        const randomIdx = Math.floor(Math.random() * neighbors.length);
        const randomNeighbor = neighbors[randomIdx];
        neighbors.splice(randomIdx, 1);

        if (randomNeighbor.isVisited) continue;
        // Top
        if (randomNeighbor.row < row) removeWallsToAnimate.push([row - 1, col]);
        // Bottom
        if (randomNeighbor.row > row) removeWallsToAnimate.push([row + 1, col]);
        // Right
        if (randomNeighbor.col < col) removeWallsToAnimate.push([row, col - 1]);
        // left
        if (randomNeighbor.col > col) removeWallsToAnimate.push([row, col + 1]);
        backtrackingRecursion(randomNeighbor);
      }
    }
  };
}

export default useBacktrackingMaze;
