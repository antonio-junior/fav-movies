import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'favmovies',
  region: 'sa-east-1',
  accessKeyId: 'AKIAVXIVO6TC245AXB6X',
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
};

export default AWS;
