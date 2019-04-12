const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  type Query {
    viewCount(blogId: ID!): Int
    comments(blogId: ID!): [Comment]
    hello: String
  }
  type Mutation {
    view(blogId: ID!, userAgent: String!, viewAt: String!): View
    comment(blogId: ID!, author: String!, content: String!): Comment
    migrate: Boolean
  }
  type Comment {
    blogId: ID!
    commentId: ID!
    author: String!
    content: String!
  }
  type View {
    blogId: ID!
    userAgent: String!
    viewAt: String!
  }
  type User {
    id: ID!
    email: String!
  }
`;
