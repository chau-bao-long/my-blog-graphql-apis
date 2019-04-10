const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  type Query {
    comments(blogId: ID!): [Comment]
    hello: String
  }
  type Mutation {
    comment(blogId: ID!, author: String!, content: String!): Comment
    migrate: Boolean
  }
  type Comment {
    blogId: ID!
    commentId: ID!
    author: String!
    content: String!
  }
  type User {
    id: ID!
    email: String!
  }
`;
