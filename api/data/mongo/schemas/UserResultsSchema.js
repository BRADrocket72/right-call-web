"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userResultsSchema = new mongoose_1["default"].Schema({
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
    }
});
exports["default"] = mongoose_1["default"].model('UserResults', userResultsSchema);
