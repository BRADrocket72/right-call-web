require('dotenv').config();
const multer = require('multer')
const express = require('express');
const VideoClipController = require('../controllers/videoClipController')


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
router.post('/videoClip/post', upload.single("file"), VideoClipController.create_clip)

//Get all Method
router.get('/videoClip/getAll', VideoClipController.get_all)

//Get by ID Method
router.get('/videoClip/getOne/:id', VideoClipController.get_by_id)

//Update by ID Method
router.patch('/videoClip/update/:id', VideoClipController.update_clip)

//Delete by ID Method
router.delete('/videoClip/delete/:id', VideoClipController.delete_clip)

module.exports = router;