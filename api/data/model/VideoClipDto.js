export default class VideoClipDto {
    _id = ""
    videoUrl = ""
    videoName = ""
    timeStamps = []

    constructor(_id, videoUrl, videoName, timeStamps) {
        this._id = _id;
        this.videoUrl = videoUrl,
        this.videoName = videoName,
        this.timeStamps = timeStamps
    }
}