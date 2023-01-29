import mongoose from 'mongoose';
import { ActivityDto } from '../../model/ActivityDto';

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
interface IActivityModel extends ActivityDto, mongoose.Document { }

export default  mongoose.model<IActivityModel>('Activity', activitySchema)
