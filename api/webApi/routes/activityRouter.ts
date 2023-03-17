import express from'express';
import ActivityController from '../controllers/activityController'
import Activity from '../../data/mongo/Activity'

const router = express.Router()

const activitiesController = new ActivityController(new Activity())

//Post Method
router.post('/activity/post', activitiesController.activities_create_activity)

//Get all Method
router.get('/activity/getAll', activitiesController.activities_get_all)

//Get by VideoClip Method
router.get('/activity/get/:videoclipId', activitiesController.activities_get_by_videoId)

//Update by ID Method
router.put('/activity/update/:id', activitiesController.activities_update)

router.delete('/activity/delete/:id', activitiesController.activities_delete_activity)
module.exports = router;