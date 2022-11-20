export default class VideoClip {
    id = "";
    videoUrl = "";
    timestamps = [];
    lessonName = "";

    constructor(id, videoUrl, timestamps, lessonName) {
        this.id = id;
        this.videoUrl = videoUrl,
        this.timestamps = timestamps,
        this.lessonName = lessonName
    }
}