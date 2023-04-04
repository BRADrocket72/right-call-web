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
async getAllHighestUserResults()
{
    // const query = {"lessonId":lessonId};
    const sort = {"$sort":{"username":1,"score":-1}}
    const groupBy ={ $group:{"username": "$username",score: { $first: "$score" }}}
    const data = await UserResultsSchema.aggregate([{$sort:{"username":1,"score":-1}},{ $group:{username: "$username",score: { $first: "$score" }}}]);
    
    return data;
}
    
    async getResultsByUsername(username:string){
        const data = await UserResultsSchema.find({"username": username})
        return data
    }
    

}
export default UserResults