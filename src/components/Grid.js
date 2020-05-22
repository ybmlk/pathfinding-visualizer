import React, { useEffect, useState } from 'react';
import Node from './Node';
import visualizeDijkstra from '../logic/visualizeDijkstra';
import clearBoard from '../logic/clearBoard';
import mouseActions from '../logic/mouseActions';

function Grid() {
  const NUMBER_OF_ROWS = 20;
  const NUMBER_OF_COLS = 50;
  const START_NODE_ROW = 3;
  const START_NODE_COL = 3;
  const END_NODE_ROW = 15;
  const END_NODE_COL = 48;

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

  return (
    <div className='grid'>
      <button onClick={() => visualizeDijkstra(grid, startNode, endNode, setisAnimating)}>
        visualize Dijkstra
      </button>
      <button onClick={() => clearBoard(grid)}>Clear Board</button>
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
