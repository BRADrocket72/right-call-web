const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoURL: {
        required: true,
        type: String
    },
    timeStamps: {
        required: true,
        type: Array
    },
    lessonName: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('VideoClip', videoSchema)