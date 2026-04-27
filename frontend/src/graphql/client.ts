import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import networkConfig from '../config/network.json';

const { backendIP, backendPort } = networkConfig;
const baseUrl = `${backendIP}:${backendPort}`;

const httpLink = new HttpLink({
  uri: `http://${baseUrl}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({ url: `ws://${baseUrl}/graphql` }),
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
