import React from 'react';

function Node({ row, col, isStart, isEnd,}) {
  let extendedClass = '';
  if (isStart) extendedClass += ' node-start';
  if (isEnd) extendedClass += ' node-end';

  return <div className={`cell ${extendedClass}`} id={`node-${row}-${col}`}></div>;
}

export default Node;
