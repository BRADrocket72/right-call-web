import express from 'express';
import FeedbackController from '../controllers/feedbackController';
import Feedback from '../../data/mongo/Feedback';

const  router = express.Router()

const feedbackController = new FeedbackController(new Feedback())
//Post Method
router.post('/feedback/post', feedbackController.feedback_create_feedback)
//Get all Method
router.get('/feedback/getAll', feedbackController.feedback_get_all)
//Get by VideoClip Method
router.get('/feedback/get/:videoclipId', feedbackController.feedback_get_by_videoId)
//Get by ActivityId Method
router.get('/feedback/getByActivity/:activityId', feedbackController.feedback_get_by_activityId)
//Update by ID Method
router.put('/feedback/update/:id', feedbackController.feedback_update)
router.delete('/feedback/delete/:id', feedbackController.feedback_delete_feedback)
module.exports = router;