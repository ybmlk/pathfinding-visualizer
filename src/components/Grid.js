import React, { useEffect, useContext } from 'react';
import Node from './Node';
import useMouseActions from '../hooks/useMouseActions';
import Context from '../Context';

function Grid() {
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const END_NODE_ROW = 19;
  const END_NODE_COL = 57;

  const { grid, setGrid, setStartNode, setEndNode, NUMBER_OF_ROWS, NUMBER_OF_COLS } = useContext(
    Context
  );

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

  const mouseActionsList = useMouseActions();

  return (
    <div className='grid'>
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
