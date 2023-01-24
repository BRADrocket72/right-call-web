const UserResults = require('../../data/mongo/schemas/UserResultsSchema.ts');

exports.create_results = async (req, res) => {
    const data = new UserResults({
        username: req.body.username,
        score: req.body.score,
        lessonId: req.body.lessonId,
        lessonName: req.body.lessonName
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

exports.get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await UserResults.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_by_username = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await UserResults.find({ "username": req.params.username });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}