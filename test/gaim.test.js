import GameBoard from '../src/game';

describe('the game class functionality', () => {
  let game;

  beforeEach(() => {
    game = new GameBoard();
  });

  test('there are 8 winning sets', () => {
    const sets = game.prepareSets();
    expect(sets.length).toBe(8);
  });

  test('maps all winning sets', () => {
    const sets = game.prepareSets();
    expect(sets).toContainEqual([0, 0, 0]);
  });
});
