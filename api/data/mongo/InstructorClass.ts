import { InstructorClassDb } from "../db/InstructorClassDb";
import { InstructorClassDto } from "../model/InstructorClassDto";
import InstructorClassSchema from "./schemas/InstructorClassSchema";

class InstructorClass implements InstructorClassDb {
 
   async createClass(instructorClass:InstructorClassDto) {
        const data = new InstructorClassSchema({
            instructorId:instructorClass.instructorId,
            className:instructorClass.className,
            lessonIds:instructorClass.lessonIds,
            studentIds:instructorClass.studentIds
        })
        const dataToSave = await data.save()
        return dataToSave;
    }
    async getAll(){
        const data =await InstructorClassSchema.find()
        return data;
    }
    async getAllByInstructorId(instructorId: string) {
        const data = await InstructorClassSchema.find({"instructorId": instructorId})
        return data;
    }
    async addVideoClip(classId: string, videoClipIds: Array<string>) {
        const data = await InstructorClassSchema.findByIdAndUpdate(classId, videoClipIds)
        return data;
    }
    async updateStudentIdList(classId: string, studentIds: Array<string>) {
        const data = await InstructorClassSchema.findByIdAndUpdate(classId, studentIds)
        return data;
    }
    async getByClassId(classId: string) {
        const data = await InstructorClassSchema.findById(classId)
        return data;
    }
}
    
export default InstructorClass