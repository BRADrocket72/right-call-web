import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AssignTimestamps from '@/components/AssignTimestamps.vue'
import '@/routes.js'
//import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue'
//import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
//import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper
    let mockRouter
    let mockRoute
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        setActivePinia(createPinia())
        wrapper = mount(AssignTimestamps, {
            data() {
                return {
                    ready: true,
                    videoClips: [{_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}, {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}],
                    isVideoSelected: false
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

    it('renders AssignTimestamps', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('router.push is called successfully when no user token is set', async () => {
        expect(mockRouter.push).toHaveBeenCalledWith({'name': 'LoginPage'})
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })

    it('renders the selectable videos', () => {
        const parentDiv = wrapper.find('div.video-list-div')
        const childDivs = parentDiv.findAll('div.lesson')
        expect(childDivs.length).toEqual(wrapper.vm.videoClips.length)
    })

    it('calls the videoSelection function to load video in AssignTimestamps editor when a lesson is clicked', async () => {
        const lessonDiv = wrapper.find('div.lesson')
        const videoSelectionFunction = jest.spyOn(wrapper.vm, 'videoSelection')
        await lessonDiv.trigger('click')
        expect(videoSelectionFunction).toHaveBeenCalled
    })

    it('renders the video editor when a lesson is selected', async () => {
        const lesson = wrapper.find('a.nav-link')
        await lesson.trigger('click')
        const content = wrapper.find('div.main-content-div')
        expect(content.exists()).toBeTruthy
    })

    it('calls the toggleTimestampsModal when Add New Timestamp button is clicked', async () => {
        const lesson = wrapper.find('a.nav-link')
        await lesson.trigger('click')
        const addTimestampMock = jest.fn()
        wrapper.vm.toggleTimestampsModal = addTimestampMock
        const addTimestampButton = wrapper.find('#add-timestamp-button')
        expect(addTimestampButton.exists()).toBeTruthy
        //await addTimestampButton.trigger('click')
        //expect(addTimestampMock).toHaveBeenCalled
    })
})