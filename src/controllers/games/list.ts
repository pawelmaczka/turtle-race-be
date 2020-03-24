import Controller from 'types/Controller';
import GamesManager from 'services/GamesManager';

const list: Controller = (req, res) => {
  res.send(GamesManager.getGames());
};

export default list;
