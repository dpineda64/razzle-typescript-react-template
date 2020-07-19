import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';

const client = new ApolloClient({
  ssrMode: typeof window === undefined,
  link: createHttpLink({
    uri: process.env.RAZZLE_API_URL,
    credentials: 'same-origin',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
