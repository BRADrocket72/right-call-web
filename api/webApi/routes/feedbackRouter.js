const express = require('express');
const feedbackController = require('../controllers/feedbackController.ts')

const router = express.Router()

//Post Method
router.post('/feedback/post', feedbackController.feedback_create_feedback)

//Get all Method
router.get('/feedback/getAll', feedbackController.feedback_get_all)

//Get by VideoClip Method
router.get('/feedback/get/:videoclipId', feedbackController.feedback_get_by_videoId)

//Update by ID Method
router.put('/feedback/update/:id', feedbackController.feedback_update)

router.delete('/feedback/delete/:id', feedbackController.feedback_delete_feedback)
module.exports = router;