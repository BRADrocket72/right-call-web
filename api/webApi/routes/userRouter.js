const express = require('express');
const router = express.Router()

const UserController = require('../controllers/userController.js')
//Post Method
router.post('/users/post', UserController.create_user)

//Get user Method
router.get('/users/get/:username', UserController.get_by_username)

//Get all Method
router.get('/users/getAll', UserController.get_all)

//Delete by ID Method
router.delete('/user/delete/:id', UserController.delete_user)

router.post('/users/login', UserController.user_login)

module.exports = router;