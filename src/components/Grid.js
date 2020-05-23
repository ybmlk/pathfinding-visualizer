import React, { useEffect, useState } from 'react';
import Node from './Node';
import visualizeDijkstra from '../logic/visualizeDijkstra';
import clearBoard from '../logic/clearBoard';
import mouseActions from '../logic/mouseActions';

function Grid() {
  const NUMBER_OF_ROWS = 21;
  const NUMBER_OF_COLS = 59;
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const END_NODE_ROW = 19;
  const END_NODE_COL = 57;

  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({});
  const [endNode, setEndNode] = useState({});
  const [isMouseDown, setMouseDown] = useState(false);
  const [isStartNodeMoving, setStartNodeMoving] = useState(false);
  const [isEndNodeMoving, setEndNodeMoving] = useState(false);
  const [isAnimating, setisAnimating] = useState(false);

  class Cell {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.isStart = row === START_NODE_ROW && col === START_NODE_COL;
      this.isEnd = row === END_NODE_ROW && col === END_NODE_COL;
      this.isVisited = false;
      this.isWall = false;
      this.distance = Infinity;
      this.previousNode = null;
    }
  }

  useEffect(() => {
    const table = Array.from({ length: NUMBER_OF_ROWS }, () => []);
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
        const newNode = new Cell(row, col);
        table[row].push(newNode);
        if (newNode.isStart) setStartNode(newNode);
        if (newNode.isEnd) setEndNode(newNode);
      }
    }
    setGrid(table);
    // eslint-disable-next-line
  }, []);

  const mouseActionsList = mouseActions(
    grid,
    isAnimating,
    isMouseDown,
    isStartNodeMoving,
    isEndNodeMoving,
    setMouseDown,
    setStartNode,
    setEndNode,
    setStartNodeMoving,
    setEndNodeMoving
  );

  function generateBasicRandomMaze() {
    clearBoard(grid);
    // the percentage of cells that turn to wall
    const WALL_PERCENTAGE = 0.4;
    const numberOfWalls = NUMBER_OF_ROWS * NUMBER_OF_COLS * WALL_PERCENTAGE;

    for (let i = 0; i < numberOfWalls; i++) {
      const randomRow = Math.floor(Math.random() * NUMBER_OF_ROWS);
      const randomCol = Math.floor(Math.random() * NUMBER_OF_COLS);
      makeItWall(randomRow, randomCol);
    }
  }

  function makeItWall(row, col) {
    if (grid[row][col].isStart || grid[row][col].isEnd) return;
    grid[row][col].isWall = true;
    document.getElementById(`node-${row}-${col}`).classList.add('node-wall');
  }

  const wallsToAnimate = [];

  function generateRecursiveMaze(rowStart, rowEnd, colStart, colEnd, orientation) {
    clearBoard(grid);
    
    // Top Border
    for (let c = 0; c < NUMBER_OF_COLS; c++) {
      wallsToAnimate.push([0, c]);
      makeItWall(0, c);
    }

    // Right Border
    for (let r = 1; r < NUMBER_OF_ROWS; r++) {
      wallsToAnimate.push([r, NUMBER_OF_COLS - 1]);
      makeItWall(r, NUMBER_OF_COLS - 1);
    }

    // Bottom Border
    for (let c = NUMBER_OF_COLS - 2; c >= 0; c--) {
      wallsToAnimate.push([NUMBER_OF_ROWS - 1, c]);
      makeItWall(NUMBER_OF_ROWS - 1, c);
    }

    // Left Border
    for (let r = NUMBER_OF_ROWS - 2; r >= 1; r--) {
      wallsToAnimate.push(r, 0);
      makeItWall(r, 0);
    }

    // Creates the inside of the maze
    mazeRecursively(rowStart, rowEnd, colStart, colEnd, orientation);
  }
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
        wallsToAnimate.push([currentRow, c]);
        makeItWall(currentRow, c);
      }

      if (currentRow - 2 - rowStart > colEnd - colStart) {
        mazeRecursively(rowStart, currentRow - 2, colStart, colEnd, 'horizontal');
      } else {
        mazeRecursively(rowStart, currentRow - 2, colStart, colEnd, 'vertical');
      }

      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        mazeRecursively(currentRow + 2, rowEnd, colStart, colEnd, 'horizontal');
      } else {
        mazeRecursively(currentRow + 2, rowEnd, colStart, colEnd, 'vertical');
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
        wallsToAnimate.push([r, currentCol]);
        makeItWall(r, currentCol);
      }

      if (currentCol - 2 - colStart > rowEnd - rowStart) {
        mazeRecursively(rowStart, rowEnd, colStart, currentCol - 2, 'vertical');
      } else {
        mazeRecursively(rowStart, rowEnd, colStart, currentCol - 2, 'horizontal');
      }

      if (colEnd - (currentCol + 2) > rowEnd - rowStart) {
        mazeRecursively(rowStart, rowEnd, currentCol + 2, colEnd, 'vertical');
      } else {
        mazeRecursively(rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal');
      }
    }
  }

  return (
    <div className='grid'>
      <button
        disabled={isAnimating}
        onClick={() => visualizeDijkstra(grid, startNode, endNode, setisAnimating)}
      >
        visualize Dijkstra
      </button>
      <button onClick={() => clearBoard(grid)}>Clear Board</button>
      <button onClick={() => generateBasicRandomMaze()}>Basic Random Maze</button>
      <button
        onClick={() =>
          generateRecursiveMaze(2, NUMBER_OF_ROWS - 3, 2, NUMBER_OF_COLS - 3, 'horizontal')
        }
      >
        Recursive Maze
      </button>
      <table>
        <tbody>
          {grid.map((currentRow, rowIdx) => (
            <tr key={rowIdx} id={`row-${rowIdx}`}>
              {currentRow.map((cell, cellIdx) => {
                return <Node key={cellIdx} {...cell} {...mouseActionsList} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;
