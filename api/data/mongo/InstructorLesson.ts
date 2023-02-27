import  {InstructorLessonDb} from "../db/InstructorLessonDb";
import {InstructorLessonDto} from "../model/InstructorLessonDto";
import InstructorLessonSchema from "./schemas/InstructorLessonSchema"


 class InstructorLesson implements InstructorLessonDb {
     
    async createCustomLesson(lesson:InstructorLessonDto) {
        const data = new InstructorLessonSchema({
            name:lesson.name,
            instructorId: lesson.instructorId,
            description: lesson.description,
            videoClipsArray: lesson.videoClipsArray,
        })
        const dataToSave = await data.save()
        return dataToSave
    }
    async getAll(){
        const data =await InstructorLessonSchema.find()
        return data;
    }
    async getById(instructorId: string) {
        const data = await InstructorLessonSchema.find({"instructorId": instructorId})
        return data;
    }
}
export default  InstructorLesson