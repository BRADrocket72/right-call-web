const express = require('express');
const instructoClassController = require('../controllers/instructoClassController.ts')

const router = express.Router()

//Post Method
router.post('/instructorClass/post', instructoClassController.create_instructorClass)

module.exports = router;