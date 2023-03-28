import InstructorLesson from "../../../mongo/InstructorLesson"
import InstructorLessonSchema from "../../../mongo/schemas/InstructorLessonSchema"

const testMongoDb = require('../testMongoDb')
const instructorLessonCollection :InstructorLesson =  new InstructorLesson()
beforeEach(async () => {
    const lessonOne = new InstructorLessonSchema( {name:"test lesson",instructorId:"testInstructor",description:"this is a test lesson",videoClipsArray:["testVideo1", "testVideo2"]})
    const lessonTwo = new InstructorLessonSchema( {name:"test lesson 2",instructorId:"testInstructor2",description:"this is the second test lesson",videoClipsArray:["123", "abc", "456"]})
    await lessonOne.save();
    await lessonTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get all instructor lessons',()=>{
    it('Two feedbacks are retrieved', async () => {
        const allLessonObjects = await instructorLessonCollection.getAll();
              
        expect(allLessonObjects.length).toEqual(2);
        expect(allLessonObjects[0].name).toEqual("test lesson")
        expect(allLessonObjects[0].instructorId).toEqual("testInstructor")
        expect(allLessonObjects[1].name).toEqual("test lesson 2")
        expect(allLessonObjects[1].instructorId).toEqual('testInstructor2')
    })
})
