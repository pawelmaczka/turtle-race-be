import WithUniqueId from './WithUniqueId';

jest.mock('uuid', () =>
  jest
    .fn()
    .mockReturnValueOnce('randomId')
    .mockReturnValueOnce('randomId2')
);

class TestClass extends WithUniqueId {}

describe('WithUniqueId', () => {
  it('has a random ID', () => {
    const firstObject = new TestClass();
    const secondObject = new TestClass();

    expect(firstObject.getId()).toBe('randomId');
    expect(secondObject.getId()).toBe('randomId2');
  });
});
