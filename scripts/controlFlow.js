
/* eslint-disable import/extensions */
import {
  gel, crel,
} from './utils.js';

function resize() {
  const main = gel('main');
  const grid = gel('grid-div');
  const mainHeight = main.offsetHeight - 20;
  const gridWidth = main.offsetWidth - 40;
  const sideSize = Math.min(mainHeight, gridWidth);
  grid.style.height = (sideSize).toString().concat('px');
  grid.style.width = (sideSize).toString().concat('px');
}

function clickCell(cell, game) {
  const currentPlayer = game.currentPlayer();
  const cellIndex = parseInt(cell.getAttribute('cellIndex'), 10);
  if (game.checkCell(cellIndex)) {
    const img = crel('img');
    const imageUrl = '../resources/images/'.concat(currentPlayer.image);
    // alert(imageUrl);
    img.setAttribute('src', imageUrl);
    // cell.innerHTML = '';
    cell.appendChild(img);
    return true;
  }
  return false;
}

function interfaceReset() {
  const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  for (let index = 0; index < 9; index += 1) {
    const element = gel(ids[index]);
    element.innerHTML = '';
  }
}

function showPlayer(game) {
  const player = game.currentPlayer();
  gel('player-name').textContent = player.name.concat(' is playing');
  gel('player-sign').setAttribute('src', './resources/images/'.concat(player.image));
}

function showWinner(winningPlayer) {
  const winnerDiv = gel('winnerDiv');
  const backgroundDiv = gel('backgroundDiv');
  backgroundDiv.style.visibility = 'visible';
  gel('winnerCup').setAttribute('src', './resources/images/'.concat(winningPlayer.cupImage));
  winnerDiv.style.opacity = 1.0;
  winnerDiv.style.left = '0';
  winnerDiv.style.top = '0';
  winnerDiv.style.width = '100%';
  winnerDiv.style.height = '100%';
  gel('winnerLab').textContent = winningPlayer.name;
  gel('player-name').textContent = 'Click To Restart';
  gel('player-sign').style.visibility = 'hidden';
  gel('player-sign').style.display = 'none';
}

function hideWinner() {
  const winnerDiv = gel('winnerDiv');
  winnerDiv.style.opacity = 0;
  winnerDiv.style.left = '50%';
  winnerDiv.style.top = '50%';
  winnerDiv.style.width = '0px';
  winnerDiv.style.height = '0px';
}

function showGameOver() {
  gel('gameOverDiv').style.visibility = 'visible';
  gel('player-name').textContent = 'Click To Restart';
  gel('player-sign').style.visibility = 'hidden';
  gel('player-sign').style.display = 'none';
}

function hideGameOver(gameOverDiv, game) {
  gameOverDiv.style.visibility = 'hidden';
  gel('player-sign').style.visibility = 'visible';
  gel('player-sign').style.display = 'block';
  game.reset();
  interfaceReset();
  showPlayer(game);
}

function hideBackgroundDiv(backgroundDiv, game) {
  gel('player-sign').style.visibility = 'visible';
  gel('player-sign').style.display = 'block';
  backgroundDiv.style.visibility = 'hidden';
  interfaceReset();
  showPlayer(game);
}

export {
  resize,
  clickCell,
  interfaceReset,
  showWinner,
  hideWinner,
  showPlayer,
  showGameOver,
  hideGameOver,
  hideBackgroundDiv,
};
