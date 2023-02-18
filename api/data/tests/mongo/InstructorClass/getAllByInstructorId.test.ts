import InstructorClass from '../../../mongo/InstructorClass'
import InstructorClassSchema from '../../../mongo/schemas/InstructorClassSchema'


const testMongoDb = require('../testMongoDb')
const instructorClassCollection :InstructorClass =  new InstructorClass()

beforeAll(async () => await testMongoDb.connect())

beforeEach(async () => {
    const instructorClassOne =new InstructorClassSchema({instructorId:"instructor1",className:"Basketball",videoclipIds:["id1","id2"],studentIds:["student1","student2"]})
    const instructorClassTwo =new InstructorClassSchema({instructorId:"instructor1",className:"Basketball",videoclipIds:["id3","id4"],studentIds:["student3","student4"]})
    const instructorClassThree =new InstructorClassSchema({instructorId:"instructor3",className:"Basketball",videoclipIds:["id5","id6"],studentIds:["student5","student6"]})
    await instructorClassOne.save();
    await instructorClassTwo.save();
    await instructorClassThree.save();
})

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())


describe('Get all InstructorClasses',()=>
{
    it('get Two Ids',async ()=>{
    const instructorClassResult = await instructorClassCollection.getAllByInstructorId("instructor1")
    expect(instructorClassResult.length).toEqual(2);
    expect(instructorClassResult[0].instructorId).toEqual("instructor1")
    expect(instructorClassResult[1].instructorId).toEqual("instructor1")
    })

    it('get One Id',async()=>{
        const instructorClassResult = await instructorClassCollection.getAllByInstructorId("instructor3")
        expect(instructorClassResult.length).toEqual(1);
        expect(instructorClassResult[0].instructorId).toEqual("instructor3")
        })


})