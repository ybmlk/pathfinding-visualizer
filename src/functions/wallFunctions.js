function makeItWall(row, col, grid) {
  if (grid[row][col].isStart || grid[row][col].isEnd) return;
  grid[row][col].isWall = true;
  document.getElementById(`node-${row}-${col}`).classList.add('node-wall');
}

function removeWall(row, col, grid) {
  if (grid[row][col].isStart || grid[row][col].isEnd) return;
  grid[row][col].isWall = false;
  document.getElementById(`node-${row}-${col}`).classList.remove('node-wall');
}

function createBoundary(NUMBER_OF_COLS, NUMBER_OF_ROWS) {
  const walls = [];

  // Top Border
  for (let c = 0; c < NUMBER_OF_COLS; c++) {
    walls.push([0, c]);
  }
  // Right Border
  for (let r = 1; r < NUMBER_OF_ROWS; r++) {
    walls.push([r, NUMBER_OF_COLS - 1]);
  }
  // Bottom Border
  for (let c = NUMBER_OF_COLS - 2; c >= 0; c--) {
    walls.push([NUMBER_OF_ROWS - 1, c]);
  }
  // Left Border
  for (let r = NUMBER_OF_ROWS - 2; r >= 1; r--) {
    walls.push([r, 0]);
  }

  return walls;
}

export { makeItWall, removeWall, createBoundary };
