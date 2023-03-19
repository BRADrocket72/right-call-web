import Feedback from "../../../mongo/Feedback"
import FeedbackSchema from "../../../mongo/schemas/FeedbackSchema"

const testMongoDb = require('../testMongoDb')
const feedbackCollection :Feedback =  new Feedback()

let feedbackOneDoc;

beforeEach(async () => {
    const feedbackOne =new FeedbackSchema( {videoclipId:"videoclipId",activityId:"activityId",timestamp:5.123456,correctFeedback:"Correct! Nice job!",incorrectFeedback:"Nice try!"})
    feedbackOneDoc =  await feedbackOne.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Update Feedback',()=>{
    it('Change Timestamp', async () => {
        const changedFeedback = feedbackOneDoc;
        changedFeedback.timestamp = 27
        const feedbackResult = await feedbackCollection.update(feedbackOneDoc._id, changedFeedback);
        
        const feedbackAfterUpdate = await FeedbackSchema.findById(feedbackOneDoc._id);

              
        expect( feedbackAfterUpdate.timestamp).toEqual(27);
        expect(feedbackResult).toEqual(feedbackAfterUpdate)
    })
})