import clearBoard from '../logic/clearBoard';
import { makeItWall } from '../logic/wallFunctions';

function generateBasicRandomMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLS) {
  clearBoard(grid);
  // the percentage of cells that turn to wall
  const WALL_PERCENTAGE = 0.35;
  const numberOfWalls = NUMBER_OF_ROWS * NUMBER_OF_COLS * WALL_PERCENTAGE;

  for (let i = 0; i < numberOfWalls; i++) {
    const randomRow = Math.floor(Math.random() * NUMBER_OF_ROWS);
    const randomCol = Math.floor(Math.random() * NUMBER_OF_COLS);
    makeItWall(randomRow, randomCol, grid);
  }
}

export default generateBasicRandomMaze;
