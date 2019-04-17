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

  async getAllComments() {
    return await this.dynamo.scan({
      TableName: this.tableName,
    }).promise();
  }

  async countCommentsPerBlog(acc) {
    const comments = (await this.getAllComments()).Items; 
    comments.forEach(c => {
      if (!acc[c.blogId]) acc[c.blogId] = {};
      if (acc[c.blogId].commentCount) {
        acc[c.blogId].commentCount++;
      } else {
        acc[c.blogId].commentCount = 1;
      }
    });
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
