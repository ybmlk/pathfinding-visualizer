import React, { createContext, useState } from 'react';

// Create a react context
const Context = createContext();

function Provider({ children }) {
  const NUMBER_OF_ROWS = 23;
  const NUMBER_OF_COLS = 59;

  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({});
  const [endNode, setEndNode] = useState({});
  const [isMouseDown, setMouseDown] = useState(false);
  const [isStartNodeMoving, setStartNodeMoving] = useState(false);
  const [isEndNodeMoving, setEndNodeMoving] = useState(false);
  const [isAnimating, setisAnimating] = useState(false);

  const value = {
    grid,
    startNode,
    endNode,
    isMouseDown,
    isStartNodeMoving,
    isEndNodeMoving,
    isAnimating,
    NUMBER_OF_ROWS,
    NUMBER_OF_COLS,
    setGrid,
    setStartNode,
    setEndNode,
    setMouseDown,
    setStartNodeMoving,
    setEndNodeMoving,
    setisAnimating,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
export { Provider };
