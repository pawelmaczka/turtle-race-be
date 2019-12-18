import Controller from '../../types/Controller';

const games = [
  {
    id: 1,
    players: ['adam', 'ewa', 'damian', 'kasia', 'ola'],
  },
];

const list: Controller = (req, res) => {
  res.json(games);
};

export default list;
