const express = require('express')
var { buildSchema } = require('graphql');
const cors = require('cors');
var graphqlHTTP = require('express-graphql');
var {google} = require('googleapis');
var utube =  require('./authorize');


var schema = buildSchema(`
  type Query {
    search(search_query: String!): [Video]
  }
  type Video { id:String, title: String, channel: String, thumb_url:String, description:String }
`);
var root = {
    search: function ({search_query}) {
        return new Promise((resolve, reject) => {
            var search_cb = function (auth) {
                var service = google.youtube('v3');
                service.search.list({
                    auth: auth,
                    part: 'id,snippet',
                    q: search_query
                },function(err, response) {
                    if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                    }
                    var result = response.data.items;
                    if (result.length == 0) {
                        console.log('Not found.');
                        return;
                    } else {
                        var return_data = [];
                        for (var i=0; i<result.length; i++) {
                            console.log(result[i].id.kind);
                            if (result[i].id.kind=="youtube#video"){
                                return_data.push({
                                    "id":result[i].id.videoId,
                                    "title":result[i].snippet.title,
                                    "channel":result[i].snippet.channelTitle,
                                    "thumb_url":result[i].snippet.thumbnails,
                                    "description":result[i].snippet.description
                                })
                            }
                        }
                        console.log(return_data);
                        resolve(return_data)
                    }
                });
            };
            utube.getAuth(search_cb);
        });
        // utube.getAuth(search_cb)
    }
};

const server = express();
server.use(cors());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
server.listen(4000, () => {
  console.log('GraphQL listening at http://localhost:4000/graphql')
  console.log('GraphiQL listening at http://localhost:4000/graphiql')
});



