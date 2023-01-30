import mongoose from 'mongoose';
import { UserResultsDto } from '../../model/UserResultsDto';


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
interface IUserResults extends UserResultsDto, mongoose.Document {}

export default  mongoose.model<IUserResults>('UserResults', userResultsSchema)