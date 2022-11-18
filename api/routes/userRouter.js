const express = require('express');
const User = require('../models/User');

const router = express.Router()

//Post Method
router.post('/users/post', async (req, res) => {
    const data = new User({
        userName: req.body.userName,
        password: req.body.password,
        userType: req.body.userType
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/users/getAll', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;