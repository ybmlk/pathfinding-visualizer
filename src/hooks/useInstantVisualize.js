import dijkstra from '../algorithms/dijkstra';
import useClearBoard from './useClearBoard';
import Context from '../Context';
import { useContext } from 'react';

function useInstantVisualize() {
  const clearBoard = useClearBoard('keep-walls', 'keep-path-found');
  const { grid } = useContext(Context);

  return function (startNode, endNode) {
    clearBoard();
    const { visitedNodes, nodesPath } = dijkstra(grid, startNode, endNode);

    for (let i = 0; i < visitedNodes.length; i++) {
      const { row, col } = visitedNodes[i];
      document.getElementById(`node-${row}-${col}`).classList.add('node-instant-visited');
    }

    for (let i = 0; i < nodesPath.length; i++) {
      const { row, col } = nodesPath[i];
      document.getElementById(`node-${row}-${col}`).classList.add('node-instant-shortest-path');
    }
  };
}

export default useInstantVisualize;
