import Feedback from "../../../mongo/Feedback"
import FeedbackSchema from "../../../mongo/schemas/FeedbackSchema"

const testMongoDb = require('../testMongoDb')
const feedbackCollection :Feedback =  new Feedback()
beforeEach(async () => {
    const feedbackOne =new FeedbackSchema( {videoclipId:"videoclipId",activityId:"activityId",timestamp:5.123456,correctFeedback:"Correct! Nice job!",incorrectFeedback:"Nice try!"})
    const feedbackTwo =new FeedbackSchema( {videoclipId:"videoclipId2",activityId:"activityId2",timestamp:10.459456,correctFeedback:"You answered correctly!",incorrectFeedback:"Nice try! Good luck next time!"})
    await feedbackOne.save();
    await feedbackTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get all feedback',()=>{
    it('Two feedbacks are retrieved', async () => {
        const allFeedbackObjects = await feedbackCollection.getAll();
              
        expect(allFeedbackObjects.length).toEqual(2);
        expect(allFeedbackObjects[0].timestamp).toEqual(5.123456)
        expect(allFeedbackObjects[0].videoclipId).toEqual('videoclipId')
        expect(allFeedbackObjects[1].timestamp).toEqual(10.459456)
        expect(allFeedbackObjects[1].videoclipId).toEqual('videoclipId2')
    })
})
