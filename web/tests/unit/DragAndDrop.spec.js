import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import DragAndDrop from '@/components/modals/questionTypes/DragAndDrop.vue'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper;
    let mockRouter;
    let mockRoute;
    let mockCookies;
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
            props: {
                activity: {_id: "321test", timestamp: 5, questionType: "short-answer", questionText: "What is the call?", answers: ['Traveling'], correctAnswer: "Traveling", videoclipId: "123test"},
                activityIndex: 0
            },
            data() {
                return {
                    textInputsFromDb: ['Traveling'],
                    numbersFromDb: [27],
                    answers: ["test", "Travel"],
                    answersWithIDs: ["123", "456"],
                    positionedEventIDs: ["test"],
                    activityModalData: ["test"]
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

    it('calls the reset function first option', async () => {
        const resetInputs = wrapper.find('.reset-div').findAll('.reset-button')
        expect(resetInputs[0].exists()).toBeTruthy()
        const resetFunc = jest.spyOn(wrapper.vm,'resetInputs')
        wrapper.vm.resetInputs('')
        expect(resetFunc).toHaveBeenCalled
    })

    it('functions work properly', async () => {
        const updateNumberIDsFunctino = jest.spyOn(wrapper.vm,'updateNumberIDs')
        wrapper.vm.updateNumberIDs(0,1)
        expect(updateNumberIDsFunctino).toHaveBeenCalled
        const updateCoordinatesFunction = jest.spyOn(wrapper.vm,'updateCoordinates')
        wrapper.vm.updateCoordinates(1,2,3)
        expect(updateCoordinatesFunction).toHaveBeenCalled

        const checkIfOptionAlreadyMovedFunction = jest.spyOn(wrapper.vm,'checkIfOptionAlreadyMoved')
        wrapper.vm.checkIfOptionAlreadyMoved({id: 1})
        expect(checkIfOptionAlreadyMovedFunction).toHaveBeenCalled

        const checkInputsFunction = jest.spyOn(wrapper.vm,'updateAnswersWithValues')
        wrapper.vm.updateAnswersWithValues()
        expect(checkInputsFunction).toHaveBeenCalled

        const setupModalReturnArrayFunction = jest.spyOn(wrapper.vm,'setupModalReturnArray')
        wrapper.vm.setupModalReturnArray()
        expect(setupModalReturnArrayFunction).toHaveBeenCalled

        const dataFromActivityFunction = jest.spyOn(wrapper.vm,'dataFromActivity')
        wrapper.vm.dataFromActivity()
        expect(dataFromActivityFunction).toHaveBeenCalled
        
        const setupEventListenersFunction = jest.spyOn(wrapper.vm,'setupEventListeners')
        wrapper.vm.setupEventListeners = jest.fn()
        expect(setupEventListenersFunction).toHaveBeenCalled
    })

    it('renders question text area', () => {
        expect(wrapper.find('#question-text').exists()).toBe(true)
        expect(wrapper.find('#text-container').exists()).toBe(true)
        expect(wrapper.find('.text-option').exists()).toBe(true)
        expect( wrapper.find('#text-container').find('p').text()).toEqual('Text Input')
    })

    it('renders the drop-zone and props', () => {
        expect(wrapper.find('.drop-zone').exists()).toBe(true)
        expect(wrapper.vm.activity._id).toEqual("321test")
        expect(wrapper.vm.textInputsFromDb.length).toEqual(1)
        expect(wrapper.vm.textInputsFromDb[0]).toEqual("Traveling")
        expect(wrapper.vm.numbersFromDb.length).toEqual(1)
        expect(wrapper.vm.numbersFromDb[0]).toEqual(27)
    })

    it('calls setup functions', () => {
        const dropZone = jest.spyOn(wrapper.vm,'dropZoneSetup')
        wrapper.vm.dropZoneSetup(1);
        expect(dropZone).toHaveBeenCalled
        const deleteButton = jest.spyOn(wrapper.vm,'deleteButtonClickSetup')
        wrapper.vm.deleteButtonClickSetup()
        expect(deleteButton).toHaveBeenCalled
        const numberOption = jest.spyOn(wrapper.vm,'numberOptionDragSetup')
        wrapper.vm.numberOptionDragSetup()
        expect(numberOption).toHaveBeenCalled
        const textOption = jest.spyOn(wrapper.vm,'textOptionDragSetup')
        wrapper.vm.textOptionDragSetup()
        expect(textOption).toHaveBeenCalled
    })

    it('uses events', () => {
        const newDrop = jest.spyOn(wrapper.vm, 'newDropEvent')
        wrapper.vm.newDropEvent()
        expect(newDrop).toHaveBeenCalled
        const newOption = jest.spyOn(wrapper.vm, 'setupOptionAndCoordinates')
        wrapper.vm.setupOptionAndCoordinates()
        expect(newOption).toHaveBeenCalled
        const deleteOption = jest.spyOn(wrapper.vm, 'deleteOption')
        wrapper.vm.deleteOption()
        expect(deleteOption).toHaveBeenCalled
    })
})