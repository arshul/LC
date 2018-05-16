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
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });
const authLink = setContext((_, { headers }) => {
  const token = 'd65417c396255fd143c30b146c02ecfdd74b23da'

  return {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
})
const link = authLink.concat(httpLink)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})
ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
)
const POPULAR_REPOSITORIES_LIST = gql`
{
  search(query: "stars:>50000", type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`

client.query({ query: POPULAR_REPOSITORIES_LIST }).then(console.log)


