// Load the SDK for JavaScript
const AWS = require('aws-sdk');


AWS.config.loadFromPath('./config.json');
// Set the region
AWS.config.update({
  region: 'us-west-2',
});


// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Create the parameters for calling createBucket
const bucketParams = {
  Bucket: 'elasticbeanstalk-us-west-2-295078398723',
};
// Call S3 to create the bucket
s3.listObjects(bucketParams, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
