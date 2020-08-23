import GameBoard from '../src/game';
import Player from '../src/player';

describe('the game class functionality', () => {
  let game;

  beforeEach(() => {
    game = new GameBoard(false);
    game.addPlayer(new Player(0, false));
    game.addPlayer(new Player(1, false));
  });

  test('prepareSets() there are 8 winning sets', () => {
    const sets = game.prepareSets();
    expect(sets.length).toBe(8);
  });

  test('maps all winning sets', () => {
    const sets = game.prepareSets();
    expect(sets).toContainEqual([0, 0, 0]);
  });

  test('checkCell() effectiveness', () => {
    game.currentPlayerIndex = 1;
    game.checkCell(0);
    expect(game.cells[0]).toEqual(2);
  });

  test('checkCell() invalide move (3 moves, 1 invalide, so only 2 checked cells)', () => {
    game.currentPlayerIndex = 1;
    game.checkCell(0);
    game.checkCell(0);
    game.checkCell(1);
    expect(game.cells).toEqual([2, 1, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('checkCell() and gaimboard content after 6 moves', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(2);
    game.checkCell(7);
    expect(game.cells).toEqual([1, 2, 1, 0, 2, 0, 0, 2, 1]);
  });

  test('reset()', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    expect(game.cells).toEqual([1, 0, 0, 0, 2, 0, 0, 0, 1]);
    game.reset();
    expect(game.cells).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('swapPlayers()', () => {
    game.currentPlayerIndex = 0;
    game.swapPlayers();
    expect(game.currentPlayerIndex).toBe(1);
  });

  test('playerIsWinningSet()', () => {
    const playerId = 1;
    const set = [1, 1, 1];
    const winning = game.playerIsWinningSet(playerId, set);
    expect(winning).toBe(true);
  });

  test('playerIsWinner() after 6 moves - winner', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(2);
    game.checkCell(7);
    const sets = game.prepareSets();
    expect(game.playerIsWinner(2, sets)).toBe(true);
  });

  test('playerIsWinner() after 6 moves - not winner', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(2);
    game.checkCell(7);
    const sets = game.prepareSets();
    expect(game.playerIsWinner(1, sets)).toBe(false);
  });

  test('winningPlayer() after 6 moves - gives winner', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(2);
    game.checkCell(7);
    expect(game.winningPlayer().name).toBe('Player 2');
  });

  test('winningPlayer() one more example', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(2);
    game.checkCell(6);
    game.checkCell(7);
    game.checkCell(3);
    expect(game.winningPlayer().name).toBe('Player 1');
  });

  test('winningPlayer() on gameOver', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(7);
    game.checkCell(6);
    game.checkCell(3);
    game.checkCell(5);
    game.checkCell(2);
    expect(game.winningPlayer()).toBe(null);
  });

  test('gameOver() true', () => {
    game.currentPlayerIndex = 0;
    game.checkCell(0);
    game.checkCell(4);
    game.checkCell(8);
    game.checkCell(1);
    game.checkCell(7);
    game.checkCell(6);
    game.checkCell(3);
    game.checkCell(5);
    game.checkCell(2);
    expect(game.gameOver()).toBe(true);
  });
});
