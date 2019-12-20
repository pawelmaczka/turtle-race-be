import CardPile from './CardsPile';

describe('CardPile', () => {
  it('has 52 cards when instantiated', () => {
    const cardPile = new CardPile();

    expect(cardPile.getAllCards().length).toBe(52);
  });

  describe('drawCard', () => {
    it('removes last card from the pile', () => {
      const cardPile = new CardPile();
      const cardsOnThePile = cardPile.getAllCards();

      cardsOnThePile.length -= 1;
      cardPile.drawCard();

      expect(cardPile.getAllCards()).toEqual(cardsOnThePile);

      cardsOnThePile.length -= 1;
      cardPile.drawCard();

      expect(cardPile.getAllCards()).toEqual(cardsOnThePile);
    });

    it('returs last next card on the pile on every call', () => {
      const cardPile = new CardPile();
      const allCardsOnThePile = cardPile.getAllCards();
      const allCardsNumber = allCardsOnThePile.length;

      const drawedCard = cardPile.drawCard();
      const secondDrawedCard = cardPile.drawCard();

      expect(drawedCard).toEqual(allCardsOnThePile[allCardsNumber - 1]);
      expect(secondDrawedCard).toEqual(allCardsOnThePile[allCardsNumber - 2]);
    });
  });
});
