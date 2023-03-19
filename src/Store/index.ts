import CoinsStore from './CoinsStore/store';

export class Store {
  coinsStore: CoinsStore;

  constructor() {
    this.coinsStore = new CoinsStore();
  }
}

export default new Store();
