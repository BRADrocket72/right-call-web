import VideoClip from '../../data/mongo/VideoClip';
import AmazonS3Service from '../services/Storage/AmazonS3Service';



class VideoClipController{
    private s3Service:AmazonS3Service = new AmazonS3Service();
    private videoclipDb:VideoClip = new VideoClip()

    constructor(s3Service:AmazonS3Service,videoclipDb:VideoClip)
    {
        this.s3Service = s3Service;
        this.videoclipDb = videoclipDb;
    }


    create_clip = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Content-Type', 'multipart/form-data')

        const fileUploadURL = await this.s3Service.s3Upload(req.file)
        const data =  await this.videoclipDb.createVideoClip(req.body.name, fileUploadURL, []);
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        throw error;
    }
}

    create_instructor_clip = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Content-Type', 'multipart/form-data')

        const data =  await this.videoclipDb.createVideoClip(req.body.videoName, req.body.videoUrl, req.body.timeStamps);
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        throw error;
    }
}

    get_all = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        res.header('Access-Control-Allow-Origin', '*')
         const data = await this.videoclipDb.getAllVideoClips()
         res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    get_by_id = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.videoclipDb.getVideoClipById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    update_clip = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data =  await this.videoclipDb.updateVideoClip(
            req.params.id, req.body
        )
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

    delete_clip = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data =  await this.videoclipDb.deleteClipById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
}
export default VideoClipController;