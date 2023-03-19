import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import FastImage from 'react-native-fast-image';

interface CoinRowProp {
  testID: string
  coinName: string;
  imageUrl: string;
  onPress: () => void;
}

const CoinRow = ({onPress, coinName, imageUrl, testID}: CoinRowProp) => {
  const CoinView = () => {
    return (
      <View testID={testID} style={styles.coinRowContainer}>
        <FastImage source={{uri: imageUrl}} style={{width: 75, height: 75}} />

        <Text style={styles.titleText}>{coinName}</Text>
      </View>
    );
  };

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress}>
      <CoinView />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  coinRowContainer: {
    margin: 0,
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    margin: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CoinRow