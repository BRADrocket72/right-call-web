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

describe('Get feedback by video ID',()=>{
    it('One feedback object is retrieved by the first video ID', async () => {
        const retrievedFeedbackById = await feedbackCollection.findAllByVideoId("videoclipId");
              
        expect(retrievedFeedbackById.length).toEqual(1);
        expect(retrievedFeedbackById[0].timestamp).toEqual(5.123456)
        expect(retrievedFeedbackById[0].videoclipId).toEqual('videoclipId')
        expect(retrievedFeedbackById[0].correctFeedback).toEqual('Correct! Nice job!')
    })

    it('One feedback object is retrieved by the second video ID', async () => {
        const retrievedFeedbackById = await feedbackCollection.findAllByVideoId("videoclipId2");
              
        expect(retrievedFeedbackById.length).toEqual(1);
        expect(retrievedFeedbackById[0].timestamp).toEqual(10.459456)
        expect(retrievedFeedbackById[0].videoclipId).toEqual('videoclipId2')
        expect(retrievedFeedbackById[0].correctFeedback).toEqual('You answered correctly!')
    })
})
