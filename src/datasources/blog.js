const AWS = require('aws-sdk');
const { commentTableInfo } = require('../models/comment');

class BlogAPI {
  constructor() {
    this.dynamo = new AWS.DynamoDB.DocumentClient();
    this.database = new AWS.DynamoDB();
    this.tableName = process.env.TABLE_NAME;
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

  async comment(author, content, blogId) {
    try {
      const data = await this.dynamo.put({
        TableName: this.tableName,
        Item: { author, content, blogId },
      }).promise();
      return this._response(200, JSON.stringify(data));
    } catch (error) {
      return this._response(500, error);
    }
  }

  async migrate() {
    try {
      await this.database.createTable(commentTableInfo).promise();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  _response(statusCode, body) {
    return {
      statusCode,
      body,
    }
  };
}

module.exports = BlogAPI;
