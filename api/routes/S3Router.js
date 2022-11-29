const express = require('express');
const AmazonS3Service = require('../services/Storage/AmazonS3Service');

const router = express.Router()

//Post Method
router.post('/blob/upload', async (req, res) => {

    try {
        res.header('Access-Control-Allow-Origin', '*')
        const aws = new AmazonS3Service()
        var data;
        req.on('data', function (chunk) {
            data += chunk;
        });

        req.on('end', function () {
            console.log(data);
        });

        var responseJson = {
            "message": "success!!!"
        };

        return res.status(200).send(responseJson);





        console.log(req.files)
        var uploadURL = aws.uploadBLOBToStorage('right-call-videos', req.body.file, 'sampleVid')
        res.status(200)
        console.log('uploaded' + uploadURL)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;