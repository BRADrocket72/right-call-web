import Feedback from "../../data/mongo/Feedback";

const feedbackDb = new Feedback();

  module.exports.feedback_create_feedback =async (req, res)=>  {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await feedbackDb.createFeedback(req.body)
        res.status(200).json(dataToSave.toJSON())
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
module.exports.feedback_get_all = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await feedbackDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.feedback_get_by_videoId =async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await feedbackDb.findAllByVideoId( req.params.videoclipId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.feedback_update= async(req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    const id = req?.params?.id;
    try {

        const result = await feedbackDb.update(id,req.body)

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports.feedback_delete_feedback = async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await feedbackDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}