/* eslint-disable class-methods-use-this */
class GameBoard {
  constructor() {
    const board = JSON.parse(localStorage.getItem('tictactoe_board'));
    if (board) {
      this.cells = board;
    } else {
      this.reset();
    }
    const cPlayer = JSON.parse(localStorage.getItem('tictactoe_current_player'));
    this.currentPlayerIndex = cPlayer || 0;
    this.players = [];
  }

  save() {
    localStorage.setItem('tictactoe_board', JSON.stringify(this.cells));
    localStorage.setItem('tictactoe_current_player', JSON.stringify(this.currentPlayerIndex));
  }

  currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  swapPlayers() {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  reset() {
    this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  isChecked(cell) {
    return cell > 0;
  }

  prepareSets() {
    const row1 = [this.cells[0], this.cells[1], this.cells[2]];
    const row2 = [this.cells[3], this.cells[4], this.cells[5]];
    const row3 = [this.cells[6], this.cells[7], this.cells[8]];
    const column1 = [this.cells[0], this.cells[3], this.cells[6]];
    const column2 = [this.cells[1], this.cells[4], this.cells[7]];
    const column3 = [this.cells[2], this.cells[5], this.cells[8]];
    const diagonal1 = [this.cells[0], this.cells[4], this.cells[8]];
    const diagonal2 = [this.cells[2], this.cells[4], this.cells[6]];
    const sets = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2];
    return sets;
  }

  playerIsWinningSet(playerId, set) {
    for (let elementIndex = 0; elementIndex < set.length; elementIndex += 1) {
      const element = set[elementIndex];
      if (element !== playerId) {
        return false;
      }
    }
    return true;
  }

  playerIsWinner(playerId, sets) {
    for (let setIndex = 0; setIndex < sets.length; setIndex += 1) {
      const set = sets[setIndex];
      if (this.playerIsWinningSet(playerId, set)) {
        this.winnerSet = set;
        this.winnerSetIndex = setIndex;
        return true;
      }
    }
    return false;
  }

  winningPlayer() {
    const sets = this.prepareSets();
    if (this.playerIsWinner(this.players[0].id, sets)) {
      return this.players[0];
    }
    if (this.playerIsWinner(this.players[1].id, sets)) {
      return this.players[1];
    }
    return null;
  }

  gameOver() {
    if (this.cells.every(this.isChecked)) {
      return true;
    }
    return false;
  }

  checkCell(cellIndex) {
    if (this.cells[cellIndex] !== 0) {
      return false;
    }

    this.cells[cellIndex] = this.currentPlayer().id;
    this.swapPlayers();
    this.save();

    return true;
  }
}

export default GameBoard;
