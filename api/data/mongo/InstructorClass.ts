import { InstructorClassDb } from "../db/InstructorClassDb";
import { InstructorClassDto } from "../model/InstructorClassDto";
import InstructorClassSchema from "./schemas/InstructorClassSchema";

class InstructorClass implements InstructorClassDb {
 
   async createClass(instructorClass:InstructorClassDto) {
        const data = new InstructorClassSchema({
            instructorId:instructorClass.instructorId,
            videoclipIds:instructorClass.videoclipIds,
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
    async deleteVideoClip(classId: string, videoClipIds: Array<string>) {
        const data = await InstructorClassSchema.findByIdAndUpdate(classId, videoClipIds)
        return data;
    }
}
    
export default InstructorClass