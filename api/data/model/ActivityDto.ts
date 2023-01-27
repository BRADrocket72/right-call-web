export type ActivityDto = {
    id :string,
    questionText :string,
    questionType:string,
    videoclipId :string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answerOptions : Array<any>,
    correctAnswer: string,
}
