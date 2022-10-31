export default class Answer {
    activityId = "";
    isCorrect = null;
    answerText = "";

    constructor(activityId, isCorrect, answerText) {
        this.activityId = activityId;
        this.isCorrect = isCorrect;
        this.answerText = answerText;
    }
}