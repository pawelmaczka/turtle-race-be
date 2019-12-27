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
    const currentFieldIndex = this.board.findIndex((fieldTurtles) =>
      fieldTurtles.includes(turtleColor)
    );

    return currentFieldIndex;
  }

  private putTurtles(fieldIndex: number, turtles: TurtleColor[]) {
    this.board[fieldIndex].push(...turtles);
  }

  private takeTurtles(turtleColor: TurtleColor): TurtleColor[] {
    const currentFieldIndex = this.findTurtleFieldIndex(turtleColor);
    const currentFieldTurtles = this.board[currentFieldIndex];
    const turtleIndex = currentFieldTurtles.indexOf(turtleColor);

    return this.board[currentFieldIndex].splice(turtleIndex, 1);
  }

  public move(turtleColor: TurtleColor, steps: number) {
    const currentFieldIndex = this.findTurtleFieldIndex(turtleColor);
    const destinationFieldIndex = currentFieldIndex + steps;
    const turtlesToMove = this.takeTurtles(turtleColor);

    this.putTurtles(destinationFieldIndex, turtlesToMove);
  }
}

export default Board;
