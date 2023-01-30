import { truncateSync } from "fs";
import { UserResultsDb } from "../db/UserResultsDb";
import { UserResultsDto } from "../model/UserResultsDto";
import UserResultsSchema from "./schemas/UserResultsSchema";

class UserResults implements UserResultsDb {

   async createUserResult(userResult:UserResultsDto) {
        // eslint-disable-next-line no-useless-catch
        try{
        const data = new UserResultsSchema({
            username:userResult.username,
            score:userResult.score,
            lessonId: userResult.lessonId,
            lessonName: userResult.lessonName
        })
        const dataToSave = await data.save()
        return UserResults.toDto(dataToSave);
    }catch(e){
        throw e;
    }
}
    
async getAllUserResults(){
        const data = await  UserResultsSchema.find()
        const result = data.map((x:any)=>{
            return UserResults.toDto(x)
        })
        return result;
    }
    
    async getResultsByUsername(username:string){
        const data = await UserResultsSchema.find({"username": username})
        const result = data.map((x)=>{
            return UserResults.toDto(x)
        })
        return result;
    }
    
    private static toDto = (res: any): UserResultsDto =>{
        const result: UserResultsDto = {id:res._id,lessonId:res.lessonId,username:res.userName,score:res.score,lessonName:res.lessonName}
        return result
    }
}
export default UserResults