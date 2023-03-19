import React, {useEffect} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import CoinRow from './CoinRow';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TopListScreenNavigationProp} from '../NavigationTypes';
import {Coin} from '../AwesomeTypes';
import {observer} from 'mobx-react-lite';
import store from '../Store/index';

/**
 * navigation prop
 * the navigation prop is passed in to every screen component in the native stack navigator
 */

const CoinsList = observer(({navigation}: TopListScreenNavigationProp) => {
  useEffect(() => {
    store.coinsStore.fetchCoinsList();
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
    <SafeAreaView testID={'CoinList'}
      edges={['bottom']}
      style={{flex: 1, backgroundColor: 'white'}}>
      {store.coinsStore.isCoinListLoading && store.coinsStore.page === 0 ? (
        <ActivityIndicator
          size="large"
          style={styles.activityIndicatorFullScreen}
        />
      ) : (
        <FlatList
          data={store.coinsStore.coinsList}
          renderItem={renderItem}
          keyExtractor={({id}, index) => id}
          ListFooterComponent={
            <ActivityIndicator style={styles.activityIndicatorBottom} />
          }
          onEndReachedThreshold={0}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
          maxToRenderPerBatch={20}
          onEndReached={() => {
            store.coinsStore.fetchCoinsList();
            console.log('onEndReached');
          }}
        />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  activityIndicatorFullScreen: {
    flex: 1,
  },
  activityIndicatorBottom: {
    height: 20,
    paddingBottom: 30,
  },
});

export default CoinsList;
