const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router()

//Post Method
router.post('/activity/post', async (req, res) => {
    const data = new Activity({
        timestamp: req.body.timestamp,
        questionText: req.body.questionText,
        answers: req.body.answers,
        correctAnswer: req.body.correctAnswer,
        videoclipId: req.body.videoclipId
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
router.get('/activity/getAll', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await Activity.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by VideoClip Method
router.get('/activity/get/:videoclipId', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await Activity.find({"videoclipId": req.params.videoclipId});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/activity/update/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Activity.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/activity/delete/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;

        const result = await Activity.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;