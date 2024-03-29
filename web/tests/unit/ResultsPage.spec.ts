import { mount } from '@vue/test-utils'
import 'jest'
import ResultsPage from '@/components/modals/ResultsPage.vue';

describe('ResultsPage.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(ResultsPage, {
            props: {
                answersArray: ["Correct", "Incorrect"]
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
        expect(wrapper.vm.numberOfQuestions).toEqual(2)
        expect(wrapper.vm.percentageCorrect).toEqual(50)
    })
   
    it('calls the close modal function and sends to the router on button click', async () => {
        const button = wrapper.find('.btn-green')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalledTimes(1)
    })
})