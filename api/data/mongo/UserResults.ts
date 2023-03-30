import { UserResultsDb } from "../db/UserResultsDb";
import { UserResultsDto } from "../model/UserResultsDto";
import UserResultsSchema from "./schemas/UserResultsSchema";

class UserResults implements UserResultsDb {
 
   async createUserResult(userResult:UserResultsDto) {
        const data = new UserResultsSchema({
            username:userResult.username,
            score:userResult.score,
            lessonId: userResult.lessonId,
            lessonName: userResult.lessonName
        })
        const dataToSave = await data.save()
        return dataToSave;

}
    
async getAllUserResults(){
        const data = await  UserResultsSchema.find()
        return data;
    }
    
async getResultsByUsername(username:string){
    const data = await UserResultsSchema.find({"username": username})
    return data
}

async getResultsByLessonId(lessonId: string){
    const data = await UserResultsSchema.find({"lessonId" : lessonId})
    return data
}

}
export default UserResults