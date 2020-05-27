import Context from '../Context';
import { useContext } from 'react';

function useClearBoard(...arg) {
  const {
    grid,
    setPathFound,
    startNode,
    endNode,
    START_NODE,
    END_NODE,
    setStartNode,
    setEndNode,
  } = useContext(Context);

  return function () {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        grid[row][col].isVisited = false;
        grid[row][col].distance = Infinity;
        grid[row][col].previousNode = null;

        document
          .getElementById(`node-${row}-${col}`)
          .classList.remove(
            'node-visited',
            'node-shortest-path',
            'node-instant-visited',
            'node-instant-shortest-path'
          );

        if (!arg.includes('keep-walls')) {
          grid[row][col].isWall = false;
          document.getElementById(`node-${row}-${col}`).classList.remove('node-wall');
        }

        if (!arg.includes('keep-path-found')) {
          setPathFound(false);
          document.getElementById(`node-${row}-${col}`).classList.remove('hidden-wall');
        }

        // Resets the start and end nodes to their original position
        if (arg.includes('reset')) {
          const { row: rowStart, col: colStart } = startNode;
          grid[rowStart][colStart].isStart = false;
          document.getElementById(`node-${rowStart}-${colStart}`).classList.remove('node-start');
          grid[START_NODE.row][START_NODE.col].isStart = true;
          document
            .getElementById(`node-${START_NODE.row}-${START_NODE.col}`)
            .classList.add('node-start');
          setStartNode(grid[START_NODE.row][START_NODE.col]);

          const { row: rowEnd, col: colEnd } = endNode;
          grid[rowEnd][colEnd].isEnd = false;
          document.getElementById(`node-${rowEnd}-${colEnd}`).classList.remove('node-end');
          grid[END_NODE.row][END_NODE.col].isEnd = true;
          document.getElementById(`node-${END_NODE.row}-${END_NODE.col}`).classList.add('node-end');
          setEndNode(grid[END_NODE.row][END_NODE.col]);
        }
      }
    }
  };
}

export default useClearBoard;
