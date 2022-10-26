export default class VideoClip {
    id = "";
    videoLength = 0;
    videoUrl = "";
    timestamps = [];

    constructor(id, videoLength, videoUrl, timestamps) {
        this.id = id;
        this.videoLength = videoLength;
        this.videoUrl = videoUrl,
        this.timestamps = timestamps
    }
}