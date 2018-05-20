const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress,graphiqlExpress } = require('apollo-server-express')
// const { schema } = require('./schema')
var { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors');
var graphqlHTTP = require('express-graphql');
const utube = require('./quickstart');

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
var schema = buildSchema(`
  type Query {
    search(search_query: String!): [Video]
  }
  type Video { id:String, title: String, channel: String, thumb_url:String, description:String }
`);
var root = {
    search: function ({search_query}) {
        var response = utube.search(search_query);
        return response;
    }
};
//
// // The resolvers
// const resolvers = {
//   Query: { books: () => books },
// };
//
// // Put together a schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

const server = express();
server.use(cors());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
server.listen(4000, () => {
  console.log('GraphQL listening at http://localhost:4000/graphql')
  console.log('GraphiQL listening at http://localhost:4000/graphiql')
});



