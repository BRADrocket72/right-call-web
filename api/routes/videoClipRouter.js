require('dotenv').config();
const express = require('express');
const VideoClip = require('../models/VideoClip');
const upload = require('../services/Storage/AmazonS3Service')

const router = express.Router()

//Post Method
router.post('/videoClip/post', upload.single('video'), async (req, res) => {

    try {
        const data = new VideoClip({
            videoURL: req.file.location,
            timeStamps: req.body.timeStamps
        })
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.header('Access-Control-Allow-Origin', '*')
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/videoClip/getAll', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await VideoClip.find();
        res.header('Access-Control-Allow-Origin', '*')
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/videoClip/getOne/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await VideoClip.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/videoClip/update/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await VideoClip.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/videoClip/delete/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const data = await VideoClip.findByIdAndDelete(id)
        res.send(`Document with ${data.videoURL} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;