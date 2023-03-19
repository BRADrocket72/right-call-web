import InstructorLesson from "../../../mongo/InstructorLesson"
import InstructorLessonSchema from "../../../mongo/schemas/InstructorLessonSchema"

const testMongoDb = require('../testMongoDb')
const instructorLessonCollection :InstructorLesson =  new InstructorLesson()
beforeEach(async () => {
    const lessonOne = new InstructorLessonSchema( {name:"test lesson",instructorId:"testInstructor2",description:"this is a test lesson",videoClipsArray:["testVideo1", "testVideo2"]})
    const lessonTwo = new InstructorLessonSchema( {name:"test lesson 2",instructorId:"testInstructor2",description:"this is the second test lesson",videoClipsArray:["123", "abc", "456"]})
    await lessonOne.save();
    await lessonTwo.save();
})


beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get instructor lessons by istructor ID',()=>{
    it('Both instructor lesson objects are retrieved by the instructors ID', async () => {
        const retrievedLesson = await instructorLessonCollection.getById("testInstructor2");
              
        expect(retrievedLesson.length).toEqual(2)
        expect(retrievedLesson[0].name).toEqual('test lesson')
        expect(retrievedLesson[0].instructorId).toEqual('testInstructor2')
        expect(retrievedLesson[1].name).toEqual('test lesson 2')
        expect(retrievedLesson[1].instructorId).toEqual('testInstructor2')
    })
})
