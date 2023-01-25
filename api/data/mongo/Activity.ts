import  {ActivityDb} from "../db/ActivityDb";
import {ActivityDto} from "../model/ActivityDto";
import ActivitySchema from "../mongo/schemas/ActivitySchema"

 class Activity implements ActivityDb {
    constructor(){

    }
     
    async createActivity(activity:ActivityDto) {
        try{
        const data = new ActivitySchema({
            timestamp:1232,
            questionText: activity.questionText,
            questionType: activity.questionType,
            answers: activity.answerOptions,
            correctAnswer: activity.correctAnswer,
            videoclipId: activity.videoclipId
        })
        var dataToSave = await data.save()
        return Activity.toDto(dataToSave);
    }catch(e){
        throw e;
    }
}
    async getAll(){
        var data = await  ActivitySchema.find()
        var result = data.map((x:any)=>{
            return Activity.toDto(x)
        })
        return result;

    }
    async findAllByVideoId(videoclipId:string){
        var data = await ActivitySchema.find({"videoclipId": videoclipId})
        var result = data.map((x)=>{
            return Activity.toDto(x)
        })
        return result;

    }
    async update(activity: ActivityDto){
        var data =await  ActivitySchema.update(activity)
        return Activity.toDto(data);

    }
    async findByIdAndDelete(id:string){
        var data =  await ActivitySchema.findByIdAndDelete(id); 
        return Activity.toDto(data);
    }

    private static toDto = (
        res: any
      ): ActivityDto =>
        {
            var result: ActivityDto = {questionText:res.questionText,questionType:res.questionType,answerOptions:res.answers ,videoclipId:res.videoclipId,id:res._id,correctAnswer:res.correctAnswer}
            return result;
        }
}
export default  Activity