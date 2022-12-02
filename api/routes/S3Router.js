const express = require('express');
const AmazonS3Service = require('../services/Storage/AmazonS3Service');

const router = express.Router()

//Post Method
router.post('/blob/upload', async (req, res) => {
})


module.exports = router;