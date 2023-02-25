const express = require('express');

const router = express.Router()
const instructorLessonController = require('../controllers/instructorLessonController')

//Post Method
router.post('/instructorLessons/post', instructorLessonController.instructor_lessons_create_lesson)

//Get all Method
router.get('/instructorLessons/getAll', instructorLessonController.instructor_lessons_get_all)

//Get all By Id Method
router.get('/instructorLessons/getById/:instructorId', instructorLessonController.instructor_lessons_get_by_id)

module.exports = router;