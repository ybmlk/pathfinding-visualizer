import React, { useEffect, useState } from 'react';
import Node from './Node';
import dijkstra from '../algorithms/dijkstra';

function Grid() {
  const NUMBER_OF_ROWS = 20;
  const NUMBER_OF_COLS = 20;
  const START_NODE_ROW = 9;
  const START_NODE_COL = 9;
  const END_NODE_ROW = 18;
  const END_NODE_COL = 18;

  const [startNode, setStart] = useState({});
  const [endNode, setEnd] = useState({});
  const [grid, setGrid] = useState([]);

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

  function visualizeDijkstra() {
    const { visitedNodes, nodesPath } = dijkstra(grid, startNode, endNode);

    for (let i = 0; i <= visitedNodes.length; i++) {
      // visualize shortest path at the end of the loop
      if (i === visitedNodes.length) {
        setTimeout(() => animateShortestPath(nodesPath), 10 * i);
        continue;
      }

      setTimeout(() => {
        const { row, col } = visitedNodes[i];
        document.getElementById(`node-${row}-${col}`).classList.add('node-visited');
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesPath) {
    for (let i = 0; i < nodesPath.length; i++) {
      setTimeout(() => {
        const { row, col } = nodesPath[i];
        document.getElementById(`node-${row}-${col}`).classList.add('node-pathway');
      }, 50 * i);
    }
  }

  return (
    <div className='grid'>
      <button onClick={visualizeDijkstra}>visualize Dijkstra</button>
      {grid.map((currentRow, rowIdx) => (
        <div className='row' key={rowIdx} id={`row-${rowIdx}`}>
          {currentRow.map((cell, cellIdx) => {
            return <Node {...cell} key={cellIdx} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default Grid;
