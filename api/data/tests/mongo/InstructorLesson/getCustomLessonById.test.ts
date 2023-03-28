import InstructorLesson from "../../../mongo/InstructorLesson"
import InstructorLessonSchema from "../../../mongo/schemas/InstructorLessonSchema"

const testMongoDb = require('../testMongoDb')
const instructorLessonCollection :InstructorLesson =  new InstructorLesson()
let lessonOneDoc;
beforeEach(async () => {
    const lessonOne = new InstructorLessonSchema( {name:"test lesson",instructorId:"testInstructor",description:"this is a test lesson",videoClipsArray:["testVideo1", "testVideo2"]})
    const lessonTwo = new InstructorLessonSchema( {name:"test lesson 2",instructorId:"testInstructor2",description:"this is the second test lesson",videoClipsArray:["123", "abc", "456"]})
    lessonOneDoc = await lessonOne.save();
    await lessonTwo.save();
})


beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get instructor lesson by lesson ID',()=>{
    it('One instructor lesson object is retrieved by the first lesson ID', async () => {
        const retrievedLesson = await instructorLessonCollection.getLessonById(lessonOneDoc._id);
              
        expect(retrievedLesson.name).toEqual('test lesson')
        expect(retrievedLesson.instructorId).toEqual('testInstructor')
        expect(retrievedLesson.description).toEqual('this is a test lesson')
        expect(retrievedLesson.videoClipsArray.length).toEqual(2)
    })
})
