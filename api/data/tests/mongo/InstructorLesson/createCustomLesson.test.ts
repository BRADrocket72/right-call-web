import { InstructorLessonDto } from "../../../model/InstructorLessonDto"
import InstructorLesson from "../../../mongo/InstructorLesson"
import InstructorLessonSchema from "../../../mongo/schemas/InstructorLessonSchema"


const testMongoDb = require('../testMongoDb')
const instructorLessonCollection :InstructorLesson =  new InstructorLesson()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Instructor Lesson created when',()=>{
    it('First Instructor Lesson', async () => {
        const lessonOne: InstructorLessonDto = {name:"test lesson",instructorId:"testInstructor",description:"this is a test lesson",videoClipsArray:["testVideo1", "testVideo2"]}
        const lessonResult = await instructorLessonCollection.createCustomLesson(lessonOne);
        const foundLesson = await InstructorLessonSchema.findById(lessonResult._id);
              
        expect(foundLesson.name).toEqual("test lesson");
        expect(foundLesson.instructorId).toEqual("testInstructor");
        expect(foundLesson.description).toEqual("this is a test lesson");
        expect(foundLesson.videoClipsArray.length).toEqual(2);
        expect(foundLesson._id).toBeTruthy();
    })
})


