import { mount } from '@vue/test-utils'
import LessonSelection from '@/components/LessonSelection.vue'
import 'jest'
import VideoEditor from '@/components/VideoEditor.vue';
import {createPinia, setActivePinia} from 'pinia'
import { createTestingPinia } from '@pinia/testing'

describe('LessonSelection.vue', () => {
    let videoClips: [{
        _id: "123",
        videoURL: "youtube.com",
        timestamps: [1,2]
    }]
    let wrapper: any;
    let mockRouter: any;
    let mockRoute: any;
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        // jest.spyOn(LessonSelection, 'fetchVideos').mockResolvedValue(videoClips)
        setActivePinia(createPinia())
        wrapper = mount(LessonSelection, {
            data() {
                return {
                    ready: true,
                    videoClips: [{_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}, {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}]
                }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
                // plugins: [
                //     createTestingPinia()
                // ]
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

    it('router.push is called successfully when no user token is set', async () => {
        expect(mockRouter.push).toHaveBeenCalledWith({'name': 'LoginPage'})
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })
})