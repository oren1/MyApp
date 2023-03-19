import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Coin} from './AwesomeTypes';

/** RootStackParamList
 * maps the screen names and their params for typescript. we pass the 'RootStackParamList' as a generic type
 * to the 'createNativeStackNavigator' function.
 * This will provide type checking and intelliSense for props of the Navigator and Screen components.
 * */
export type RootStackParamList = {
  TopList: undefined;
  CoinDetail: Coin;
};

/** NativeStackScreenProps
 * let us define the screen props. it gets the param list(RootStackParamList) and the name of the specific screen.
 * and returns a type.
 */

export type TopListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'TopList'
>;

export type CoinDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CoinDetail'
>;
