import { NUMBER_OF_BOARD_FIELDS } from 'config/game';

type TurtleColor = 'red' | 'green' | 'blue' | 'yellow' | 'violet';

class Board {
  private board: TurtleColor[][];

  public constructor(numberOfFields: number = NUMBER_OF_BOARD_FIELDS) {
    const board = Array(numberOfFields)
      .fill(true)
      .map(() => []);
    this.board = board;
    this.board[0] = ['red', 'green', 'blue', 'yellow', 'violet'];
  }

  public getState(): TurtleColor[][] {
    return this.board;
  }

  private findTurtleFieldIndex(turtleColor: TurtleColor): number {
    const currentTurtleFieldIndex = this.board.findIndex((fieldTurtles) =>
      fieldTurtles.includes(turtleColor)
    );

    return currentTurtleFieldIndex;
  }

  private putTurtles(fieldIndex: number, turtles: TurtleColor[]) {
    const boardLength = this.board.length;

    if (fieldIndex >= boardLength) {
      this.board[boardLength - 1].push(...turtles);
    } else if (fieldIndex < 0) {
      this.board[0].push(...turtles);
    } else {
      this.board[fieldIndex].push(...turtles);
    }
  }

  private takeTurtles(turtleColor: TurtleColor): TurtleColor[] {
    const currentTurtleFieldIndex = this.findTurtleFieldIndex(turtleColor);
    const currentFieldTurtles = this.board[currentTurtleFieldIndex];
    const turtleIndex = currentFieldTurtles.indexOf(turtleColor);
    const numberOfTurtlesToTake =
      currentTurtleFieldIndex === 0 ? 1 : currentFieldTurtles.length - turtleIndex;

    return this.board[currentTurtleFieldIndex].splice(turtleIndex, numberOfTurtlesToTake);
  }

  public moveTurtle(turtleColor: TurtleColor, steps: number) {
    const currentTurtleFieldIndex = this.findTurtleFieldIndex(turtleColor);
    const destinationFieldIndex = currentTurtleFieldIndex + steps;
    const turtlesToMove = this.takeTurtles(turtleColor);

    this.putTurtles(destinationFieldIndex, turtlesToMove);
  }
}

export default Board;
