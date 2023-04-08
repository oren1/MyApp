/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import CoinDetail from './src/components/coins/CoinDetail';
import CoinsList from './src/components/coins/CoinsList';
import NewsFeedScreen from './src/components/news/NewsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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
  if(Platform.OS == 'ios') {
    return (
      <Tab.Navigator>
        <Tab.Screen name="TopList" component={CoinsList} options={{title: "Top List"}}/>
        <Tab.Screen name="NewsFeed" component={NewsFeedScreen} options={{title: "News Feed"}}/>
      </Tab.Navigator>
    );
  }
  else {
    return (
      <MaterialTab.Navigator>
        <MaterialTab.Screen name="TopList" component={CoinsList} options={{title: "Top List"}} />
        <MaterialTab.Screen name="NewsFeed" component={NewsFeedScreen} options={{title: "News Feed"}}/>
      </MaterialTab.Navigator>
    );
  }
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* <SafeAreaProvider> */}
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
      {/* </SafeAreaProvider> */}
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
