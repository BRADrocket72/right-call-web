require('dotenv').config();
const multer = require('multer')
const express = require('express');
const VideoClip = require('../models/VideoClip');
const { s3Upload } = require('../services/Storage/AmazonS3Service');
const { memoryStorage } = require('multer');

const router = express.Router()

const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "video") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};
const upload = multer({ storage: storage, fileFilter })

//Post Method
router.post('/videoClip/post', upload.single("file"), async (req, res) => {
    try {
        const fileUploadURL = await s3Upload(req.file)
        const data = new VideoClip({
            videoURL: fileUploadURL,
            videoName: req.body.videoName
        })
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.header('Content-Type', 'multipart/form-data')
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