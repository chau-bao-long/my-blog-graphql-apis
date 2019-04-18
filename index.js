const { ApolloServer } = require('apollo-server-lambda');

const { applyConfig } = require('./src/config');
applyConfig();

const { typeDefs } = require('./src/schema');
const resolvers = require('./src/resolvers');
const CommentDS = require('./src/datasources/comment');
const ViewDS = require('./src/datasources/view');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    commentDS: new CommentDS(),
    viewDS: new ViewDS(),
  }),
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

exports.options = function(event, context, callback) {
  var response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type, X-Experience-API-Version,Authorization',
    },
    body: JSON.stringify(event)
  };
  context.succeed(response);
};
