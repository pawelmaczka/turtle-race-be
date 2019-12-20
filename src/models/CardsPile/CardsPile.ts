import getShuffledArray from 'helpers/getShuffledArray';
import _ from 'lodash';
import cards, { GameCard } from './cards';

class CardsPile {
  private cards: typeof cards;

  public constructor() {
    this.cards = getShuffledArray(cards);
  }

  public getLeftCardsNumber(): number {
    return this.cards.length;
  }

  public getAllCards(): typeof cards {
    return _.cloneDeep(this.cards);
  }

  public drawCard(): GameCard | null {
    return _.cloneDeep(this.cards.pop()) || null;
  }
}

export default CardsPile;
