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
  handleMouseLeave,
}) {
  let extendedClass = '';
  if (isStart) extendedClass += ' node-start';
  if (isEnd) extendedClass += ' node-end';

  return (
    <td
      className={`${extendedClass}`}
      id={`node-${row}-${col}`}
      onMouseDown={(e) => handleMouseDown(isStart, isEnd, row, col, e)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => handleMouseLeave(row, col)}
    ></td>
  );
}

export default Node;
