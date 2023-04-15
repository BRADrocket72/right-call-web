import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useInstructorClassStore } from "@/stores/InstructorClassStore";
const axios = require('axios')
jest.mock('axios')

describe('ActivityStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useInstructorClassStore()
  })

  it('postInstructorClass() mocks the axios.post call (through the api) and is sending an axios.post call successfully', async () => {
    axios.post= jest.fn().mockResolvedValue({
      data: [{
            _id: "abcd123456789jfsf03u40238j",
            instructorId: "testId123",
            className: "Test Class",
            videoClipIds: [
                "video1",
                "video2"
            ],
            studentIds: [
                "student1",
                "student2"
            ]
          }
        ]
      })
    const store = useInstructorClassStore()
    const postedClass = await store.postInstructorClass("testId123", "Test Class", ["video1", "video2"], ["student1", "student2"])
    expect(postedClass.length).toEqual(1)
    expect(postedClass[0].instructorId).toEqual("testId123")
    expect(postedClass[0].videoClipIds.length).toEqual(2)
  });

  it('postInstructorClass() mock fails and catches error successfully', async () => {
    axios.post.mockRejectedValueOnce()
    const postedClass = await store.postInstructorClass("testId123", "Test Class", ["video1", "video2"], ["student1", "student2"])
    expect(postedClass).toEqual(undefined)
  });

  it('getClassesByInstructorId() mocks the axios.get call, sends an axios.get call successfully, and returns the retrieved class', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "abcd123456789jfsf03u40238j",
            instructorId: "testId123",
            className: "Test Class",
            videoClipIds: [
                "video1",
                "video2"
            ],
            studentIds: [
                "student1",
                "student2"
            ]
          }
        ]
      })
    const store = useInstructorClassStore()
    const retrievedClass = await store.getClassesByInstructorId("testId123")
    expect(retrievedClass.length).toEqual(1)
    expect(retrievedClass[0]._id).toEqual("abcd123456789jfsf03u40238j")
  });

  it('getClassesByInstructorId() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const retrievedClass = await store.getClassesByInstructorId("testId123")
    expect(retrievedClass).toEqual(undefined)
  });

  it('addVideoClipToClass() mocks the axios.put call (through the api) and is sending an axios.put call successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
        data: [{
            _id: "abcd123456789jfsf03u40238j",
            instructorId: "testId123",
            className: "Test Class",
            videoClipIds: [
                "newId1",
                "newId2"
            ],
            studentIds: [
                "student1",
                "student2"
            ]
          }
        ]
      })
    const store = useInstructorClassStore()
    const updatedClass = await store.addVideoClipToClass("abcd123456789jfsf03u40238j", ["newId1", "newId2"])
    expect(updatedClass.length).toEqual(1)
    expect(updatedClass[0].videoClipIds[0]).toEqual("newId1")
    expect(updatedClass[0].videoClipIds[1]).toEqual("newId2")
  });

  it('addVideoClipToClass() mock fails and catches error successfully', async () => {
    axios.put.mockRejectedValueOnce()
    const updatedClass = await store.addVideoClipToClass("abcd123456789jfsf03u40238j", ["newId1", "newId2"])
    expect(updatedClass).toEqual(undefined)
  });

  it('fetchAllInstructorClasses() mocks the axios.get call (through the api) and is sending an axios.get call successfully', async () => {
    axios.get= jest.fn().mockResolvedValue({
        data: [{
            _id: "abcd123456789jfsf03u40238j",
            instructorId: "testId123",
            className: "Test Class",
            videoClipIds: [
                "newId1"
            ],
            studentIds: [
                "student1"
            ]
          },
          {
            _id: "123d1230974389jfsf03u7fl349j",
            instructorId: "testId123456",
            className: "Test Class 2",
            videoClipIds: [
                "newId1",
                "newId2",
                "newId3"
            ],
            studentIds: [
                "student1",
                "student2",
                "student4"
            ]
          }
        ]
      })
    const store = useInstructorClassStore()
    const allClasses = await store.fetchAllInstructorClasses()
    expect(allClasses.length).toEqual(2)
    expect(allClasses[0].videoClipIds.length).toEqual(1)
    expect(allClasses[1].studentIds[2]).toEqual("student4")
  });

  it('fetchAllInstructorClasses() mock fails and catches error successfully', async () => {
    axios.get.mockRejectedValueOnce()
    const allClasses = await store.fetchAllInstructorClasses()
    expect(allClasses).toEqual(undefined)
  });

  it('updateStudentIdsList() mocks the axios.put call (through the api) and is sending an axios.put call successfully', async () => {
    axios.put= jest.fn().mockResolvedValue({
        data: [{
            _id: "abcd123456789jfsf03u40238j",
            instructorId: "testId123",
            className: "Test Class",
            videoClipIds: [
                "newId1"
            ],
            studentIds: [
                "student1",
                "student10"
            ]
          }
        ]
      })
    const store = useInstructorClassStore()
    const updatedClassStudentList = await store.updateStudentIdsList("abcd123456789jfsf03u40238j", ["student1", "student10"])
    expect(updatedClassStudentList.length).toEqual(1)
    expect(updatedClassStudentList[0].studentIds.length).toEqual(2)
    expect(updatedClassStudentList[0].studentIds[1]).toEqual("student10")
  });

  it('updateStudentIdsList() mock fails and catches error successfully', async () => {
    axios.put.mockRejectedValueOnce()
    const updatedClassStudentList = await store.updateStudentIdsList("abcd123456789jfsf03u40238j", ["student1", "student10"])
    expect(updatedClassStudentList).toEqual(undefined)
  });
})