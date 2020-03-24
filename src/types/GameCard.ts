import { TurtleColor } from 'models/Board';

type GameCard = {
  readonly id: string;
  readonly turtle: TurtleColor | 'last' | 'any';
  readonly move: number;
};

export default GameCard;
