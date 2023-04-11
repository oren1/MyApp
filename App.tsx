/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import CoinDetail from './src/coins/CoinDetail';
import CoinsList from './src/coins/CoinsList';
import NewsFeedScreen from './src/news/NewsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParamList, TabParamList} from './src/NavigationTypes';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/network/NetworkManager';
import {Platform} from 'react-native';

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
const Tab = createBottomTabNavigator<TabParamList>();
const MaterialTab = createMaterialTopTabNavigator<TabParamList>();

function MyTabs() {
  if (Platform.OS === 'ios') {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="TopList"
          component={CoinsList}
          options={{title: 'Top List'}}
        />
        <Tab.Screen
          name="NewsFeed"
          component={NewsFeedScreen}
          options={{title: 'News Feed'}}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <MaterialTab.Navigator>
        <MaterialTab.Screen
          name="TopList"
          component={CoinsList}
          options={{title: 'Top List'}}
        />
        <MaterialTab.Screen
          name="NewsFeed"
          component={NewsFeedScreen}
          options={{title: 'News Feed'}}
        />
      </MaterialTab.Navigator>
    );
  }
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MyTabs" // sets the 'TopList' to be render first in the navigation
          screenOptions={{headerTransparent: false}} // 'screenOptions' sets options for all screens in the navigator, in case
          //we want the same options for everyone.
        >
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{headerShown: false}} // don't show the parent header, only the child
          />
          <Stack.Screen
            name="CoinDetail"
            component={CoinDetail}
            options={({route}) => ({
              title: route.params?.coinName,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
