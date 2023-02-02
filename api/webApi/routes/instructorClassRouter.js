const express = require('express');
// const instructorClassController = require('../controllers/instructorClassController.ts')
const instructorClassController = require('../controllers/instructorClassController.ts')

const router = express.Router()

//Post Method
router.post('/instructorClass/post', instructorClassController.create_instructorClass)

//Get All Method
router.get('/instructorClass/getAll', instructorClassController.get_all)

//Get By Instructor Id method
router.get('/instructorClass/getById/:instructorId', instructorClassController.get_all_by_instructorId)


module.exports = router;