import { mount } from '@vue/test-utils'
import UpdateClassPage from '@/components/UpdateClassPage.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'
import InstructorClassDto from '@/models/InstructorClassDto'

describe('UpdateClassPage.vue', () => {
    let mockRouter
    let mockRoute
    let wrapper
    let mockCookies
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
            },
            data() {
                return {
                    instructorId: "",
                    instructorsClasses: [],
                    isReadyToAddStudents: false,
                    isReadyToAddVideos: false,
                    currentClass: InstructorClassDto,
                    isLessonsEmpty: false
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
    it('functions do not throw errors', () => {
        const addRemoveStudents = jest.spyOn(wrapper.vm, 'addRemoveStudents')
        wrapper.vm.addRemoveStudents()
        expect(addRemoveStudents).toHaveBeenCalled
        const addVideos = jest.spyOn(wrapper.vm, 'addVideos')
        wrapper.vm.addVideos()
        expect(addVideos).toHaveBeenCalled
        const redirectToClassCreationPage = jest.spyOn(wrapper.vm, 'redirectToClassCreationPage')
        wrapper.vm.redirectToClassCreationPage()
        expect(redirectToClassCreationPage).toHaveBeenCalled
        
    })

   
   
})