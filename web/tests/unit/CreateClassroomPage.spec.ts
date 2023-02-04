import { mount } from '@vue/test-utils'
import 'jest'
import CreateClassroomPage from '@/components/CreateClassroomPage.vue';
import {createPinia, setActivePinia} from 'pinia'

describe('CreateClassroomPage.vue', () => {
     let wrapper: any;
     let mockRouter: any;
     let mockRoute: any;
     let mockCookies: any;

     beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({currentUserType: "test"})
        setActivePinia(createPinia())
    
        wrapper = mount(CreateClassroomPage, {
            data() {
                return {
                    students: [
                        {userName: "testUser1", email: "test@gmail.com", password: "testPassword", userType: "Student", salt: "123testSalt"}
                    ],
                    allUsers: [
                        {userName: "testUser1", email: "test@gmail.com", password: "testPassword", userType: "Student", salt: "123testSalt"}, 
                        {userName: "testUser2", email: "test2@gmail.com", password: "testPassword2", userType: "Instructor", salt: "123testSalt2"}
                    ],
                }
              },
              global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
              }
        })
        
     })

    it('renders CreateClassroomPage', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('Displays the table of students', () => {
        expect(wrapper.find('table').exists()).toBe(true)
        expect(wrapper.findAll('a').length).toEqual(4) //One <a> for the student being displayed, and the other three are from the navbar's links
    })
    it('students variable is set successfully', () => {
        expect(wrapper.vm.students.length).toEqual(1)
        expect(wrapper.vm.students[0].userName).toEqual("testUser1")
    })
    it('allUsers variable is set successfully', () => {
        expect(wrapper.vm.allUsers.length).toEqual(2)
        expect(wrapper.vm.allUsers[1].userName).toEqual("testUser2")
    })
    it('AddStudent link is displayed', async () => {
        expect(wrapper.find('#studentLink').exists()).toBe(true)
    })
    it('CreateClass button is displayed and calls createClass function when clicked', async () => {
        const createClassButton = wrapper.find('.createClass')
        expect(createClassButton.exists()).toBe(true)
        wrapper.vm.createClass = jest.fn()
        await createClassButton.trigger('click')
        expect(wrapper.vm.createClass).toHaveBeenCalled
    })
})