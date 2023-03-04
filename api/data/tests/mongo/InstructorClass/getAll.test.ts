import InstructorClass from '../../../mongo/InstructorClass'
import InstructorClassSchema from '../../../mongo/schemas/InstructorClassSchema'


const testMongoDb = require('../testMongoDb')
const instructorClassCollection :InstructorClass =  new InstructorClass()

beforeAll(async () => await testMongoDb.connect())

beforeEach(async () => {
    const instructorClassOne =new InstructorClassSchema({instructorId:"instructor1",className:"Basketball",lessonIds:["id1","id2"],studentIds:["student1","student2"]})
    const instructorClassTwo =new InstructorClassSchema({instructorId:"instructor2",className:"Basketball",lessonIds:["id3","id4"],studentIds:["student3","student4"]})
    await instructorClassOne.save();
    await instructorClassTwo.save();
})

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())


describe('Get all InstructorClasses',()=>
{
    it("Get Two",async ()=>{
    const instructorClassResult = await instructorClassCollection.getAll()
    expect(instructorClassResult.length).toEqual(2);
    expect(instructorClassResult[0].instructorId).toEqual("instructor1")
    expect(instructorClassResult[1].instructorId).toEqual("instructor2")
    })
})