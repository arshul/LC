import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import App  from './App'

const client = new ApolloClient({
  link:new HttpLink({ uri: 'https://18.219.31.5:4000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

