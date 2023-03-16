export type FeedbackDto = {
    videoclipId: string,
    activityId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    correctFeedback: string,
    incorrectFeedback: string
}