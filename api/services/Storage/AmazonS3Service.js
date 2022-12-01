require('dotenv').config();
const AWS3 = require('@aws-sdk/client-s3');
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3Instance = new AWS3.S3Client({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey })

const upload = multer({
    storage: multerS3({
        s3: s3Instance,
        bucket: process.env.AMAZON_S3_VIDEO_BUCKET,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
})

module.exports = upload