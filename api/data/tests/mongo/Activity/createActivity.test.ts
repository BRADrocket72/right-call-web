import { ActivityDto } from "../../../model/ActivityDto"
import Activity from "../../../mongo/Activity"
import ActivitySchema from "../../../mongo/schemas/ActivitySchema"


const testMongoDb = require('./testMongoDb')
const activityCollection :Activity =  new Activity()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Activity created when',()=>{
    it('First Activity', async () => {
        const activityOne: ActivityDto = {timestamp:1,questionText:"test question",questionType:"eye tracking",videoclipId:"12",correctAnswer:"yes", answers:['yes','no']}
        const activityResult = await activityCollection.createActivity(activityOne);
        const foundActivity = await ActivitySchema.findById(activityResult._id);
              
        expect(foundActivity.timestamp).toEqual(1);
        expect(foundActivity.questionText).toEqual("test question");
        expect(foundActivity.questionType).toEqual("eye tracking");
        expect(foundActivity.videoclipId).toEqual("12");
        expect(foundActivity.correctAnswer).toEqual("yes");
        expect(foundActivity.answers).toEqual(['yes','no']);
        expect(foundActivity._id).toBeTruthy();
    })
})



