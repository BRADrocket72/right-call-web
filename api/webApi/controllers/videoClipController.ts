import VideoClip from '../../data/mongo/VideoClip';
import AmazonS3Service from '../services/Storage/AmazonS3Service';

const s3Service = new AmazonS3Service()
const videoclipDb = new VideoClip()

exports.create_clip = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Content-Type', 'multipart/form-data')

        const fileUploadURL = await s3Service.s3Upload(req.file)
        const data =  videoclipDb.createVideoClip(req.body, fileUploadURL);
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        throw error;
    }
}

exports.get_all = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        res.header('Access-Control-Allow-Origin', '*')
         const data = await videoclipDb.getAllVideoClips()
         res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_by_id = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await videoclipDb.getVideoClipById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.update_clip = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data =  await videoclipDb.updateVideoClip(
            req.params.id, req.body
        )
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete_clip = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data =  await videoclipDb.deleteClipById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}