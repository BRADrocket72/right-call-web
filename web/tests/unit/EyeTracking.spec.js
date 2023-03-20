import { mount,shallowMount } from '@vue/test-utils'
import EyeTracking from '@/components/modals/questionTypes/EyeTracking.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('EyeTracking.vue', () => {
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
        wrapper = shallowMount(EyeTracking, {
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
    it('renders the Eye tracking question component', () => {
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
    
    it('lets user select a quadrant', async () => {
        const select = wrapper.find('#quadrant-select')
        expect(select.exists()).toBe(true)
        const viewQuadrant = jest.spyOn(wrapper.vm, 'viewSelectedQuadrant')
        await select.trigger('click')
        const option = wrapper.find('option')
        await option.trigger('click')
        expect(viewQuadrant).toHaveBeenCalled
    })

    it('clears quadrants', () => {
        const clearQuadrants = wrapper.vm.clearQuadrantDivSelectedClass
        expect(clearQuadrants).toBeTruthy()
    })

    it('selects quadrants', () => {
        const selectQuadrant = wrapper.vm.viewSelectedQuadrant
        expect(selectQuadrant).toBeTruthy()
    })
})