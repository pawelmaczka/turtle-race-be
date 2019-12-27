import GameCard from 'types/GameCard';
import { CARDS_IN_HAND } from 'config/game';
import Player from './Player';

const firstCard: GameCard = {
  id: '1',
  turtle: 'red',
  move: 2,
};
const secondCard: GameCard = {
  id: '1',
  turtle: 'red',
  move: 2,
};

describe('Player', () => {
  it('is instantiated with id', () => {
    const player = new Player('John');

    expect(typeof player.getId()).toBe('string');
  });

  it('is instantiated with correct name', () => {
    const player = new Player('John');

    expect(player.getName()).toEqual('John');
  });

  it('is instantiated with no cards', () => {
    const player = new Player('John');

    expect(player.getCards()).toEqual([]);
  });

  describe('giveCard', () => {
    it("adds a card to the Player's hand", () => {
      const player = new Player('John');

      player.giveCard(firstCard);
      expect(player.getCards()).toEqual([firstCard]);

      player.giveCard(secondCard);
      expect(player.getCards()).toEqual([firstCard, secondCard]);
    });

    it('throws an error and do not add card if the Player has already full hand of cards', () => {
      const player = new Player('John');

      player.canReceiveCard = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);

      player.giveCard(firstCard);

      expect(() => {
        player.giveCard(firstCard);
      }).toThrowError('Player has already maximum number of cards');

      expect(player.getCards().length).toEqual(1);
    });
  });

  describe('canReceiveCard', () => {
    it('returns false if user has already maximum or more cards in hand', () => {
      jest.mock('config/game', () => ({
        CARDS_IN_HAND: 2,
      }));
      const player = new Player('John');

      for (let i = 0; i < CARDS_IN_HAND; i += 1) {
        player.giveCard(firstCard);
      }

      expect(player.canReceiveCard()).toEqual(false);
    });
  });
});
