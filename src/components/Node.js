import React from 'react';

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
  let extendedClass = '';
  if (isStart) extendedClass += ' node-start';
  if (isEnd) extendedClass += ' node-end';

  return (
    <td
      className={`${extendedClass}`}
      id={`node-${row}-${col}`}
      onMouseUp={handleMouseUp}
      onMouseDown={(e) => handleMouseDown(isStart, isEnd, row, col, e)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseLeave={() => handleMouseLeave(row, col)}
    ></td>
  );
}

export default Node;
