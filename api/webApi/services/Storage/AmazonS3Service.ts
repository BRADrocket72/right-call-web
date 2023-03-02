require('dotenv').config();
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
const uuid = require('uuid').v4

class AmazonS3Service {
    s3Upload = async (file) => {
    const s3Client = new S3Client({})
    const resourceName = `uploads/${uuid()}-${file.originalname}`
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: resourceName,
        Body: file.buffer,
    }

    await s3Client.send(new PutObjectCommand(param));
    return 'https://right-call-videos.s3.us-east-2.amazonaws.com/' + resourceName
}
}
export default AmazonS3Service