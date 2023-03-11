import mongoose from 'mongoose';
import { InstructorClassDto } from '../../model/InstructorClassDto';


const instructorClassSchema = new mongoose.Schema({
    instructorId: {
        required: true,
        type: String
    },
    className: {
        required: true,
        type: String
    },
    lessonIds: {
        required: true,
        type: Array
    },
    studentIds: {
        required: true,
        type: Array
    }
})

interface IInstructorClass extends InstructorClassDto, mongoose.Document { }

export default  mongoose.model<IInstructorClass>('InstructorClass', instructorClassSchema)
