import { AsyncStorage } from 'react-native';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, Observable, split } from 'apollo-link'
import { onError } from 'apollo-link-error';
//import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
//import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

import StorageKeys from '../statics/storage-keys';

let cachedToken = '';

async function getAuthorizationToken() {
  const token = cachedToken
    ? cachedToken
    : await AsyncStorage.getItem(StorageKeys.GC_TOKEN);

  cachedToken = token;

  return token;
}

export function setupApolloClient() {
  const connectionParams = async () => {
    const token = await getAuthorizationToken();
    return token ? { authorization: `Bearer ${token}` } : {};
  };

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/',
    options: {
      reconnect: true,
      connectionParams: connectionParams
    },
  });

  const httpLink = new createHttpLink({
    uri: 'http://localhost:4000/',
  });
  /*
    const authMiddleware = setContext(
      (_, { headers }) =>
        new Promise(async resolve => {
          // get the authentication token from local storage if it exists
          const token = await getAuthorizationToken();
  
          cachedToken = token;
  
          // return the headers to the context so httpLink can read them
          resolve({
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : null,
            },
          });
        }),
    );*/
  // const httpLinkWithAuth = authMiddleware.concat(httpLink);
  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  )

  const middlewareAuthLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        const myf = (oper) => {
          //const token = await getAuthorizationToken();
          //const authorizationHeader = token ? `Bearer ${token}` : null
          oper.setContext({
            headers: connectionParams
          })
        }

        Promise.resolve(operation)
          .then(oper => myf(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) {
            handle.unsubscribe();
          }
        };
      }))

  const httpLinkWithAuth = middlewareAuthLink.concat(httpLink)

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ApolloLink.from([errorLink,wsLink]),
    ApolloLink.from([errorLink, httpLinkWithAuth])
    //httpLinkWithAuth,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({ dataIdFromObject: o => o.id }),
    connectToDevTools: true
  });

  return client;
}
