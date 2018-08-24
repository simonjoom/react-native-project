
import { AsyncStorage } from "react-native";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, Observable, split } from "apollo-link";
import { onError } from "apollo-link-error";
//import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-client-preset';
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";
//import { setContext } from 'apollo-link-context';
import { getMainDefinition } from "apollo-utilities";

import StorageKeys from "../statics/storage-keys";
//require('dotenv').config()
let cachedToken = "";
let pathbackend="http://ns327841.ip-37-187-112.eu/graphql/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  pathbackend="http://localhost:4000/graphql/"
}

const uriwebsocket=process.env.REACT_APP_ENDPOINT;
const isFile = value => {
  console.log("isFile?",value)
  console.log("isFile?",value instanceof File)
  return (typeof File !== "undefined" && value instanceof File) ||
  (typeof Blob !== "undefined" && value instanceof Blob);
}
async function getAuthorizationToken() {
  const token = cachedToken
    ? cachedToken
    : await AsyncStorage.getItem(StorageKeys.GC_TOKEN);

  cachedToken = token;

  return token;
}

export function setupApolloClient() {
  const connectionParams = async () => {
    return {};
    //const token = await getAuthorizationToken();
    //return token ? { authorization: `Bearer ${token}` } : {};
  };

  const wsLink = new WebSocketLink({
    uri: "wss://"+uriwebsocket,
    // uri: "ws://localhost:4000/subscriptions",
    options: {
      reconnect: true,
      connectionParams: connectionParams
    }
  });

  const httpLink = new createHttpLink({
    uri: pathbackend
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
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(err =>
        console.log(`[GraphQL error]: Message: ${err.message}`)
      );
    }
    if (networkError)
      console.log(`[Network error]: ${networkError}`, networkError);
  });


  const request = oper => {
    //const token = await getAuthorizationToken();
    //const authorizationHeader = token ? `Bearer ${token}` : null
    oper.setContext({
      headers: connectionParams
    });
  };
  const middlewareAuthLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
  const isSubscriptionOperation = ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  };

  const UploadLink = createUploadLink({ uri: pathbackend });
  const httpLinkWithAuth = middlewareAuthLink.concat(httpLink);

  const requestLink = split(isSubscriptionOperation, wsLink, httpLinkWithAuth);

  const isUpload = ({ variables }) => Object.values(variables).some(isFile);

  const terminalLink = split(isUpload, UploadLink, requestLink);

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, terminalLink]),
    cache: new InMemoryCache(),
    connectToDevTools: false
  });

  return client;
}
//{ dataIdFromObject: o => o.id }