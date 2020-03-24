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

  private currentPlayer: Player;

  public constructor(numberOfPlayers: number) {
    super();

    if (numberOfPlayers === undefined) {
      throw new Error("Number of players can't be undefined");
    }

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

  public getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.getId() === id);
  }

  public getNumberOfPlayers(): number {
    return this.numberOfPlayers;
  }

  public addPlayer(player: Player) {
    if (this.players.length < this.numberOfPlayers) {
      this.players.push(player);
    } else {
      throw new Error(`This game has already maximum number of ${this.numberOfPlayers} players`);
    }
  }

  public start(player: Player) {
    if (player !== this.players[0]) {
      throw new Error('Only host can start the game');
    }

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

    this.currentPlayer = nextPlayer;
  }

  public changeCurrentPlayer() {
    const currentPlayerIndex = this.players.findIndex((player) => player === this.currentPlayer);
    const newCurrentPlayerIndex = (currentPlayerIndex + 1) % this.numberOfPlayers;
    this.currentPlayer = this.players[newCurrentPlayerIndex];
  }

  public getCurrentPlayer(): Player | undefined {
    return this.currentPlayer;
  }

  public performTurn(player: Player, cardId: string) {
    if (player !== this.currentPlayer) {
      throw new Error("Can't play card in another player's turn");
    }

    const card = player.playCard(cardId);

    this.board.moveTurtle(card.turtle, card.move);
    player.giveCard(this.cardsPile.drawCard());
  }

  // TODO
  public getGameInfoForPlayer(player: Player): GameInfo {
    return {
      board: this.board.getState(),
      currentPlayerId: this.currentPlayer.getId(),
      cards: player.getCards(),
    };
  }

  public sendGameStateToAllPlayers() {
    // this.start();
    this.players.forEach((player) => {
      const socket = player.getSocket();
      // socket.emit('game state', this.getGameInfoForPlayer(player));
      console.log(this.getGameInfoForPlayer(player));
    });
  }
}

export default Game;
