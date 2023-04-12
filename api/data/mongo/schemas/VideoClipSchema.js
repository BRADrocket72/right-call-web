"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var videoSchema = new mongoose_1["default"].Schema({
    videoURL: {
        required: true,
        type: String
    },
    videoName: {
        required: true,
        type: String
    },
    timeStamps: {
        required: true,
        type: Array
    }
});
exports["default"] = mongoose_1["default"].model('VideoClip', videoSchema);
