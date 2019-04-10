module.exports = {
  Query: {
    comments: async (_, { blogId }, { dataSources }) => {
      return dataSources.blogAPI.getCommentsOfBlog(blogId);
    },
    hello: () => 'Hello world!',
  },
  Mutation: {
    comment: async (_, { blogId, author, content }, { dataSources }) =>
      dataSources.blogAPI.comment(blogId, author, content),
    migrate: async (_, __, { dataSources }) => dataSources.blogAPI.migrate(),
  },
}
