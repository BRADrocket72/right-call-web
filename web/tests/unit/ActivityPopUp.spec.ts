import { mount } from '@vue/test-utils'
import Activity from '@/models/Activity'
import 'jest'
import ActivityPopUp from '@/components/modals/ActivityPopUp.vue';

describe('ActivityPopUp.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(ActivityPopUp, {
            props:{
                question:new Activity(2, "What was the call ?", ["Traveling", "Double Dribble"], "Traveling", ),
                questionNumber: 1,
                answersArray: [Object]
            }
        })
    })

    it('renders ActivityPopUp', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the question', () => {
        expect(wrapper.find('#modalDescription').find('p').text()).toBe('What was the call ?')
    })

    it('displays 2 answer buttons', () => {
        expect(wrapper.findAll('.btn-green').length).toBe(2)
    })

    it('calls the close modal and handle selected answers functions on button click', async () => {
        const button = wrapper.find('.btn-green')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        const handleAnswersFunction = jest.spyOn(wrapper.vm, 'handleAnswerSelected')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalled
        expect(handleAnswersFunction).toHaveBeenCalled
    })
})