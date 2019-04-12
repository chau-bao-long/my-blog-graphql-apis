const AWS = require('aws-sdk');
const { commentTableInfo } = require('../models/comment');
const { viewTableInfo } = require('../models/view');

class BaseDatasource {
  constructor() {
    this.dynamo = new AWS.DynamoDB.DocumentClient();
    this.database = new AWS.DynamoDB();
  }

  async migrate() {
    try {
      await this.database.createTable(commentTableInfo).promise();
      await this.database.createTable(viewTableInfo).promise();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

exports.BaseDatasource = BaseDatasource;
