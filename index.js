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

exports.graphqlHandler = server.createHandler();
