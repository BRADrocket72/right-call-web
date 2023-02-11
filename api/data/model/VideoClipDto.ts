import { ObjectId } from "mongoose"

export type VideoClipDto = {
    videoUrl?: string,
    videoName:string,
    timeStamps: Array<number>
}