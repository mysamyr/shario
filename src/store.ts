class Store {
  private value: string;

  constructor() {
    this.value = '';
  }

  getText() {
    return this.value;
  }
  setText(text: string) {
    this.value = text;
  }
}

export default new Store();
