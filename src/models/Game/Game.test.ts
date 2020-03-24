import Player from 'models/Player';
import Game from './Game';

const RANDOM_NUMBER = 1;

jest.mock('helpers/getShuffledArray', () => (array: {}[]) => array);
jest.mock('lodash', () => ({
  random: () => RANDOM_NUMBER,
}));

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

      const adam = new Player('Adam');
      const ewa = new Player('Ewa');

      game.addPlayer(adam);
      game.addPlayer(ewa);

      const players = game.getPlayers();

      expect(players.length).toEqual(2);
      expect(players[0].getName()).toEqual('Adam');
      expect(players[1].getName()).toEqual('Ewa');
    });

    it('throws an error when trying to add to many players', () => {
      const firstGame = new Game(2);

      const adam = new Player('Adam');
      const ewa = new Player('Ewa');
      const jacek = new Player('Jacek');
      const archie = new Player('Archie');
      const justin = new Player('Justin');

      firstGame.addPlayer(adam);
      firstGame.addPlayer(ewa);

      expect(() => {
        firstGame.addPlayer(jacek);
      }).toThrowError('This game has already maximum number of 2 players');

      const secondGame = new Game(4);

      secondGame.addPlayer(adam);
      secondGame.addPlayer(ewa);
      secondGame.addPlayer(jacek);
      secondGame.addPlayer(archie);

      expect(() => {
        secondGame.addPlayer(justin);
      }).toThrowError('This game has already maximum number of 4 players');
    });
  });

  describe('getPlayer', () => {
    it('returns undefined if there is no player with passed id', () => {
      const game = new Game(2);
      const adam = new Player('Adam');

      game.addPlayer(adam);

      expect(game.getPlayer('123')).toEqual(undefined);
    });

    it('returns the player with given id', () => {
      const game = new Game(2);
      const adam = new Player('Adam');

      game.addPlayer(adam);

      expect(game.getPlayer(adam.getId())).toBe(adam);
    });
  });

  describe('start', () => {
    it('throws an error if current number of players is not equal requested number of players', () => {
      const game = new Game(2);
      const adam = new Player('Adam');

      game.addPlayer(adam);

      expect(() => {
        game.start(adam);
      }).toThrowError("Game can't be started without all players");
    });

    it('throw an error if another player than the host tries to start a game', () => {
      const game = new Game(2);
      const adam = new Player('Adam');
      const ewa = new Player('Ewa');

      game.addPlayer(adam);
      game.addPlayer(ewa);

      expect(() => {
        game.start(ewa);
      }).toThrowError('Only host can start the game');
    });
  });

  describe('getCurrentPlayer', () => {
    it('returns undefined if game is not started yet', () => {
      const game = new Game(2);

      const nextPlayerForNoPlayers = game.getCurrentPlayer();
      const adam = new Player('Adam');
      const ewa = new Player('Ewa');
      game.addPlayer(adam);
      game.addPlayer(ewa);
      const nextPlayerForTwoPlayers = game.getCurrentPlayer();

      expect(nextPlayerForNoPlayers).toEqual(undefined);
      expect(nextPlayerForTwoPlayers).toEqual(undefined);
    });

    it('returns random player if game is started', () => {
      const game = new Game(2);
      const adam = new Player('Adam');
      const ewa = new Player('Ewa');

      const players = [adam, ewa];
      players.forEach((player) => game.addPlayer(player));

      game.start(adam);
      const nextPlayer = game.getCurrentPlayer();

      expect(nextPlayer).toBe(players[RANDOM_NUMBER]);
    });
  });

  describe('changeCurrentPlayer', () => {
    it('sets next player in the array as a current player', () => {
      const game = new Game(3);
      const adam = new Player('Adam');
      const ewa = new Player('Ewa');
      const denis = new Player('Denis');

      const players = [adam, ewa, denis];

      players.forEach((player) => game.addPlayer(player));
      game.start(adam);

      expect(game.getCurrentPlayer()).toBe(players[RANDOM_NUMBER]);
      game.changeCurrentPlayer();
      expect(game.getCurrentPlayer()).toBe(players[RANDOM_NUMBER + 1]);
    });
  });

  describe('performTurn', () => {
    it("Throws error if it is not given player's turn", () => {
      const game = new Game(2);
      const adam = new Player('Adam');
      const ewa = new Player('Ewa');

      const players = [adam, ewa];
      const playersWithoutCurrentPlayer = [...players];
      playersWithoutCurrentPlayer.splice(RANDOM_NUMBER, 1);

      const notCurrentPlayer = playersWithoutCurrentPlayer[0];

      players.forEach((player) => game.addPlayer(player));
      game.start(adam);

      expect(game.getCurrentPlayer()).toEqual(ewa);
      expect(notCurrentPlayer).toEqual(adam);

      expect(() => {
        game.performTurn(notCurrentPlayer, notCurrentPlayer.getCards()[0].id);
      }).toThrowError("Can't play card in another player's turn");
    });
  });
});
