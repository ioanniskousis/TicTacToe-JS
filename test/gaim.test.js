import GameBoard from '../scripts/game';

let game;

beforeEach(() => {
  game = new GameBoard();
});

test('maps all winning sets', () => {
  const sets = game.prepareSets();
  expect(sets).toContainEqual([0, 0, 0]);
});
