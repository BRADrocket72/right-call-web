import express from 'express';
import UserResultsController from '../controllers/userResultsController';
import UserResults from '../../data/mongo/UserResults';

const router = express.Router()

const userResultsController = new UserResultsController(new UserResults())

//Post Method
router.post('/userResults/post', userResultsController.create_results)

//Get all Method
router.get('/userResults/getAll', userResultsController.get_all)

router.get('/userResults/getAllHighest/:userName', userResultsController.get_highest_user_results)

//Get by username
router.get('/userResults/get/:username', userResultsController.get_by_username)

module.exports = router;