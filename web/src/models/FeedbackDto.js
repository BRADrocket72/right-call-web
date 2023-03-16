export default class FeedbackDto {
    videoclipId = ""
    activityId = ""
    correctFeedback = ""
    incorrectFeedback = ""

    constructor(videoclipId, activityId, correctFeedback, incorrectFeedback) {
        this.videoclipId = videoclipId
        this.activityId = activityId
        this.correctFeedback = correctFeedback
        this.incorrectFeedback = incorrectFeedback
    }
}