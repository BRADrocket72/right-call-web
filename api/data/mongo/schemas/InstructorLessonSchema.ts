import mongoose from 'mongoose';
import { InstructorLessonDto } from '../../model/InstructorLessonDto'


const instructorLessonSchema = new mongoose.Schema({
    // name of the lesson
    name: {
        required: true,
        type: String,
    },
    //id of the instructor
    instructorId : {
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

interface IInstructorLesson extends InstructorLessonDto, mongoose.Document { }

export default  mongoose.model<IInstructorLesson>('InstructorLesson', instructorLessonSchema)