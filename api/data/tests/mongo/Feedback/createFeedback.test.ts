import { FeedbackDto } from "../../../model/FeedbackDto"
import Feedback from "../../../mongo/Feedback"
import FeedbackSchema from "../../../mongo/schemas/FeedbackSchema"


const testMongoDb = require('../testMongoDb')
const feedbackCollection :Feedback =  new Feedback()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Feedback created when',()=>{
    it('First Feedback', async () => {
        const feedbackOne: FeedbackDto = {videoclipId:"videoclipId",activityId:"activityId",timestamp:5.123456,correctFeedback:"Correct! Nice job!",incorrectFeedback:"Nice try!"}
        const feedbackResult = await feedbackCollection.createFeedback(feedbackOne);
        const foundFeedback = await FeedbackSchema.findById(feedbackResult._id);
              
        expect(foundFeedback.timestamp).toEqual(5.123456);
        expect(foundFeedback.videoclipId).toEqual("videoclipId");
        expect(foundFeedback.activityId).toEqual("activityId");
        expect(foundFeedback.incorrectFeedback).toEqual("Nice try!");
        expect(foundFeedback.correctFeedback).toEqual("Correct! Nice job!");
        expect(foundFeedback._id).toBeTruthy();
    })
})


