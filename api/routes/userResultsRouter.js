const express = require('express');
const UserResults = require('../models/UserResults');

const router = express.Router()

//Post Method
router.post('/userResults/post', async (req, res) => {
    const data = new UserResults({
        username: req.body.username,
        score: req.body.score,
        lessonId: req.body.lessonId,
        lessonName: req.body.lessonName
    })

    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/userResults/getAll', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await UserResults.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by username
router.get('/userResults/get/:username', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await UserResults.find({"username": req.params.username});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;