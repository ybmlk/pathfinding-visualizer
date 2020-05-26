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

export { makeItWall, removeWall };
