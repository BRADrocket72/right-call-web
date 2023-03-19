import VideoClip from "../../../mongo/VideoClip"
import VideoClipSchema from "../../../mongo/schemas/VideoClipSchema"

const testMongoDb = require('../testMongoDb')
const videoClipCollection :VideoClip =  new VideoClip()
let videoClipOneDoc;
beforeEach(async () => {
    const videoOne = new VideoClipSchema( {videoURL:"testUrl",videoName:"testVideo",timeStamps:[1,2,3]})
    const videoTwo = new VideoClipSchema( {videoURL:"testUrl2",videoName:"testVideo2",timeStamps:[4,5,6]})
    videoClipOneDoc = await videoOne.save();
    await videoTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Update video clip',()=>{
    it('one video is updated by its id', async () => {
        await videoClipCollection.updateVideoClip(videoClipOneDoc._id, {videoName:"testVideo", timeStamps: [7,8,9]});
              
        const videoAfterUpdate = await VideoClipSchema.findById(videoClipOneDoc._id);
        expect( videoAfterUpdate.timeStamps).toEqual([7,8,9]);
    })
})