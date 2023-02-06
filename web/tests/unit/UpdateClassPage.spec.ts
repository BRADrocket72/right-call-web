import { mount } from '@vue/test-utils'
import UpdateClassPage from '@/components/UpdateClassPage.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('UpdateClassPage.vue', () => {
    let mockRouter: any;
    let mockRoute: any;
    let wrapper: any;
    let mockCookies: any;
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            get: jest.fn(),
        }
        mockCookies.get.mockReturnValue({currentUserType: "testUser"})
        
        setActivePinia(createPinia())
        wrapper = mount(UpdateClassPage, {
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
            }
        })
    })
    it('renders RegistrationPage', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders header', () => {
        const mainHeader = wrapper.find('h1')
        const secondaryHeader = wrapper.find('h5')
        expect(mainHeader.exists).toBeTruthy()
        expect(secondaryHeader.exists).toBeTruthy()
    })
    it('renders the div that contains the lessons', () => {
        const lessonsDiv = wrapper.find('.lesson-div')
        expect(lessonsDiv.exists).toBeTruthy()
    })
    it('Lessons div to have no length if lessons variable isnt set', () => {
        const lessonTitle = wrapper.findAll('.title')
        expect(lessonTitle.length).toBe(0)
    })
    it('Renders the add videos modal', () => {
        const addVideosModal = wrapper.find('AddVideosToClassModal')
        expect(addVideosModal.exists).toBeTruthy()
    })
    it('Renders the add students modal', () => {
        const addStudentsModal = wrapper.find('AddStudentsModal')
        expect(addStudentsModal.exists).toBeTruthy()
    })

   
   
})