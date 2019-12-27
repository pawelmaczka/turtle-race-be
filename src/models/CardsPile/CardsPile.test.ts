import CardsPile from './CardsPile';
import cards from './cards';

describe('CardsPile', () => {
  it('has 52 cards when instantiated', () => {
    const cardsPile = new CardsPile();

    expect(cardsPile.getAllCards().length).toBe(52);
  });

  describe('drawCard', () => {
    it('removes last card from the pile', () => {
      const cardsPile = new CardsPile();
      const cardsOnThePile = cardsPile.getAllCards();

      cardsOnThePile.length -= 1;
      cardsPile.drawCard();

      expect(cardsPile.getAllCards()).toEqual(cardsOnThePile);

      cardsOnThePile.length -= 1;
      cardsPile.drawCard();

      expect(cardsPile.getAllCards()).toEqual(cardsOnThePile);
    });

    it('returs last next card on the pile on every call', () => {
      const cardsPile = new CardsPile();
      const allCardsOnThePile = cardsPile.getAllCards();
      const allCardsNumber = allCardsOnThePile.length;

      const drawedCard = cardsPile.drawCard();
      const secondDrawedCard = cardsPile.drawCard();

      expect(drawedCard).toEqual(allCardsOnThePile[allCardsNumber - 1]);
      expect(secondDrawedCard).toEqual(allCardsOnThePile[allCardsNumber - 2]);
    });

    it('returns null if cardsPile is empty', () => {
      const cardsPile = new CardsPile();
      const allCards = cardsPile.getAllCards();

      allCards.forEach(() => {
        cardsPile.drawCard();
      });

      expect(cardsPile.drawCard()).toBe(null);
    });
  });

  describe('getLeftCardsNumber', () => {
    it('returns number of left cards', () => {
      const cardsPile = new CardsPile();

      cards.length = 20;
      jest.mock('./cards', () => cards);

      const secondCardsPile = new CardsPile();

      expect(cardsPile.getLeftCardsNumber()).toEqual(52);
      expect(secondCardsPile.getLeftCardsNumber()).toEqual(20);

      cardsPile.drawCard();
      expect(cardsPile.getLeftCardsNumber()).toEqual(51);

      cardsPile.drawCard();
      expect(cardsPile.getLeftCardsNumber()).toEqual(50);
    });
  });
});
