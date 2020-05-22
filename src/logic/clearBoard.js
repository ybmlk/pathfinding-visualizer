function clearBoard(grid, keepWalls = false) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col].isVisited = false;
      grid[row][col].distance = Infinity;
      grid[row][col].previousNode = null;

      document
        .getElementById(`node-${row}-${col}`)
        .classList.remove('node-visited', 'node-shortest-path');

      if (!keepWalls) {
        grid[row][col].isWall = false;
        document.getElementById(`node-${row}-${col}`).classList.remove('node-wall');
      }
    }
  }
}

export default clearBoard;
