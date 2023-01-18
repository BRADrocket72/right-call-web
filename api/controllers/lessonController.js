const Lessons = require('../models/Lessons');


exports.lessons_create_lesson = async (req, res) => {
    const data = new Lessons({
        name: req.body.name,
        description: req.body.description,
        videoClipsArray: req.body.videoClipsArray
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

exports.lessons_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await Lessons.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}