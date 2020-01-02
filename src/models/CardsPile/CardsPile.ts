import getShuffledArray from 'helpers/getShuffledArray';
import GameCard from 'types/GameCard';
import cards from './cards';

export type Cards = typeof cards;

class CardsPile {
  private readonly cards: Cards;

  public constructor() {
    this.cards = getShuffledArray(cards);
  }

  public getLeftCardsNumber(): number {
    return this.cards.length;
  }

  public getAllCards(): Cards {
    return [...this.cards];
  }

  public drawCard(): GameCard | null {
    return this.cards.pop() || null;
  }
}

export default CardsPile;
