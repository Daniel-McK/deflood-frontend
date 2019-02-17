import { cloneDeep, join, keys, map, range, size } from 'lodash';
import { iterateNestedArrays } from '../utils/arrayUtils';

export default class Board {
  public static WIDTH = 12;
  public static NUM_CELLS = Board.WIDTH * Board.WIDTH;
  private static COMPLETED = -1;

  private board: Array<Array<number>>;
  private moves: Array<number>;
  private lastMove: number;
  private sum: number;

  constructor(board: Array<Array<number>>, skipInitialization?: boolean) {
    this.board = cloneDeep(board);
    this.lastMove = board[0][0];
    this.board[0][0] = Board.COMPLETED;
    this.moves = [];
    this.sum = 1;
    if (skipInitialization) {
      return this;
    }
    this.spreadColour();
  }

  private spreadColour = () => {
    let previousSum = 0;
    while (this.sum !== previousSum) {
      previousSum = this.sum;
      iterateNestedArrays(this.board, (item, row, col) => {
        if (item === this.lastMove && this.hasCompletedNeighbour(row, col)) {
          this.board[row][col] = -1;
          this.sum++;
        }
      });
    }
  };

  private hasCompletedNeighbour = (row: number, col: number) => {
    return (
      this.board[row][this.getSafeDimension(col - 1)] === Board.COMPLETED ||
      this.board[row][this.getSafeDimension(col + 1)] === Board.COMPLETED ||
      this.board[this.getSafeDimension(row - 1)][col] === Board.COMPLETED ||
      this.board[this.getSafeDimension(row + 1)][col] === Board.COMPLETED
    );
  };

  private getSafeDimension = (dimension: number) => {
    return Math.max(0, Math.min(Board.WIDTH - 1, dimension));
  };

  public getMoves = () => this.moves;

  public getLastMove = () => this.lastMove;

  public isComplete = () => this.sum === Board.NUM_CELLS;

  public clone = (): Board => {
    const clonedBoard = new Board(this.board, true);
    clonedBoard.moves = cloneDeep(this.moves);
    clonedBoard.sum = this.sum;
    clonedBoard.lastMove = this.lastMove;
    return clonedBoard;
  };

  public makeMove = (move: number): Board => {
    const clonedBoard = this.clone();
    clonedBoard.sum = this.sum;
    clonedBoard.moves.push(move);
    clonedBoard.lastMove = move;
    clonedBoard.spreadColour();
    return clonedBoard;
  };

  public getOptions = (): Array<number> => {
    const options: Array<number> = [];
    iterateNestedArrays(this.board, (item, row, col) => {
      if (
        item !== Board.COMPLETED &&
        this.hasCompletedNeighbour(row, col) &&
        options.indexOf(item) === -1
      ) {
        options.push(item);
      }
    });
    return options;
  };

  public getNumMoves = () => {
    return this.moves.length;
  };

  public toString = () => {
    return join(map(this.board, row => join(row, ' ')), '\r\n');
  };

  public getHash = () => {
    return join(map(this.board, row => join(row)));
  };

  public static dq = () => {
    const dqBoard = new Board([[]]);
    dqBoard.moves = range(7, 40);
    return dqBoard;
  };

  public getSum = () => this.sum;

  public getBoard = (): Array<Array<number>> => {
    return cloneDeep(this.board);
  };

  public getNumColoursRemaining = (): number => {
    const remaining: { [color: number]: boolean } = {};
    iterateNestedArrays(this.board, item => (remaining[item] = true));
    // one less than the used keys since -1 will always be present
    return size(keys(remaining)) - 1;
  };
}
