/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
class Player {
  constructor(id) {
    this.id = id + 1;
    const store = JSON.parse(localStorage.getItem('tictactoe_player'.concat(this.id.toString())));
    if (store) {
      this.name = store.name;
      this.image = parseInt(store.image, 10);
      this.color = parseInt(store.color, 10);
    } else {
      this.name = 'Player '.concat((id + 1).toString());
      this.image = id;
      this.color = id;
    }
  }

  save() {
    const store = { name: this.name, image: this.image, color: this.color };
    localStorage.setItem('tictactoe_player'.concat(this.id.toString()), JSON.stringify(store));
  }
}

export default Player;
