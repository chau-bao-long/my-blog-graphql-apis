const uuid = require('uuid/v1');
const { BaseDatasource } = require('./base');

class CommentDS extends BaseDatasource {
  constructor() {
    super();
    this.tableName = 'blog-comments';
  }

  async getCommentsOfBlog(blogId) {
    try {
      const data = await this.dynamo.query({
        TableName: this.tableName,
        KeyConditionExpression: 'blogId = :bid',
        ExpressionAttributeValues: {
          ':bid': blogId,
        },
      }).promise();
      return data.Items;
    } catch (error) {
      return [];
    }
  }

  async comment(blogId, author, content) {
    try {
      const commentId = uuid();
      await this.dynamo.put({
        TableName: this.tableName,
        Item: { blogId, commentId, author, content },
      }).promise();
      return { blogId, commentId, author, content };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CommentDS;
