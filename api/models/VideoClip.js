const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoURL: {
        required: true,
        type: String
    },
    videoName: {
        required: true,
        type: String
    },
    timeStamps: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('VideoClip', videoSchema)