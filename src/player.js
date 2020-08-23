class Player {
  constructor(id, useLocalStorage = true) {
    this.id = id + 1;
    const item = 'tictactoe_player'.concat(this.id.toString());
    const store = useLocalStorage ? JSON.parse(localStorage.getItem(item)) : null;
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
