export default class AssignActivity {
    timestamp = ""
    questionType = ""
    questionText = ""
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