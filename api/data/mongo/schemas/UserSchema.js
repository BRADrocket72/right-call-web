"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1["default"].Schema({
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
        type: String
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
});
exports["default"] = mongoose_1["default"].model('User', userSchema);
