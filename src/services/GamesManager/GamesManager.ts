import Game from 'models/Game';

class GamesManager {
  private static instance: GamesManager;

  private readonly games: Game[];

  private constructor() {
    this.games = [];
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGame(gameId: string): Game {
    return this.games.find((game) => game.getId() === gameId);
  }

  public getGames(): Game[] {
    return this.games;
  }

  public static getInstance(): GamesManager {
    if (!GamesManager.instance) {
      GamesManager.instance = new GamesManager();
    }

    return GamesManager.instance;
  }
}

export default GamesManager.getInstance();
