import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useFeedbackStore } from "@/stores/FeedbackStore";
const axios = require('axios')
jest.mock('axios')

describe('InstructorLessonStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useFeedbackStore()
  })

  it('postFeedback() mocks the axios.post call (through the api) and is sending an axios.post call successfully', async () => {
    axios.post= jest.fn().mockResolvedValue({
      data: [{
            _id: "798f6362c5ea38fnsl073a10f",
            videoclipId: "123TestVideoId",
            activityId: "testActivityId",
            timestamp: 4.390233,
            correctFeedback: "Correct! Nice job!",
            incorrectFeedback: "Incorrect! The correct answer is Travel."
          }
        ]
      })
    const store = useFeedbackStore()
    const postedFeedback = await store.postFeedback("123TestVideoId", "testActivityId", 4.390233, "Correct! Nice job!", "Incorrect! The correct answer is Travel.")
    expect(postedFeedback.length).toEqual(1)
    expect(postedFeedback[0]._id).toEqual("798f6362c5ea38fnsl073a10f")
    expect(postedFeedback[0].videoclipId).toEqual("123TestVideoId")
  });

  it('fetchFeedbackByVideoclipId() mocks the axios.get call (through the api) and retrieves the feedback by videoClip ID successfully', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "798f6362c5ea38fnsl073a10f",
            videoclipId: "123TestVideoId",
            activityId: "testActivityId",
            timestamp: 4.390233,
            correctFeedback: "Correct! Nice job!",
            incorrectFeedback: "Incorrect! The correct answer is Travel."
          }
        ]
      })
    const store = useFeedbackStore()
    const retrievedFeedback = await store.fetchFeedbackByVideoclipId("123TestVideoId")
    expect(retrievedFeedback[0]._id).toEqual("798f6362c5ea38fnsl073a10f")
    expect(retrievedFeedback[0].videoclipId).toEqual("123TestVideoId")
    expect(retrievedFeedback[0].correctFeedback).toEqual("Correct! Nice job!")
    expect(retrievedFeedback[0].incorrectFeedback).toEqual("Incorrect! The correct answer is Travel.")
  });

  it('updateFeedback() mocks the axios.put call (through the api) and is sending an axios.put call successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
      data: [{
                _id: "798f6362c5ea38fnsl073a10f",
                videoclipId: "123TestVideoId",
                activityId: "testActivityId",
                timestamp: 4.390233,
                correctFeedback: "You got the question correct!",
                incorrectFeedback: "Nice try! You got the question wrong."
            }
        ]
      })
    const store = useFeedbackStore()
    const updatedFeedback = await store.updateFeedback("798f6362c5ea38fnsl073a10f", "You got the question correct!", "Nice try! You got the question wrong.")
    expect(updatedFeedback.length).toEqual(1)
    expect(updatedFeedback[0].activityId).toEqual("testActivityId")
    expect(updatedFeedback[0].correctFeedback).toEqual("You got the question correct!")
  });

  it('deleteFeedback() mocks the axios.delete call (through the api) and deletes the lesson by ID successfully', async () => {
    axios.delete= jest.fn().mockResolvedValue({
        data: [{
            _id: "798f6362c5ea38fnsl073a10f",
            videoclipId: "123TestVideoId",
            activityId: "activityId",
            timestamp: 4.390233,
            correctFeedback: "You got the question correct!",
            incorrectFeedback: "Nice try! You got the question wrong."
          }
        ]
      })
    const store = useFeedbackStore()
    const deletedLesson = await store.deleteFeedback("798f6362c5ea38fnsl073a10f")
    expect(deletedLesson.length).toEqual(1)
    expect(deletedLesson[0].videoclipId).toEqual("123TestVideoId")
    expect(deletedLesson[0].timestamp).toEqual(4.390233)
    expect(deletedLesson[0].activityId).toEqual("activityId")
  });
})