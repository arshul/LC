import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import App from './App'

const client = new ApolloClient({
  link:new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);


// client.query({
//   query: gql`{books { title author }}`,
// }).then(console.log)

var search_query = "carryminati";
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open("POST", "http://localhost:4000/graphql");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onload = function () {
    console.log('data returned:', xhr.response);
}

var query = `query youtubeSearch($search_query: String!) {
  search(search_query: $search_query){id}
}`;
xhr.send(JSON.stringify({
    query: query,
    variables: {search_query:search_query},
}));

 
 