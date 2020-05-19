import React, { useEffect, useState } from 'react';
import Node from './Node';

function Grid() {
  const [nodes, setNode] = useState([]);
  const [start, setStart] = useState({ row: 10, col: 10 });
  const [end, setEnd] = useState({ row: 15, col: 15 });

  useEffect(() => {
    const NUMBER_OF_ROWS = 20;
    const NUMBER_OF_COLS = 20;
    const table = Array.from({ length: NUMBER_OF_ROWS }, () => []);
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
        table[row].push({ row, col });
      }
    }
    setNode(table);
  }, []);

  return (
    <div className='grid'>
      {nodes.map((row, rowIdx) => (
        <div className='row' key={rowIdx} id={`row-${rowIdx}`}>
          {row.map((cell, cellIdx) => {
            const { row, col } = cell;
            const isStart = row === start.row && col === start.col;
            const isEnd = row === end.row && col === end.col;
            return <Node key={cellIdx} isStart={isStart} isEnd={isEnd} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default Grid;
