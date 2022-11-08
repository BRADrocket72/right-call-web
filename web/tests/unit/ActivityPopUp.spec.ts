import { mount } from '@vue/test-utils'
import Activity from '@/models/Activity'
import 'jest'
import ActivityPopUp from '@/components/ActivityPopUp.vue';

describe('ActivityPopUp.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(ActivityPopUp, {
            props:{
                question:new Activity("question_one", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Traveling"]),
                questionNumber: 1,
                allPossibleAnswers: [Object]
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

    it('calls the close modal function on button click', async () => {
        const button = wrapper.find('.btn-green')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalled
    })
})