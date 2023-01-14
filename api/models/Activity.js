const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    timestamp: {
        required: true,
        type: Number
    },
    questionType: {
        required: true,
        type: String
    },
    questionText: {
        required: true,
        type: String
    },
    answers: {
        required: true,
        type: Array
    },
    correctAnswer: {
        required: true,
        type: String
    },
    videoclipId: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Activity', activitySchema)