import mongoose from 'mongoose';



const lessonSchema = new mongoose.Schema({
    // name of the lesson
    name: {
        required: true,
        type: String,
    },
    // descriptions of the lessons 
    description: {
        required: true,
        type: String
    },
    // array of the video clips
    videoClipsArray: {
        required: true,
        type: Array
    }
})

module.exports =  mongoose.model('Lessons', lessonSchema)