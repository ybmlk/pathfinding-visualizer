import React, { createContext, useState } from 'react';

// Create a react context
const Context = createContext();

function Provider({ children }) {
  const NUMBER_OF_ROWS = 21;
  const NUMBER_OF_COLS = 61;
  const START_NODE = { row: 10, col: 15 };
  const END_NODE = { row: 10, col: 45 };

  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({});
  const [endNode, setEndNode] = useState({});
  const [isMouseDown, setMouseDown] = useState(false);
  const [isStartNodeMoving, setStartNodeMoving] = useState(false);
  const [isEndNodeMoving, setEndNodeMoving] = useState(false);
  const [isAnimating, setisAnimating] = useState(false);
  const [pathFound, setPathFound] = useState(false);

  const value = {
    grid,
    startNode,
    endNode,
    isMouseDown,
    isStartNodeMoving,
    isEndNodeMoving,
    isAnimating,
    pathFound,
    NUMBER_OF_ROWS,
    NUMBER_OF_COLS,
    START_NODE,
    END_NODE,
    setGrid,
    setStartNode,
    setEndNode,
    setMouseDown,
    setStartNodeMoving,
    setEndNodeMoving,
    setisAnimating,
    setPathFound,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Context;
export { Provider };
