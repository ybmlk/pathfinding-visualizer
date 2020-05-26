import Context from '../Context';
import { useContext } from 'react';

function useMouseActions() {

  const {
    grid,
    isAnimating,
    isMouseDown,
    isStartNodeMoving,
    isEndNodeMoving,
    setMouseDown,
    setStartNode,
    setEndNode,
    setStartNodeMoving,
    setEndNodeMoving,
  } = useContext(Context);
  
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
      if (isStartNodeMoving) addStartNode(row, col);
      else if (isEndNodeMoving) addEndNode(row, col);
      else toggleWall(row, col);
    }
  }

  function handleMouseLeave(row, col) {
    if (isStartNodeMoving) removeStartNode(row, col);
    else if (isEndNodeMoving) removeEndNode(row, col);
  }

  // === below here are helper functions

  function toggleWall(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    if (Array.from(element.classList).includes('node-wall')) {
      grid[row][col].isWall = false;
      element.classList.remove('node-wall');
    } else {
      grid[row][col].isWall = true;
      element.classList.add('node-wall');
    }
  }

  function addStartNode(row, col) {
    const element = document.getElementById(`node-${row}-${col}`);
    grid[row][col].isStart = true;
    element.classList.add('node-start');
    setStartNode(grid[row][col]);
  }

  function addEndNode(row, col) {
    grid[row][col].isEnd = true;
    document.getElementById(`node-${row}-${col}`).classList.add('node-end');
    setEndNode(grid[row][col]);
  }

  function removeStartNode(row, col) {
    grid[row][col].isStart = false;
    document.getElementById(`node-${row}-${col}`).classList.remove('node-start');
  }

  function removeEndNode(row, col) {
    grid[row][col].isEnd = false;
    document.getElementById(`node-${row}-${col}`).classList.remove('node-end');
  }

  return { handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave };
}

export default useMouseActions;
