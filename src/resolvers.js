module.exports = {
  Query: {
    viewCount: async(_, { blogId }, { dataSources }) => {
      return dataSources.viewDS.viewCount(blogId);
    },
    comments: async (_, { blogId }, { dataSources }) => {
      return dataSources.commentDS.getCommentsOfBlog(blogId);
    },
    hello: () => 'Hello world!',
  },
  Mutation: {
    view: async (_, { blogId, userAgent, viewAt }, { dataSources: { viewDS } }) => {
      return viewDS.view(blogId, userAgent, viewAt);
    },
    comment: async (_, { blogId, author, content }, { dataSources }) =>
      dataSources.commentDS.comment(blogId, author, content),
    migrate: async (_, __, { dataSources }) => dataSources.commentDS.migrate(),
  },
}
