import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore";
const axios = require('axios')
jest.mock('axios')

describe('VideoClipStore API CALLS Unit TESTING', () => {
   let store: any;
   let videoClips: any;
  

  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useVideoClipStore()
  })


  it('fetchVideoClips() mock calls axios.get (the api) successfully and retrieves all of the videos', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: "123test",
          videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
          videoName: "Test Video 2",
          timeStamps: [
            3.787164,
            11.369245,
            14.931583
          ],
        },
        {
          _id: "1234test",
          videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
          videoName: "Test Video",
          timeStamps: [
            3.787164,
            11.369245,
            14.931583
          ],
        }
      ]
    })
    videoClips = await store.fetchVideoClips()
    expect(videoClips.length).toEqual(2)
  });

  it('fetchVideoClips() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const videoclips = await store.fetchVideoClips()
    expect(videoclips).toEqual(undefined)
  });  

  it('fetchVideoClipById() mock calls axios.get (the api) and is sending an axios.get call successfully', async () => {
    axios.get.mockResolvedValue({
        data: [
          {
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
            videoName: "Test Video",
            timeStamps: [
              3.787164,
              11.369245,
              14.931583
            ],
          }
        ]
      })
    const singleVideo = await store.fetchVideoClipById("1234test")
    expect(singleVideo[0]._id).toEqual("1234test")
  });

  it('fetchVideoClipById() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const singleVideo = await store.fetchVideoClipById("1234test")
    expect(singleVideo).toEqual(undefined)
  });  

  it('postVideo() mock calls axios.post (through the api) and is sending an axios.post call successfully', async () => {
      axios.post = jest.fn().mockResolvedValue({
        data: {
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
            videoName: "Test Video",
            timeStamps: [
              3.787164,
              11.369245
            ]
          }
      })
      store.postVideo = jest.fn().mockResolvedValue({
        data: {
              _id: "1234test",
              videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
              videoName: "Test Video",
              timeStamps: [
                3.787164,
                11.369245
              ]
            }
        })
    const postedVideo = await store.postVideo("videoFile", "Test Video")
    expect(postedVideo.data._id).toEqual("1234test")
    expect(postedVideo.data.videoName).toEqual("Test Video")
  });

  it('postInstructorsCustomizedVideo() mock calls axios.post (through the api) and is sending an axios.post call successfully', async () => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
            _id: "testVideo2",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Personal_Foul.m4v",
            videoName: "New Test Video",
            timeStamps: [
              1.692850,
              7.324242, 
              18.349548
            ]
          }
      })
    const postedCustomVideo = await store.postInstructorsCustomizedVideo("New Test Video", "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Personal_Foul.m4v", [1.692850 ,7.324242, 18.349548])
    expect(postedCustomVideo._id).toEqual("testVideo2")
    expect(postedCustomVideo.timeStamps.length).toEqual(3)
    expect(postedCustomVideo.videoName).toEqual("New Test Video")
  });

  it('postInstructorsCustomizedVideo() mock fails and catches error successfully', async () => {
    axios.post.mockRejectedValueOnce()
    const postedCustomVideo = await store.postInstructorsCustomizedVideo("New Test Video", "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Personal_Foul.m4v", [1.692850 ,7.324242, 18.349548])
    expect(postedCustomVideo).toEqual(undefined)
  });  

  it('updateTimestamps() mock calls axios.put (through the api) and is sending an axios.put call successfully', async () => {
      axios.put = jest.fn().mockResolvedValue({
        data: [{
              _id: "1234test",
              videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
              videoName: "Test Video",
              timeStamps: [
                3.787164,
                11.369245
              ],
            }
          ]
        })
    const store = useVideoClipStore()
    const updatedVideo = await store.updateTimestamps("1234test",[3.787164,11.369245])
    expect(updatedVideo[0]).toEqual({"_id": "1234test", "videoURL": "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v", "videoName": "Test Video", "timeStamps": [3.787164, 11.369245]})
  });

  it('updateTimestamps() mock fails and catches error successfully', async () => {
    axios.put.mockRejectedValueOnce()
    const updatedVideo = await store.updateTimestamps("1234test",[3.787164,11.369245])
    expect(updatedVideo).toEqual(undefined)
  });  

  it('deleteVideoClip() mocks the axios.delete call (through the api) and is sending an axios.delete call successfully', async () => {
    axios.delete= jest.fn().mockResolvedValue({
      data: [{
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
            videoName: "Test Video",
            timeStamps: [
              3.787164,
              11.369245
            ],
          }
        ]
      })
    const store = useVideoClipStore()
    const deletedVideo = await store.deleteVideoClip("1234test")
    expect(deletedVideo.length).toEqual(1)
    expect(deletedVideo[0]._id).toEqual("1234test")
  });

  it('deleteVideoClip() mock fails and catches error successfully', async () => {
    axios.delete.mockRejectedValueOnce()
    const deletedVideo = await store.deleteVideoClip("1234test")
    expect(deletedVideo).toEqual(undefined)
  }); 
})