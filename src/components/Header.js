import React, { useContext, useRef } from 'react';
import useVisualizeDijkstra from '../hooks/useVisualizeDijkstra';
import useClearBoard from '../hooks/useClearBoard';
import useBasicRandomMaze from '../maze/useBasicRandomMaze';
import useDivisionMaze from '../maze/useDivisionMaze';
import useBacktrackingMaze from '../maze/useBacktrackingMaze';
import Context from '../Context';
import Logo from '../css/path.svg';

function Header() {
  const { isAnimating } = useContext(Context);

  const algoRef = useRef();
  const mazeRef = useRef();

  const clearBoard = useClearBoard('keep-walls');
  const resetBoard = useClearBoard('reset');
  const visualizeDijkstra = useVisualizeDijkstra();
  const generateBasicRandomMaze = useBasicRandomMaze();
  const generateDivisionMaze = useDivisionMaze();
  const generateBacktrackingMaze = useBacktrackingMaze();

  function toggleDropDown(element) {
    element.current.classList.toggle('show');
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (event.target.matches('#algobtn')) mazeRef.current.classList.remove('show');
    else if (event.target.matches('#mazebtn')) algoRef.current.classList.remove('show');
    else {
      algoRef.current.classList.remove('show');
      mazeRef.current.classList.remove('show');
    }
  };
  return (
    <nav id='navbar'>
      <div className='container'>
        <div className='logo'>
          <img src={Logo} alt='' /> <h1>ATHFINDING VISUALIZER</h1>
        </div>
        <ul className='main-menu'>
          <li>
            <button id='algobtn' disabled={isAnimating} onClick={() => toggleDropDown(algoRef)}>
              Select Algorithm <span className='caret'></span>
            </button>
            <ul ref={algoRef} className='dropdown-content'>
              <li>
                <button>Dijkstra's Algorithm</button>
              </li>
              <li>
                <button>A* Search Algorithm</button>
              </li>
              <li>
                <button>Breadth-first Search</button>
              </li>
              <li>
                <button>Depth-first Search</button>
              </li>
            </ul>
          </li>
          <li>
            <button id='mazebtn' disabled={isAnimating} onClick={() => toggleDropDown(mazeRef)}>
              Select Maze <span className='caret'></span>
            </button>
            <ul ref={mazeRef} className='dropdown-content'>
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
              <li>
                <button disabled={isAnimating} onClick={generateBasicRandomMaze}>
                  Basic Random Maze
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button className='mainbtn' disabled={isAnimating} onClick={visualizeDijkstra}>
              Visualize Dijkstra
            </button>
          </li>
          <li>
            <button disabled={isAnimating} onClick={clearBoard}>
              Clear Board
            </button>
          </li>
          <li>
            <button disabled={isAnimating} onClick={resetBoard}>
              Reset Board
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
