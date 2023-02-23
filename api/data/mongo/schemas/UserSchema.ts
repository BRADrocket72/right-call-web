import mongoose from 'mongoose';
import { UserDto } from '../../model/UserDto';

const userSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    },
    // a user is either an trainee, instructor, or admin
    userType: {
        required: true,
        type: String
    },
    salt: {
        required: true,
        type: String
    }
})

export interface IUserDoc extends UserDto,mongoose.Document {}

export default   mongoose.model<IUserDoc>('User', userSchema)