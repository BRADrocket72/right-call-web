import { FeedbackDb } from "../../data/db/FeedbackDb";
import Feedback from "../../data/mongo/Feedback";

class FeedbackController {
    private feedbackDb: FeedbackDb = new Feedback();

    constructor(feedbackDb:FeedbackDb){
        this.feedbackDb = feedbackDb;
    }


    feedback_create_feedback =async (req, res)=>  {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await this.feedbackDb.createFeedback(req.body)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
    feedback_get_all = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.feedbackDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    feedback_get_by_videoId =async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.feedbackDb.findAllByVideoId( req.params.videoclipId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    feedback_get_by_activityId =async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.feedbackDb.findAllByActivityId( req.params.activityId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    feedback_update= async(req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    const id = req?.params?.id;
    try {

        const result = await this.feedbackDb.update(id,req.body)

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

    feedback_delete_feedback = async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await this.feedbackDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
}
export default FeedbackController