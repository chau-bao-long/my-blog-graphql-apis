exports.commentTableInfo = {
  AttributeDefinitions: [
    {
      AttributeName: "blogId", 
      AttributeType: "S",
    }, 
    {
      AttributeName: "commentId", 
      AttributeType: "S",
    }, 
  ], 
  KeySchema: [
    {
      AttributeName: "blogId", 
      KeyType: "HASH",
    }, 
    {
      AttributeName: "commentId", 
      KeyType: "RANGE",
    }, 
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5,
  }, 
  TableName: 'blog-comments',
};
