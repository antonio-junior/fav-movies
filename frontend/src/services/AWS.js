import S3FileUpload from 'react-s3';

const config = {
  bucketName: process.env.AWS_BUCKET_NAME,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

const AWS = {
  addFile(file) {
    return new Promise((resolve, reject) => {
      const request = S3FileUpload.uploadFile(file, config);

      request.then(
        response => {
          if (!response || response.Errors) {
            reject(new Error(response.Errors));
          } else {
            resolve(response);
          }
        },
        error => {
          reject(new Error(error.statusText));
        },
      );
    });
  },

  deleteFile(files) {
    return new Promise((resolve, reject) => {
      // files.map(file => {

      // })
      const request = S3FileUpload.deleteFile(files, config);

      request.then(
        response => {
          if (!response || response.Errors) {
            reject(new Error(response.Errors));
          } else {
            resolve(response);
          }
        },
        error => {
          reject(new Error(error.statusText));
        },
      );
    });
  },
};

export default AWS;
