// import axios from 'axios';
import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore";

describe('API CALLS INTEGRATION TESTING', () => {
  let store = null
  let retrieveAllVideos: any
  let retrieveSpecificVideo: any

  beforeAll(async () => {
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useVideoClipStore()
    retrieveAllVideos = await store.fetchVideoClips()
    retrieveSpecificVideo = await store.fetchVideoClipById('637a61d49db11c5b4dd1b3b8')
  })

  it('fetchVideoClips() retrieves the correct amount of videos from the DB', async () => {
    await expect(retrieveAllVideos.length).toBeGreaterThan(1)
  });
  it('fetchVideoClips() retrieves the correct Videos from a db', async () => {
    await expect(retrieveAllVideos[0]._id).toEqual("637a61d49db11c5b4dd1b3b8")
  });
  it('fetchVideoClipById() retrieves the correct videos by id successfully from a db', async () => {
    await expect(retrieveSpecificVideo.timeStamps.length).toBeGreaterThan(0)
  });
})