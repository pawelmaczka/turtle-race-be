type GameCard = {
  readonly id: string;
  readonly turtle: 'red' | 'green' | 'blue' | 'yellow' | 'violet' | 'last' | 'any';
  readonly move: number;
};

export default GameCard;
