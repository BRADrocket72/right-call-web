import mongoose from "mongoose";
import  {ActivityDb} from "../db/ActivityDb";
import {ActivityDto} from "../model/ActivityDto";
import ActivitySchema from "../mongo/schemas/ActivitySchema"

 class Activity implements ActivityDb {
     
    async createActivity(activity:ActivityDto) {

        const data = new ActivitySchema({
            timestamp:activity.timestamp,
            questionText: activity.questionText,
            questionType: activity.questionType,
            answers: activity.answers,
            correctAnswer: activity.correctAnswer,
            videoclipId: activity.videoclipId
        })
        const dataToSave = await data.save()
        return dataToSave
    }
    async getAll(){
        const data =await ActivitySchema.find()

        return data;

    }
    async findAllByVideoId(videoclipId:string){
        const data = await ActivitySchema.find({"videoclipId": videoclipId})
        return data;

    }
    async update(id:string, activity: ActivityDto){
        const query = {_id: new mongoose.Types.ObjectId(id)}
        const data =await  ActivitySchema.findOneAndUpdate(query,{$set:activity})
        return data

    }
    async findByIdAndDelete(id:string){
        const data =  await ActivitySchema.findByIdAndDelete(id); 
        return data;
    }

}
export default  Activity