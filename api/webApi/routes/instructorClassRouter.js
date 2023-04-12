const express = require('express');
// const instructorClassController = require('../controllers/instructorClassController.ts')
const instructorClassController = require('../controllers/instructorClassController')

const router = express.Router()

//Post Method
router.post('/instructorClass/post', instructorClassController.create_instructorClass)

//Get All Method
router.get('/instructorClass/getAll', instructorClassController.get_all)

//Get By Instructor Id method
router.get('/instructorClass/getById/:instructorId', instructorClassController.get_all_by_instructorId)

//Get by classId method
router.get('/instructorClass/getByClassId/:classId', instructorClassController.get_by_classId)

router.put('/instructorClass/updateVideoClips/:classId', instructorClassController.add_video_clip)

//Update Student Ids List Method
router.put('/instructorClass/updateStudentIds/:classId', instructorClassController.update_student_ids)

module.exports = router;