import { mount } from '@vue/test-utils'
import LessonSelection from '@/components/LessonSelection.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('LessonSelection.vue', () => {
    let wrapper;
    let mockRouter;
    let mockRoute;
    let mockCookies;
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        mockCookies = {
            get: jest.fn(),
            isKey: jest.fn()
        }
        mockCookies.get.mockReturnValue({ currentUserType: "test" })
        setActivePinia(createPinia())
        wrapper = mount(LessonSelection, {
            data() {
                return {
                    ready: true,
                    videoClips: [({_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}), ({_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]})]
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

    it('renders LessonSelection', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders Lesson Selection Page Header', () => {
        const header = wrapper.find('.div-header')
        expect(header.exists()).toBe(true)
    })
    
    it('videoClips variable is set to the array of videos from data()', () => {
        expect(wrapper.vm.videoClips.length).toEqual(2)
    })

    it('renders lessons Div', () => {
        const lessonDiv = wrapper.find('.lesson-div')
        expect(lessonDiv.exists()).toBe(true)
    })

    it('displays correct number of lessons', () => {
        const lessons = wrapper.findAll('.lesson')
        expect(lessons.length).toBe(2)
    })

})