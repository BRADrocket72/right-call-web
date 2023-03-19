import { mount } from '@vue/test-utils'
import 'jest'
import CustomizeLessonMainPage from '@/components/CustomizeLessonMainPage.vue';
import VideoClipDto  from '@/models/VideoClipDto' 
import {createPinia, setActivePinia} from 'pinia'

describe('CustomizeLessonMainPage.vue', () => {
     let wrapper:any;
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
    
        wrapper = mount(CustomizeLessonMainPage, {
            data() {
                return {
                    allLessons: [
                        {name: "testLesson", userType: "Admin", description: "testDescription", videoClipsArray: [new VideoClipDto("testId", "youtube.com", "test video", [1,4,5])]}
                    ],
                }
              },
              props: {},
              global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
              }
        })
        
     })

    it('renders CustomizeLessonMainPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header text', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toEqual("Select Admin Lesson to Customize")
    })

    it('displays the header text', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toEqual("Select Admin Lesson to Customize")
    })

    it('contains the admin div of lessons', () => {
        expect(wrapper.find('.admin-buttons').exists()).toBe(true)
        expect(wrapper.vm.allLessons.length).toEqual(1)
    })

    it('Clicking on a lesson calls the function correctly', async () => {
        const lessonButton = wrapper.find('.button-selection')
        const confirmCustomizationFunction = jest.spyOn(wrapper.vm, 'confirmCustomization')
        await lessonButton.trigger('click') 
        expect(confirmCustomizationFunction).toHaveBeenCalled()
    })
})