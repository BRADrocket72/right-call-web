const express = require('express');
const UserResultsController = require('../controllers/userResultsController.js');

const router = express.Router()

//Post Method
router.post('/userResults/post', UserResultsController.create_results)

//Get all Method
router.get('/userResults/getAll', UserResultsController.get_all)

//Get by username
router.get('/userResults/get/:username', UserResultsController.get_by_username)

module.exports = router;