import {retrieveOnlyStudents} from '@/util/RetrieveOnlyStudents.js'
import 'jest'

describe('RetrieveOnlyStudents Function', () => {
    test('retrieveOnlyStudents correctly returns array of only students', () => {
        const users = [
            {userName: "testUser1", email: "test@gmail.com", password: "testPassword", userType: "Student", salt: "123testSalt"}, 
            {userName: "testUser2", email: "test2@gmail.com", password: "testPassword2", userType: "Instructor", salt: "123testSalt2"}
        ]
        
        expect(retrieveOnlyStudents(users).length).toEqual(1)
        expect(retrieveOnlyStudents(users)[0].userName).toEqual("testUser1")
    })
})
