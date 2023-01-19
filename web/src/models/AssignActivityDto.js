export default class AssignActivityDto {
    timestamp = "";
    questionText = "";
    answers = []
    correctAnswer=""
    videoclipId = "";

    constructor(timestamp, questionText, answers, correctAnswer, videoclipId) {
        this.timestamp = timestamp;
        this.questionText = questionText;
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.videoclipId = videoclipId
    }
}