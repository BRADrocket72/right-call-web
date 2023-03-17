import mongoose from 'mongoose';
import { FeedbackDto } from '../../model/FeedbackDto';

const feedbackSchema = new mongoose.Schema({
    videoclipId: {
        required: true,
        type: String
    },
    activityId: {
        required: true,
        type: String
    },
    timestamp: {
        required: true,
        type: Number
    },
    correctFeedback: {
        required: true,
        type: String
    },
    incorrectFeedback: {
        required: true,
        type: String
    }
})
interface IFeedbackModel extends FeedbackDto, mongoose.Document { }

export default  mongoose.model<IFeedbackModel>('Feedback', feedbackSchema)
