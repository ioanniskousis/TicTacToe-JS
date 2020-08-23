import {
  gel, crel,
} from './utils';

const playerClasses = [['xBlue', 'xRed'], ['oBlue', 'oRed']];
const playerImages = [['x-blue.png', 'x-red.png'], ['circle-blue.png', 'circle-red.png']];
const playerCups = ['cup-blue.png', 'cup-red.png'];
const imagesFolder = '../resources/images/';

function resize() {
  const main = gel('main');
  const grid = gel('grid-div');
  const mainHeight = main.offsetHeight - 40;
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
    const playerImage = playerImages[currentPlayer.image][currentPlayer.color];
    const imageUrl = imagesFolder.concat(playerImage);
    img.setAttribute('src', imageUrl);
    cell.appendChild(img);
    return true;
  }
  return false;
}

function interfaceReset() {
  const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  for (let index = 0; index < 9; index += 1) {
    const cell = gel(ids[index]);
    cell.innerHTML = '';
  }
}

function interfaceRender(game) {
  const ids = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const board = game.cells;
  for (let index = 0; index < 9; index += 1) {
    if (board[index] > 0) {
      const player = game.players[board[index] - 1];
      const cell = gel(ids[index]);
      const img = crel('img');
      const playerImage = playerImages[player.image][player.color];
      const imageUrl = imagesFolder.concat(playerImage);
      img.setAttribute('src', imageUrl);
      cell.appendChild(img);
    }
  }
}

function showPlayer(game) {
  const player = game.currentPlayer();
  const playerImage = playerImages[player.image][player.color];
  gel('player-name').textContent = player.name.concat(' is playing');
  gel('player-sign').setAttribute('src', imagesFolder.concat(playerImage));
}

function showWinner(winningPlayer, game) {
  const winnerDiv = gel('winnerDiv');
  const backgroundDiv = gel('backgroundDiv');
  backgroundDiv.style.visibility = 'visible';
  const playerCup = playerCups[winningPlayer.color];
  gel('winnerCup').setAttribute('src', imagesFolder.concat(playerCup));
  winnerDiv.style.opacity = 1.0;
  winnerDiv.style.left = '0';
  winnerDiv.style.top = '0';
  winnerDiv.style.width = '100%';
  winnerDiv.style.height = '100%';
  gel('winnerLab').textContent = winningPlayer.name;
  gel('player-name').textContent = 'Click To Restart';
  gel('player-sign').style.visibility = 'hidden';
  gel('player-sign').style.display = 'none';
  game.reset();
  game.save();
}

function hideWinner() {
  const winnerDiv = gel('winnerDiv');
  winnerDiv.style.opacity = 0;
  winnerDiv.style.left = '50%';
  winnerDiv.style.top = '50%';
  winnerDiv.style.width = '0px';
  winnerDiv.style.height = '0px';
}

function showGameOver(game) {
  gel('gameOverDiv').style.visibility = 'visible';
  gel('player-name').textContent = 'Click To Restart';
  gel('player-sign').style.visibility = 'hidden';
  gel('player-sign').style.display = 'none';
  game.reset();
  game.save();
}

function hideGameOver(gameOverDiv, game) {
  gameOverDiv.style.visibility = 'hidden';
  gel('player-sign').style.visibility = 'visible';
  gel('player-sign').style.display = 'block';
  // game.reset();
  interfaceReset();
  showPlayer(game);
  // game.save();
}

function resetSettingsSelectors() {
  gel('player0Sign0').className = 'signSelector';
  gel('player0Sign1').className = 'signSelector';
  gel('player1Sign0').className = 'signSelector';
  gel('player1Sign1').className = 'signSelector';
  gel('player0Color0').className = 'signSelector blueColor';
  gel('player0Color1').className = 'signSelector redColor';
  gel('player1Color0').className = 'signSelector blueColor';
  gel('player1Color1').className = 'signSelector redColor';
}

function setupSettingsSelectors(player0, player1) {
  resetSettingsSelectors();

  const player0Sign = gel('player0Sign'.concat((player0.image).toString()));
  player0Sign.className += ' dashed '.concat(playerClasses[player0.image][player0.color]);
  const player0SignA = gel('player0Sign'.concat((player1.image).toString()));
  player0SignA.className += ' '.concat(playerClasses[player1.image][player0.color]);

  const player0Color = gel('player0Color'.concat((player0.color).toString()));
  player0Color.className += ' dashed';

  const player1Sign = gel('player1Sign'.concat((player1.image).toString()));
  player1Sign.className += ' dashed '.concat(playerClasses[player1.image][player1.color]);
  const player1SignA = gel('player1Sign'.concat((player0.image).toString()));
  player1SignA.className += ' '.concat(playerClasses[player0.image][player1.color]);

  const player1Color = gel('player1Color'.concat((player1.color).toString()));
  player1Color.className += ' dashed';
}

function showSettings(game) {
  const settingsDiv = gel('settingsDiv');
  settingsDiv.style.opacity = 1.0;
  settingsDiv.style.left = '0';
  settingsDiv.style.top = '0';
  settingsDiv.style.width = '100%';
  settingsDiv.style.height = '100%';
  const player0 = game.players[0];
  const player1 = game.players[1];
  gel('player1name').value = player0.name;
  gel('player2name').value = player1.name;
  setupSettingsSelectors(player0, player1);
}

function selectPlayerImage(selector, game) {
  const playerIndex = parseInt(selector.getAttribute('player'), 10);
  const playerIndexA = (playerIndex + 1) % 2;
  const imageIndex = parseInt(selector.getAttribute('index'), 10);
  const imageIndexA = (imageIndex + 1) % 2;

  game.players[playerIndex].image = imageIndex;
  game.players[playerIndexA].image = imageIndexA;

  const player0 = game.players[Math.min(playerIndex, playerIndexA)];
  const player1 = game.players[Math.max(playerIndex, playerIndexA)];
  setupSettingsSelectors(player0, player1);
}

function selectPlayerColor(selector, game) {
  const playerIndex = parseInt(selector.getAttribute('player'), 10);
  const playerIndexA = (playerIndex + 1) % 2;
  const colorIndex = parseInt(selector.getAttribute('index'), 10);
  const colorIndexA = (colorIndex + 1) % 2;

  game.players[playerIndex].color = colorIndex;
  game.players[playerIndexA].color = colorIndexA;

  const player0 = game.players[Math.min(playerIndex, playerIndexA)];
  const player1 = game.players[Math.max(playerIndex, playerIndexA)];
  setupSettingsSelectors(player0, player1);
}

function selectSetting(selector, game) {
  const selectorType = selector.getAttribute('selector');
  if (selectorType === 'image') {
    selectPlayerImage(selector, game);
  } else if (selectorType === 'color') {
    selectPlayerColor(selector, game);
  }
}

function hideSettings() {
  const settingsDiv = gel('settingsDiv');
  settingsDiv.style.opacity = 0.0;
  settingsDiv.style.left = '50%';
  settingsDiv.style.top = '50%';
  settingsDiv.style.width = '0';
  settingsDiv.style.height = '0';
}

function hideBackgroundDiv(backgroundDiv, game) {
  gel('player-sign').style.visibility = 'visible';
  gel('player-sign').style.display = 'block';
  backgroundDiv.style.visibility = 'hidden';
  interfaceReset();
  showPlayer(game);
  game.save();
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
  showSettings,
  hideSettings,
  selectSetting,
  interfaceRender,
};
