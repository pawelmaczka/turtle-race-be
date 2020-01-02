import WithUniqueId from 'models/WithUniqueId';
import CardsPile from 'models/CardsPile';
import Player from 'models/Player';
import Board, { BoardState } from 'models/Board';
import GameCard from 'types/GameCard';
import _ from 'lodash';

import { MAX_NUMBER_OF_PLAYERS, MIN_NUMBER_OF_PLAYERS, CARDS_IN_HAND } from 'config/game';

type GameInfo = {
  board: BoardState;
  currentPlayerId: string;
  cards: GameCard[];
};

class Game extends WithUniqueId {
  private readonly cardsPile: CardsPile;

  private readonly players: Player[] = [];

  private readonly numberOfPlayers: number;

  private readonly board: Board;

  private currentPlayerId: string;

  public constructor(numberOfPlayers: number) {
    super();

    if (numberOfPlayers > MAX_NUMBER_OF_PLAYERS) {
      throw new Error(`Can't create game for more than ${MAX_NUMBER_OF_PLAYERS} players`);
    }

    if (numberOfPlayers < MIN_NUMBER_OF_PLAYERS) {
      throw new Error(`Can't create game for less than ${MIN_NUMBER_OF_PLAYERS} players`);
    }

    this.cardsPile = new CardsPile();
    this.numberOfPlayers = numberOfPlayers;
    this.board = new Board();
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

  public start() {
    if (this.numberOfPlayers !== this.getPlayers().length) {
      throw new Error("Game can't be started without all players");
    }

    this.giveCardsToPlayers();
    this.drawFirstPlayer();

    return true;
  }

  private giveCardsToPlayers() {
    this.players.forEach((player) => {
      for (let i = 0; i < CARDS_IN_HAND; i += 1) {
        player.giveCard(this.cardsPile.drawCard());
      }
    });
  }

  private drawFirstPlayer() {
    const firstPlayerIndex = _.random(this.players.length - 1);
    const nextPlayer = this.getPlayers()[firstPlayerIndex];

    this.currentPlayerId = nextPlayer.getId();
  }

  public getCurrentPlayerId(): string {
    return this.currentPlayerId;
  }

  // TODO
  public getGameInfoForPlayer(player: Player): GameInfo {
    return {
      board: this.board.getState(),
      currentPlayerId: this.getCurrentPlayerId(),
      cards: player.getCards(),
    };
  }
}

export default Game;
