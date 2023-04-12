"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var lessonSchema = new mongoose_1["default"].Schema({
    // name of the lesson
    name: {
        required: true,
        type: String
    },
    // admin or instructor
    userType: {
        required: true,
        type: String
    },
    // descriptions of the lessons 
    description: {
        required: true,
        type: String
    },
    // array of the video clips
    videoClipsArray: {
        required: true,
        type: Array
    }
});
exports["default"] = mongoose_1["default"].model('Lesson', lessonSchema);
