import { LessonDto } from "../../../model/LessonDto"
import Lesson from "../../../mongo/Lesson"
import LessonSchema from "../../../mongo/schemas/LessonSchema"


const testMongoDb = require('../testMongoDb')
const lessonCollection :Lesson =  new Lesson()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Lesson Creations',()=>{
    it('Lesson is successfully created', async () => {
        const lessonOne: LessonDto = {name:"Test Lesson",userType:"Admin",description:"Practice lesson",videoClipsArray:["testId1", "testId2"]}
        const postedLesson = await lessonCollection.createLesson(lessonOne);
              
        expect(postedLesson.name).toEqual("Test Lesson");
        expect(postedLesson.userType).toEqual("Admin");
        expect(postedLesson.description).toEqual("Practice lesson");
        expect(postedLesson.videoClipsArray.length).toEqual(2);
        expect(postedLesson.videoClipsArray[1]).toEqual("testId2");
    })
})



