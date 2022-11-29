const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

class AmazonS3Service {
    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AMAZON_S3_ACCESS_KEY,
            secretAccessKey: process.env.AMAZON_S3_SECRET_ACCESS_KEY
        });
        this.s3 = new AWS.S3();
    }

    uploadBLOBToStorage(bucketName, fileObject, videoName) {
        
        const fileStream = fs.createReadStream(fileObject);
        var params = {
            Bucket: bucketName,
            Body: fileStream,
            Key: Date.now() + "_" + videoName
        };

        this.s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log("Error", err);
            }
            //success
            if (data) {
                console.log("Uploaded in:", data.Location);
                return data.Location;
            }
        });
    }

}
module.exports = AmazonS3Service;


