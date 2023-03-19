import InstructorLesson from "../../../mongo/InstructorLesson"
import InstructorLessonSchema from "../../../mongo/schemas/InstructorLessonSchema"

const testMongoDb = require('../testMongoDb')
const instructorLessonCollection :InstructorLesson =  new InstructorLesson()
let lessonOneDoc;

beforeEach(async () => {
    const lessonOne = new InstructorLessonSchema( {name:"test lesson",instructorId:"testInstructor2",description:"this is a test lesson",videoClipsArray:["testVideo1", "testVideo2"]})
    const lessonTwo = new InstructorLessonSchema( {name:"test lesson 2",instructorId:"testInstructor2",description:"this is the second test lesson",videoClipsArray:["123", "abc", "456"]})

    lessonOneDoc = await lessonOne.save();
    await lessonTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Update lesson Name by ID',()=>{
    it('Change Instructor Lesson name', async () => {
        await instructorLessonCollection.updateInstructorLessonName(lessonOneDoc._id, "updated lesson name");
        
        const instructorLessonAfterUpdate = await InstructorLessonSchema.findById(lessonOneDoc._id);
        expect( instructorLessonAfterUpdate.name).toEqual("updated lesson name");
    })
})