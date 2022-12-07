import { mount } from '@vue/test-utils'
import LessonDeletion from '@/components/LessonDeletion.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('LessonDeletion.vue', () => {
    let wrapper;
    let mockRouter;
    let mockRoute;
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        setActivePinia(createPinia())

        wrapper = mount(LessonDeletion, {
            data() {
                return {
                    lessons: [{_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}, {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}],
                    selectedVideo: ({_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}),
                    isVideoSelected: true
                }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
            }
        })
    })

    it('renders LessonDeletion', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders and displays the div of lessons', () => {
        const lessonsDiv = wrapper.find(".video-list-div")
        expect(lessonsDiv.exists()).toBeTruthy()
    })

    it('lessons variable is set to the array of lessons successfully', () => {
        expect(wrapper.vm.lessons.length).toEqual(2)
        expect(wrapper.vm.lessons[0]._id).toEqual("123test")
    })

    it('lessons navs are displayed on the application ', () => {
        const lessonsDiv = wrapper.findAll(".nav-link")
        expect(lessonsDiv.length).toEqual(5)    // 5 nav-links because three are in the navbar component on the page, and 2 are the lessons provided
    })

    it('displays the correct number of videos', () => {
        const lessonsDiv = wrapper.findAll(".video-link")
        expect(lessonsDiv.length).toEqual(2)   
    })

    it('lesson is clicked and selectedVideo is equal to the correct value', () => {
        const lessonLink = wrapper.find(".nav-link")
        lessonLink.trigger('click')
        expect(wrapper.vm.selectedVideo._id).toEqual("123test")
    })
})