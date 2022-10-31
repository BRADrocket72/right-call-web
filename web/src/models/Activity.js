export default class Activity {
    id = "";
    questionText = "";
    videoId = "";
    answerOptions = []

    constructor(id, questionText, videoId, answerOptions) {
        this.id = id;
        this.questionText = questionText;
        this.videoId = videoId
        this.answerOptions = answerOptions
   //     this.attribute = attribute;
    }
}