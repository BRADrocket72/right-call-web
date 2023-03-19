import 'jest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from "@/stores/UserStore";
const axios = require('axios')
jest.mock('axios')

describe('UserStore API CALLS Unit TESTING', () => {
   let store: any;
  
  beforeAll(async () => {
    setActivePinia(createPinia())
    store = useUsersStore()
  })


  it('postUser() mock calls axios.post (the api) successfully and mock registers an admin by returning the registered users data', async () => {
    axios.post.mockResolvedValue({
      data: 
        {
          _id: "123test",
          userName: "testUser123",
          password: "testEncryptedPassword",
          userType: "Admin",
          salt:"12345678910"
        },
    })
    const registeredUser = await store.postUser("testUser123", "testEncryptedPassword", "Admin")
    expect(registeredUser._id).toEqual("123test")
  });

  it('postUser() mock calls axios.post (the api) successfully and mock registers a student by returning the registered users data', async () => {
    axios.post.mockResolvedValue({
      data: 
        {
          _id: "12345test",
          userName: "abctestUser123",
          email: "testEmail",
          password: "1testEncryptedPassword2",
          userType: "Student",
          salt:"abc2345678910"
        }
    })
    const registeredUser = await store.postUser("abctestUser123", "testEmail", "1testEncryptedPassword2", "Student")
    expect(registeredUser._id).toEqual("12345test")
    expect(registeredUser.userType).toEqual("Student")
  });

  it('postUser() mock calls axios.post (the api) successfully and mock registers an instructor by returning the registered users data', async () => {
    axios.post.mockResolvedValue({
      data: 
        {
          _id: "instructorTest",
          userName: "testInstructor123",
          password: "123testEncryptedPassword",
          userType: "Instructor",
          salt:"abc15678910"
        },
    })
    const registeredUser = await store.postUser("testInstructor123", "123testEncryptedPassword", "Instructor")
    expect(registeredUser._id).toEqual("instructorTest")
    expect(registeredUser.userType).toEqual("Instructor")
  });

  it('loginUser() mock calls axios.post (the api) successfully and mock logins a user by returning the logged in users id', async () => {
    axios.post.mockResolvedValue({
      data: 
        {
          _id: "instructorTest"
        },
    })
    const loggedInUsersId = await store.loginUser("testInstructor123", "123testEncryptedPassword")
    expect(loggedInUsersId._id).toEqual("instructorTest")
  });

  it('getUserByName() mock calls axios.get (the api) successfully and successfully gets the user by name', async () => {
    axios.get.mockResolvedValue({
      data: 
        {
          _id: "12345test",
          userName: "abctestUser123",
          email: "testEmail",
          password: "1testEncryptedPassword2",
          userType: "Student",
          salt:"abc2345678910"
        },
    })
    const retrievedUser = await store.getUserByName("abctestUser123")
    expect(retrievedUser._id).toEqual("12345test")
    expect(retrievedUser.email).toEqual("testEmail")
  });

  it('getAllUsers() mock calls axios.get (the api) successfully and correctly returns all users', async () => {
    axios.get.mockResolvedValue({
      data: 
        [{
          _id: "12345test",
          userName: "abctestUser123",
          email: "testEmail",
          password: "1testEncryptedPassword2",
          userType: "Student",
          salt:"abc2345678910"
        },
        {
          _id: "testUser2",
          userName: "123testUserabc",
          email: "secondTestEmail",
          password: "2testPassword90234",
          userType: "Admin",
          salt:"123fc32nfo49304"
        },
      ]
    })
    const allUsers = await store.getAllUsers()
    expect(allUsers.length).toEqual(2)
    expect(allUsers[0]._id).toEqual("12345test")
    expect(allUsers[0].userName).toEqual("abctestUser123")
    expect(allUsers[1]._id).toEqual("testUser2")
    expect(allUsers[1].userName).toEqual("123testUserabc")
  });

  it('getUserById() mock calls axios.get (the api) successfully and returns the user by their ID', async () => {
    axios.get.mockResolvedValue({
      data: 
        {
          _id: "12345test",
          userName: "abctestUser123",
          email: "testEmail",
          password: "1testEncryptedPassword2",
          userType: "Student",
          salt:"abc2345678910"
        },
    })
    const retrievedUserById = await store.getUserById("12345test")
    expect(retrievedUserById._id).toEqual("12345test")
    expect(retrievedUserById.userName).toEqual("abctestUser123")
    expect(retrievedUserById.userType).toEqual("Student")
  });
})