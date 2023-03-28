import { mount } from '@vue/test-utils'
import 'jest'
import CreateLessonPage from '@/components/CreateLessonPage.vue';
import {createPinia, setActivePinia} from 'pinia'

describe('CreateLessonPage.vue', () => {
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
    
        wrapper = mount(CreateLessonPage, {
            data() {
                return {
                    videosToUpload: [],
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

    it('renders CreateLessonPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('contains the lesson creation div', () => {
        expect(wrapper.find('.video-info-div').exists()).toBe(true)
    })

    it('displays the correct input fields', () => {
        expect(wrapper.find('#lesson-name').exists()).toBe(true)
        expect(wrapper.find('#description').exists()).toBe(true)
        expect(wrapper.find('#lesson-name').exists()).toBe(true)
    })

    it('displays the edit lesson name input for each selected video', () => {
        const fileUploads = wrapper.findAll('#fileUpload')
        expect(fileUploads.length).toEqual(0)
    })

    it('Clicking on the upload lesson button functions correctly', async () => {
        const uploadLessonButton = wrapper.find('#upload-button')
        wrapper.vm.uploadLesson = jest.fn()
        const uploadLessonFunction = jest.spyOn(wrapper.vm, 'uploadLesson')
        await uploadLessonButton.trigger('click') 
        expect(uploadLessonFunction).toHaveBeenCalled()
    })
})