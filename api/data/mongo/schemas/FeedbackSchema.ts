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
    correctFeedback: {
        required: true,
        type: String
    },
    incorrectFeedback: {
        required: true,
        type: Array
    }
})
interface IFeedbackModel extends FeedbackDto, mongoose.Document { }

export default  mongoose.model<IFeedbackModel>('Feedback', feedbackSchema)
