import React, { useEffect, useState } from 'react';
import Node from './Node';
import visualizeDijkstra from '../logic/visualizeDijkstra';

function Grid() {
  const NUMBER_OF_ROWS = 20;
  const NUMBER_OF_COLS = 50;
  const START_NODE_ROW = 3;
  const START_NODE_COL = 3;
  const END_NODE_ROW = 15;
  const END_NODE_COL = 48;

  const [startNode, setStart] = useState({});
  const [endNode, setEnd] = useState({});
  const [grid, setGrid] = useState([]);
  const [isMouseDown, setMouseDown] = useState(false);

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
        if (newNode.isStart) setStart(newNode);
        if (newNode.isEnd) setEnd(newNode);
      }
    }
    setGrid(table);
    // eslint-disable-next-line
  }, []);

  const handleMouseDown = () => setMouseDown(true);
  const handleMouseUp = () => setMouseDown(false);

  function handleMouseEnter(row, col) {
    if (isMouseDown) {
      grid[row][col].isWall = true;
      document.getElementById(`node-${row}-${col}`).classList.add('node-wall');
    }
  }

  const mouseActions = { handleMouseDown, handleMouseUp, handleMouseEnter };

  return (
    <div className='grid'>
      <button onClick={() => visualizeDijkstra(grid, startNode, endNode)}>
        visualize Dijkstra
      </button>
      {grid.map((currentRow, rowIdx) => (
        <div className='row' key={rowIdx} id={`row-${rowIdx}`}>
          {currentRow.map((cell, cellIdx) => {
            return <Node key={cellIdx} {...cell} {...mouseActions} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default Grid;
