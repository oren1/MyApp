import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

import {Coin} from './AwesomeTypes';

/** RootStackParamList
 * maps the screen names and their params for typescript. we pass the 'RootStackParamList' as a generic type
 * to the 'createNativeStackNavigator' function.
 * This will provide type checking and intelliSense for props of the Navigator and Screen components.
 * */
export type RootStackParamList = {
  MyTabs: undefined;
  CoinDetail: Coin;
};

export type TabParamList = {
  TopList: undefined;
  NewsFeed: undefined;
}

/** NativeStackScreenProps
 * let us define the screen props. it gets the param list(RootStackParamList) and the name of the specific screen.
 * and returns a type.
 */

/* Using 'CompositeScreenProps' to combine the the TopList navigation prop(that contains the params and 
 the navigation methods of the TabBar) with the container navigator navigation prop to enable bubble up functionality.
 "bubble up" is this: when the nested navigator can't handle some call then the parent navigator handles it. */
export type TopListScreenProps = CompositeScreenProps<
BottomTabScreenProps<TabParamList, 'TopList'>,
NativeStackScreenProps<RootStackParamList>
>;

export type NewsFeedScreenProps = BottomTabScreenProps<TabParamList, 'NewsFeed'>

export type CoinDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CoinDetail'
>;
