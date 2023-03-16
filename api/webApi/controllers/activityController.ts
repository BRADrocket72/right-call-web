import { ActivityDb } from "../../data/db/ActivityDb";
import Activity from "../../data/mongo/Activity";

class ActivityController {
    private activityDb: ActivityDb = new Activity();

    constructor(activityDb: ActivityDb){
       this.activityDb = activityDb
    }
    

   activities_create_activity = async(req, res)=> {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await this.activityDb.createActivity(req.body)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
activities_get_all = async (req, res)=> {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.activityDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

activities_get_by_videoId = async(req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.activityDb.findAllByVideoId( req.params.videoclipId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

activities_update =async (req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    const id = req?.params?.id;
    try {

        const result = await this.activityDb.update(id,req.body)

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

activities_delete_activity = async (req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await this.activityDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

}
export default ActivityController;
