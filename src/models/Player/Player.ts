import WithUniqueId from 'models/WithUniqueId';
import GameCard from 'types/GameCard';
import { CARDS_IN_HAND } from 'config/game';
import { Socket } from 'socket.io';

class Player extends WithUniqueId {
  private readonly name: string;

  private readonly cards: GameCard[] = [];

  private readonly maxNumberOfCards: number;

  private socket: Socket;

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

  public playCard(cardId: string): GameCard | undefined {
    const cardIndex = this.cards.findIndex((card) => card.id === cardId);

    if (cardIndex === -1) {
      throw new Error("Can't play not owned card");
    }

    const card = this.cards[cardIndex];
    this.cards.splice(cardIndex, 1);

    return card;
  }

  public getCards(): GameCard[] {
    return [...this.cards];
  }

  public canReceiveCard(): boolean {
    return !(this.cards.length >= this.maxNumberOfCards);
  }

  public setSocket(socket: Socket) {
    this.socket = socket;
  }

  public getSocket(): Socket {
    return this.socket;
  }
}

export default Player;
