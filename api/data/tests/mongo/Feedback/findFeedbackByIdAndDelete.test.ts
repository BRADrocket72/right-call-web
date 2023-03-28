import Feedback from "../../../mongo/Feedback"
import FeedbackSchema from "../../../mongo/schemas/FeedbackSchema"

const testMongoDb = require('../testMongoDb')
const feedbackCollection :Feedback =  new Feedback()

let feedbackOneDoc;
beforeEach(async () => {
    const feedbackOne =new FeedbackSchema( {videoclipId:"videoclipId",activityId:"activityId",timestamp:5.123456,correctFeedback:"Correct! Nice job!",incorrectFeedback:"Nice try!"})
    const feedbackTwo =new FeedbackSchema( {videoclipId:"videoclipId2",activityId:"activityId2",timestamp:10.459456,correctFeedback:"You answered correctly!",incorrectFeedback:"Nice try! Good luck next time!"})
    
    feedbackOneDoc = await feedbackOne.save();
    await feedbackTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Delete Feedback by Id',()=>{
    it('One feedback', async () => {
        const feedbackResult = await feedbackCollection.findByIdAndDelete(feedbackOneDoc._id);
        const remainingDocs =await FeedbackSchema.find()
        
        expect(feedbackResult._id).toStrictEqual(feedbackOneDoc._id)
        expect(remainingDocs.length).toBe(1)
    })

    it('Deleted feedback is not in collection', async () => {
        await feedbackCollection.findByIdAndDelete(feedbackOneDoc._id);
        const remainingDocs =await FeedbackSchema.find()
        
        const isDocInCollection: boolean = remainingDocs.includes(feedbackOneDoc);
        expect(isDocInCollection).toBe(false)
    })
})
