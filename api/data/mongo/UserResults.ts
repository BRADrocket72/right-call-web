import { truncateSync } from "fs";
import { UserResultsDb } from "../db/UserResultsDb";
import { UserResultsDto } from "../model/UserResultsDto";
import UserResultsSchema from "./schemas/UserResultsSchema";

class UserResults implements UserResultsDb {
    constructor(){

    }

   async createUserResult(userResult:UserResultsDto) {
        try{
        const data = new UserResultsSchema({
            username:userResult.username,
            score:userResult.score,
            lessonId: userResult.lessonId,
            lessonName: userResult.lessonName
        })
        var dataToSave = await data.save()
        return UserResults.toDto(dataToSave);
    }catch(e){
        throw e;
    }
}
    
async getAllUserResults(){
        var data = await  UserResultsSchema.find()
        var result = data.map((x:any)=>{
            return UserResults.toDto(x)
        })
        return result;
    };
    
    async getResultsByUsername(username:string){
        var data = await UserResultsSchema.find({"username": username})
        var result = data.map((x)=>{
            return UserResults.toDto(x)
        })
        return result;
    }
    
    private static toDto = (res: any): UserResultsDto =>{
        var result: UserResultsDto = {id:res._id,lessonId:res.lessonId,username:res.userName,score:res.score,lessonName:res.lessonName}
        return result
    }
}
export default UserResults