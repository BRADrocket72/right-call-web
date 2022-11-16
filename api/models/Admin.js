const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    }
})

module.exports = mongoose.model('Admin', adminSchema)