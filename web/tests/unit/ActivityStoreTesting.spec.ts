import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useActivityStore } from "@/stores/ActivityStore";
const axios = require('axios')
jest.mock('axios')

describe('ActivityStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useActivityStore()
  })

  it('postActivities() mocks the axios.post call (through the api) and is sending an axios.post call successfully', async () => {
    axios.post= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            timestamp: 3.140473,
            questionText: "What is the call?",
            answers: [
                "No Foul Call",
                "Travel"
            ],
            correctAnswer: "Travel",
            videoclipId: "testVideo"
          }
        ]
      })
    const store = useActivityStore()
    const postedActivity = await store.postActivities(2.140473, "What is the call?", ["No Foul Call","Travel"], "Travel", "testVideo")
    expect(postedActivity.length).toEqual(1)
    expect(postedActivity[0].correctAnswer).toEqual("Travel")
  });

  it('fetchActivitiesByVideoClipId() mocks the axios.get call, sends an axios.get call successfully, and returns the retrieved videoclip', async () => {
    axios.get= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            timestamp: 3.140473,
            questionText: "What is the call?",
            answers: [
                "No Foul Call",
                "Travel"
            ],
            correctAnswer: "Travel",
            videoclipId: "testVideo"
          }
        ]
      })
    const store = useActivityStore()
    const retrievedActivity = await store.fetchActivitiesByVideoclipId("testVideo")
    expect(retrievedActivity.length).toEqual(1)
    expect(retrievedActivity[0].timestamp).toEqual(3.140473)
  });

  it('updateActivities() mocks the axios.patch call (through the api) and is sending an axios.patch call successfully', async () => {
    axios.patch= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            timestamp: 2.140473,
            questionText: "What is the call?",
            answers: [
                "No Foul Call",
                "Charge"
            ],
            correctAnswer: "Charge",
            videoclipId: "testVideo"
          }
        ]
      })
    const store = useActivityStore()
    const updatedActivity = await store.updateActivities("638f6362c5ea3845b73a18cd", 2.140473, "What is the call?", ["No Foul Call","Charge"], "Charge")
    expect(updatedActivity.length).toEqual(1)
    expect(updatedActivity[0].questionText).toEqual("What is the call?")
  });

  it('deleteActivities() mocks the axios.delete call (through the api) and is sending an axios.delete call successfully', async () => {
    axios.delete= jest.fn().mockResolvedValue({
      data: [{
            _id: "638f6362c5ea3845b73a18cd",
            timestamp: 2.040473,
            questionText: "What is the call?",
            answers: [
                "No Foul Call",
                "Charge"
            ],
            correctAnswer: "Charge",
            videoclipId: "testVideo"
          }
        ]
      })
    const store = useActivityStore()
    const deletedActivity = await store.deleteActivities("1234test")
    expect(deletedActivity.length).toEqual(1)
    expect(deletedActivity[0].questionText).toEqual("What is the call?")
  });
})