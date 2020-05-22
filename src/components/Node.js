import React from 'react';

function Node({
  row,
  col,
  isEnd,
  isWall,
  isStart,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
}) {
  let extendedClass = '';
  if (isStart) extendedClass += ' node-start';
  if (isEnd) extendedClass += ' node-end';

  return (
    <div
      className={`cell ${extendedClass}`}
      id={`node-${row}-${col}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
    ></div>
  );
}

export default Node;
