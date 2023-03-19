import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
// import {getHistory} from '../Network/NetworkManager';
import {CoinDetailScreenNavigationProp} from '../NavigationTypes';
import {Point} from '../AwesomeTypes';
import {useLazyQuery, useQuery} from '@apollo/client';
import {queries} from '../Network/Queries';
/**
 * 'route' prop
 * the 'route' prop let us receive the params passed from the previous screen. 'route.params'
 * */

const CoinDetail = ({route}: CoinDetailScreenNavigationProp) => {
  const {symbol} = route.params;

  const [getHistory, {loading, error, data}] = useLazyQuery(
    queries.GET_HISTORY,
  );

  useEffect(() => {
    async function fetchData() {
      getHistory({
        variables: {
          params: {
            fsym: symbol,
            tsym: 'USD',
            limit: (90 * 24) / 10,
            aggregate: 10,
          },
        },
      });
    }
    fetchData();
  }, [getHistory, symbol]);

  return (
    <View
    testID={'CoinDetail'}
    style={styles.container}>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} size="small" />
      ) : (
        <LineChart
          testID={'LineChart'}
          style={styles.chart}
          chartDescription={{text: ''}}
          data={{
            dataSets: [
              {
                label: 'Coin History',
                values: data?.listHistory.map(({y}: {y: number}) => y),
                config: {drawCircles: false},
              },
            ],
          }}
          xAxis={{
            axisLineWidth: 0,
            drawLabels: false,
            position: 'BOTTOM',
            drawGridLines: false,
          }}
          yAxis={config.yAxis}
          drawBorders={false}
          legend={config.legend}
          marker={config.marker}
        />
      )}
    </View>
  );
};

const config = {
  xAxis: {
    axisLineWidth: 0,
    drawLabels: false,
    position: 'BOTTOM',
    drawGridLines: false,
  },
  yAxis: {
    left: {
      enabled: false,
      drawGridLines: false,
      drawLabels: false,
    },
    right: {
      drawGridLines: false,
      enabled: true,
      drawLabels: true,
    },
  },
  legend: {
    enabled: false,
  },
  marker: {
    enabled: false,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  activityIndicator: {
    height: 350,
  },
  chart: {
    height: 350,
  },
});

export default CoinDetail;
