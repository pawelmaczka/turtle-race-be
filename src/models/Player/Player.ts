import WithUniqueId from 'models/WithUniqueId';
import GameCard from 'types/GameCard';
import { CARDS_IN_HAND } from 'config/game';

class Player extends WithUniqueId {
  private readonly name: string;

  private readonly cards: GameCard[] = [];

  private readonly maxNumberOfCards: number;

  public constructor(name: string, maxNumberOfCards: number = CARDS_IN_HAND) {
    super();

    this.name = name;
    this.maxNumberOfCards = maxNumberOfCards;
  }

  public getName(): string {
    return this.name;
  }

  public giveCard(card: GameCard) {
    if (!this.canReceiveCard()) {
      throw new Error('Player has already maximum number of cards');
    }

    this.cards.push(card);
  }

  public getCards(): GameCard[] {
    return [...this.cards];
  }

  public canReceiveCard(): boolean {
    return !(this.cards.length >= this.maxNumberOfCards);
  }
}

export default Player;
