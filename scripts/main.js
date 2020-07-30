/* eslint-disable import/extensions */
import {
  gel, gelc,
} from './utils.js';
import {
  resize,
  clickCell,
  interfaceReset,
  hideWinner,
  showWinner,
  showPlayer,
  showGameOver,
  hideGameOver,
  hideBackgroundDiv,
} from './controlFlow.js';

import GameBoard from './game.js';
import Player from './player.js';

const game = new GameBoard();
const player1 = new Player(1, 'John', 'x-red.png', 'cup-red.png');
const player2 = new Player(2, 'Billy', 'circle-blue.png', 'cup-blue.png');
game.addPlayer(player1);
game.addPlayer(player2);

function checkGameState() {
  const winningPlayer = game.winningPlayer();
  if (winningPlayer) {
    showWinner(winningPlayer);
    return;
  }
  if (game.gameOver()) {
    showGameOver();
    game.swapPlayers();
  }
}

window.addEventListener('resize', () => {
  resize();
});

window.addEventListener('load', () => {
  resize();
  showPlayer(game);
});

const cells = gelc('grid-cell');
for (let index = 0; index < cells.length; index += 1) {
  const cell = cells[index];
  cell.addEventListener('click', () => {
    if (clickCell(cell, game)) {
      showPlayer(game);
      checkGameState();
    }
  });
}

gel('winnerDiv').addEventListener('click', () => {
  game.reset();
  hideWinner();
});

const backgroundDiv = gel('backgroundDiv');
backgroundDiv.addEventListener('click', () => {
  hideBackgroundDiv(backgroundDiv, game);
});

const gameOverDiv = gel('gameOverDiv');
gel('gameOverDiv').addEventListener('click', () => {
  hideGameOver(gameOverDiv, game);
});
