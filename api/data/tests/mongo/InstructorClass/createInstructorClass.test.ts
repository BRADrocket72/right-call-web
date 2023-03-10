import { InstructorClassDto } from '../../../model/InstructorClassDto'
import InstructorClass from '../../../mongo/InstructorClass'
import InstructorClassSchema from '../../../mongo/schemas/InstructorClassSchema'


const testMongoDb = require('../testMongoDb')
const instructorClassCollection :InstructorClass =  new InstructorClass()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('InstructorClass created when',()=>{
    it('First InstructorClass', async () => {
        const instructorClassOne: InstructorClassDto = {instructorId:"instructor1",className:"Basketball",lessonIds:["id1","id2"],studentIds:["student1","student2"]}
        const instructorClassResult = await instructorClassCollection.createClass(instructorClassOne);
        const foundInstructorClass = await InstructorClassSchema.findById(instructorClassResult._id);
              
        expect(foundInstructorClass.instructorId).toEqual("instructor1");
        expect(foundInstructorClass.className).toEqual("Basketball");
        expect(foundInstructorClass.lessonIds).toEqual(["id1","id2"]);
        expect(foundInstructorClass.studentIds).toEqual(["student1","student2"]);
    })
})