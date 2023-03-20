import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import DragAndDrop from '@/components/modals/questionTypes/DragAndDrop.vue'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper: any
    let mockRouter: any
    let mockRoute: any
    let mockCookies: any
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            isKey: jest.fn()
        }
        
        setActivePinia(createPinia())
        wrapper = mount(DragAndDrop, {
            global: {
                mocks: {
                   $router: mockRouter,
                   $route: mockRoute,
                   $cookies: mockCookies
               }
            },
            props: {
                activity: {_id: "321test", timestamp: 5, questionType: "short-answer", questionText: "What is the call?", answers: ['Traveling'], correctAnswer: "Traveling", videoclipId: "123test"}
            },
            created() {
            
            },
            mounted() {

            },
        })
    })
    it('renders Drag and Drop', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('calls close function when Close button is clicked', async () => {
        const closeButton = wrapper.find('.button-div').find('.close')
        expect(closeButton.exists()).toBeTruthy()
        const closeFunc = jest.spyOn(wrapper.vm, 'close')
        wrapper.vm.close = jest.fn()
        await closeButton.trigger('click')
        expect(closeFunc).toHaveBeenCalled
    })

    it('calls save function when Save button is clicked', async () => {
        const saveButton = wrapper.find('.button-div').find('.save')
        expect(saveButton.exists()).toBeTruthy()
        const saveFunc = jest.spyOn(wrapper.vm, 'save')
        wrapper.vm.save = jest.fn()
        await saveButton.trigger('click')
        expect(saveFunc).toHaveBeenCalled
    })

    it('calls the reset function', async () => {
        const resetInputs = wrapper.find('.reset-div').find('.reset-button')
        expect(resetInputs.exists()).toBeTruthy()
        const resetFunc = jest.spyOn(wrapper.vm,'resetInputs')
        wrapper.vm.resetInputs = jest.fn()
        await resetInputs.trigger('click')
        expect(resetFunc).toHaveBeenCalled
    })

    it('renders question text area', () => {
        expect(wrapper.find('#question-text').exists()).toBe(true)
    })
})