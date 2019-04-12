exports.viewTableInfo = {
  AttributeDefinitions: [
    {
      AttributeName: "blogId", 
      AttributeType: "S",
    }, 
    {
      AttributeName: "viewAt", 
      AttributeType: "S",
    }, 
  ], 
  KeySchema: [
    {
      AttributeName: "blogId", 
      KeyType: "HASH",
    }, 
    {
      AttributeName: "viewAt", 
      KeyType: "RANGE",
    }, 
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5,
  }, 
  TableName: 'blog-views',
};
