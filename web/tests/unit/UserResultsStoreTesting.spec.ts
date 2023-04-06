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
            quizName: "testQuiz"
        },
    })
    const postedResults = await store.postUserResults("testUser123", 100.00, "testLessonId", "testQuiz")
    expect(postedResults.score).toEqual(100.00)
  });

  it('fetchUserResults() mock calls axios.get (the api) successfully and mock retrieves all of the results for all users', async () => {
    axios.get.mockResolvedValue({
      data: 
        [{
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testQuizId",
            quizName: "testQuiz"
        }]
    })
    const allResults = await store.fetchUserResults()
    expect(allResults.length).toEqual(1)
    expect(allResults[0].quizId).toEqual("testQuizId")
  });

  it('fetchByUsername() mock calls axios.get (the api) successfully and mock retrieves all of the results for a specific user', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
            _id: "638eb09ce6833ae0f7e",
            username: "testUser123",
            score: 100.00,
            quizId: "testLessonId",
            quizName: "testQuiz"
        }]
    })

    const usersResults = await store.fetchByUserName("testUser123") 
    expect(usersResults.length).toEqual(1)
    expect(usersResults[0].username).toEqual("testUser123")
  });
})