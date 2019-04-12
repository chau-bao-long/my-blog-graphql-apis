const AWS = require('aws-sdk');

const config = {
  localConfig: {
    region: 'local',
    endpoint: 'http://172.28.5.0:8000'
  },
  remoteConfig: {
    region: process.env.LAMBDA_AWS_REGION,
  }
};

exports.applyConfig = () => {
  if (process.env.AWS_SAM_LOCAL) {
    AWS.config.update(config.localConfig)
  } else { 
    AWS.config.update(config.remoteConfig);
  }
};
