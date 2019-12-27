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

    const state = board.getState();
    const firstFieldState = state[0];

    expect(firstFieldState.includes('red')).toBeTruthy();
    expect(firstFieldState.includes('green')).toBeTruthy();
    expect(firstFieldState.includes('blue')).toBeTruthy();
    expect(firstFieldState.includes('yellow')).toBeTruthy();
    expect(firstFieldState.includes('violet')).toBeTruthy();
    expect(state[1]).toEqual([]);
    expect(state[2]).toEqual([]);
  });

  describe('moveTurtle', () => {
    it('moves only one turtle if it is on the first field', () => {
      const board = new Board(3);

      board.move('red', 2);

      const state = board.getState();
      const firstFieldState = state[0];
      const secondFieldState = state[1];
      const thirdFieldState = state[2];

      expect(firstFieldState.includes('green')).toBeTruthy();
      expect(firstFieldState.includes('blue')).toBeTruthy();
      expect(firstFieldState.includes('yellow')).toBeTruthy();
      expect(firstFieldState.includes('violet')).toBeTruthy();
      expect(firstFieldState.includes('red')).toBeFalsy();
      expect(thirdFieldState.includes('red')).toBeTruthy();
      expect(secondFieldState).toEqual([]);
    });
  });
});
