const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');

//AWS.config.loadFromPath(path.join(__dirname, './config.json'));
// Set the region
AWS.config.update({
  region: 'REGION',
});

// Create S3 service object
const s3 = new AWS.S3({
  apiVersion: 'us-west-1',
});

// call S3 to retrieve upload file to specified bucket
const uploadParams = {
  Bucket: 'namethatcard',
  Key: 'AKIAI2LULRQZGXWUVSRA',
  Body: '',
};

module.exports = {
  uploadToS3(req, res) {
    // file to be uploaded
    const { images } = req.body;
    const file = images; // file
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', (err) => {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;


    uploadParams.Key = path.basename(file);

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('Error', err);
      }
      if (data) {
        console.log('Upload Success', data.Location);
        res.send({ msg: 'upload Success' });
      }
    });
  },

};
