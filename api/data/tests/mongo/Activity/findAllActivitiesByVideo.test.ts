import Activity from "../../../mongo/Activity"
import ActivitySchema from "../../../mongo/schemas/ActivitySchema"

const testMongoDb = require('./testMongoDb')
const activityCollection :Activity =  new Activity()

beforeEach(async () => {
    const activityOne =new ActivitySchema( {timestamp:1,questionText:"test question",questionType:"eye tracking",videoclipId:"12",correctAnswer:"yes", answers:['yes','no']})
    const activityTwo =new ActivitySchema( {timestamp:2,questionText:"test question2",questionType:"eye tracking2",videoclipId:"123",correctAnswer:"yes2", answers:['yes2','no2']})
    const activityThree =new ActivitySchema( {timestamp:3,questionText:"test question3",questionType:"eye tracking3",videoclipId:"123",correctAnswer:"yes3", answers:['yes3','no3']})

    await activityOne.save();
    await activityTwo.save();
    await activityThree.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ 
    await testMongoDb.clearDatabase()
})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get all activities with the same videoId',()=>{
    it('One activity', async () => {
        const activityResult = await activityCollection.findAllByVideoId("12");
              
        expect(activityResult.length).toEqual(1);
        expect(activityResult[0].timestamp).toEqual(1)
    })

    it('Two activities', async () => {
        const activityResult = await activityCollection.findAllByVideoId("123");
              
        expect(activityResult.length).toEqual(2);
        expect(activityResult[0].timestamp).toEqual(2)
        expect(activityResult[1].timestamp).toEqual(3)
    })
})
