import {Coin} from './store';
export * from './store';
import {makeAutoObservable, runInAction} from 'mobx';
import mockCoins from './CoinsMock';

export default class CoinsStore {
    page = 0;
    coinsList: Array<Coin> = [];
    isCoinListLoading = false;
    isCoinHistoryLoding = false;
  
    constructor() {
      makeAutoObservable(this);
    }
  
    fetchCoinsList() {
        this.coinsList.push(...mockCoins);
        this.page++;
        this.isCoinListLoading = false;
    }
  }