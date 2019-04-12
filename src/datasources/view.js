const { BaseDatasource } = require('./base');

class ViewDS extends BaseDatasource {
  constructor() {
    super();
    this.tableName = 'blog-views';
  }

  async viewCount(blogId) {
    try {
      const data = await this.dynamo.query({
        TableName: this.tableName,
        KeyConditionExpression: 'blogId = :bid',
        ExpressionAttributeValues: {
          ':bid': blogId,
        },
      }).promise();
      return data.Items.length;
    } catch (error) {
      return [];
    }
  }

  async view(blogId, userAgent, viewAt) {
    try {
      await this.dynamo.put({
        TableName: this.tableName,
        Item: { blogId, userAgent, viewAt },
      }).promise();
      return { blogId, userAgent, viewAt };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ViewDS;
