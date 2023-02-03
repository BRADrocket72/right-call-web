import Activity from "../../../mongo/Activity"
import ActivitySchema from "../../../mongo/schemas/ActivitySchema"


const testMongoDb = require('../testMongoDb')
const activityCollection :Activity =  new Activity()

let activityOneDoc;

beforeEach(async () => {
    const activityOne =new ActivitySchema( {timestamp:1,questionText:"test question",questionType:"eye tracking",videoclipId:"12",correctAnswer:"yes", answers:['yes','no']})
    activityOneDoc =  await activityOne.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ 
    await testMongoDb.clearDatabase()
})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Update Activity',()=>{
    it('Change Timestamp', async () => {
        const changedActivity = activityOneDoc;
        changedActivity.timestamp = 12
        const activityResult = await activityCollection.update(activityOneDoc._id, changedActivity);
        
        const activityAfterUpdate = await ActivitySchema.findById(activityOneDoc._id);

              
        expect( activityAfterUpdate.timestamp).toEqual(12);
        expect(activityResult).toEqual(activityAfterUpdate)
    })
})