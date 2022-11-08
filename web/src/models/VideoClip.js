export default class VideoClip {
    id = "";
    videoUrl = "";
    timestamps = [];

    constructor(id, videoUrl, timestamps) {
        this.id = id;
        this.videoUrl = videoUrl,
        this.timestamps = timestamps
    }
}