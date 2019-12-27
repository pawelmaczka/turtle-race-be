import Game from 'models/Game';
import Controller from 'types/Controller';

const games = [new Game()];

const list: Controller = (req, res) => {
  res.send(games[0]);
};

export default list;
