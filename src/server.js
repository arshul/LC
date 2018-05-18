const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress,graphiqlExpress } = require('apollo-server-express')
// const { schema } = require('./schema')
const { makeExecutableSchema } = require('graphql-tools')



const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = express();
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
server.listen(4000, () => {
  console.log('GraphQL listening at http://localhost:4000/graphql')
  console.log('GraphiQL listening at http://localhost:4000/graphiql')
});