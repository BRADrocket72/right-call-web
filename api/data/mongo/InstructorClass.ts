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
}
    
export default InstructorClass