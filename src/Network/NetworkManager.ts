import {Point} from '../AwesomeTypes';
import {Coin} from '../Store/CoinsStore/store';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {queries} from './Queries';
type Nullable<Type> = Type | null;
type GetHistoryCallback = (
  points: Nullable<Point[]>,
  error: Nullable<Error>,
) => void;

export const client = new ApolloClient({
  uri: 'https://5142s291u6.execute-api.us-east-1.amazonaws.com/',
  cache: new InMemoryCache(),
});

const getCoinsForPage = async (page = 0): Promise<Coin[]> => {
  const result = await client.query({
    query: queries.GET_COINS,
    variables: {
      page: page,
    },
  });
  return result.data.listCoins;
};

const getHistory = async (fsym: string, tsym: string) => {
  // try {
  let limit = (90 * 24) / 10;
  const result = await client.query({
    query: queries.GET_HISTORY,
    variables: {
      params: {
        fsym: fsym,
        tsym: tsym,
        limit: limit,
        aggregate: 10,
      },
    },
  });
  return result.data.listHistory;
  // let url = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=${10}`;
  //   console.log(`url ${url}`);

  //   let response = await fetch(url);
  //   let json = await response.json();
  //   let graphPoints = json.Data.Data.map((point: Dictionary) =>
  //     Point.ParsePoint(point),
  //   );
  //   callback(graphPoints, null);
  // } catch (error) {
  //   callback(null, error as Error);
  // // }
};

export {getCoinsForPage, getHistory};
