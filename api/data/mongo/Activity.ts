import  {ActivityDb} from "../db/ActivityDb";
import {ActivityDto} from "../model/ActivityDto";
import ActivitySchema from "../mongo/schemas/ActivitySchema"

 class Activity implements ActivityDb {
     
    async createActivity(activity:ActivityDto) {

        const data = new ActivitySchema({
            timestamp:1232,
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
        const result = data.map((x:any)=>{
            return Activity.toDto(x)
        })
        return result;

    }
    async findAllByVideoId(videoclipId:string){
        const data = await ActivitySchema.find({"videoclipId": videoclipId})
        const  result = data.map((x)=>{
            return Activity.toDto(x)
        })
        return result;

    }
    async update(activity: ActivityDto){
        const data =await  ActivitySchema.update(activity)
        return Activity.toDto(data);

    }
    async findByIdAndDelete(id:string){
        const data =  await ActivitySchema.findByIdAndDelete(id); 
        return Activity.toDto(data);
    }

    private static toDto = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res: any
      ): ActivityDto =>
        {
            const result: ActivityDto = {questionText:res.questionText,timestamp:res.timestamp,questionType:res.questionType,answers:res.answers ,videoclipId:res.videoclipId,correctAnswer:res.correctAnswer}
            return result;
        }
}
export default  Activity