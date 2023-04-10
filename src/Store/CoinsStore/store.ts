import {makeAutoObservable, runInAction} from 'mobx';
import {getCoinsForPage} from '../../Network/NetworkManager';

export type Coin = {
  id: string;
  symbol: string;
  coinName: string;
  imageUrl: string;
};

export default class CoinsStore {
  page = 0;
  coinsList: Array<Coin> = [];
  isCoinListLoading = false;
  isCoinHistoryLoding = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCoinsList() {
    this.isCoinListLoading = true;
    getCoinsForPage(this.page)
      .then(coins => {
        runInAction(() => {
          /*
          'action' or 'runInAction' makes sure that only after the top level action has finished,
           only then the reaction will be triggered, making sure that all observables are udated with the latest value
          and not getting triggered after some random update within an action.
          */
          this.coinsList.push(...coins);
          this.page++;
          this.isCoinListLoading = false;
        });
      })
      .catch(error => {
        console.log('error:', error);
      });
  }
}
