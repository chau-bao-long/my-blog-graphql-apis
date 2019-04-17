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

  async getAllViews() {
    return await this.dynamo.scan({
      TableName: this.tableName,
    }).promise();
  }

  async countViewsPerBlog(acc) {
    const views = (await this.getAllViews()).Items;
    views.forEach(v => {
      if (!acc[v.blogId]) acc[v.blogId] = {};
      if (acc[v.blogId].viewCount) {
        acc[v.blogId].viewCount++;
      } else {
        acc[v.blogId].viewCount = 1;
      }
    });
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
