export type UserResultsDto  = {
    username :string,
    score : number,
    quizId : string,
    quizName:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questionTimes: Array<any>
}
