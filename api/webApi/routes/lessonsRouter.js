const express = require('express');

const router = express.Router()
const lessonController = require('../controllers/lessonController')

//Post Method
router.post('/lessons/post', lessonController.lessons_create_lesson)

//Get all Method
router.get('/lessons/getAll', lessonController.lessons_get_all)

//Delete method
router.delete('/lessons/delete/:id', lessonController.lessons_delete_lesson)

module.exports = router;