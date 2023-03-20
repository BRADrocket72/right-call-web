import { mount } from '@vue/test-utils'
import 'jest'
import UpdateLessonsPage from '@/components/UpdateLessonsPage.vue';
import VideoClipDto  from '@/models/VideoClipDto' 
import {createPinia, setActivePinia} from 'pinia'

describe('UpdateLessonsPage.vue', () => {
     let wrapper;
     let mockRouter;
     let mockRoute;
     let mockCookies;

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
    
        wrapper = mount(UpdateLessonsPage, {
            data() {
                return {
                    allLessons: [
                        {name: "testLesson", instructorId: "testInstructor", description: "testDescription", videoClipsArray: [new VideoClipDto("testId", "youtube.com", "test video", [1,4,5])]}
                    ]
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

    it('renders UpdateLessonsPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header text', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toEqual("Select Lesson to Edit")
    })

    it('contains the div of admin lessons to update', () => {
        expect(wrapper.find('.admin-buttons').exists()).toBe(true)
        expect(wrapper.vm.allLessons.length).toEqual(1)
        expect(wrapper.find('.upload-description').exists()).toBe(true)
    })

    it('Clicking on a lesson calls the selectLesson function correctly', async () => {
        const lessonButton = wrapper.find('.button-selection')
        const selectLessonFunction = jest.spyOn(wrapper.vm, 'selectLesson')
        await lessonButton.trigger('click') 
        expect(selectLessonFunction).toHaveBeenCalled()
    })
})