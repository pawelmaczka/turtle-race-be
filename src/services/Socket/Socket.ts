import socketIo, { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import Game from 'models/Game';
import Player from 'models/Player';

class Socket {
  private static instance: Socket;

  private socketServer: Server;

  // eslint-disable-next-line no-useless-constructor
  private constructor() {}

  public async startServer(server: HttpServer) {
    this.socketServer = socketIo(server);
  }

  public static getInstance(): Socket {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }

    return Socket.instance;
  }

  public createRoom(game: Game) {
    const gameId = 'test'; // game.getId();
    const gameRoom = this.socketServer.of(gameId);

    gameRoom.on('connection', (socket) => {
      let player: Player;

      socket.on('join', ({ playerName, playerId }: { playerName: string; playerId?: string }) => {
        if (playerId) {
          player = game.getPlayer(playerId);
          player.setSocket(socket);
          game.sendGameStateToAllPlayers();
        } else {
          player = new Player(playerName);
          player.setSocket(socket);
          game.addPlayer(player);
          game.sendGameStateToAllPlayers();
        }
      });

      socket.on('start game', () => {
        game.start(player);
      });

      socket.on('play card', ({ cardId }: { cardId: string }) => {
        console.log(player.getId(), cardId);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public sendEvent(player: Player, eventName: string, data: {}) {
    const socket = player.getSocket();
    socket.emit(eventName, data);
  }
}

export default Socket.getInstance();
