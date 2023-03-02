import { VideoClipDto }  from "../model/VideoClipDto";

export interface VideoClipDb {
    createVideoClip(videoClip:string,fileURL:string, timeStamps: Array<number>):Promise<VideoClipDto>;
    getAllVideoClips():Promise<VideoClipDto[]>;
    getVideoClipById(id:string):Promise<VideoClipDto>;
    updateVideoClip(id:string,videoClip:VideoClipDto):Promise<VideoClipDto>;
    deleteClipById(id:string):Promise<VideoClipDto>

}