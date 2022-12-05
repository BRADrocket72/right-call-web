const express = require('express');
const Lessons = require('../models/Lessons');

const router = express.Router()

//Post Method
router.post('/lessons/post', async (req, res) => {
    const data = new Lessons({
        name: req.body.name,
        description: req.body.description,
        videoClipsArray: req.body.videoClipsArray
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
router.get('/lessons/getAll', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await Lessons.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;