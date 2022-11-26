const express = require('express');
const { AmazonS3Service } = require('../services/Storage/AmazonS3Service');

const router = express.Router()

//Post Method
router.post('/blob/upload', async (req, res) => {

    try {
        res.header('Access-Control-Allow-Origin', '*')
        console.log('in upload')
        var aws = new AmazonS3Service();
        var uploadURL = aws.uploadBLOBToStorage('right-call-videos', req.body, 'sampleVid')
        res.status(200)
        console.log('uploaded' + uploadURL)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;