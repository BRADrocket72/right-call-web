import { UserResultsDb } from "../db/UserResultsDb";
import { UserResultsDto } from "../model/UserResultsDto";
import UserResultsSchema from "./schemas/UserResultsSchema";

class UserResults implements UserResultsDb {
 
   async createUserResult(userResult:UserResultsDto) {
        const data = new UserResultsSchema({
            username:userResult.username,
            score:userResult.score,
            quizId: userResult.quizId,
            quizName: userResult.quizName,
            questionTimes: userResult.questionTimes
        })
        const dataToSave = await data.save()
        return dataToSave;

}
    
async getAllUserResults(){
        const data = await UserResultsSchema.find()
        return data;
    }
async getAllHighestUserResults(userName:string){
    const usersResults = await this.getResultsByUsername(userName)
    const quizNames = []
    for (let i=0; i <usersResults.length; i++) {
        if (quizNames.includes(usersResults[i].quizName) == false) {
            quizNames.push(usersResults[i].quizName)
        }
    }
    const data = []
    for (let i=0; i<quizNames.length; i++) {
        data.push(await UserResultsSchema.aggregate([{$match: {username: userName, quizName: quizNames[i]}}, {$sort: {'score':-1}}]))
    }

    return data;
}
    
async getResultsByUsername(username:string){
    const data = await UserResultsSchema.find({"username": username})
    return data
}

async getResultsByQuizId(quizId: string){
    const data = await UserResultsSchema.find({"quizId" : quizId})
    return data
}

}
export default UserResults