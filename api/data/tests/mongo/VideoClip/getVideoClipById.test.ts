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

describe('Get video by id',()=>{
    it('one video is retrieved by id', async () => {
        const retrievedVideo = await videoClipCollection.getVideoClipById(videoClipOneDoc._id);
              
        expect(retrievedVideo.videoName).toEqual("testVideo")
        expect(retrievedVideo.timeStamps.length).toEqual(3)
    })
})
