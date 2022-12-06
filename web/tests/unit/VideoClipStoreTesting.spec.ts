// import axios from 'axios';
import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore";
const axios = require('axios')
jest.mock('axios')

describe('VideoClipStore API CALLS Unit TESTING', () => {
   let store: any;
   let videoClips: any;
  // let retrieveAllVideos: any
  // let retrieveSpecificVideo: any
  

  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useVideoClipStore()
    // retrieveAllVideos = await store.fetchVideoClips()
    
    // store = useVideoClipStore()
    // videoClips = await store.fetchVideoClips()
    // // create an instance of the data store
    // store = useVideoClipStore()
    // retrieveAllVideos = await store.fetchVideoClips()
    // retrieveSpecificVideo = await store.fetchVideoClipById('637a61d49db11c5b4dd1b3b8')
  })


  it('fetchVideoClips() mock calls axios.get (the api) successfully and retrieves all of the videos', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: "123test",
          videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
          timeStamps: [
            3.787164,
            11.369245,
            14.931583
          ],
        },
        {
          _id: "1234test",
          videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
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

  it('fetchVideoClipById() mock calls axios.get (the api) and is sending an axios.get call successfully', async () => {
    axios.get.mockResolvedValue({
        data: [
          {
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
            timeStamps: [
              3.787164,
              11.369245,
              14.931583
            ],
          }
        ]
      })
    const store = useVideoClipStore()
    const singleVideo = await store.fetchVideoClipById("1234test")
    expect(singleVideo[0]._id).toEqual("1234test")
  });

  it('fetchVideoClipById() mock calls axios.get (the api) and is sending an axios.get call successfully', async () => {
    axios.get.mockResolvedValue({
        data: [
          {
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v}",
            timeStamps: [
              3.787164,
              11.369245,
              14.931583
            ],
          }
        ]
      })
    const store = useVideoClipStore()
    const singleVideo = await store.fetchVideoClipById("1234test")
    expect(singleVideo[0]._id).toEqual("1234test")
  });

  it('postVideo() mock calls axios.post (through the api) and is sending an axios.post call successfully', async () => {
    const store = useVideoClipStore()
    store.postVideo = jest.fn().mockResolvedValue({
      data: [{
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
            timeStamps: [
              3.787164,
              11.369245
            ],
          }
        ]
      })
    const updatedVideo = await store.postVideo("videoFile")
    expect(updatedVideo.data[0]).toEqual({"_id": "1234test", "timeStamps": [3.787164, 11.369245], "videoURL": "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v"})
  });

  it('updateTimestamps() mock calls axios.patch (through the api) and is sending an axios.patch call successfully', async () => {
      axios.patch = jest.fn().mockResolvedValue({
        data: [{
              _id: "1234test",
              videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
              timeStamps: [
                3.787164,
                11.369245
              ],
            }
          ]
        })
    const store = useVideoClipStore()
    const updatedVideo = await store.updateTimestamps("1234test",[3.787164,11.369245])
    expect(updatedVideo[0]).toEqual({"_id": "1234test", "timeStamps": [3.787164, 11.369245], "videoURL": "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v"})
  });

  it('deleteVideoClip() mocks the axios.delete call (through the api) and is sending an axios.delete call successfully', async () => {
    axios.delete= jest.fn().mockResolvedValue({
      data: [{
            _id: "1234test",
            videoURL: "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/5e500989-3a03-47f6-81e4-7619643a7fe9-P15_Shooting_Foul_2.m4v",
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

})