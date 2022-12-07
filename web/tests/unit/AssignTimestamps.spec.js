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
                    timestamps: [5,6],
                    formattedTimestamps: [5,6],
                    isVideoSelected: false,
                    selectedVideo: {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25], currentTime: 0}
                }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
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
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        const content = wrapper.find('div.main-content-div')
        expect(content.exists()).toBe(true)
    })

    it('calls the toggleTimestampsModal method when Add New Timestamp button is clicked', async () => {
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        wrapper.vm.toggleTimestampsModal = jest.fn()
        const toggleModal = jest.spyOn(wrapper.vm, 'toggleTimestampsModal')
        const addTimestamp = wrapper.find('.add-button-div').find('#add-timestamp-button')
        expect(addTimestamp.exists()).toBe(true)
        await addTimestamp.trigger('click')
        expect(toggleModal).toHaveBeenCalled
    })

    it('calls the updateAPI method when Save button is clicked', async () => {
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        wrapper.vm.updateAPI = jest.fn()
        const update = jest.spyOn(wrapper.vm, 'updateAPI')
        const save = wrapper.find('.display-timestamps-div').find('#save-timestamps-button')
        expect(save.exists()).toBe(true)
        await save.trigger('click')
        expect(update).toHaveBeenCalled
    })

    it('calls the toggleAssignActivityModal when Activity button is clicked', async () => {
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        wrapper.vm.toggleAssignActivityModal = jest.fn()
        wrapper.vm.timestamps = [5,6]
        wrapper.vm.formattedTimestamps = [5,6]
        const activity = jest.spyOn(wrapper.vm, 'toggleAssignActivityModal')
        const button = wrapper.find('.timestamps').find('ul').find('li').find('button#assign-activity-button')
        expect(button.exists()).toBe(true)
        await button.trigger('click')
        expect(activity).toHaveBeenCalled
    })

    it('calls the deleteTimestamp method when Delete button is clicked', async() => {
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        wrapper.vm.deleteTimestamp = jest.fn()
        wrapper.vm.timestamps = [5,6]
        wrapper.vm.formattedTimestamps = [5,6]
        const deleteTimestamp = jest.spyOn(wrapper.vm, 'deleteTimestamp')
        const button = wrapper.find('.timestamps').find('ul').find('li').find('button#delete-timestamp-button')
        expect(button.exists()).toBe(true)
        await button.trigger('click')
        expect(deleteTimestamp).toHaveBeenCalled
    })
})