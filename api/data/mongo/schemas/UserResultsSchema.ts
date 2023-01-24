const mongoose = require( "mongoose")

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
    },
    lessonName: {
        required: true,
        type: String
    }
})

export default  mongoose.model('UserResults', userResultsSchema)