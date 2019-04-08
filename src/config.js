const AWS = require('aws-sdk');

const config = {
  localConfig: {
    region: 'local',
    endpoint: 'http://localhost:48000'
  },
  remoteConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  }
};

exports.applyConfig = () => {
  if (process.env.AWS_SAM_LOCAL) {
    AWS.config.update(config.localConfig)
  } else { 
    AWS.config.update(config.remoteConfig);
  }
};
