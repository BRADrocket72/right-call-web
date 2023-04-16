import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useLessonStore } from "@/stores/LessonsStore";
const axios = require('axios')
jest.mock('axios')

describe('InstructorLessonStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useLessonStore()
  })

  it('postLesson() mocks the axios.post call (through the api) and is sending an axios.post call successfully', async () => {
    axios.post= jest.fn().mockResolvedValue({
      data: [{
            _id: "123flknd8nw0r2930jd09n043",
            name: "Test Lesson",
            description: "This is a test lesson.",
            videoClipsArray: [
                "firstVideo",
                "secondVideo",
                "thirdVideo"
            ]
          }
        ]
      })
    const store = useLessonStore()
    const postedLesson = await store.postLesson("Test Lesson", "Admin", "This is a test lesson.", ["firstVideo","secondVideo","thirdVideo"])
    expect(postedLesson.length).toEqual(1)
    expect(postedLesson[0]._id).toEqual("123flknd8nw0r2930jd09n043")
    expect(postedLesson[0].name).toEqual("Test Lesson")
  });

  it('postLesson() mock fails and catches error successfully', async () => {
    axios.post.mockRejectedValueOnce()
    const postedLesson = await store.postLesson("Test Lesson", "Admin", "This is a test lesson.", ["firstVideo","secondVideo","thirdVideo"])
    expect(postedLesson).toEqual(undefined)
  });

  it('getAllLessons() mocks the axios.get call, sends an axios.get call successfully, and returns all lessons', async () => {
    axios.get= jest.fn().mockResolvedValue({
      data: [{
            _id: "123flknd8nw0r2930jd09n043",
            name: "Test Lesson",
            description: "This is a test lesson.",
            videoClipsArray: [
                "firstVideo",
                "secondVideo",
                "thirdVideo"
            ]
          },
          {
            _id: "a7nm0903rji21sthds3fj90859",
            name: "2nd Test Lesson",
            description: "2nd test lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2"
            ]
          }
        ]
      })
    const store = useLessonStore()
    const retrievedLessons = await store.getAllLessons()
    expect(retrievedLessons.length).toEqual(2)
    expect(retrievedLessons[0]._id).toEqual("123flknd8nw0r2930jd09n043")
    expect(retrievedLessons[1].videoClipsArray.length).toEqual(2)
    expect(retrievedLessons[1].name).toEqual("2nd Test Lesson")
  });

  it('getAllLessons() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const retrievedLessons = await store.getAllLessons()
    expect(retrievedLessons).toEqual(undefined)
  });

  it('getLessonById() mocks the axios.get call (through the api) and retrieves the lessons by ID successfully', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "a7nm0903rji21sthds3fj90859",
            name: "2nd Test Lesson",
            description: "2nd test lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2"
            ]
          }
        ]
      })
    const store = useLessonStore()
    const retrievedLesson = await store.getLessonById("a7nm0903rji21sthds3fj90859")
    expect(retrievedLesson[0]._id).toEqual("a7nm0903rji21sthds3fj90859")
    expect(retrievedLesson[0].description).toEqual("2nd test lesson.")
  });

  it('getLessonById() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const retrievedLesson = await store.getLessonById("a7nm0903rji21sthds3fj90859")
    expect(retrievedLesson).toEqual(undefined)
  });

  it('updateLessonName() mocks the axios.put call (through the api) and is sending an axios.put call successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
      data: [{
                _id: "a7nm0903rji21sthds3fj90859",
                name: "New Lesson Name",
                description: "2nd test lesson.",
                videoClipsArray: [
                    "testVideo1",
                    "testVideo2"
                ]
            }
        ]
      })
    const store = useLessonStore()
    const updatedLesson = await store.updateLessonName("638f6362c5ea3845b73a18cd", "New Lesson Name")
    expect(updatedLesson.length).toEqual(1)
    expect(updatedLesson[0].name).toEqual("New Lesson Name")
    expect(updatedLesson[0]._id).toEqual("a7nm0903rji21sthds3fj90859")
  });

  it('updateLessonName() mock fails and catches error successfully', async () => {
    axios.put.mockRejectedValueOnce()
    const updatedLesson = await store.updateLessonName("638f6362c5ea3845b73a18cd", "New Lesson Name")
    expect(updatedLesson).toEqual(undefined)
  });

  it('deleteLesson() mocks the axios.delete call (through the api) and delete the lesson by ID successfully', async () => {
    axios.delete= jest.fn().mockResolvedValue({
        data: [{
            _id: "a7nm0903rji21sthds3fj90859",
            name: "New Lesson Name",
            description: "2nd test lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2"
            ]
        }
        ]
      })
    const store = useLessonStore()
    const deletedLesson = await store.deleteLesson("a7nm0903rji21sthds3fj90859")
    expect(deletedLesson.length).toEqual(1)
    expect(deletedLesson[0]._id).toEqual("a7nm0903rji21sthds3fj90859")
    expect(deletedLesson[0].videoClipsArray.length).toEqual(2)
  });

  it('deleteLesson() mock fails and catches error successfully', async () => {
    axios.delete.mockRejectedValueOnce()
    const deletedLesson = await store.deleteLesson("a7nm0903rji21sthds3fj90859")
    expect(deletedLesson).toEqual(undefined)
  });  

  it('updateVideoClipsArray() mocks the axios.put call (through the api) and updates the videoClipsArray successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
        data: [{
            _id: "a7nm0903rji21sthds3fj90859",
            name: "New Lesson Name",
            description: "2nd test lesson.",
            videoClipsArray: []
        }
        ]
      })
    const store = useLessonStore()
    const updatedLesson = await store.updateVideoClipsArray("a7nm0903rji21sthds3fj90859", [])
    expect(updatedLesson.length).toEqual(1)
    expect(updatedLesson[0]._id).toEqual("a7nm0903rji21sthds3fj90859")
    expect(updatedLesson[0].videoClipsArray.length).toEqual(0)
  });

  it('updateVideoClipsArray() mock fails and catches error successfully', async () => {
    axios.put.mockRejectedValueOnce()
    const updatedLesson = await store.updateVideoClipsArray("a7nm0903rji21sthds3fj90859", [])
    expect(updatedLesson).toEqual(undefined)
  });  
})