import Activity from "../../data/mongo/Activity";

const activityDb = new Activity();

  module.exports.activities_create_activity =async (req, res)=>  {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await activityDb.createActivity(req.body)
        res.status(200).json(dataToSave.toJSON())
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
module.exports.activities_get_all = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await activityDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.activities_get_by_videoId =async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        console.log(req.params)
        const data = await activityDb.findAllByVideoId( req.params.videoclipId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.activities_update= async(req, res)=> {
    res.header('Access-Control-Allow-Origin', '*')
    try {

        const result = await activityDb.update(req.body)

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports.activities_delete_activity = async(req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await activityDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}