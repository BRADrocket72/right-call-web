import { VideoClipDb } from "../db/VideoClipDb";
import { VideoClipDto } from "../model/VideoClipDto";
import VideoClipSchema from "./schemas/VideoClipSchema";

class VideoClip implements VideoClipDb{
    
    async createVideoClip(videoClip: string,fileURL:string, timeStamps: Array<number>): Promise<VideoClipDto> { 
        const data = new VideoClipSchema({
            videoURL: fileURL,
            videoName: videoClip,
            timeStamps: timeStamps
        })
        return await data.save();
    }
    async getAllVideoClips(){
        return await VideoClipSchema.find();
    }
    async getVideoClipById(id: string): Promise<VideoClipDto> {
        return await VideoClipSchema.findById(id);
    }
    async updateVideoClip(id: string, videoClip: VideoClipDto): Promise<VideoClipDto> {
        const options = { new: true };
        return await VideoClipSchema.findByIdAndUpdate(id, videoClip, options)
    }
    async deleteClipById(id: string): Promise<VideoClipDto> {
        return await VideoClipSchema.findByIdAndDelete(id)
    }
    
}
export default VideoClip