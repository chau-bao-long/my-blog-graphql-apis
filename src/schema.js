const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  type Query {
    comments(blogId: ID!): [Comment]
    hello: String
  }
  type Mutation {
    comment(author: String!, content: String!, blogId: ID!): HttpResponse
    migrate: Boolean
  }
  type Comment {
    id: ID!
    author: String!
    content: String!
    blogId: ID!
  }
  type User {
    id: ID!
    email: String!
  }
  type HttpResponse {
    statusCode: Int!
    body: String
  }
`;
