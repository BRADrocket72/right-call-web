const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    // descriptions of the lessons 
    timestamp: {
        required: true,
        type: Number
    },
    questionText: {
        required: true,
        type: String
    },
    answers: {
        required: true,
        type: Array
    },
    videoclipId: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Activity', activitySchema)