import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AssignTimestamps from '@/components/AssignTimestamps.vue'
import '@/routes.js'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper
    let mockRouter
    let mockRoute
    let mockCookies
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({ currentUserType: "test" })
        setActivePinia(createPinia())
        wrapper = mount(AssignTimestamps, {
            props: {
                lessonPack: JSON.stringify(['TestLessonName', {
                    "videoURL": "https://right-call-videos.s3.us-east-2.amazonaws.com/uploads/e1b21b31-915e-4abc-a0b3-9ce96a8a2f82-P15_Shooting_Foul.m4v",
                    "videoName": "Quiz #1",
                    "timeStamps": [],
                    "_id": "63faa3b8605ebf5bba8ede45",
                    "__v": 0
                }])
            },
            data() {
                return {
                    ready: true,
                    videoClips: [{_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}, {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25]}],
                    timestamps: [5,6],
                    formattedTimestamps: [5,6],
                    isVideoSelected: false,
                    selectedVideo: {_id: "123test", videoUrl: "youtube.com", videoName: "Football Lesson One", timeStamps: [1,5,25], currentTime: 0},
                    activities: [{_id: "321test", timestamp: 5, questionType: "short-answer", questionText: "What is the call?", answers: ['Traveling'], correctAnswer: "Traveling", videoclipId: "123test"} , '']
                }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
            },
            mounted() {

            }
        })
        wrapper.vm.getLessonContent = jest.fn()
    })

    it('renders AssignTimestamps', () => {
        expect(wrapper.exists()).toBe(true)
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

    it('adds a new timestamp when Add New Timestamp button is clicked', async () => {
        const lesson = wrapper.find('div.lesson').find('a.nav-link')
        await lesson.trigger('click')
        wrapper.vm.newTimestampButtonClick = jest.fn()
        const newTimestamp = jest.spyOn(wrapper.vm, 'newTimestampButtonClick')
        const addTimestamp = wrapper.find('.add-button-div').find('#add-timestamp-button')
        expect(addTimestamp.exists()).toBe(true)
        await addTimestamp.trigger('click')
        expect(newTimestamp).toHaveBeenCalled
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