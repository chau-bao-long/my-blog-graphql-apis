exports.commentTableInfo = {
  AttributeDefinitions: [
    {
      AttributeName: "id", 
      AttributeType: "S"
    }, 
  ], 
  KeySchema: [
    {
      AttributeName: "id", 
      KeyType: "HASH"
    }, 
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, 
    WriteCapacityUnits: 5,
  }, 
  TableName: process.env.TABLE_NAME,
};
