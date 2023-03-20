import mongoose from "mongoose";
import {FeedbackDb} from "../db/FeedbackDb";
import {FeedbackDto} from "../model/FeedbackDto";
import FeedbackSchema from "../mongo/schemas/FeedbackSchema"

 class Feedback implements FeedbackDb {
     
    async createFeedback(feedback:FeedbackDto) {
        const data = new FeedbackSchema({
            videoclipId: feedback.videoclipId,
            activityId: feedback.activityId,
            timestamp: feedback.timestamp,
            correctFeedback: feedback.correctFeedback,
            incorrectFeedback: feedback.incorrectFeedback
        })
        const dataToSave = await data.save()
        return dataToSave

    }
    async getAll(){
        const data =await FeedbackSchema.find()

        return data;

    }
    async findAllByVideoId(videoclipId:string){
        const data = await FeedbackSchema.find({"videoclipId": videoclipId})
        return data;
    }
    async findAllByActivityId(activityId:string) {
        const data = await FeedbackSchema.find({"activityId": activityId})
        return data;
    }

    async update(id:string, feedback: FeedbackDto){
        const query = {_id: new mongoose.Types.ObjectId(id)}
        const data = await FeedbackSchema.findOneAndUpdate(query,{$set:feedback},{new:true})
        return data
    }
    async findByIdAndDelete(id:string){
        const data =  await FeedbackSchema.findByIdAndDelete(id); 
        return data;
    }

}
export default Feedback