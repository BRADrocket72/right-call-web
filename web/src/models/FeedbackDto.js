export default class FeedbackDto {
    videoclipId = ""
    activityId = ""
    timestamp = 0
    correctFeedback = ""
    incorrectFeedback = ""

    constructor(videoclipId, activityId, timestamp, correctFeedback, incorrectFeedback) {
        this.videoclipId = videoclipId
        this.activityId = activityId
        this.timestamp = timestamp
        this.correctFeedback = correctFeedback
        this.incorrectFeedback = incorrectFeedback
    }
}