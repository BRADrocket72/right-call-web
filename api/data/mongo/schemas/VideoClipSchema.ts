import mongoose from 'mongoose';
import { VideoClipDto } from '../../model/VideoClipDto';

const videoSchema = new mongoose.Schema({
    videoURL: {
        required: true,
        type: String
    },
    videoName: {
        required: true,
        type: String
    },
    timeStamps: {
        required: true,
        type: Array
    }
})
interface IVideoClipModel extends VideoClipDto,mongoose.Document{}

export default  mongoose.model<IVideoClipModel>('VideoClip', videoSchema)