import Context from '../Context';
import { useContext } from 'react';
import useInstantVisualize from './useInstantVisualize';

function useMouseActions() {
  const {
    grid,
    startNode,
    endNode,
    isAnimating,
    isMouseDown,
    isStartNodeMoving,
    isEndNodeMoving,
    pathFound,
    setMouseDown,
    setStartNode,
    setEndNode,
    setStartNodeMoving,
    setEndNodeMoving,
  } = useContext(Context);

  const instantVisualizer = useInstantVisualize();

  // Mouse envent listners
  function handleMouseDown(isStart, isEnd, row, col, e) {
    e.preventDefault();
    if (isAnimating) return;
    setMouseDown(true);
    if (isStart) setStartNodeMoving(true);
    else if (isEnd) setEndNodeMoving(true);
    else toggleWall(row, col);
  }

  function handleMouseUp() {
    if (isAnimating) return;
    setMouseDown(false);
    setStartNodeMoving(false);
    setEndNodeMoving(false);
  }

  function handleMouseEnter(row, col) {
    if (isAnimating) return;
    if (isMouseDown) {
      if (isStartNodeMoving) {
        addStartNode(row, col);
        if (pathFound) instantVisualizer(grid[row][col], endNode);
      } else if (isEndNodeMoving) {
        if (grid[row][col].isWall) grid[row][col].isWall = false;
        if (pathFound) instantVisualizer(startNode, grid[row][col]);
        addEndNode(row, col);
      } else toggleWall(row, col);
    }
  }

  function handleMouseLeave(row, col) {
    if (isStartNodeMoving) removeStartNode(row, col);
    else if (isEndNodeMoving) removeEndNode(row, col);
  }

  // === below here are helper functions

  function toggleWall(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (element.classList.contains('node-wall')) {
      grid[row][col].isWall = false;
      element.classList.remove('node-wall');
    } else if (grid[row][col].isStart || grid[row][col].isEnd) {
      return;
    } else {
      grid[row][col].isWall = true;
      element.classList.add('node-wall');
      if (element.classList.contains('node-visited')) {
        grid[row][col].isVisited = false;
        element.classList.remove('node-visited');
      }
    }
  }

  function addStartNode(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (element.classList.contains('node-wall')) {
      element.classList.add('hidden-wall');
      element.classList.remove('node-wall');
      grid[row][col].isWall = false;
    }
    element.classList.add('node-start');
    grid[row][col].isStart = true;
    setStartNode(grid[row][col]);
  }

  function addEndNode(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (element.classList.contains('node-wall')) {
      grid[row][col].isWall = false;
      element.classList.add('hidden-wall');
      element.classList.remove('node-wall');
    }
    element.classList.add('node-end');
    grid[row][col].isEnd = true;
    setEndNode(grid[row][col]);
  }

  function removeStartNode(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (element.classList.contains('hidden-wall')) {
      element.classList.remove('hidden-wall');
      element.classList.add('node-wall');
      grid[row][col].isWall = true;
    }
    element.classList.remove('node-start');
    grid[row][col].isStart = false;
  }

  function removeEndNode(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (element.classList.contains('hidden-wall')) {
      element.classList.remove('hidden-wall');
      element.classList.add('node-wall');
      grid[row][col].isWall = true;
    }
    element.classList.remove('node-end');
    grid[row][col].isEnd = false;
  }

  return { handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave };
}

export default useMouseActions;
