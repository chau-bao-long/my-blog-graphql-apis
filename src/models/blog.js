exports.blogTableInfo = {
  AttributeDefinitions: [
    {
      AttributeName: "blogId", 
      AttributeType: "S",
    }, 
  ], 
  KeySchema: [
    {
      AttributeName: "blogId", 
      KeyType: "HASH",
    }, 
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5,
  }, 
  TableName: 'blogs',
};
