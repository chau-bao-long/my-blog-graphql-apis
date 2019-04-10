module.exports = {
  Query: {
    comments: async (_, { blogId }, { dataSources }) => {
      return dataSources.blogAPI.getCommentsOfBlog(blogId);
    },
    hello: () => 'Hello world!',
  },
  Mutation: {
    comment: async (_, { author, content, blogId }, { dataSources }) =>
      dataSources.blogAPI.comment(author, content, blogId),
    migrate: async (_, __, { dataSources }) => dataSources.blogAPI.migrate(),
  },
}
