import React from "react";
import Auth from "./contexts/stores/Auth";
import Navigation from "./navigation/Navigation";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

let github = localStorage.github ? JSON.parse(localStorage.github) : "";
const token = github.token ? github.token : "";

const httpLink = new HttpLink({ 
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${token}`
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          }
        }
      }
    }
  }),
  link: httpLink,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Auth>
        <Navigation />
      </Auth>
    </ApolloProvider>
  );
}

export default App;
