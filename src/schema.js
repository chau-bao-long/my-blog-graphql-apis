const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  type Query {
    hello: String
  }
`;
