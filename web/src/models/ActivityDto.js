export default class ActivityDto {
    id = "";
    questionText = "";
    videoclipId = "";
    answerOptions = []
    correctAnswer =""

    constructor(timestamp, questionText, answers, correctAnswer, videoClipId) {
        this.timestamp = timestamp
        this.questionText = questionText;
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.videoClipId = videoClipId
    }
}