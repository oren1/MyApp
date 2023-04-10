/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import CoinDetail from './src/Coins/CoinDetail';
import CoinsList from './src/Coins/CoinsList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStackParamList} from './src/NavigationTypes';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/Network/NetworkManager';
/**
 * 'createNativeStackNavigator'
 * returns an object containing two properties: 'Navigator' and 'Screen'.
 * 'Navigator' contains one or more 'Screen' components to define the configuration for routes.
 */

/**
 * 'NavigationContainer'
 * is a component which manages our navigation tree and contains the navigation state.
 * This component must wrap all navigators structure.
 * Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TopList" // sets the 'TopList' to be render first in the navigation
            screenOptions={{headerTransparent: false}} // 'screenOptions' sets options for all screens in the navigator, in case
            //we want the same options for everyone.
          >
            <Stack.Screen name="TopList" component={CoinsList} />
            <Stack.Screen
              name="CoinDetail"
              component={CoinDetail}
              options={({route}) => ({
                title: route.params?.coinName,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>

    // <SafeAreaView style={{flex: 1, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}}>
    //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

    //       <View style={{ flex: 1}}>
    //           <CoinsList ></CoinsList>
    //       </View>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
