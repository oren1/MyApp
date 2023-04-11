import {getCoinsForPage} from '../../network/NetworkManager';
import store from '../index';

export const getMoreCoins = async () => {
  const coinsStore = store.coinsStore;
  coinsStore.setIsCoinListLoading(true);
  const coins = await getCoinsForPage(coinsStore.page);
  coinsStore.updateCoins(coins);
};
