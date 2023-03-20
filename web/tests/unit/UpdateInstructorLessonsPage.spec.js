import { mount } from '@vue/test-utils'
import 'jest'
import UpdateInstructorLessonsPage from '@/components/UpdateInstructorLessonsPage.vue';
import VideoClipDto  from '@/models/VideoClipDto' 
import {createPinia, setActivePinia} from 'pinia'

describe('UpdateInstructorLessonsPage.vue', () => {
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
    
        wrapper = mount(UpdateInstructorLessonsPage, {
            data() {
                return {
                    instructorLessons: [
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

    it('renders UpdateInstructorLessonsPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header text', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toEqual("Select Lesson to Update")
        expect(wrapper.find('h5').text()).toEqual("Your custom lessons:")
    })

    it('contains the div of instructor lessons', () => {
        expect(wrapper.find('.admin-buttons').exists()).toBe(true)
        expect(wrapper.vm.instructorLessons.length).toEqual(1)
    })

    it('Clicking on a lesson calls the function correctly', async () => {
        const lessonButton = wrapper.find('.button-selection')
        const selectLessonToCustomizeFunction = jest.spyOn(wrapper.vm, 'selectLessonToCustomize')
        await lessonButton.trigger('click') 
        expect(selectLessonToCustomizeFunction).toHaveBeenCalled()
    })
})