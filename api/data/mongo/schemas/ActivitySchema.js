"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var activitySchema = new mongoose_1["default"].Schema({
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
});
exports["default"] = mongoose_1["default"].model('Activity', activitySchema);
