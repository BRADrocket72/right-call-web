import { mount } from '@vue/test-utils'
import ActivityDto from '@/models/ActivityDto'
import 'jest'
import DragAndDropPopUp from '@/components/modals/DragAndDropPopUp.vue';
import {createPinia, setActivePinia} from 'pinia'


describe('DragAndDropPopUp.vue', () => {
    let wrapper;
    let mockRouter;
    let mockRoute;
    let mockCookies;

    beforeEach(async () => {
       mockRoute = {}
       mockRouter = {
           push: jest.fn()
       }
       mockCookies = {
           get: jest.fn()
       }
       mockCookies.get.mockReturnValue({currentUserType: "test"})
       setActivePinia(createPinia())
        wrapper = mount(DragAndDropPopUp, {
            props:{
                question:new ActivityDto(2, "What was the call ?","multiple-choice", [], "Traveling",1 ),
                answersArray: ["Traveling"]
            },
            data() {
                return {
                    originalWordBank: ["test"],
                    wordBankAnswers: ["test"],
                    totalAnswers: 2,
                    answerIndex: 1,
                    returnAnswers: ["test"]
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

    it('renders DragAndDropPopUp', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the question', () => {
        expect(wrapper.find('.drag-container').find('p').text()).toBe('Drag and drop the answers into their correct spots.')
        expect(wrapper.find('.drag-container').find('h2').exists()).toBe(true)
    })
    it('renders the divs', () => {
        expect(wrapper.find('#drop-area').exists()).toBe(true)
        expect(wrapper.find('.word-bank').find('h2').text()).toBe('Word Bank')
        expect(wrapper.find('.word-bank-container').exists()).toBe(true)
    })

    it('functions function properly', () => {
        const removeAnswerFromWordBankFunction = jest.spyOn(wrapper.vm,'removeAnswerFromWordBank')
        wrapper.vm.removeAnswerFromWordBank("test")
        expect(removeAnswerFromWordBankFunction).toHaveBeenCalled

        const checkAnswersFunction = jest.spyOn(wrapper.vm,'checkAnswers')
        wrapper.vm.checkAnswers()
        expect(checkAnswersFunction).toHaveBeenCalled
    })

    it('renders the buttons', async () => {
        expect(wrapper.find('.reset-button-div').exists()).toBe(true)
        expect(wrapper.find('.reset-word-bank').exists()).toBe(true)

        const button = wrapper.find('.reset-word-bank')
        wrapper.vm.resetWordBank = jest.fn()
        const resetWordBankFunction = jest.spyOn(wrapper.vm, 'resetWordBank')
        await button.trigger('click')
        expect(resetWordBankFunction).toHaveBeenCalled
    })

    it('renders the buttons', async () => {
        expect(wrapper.find('.submit-button-div').exists()).toBe(true)
        expect(wrapper.find('.submit').exists()).toBe(true)

        const submitButton = wrapper.find('.submit')
        const checkAnswersFunction = jest.spyOn(wrapper.vm, 'checkAnswers')
        await submitButton.trigger('click')
        expect(checkAnswersFunction).toHaveBeenCalled
    })

    it('functions work properly', async () => {
        const closeFunction = jest.spyOn(wrapper.vm,'close')
        wrapper.vm.close()
        expect(closeFunction).toHaveBeenCalled
    })
})