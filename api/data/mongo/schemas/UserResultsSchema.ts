import mongoose from 'mongoose';
import { UserResultsDto } from '../../model/UserResultsDto';


const userResultsSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String
    },
    score: {
        required: true,
        type: Number
    },
    quizId: {
        required: true,
        type: String
    },
    quizName: {
        required: true,
        type: String
    },
    questionTimes: {
        reuired: true,
        type: Array
    }
})
interface IUserResults extends UserResultsDto, mongoose.Document {}

export default  mongoose.model<IUserResults>('UserResults', userResultsSchema)