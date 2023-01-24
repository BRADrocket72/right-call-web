import  {ActivityDb} from "../db/ActivityDb";
import {ActivityDto} from "../model/ActivityDto";
import ActivitySchema from "../mongo/schemas/ActivitySchema"

 class Activity implements ActivityDb {
    constructor(){

    }
     
    async createActivity(activity:ActivityDto) {
        try{
            console.log("before model")
            console.log(activity)
        const data = new ActivitySchema({
            timestamp:1232,
            questionText: activity.questionText,
            answers: activity.answerOptions,
            correctAnswer: activity.correctAnswer,
            videoclipId: activity.videoclipId
        })
        console.log(data)
        console.log("after model")
        var dataToSave = await data.save()
        console.log("after save")

        return Activity.toDto(dataToSave);
    }catch(e){
        throw e;
    }
}
    async getAll(){
        // return ActivitySchema.find()
        var result: ActivityDto = {questionText:"",answerOptions:[""],videoclipId:"",id:"",correctAnswer:""}
        return result;

    }
    async findByVideoId(videoclipId:string){
        // return ActivitySchema.find({"videoclipId": videoclipId})
        var result: ActivityDto = {questionText:"",answerOptions:[""],videoclipId:"",id:"",correctAnswer:""}
        return result;

    }
    async update(activity: ActivityDto){
        // return ActivitySchema.update(activity)
        var result: ActivityDto = {questionText:"",answerOptions:[""],videoclipId:"",id:"",correctAnswer:""}
        return result;

    }
    async findByIdAndDelete(id:string){
        // return ActivitySchema.findByIdAndDelete(id);
        var result: ActivityDto = {questionText:"",answerOptions:[""],videoclipId:"",id:"",correctAnswer:""}
        return result;
    }

    private static toDto = (
        res: any
      ): ActivityDto => // projection
        {
            var result: ActivityDto = {questionText:res.questionText,answerOptions:res.answers ,videoclipId:res.videoclipId,id:res._id,correctAnswer:res.correctAnswer}
            return result;
        }
}
export default  Activity