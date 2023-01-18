const VideoClip = require('../models/VideoClip');
const { s3Upload } = require('../services/Storage/AmazonS3Service');


exports.create_clip = async (req, res) => {
    try {
        const fileUploadURL = await s3Upload(req.file)
        const data = new VideoClip({
            videoURL: fileUploadURL,
            videoName: req.body.name
        })
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await data.save();
        res.header('Content-Type', 'multipart/form-data')
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.get_all =  async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await VideoClip.find();
        res.header('Access-Control-Allow-Origin', '*')
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_by_id =  async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await VideoClip.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.update_clip =  async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await VideoClip.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete_clip =  async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const data = await VideoClip.findByIdAndDelete(id)
        res.send(`Document with ${data.videoURL} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}