import { mount } from '@vue/test-utils'
import QuizFeedbackModal from '@/components/modals/QuizFeedbackModal.vue'
import 'jest'

describe('QuizFeedbackModal.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(QuizFeedbackModal, {
            props:{
                answer: 'Correct',
                feedback: {_id: '123abc', activityId: '456def', timestamp: 2, correctFeedback: 'Nice Job!', incorrectFeedback: 'Almost'}
            },
            mounted() {

            }
        })
    })

    it('renders QuizFeedbackModal', () => {
        wrapper.vm.checkAnswer = jest.fn()
        expect(wrapper.exists()).toBe(true)
    })

    it('calls the function to display feedback', () => {
        const answer = wrapper.vm.checkAnswer
        expect(answer).toBeTruthy
    })
})