import Controller from 'types/Controller';
import Socket from 'services/Socket';
import Game from 'models/Game';
import GamesManager from 'services/GamesManager';

const create: Controller = (req, res) => {
  const { numberOfPlayers } = req.body;

  const game = new Game(numberOfPlayers);
  const gameId = game.getId();

  Socket.createRoom(game);

  GamesManager.addGame(game);

  console.log(`Created new room for ${numberOfPlayers} players`);
  res.send(gameId);
};

export default create;
