const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const { blogTableInfo } = require('../models/blog');

class BlogAPI {
  constructor() {
    this.dynamo = new AWS.DynamoDB.DocumentClient();
    this.database = new AWS.DynamoDB();
    this.tableName = 'blogs';
  }

  async getCommentsOfBlog(blogId) {
    try {
      const data = await this.dynamo.scan({
        TableName: this.tableName,
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

  async migrate() {
    try {
      await this.database.createTable(blogTableInfo).promise();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = BlogAPI;
