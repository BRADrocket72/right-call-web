import Activity from "../../../mongo/Activity"
import ActivitySchema from "../../../mongo/schemas/ActivitySchema"

const testMongoDb = require('../testMongoDb')
const activityCollection :Activity =  new Activity()

let activityOneDoc;
beforeEach(async () => {
    const activityOne =new ActivitySchema( {timestamp:1,questionText:"test question",questionType:"eye tracking",videoclipId:"12",correctAnswer:"yes", answers:['yes','no']})
    const activityTwo =new ActivitySchema( {timestamp:2,questionText:"test question2",questionType:"eye tracking2",videoclipId:"123",correctAnswer:"yes2", answers:['yes2','no2']})
    const activityThree =new ActivitySchema( {timestamp:3,questionText:"test question3",questionType:"eye tracking3",videoclipId:"123",correctAnswer:"yes3", answers:['yes3','no3']})

     activityOneDoc = await activityOne.save();
     await activityTwo.save();
     await activityThree.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ 
    await testMongoDb.clearDatabase()
})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Delete Activities by Id',()=>{
    it('One activity', async () => {
        const activityResult = await activityCollection.findByIdAndDelete(activityOneDoc._id);
        const remainingDocs =await ActivitySchema.find()
        
        expect(activityResult._id).toStrictEqual(activityOneDoc._id)
        expect(remainingDocs.length).toBe(2)
    })

    it('Deleted activity is not in collection', async () => {
        await activityCollection.findByIdAndDelete(activityOneDoc._id);
        const remainingDocs =await ActivitySchema.find()
        
        const isDocInCollection: boolean = remainingDocs.includes(activityOneDoc);
        expect(isDocInCollection).toBe(false)
    })
})
