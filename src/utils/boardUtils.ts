import { forEach, map, range, reduce } from 'lodash';
import Board from '../types/Board';

export function getRowFromIndex(index: number) {
  return Math.floor(index / Board.WIDTH);
}

export function getColFromIndex(index: number) {
  return index % Board.WIDTH;
}

export function getSolutionSteps(grid: number[][], moves: number[]) {
  const firstBoard = new Board(grid);
  return reduce(moves, (steps: Board[], move: number) => {
    const previousBoard = steps[steps.length - 1];
    return [
      ...steps,
      previousBoard.makeMove(move)
    ];
  }, [firstBoard]);
}
