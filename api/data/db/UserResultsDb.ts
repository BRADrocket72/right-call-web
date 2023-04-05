import {UserResultsDto} from "../model/UserResultsDto";

export interface UserResultsDb {
    createUserResult(activity:UserResultsDto) : Promise<UserResultsDto>;
    getAllUserResults():Promise<UserResultsDto[]>;
    getResultsByUsername(username:string): Promise<UserResultsDto[]>
    getResultsByLessonId(lessonId:string) : Promise<UserResultsDto[]>
    getAllHighestUserResults(userName:string):Promise<UserResultsDto[]>
}