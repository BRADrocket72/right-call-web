const Activity = require('../models/Activity');

exports.activities_create_activity = async (req, res) => {
    const data = new Activity({
        timestamp: req.body.timestamp,
        questionType: req.body.questionType,
        questionText: req.body.questionText,
        answers: req.body.answers,
        correctAnswer: req.body.correctAnswer,
        videoclipId: req.body.videoclipId
    })

    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.activities_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await Activity.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.activities_get_by_videoId = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await Activity.find({"videoclipId": req.params.videoclipId});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.activities_update = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Activity.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.activities_delete_activity = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;

        const result = await Activity.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}