import VideoClip from "../../../mongo/VideoClip"
import VideoClipSchema from "../../../mongo/schemas/VideoClipSchema"

const testMongoDb = require('../testMongoDb')
const videoClipCollection :VideoClip =  new VideoClip()
beforeEach(async () => {
    const videoOne = new VideoClipSchema( {videoURL:"testUrl",videoName:"testVideo",timeStamps:[1,2,3]})
    const videoTwo = new VideoClipSchema( {videoURL:"testUrl2",videoName:"testVideo2",timeStamps:[4,5,6]})
    await videoOne.save();
    await videoTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ await testMongoDb.clearDatabase()})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get all video clips',()=>{
    it('Two videos are retrieved', async () => {
        const allVideoClips = await videoClipCollection.getAllVideoClips();
              
        expect(allVideoClips.length).toEqual(2);
        expect(allVideoClips[0].videoName).toEqual("testVideo")
        expect(allVideoClips[1].videoName).toEqual('testVideo2')
    })
})
