import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useInstructorLessonStore } from "@/stores/InstructorLessonStore";
const axios = require('axios')
jest.mock('axios')

describe('InstructorLessonStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useInstructorLessonStore()
  })

  it('postInstructorLesson() mocks the axios.post call (through the api) and is sending an axios.post call successfully', async () => {
    axios.post= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            name: "Test Instructor Lesson",
            instructorId: "sampleInstructorLesson123",
            description: "This is a test instructor lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2",
                "testVideo3"
            ]
          }
        ]
      })
    const store = useInstructorLessonStore()
    const postedInstructorLesson = await store.postInstructorLesson("Test Instructor Lesson", "sampleInstructorLesson123", "This is a test instructor lesson.", ["testVideo1","testVideo2","testVideo3"])
    expect(postedInstructorLesson.length).toEqual(1)
    expect(postedInstructorLesson[0]._id).toEqual("638f6362c5ea3845b73a18cd")
    expect(postedInstructorLesson[0].instructorId).toEqual("sampleInstructorLesson123")
  });

  it('getAllInstructorLessons() mocks the axios.get call, sends an axios.get call successfully, and returns all instructor lessons', async () => {
    axios.get= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            name: "Test Instructor Lesson",
            instructorId: "sampleInstructorLesson123",
            description: "This is a test instructor lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2",
                "testVideo3"
            ]
          },
          {
            _id: "d7nm0903rji21sthds3i4ht459",
            name: "Test Instructor Lesson 2",
            instructorId: "secondTestLesson",
            description: "2nd test instructor lesson.",
            videoClipsArray: [
                "testVideoExample"
            ]
          }
        ]
      })
    const store = useInstructorLessonStore()
    const retrievedInstructorLessons = await store.getAllInstructorLessons()
    expect(retrievedInstructorLessons.length).toEqual(2)
    expect(retrievedInstructorLessons[0].videoClipsArray.length).toEqual(3)
    expect(retrievedInstructorLessons[1].name).toEqual("Test Instructor Lesson 2")
  });

  it('getLessonsByInstructorId() mocks the axios.get call (through the api) and retrieves the lessons by instructor ID successfully', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "638f6362c5ea3845b73a18cd",
            name: "Test Instructor Lesson",
            instructorId: "sampleInstructorLesson123",
            description: "This is a test instructor lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2",
                "testVideo3"
            ]
          }
        ]
      })
    const store = useInstructorLessonStore()
    const retrievedLesson = await store.getLessonsByInstructorId("sampleInstructorLesson123")
    expect(retrievedLesson[0]._id).toEqual("638f6362c5ea3845b73a18cd")
    expect(retrievedLesson[0].instructorId).toEqual("sampleInstructorLesson123")
  });

  it('updateInstructorLessonName() mocks the axios.put call (through the api) and is sending an axios.put call successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            name: "New Lesson Name",
            instructorId: "sampleInstructorLesson123",
            description: "This is a test instructor lesson.",
            videoClipsArray: [
                "testVideo1",
                "testVideo2",
                "testVideo3"
            ]
          }
        ]
      })
    const store = useInstructorLessonStore()
    const updatedLesson = await store.updateInstructorLessonName("12sdf453nlsla347p3a90233", "New Lesson Name")
    expect(updatedLesson.length).toEqual(1)
    expect(updatedLesson[0].name).toEqual("New Lesson Name")
    expect(updatedLesson[0].description).toEqual("This is a test instructor lesson.")
  });

  it('fetchLessonById() mocks the axios.get call (through the api) and retrieves the lessons by ID successfully', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "d7nm0903rji21sthds3i4ht459",
            name: "Test Instructor Lesson 2",
            instructorId: "secondTestLesson",
            description: "2nd test instructor lesson.",
            videoClipsArray: [
                "testVideoExample"
            ]
          }
        ]
      })
    const store = useInstructorLessonStore()
    const retrievedLesson = await store.fetchLessonById("d7nm0903rji21sthds3i4ht459")
    expect(retrievedLesson.length).toEqual(1)
    expect(retrievedLesson[0].name).toEqual("Test Instructor Lesson 2")
    expect(retrievedLesson[0].videoClipsArray.length).toEqual(1)
  });
})