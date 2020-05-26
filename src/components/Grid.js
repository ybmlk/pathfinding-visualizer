import React, { useEffect, useContext } from 'react';
import Node from './Node';
import useVisualizeDijkstra from '../hooks/useVisualizeDijkstra';
import useClearBoard from '../hooks/useClearBoard';
import useMouseActions from '../hooks/useMouseActions';
import useBasicRandomMaze from '../maze/useBasicRandomMaze';
import useDivisionMaze from '../maze/useDivisionMaze';
import useBacktrackingMaze from '../maze/useBacktrackingMaze';
import Context from '../Context';

function Grid() {
  const START_NODE_ROW = 1;
  const START_NODE_COL = 1;
  const END_NODE_ROW = 21;
  const END_NODE_COL = 57;

  const {
    grid,
    isAnimating,
    setGrid,
    setStartNode,
    setEndNode,
    NUMBER_OF_ROWS,
    NUMBER_OF_COLS,
  } = useContext(Context);

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
  const clearBoard = useClearBoard();
  const visualizeDijkstra = useVisualizeDijkstra();
  const generateBasicRandomMaze = useBasicRandomMaze();
  const generateDivisionMaze = useDivisionMaze();
  const generateBacktrackingMaze = useBacktrackingMaze();

  return (
    <div className='grid'>
      <button disabled={isAnimating} onClick={visualizeDijkstra}>
        visualize Dijkstra
      </button>
      <button disabled={isAnimating} onClick={clearBoard}>
        Clear Board
      </button>
      <button disabled={isAnimating} onClick={generateBasicRandomMaze}>
        Basic Random Maze
      </button>
      <button disabled={isAnimating} onClick={generateDivisionMaze}>
        Division Maze
      </button>
      <button disabled={isAnimating} onClick={generateBacktrackingMaze}>
        Backtracking Maze
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
