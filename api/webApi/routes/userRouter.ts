import  express from 'express';
import UserController from '../controllers/userController';
import User from '../../data/mongo/User';

const router = express.Router()

const userController = new UserController(new User());

//Post Method
router.post('/users/post', userController.create_user)

//Get user Method
router.get('/users/getOne/:username', userController.get_by_username)

//Get all Method
router.get('/users/getAll', userController.get_all)

//Delete by ID Method
router.delete('/user/delete/:id', userController.delete_user)

router.post('/users/login', userController.user_login)

//Get user by Id Method
router.get('/users/getById/:id', userController.get_by_id)

module.exports = router;