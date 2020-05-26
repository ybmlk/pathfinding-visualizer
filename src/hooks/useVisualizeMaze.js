import { makeItWall, removeWall } from '../functions/wallFunctions';
import { useContext } from 'react';
import Context from '../Context';

function useVisualizeMaze() {
  const { grid, setisAnimating } = useContext(Context);

  return function (addWallsToAnimate, addSpeed, removeWallsToAnimate, removeSpeed) {
    setisAnimating(true);

    for (let i = 0; i <= addWallsToAnimate.length; i++) {
      // at the end animate removing walls
      if (i === addWallsToAnimate.length) {
        // if there's no argument passed in for 'removeWallsToAnimate' skip
        if (!removeWallsToAnimate) {
          setTimeout(() => setisAnimating(false), addSpeed * i);
        } else setTimeout(animateRemovingWalls, addSpeed * i);
        continue;
      }

      const [row, col] = addWallsToAnimate[i];
      // If it's already a wall skip
      if (grid[row][col].isWall) continue;
      setTimeout(() => makeItWall(row, col, grid), addSpeed * i);
    }

    function animateRemovingWalls() {
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
  };
}

export default useVisualizeMaze;
