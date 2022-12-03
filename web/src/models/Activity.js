export default class Activity {
    id = "";
    questionText = "";
    videoId = "";
    answerOptions = []

    constructor(timestamp, questionText, answers, correctAnswer, videoClipId) {
        this.timestamp = timestamp
        this.questionText = questionText;
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.videoClipId = videoClipId
    }
}