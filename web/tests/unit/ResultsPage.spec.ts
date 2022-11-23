import { mount } from '@vue/test-utils'
import 'jest'
import ResultsPage from '@/components/modals/ResultsPage.vue';
import Answer from "@/models/Answer.js";

describe('ResultsPage.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(ResultsPage, {
            props: {
                answersArray: [new Answer("question_one", true, "No Foul Call"), new Answer("question_two", false, "Shooting Foul")]
              }
        })
    })

    it('renders ResultsPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the percent of questions right', () => {
        expect(wrapper.find('#modalDescription').find('p').exists()).toBe(true)
    })

    it('displays the close button', () => {
        expect(wrapper.findAll('.btn-green').length).toBe(1)
    })

    it('variables are set on time', () => {
        expect(wrapper.vm.usersAnswers.length).toBe(2)
        expect(wrapper.vm.eachQuestionResults).toEqual(["Correct", "Incorrect"])
        expect(wrapper.vm.percentageCorrect).toEqual("50.00%")
    })
   // error with $router.push
   
    // it('calls the close modal function on button click', async () => {
    //     const button = wrapper.find('.btn-green')
    //     const closeFunction = jest.spyOn(wrapper.vm, 'close')
    //     await button.trigger('click')
    //     expect(closeFunction).toBeCalled
    // })
})