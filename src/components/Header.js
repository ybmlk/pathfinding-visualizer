import React, { useContext } from 'react';
import useVisualizeDijkstra from '../hooks/useVisualizeDijkstra';
import useClearBoard from '../hooks/useClearBoard';
import useBasicRandomMaze from '../maze/useBasicRandomMaze';
import useDivisionMaze from '../maze/useDivisionMaze';
import useBacktrackingMaze from '../maze/useBacktrackingMaze';
import Context from '../Context';

function Header() {
  const { isAnimating } = useContext(Context);

  const clearBoard = useClearBoard();
  const visualizeDijkstra = useVisualizeDijkstra();
  const generateBasicRandomMaze = useBasicRandomMaze();
  const generateDivisionMaze = useDivisionMaze();
  const generateBacktrackingMaze = useBacktrackingMaze();
  return (
    <nav id='navbar'>
      <div className='container'>
        <h1 className='logo'>PATHFINDING VISUALIZER</h1>
        <ul>
          <li>
            <button disabled={isAnimating} onClick={visualizeDijkstra}>
              Visualize Dijkstra
            </button>
          </li>
          <li>
            <ul>
              <li>
                <button disabled={isAnimating} onClick={generateBasicRandomMaze}>
                  Basic Random Maze
                </button>
              </li>
              <li>
                <button disabled={isAnimating} onClick={generateDivisionMaze}>
                  Division Maze
                </button>
              </li>
              <li>
                <button disabled={isAnimating} onClick={generateBacktrackingMaze}>
                  Backtracking Maze
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button disabled={isAnimating} onClick={clearBoard}>
              Clear Board
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
