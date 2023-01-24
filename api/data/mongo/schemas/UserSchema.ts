const mongoose = require( "mongoose")


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

export default  mongoose.model('User', userSchema)