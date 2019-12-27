import Board from './Board';

jest.mock('config/game', () => ({
  NUMBER_OF_BOARD_FIELDS: 3,
}));

describe('Board', () => {
  it('is instantiated with the correct number of fields', () => {
    const board = new Board();
    const secondCard = new Board(5);

    expect(board.getState().length).toEqual(3);
    expect(secondCard.getState().length).toEqual(5);
  });

  it('is instantiated with all turtles on the first field', () => {
    const board = new Board(3);

    const boardState = board.getState();
    const firstFieldState = boardState[0];

    expect(firstFieldState.includes('red')).toBeTruthy();
    expect(firstFieldState.includes('green')).toBeTruthy();
    expect(firstFieldState.includes('blue')).toBeTruthy();
    expect(firstFieldState.includes('yellow')).toBeTruthy();
    expect(firstFieldState.includes('violet')).toBeTruthy();
    expect(boardState[1]).toEqual([]);
    expect(boardState[2]).toEqual([]);
  });

  describe('moveTurtle', () => {
    it('moves only one turtle if it is on the first field', () => {
      const board = new Board(3);

      board.moveTurtle('red', 2);
      board.moveTurtle('green', 2);

      const boardState = board.getState();
      const firstFieldState = boardState[0];
      const secondFieldState = boardState[1];
      const thirdFieldState = boardState[2];

      expect(firstFieldState.includes('blue')).toBeTruthy();
      expect(firstFieldState.includes('yellow')).toBeTruthy();
      expect(firstFieldState.includes('violet')).toBeTruthy();
      expect(firstFieldState.includes('green')).toBeFalsy();
      expect(firstFieldState.includes('red')).toBeFalsy();
      expect(firstFieldState.includes('green')).toBeFalsy();
      expect(thirdFieldState).toEqual(['red', 'green']);
      expect(secondFieldState).toEqual([]);
    });

    it('moves the turtle with all turtles on it', () => {
      const board = new Board(5);

      board.moveTurtle('red', 1);
      board.moveTurtle('green', 1);
      board.moveTurtle('blue', 1);
      board.moveTurtle('violet', 1);

      board.moveTurtle('green', 2);

      const boardState = board.getState();

      expect(boardState[0].includes('blue')).toBeFalsy();
      expect(boardState[0].includes('yellow')).toBeTruthy();
      expect(boardState[0].includes('violet')).toBeFalsy();
      expect(boardState[0].includes('green')).toBeFalsy();
      expect(boardState[0].includes('red')).toBeFalsy();

      expect(boardState[1]).toEqual(['red']);
      expect(boardState[3]).toEqual(['green', 'blue', 'violet']);
    });

    it('moves only by as much fields as possible', () => {
      const board = new Board(5);

      board.moveTurtle('red', 8);
      board.moveTurtle('green', 2);
      board.moveTurtle('green', -5);

      const boardState = board.getState();

      expect(boardState[0].includes('green')).toBeTruthy();
      expect(boardState[0].includes('red')).toBeFalsy();
      expect(boardState[boardState.length - 1].includes('red')).toBeTruthy();
    });
  });
});
