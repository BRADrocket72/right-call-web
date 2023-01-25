const express = require('express');
const activitiesController = require('../controllers/activityController.ts')

const router = express.Router()

//Post Method
router.post('/activity/post', activitiesController.activities_create_activity)

//Get all Method
router.get('/activity/getAll', activitiesController.activities_get_all)

//Get by VideoClip Method
router.get('/activity/get/:videoclipId', activitiesController.activities_get_by_videoId)

//Update by ID Method
router.patch('/activity/update/:id', activitiesController.activities_update)

router.delete('/activity/delete/:id', activitiesController.activities_delete_activity)
module.exports = router;