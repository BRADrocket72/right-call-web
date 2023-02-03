
export type ActivityDto = {
    timestamp:number,
    questionText :string,
    questionType:string,
    videoclipId :string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    answers : Array<any>,
    correctAnswer: string,
}
