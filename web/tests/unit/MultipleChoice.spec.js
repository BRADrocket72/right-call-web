import { mount,shallowMount } from '@vue/test-utils'
import MultipleChoice from '@/components/modals/questionTypes/MultipleChoice.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('MultipleChoice.vue', () => {
    let mockRouter
    let mockRoute
    let wrapper
    let mockCookies
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            isKey: jest.fn()
        }
        
        setActivePinia(createPinia())
        wrapper = mount(MultipleChoice, {
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
             mounted() {

             }
        })
    })
    it('renders the Multiple Choice question component', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('calls close function when Close button is clicked', async () => {
        const closeButton = wrapper.find('.button-div').find('.close')
        expect(closeButton.exists()).toBeTruthy()
        const closeMock = jest.fn()
        wrapper.vm.close = closeMock
        await closeButton.trigger('click')
        expect(closeMock).toHaveBeenCalled
    })

    it('calls save function when Save button is clicked', async () => {
        const saveButton = wrapper.find('.button-div').find('.save')
        expect(saveButton.exists()).toBeTruthy()
        const saveFunc = jest.spyOn(wrapper.vm, 'save')
        wrapper.vm.save = jest.fn()
        await saveButton.trigger('click')
        expect(saveFunc).toHaveBeenCalled
    })
    
    it('adds answer option', async () => {
        const addButton = wrapper.find('.add-answer')
        expect(addButton.exists()).toBe(true)

        const addFunc = jest.spyOn(wrapper.vm, 'addAnswer')
        await addButton.trigger('click')
        expect(addFunc).toBeCalled

        const allAddAnswers = wrapper.findAll('.add-answer')
        expect(allAddAnswers.length).toBe(1)
    })
})