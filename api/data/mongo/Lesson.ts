import  {LessonDb} from "../db/LessonDb";
import {LessonDto} from "../model/LessonDto";
import LessonSchema from "./schemas/LessonSchema"

 class Lesson implements LessonDb {
     
    async createLesson(lesson:LessonDto) {

        const data = new LessonSchema({
            name:lesson.name,
            userType: lesson.userType,
            description: lesson.description,
            videoClipsArray: lesson.videoClipsArray,
        })
        const dataToSave = await data.save()
        return dataToSave
    }
    async getAll(){
        const data =await LessonSchema.find()
        return data;
    }
    async findByIdAndDelete(id:string)  {
        const data =  await LessonSchema.findByIdAndDelete(id); 
        return data;
    }
    async updateLessonName(id: string, name: string) {
        const data = await LessonSchema.findByIdAndUpdate(id, {$set: {name: name}})
        return data;
    }
    async updateVideoClipsArray(id: string, videoClipsArray: Array<string>){
        const data = await LessonSchema.findByIdAndUpdate(id, videoClipsArray)
        return data;
    }
    async getAdminLessonById(id: string) {
        return await LessonSchema.findById(id);
    }
}
export default  Lesson