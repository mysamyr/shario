class Store {
  private value: string;

  constructor() {
    this.value = '';
  }

  getText(): string {
    return this.value;
  }
  setText(text: string): void {
    this.value = text;
  }
}

export default new Store();
