const mongoose = require('mongoose');

const userResultsSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String
    },
    score: {
        required: true,
        type: String
    },
    lessonId: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('UserResults', userResultsSchema)