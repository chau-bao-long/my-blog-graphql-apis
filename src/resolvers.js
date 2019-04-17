module.exports = {
  Query: {
    viewCount: async(_, { blogId }, { dataSources }) => {
      return dataSources.viewDS.viewCount(blogId);
    },
    comments: async (_, { blogId }, { dataSources }) => {
      return dataSources.commentDS.getCommentsOfBlog(blogId);
    },
    socialInfos: async (_, __, { dataSources }) => {
      let acc = {};
      await dataSources.commentDS.countCommentsPerBlog(acc);
      await dataSources.viewDS.countViewsPerBlog(acc);
      return Object.keys(acc).reduce((a, key) => [...a, { ...acc[key], blogId: key }] , []);
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
