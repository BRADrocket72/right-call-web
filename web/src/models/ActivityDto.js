export default class ActivityDto {
    id = "";
    questionText = "";
    questionType = ""
    videoclipId = "";
    answerOptions = []
    correctAnswer =""

    constructor(timestamp, questionText,questionType, answers, correctAnswer, videoClipId) {
        this.timestamp = timestamp
        this.questionText = questionText;
        this.questionType = questionType;
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.videoClipId = videoClipId
    }
}