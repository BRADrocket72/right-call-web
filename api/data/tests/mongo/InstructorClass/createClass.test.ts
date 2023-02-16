import { InstructorClassDto } from "../../../model/InstructorClassDto"
import InstructorClassSchema from "../../../mongo/schemas/InstructorClassSchema"
import InstructorClass from "../../../mongo/InstructorClass"


const testMongoDb = require('../testMongoDb')
const instructorClassRooms :InstructorClass =  new InstructorClass()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Instructor Classroom created when',()=>{
    it('Test Class', async () => {
        const instructorClassRoomOne: InstructorClassDto = {instructorId:"RefRepCoach",className:"Testing ClassRoom",videoclipIds:["Lesson1", "Lesson2"],studentIds:["StudentA","StudentB"]}
        const CreateClassRoom = await instructorClassRooms.createClass(instructorClassRoomOne);
        const foundClassroom = await InstructorClassSchema.findById(CreateClassRoom._id);
              
        expect(foundClassroom.instructorId).toEqual("RefRepCoach");
        expect(foundClassroom.className).toEqual("Testing ClassRoom");
        expect(foundClassroom.videoclipIds).toEqual(["Lesson1", "Lesson2"]);
        expect(foundClassroom.studentIds).toEqual(["StudentA","StudentB"]);
    })
})
