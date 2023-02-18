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
}
export default  Lesson