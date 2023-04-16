import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserResultsStore } from "@/stores/UserResultsStore";
const axios = require('axios')
jest.mock('axios')

describe('UserStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useUserResultsStore()
  })


  it('postUserResults() mock calls axios.post (the api) successfully and mock posts the users results for the lesson', async () => {
    axios.post.mockResolvedValue({
      data: 
        {
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testQuizId",
            quizName: "testQuiz",
            questionTimes: []
        },
    })
    const postedResults = await store.postUserResults("testUser123", 100.00, "testLessonId", "testQuiz")
    expect(postedResults.score).toEqual(100.00)
  });

  it('postUserResults() mock fails and catches error successfully', async () => {
    axios.post.mockRejectedValueOnce()
    const postedResults = await store.postUserResults("testUser123", 100.00, "testLessonId", "testQuiz")
    expect(postedResults).toEqual(undefined)
  });


  it('fetchUserResults() mock calls axios.get (the api) successfully and mock retrieves all of the results for all users', async () => {
    axios.get.mockResolvedValue({
      data: 
        [{
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testQuizId",
            quizName: "testQuiz",
            questionTimes: []
        }]
    })
    const allResults = await store.fetchUserResults()
    expect(allResults.length).toEqual(1)
    expect(allResults[0].quizId).toEqual("testQuizId")
  });

  it('fetchUserResults() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const allResults = await store.fetchUserResults()
    expect(allResults).toEqual(undefined)
  });

  it('fetchByUsername() mock calls axios.get (the api) successfully and mock retrieves all of the results for a specific user', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testLessonId",
            quizName: "testQuiz",
            questionTimes: []
        }]
    })

    const usersResults = await store.fetchByUserName("testUser123") 
    expect(usersResults.length).toEqual(1)
    expect(usersResults[0].username).toEqual("testUser123")
  });

  it('fetchByUserName() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const usersResults = await store.fetchByUserName("testUser123")
    expect(usersResults).toEqual(undefined)
  });

  it('getByQuizId() mock calls axios.get (the api) successfully and mock retrieves all of the results by quiz id', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testLessonId",
            quizName: "testQuiz",
            questionTimes: []
        }]
    })

    const quizIdResults = await store.getByQuizId("testLessonId") 
    expect(quizIdResults.length).toEqual(1)
    expect(quizIdResults[0].questionTimes.length).toEqual(0)
    expect(quizIdResults[0].quizId).toEqual('testLessonId')
  });

  it('getByQuizId() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const quizIdResults = await store.getByQuizId("testLessonId")
    expect(quizIdResults).toEqual(undefined)
  });

  it('getHighestResults() mock calls axios.get (the api) successfully and mock retrieves an array sorted by highest to lowest scores', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testLessonId",
            quizName: "testQuiz",
            questionTimes: []
        },
        {
          _id: "123459ce6833ae0f7e",
          username: "testUser123",
          score: 95.00,
          quizId: "testLessonId",
          quizName: "testQuiz",
          questionTimes: [{"questionName": "Question 1", "questionTime": 1.34}]
        }
      ]
    })

    const highestResults = await store.getHighestResults("testUser123") 
    expect(highestResults.length).toEqual(2)
    expect(highestResults[0].username).toEqual("testUser123")
    expect(highestResults[0]._id).toEqual("638eb09ce6833ae0f7e")
    expect(highestResults[0].score).toEqual(100.00)
    expect(highestResults[1].score).toEqual(95.00)
    expect(highestResults[1]._id).toEqual("123459ce6833ae0f7e")
    expect(highestResults[1].quizId).toEqual("testLessonId")
  });

  it('getHighestResults() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const highestResults = await store.getHighestResults("testUser123")
    expect(highestResults).toEqual(undefined)
  });
})