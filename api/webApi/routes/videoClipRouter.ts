require('dotenv').config();
const multer = require('multer')
const express = require('express');
const { default: VideoClipController } = require('../controllers/videoClipController');
const { default: AmazonS3Service } = require('../services/Storage/AmazonS3Service');
const { default: VideoClip } = require('../../data/mongo/VideoClip');
// const VideoClipController = require('../controllers/videoClipController')

const videoClipController = new VideoClipController(new AmazonS3Service(), new VideoClip());

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
router.post('/videoClip/post', upload.single("file"), videoClipController.create_clip)

//InstructorVideo Post Method
router.post('/videoClip/postInstructorVideo', videoClipController.create_instructor_clip)

//Get all Method
router.get('/videoClip/getAll', videoClipController.get_all)

//Get by ID Method
router.get('/videoClip/getOne/:id', videoClipController.get_by_id)

//Update by ID Method
router.put('/videoClip/update/:id', videoClipController.update_clip)

//Delete by ID Method
router.delete('/videoClip/delete/:id', videoClipController.delete_clip)

module.exports = router;