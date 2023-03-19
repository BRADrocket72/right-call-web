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

describe('Delete video clip by id',()=>{
    it('first video is deleted', async () => {
        const deletedVideo = await videoClipCollection.deleteClipById(videoClipOneDoc._id);
        const remainingDocs =await VideoClipSchema.find()
              
        expect(deletedVideo.videoName).toStrictEqual(videoClipOneDoc.videoName)
        expect(remainingDocs.length).toBe(1)
    })
    it('Deleted video is not in collection', async () => {
        await videoClipCollection.deleteClipById(videoClipOneDoc._id);
        const remainingDocs =await VideoClipSchema.find()
        
        const isDocInCollection: boolean = remainingDocs.includes(videoClipOneDoc);
        expect(isDocInCollection).toBe(false)
    })
})