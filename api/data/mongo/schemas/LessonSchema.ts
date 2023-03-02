import mongoose from 'mongoose';
import { LessonDto } from '../../model/LessonDto'


const lessonSchema = new mongoose.Schema({
    // name of the lesson
    name: {
        required: true,
        type: String,
    },
    // admin or instructor
    userType : {
        required: true,
        type: String
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

interface ILesson extends LessonDto, mongoose.Document { }

export default  mongoose.model<ILesson>('Lesson', lessonSchema)