export default class AssignActivity {
    timestamp = "";
    questionText = "";
    answers = []
    videoclipId = "";

    constructor(timestamp, questionText, answers, videoclipId) {
        this.timestamp = timestamp;
        this.questionText = questionText;
        this.answers = answers
        this.videoclipId = videoclipId
    }
}