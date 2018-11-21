const s3 = require('./s3.config.js');

module.exports = {
  uploadToS3(req, res) {
    const {
      s3Client,
    } = s3;
    const params = s3.uploadParams;
    const {
      name,
    } = req.files.file;
    const {
      data,
    } = req.files.file;

    console.log('req.files', req.files.file.name);
    console.log('params', params);

    params.Key = name;
    params.Body = data;

    s3Client.upload(params, (err, data) => {
      if (err) {
        res.status(500).json({
          error: `Error -> ${err}`,
        });
      }
      console.log('Data', data);
      res.json({
        message: `File uploaded successfully! -> keyname = ${name}`,
      });
    });
  },
  unzipfile(req, res) {
    // console.log('files', req.files.upload.mv);

    // const readStream = fs.createReadStream('');
    // const writeStream = fstream.Writer('./unzipped');

    // readStream
    //   .pipe(unzip.Parse())
    //   .pipe(writeStream);
  },

  copyToServer(req, res) {},

};
