import express  from'express';
import LessonController from '../controllers/lessonController';
import Lesson from '../../data/mongo/Lesson';
const router = express.Router()

const lessonController = new LessonController(new Lesson());

//Post Method
router.post('/lessons/post', lessonController.lessons_create_lesson)

//Get all Method
router.get('/lessons/getAll', lessonController.lessons_get_all)

//Delete method
router.delete('/lessons/delete/:id', lessonController.lessons_delete_lesson)

//Update Lesson Name method
router.put('/lessons/update/:id', lessonController.update_lesson_name)

//Update VideoClipsArray method
router.put('/lessons/updateVideoClipsArray/:id', lessonController.update_video_clips_array)

//Get Lesson By Id method
router.get('/lessons/getAdminLessonById/:id', lessonController.get_admin_lesson_by_id)


module.exports = router;