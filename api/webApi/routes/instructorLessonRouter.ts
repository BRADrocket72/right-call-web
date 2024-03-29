import express  from 'express';
import InstructorLessonController from '../controllers/instructorLessonController';
import InstructorLesson from '../../data/mongo/InstructorLesson';
const router = express.Router()

const instructorLessonController = new InstructorLessonController(new InstructorLesson())

//Post Method
router.post('/instructorLessons/post', instructorLessonController.instructor_lessons_create_lesson)

//Get all Method
router.get('/instructorLessons/getAll', instructorLessonController.instructor_lessons_get_all)

//Get all By instructor Id Method
router.get('/instructorLessons/getById/:instructorId', instructorLessonController.instructor_lessons_get_by_id)

// Get lesson by id
router.get('/instructorLessons/getLessonById/:id', instructorLessonController.get_lesson_by_id)


router.put('/instructorLessons/updateLessonName/:id', instructorLessonController.update_instructor_lesson_name)

module.exports = router;