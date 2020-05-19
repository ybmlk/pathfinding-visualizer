import React from 'react';

function Node({ isStart, isEnd }) {
  return <div className={`cell ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''}`}></div>;
}

export default Node;
