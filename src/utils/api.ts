import SolutionStats from '../types/SolutionStats';
import Axios from 'axios';

const MOCK_RESULT = {
  data: {
    stats: {
      bestFound: 4,
      boardReachedInFewerMoves: 64868,
      cantBeatCurrentBest: 136815,
      tooFarBehind: 39015,
      totalIterations: 305858,
      updatedMaxByNumMoves: 90
    },
    moves: [2, 4, 1, 5, 2, 3, 4, 3, 0, 1, 4, 3, 0, 1, 2, 4, 3, 5]
  }
};

export async function getSolutionInfo(
  board: number[][],
  useMock: boolean = false
): Promise<{ data: { stats: SolutionStats; moves: number[] } }> {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_RESULT);
      }, 3000);
    });
  }
  return Axios.post(
    'https://6ld9voeb2g.execute-api.us-east-1.amazonaws.com/Prod/board/solve',
    board
  );
}
