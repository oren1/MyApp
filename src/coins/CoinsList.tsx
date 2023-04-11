import React, {useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import CoinRow from './CoinRow';
import {TopListScreenProps} from '../NavigationTypes';
import {Coin} from '../AwesomeTypes';
import {observer} from 'mobx-react-lite';
import store from '../store/index';
import {getMoreCoins} from '../store/CoinsStore/actions';

/**
 * navigation prop
 * the navigation prop is passed in to every screen component in the native stack navigator
 */

const CoinsList = observer(({navigation}: TopListScreenProps) => {
  useEffect(() => {
    getMoreCoins();
  }, []);

  function showDetails(index: number) {
    let coin = store.coinsStore.coinsList[index];
    return () => {
      /**
       * navigating to a route/component that is defined in the navigator by giving it it's name.
       * if 'navigation.navigate' is replaced with 'navigation.push' then the same screen will be allowed to be
       * opened regardless if it was opened before.
       * */
      navigation.navigate('CoinDetail', coin);
    };
  }

  const renderItem = ({item, index}: {item: Coin; index: number}) => {
    return (
      <CoinRow
        testID={`CoinRow.${index + 1}`}
        onPress={showDetails(index)}
        coinName={item.coinName}
        imageUrl={item.imageUrl}
      />
    );
  };

  return (
    <View testID={'CoinList'} style={styles.container}>
      {store.coinsStore.isCoinListLoading && store.coinsStore.page === 0 ? (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicatorFullScreen}
        />
      ) : (
        <FlatList
          data={store.coinsStore.coinsList}
          renderItem={renderItem}
          keyExtractor={({id}, index) => id + index}
          ListFooterComponent={
            <ActivityIndicator style={styles.activityIndicatorBottom} />
          }
          removeClippedSubviews={true}
          onEndReachedThreshold={0}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
          onEndReached={() => {
            getMoreCoins();
            console.log('onEndReached');
          }}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityIndicatorFullScreen: {
    flex: 1,
  },
  activityIndicatorBottom: {
    height: 20,
    paddingBottom: 30,
  },
});

export default CoinsList;
