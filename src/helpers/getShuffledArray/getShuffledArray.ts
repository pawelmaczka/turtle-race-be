const getShuffledArray = <T>(arrayToShuffle: T[]): T[] =>
  [...arrayToShuffle].sort(() => 0.5 - Math.random());

export default getShuffledArray;
