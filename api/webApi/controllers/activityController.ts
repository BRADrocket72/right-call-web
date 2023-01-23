import { Activity } from "../../data/mongo/Activity"

const activityDb: ActivityDb = new Activity();

export async function activities_create_activity(req, res) {


    try {
        res.header('Access-Control-Allow-Origin', '*')
        var dataToSave = await activityDb.createActivity(req)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export async function activities_get_all(req, res) {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function activities_get_by_videoId(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await find({"videoclipId": req.params.videoclipId});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function activities_update(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export async function activities_delete_activity(req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;

        const result = await findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}