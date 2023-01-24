export default class AssignActivityDto {
    timestamp = "";
    questionText = "";
    questionType ="";
    answers = []
    correctAnswer=""
    videoclipId = ""

    constructor(timestamp, questionType, questionText, answers, correctAnswer, videoclipId) {
        this.timestamp = timestamp
        this.questionType = questionType
        this.questionText = questionText
        this.answers = answers
        this.correctAnswer = correctAnswer
        this.videoclipId = videoclipId
    }
}