export default interface SolutionStats {
  totalIterations: number;
  boardReachedInFewerMoves: number;
  cantBeatCurrentBest: number;
  bestFound: number;
  updatedMaxByNumMoves: number;
  tooFarBehind: number;
}
