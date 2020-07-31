/* eslint-disable import/extensions */
import {
  gel, gelc,
} from './utils.js';
import {
  resize,
  clickCell,
  hideWinner,
  showWinner,
  showPlayer,
  showGameOver,
  hideGameOver,
  hideBackgroundDiv,
  interfaceReset,
  showSettings,
  hideSettings,
  selectSetting,
  interfaceRender,
} from './controlFlow.js';

import GameBoard from './game.js';
import Player from './player.js';

const game = new GameBoard();
const player1 = new Player(0);
const player2 = new Player(1);
game.addPlayer(player1);
game.addPlayer(player2);

function checkGameState() {
  const winningPlayer = game.winningPlayer();
  if (winningPlayer) {
    showWinner(winningPlayer, game);
    return;
  }
  if (game.gameOver()) {
    showGameOver(game);
    game.swapPlayers();
  }
}

window.addEventListener('resize', () => {
  resize();
});

window.addEventListener('load', () => {
  resize();
  showPlayer(game);
  interfaceRender(game);
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
  // game.reset();
  hideWinner();
});

gel('restart-sign').addEventListener('click', () => {
  game.reset();
  interfaceReset();
  game.swapPlayers();
  showPlayer(game);
  game.save();
});

const backgroundDiv = gel('backgroundDiv');
backgroundDiv.addEventListener('click', () => {
  hideBackgroundDiv(backgroundDiv, game);
});

const gameOverDiv = gel('gameOverDiv');
gel('gameOverDiv').addEventListener('click', () => {
  hideGameOver(gameOverDiv, game);
});

gel('settings-sign').addEventListener('click', () => {
  showSettings(game);
});

gel('close-settings').addEventListener('click', () => {
  hideSettings();
  showPlayer(game);
  interfaceReset();
  interfaceRender(game);
  player1.save();
  player2.save();
});

const signSelectors = gelc('signSelector');
for (let index = 0; index < signSelectors.length; index += 1) {
  const selector = signSelectors[index];
  selector.addEventListener('click', () => {
    selectSetting(selector, game);
  });
}

gel('player1name').addEventListener('focusout', () => {
  const input = gel('player1name');
  if (input.value.length > 0) {
    game.players[0].name = input.value;
  }
});

gel('player2name').addEventListener('focusout', () => {
  const input = gel('player2name');
  if (input.value.length > 0) {
    game.players[1].name = input.value;
  }
});
