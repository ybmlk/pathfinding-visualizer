import dijkstra from '../algorithms/dijkstra';
import useClearBoard from './useClearBoard';
import Context from '../Context';
import { useContext } from 'react';

function useVisualizeDijkstra() {
  const clearBoard = useClearBoard(true);
  const { grid, startNode, endNode, setisAnimating } = useContext(Context);

  return function () {
    clearBoard();
    setisAnimating(true);
    const { visitedNodes, nodesPath } = dijkstra(grid, startNode, endNode);

    for (let i = 0; i <= visitedNodes.length; i++) {
      // Don't add animate start and end nodes
      if (i === 0 || i === visitedNodes.length - 1) continue;
      // visualize shortest path at the end of the loop
      if (i === visitedNodes.length) {
        setTimeout(() => animateShortestPath(nodesPath), 10 * i);
        if (!nodesPath.length) setTimeout(() => setisAnimating(false), 10 * i);
        continue;
      }

      setTimeout(() => {
        const { row, col } = visitedNodes[i];
        document.getElementById(`node-${row}-${col}`).classList.add('node-visited');
      }, 10 * i);
    }

    function animateShortestPath(nodesPath) {
      for (let i = 0; i <= nodesPath.length; i++) {
        // Don't add animate start and end nodes
        if (i === 0 || i === nodesPath.length - 1) continue;

        if (i === nodesPath.length) {
          setTimeout(() => setisAnimating(false), 50 * i);
          continue;
        }

        setTimeout(() => {
          const { row, col } = nodesPath[i];
          document.getElementById(`node-${row}-${col}`).classList.add('node-shortest-path');
        }, 50 * i);
      }
    }
  };
}

export default useVisualizeDijkstra;
