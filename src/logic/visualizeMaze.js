import { makeItWall, removeWall } from '../logic/wallFunctions';

function visualizeMaze(
  addWallsToAnimate,
  addSpeed,
  removeWallsToAnimate,
  removeSpeed,
  grid,
  setisAnimating
) {
  setisAnimating(true);
  for (let i = 0; i <= addWallsToAnimate.length; i++) {
    if (i === addWallsToAnimate.length) {
      setTimeout(
        () => animateRemovingWalls(removeWallsToAnimate, grid, setisAnimating),
        addSpeed * i
      );
      continue;
    }

    setTimeout(() => {
      const [row, col] = addWallsToAnimate[i];
      makeItWall(row, col, grid);
    }, addSpeed * i);
  }

  function animateRemovingWalls(removeWallsToAnimate) {
    for (let i = 0; i <= removeWallsToAnimate.length; i++) {
      if (i === removeWallsToAnimate.length) {
        setTimeout(() => setisAnimating(false), removeSpeed * i);
        continue;
      }

      setTimeout(() => {
        const [row, col] = removeWallsToAnimate[i];
        removeWall(row, col, grid);
      }, removeSpeed * i);
    }
  }
}

export default visualizeMaze;
