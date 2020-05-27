import React, { useEffect, useRef } from 'react';

function Node({
  row,
  col,
  isEnd,
  isStart,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const nodeRef = useRef();

  useEffect(() => {
    if (isStart) nodeRef.current.classList.add('node-start');
    if (isEnd) nodeRef.current.classList.add('node-end');
    // eslint-disable-next-line
  }, []);

  return (
    <td
      ref={nodeRef}
      id={`node-${row}-${col}`}
      onMouseUp={handleMouseUp}
      onMouseDown={(e) => handleMouseDown(isStart, isEnd, row, col, e)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseLeave={() => handleMouseLeave(row, col)}
    ></td>
  );
}

export default Node;
