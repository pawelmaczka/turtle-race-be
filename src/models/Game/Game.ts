import WithUniqueId from 'models/WithUniqueId';
import CardsPile from 'models/CardsPile';
import Player from 'models/Player';

const MAX_NUMBER_OF_PLAYERS = 5;
const MIN_NUMBER_OF_PLAYERS = 2;

class Game extends WithUniqueId {
  private cardsPile: CardsPile;

  private players: Player[] = [];

  private numberOfPlayers: number;

  public constructor(numberOfPlayers: number) {
    super();

    if (numberOfPlayers > MAX_NUMBER_OF_PLAYERS) {
      throw Error(`Can't create game for more than ${MAX_NUMBER_OF_PLAYERS} players`);
    }

    if (numberOfPlayers < MIN_NUMBER_OF_PLAYERS) {
      throw Error(`Can't create game for less than ${MIN_NUMBER_OF_PLAYERS} players`);
    }

    this.cardsPile = new CardsPile();
    this.numberOfPlayers = numberOfPlayers;
  }

  public getPlayers(): Player[] {
    return [...this.players];
  }

  public getNumberOfPlayers(): number {
    return this.numberOfPlayers;
  }

  public addPlayer(playerName: string) {
    if (this.players.length < this.numberOfPlayers) {
      this.players.push(new Player(playerName));
    } else {
      throw new Error(`This game has already maximum number of ${this.numberOfPlayers} players`);
    }
  }
}

export default Game;
