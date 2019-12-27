import getShuffledArray from './getShuffledArray';

describe('getShuffledArray', () => {
  const unshuffledArray = [1, 2, 3, 4, 5];

  it('returns an array containing the same elements as passed array', () => {
    const shuffledArray = getShuffledArray(unshuffledArray);

    expect(shuffledArray.length).toBe(unshuffledArray.length);
    expect(shuffledArray.every((element) => unshuffledArray.includes(element)));
    expect(unshuffledArray.every((element) => shuffledArray.includes(element)));
  });

  it('returns an array with elements in a different order than in passed array', () => {
    const shuffledArray = getShuffledArray(unshuffledArray);

    expect(shuffledArray.every((element, index) => element === unshuffledArray[index])).toBeFalsy();
  });
});
