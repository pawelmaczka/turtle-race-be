import GameCard from 'types/GameCard';
import Player from './Player';

const firstCard: GameCard = {
  id: '1',
  turtle: 'red',
  move: 2,
};
const secondCard: GameCard = {
  id: '2',
  turtle: 'blue',
  move: -2,
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

    it("throws an error and do not add card if the Player can't receive more cards", () => {
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
      const player = new Player('John', 2);
      const secondPlayer = new Player('Adam', 3);

      player.giveCard(firstCard);
      player.giveCard(firstCard);
      secondPlayer.giveCard(firstCard);
      secondPlayer.giveCard(firstCard);
      secondPlayer.giveCard(firstCard);

      expect(player.canReceiveCard()).toEqual(false);
      expect(secondPlayer.canReceiveCard()).toEqual(false);
    });
  });

  describe('playCard', () => {
    it('throws an error if player has no card with given id', () => {
      const player = new Player('Adam', 3);
      player.giveCard(firstCard);

      expect(() => {
        player.playCard('5');
      }).toThrowError("Can't play not owned card");
    });

    it('returns card with passed id', () => {
      const player = new Player('Adam', 3);
      player.giveCard(firstCard);
      player.giveCard(secondCard);

      expect(player.playCard('1')).toEqual(firstCard);
    });

    it('removes card with given id from players hand', () => {
      const player = new Player('Adam', 3);
      player.giveCard(firstCard);
      player.giveCard(secondCard);

      player.playCard('1');

      const allCards = player.getCards();

      expect(allCards.length).toBe(1);
      expect(allCards[0]).toEqual(secondCard);
    });
  });
});
