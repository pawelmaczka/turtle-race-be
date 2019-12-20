import Game from './Game';

describe('Game', () => {
  it('has a random ID', () => {
    const firstNewGame = new Game(2);
    const secondNewGame = new Game(2);

    expect(firstNewGame.getId() === secondNewGame.getId()).toBeFalsy();
  });

  it('is instantiated with a correct number of players', () => {
    const firstNewGame = new Game(2);
    const secondNewGame = new Game(4);

    expect(firstNewGame.getNumberOfPlayers()).toBe(2);
    expect(secondNewGame.getNumberOfPlayers()).toBe(4);
  });

  it("can't be instantiated with less than 2 players", () => {
    expect(() => new Game(0)).toThrowError("Can't create game for less than 2 players");
    expect(() => new Game(1)).toThrowError("Can't create game for less than 2 players");
  });

  it("can't be instantiated with more than 5 players", () => {
    expect(() => new Game(6)).toThrowError("Can't create game for more than 5 players");
    expect(() => new Game(22)).toThrowError("Can't create game for more than 5 players");
  });

  describe('addPlayer', () => {
    it('adds a new player to the players list', () => {
      const game = new Game(2);

      game.addPlayer('Adam');
      game.addPlayer('Ewa');

      const players = game.getPlayers();

      expect(players.length).toEqual(2);
      expect(players[0].getName()).toEqual('Adam');
      expect(players[1].getName()).toEqual('Ewa');
    });

    it('throws an error when trying to add to many players', () => {
      const firstGame = new Game(2);

      firstGame.addPlayer('Adam');
      firstGame.addPlayer('Ewa');

      expect(() => {
        firstGame.addPlayer('Pawel');
      }).toThrowError('This game has already maximum number of 2 players');

      const secondGame = new Game(4);

      secondGame.addPlayer('Adam');
      secondGame.addPlayer('Ewa');
      secondGame.addPlayer('John');
      secondGame.addPlayer('Archie');

      expect(() => {
        secondGame.addPlayer('Pawel');
      }).toThrowError('This game has already maximum number of 4 players');
    });
  });
});
